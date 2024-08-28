import { fetchGroceryItems, fetchGroceryLists } from "@/app/lib/data";
import GroceryList from "@/app/ui/grocery-list/grocery-list";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Grocery List",
};

export default async function Page() {
    const groceryLists = await fetchGroceryLists();
    if (!groceryLists?.length) return null;
    const groceryListId = groceryLists[0]?.id;
    const groceryItems = await fetchGroceryItems(groceryListId);

    return (
        <div className="mx-auto w-full max-w-[700px] md:mt-8">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-3xl">Grocery List</h1>
            </div>
            <GroceryList groceryItems={groceryItems} />
        </div>
    );
}
