import CreateRecipe from "@/app/ui/home/create-recipe";
import GrocerySummary from "@/app/ui/home/grocery-summary";
import RandomRecipe from "@/app/ui/home/random-recipe";
import Breadcrumbs from "@/app/ui/recipes/breadcrumbs";
import { RecipeCardSkeleton, RecipeSummarySkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[{ label: "Home", href: "/home", active: true }]}
            />
            <div className="mx-auto grid h-[calc(100vh-152px)] max-w-[800px] grid-flow-col grid-cols-2 grid-rows-2 gap-4">
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
