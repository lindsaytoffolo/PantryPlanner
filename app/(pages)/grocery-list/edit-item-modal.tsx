"use client";

import React, { useActionState } from "react";
import Modal, { ModalProps } from "./modal";
import { GroceryItem } from "@/app/lib/definitions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { GroceryItemFormState, deleteGroceryItem, updateGroceryItem } from "@/app/lib/actions";
import TextArea from "@/app/ui/text-area";
import Input from "@/app/ui/input";

interface EditItemModalProps extends Omit<ModalProps, "children"> {
    groceryItem?: GroceryItem;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ isOpen, onClose, groceryItem }) => {
    const initialState: GroceryItemFormState = { message: null, errors: {} };
    const updateGroceryItemWithId = updateGroceryItem.bind(null, groceryItem?.id!);
    const [state, formAction] = useActionState(updateGroceryItemWithId, initialState);

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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex justify-center h-14 w-14 items-center mx-auto mb-4">
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
                        className="bg-red-600"
                        onClick={() => deleteGroceryItem(groceryItem.id!)}
                    >
                        <TrashIcon className="w-5 text-white mr-1" />
                        Delete
                    </Button>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditItemModal;
