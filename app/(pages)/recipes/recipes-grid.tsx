"use client";

import { fetchInvoicesPages, fetchRecipes } from "@/app/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useEffect, useRef, useState, useTransition } from "react";
import { Recipe } from "@/app/lib/definitions";
import { useInView } from "react-intersection-observer";
import RecipeCard from "./recipe-card";

export const metadata: Metadata = {
    title: "Recipes",
};

type RecipesGridProps = {
    initialRecipes: Recipe[];
    query: string;
};

const NUMBER_OF_RESCIPES_TO_FETCH = 9;

export default function RecipesGrid({ initialRecipes, query }: RecipesGridProps) {
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
            const apiRecipes = await fetchRecipes(offset, NUMBER_OF_RESCIPES_TO_FETCH, query);

            if (apiRecipes.length == 0) {
                setHasMoreData(false);
            }

            setRecipes((prevRecipes) => [...prevRecipes, ...apiRecipes]);
            setOffset((prevOffset) => prevOffset + NUMBER_OF_RESCIPES_TO_FETCH);
        }
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {recipes?.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
            <div className="mt-8">
                {(hasMoreData && <div ref={scrollTrigger}>Loading...</div>) || (
                    <p className="...">No more recipes to load</p>
                )}
            </div>
        </>
    );
}
