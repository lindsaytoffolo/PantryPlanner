import { fetchRecipe } from "@/app/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeHeader from "./recipe-header";
import RecipeIngredients from "./recipe-ingredients";
import RecipeInstructions from "./recipe-instructions";

export const metadata: Metadata = {
    title: "Recipes",
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const recipe = await fetchRecipe(id);

    if (!recipe) {
        notFound();
    }

    return (
        <div className="w-full">
            <RecipeHeader recipe={recipe} />
            <div className="flex gap-5 mt-5">
                <RecipeIngredients recipe={recipe} />
                <RecipeInstructions recipe={recipe} />
            </div>
        </div>
    );
}