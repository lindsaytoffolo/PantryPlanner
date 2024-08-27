"use client";

import {
    createGroceryItem,
    toggleGroceryItem,
    updateGroceryListOrder,
} from "@/app/lib/actions";
import { GroceryItem } from "@/app/lib/definitions";
import Autocomplete from "@/app/ui/autocomplete";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "@hello-pangea/dnd";
import {
    Bars3Icon,
    PencilIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useOptimistic, useState, useTransition } from "react";
import EditItemModal from "./edit-item-modal";

type GroceryListItemProps = {
    groceryItem: GroceryItem;
    index: number;
    onEditItem: () => void;
};
function GroceryListItem({
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
                        <div className="mr-3 flex h-8 w-8 items-center justify-center">
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
                        <span className="mr-2">{optimisticItem.name}</span>
                        <span className="text-sm text-slate-500">
                            {optimisticItem.quantity}
                        </span>
                    </div>
                    <div
                        {...provided.dragHandleProps}
                        className="flex items-center"
                    >
                        <PencilSquareIcon
                            className="mr-3 mt-[-2px] w-6 cursor-pointer text-neutral-500 hover:text-violet-900"
                            onClick={onEditItem}
                        />
                        <Bars3Icon className="w-7 cursor-grab text-neutral-500 hover:text-violet-900" />
                    </div>
                </li>
            )}
        </Draggable>
    );
}

type Item = {
    id: number;
    text: string;
};

type GroceryListProps = {
    groceryItems: GroceryItem[];
};
export default function GroceryList({ groceryItems }: GroceryListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroceryItem, setSelectedGroceryItem] = useState<
        GroceryItem | undefined
    >();

    const onEditItem = (groceryItem: GroceryItem) => {
        setSelectedGroceryItem(groceryItem);
        setIsModalOpen(true);
    };

    const onCloseModal = () => {
        setSelectedGroceryItem(undefined);
        setIsModalOpen(false);
    };

    const [_, startTransition] = useTransition();
    const [optimisticItems, addOptimisticItem] = useOptimistic(groceryItems);

    const handleAddItem = (newItem: GroceryItem) => {
        const newItems = [...optimisticItems, newItem];
        addOptimisticItem(newItems);
        createGroceryItem(newItem.name, newItem.image);
    };

    const onDragEnd = (result: DropResult) => {
        startTransition(() => {
            const { source, destination } = result;
            if (!destination || source.index === destination.index) {
                return;
            }

            const reorderedItems = Array.from(optimisticItems);
            const [movedItem] = reorderedItems.splice(source.index, 1);
            reorderedItems.splice(destination.index, 0, movedItem);
            const updatedItems = reorderedItems.map((item, i) => ({
                ...item,
                sort_order: i + 1,
            }));

            addOptimisticItem(updatedItems);
            updateGroceryListOrder(updatedItems);
        });
    };

    return (
        <>
            <EditItemModal
                isOpen={isModalOpen}
                onClose={onCloseModal}
                groceryItem={selectedGroceryItem}
            />
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Autocomplete onAdd={handleAddItem} />
            </div>
            <div className="mt-8 overflow-hidden rounded-lg bg-violet-100 p-4">
                <span>{`${optimisticItems.length} items`}</span>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <ul
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="mt-4"
                            >
                                {optimisticItems.map((groceryItem, index) => (
                                    <GroceryListItem
                                        key={index}
                                        groceryItem={groceryItem}
                                        index={index}
                                        onEditItem={() =>
                                            onEditItem(groceryItem)
                                        }
                                    />
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    );
}
