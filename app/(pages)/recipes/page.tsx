import { fetchRecipes } from "@/app/lib/data";
import { Button } from "@/app/ui/button";
import Breadcrumbs from "@/app/ui/recipes/breadcrumbs";
import RecipesGrid from "@/app/ui/recipes/recipes-grid";
import Search from "@/app/ui/search";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Recipes",
};

const INITIAL_NUMBER_OF_RECIPES = 9;

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
    };
}) {
    const query = searchParams?.query || "";
    const recipes = await fetchRecipes(0, INITIAL_NUMBER_OF_RECIPES, query);

    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Recipes", href: "/recipes", active: true },
                ]}
            />

            <div className="mb-8 flex flex-col items-center justify-between gap-2 md:flex-row">
                <Search placeholder="Search by title, description, or ingredients..." />
                <Link
                    className="flex w-full justify-end md:w-auto"
                    href="/recipes/create"
                >
                    <Button className="w-full justify-center md:w-auto">
                        Create Recipe
                    </Button>
                </Link>
            </div>

            <RecipesGrid key={query} query={query} initialRecipes={recipes} />
        </div>
    );
}
