import { Recipe } from "@/app/lib/definitions";
import React from "react";

const RecipeInstructions = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="w-7/12 rounded-xl bg-white shadow p-8 grow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h3>
            <ol className="list-decimal pl-6 space-y-2">
                {recipe.instructions?.map((i) => (
                    <li key={i.id} className="text-xl">
                        <span className="text-gray-500">{i.instruction}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeInstructions;
