"use client";

import React, { useActionState, useState, useTransition } from "react";
import ImageUploader from "./image-uploader";
import Input from "@/app/ui/input";
import TextArea from "@/app/ui/text-area";
import { RecipeFormState, createRecipe } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { Ingredient, Instruction } from "@/app/lib/definitions";
import { XMarkIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import FormLabel from "@/app/ui/form-label";

// prevent negative values

const CreateRecipeForm: React.FC = () => {
    const [previewImage, setPreviewImage] = useState<string | undefined>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { name: "", quantity: "", comment: "" },
    ]);
    const [instructions, setInstructions] = useState<string[]>([""]);
    const initialState: RecipeFormState = { message: null, errors: {} };
    const [state, formAction, isSubmitting] = useActionState(createRecipe, initialState);

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
        setIngredients((prev) => prev.toSpliced(index, 1, { ...prev[index], [field]: value }));
    };

    const addIngredient = () => {
        setIngredients((prev) => [...prev, { name: "", quantity: "", comment: "" }]);
    };

    const removeIngredient = (index: number) => {
        setIngredients((prev) => prev.filter((_, i) => i !== index));
    };

    const handleInstructionChange = (index: number, value: string) => {
        setInstructions((prev) => prev.toSpliced(index, 1, value));
    };

    const addInstruction = () => {
        setInstructions((prev) => [...prev, ""]);
    };

    const removeInstruction = (index: number) => {
        setInstructions((prev) => prev.filter((_, i) => i !== index));
    };

    console.log("^^^^^", state);

    return (
        <div className="container mt-8 bg-white rounded-lg p-6">
            <form action={formAction} className="space-y-4">
                <Input label="Title" id="title" errors={state.errors?.title} required />
                <div className="flex gap-4">
                    <div className="grow flex flex-col">
                        <FormLabel label="Image" required />
                        <ImageUploader
                            setPreviewImage={setPreviewImage}
                            previewImage={previewImage}
                            errors={state.errors?.image}
                        />
                    </div>

                    <div>
                        <Input
                            label="Number of servings"
                            id="servings"
                            type="number"
                            errors={state.errors?.servings}
                            required
                        />
                        <FormLabel className="mt-4" label="Prep Time" />
                        <div className="flex gap-4">
                            <Input
                                className="grow"
                                unit="hours"
                                id="prep_time_hours"
                                type="number"
                                errors={state.errors?.prep_time_hours}
                            />
                            <Input
                                className="grow"
                                unit="mins"
                                id="prep_time_minutes"
                                type="number"
                                errors={state.errors?.prep_time_minutes}
                            />
                        </div>
                        <FormLabel className="mt-4" label="Cook Time" />
                        <div className="flex gap-4">
                            <Input
                                className="grow"
                                unit="hours"
                                id="cook_time_hours"
                                type="number"
                                errors={state.errors?.cook_time_hours}
                            />
                            <Input
                                className="grow"
                                unit="mins"
                                id="cook_time_minutes"
                                type="number"
                                errors={state.errors?.cook_time_minutes}
                            />
                        </div>
                    </div>
                </div>
                <TextArea
                    label="Description"
                    id="description"
                    rows={3}
                    maxLength={500}
                    errors={state.errors?.description}
                />

                <div>
                    <FormLabel className="mb-0.5" label="Ingredients" />
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <div className="flex-grow flex gap-2">
                                <Input
                                    className="grow"
                                    placeholder="Quantity (ie. 2 cups)"
                                    id={`ingredient_quantity_${index}`}
                                    value={ingredient.quantity}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "quantity", e.target.value)
                                    }
                                />
                                <Input
                                    className="grow"
                                    placeholder="Name (ie. onion)"
                                    id={`ingredient_name_${index}`}
                                    value={ingredient.name}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "name", e.target.value)
                                    }
                                    required
                                />
                                <TextArea
                                    className="grow"
                                    placeholder="Comment (ie. chopped)"
                                    id={`ingredient_comment_${index}`}
                                    value={ingredient.comment}
                                    onChange={(e) =>
                                        handleIngredientChange(index, "comment", e.target.value)
                                    }
                                    rows={1}
                                />
                            </div>
                            <XMarkIcon
                                onClick={() => removeIngredient(index)}
                                className="cursor-pointer w-6 text-gray-500 hover:text-violet-900"
                            />
                        </div>
                    ))}
                    <Button variant="text" onClick={addIngredient}>
                        <PlusCircleIcon className="w-6 stroke-2 mr-1" />
                        Add Ingredient
                    </Button>
                </div>

                <div>
                    <FormLabel className="mb-0.5" label="Instructions" />
                    {instructions.map((instruction, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <div className="flex-grow">
                                <TextArea
                                    placeholder={`Step ${index + 1}`}
                                    id={`instruction_${index}`}
                                    value={instruction}
                                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                                    required
                                />
                            </div>
                            <XMarkIcon
                                onClick={() => removeInstruction(index)}
                                className="cursor-pointer w-6 text-gray-500 hover:text-violet-900"
                            />
                        </div>
                    ))}
                    <Button variant="text" onClick={addInstruction}>
                        <PlusCircleIcon className="w-6 stroke-2 mr-1" />
                        Add Step
                    </Button>
                </div>

                <Button className="ml-auto" type="submit" loading={isSubmitting}>
                    Create Recipe
                </Button>
            </form>
        </div>
    );
};

export default CreateRecipeForm;
