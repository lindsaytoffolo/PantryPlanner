'use server';

import { auth, signIn } from '@/auth';
import { put } from "@vercel/blob";
import { db, sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { GroceryItem, Ingredient, Instruction } from './definitions';
import { fetchFoodData } from './nutritionixApi';

export type GroceryItemFormState = {
    errors?: {
        quantity?: string[];
        name?: string[];
        comment?: string[];
    };
    message?: string | null;
};

export type RecipeFormState = {
    errors?: {
        title?: string[];
        image?: string[];
        description?: string[];
        servings?: string[];
        prep_time_hours?: string[];
        prep_time_minutes?: string[];
        cook_time_hours?: string[];
        cook_time_minutes?: string[];
    };
    message?: string | null;
};

// TODO: fetch this dynamically instead of hardcoding it
const GROCERY_LIST_ID = '3157d662-b5e8-49d4-a49d-edb123248dbf'

const GroceryItemSchema = z.object({
    name: z.string().trim().min(1),
    quantity: z.string().optional(),
    comment: z.string().optional(),
});

const RecipeSchema = z.object({
    title: z.string().trim().min(1, { message: 'This field is required' }),
    description: z.string().optional(),
    servings: z.coerce.number().gt(0, { message: 'Please enter an amount greater than 0.' }),
    prep_time_hours: z.coerce.number().optional(),
    prep_time_minutes: z.coerce.number().optional(),
    cook_time_hours: z.coerce.number().optional(),
    cook_time_minutes: z.coerce.number().optional(),
});

const IngredientSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    quantity: z.string().optional(),
    comment: z.string().optional(),
});

const InstructionSchema = z.object({
    instruction: z.string().min(1, { message: 'Name is required' }),
    step_number: z.number(),
});

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export const nutritionixFoodSearch = async (query: string) => {
    try {
        const result = await fetchFoodData(query);
        return result;
    } catch (error) {
        console.error('Error making API request:', error);
    }
};

export async function createGroceryItem(name: string, image?: string) {
    try {
        await sql`
            INSERT INTO grocery_items (grocery_list_id, name, image, checked)
            VALUES (${GROCERY_LIST_ID}, ${name}, ${image}, ${false})
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Create Grocery Item.' };
    }

    revalidatePath('/grocery-list');
    redirect('/grocery-list');
}

export async function toggleGroceryItem(id: string, checked: boolean) {

    try {
        await sql`
            UPDATE grocery_items
            SET checked = ${checked}
            WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Grocery Item.' };
    }

    revalidatePath('/grocery-list');
}

export async function updateGroceryListOrder(newItems: GroceryItem[]) {
    try {
        const caseStatements = newItems.flatMap((_, index) => [
            `WHEN id = $${index + 1} THEN $${newItems.length + index + 1}`
        ]).join(' ');

        const query = `
            UPDATE grocery_items
            SET sort_order = CASE
                ${caseStatements}
                ELSE sort_order
            END
            WHERE id IN (${newItems.map((_, index) => `$${index + 1}`).join(', ')});
        `;

        const ids = newItems.map(item => item.id);
        const orders = newItems.map(item => item.sort_order);
        await sql.query(query, [...ids, ...orders]);
    } catch (error) {
        return { message: 'Database Error: Failed to Update Grocery List.' };
    }

    revalidatePath('/grocery-list');
}

