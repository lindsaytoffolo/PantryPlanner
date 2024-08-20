'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { fetchFoodData } from './nutritionixApi';
import { GroceryItem } from './definitions';

const GROCERY_LIST_ID = '3157d662-b5e8-49d4-a49d-edb123248dbf'

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const GroceryItemSchema = z.object({
    id: z.string(),
    grocery_list_id: z.string(),
    name: z.string(),
    checked: z.boolean(),
    image: z.string(),
    created_at: z.string(),
    quantity: z.string(),
    comment: z.string(),
});

const UpdateGroceryItem = GroceryItemSchema.pick({ name: true })
    .extend({
        quantity: z.string().optional(),
        comment: z.string().optional(),
    });

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type GroceryItemFormState = {
    errors?: {
        quantity?: string[];
        name?: string[];
        comment?: string[];
    };
    message?: string | null;
};

export type State = {
    errors?: {
        customerId?: string[];
        amount?: string[];
        status?: string[];
    };
    message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Insert data into the database
    try {
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function createGroceryList() {
    const name = 'Default Grocery List'
    // Insert data into the database
    try {
        //     await sql`
        //     INSERT INTO grocery_lists (user_id, name)
        //     VALUES (${customerId}, ${name})
        //   `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Grocery List.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}



export async function updateInvoice(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
        await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
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

export async function deleteGroceryList(id: string) {
    try {
        await sql`DELETE FROM grocery_lists WHERE id = ${id}`;
        revalidatePath('/grocery-list');
        return { message: 'Deleted Grocery List.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Grocery List.' };
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
        const r = await sql`
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
        const r = await sql`
            UPDATE grocery_items
            SET checked = ${checked}
            WHERE id = ${id}
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Grocery Item.' };
    }

    revalidatePath('/grocery-list');
    redirect('/grocery-list');
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
        const r = await sql.query(query, [...ids, ...orders]);
    } catch (error) {
        return { message: 'Database Error: Failed to Update Grocery List.' };
    }

    revalidatePath('/grocery-list');
    redirect('/grocery-list');
}

export async function updateGroceryItem(
    id: string,
    prevState: GroceryItemFormState,
    formData: FormData,
) {
    const validatedFields = UpdateGroceryItem.safeParse({
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