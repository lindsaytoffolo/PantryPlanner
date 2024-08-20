"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import { createGroceryItem, nutritionixFoodSearch } from "../lib/actions";
import { GroceryItem } from "../lib/definitions";

type NutritionixInstantResult = {
    food_name: string;
    photo: { thumb: string };
    tag_id: string;
};

type FoodItemProps = {
    foodName: string;
    foodImage?: string;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
};

const FoodItem = ({ foodName, foodImage, onClick }: FoodItemProps) => {
    return (
        <li
            onClick={onClick}
            className="p-2 cursor-pointer border-t border-gray-300 hover:bg-gray-100 flex items-center"
        >
            <div className="w-8 mr-3 flex items-center justify-center">
                {foodImage ? (
                    <img className="max-h-8 max-w-8" alt={foodName} src={foodImage} />
                ) : (
                    <PencilIcon className="w-6" />
                )}
            </div>
            {foodName}
        </li>
    );
};

type AutocompleteProps = {
    onAdd: (newItem: GroceryItem) => void;
};
const Autocomplete: React.FC<AutocompleteProps> = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<NutritionixInstantResult[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    const updateOptions = async (query: string) => {
        const response = query && (await nutritionixFoodSearch(query));
        const options = response?.common || [];
        const filteredOptions = options.reduce(
            (
                acc: { seen: Set<string>; items: NutritionixInstantResult[] },
                item: NutritionixInstantResult
            ) => {
                if (!acc.seen.has(item.tag_id)) {
                    acc.seen.add(item.tag_id);
                    acc.items.push(item);
                }
                return acc;
            },
            { seen: new Set(), items: [] }
        ).items;
        setSuggestions(filteredOptions);
    };

    const fetchSuggestions = useDebouncedCallback(async (query: string) => {
        try {
            await updateOptions(query);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }, 300);

    useEffect(() => {
        fetchSuggestions(inputValue);
    }, [inputValue, fetchSuggestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleSuggestionClick = (value: GroceryItem) => {
        onAdd(value);
        setIsDropdownVisible(false);
        setInputValue("");
    };

    const handleDocumentClick = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest(".autocomplete")) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }, []);

    return (
        <div className="relative autocomplete w-full">
            <div className="flex items-center">
                <span className="absolute left-2">
                    <PlusIcon className="text-violet-600 w-6 stroke-2" />
                </span>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-xl pl-10 focus:border-violet-600 border-gray-300 border-1"
                    placeholder="Add item"
                    onFocus={() => setIsDropdownVisible(true)}
                />
            </div>
            {isDropdownVisible && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full border border-gray-300 bg-white rounded mt-1 max-h-60 overflow-auto p-2">
                    {inputValue && (
                        <FoodItem
                            foodName={inputValue}
                            onClick={() => handleSuggestionClick({ name: inputValue })}
                        />
                    )}
                    {suggestions.map((suggestion, index) => (
                        <FoodItem
                            key={index}
                            foodName={suggestion.food_name}
                            foodImage={suggestion.photo.thumb}
                            onClick={() =>
                                handleSuggestionClick({
                                    name: suggestion.food_name,
                                    image: suggestion.photo.thumb,
                                })
                            }
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
