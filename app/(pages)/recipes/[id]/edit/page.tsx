import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import EditRecipeForm from "./edit-recipe-form";
import { fetchRecipe } from "@/app/lib/data";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Create Recipe",
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
                    { label: "Edit", href: `/recipes/${id}/edit`, active: true },
                ]}
            />
            <div className="w-full max-w-[700px] mx-auto mt-8">
                <EditRecipeForm recipe={recipe} />
            </div>
        </main>
    );
}
