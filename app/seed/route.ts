// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';

// const client = await db.connect();

// const users = [
//     {
//         id: '410544b2-4001-4271-9855-fec4b6a6442a',
//         name: 'Test User',
//         email: 'user@email.com',
//         password: '123456',
//     },
// ];

// async function seedUsers() {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     await client.sql`
//         CREATE TABLE IF NOT EXISTS users (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             email TEXT NOT NULL UNIQUE,
//             password TEXT NOT NULL
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `;

//     const insertedUsers = await Promise.all(
//         users.map(async (user) => {
//             const hashedPassword = await bcrypt.hash(user.password, 10);
//             return client.sql`
//                 INSERT INTO users (id, name, email, password)
//                 VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//                 ON CONFLICT (id) DO NOTHING;
//             `;
//         }),
//     );

//     return insertedUsers;
// }

// async function seedRecipes() {
//     await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
//     await client.query(`
//         CREATE TABLE IF NOT EXISTS recipes (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             user_id UUID REFERENCES users(id) ON DELETE CASCADE,
//             title VARCHAR(255) NOT NULL,
//             image TEXT,
//             description TEXT,
//             servings INTEGER,
//             prep_time_hours INTEGER DEFAULT 0,
//             prep_time_minutes INTEGER DEFAULT 0,
//             cook_time_hours INTEGER DEFAULT 0,
//             cook_time_minutes INTEGER DEFAULT 0,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);

//     const recipes = [
//         {
//             title: 'Spaghetti Carbonara',
//             image: 'https://example.com/images/spaghetti_carbonara.jpg',
//             description: 'A classic Italian pasta dish.',
//             servings: 4,
//             prep_time_hours: 0,
//             prep_time_minutes: 15,
//             cook_time_hours: 0,
//             cook_time_minutes: 20,
//         },
//         {
//             title: 'Chicken Curry',
//             image: 'https://example.com/images/chicken_curry.jpg',
//             description: 'A spicy and flavorful chicken curry.',
//             servings: 4,
//             prep_time_hours: 0,
//             prep_time_minutes: 20,
//             cook_time_hours: 0,
//             cook_time_minutes: 30,
//         },
//     ];

//     const insertedRecipes = await Promise.all(
//         recipes.map(async (recipe) => {
//             return client.query(`
//                 INSERT INTO recipes (user_id, title, image, description, servings, prep_time_hours, prep_time_minutes, cook_time_hours, cook_time_minutes)
//                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//                 RETURNING id;
//             `, ['410544b2-4001-4271-9855-fec4b6a6442a', recipe.title, recipe.image, recipe.description, recipe.servings, recipe.prep_time_hours, recipe.prep_time_minutes, recipe.cook_time_hours, recipe.cook_time_minutes]);
//         })
//     );

//     return insertedRecipes.map(result => result.rows[0].id);
// }

// async function seedIngredients(recipeIds: string[]) {
//     await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
//     await client.query(`
//         CREATE TABLE IF NOT EXISTS ingredients (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
//             fatsecret_id TEXT,
//             name VARCHAR(255) NOT NULL,
//             quantity VARCHAR(50),
//             modifier TEXT,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);

//     const ingredients = [
//         {
//             recipe_id: recipeIds[0], // Spaghetti Carbonara
//             fatsecret_id: '123456',
//             name: 'Spaghetti',
//             quantity: '200 grams',
//             modifier: 'uncooked',
//         },
//         {
//             recipe_id: recipeIds[0], // Spaghetti Carbonara
//             fatsecret_id: '654321',
//             name: 'Eggs',
//             quantity: '4',
//             modifier: 'beaten',
//         },
//         {
//             recipe_id: recipeIds[1], // Chicken Curry
//             fatsecret_id: '789012',
//             name: 'Chicken',
//             quantity: '500 grams',
//             modifier: 'diced',
//         },
//         {
//             recipe_id: recipeIds[1], // Chicken Curry
//             fatsecret_id: '210987',
//             name: 'Curry Powder',
//             quantity: '2 tablespoons',
//         },
//     ];

//     const insertedIngredients = await Promise.all(
//         ingredients.map(async (ingredient) => {
//             return client.query(`
//                 INSERT INTO ingredients (recipe_id, fatsecret_id, name, quantity, modifier)
//                 VALUES ($1, $2, $3, $4, $5)
//                 ON CONFLICT DO NOTHING;
//             `, [ingredient.recipe_id, ingredient.fatsecret_id, ingredient.name, ingredient.quantity, ingredient.modifier]);
//         })
//     );

//     return insertedIngredients;
// }

