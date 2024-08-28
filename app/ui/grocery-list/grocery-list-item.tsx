"use client";

import { toggleGroceryItem } from "@/app/lib/actions";
import { GroceryItem } from "@/app/lib/definitions";
import { Draggable } from "@hello-pangea/dnd";
import {
    Bars3Icon,
    PencilIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useOptimistic, useTransition } from "react";

type GroceryListItemProps = {
    groceryItem: GroceryItem;
    index: number;
    onEditItem: () => void;
};

export default function GroceryListItem({
    groceryItem,
    index,
    onEditItem,
}: GroceryListItemProps) {
    const [_, startTransition] = useTransition();

    const [optimisticItem, setOptimisticItem] = useOptimistic(
        groceryItem,
        (currentItem: GroceryItem, newItem: GroceryItem) => ({
            ...currentItem,
            ...newItem,
        }),
    );

    const handleClickCheckbox = () => {
        startTransition(() => {
            const newItem = {
                ...optimisticItem,
                checked: !optimisticItem.checked,
            };
            setOptimisticItem(newItem);
            toggleGroceryItem(newItem.id!, newItem.checked);
        });
    };

    return (
        <Draggable
            key={groceryItem.id}
            draggableId={groceryItem.id!}
            index={index}
        >
            {(provided, snapshot) => (
                <li
                    className="mb-2 flex justify-between rounded-md bg-white px-4 py-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div className="flex items-center">
                        <input
                            className="mr-3 h-6 w-6 cursor-pointer rounded-sm border-2 border-neutral-500 text-violet-900 hover:border-violet-900 focus:ring-violet-400"
                            type="checkbox"
                            checked={!!optimisticItem.checked}
                            onChange={handleClickCheckbox}
                            id={`checkbox-${index}`}
                        />
                        <div className="mr-3 hidden h-8 w-8 items-center justify-center md:flex">
                            {optimisticItem.image ? (
                                <img
                                    className="max-h-8 max-w-8"
                                    alt={optimisticItem.name}
                                    src={optimisticItem.image}
                                />
                            ) : (
                                <PencilIcon className="w-6" />
                            )}
                        </div>
                        <span className="mr-2 font-medium">
                            {optimisticItem.name}
                        </span>
                        {optimisticItem.quantity && (
                            <span className="mr-2 mt-0.5 text-sm text-gray-600">
                                {optimisticItem.quantity}
                            </span>
                        )}
                        {optimisticItem.comment && (
                            <span className="mt-0.5 hidden text-sm text-gray-400 md:block">
                                {optimisticItem.comment}
                            </span>
                        )}
                    </div>
                    <div
                        {...provided.dragHandleProps}
                        className="flex items-center"
                    >
                        <PencilSquareIcon
                            className="mr-3 mt-[-2px] hidden w-6 cursor-pointer text-neutral-500 hover:text-violet-900 md:block"
                            onClick={onEditItem}
                        />
                        <Bars3Icon className="w-7 cursor-grab text-neutral-500 hover:text-violet-900" />
                    </div>
                </li>
            )}
        </Draggable>
    );
}
