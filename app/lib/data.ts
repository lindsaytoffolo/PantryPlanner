'use server';

import { auth } from '@/auth';
import { sql } from '@vercel/postgres';
import {
  GroceryItem,
  GroceryList,
  Ingredient,
  Instruction,
  Recipe
} from './definitions';

export async function fetchRecipes(offset: number, limit: number, query?: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error("Unauthenticated user trying to access recipes page")

  try {
    const data = await sql<Recipe>`
        WITH recipe_matches AS (
            SELECT DISTINCT ON (r.id)
                r.*,
                CASE
                    WHEN i.name ILIKE ${`%${query}%`} THEN i.name
                    ELSE NULL
                END AS ingredient_match,
                CASE
                    WHEN r.title ILIKE ${`%${query}%`} THEN 'title'
                    WHEN r.description ILIKE ${`%${query}%`} THEN 'description'
                    WHEN i.name ILIKE ${`%${query}%`} THEN 'ingredient'
                    ELSE 'none'
                END AS match_source
            FROM recipes r
            LEFT JOIN ingredients i ON r.id = i.recipe_id
            WHERE r.user_id = ${userId}
              AND (r.title ILIKE ${`%${query}%`} 
                  OR r.description ILIKE ${`%${query}%`} 
                  OR i.name ILIKE ${`%${query}%`})
        )
        SELECT *
        FROM recipe_matches
        ORDER BY CASE match_source
              WHEN 'title' THEN 1
              WHEN 'description' THEN 2
              WHEN 'ingredient' THEN 3
              ELSE 4
          END
        LIMIT ${limit}
        OFFSET ${offset};
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipes');
  }
}

export async function fetchGroceryLists() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error("Unauthenticated user trying to access grocery list page")

  try {
    const data = await sql<GroceryList>`SELECT * FROM grocery_lists WHERE user_id = ${userId}`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch grocery lists.');
  }
}

export async function fetchGroceryItems(groceryListId: string) {
  try {
    const data = await sql<GroceryItem>`SELECT * FROM grocery_items WHERE grocery_list_id = ${groceryListId} ORDER BY sort_order ASC`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch grocery items.');
  }
}

export async function fetchRandomRecipe(): Promise<Recipe> {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error("Unauthenticated user trying to access protected page")

  try {
    const recipeResult = await sql<Recipe>`SELECT *
        FROM recipes
        WHERE user_id = ${userId}
        ORDER BY RANDOM()
        LIMIT 1;
    `;

    return recipeResult.rows[0];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipe');
  }
}

export async function fetchRecipe(id: string): Promise<Recipe | null> {
  try {
    const recipeResult = await sql<Recipe>`SELECT * FROM recipes WHERE recipes.id = ${id}`;
    if (recipeResult.rows.length === 0) {
      return null;
    }

    const recipe = recipeResult.rows[0];
    const ingredientsResult = await sql<Ingredient>`SELECT * FROM ingredients WHERE recipe_id = ${id}`;
    recipe.ingredients = ingredientsResult.rows;

    const instructionsResult = await sql<Instruction>`SELECT * FROM instructions WHERE recipe_id = ${id} ORDER BY step_number`;
    recipe.instructions = instructionsResult.rows;

    return recipe;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch recipe');
  }
}
