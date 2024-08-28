"use client";

import { Recipe } from "@/app/lib/definitions";
import { formatTime } from "@/app/lib/utils";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex w-full flex-col overflow-hidden rounded-xl shadow md:h-96 md:flex-row">
            <DeleteRecipeModal
                isOpen={isModalOpen}
                onClose={onCloseModal}
                recipe={recipe}
            />
            <div className="w-full md:w-5/12">
                <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex w-full flex-col justify-between bg-violet-900 p-4 text-white md:w-7/12 md:p-8">
                <div>
                    <h1 className="mb-4 text-3xl font-medium">
                        {recipe.title}
                    </h1>
                    <p className="text-md mb-6">{recipe.description}</p>
                </div>
                <div className="flex justify-between">
                    <div className="text-base md:text-lg">
                        <div>
                            <span className="mr-2 font-medium">Servings:</span>
                            {recipe.servings}
                        </div>
                        <div>
                            <span className="mr-2 font-medium">Prep Time:</span>
                            {formatTime(
                                recipe.prep_time_hours,
                                recipe.prep_time_minutes,
                            )}
                        </div>
                        <div>
                            <span className="mr-2 font-medium">Cook Time:</span>
                            {formatTime(
                                recipe.cook_time_hours,
                                recipe.cook_time_minutes,
                            )}
                        </div>
                    </div>
                    <div className="flex items-end">
                        <Link href={`${pathname}/edit`}>
                            <PencilSquareIcon className="mr-4 w-6 cursor-pointer md:w-8" />
                        </Link>
                        <TrashIcon
                            onClick={openModal}
                            className="w-6 cursor-pointer text-red-500 md:w-8"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeHeader;
