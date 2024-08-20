"use client";

import React, { useActionState } from "react";
import Modal, { ModalProps } from "./modal";
import { GroceryItem } from "@/app/lib/definitions";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { GroceryItemFormState, deleteGroceryItem, updateGroceryItem } from "@/app/lib/actions";

type InputProps = {
    label: string;
    id: string;
    defaultValue?: string;
    errors?: string[];
};
const Input = ({ label, id, defaultValue, errors }: InputProps) => {
    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    id={id}
                    name={id}
                    className="block px-2 pb-2 pt-3.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    placeholder=" "
                    defaultValue={defaultValue}
                    aria-describedby={`${id}-error`}
                />
                <label
                    htmlFor={id}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                    {label}
                </label>
            </div>
            <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
                {errors &&
                    errors.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
};

type TextAreaProps = {
    label: string;
    id: string;
    defaultValue?: string;
    errors?: string[];
};
const TextArea = ({ label, id, defaultValue, errors }: TextAreaProps) => {
    return (
        <div>
            <div className="relative">
                <textarea
                    id={id}
                    name={id}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer"
                    placeholder=" "
                    defaultValue={defaultValue}
                />
                <label
                    htmlFor={id}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                    {label}
                </label>
            </div>
            <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
                {errors &&
                    errors.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
};

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
