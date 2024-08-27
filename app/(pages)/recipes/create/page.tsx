import Breadcrumbs from "@/app/ui/recipes/breadcrumbs";
import CreateRecipeForm from "@/app/ui/recipes/create-recipe-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Recipe",
};

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Recipes", href: "/recipes" },
                    {
                        label: "Create Recipe",
                        href: "/dashboard/recipes/create",
                        active: true,
                    },
                ]}
            />
            <div className="mx-auto mt-8 w-full max-w-[700px]">
                <CreateRecipeForm />
            </div>
        </main>
    );
}
