"use client";

import { deleteRecipe } from "@/app/lib/actions";
import { Recipe } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import Modal, { ModalProps } from "@/app/ui/modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

interface DeleteRecipeModalProps extends Omit<ModalProps, "children"> {
    recipe: Recipe;
}

const DeleteRecipeModal: React.FC<DeleteRecipeModalProps> = ({
    isOpen,
    onClose,
    recipe,
}) => {
    const router = useRouter();

    const onDelete = async () => {
        await deleteRecipe(recipe.id);
        onClose();
        router.push("/recipes");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="mt-4 text-xl">
                Are you sure you'd like to delete this recipe?
            </div>
            <div className="mt-8 flex justify-between">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    className="bg-red-600 hover:bg-red-800 focus-visible:outline-red-400 active:bg-red-800"
                    onClick={onDelete}
                >
                    <TrashIcon className="mr-1 w-5 text-white" />
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteRecipeModal;
