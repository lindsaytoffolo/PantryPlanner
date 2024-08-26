"use client";

import { Recipe } from "@/app/lib/definitions";
import { getSnippet } from "@/app/lib/utils";
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
        } else if (recipe.match_source === "description" && recipe.description) {
            const snippetLength = 50;
            const snippet = getSnippet(recipe.description, query, snippetLength);
            return reactStringReplace(snippet, query, (match, i) => (
                <span key={i} className="font-bold text-white">
                    {match}
                </span>
            ));
        } else if (recipe.ingredient_match) {
            return (
                <>
                    Ingredient list contains:{" "}
                    <span className="font-bold text-white">{recipe.ingredient_match}</span>
                </>
            );
        }
    };
    const matchComponent = getMatch();

    return (
        <div className="relative h-56 bg-cover bg-center rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0">
                {recipe.image && !recipe.image.includes("example") && (
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                    />
                )}
            </div>

            <div className="relative p-6 flex flex-col justify-between h-full bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold text-white mb-1 mt-auto">{recipe.title}</h2>
                {matchComponent && (
                    <div className="text-xs text-gray-50 italic">{matchComponent}</div>
                )}

                <div className="flex justify-end mt-1">
                    <Link
                        className="text-white underline underline-offset-4"
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
