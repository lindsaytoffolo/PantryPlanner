"use client";

import {
    GroceryItemFormState,
    deleteGroceryItem,
    updateGroceryItem,
} from "@/app/lib/actions";
import { GroceryItem } from "@/app/lib/definitions";
import { Button } from "@/app/ui/button";
import Input from "@/app/ui/input";
import Modal, { ModalProps } from "@/app/ui/modal";
import TextArea from "@/app/ui/text-area";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useActionState } from "react";

interface EditItemModalProps extends Omit<ModalProps, "children"> {
    groceryItem?: GroceryItem;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
    isOpen,
    onClose,
    groceryItem,
}) => {
    const initialState: GroceryItemFormState = { message: null, errors: {} };
    const updateGroceryItemWithId = updateGroceryItem.bind(
        null,
        groceryItem?.id!,
    );
    const [state, formAction] = useActionState(
        updateGroceryItemWithId,
        initialState,
    );

    if (!groceryItem) return null;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            await formAction(formData);
            onClose();
        } catch (error) {
            console.error("Error during form submission:", error);
        }
    };

    const onDelete = async () => {
        deleteGroceryItem(groceryItem.id!);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center">
                {groceryItem.image ? (
                    <img
                        className="max-h-14 max-w-14"
                        alt={groceryItem.name}
                        src={groceryItem.image}
                    />
                ) : (
                    <PencilIcon className="w-10" />
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <Input
                        label="Quantity"
                        id="quantity"
                        defaultValue={groceryItem.quantity}
                        errors={state?.errors?.quantity}
                    />
                    <Input
                        label="Item name"
                        id="name"
                        defaultValue={groceryItem.name}
                        errors={state?.errors?.name}
                    />
                    <TextArea
                        label="Comment"
                        id="comment"
                        defaultValue={groceryItem.comment}
                        errors={state?.errors?.comment}
                    />
                </div>

                <div className="mt-6 flex justify-between">
                    <Button
                        className="bg-red-600 hover:bg-red-800 focus-visible:outline-red-400 active:bg-red-800"
                        onClick={onDelete}
                    >
                        <TrashIcon className="mr-1 w-5 text-white" />
                        Delete
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditItemModal;
