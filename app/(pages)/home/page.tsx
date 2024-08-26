import { Suspense } from "react";
import { RecipeSummarySkeleton, RecipeCardSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import GrocerySummary from "@/app/ui/home/grocery-summary";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import RandomRecipe from "@/app/ui/home/random-recipe";
import CreateRecipe from "@/app/ui/home/create-recipe";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function Page() {
    return (
        <main>
            <Breadcrumbs breadcrumbs={[{ label: "Home", href: "/home" }]} />
            <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-4 h-[calc(100vh-148px)] max-w-[800px] mx-auto">
                <Suspense fallback={<RecipeCardSkeleton />}>
                    <RandomRecipe />
                </Suspense>
                <CreateRecipe />
                <Suspense fallback={<RecipeSummarySkeleton />}>
                    <GrocerySummary />
                </Suspense>
            </div>
        </main>
    );
}
