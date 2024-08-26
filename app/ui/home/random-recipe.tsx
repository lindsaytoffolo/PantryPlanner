import Image from "next/image";
import { fetchRandomRecipe } from "@/app/lib/data";
import HomeCard from "./home-card";

export default async function RandomRecipe() {
    const recipe = await fetchRandomRecipe();

    return (
        <HomeCard
            href={`/recipes/${recipe.id}`}
            className="relative overflow-hidden rounded-xl shadow-lg p-0"
        >
            <div className="relative h-full w-full">
                {recipe.image && (
                    <Image
                        priority
                        src={recipe.image}
                        alt={recipe.title}
                        className="absolute inset-0 object-cover"
                        fill
                        sizes="50vw"
                    />
                )}
            </div>

            <div className="absolute text-left inset-0 flex flex-col p-6 text-white justify-between bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute top-4 left-4 bg-white text-black text-base px-4 py-1 rounded-full font-medium">
                    Recipe Spotlight
                </div>

                <h2 className="text-2xl font-bold mb-1 mt-auto">{recipe.title}</h2>
                <div className="text-sm line-clamp-3 italic">{recipe.description}</div>
                <div className="flex justify-end mt-1">
                    <span className="underline underline-offset-4">View recipe</span>
                </div>
            </div>
        </HomeCard>
    );
}
