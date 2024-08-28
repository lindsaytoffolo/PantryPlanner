import { fetchGroceryItems, fetchGroceryLists } from "@/app/lib/data";
import { CheckIcon } from "@heroicons/react/24/outline";
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
            className="row-span-2 bg-violet-900 px-6 text-white"
        >
            <h3 className="mb-4 self-start text-2xl font-medium">
                Grocery List
            </h3>
            <ul className="h-full w-full list-disc space-y-2 overflow-y-scroll rounded-lg bg-white p-4 pl-8 text-left text-gray-800">
                {groceryItems.map((item) => (
                    <li key={item.id} className="text-lg">
                        <div className="flex items-center">
                            <span className="mr-2 font-medium">
                                {item.name}
                            </span>
                            {item.quantity && (
                                <span className="mr-2 mt-0.5 text-sm text-gray-600">
                                    {item.quantity}
                                </span>
                            )}
                            {item.checked && (
                                <CheckIcon className="w-4 stroke-[3] text-violet-600" />
                            )}
                        </div>
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
