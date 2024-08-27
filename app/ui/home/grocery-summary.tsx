import { fetchGroceryItems, fetchGroceryLists } from "@/app/lib/data";
import { notFound } from "next/navigation";
import HomeCard from "./home-card";

export default async function GrocerySummary() {
    const groceryLists = await fetchGroceryLists();
    if (!groceryLists?.length) notFound();
    const groceryListId = groceryLists[0]?.id;
    const groceryItems = await fetchGroceryItems(groceryListId);

    return (
        <HomeCard
            href="/grocery-list"
            className="row-span-2 bg-violet-900 text-white"
        >
            <h3 className="mb-4 self-start text-2xl font-medium">
                Grocery List
            </h3>
            <ul className="h-full list-disc space-y-2 overflow-y-scroll rounded-lg bg-white p-4 pl-8 text-left text-gray-800">
                {groceryItems.map((item) => (
                    <li key={item.id} className="text-lg">
                        <span className="mr-2 font-medium">
                            {item.quantity
                                ? `${item.quantity} ${item.name}`
                                : item.name}
                        </span>
                        <span className="text-gray-50">{item.comment}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-4 flex justify-end self-end">
                <span className="underline underline-offset-4">
                    View grocery list
                </span>
            </div>
        </HomeCard>
    );
}
