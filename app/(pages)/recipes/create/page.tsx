import { Metadata } from "next";
import CreateRecipeForm from "./create-recipe-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

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
            <div className="w-full max-w-[700px] mx-auto mt-8">
                <CreateRecipeForm />
            </div>
        </main>
    );
}
