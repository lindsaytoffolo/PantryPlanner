"use client";

import { Recipe } from "@/app/lib/definitions";
import { formatTime, getSnippet } from "@/app/lib/utils";
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import reactStringReplace from "react-string-replace";

interface RecipeCardProps {
    recipe: Recipe;
    query?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, query }) => {
    const getMatch = () => {
        if (!query) {
            return;
        } else if (
            recipe.match_source === "description" &&
            recipe.description
        ) {
            const snippetLength = 80;
            const snippet = getSnippet(
                recipe.description,
                query,
                snippetLength,
            );
            return reactStringReplace(snippet, query, (match, i) => (
                <span key={i} className="font-bold text-white">
                    {match}
                </span>
            ));
        } else if (recipe.ingredient_match) {
            return (
                <>
                    Ingredient list contains:{" "}
                    <span className="font-bold text-white">
                        {recipe.ingredient_match}
                    </span>
                </>
            );
        }
    };
    const matchComponent = getMatch();

    let totalMinutes =
        (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);
    let totalHours =
        (recipe.prep_time_hours || 0) + (recipe.cook_time_hours || 0);
    if (totalMinutes >= 60) {
        totalMinutes -= 60;
        totalHours += 1;
    }

    return (
        <div className="relative h-56 overflow-hidden rounded-lg bg-cover bg-center shadow-lg">
            <div className="absolute inset-0">
                {recipe.image && !recipe.image.includes("example") && (
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        className="h-full w-full object-cover"
                        width={200}
                        height={200}
                    />
                )}
            </div>

            <div className="relative flex h-full flex-col justify-between bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="mb-1 mt-auto text-2xl font-bold text-white">
                    {recipe.title}
                </h2>
                {matchComponent && (
                    <div className="text-xs italic text-gray-50">
                        {matchComponent}
                    </div>
                )}

                <div className="mt-1 flex justify-between text-white">
                    <div className="flex">
                        <ClockIcon className="mr-1 w-5" />
                        {formatTime(totalHours, totalMinutes)}
                    </div>
                    <Link
                        className="underline underline-offset-4"
                        href={`/recipes/${recipe.id}`}
                    >
                        View Recipe
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
