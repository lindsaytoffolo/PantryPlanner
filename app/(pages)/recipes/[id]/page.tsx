import { fetchRecipe } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/recipes/breadcrumbs";
import RecipeHeader from "@/app/ui/recipes/recipe-header";
import RecipeIngredients from "@/app/ui/recipes/recipe-ingredients";
import RecipeInstructions from "@/app/ui/recipes/recipe-instructions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Recipes", href: "/recipes" },
                    {
                        label: recipe.title,
                        href: `/recipes/${id}`,
                        active: true,
                    },
                ]}
            />
            <RecipeHeader recipe={recipe} />
            <div className="mt-5 flex gap-5">
                <RecipeIngredients recipe={recipe} />
                <RecipeInstructions recipe={recipe} />
            </div>
        </div>
    );
}
