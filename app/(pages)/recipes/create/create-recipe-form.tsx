"use client";

import React, { useState, useTransition } from "react";
import ImageUploader from "./image-uploader";
import Input from "@/app/ui/input";
import TextArea from "@/app/ui/text-area";
import { RecipeFormState, createRecipe } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";

const CreateRecipeForm: React.FC = () => {
    const [previewImage, setPreviewImage] = useState<string | undefined>();
    const [state, setState] = useState<RecipeFormState>({ message: null, errors: {} });
    const [isSubmitting, startTransition] = useTransition();

    const handleFileChange = (file: File | null) => {
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(undefined);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(async () => {
            const formData = new FormData(event.currentTarget);
            try {
                const result = await createRecipe(state, formData);
                setState(result);
            } catch (error) {
                console.error("Image upload failed", error);
            }
        });
    };

    return (
        <div className="container mt-8">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Title" id="title" errors={state.errors?.title} required />
                <div className="flex gap-4">
                    <ImageUploader
                        onFileChange={handleFileChange}
                        previewImage={previewImage}
                        errors={state.errors?.image}
                    />
                    <div>
                        <div className="mt-[4px]">Prep Time</div>
                        <div className="flex gap-4">
                            <Input
                                className="grow"
                                label="Hours"
                                id="prep_time_hours"
                                type="number"
                                errors={state.errors?.prep_time_hours}
                            />
                            <Input
                                className="grow"
                                label="Minutes"
                                id="prep_time_minutes"
                                type="number"
                                errors={state.errors?.prep_time_minutes}
                            />
                        </div>
                        <div className="mt-4">Cook Time</div>
                        <div className="flex gap-4 mb-6">
                            <Input
                                className="grow"
                                label="Hours"
                                id="cook_time_hours"
                                type="number"
                                errors={state.errors?.cook_time_hours}
                            />
                            <Input
                                className="grow"
                                label="Minutes"
                                id="cook_time_minutes"
                                type="number"
                                errors={state.errors?.cook_time_minutes}
                            />
                        </div>
                        <Input
                            label="Number of servings"
                            id="servings"
                            type="number"
                            errors={state.errors?.servings}
                            required
                        />
                    </div>
                </div>
                <TextArea
                    label="Description"
                    id="description"
                    rows={4}
                    errors={state.errors?.description}
                />

                <Button type="submit" aria-disabled={isSubmitting}>
                    Save
                </Button>
            </form>
        </div>
    );
};

export default CreateRecipeForm;
