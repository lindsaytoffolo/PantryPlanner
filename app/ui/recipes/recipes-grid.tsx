"use client";

import { fetchRecipes } from "@/app/lib/data";
import { Recipe } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import RecipeCard from "./recipe-card";

type RecipesGridProps = {
    initialRecipes: Recipe[];
    query: string;
};

const NUMBER_OF_RESCIPES_TO_FETCH = 9;

export default function RecipesGrid({
    initialRecipes,
    query,
}: RecipesGridProps) {
    const [offset, setOffset] = useState(NUMBER_OF_RESCIPES_TO_FETCH);
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [scrollTrigger, isInView] = useInView();

    useEffect(() => {
        if (isInView && hasMoreData) {
            loadMoreRecipes();
        }
    }, [isInView, hasMoreData]);

    const loadMoreRecipes = async () => {
        if (hasMoreData) {
            const apiRecipes = await fetchRecipes(
                offset,
                NUMBER_OF_RESCIPES_TO_FETCH,
                query,
            );

            if (apiRecipes.length == 0) {
                setHasMoreData(false);
            }

            setRecipes((prevRecipes) => [...prevRecipes, ...apiRecipes]);
            setOffset((prevOffset) => prevOffset + NUMBER_OF_RESCIPES_TO_FETCH);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {recipes?.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} query={query} />
                ))}
            </div>
            <div className="mt-8">
                {(hasMoreData && <div ref={scrollTrigger}>Loading...</div>) || (
                    <p>No more recipes to load</p>
                )}
            </div>
            <div className="mt-8 text-xs text-gray-500">
                <p>
                    Disclaimer: The recipes and images featured on this website
                    are sourced from HelloFresh, and all associated rights and
                    trademarks are owned by HelloFresh. I do not own the content
                    but have manually entered details for personal use only.
                    This website is intended solely for personal, non-commercial
                    purposes. I am not affiliated with HelloFresh, and the
                    accuracy and suitability of the content are not guaranteed.
                    For any questions or concerns, please contact me directly.
                </p>
            </div>
        </>
    );
}
