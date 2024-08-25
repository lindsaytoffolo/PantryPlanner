import { Recipe } from "@/app/lib/definitions";
import React from "react";

const RecipeIngredients = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="w-5/12 rounded-xl bg-violet-100 shadow p-8 grow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h3>
            <ul className="list-disc pl-6 space-y-2">
                {recipe.ingredients?.map((i) => (
                    <li className="text-xl">
                        <span className="text-gray-700 font-semibold mr-2">
                            {i.quantity ? `${i.quantity} ${i.name}` : i.name}
                        </span>
                        <span className="text-gray-500">{i.comment}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeIngredients;
