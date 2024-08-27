import { PlusIcon } from "@heroicons/react/24/outline";
import HomeCard from "./home-card";

export default async function CreateRecipe() {
    return (
        <HomeCard href="/recipes/create" className="bg-violet-100">
            <PlusIcon className="mb-4 h-14 w-14 stroke-2 text-gray-800" />
            <h2 className="text-2xl font-semibold text-gray-800">
                Create Recipe
            </h2>
        </HomeCard>
    );
}
