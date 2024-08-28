import CreateRecipe from "@/app/ui/home/create-recipe";
import GrocerySummary from "@/app/ui/home/grocery-summary";
import RandomRecipe from "@/app/ui/home/random-recipe";
import {
    RandomRecipeSkeleton,
    RecipeSummarySkeleton,
} from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Home",
};

export default async function Page() {
    return (
        <main>
            <div className="mx-auto grid max-w-[800px] grid-flow-col grid-cols-1 grid-rows-4 gap-4 md:h-[calc(100vh-96px)] md:grid-cols-2 md:grid-rows-2">
                <Suspense fallback={<RandomRecipeSkeleton />}>
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
