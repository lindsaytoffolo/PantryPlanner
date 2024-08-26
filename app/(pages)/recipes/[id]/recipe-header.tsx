"use client";

import { useState } from "react";
import { Recipe } from "@/app/lib/definitions";
import React from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteRecipeModal from "./delete-recipe-modal";

type RecipeHeaderProps = {
    recipe: Recipe;
};

const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const formatPrepTime = (hours?: number, minutes?: number) => {
        if (hours && minutes) {
            return `${hours}h ${minutes}mins`;
        } else if (hours) {
            return `${hours}h`;
        }
        return `${minutes}mins`;
    };

    return (
        <div className="w-full rounded-xl overflow-hidden flex h-96 shadow">
            <DeleteRecipeModal isOpen={isModalOpen} onClose={onCloseModal} recipe={recipe} />
            <div className="w-5/12">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
            </div>

            <div className="w-7/12 bg-violet-900 p-8 flex flex-col justify-between text-white">
                <div>
                    <h1 className="text-3xl font-medium mb-4">{recipe.title}</h1>
                    <p className="text-md mb-6">{recipe.description}</p>
                </div>
                <div className="flex justify-between">
                    <div className="text-lg">
                        <div>
                            <span className="font-medium mr-2">Servings:</span>
                            {recipe.servings}
                        </div>
                        <div>
                            <span className="font-medium mr-2">Prep Time:</span>
                            {formatPrepTime(recipe.prep_time_hours, recipe.prep_time_minutes)}
                        </div>
                        <div>
                            <span className="font-medium mr-2">Cook Time:</span>
                            {formatPrepTime(recipe.cook_time_hours, recipe.cook_time_minutes)}
                        </div>
                    </div>
                    <div className="flex items-end">
                        <PencilSquareIcon className="cursor-pointer w-8 mr-4" />
                        <TrashIcon
                            onClick={openModal}
                            className="cursor-pointer w-8 text-red-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeHeader;
