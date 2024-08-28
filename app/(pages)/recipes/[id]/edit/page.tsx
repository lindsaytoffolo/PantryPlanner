import { fetchRecipe } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/recipes/breadcrumbs";
import EditRecipeForm from "@/app/ui/recipes/edit-recipe-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Edit Recipe",
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const recipe = await fetchRecipe(id);

    if (!recipe) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Recipes", href: "/recipes" },
                    { label: recipe.title, href: `/recipes/${id}` },
                    {
                        label: "Edit",
                        href: `/recipes/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <div className="mx-auto mt-8 w-full max-w-[700px]">
                <EditRecipeForm recipe={recipe} />
            </div>
        </main>
    );
}