export async function updateGroceryItem(
    id: string,
    prevState: GroceryItemFormState,
    formData: FormData,
) {
    const validatedFields = GroceryItemSchema.safeParse({
        quantity: formData.get('quantity'),
        name: formData.get('name'),
        comment: formData.get('comment'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Grocery Item.',
        };
    }

    const { quantity, name, comment } = validatedFields.data;

    try {
        await sql`
            UPDATE grocery_items
            SET quantity = ${quantity}, name = ${name}, comment = ${comment}
            WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Grocery Item.' };
    }

    revalidatePath('/grocery-list');
    redirect('/grocery-list');
}


const parseRecipeFields = (formData: FormData) => {
    const validatedFields = RecipeSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        servings: formData.get('servings'),
        prep_time_hours: formData.get('prep_time_hours'),
        prep_time_minutes: formData.get('prep_time_minutes'),
        cook_time_hours: formData.get('cook_time_hours'),
        cook_time_minutes: formData.get('cook_time_minutes'),
    });

    const ingredients: Ingredient[] = [];
    let ingredient_index = 0;
    while (formData.has(`ingredient_name_${ingredient_index}`)) {
        const name = formData.get(`ingredient_name_${ingredient_index}`) as string;
        const quantity = formData.get(`ingredient_quantity_${ingredient_index}`) as string;
        const comment = formData.get(`ingredient_comment_${ingredient_index}`) as string;
        const result = IngredientSchema.safeParse({ name, quantity, comment });
        if (result.success) {
            ingredients.push(result.data);
        }
        ingredient_index++;
    }

    const instructions: Instruction[] = [];
    let instruction_index = 0;
    while (formData.has(`instruction_${instruction_index}`)) {
        const instruction = formData.get(`instruction_${instruction_index}`) as string;
        const step_number = instruction_index + 1;
        const result = InstructionSchema.safeParse({ instruction, step_number });
        if (result.success) {
            instructions.push(result.data);
        }
        instruction_index++;
    }

    return { validatedFields, ingredients, instructions }
}

export async function createRecipe(prevState: RecipeFormState, formData: FormData) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Unauthenticated user trying to access recipes page");

    let imageError: string | undefined;
    let imageUrl: string | undefined;

    const imageFile = formData.get('image') as File | undefined;
    if (imageFile && imageFile.size > 0) {
        try {
            // TODO: prevent duplicate uploads if the users attemps to submit multiple times
            const blob = await put(imageFile.name, imageFile, { access: "public" });
            imageUrl = blob.url;
        } catch (err) {
            imageError = err instanceof Error ? err.message : 'An unknown error occurred while uploading the image';
        }
    } else {
        imageError = "This field is required";
    }

    const { validatedFields, ingredients, instructions } = parseRecipeFields(formData)

    if (!validatedFields.success || imageError) {
        return {
            errors: { ...validatedFields.error?.flatten()?.fieldErrors, image: imageError ? [imageError] : undefined },
            message: 'Missing Fields. Failed to Create Recipe.',
        };
    }

    const { title, description, servings, prep_time_hours, prep_time_minutes, cook_time_hours, cook_time_minutes } = validatedFields.data;

    let recipeId;
    const client = await db.connect();

    try {
        await client.query('BEGIN');

        const { rows } = await client.query(`
            INSERT INTO recipes (user_id, title, description, servings, prep_time_hours, prep_time_minutes, cook_time_hours, cook_time_minutes, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `, [userId, title, description, servings, prep_time_hours, prep_time_minutes, cook_time_hours, cook_time_minutes, imageUrl]);

        recipeId = rows[0].id;
        for (const ingredient of ingredients) {
            await client.query(`
                INSERT INTO ingredients (recipe_id, name, quantity, comment)
                VALUES ($1, $2, $3, $4)
            `, [recipeId, ingredient.name, ingredient.quantity, ingredient.comment]);
        }

        for (const instruction of instructions) {
            await client.query(`
                INSERT INTO instructions (recipe_id, instruction, step_number)
                VALUES ($1, $2, $3)
            `, [recipeId, instruction.instruction, instruction.step_number]);
        }

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        return {
            message: 'Database Error: Failed to Create Recipe.',
        };
    } finally {
        client.release();
    }

    revalidatePath(`/recipes/${recipeId}`);
    redirect(`/recipes/${recipeId}`);
}

export async function updateRecipe(recipeId: string, prevState: RecipeFormState, formData: FormData) {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Unauthenticated user trying to access recipes page");

    let imageError: string | undefined;
    let imageUrl: string | undefined;

    // Handle image update if a new image is provided
    const imageFile = formData.get('image') as File | undefined;
    if (imageFile && imageFile.size > 0) {
        try {
            const blob = await put(imageFile.name, imageFile, { access: "public" });
            imageUrl = blob.url;
        } catch (err) {
            imageError = err instanceof Error ? err.message : 'An unknown error occurred while uploading the image';
        }
    }

    const { validatedFields, ingredients, instructions } = parseRecipeFields(formData)

    if (!validatedFields.success || imageError) {
        return {
            errors: { ...validatedFields.error?.flatten()?.fieldErrors, image: imageError ? [imageError] : undefined },
            message: 'Missing Fields. Failed to Update Recipe.',
        };
    }

    const { title, description, servings, prep_time_hours, prep_time_minutes, cook_time_hours, cook_time_minutes } = validatedFields.data;

    const client = await db.connect();
    try {
        await client.query('BEGIN');

        await client.query(`
            UPDATE recipes
            SET
                title = $1,
                description = $2,
                servings = $3,
                prep_time_hours = $4,
                prep_time_minutes = $5,
                cook_time_hours = $6,
                cook_time_minutes = $7,
                image = COALESCE($8, image)
            WHERE id = $9 AND user_id = $10
        `, [title, description, servings, prep_time_hours, prep_time_minutes, cook_time_hours, cook_time_minutes, imageUrl, recipeId, userId]);

        await client.query('DELETE FROM ingredients WHERE recipe_id = $1', [recipeId]);
        for (const ingredient of ingredients) {
            await client.query(`
                INSERT INTO ingredients (recipe_id, name, quantity, comment)
                VALUES ($1, $2, $3, $4)
            `, [recipeId, ingredient.name, ingredient.quantity, ingredient.comment]);
        }

        await client.query('DELETE FROM instructions WHERE recipe_id = $1', [recipeId]);
        for (const instruction of instructions) {
            await client.query(`
                INSERT INTO instructions (recipe_id, instruction, step_number)
                VALUES ($1, $2, $3)
            `, [recipeId, instruction.instruction, instruction.step_number]);
        }

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        return {
            message: 'Database Error: Failed to Update Recipe.',
        };
    } finally {
        client.release();
    }

    revalidatePath(`/recipes/${recipeId}`);
    redirect(`/recipes/${recipeId}`);
}

export async function deleteGroceryItem(id: string) {
    try {
        await sql`DELETE FROM grocery_items WHERE id = ${id}`;
        revalidatePath('/grocery-list');
        return { message: 'Deleted Grocery Item.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Grocery Item.' };
    }
}

export async function deleteRecipe(id: string) {
    try {
        await sql`DELETE FROM recipes WHERE id = ${id}`;
        revalidatePath('/recipes');
        return { message: 'Deleted Recipe.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Recipe.' };
    }
}