"use client";

import { Recipe } from "@/app/lib/definitions";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DeleteRecipeModal from "./delete-recipe-modal";

type RecipeHeaderProps = {
    recipe: Recipe;
};

const RecipeHeader = ({ recipe }: RecipeHeaderProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pathname = usePathname();

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
        <div className="flex h-96 w-full overflow-hidden rounded-xl shadow">
            <DeleteRecipeModal
                isOpen={isModalOpen}
                onClose={onCloseModal}
                recipe={recipe}
            />
            <div className="w-5/12">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex w-7/12 flex-col justify-between bg-violet-900 p-8 text-white">
                <div>
                    <h1 className="mb-4 text-3xl font-medium">
                        {recipe.title}
                    </h1>
                    <p className="text-md mb-6">{recipe.description}</p>
                </div>
                <div className="flex justify-between">
                    <div className="text-lg">
                        <div>
                            <span className="mr-2 font-medium">Servings:</span>
                            {recipe.servings}
                        </div>
                        <div>
                            <span className="mr-2 font-medium">Prep Time:</span>
                            {formatPrepTime(
                                recipe.prep_time_hours,
                                recipe.prep_time_minutes,
                            )}
                        </div>
                        <div>
                            <span className="mr-2 font-medium">Cook Time:</span>
                            {formatPrepTime(
                                recipe.cook_time_hours,
                                recipe.cook_time_minutes,
                            )}
                        </div>
                    </div>
                    <div className="flex items-end">
                        <Link href={`${pathname}/edit`}>
                            <PencilSquareIcon className="mr-4 w-8 cursor-pointer" />
                        </Link>
                        <TrashIcon
                            onClick={openModal}
                            className="w-8 cursor-pointer text-red-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeHeader;