// async function seedInstructions(recipeIds: string[]) {
//     await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
//     await client.query(`
//         CREATE TABLE IF NOT EXISTS instructions (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
//             step_number INTEGER NOT NULL,
//             instruction TEXT NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);

//     const instructions = [
//         {
//             recipe_id: recipeIds[0], // Spaghetti Carbonara
//             step_number: 1,
//             instruction: 'Boil water and cook spaghetti according to package instructions.',
//         },
//         {
//             recipe_id: recipeIds[0], // Spaghetti Carbonara
//             step_number: 2,
//             instruction: 'In a pan, cook bacon until crispy. Set aside.',
//         },
//         {
//             recipe_id: recipeIds[0], // Spaghetti Carbonara
//             step_number: 3,
//             instruction: 'Mix eggs with cheese and cooked bacon. Combine with drained spaghetti.',
//         },
//         {
//             recipe_id: recipeIds[1], // Chicken Curry
//             step_number: 1,
//             instruction: 'Heat oil in a pan and cook diced chicken until browned.',
//         },
//         {
//             recipe_id: recipeIds[1], // Chicken Curry
//             step_number: 2,
//             instruction: 'Add curry powder and cook for 1 minute.',
//         },
//         {
//             recipe_id: recipeIds[1], // Chicken Curry
//             step_number: 3,
//             instruction: 'Add water and simmer until chicken is cooked through.',
//         },
//     ];

//     const insertedInstructions = await Promise.all(
//         instructions.map(async (instruction) => {
//             return client.query(`
//                 INSERT INTO instructions (recipe_id, step_number, instruction)
//                 VALUES ($1, $2, $3)
//                 ON CONFLICT DO NOTHING;
//             `, [instruction.recipe_id, instruction.step_number, instruction.instruction]);
//         })
//     );

//     return insertedInstructions;
// }

// async function seedGroceryLists() {
//     await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
//     await client.query(`
//         CREATE TABLE IF NOT EXISTS grocery_lists (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             user_id UUID REFERENCES users(id) ON DELETE CASCADE,
//             name VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);

//     const groceryLists = [
//         {
//             user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
//             name: 'Weekly Groceries',
//         },
//     ];

//     const insertedGroceryLists = await Promise.all(
//         groceryLists.map(async (list) => {
//             return client.query(`
//                 INSERT INTO grocery_lists (user_id, name)
//                 VALUES ($1, $2)
//                 RETURNING id;
//             `, [list.user_id, list.name]);
//         })
//     );

//     return insertedGroceryLists.map(result => result.rows[0].id);
// }

// async function seedGroceryItems(groceryListIds: string[]) {
//     await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
//     await client.query(`
//         CREATE TABLE IF NOT EXISTS grocery_items (
//             id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//             grocery_list_id UUID REFERENCES grocery_lists(id) ON DELETE CASCADE,
//             fatsecret_id TEXT,
//             name VARCHAR(255) NOT NULL,
//             quantity VARCHAR(50),
//             modifier TEXT,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
//     `);

//     const groceryItems = [
//         {
//             grocery_list_id: groceryListIds[0], // Weekly Groceries
//             fatsecret_id: '123456',
//             name: 'Milk',
//             quantity: '1 liter',
//         },
//         {
//             grocery_list_id: groceryListIds[0], // Weekly Groceries
//             fatsecret_id: '654321',
//             name: 'Bread',
//             quantity: '1 loaf',
//             modifier: ''
//         },
//     ];

//     const insertedGroceryItems = await Promise.all(
//         groceryItems.map(async (item) => {
//             return client.query(`
//                 INSERT INTO grocery_items (grocery_list_id, fatsecret_id, name, quantity, modifier)
//                 VALUES ($1, $2, $3, $4, $5)
//                 ON CONFLICT DO NOTHING;
//             `, [item.grocery_list_id, item.fatsecret_id, item.name, item.quantity, item.modifier]);
//         })
//     );

//     return insertedGroceryItems;
// }




export async function GET() {
    //     try {
    //         await client.sql`BEGIN`;
    //         await seedUsers();
    //         const recipeIds = await seedRecipes();
    //         await seedIngredients(recipeIds);
    //         await seedInstructions(recipeIds);
    //         const groceryListIds = await seedGroceryLists();
    //         await seedGroceryItems(groceryListIds);
    //         await client.sql`COMMIT`;

    //         return Response.json({ message: 'Database seeded successfully' });
    //     } catch (error) {
    //         await client.sql`ROLLBACK`;
    //         return Response.json({ error }, { status: 500 });
    //     }
}
