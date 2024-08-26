"use client";

import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import Modal, { ModalProps } from "../../grocery-list/modal";
import { Recipe } from "@/app/lib/definitions";
import { deleteRecipe } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

interface DeleteRecipeModalProps extends Omit<ModalProps, "children"> {
    recipe: Recipe;
}

const DeleteRecipeModal: React.FC<DeleteRecipeModalProps> = ({ isOpen, onClose, recipe }) => {
    const router = useRouter();

    // TODO: fix weird flow
    const onDelete = async () => {
        await deleteRecipe(recipe.id);
        onClose();
        router.push("/recipes");
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-xl mt-4">Are you sure you'd like to delete this recipe?</div>
            <div className="mt-8 flex justify-between">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    className="bg-red-600 hover:bg-red-800 active:bg-red-800 focus-visible:outline-red-400"
                    onClick={onDelete}
                >
                    <TrashIcon className="w-5 text-white mr-1" />
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default DeleteRecipeModal;
