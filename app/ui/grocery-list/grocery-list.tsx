"use client";

import { createGroceryItem, updateGroceryListOrder } from "@/app/lib/actions";
import { GroceryItem } from "@/app/lib/definitions";
import IngredientAutocomplete from "@/app/ui/ingredient-autocomplete";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { useOptimistic, useState, useTransition } from "react";
import EditItemModal from "./edit-item-modal";
import GroceryListItem from "./grocery-list-item";

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
                <IngredientAutocomplete onAdd={handleAddItem} />
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
