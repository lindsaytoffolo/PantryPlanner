"use client";

import { useOptimistic, useState, useTransition } from "react";
import Autocomplete from "@/app/ui/autocomplete";
import { PencilIcon, Bars3Icon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { GroceryItem } from "@/app/lib/definitions";
import { createGroceryItem, toggleGroceryItem, updateGroceryListOrder } from "@/app/lib/actions";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import EditItemModal from "./edit-item-modal";

type GroceryListItemProps = {
    groceryItem: GroceryItem;
    index: number;
    onEditItem: () => void;
};
function GroceryListItem({ groceryItem, index, onEditItem }: GroceryListItemProps) {
    const [_, startTransition] = useTransition();

    const [optimisticItem, setOptimisticItem] = useOptimistic(
        groceryItem,
        (currentItem: GroceryItem, newItem: GroceryItem) => ({ ...currentItem, ...newItem })
    );

    const handleClickCheckbox = () => {
        startTransition(() => {
            const newItem = { ...optimisticItem, checked: !optimisticItem.checked };
            setOptimisticItem(newItem);
            toggleGroceryItem(newItem.id!, newItem.checked);
        });
    };

    return (
        <Draggable key={groceryItem.id} draggableId={groceryItem.id!} index={index}>
            {(provided, snapshot) => (
                <li
                    className="py-3 px-4 bg-white rounded-md flex justify-between mb-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <div className="flex items-center">
                        <input
                            className="cursor-pointer mr-3 rounded-sm w-6 h-6 text-violet-900 border-neutral-500 border-2 focus:ring-violet-400 hover:border-violet-900"
                            type="checkbox"
                            checked={!!optimisticItem.checked}
                            onChange={handleClickCheckbox}
                            id={`checkbox-${index}`}
                        />
                        <div className="w-8 h-8 mr-3 flex items-center justify-center">
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
                        <span className="text-sm text-slate-500">{optimisticItem.quantity}</span>
                    </div>
                    <div {...provided.dragHandleProps} className="flex items-center">
                        <PencilSquareIcon
                            className="cursor-pointer w-6 mr-3 text-neutral-500 mt-[-2px] hover:text-violet-900"
                            onClick={onEditItem}
                        />
                        <Bars3Icon className="cursor-grab w-7 text-neutral-500 hover:text-violet-900" />
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
    const [selectedGroceryItem, setSelectedGroceryItem] = useState<GroceryItem | undefined>();

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
            const updatedItems = reorderedItems.map((item, i) => ({ ...item, sort_order: i + 1 }));

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
                                        onEditItem={() => onEditItem(groceryItem)}
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
