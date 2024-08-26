import { fetchGroceryItems, fetchGroceryLists } from "@/app/lib/data";
import { notFound } from "next/navigation";
import HomeCard from "./home-card";

export default async function GrocerySummary() {
    const groceryLists = await fetchGroceryLists();
    if (!groceryLists?.length) notFound();
    const groceryListId = groceryLists[0]?.id;
    const groceryItems = await fetchGroceryItems(groceryListId);

    return (
        <HomeCard href="/grocery-list" className="bg-violet-900 row-span-2 text-white">
            <h3 className="text-2xl font-medium self-start mb-4">Grocery List</h3>
            <ul className="list-disc p-4 pl-8 space-y-2 rounded-lg bg-white text-gray-800 text-left h-full overflow-y-scroll">
                {groceryItems.map((item) => (
                    <li key={item.id} className="text-lg">
                        <span className="font-medium mr-2">
                            {item.quantity ? `${item.quantity} ${item.name}` : item.name}
                        </span>
                        <span className="text-gray-50">{item.comment}</span>
                    </li>
                ))}
            </ul>

            <div className="flex justify-end mt-4 self-end">
                <span className="underline underline-offset-4">View grocery list</span>
            </div>
        </HomeCard>
    );
}
