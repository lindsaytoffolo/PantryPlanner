"use client";

import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import { nutritionixFoodSearch } from "../lib/actions";
import { GroceryItem } from "../lib/definitions";
import FormControl from "./form-control";

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
            className="flex cursor-pointer items-center border-t border-gray-300 p-2 hover:bg-gray-100"
        >
            <div className="mr-3 flex w-8 items-center justify-center">
                {foodImage ? (
                    <img
                        className="max-h-8 max-w-8"
                        alt={foodName}
                        src={foodImage}
                    />
                ) : (
                    <PencilIcon className="w-6" />
                )}
            </div>
            {foodName}
        </li>
    );
};

type IngredientAutocompleteProps = {
    onAdd: (newItem: GroceryItem) => void;
};
const IngredientAutocomplete: React.FC<IngredientAutocompleteProps> = ({
    onAdd,
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<NutritionixInstantResult[]>(
        [],
    );
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    const updateOptions = async (query: string) => {
        const response = query && (await nutritionixFoodSearch(query));
        const options = response?.common || [];
        const filteredOptions = options.reduce(
            (
                acc: { seen: Set<string>; items: NutritionixInstantResult[] },
                item: NutritionixInstantResult,
            ) => {
                if (!acc.seen.has(item.tag_id)) {
                    acc.seen.add(item.tag_id);
                    acc.items.push(item);
                }
                return acc;
            },
            { seen: new Set(), items: [] },
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
        <div className="relative w-full">
            <FormControl
                className="flex flex-1 flex-shrink-0 bg-white"
                id="autocomplete"
            >
                <PlusIcon className="ml-2 w-6 stroke-2 text-violet-900" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-lg border-0 p-2 text-gray-800 focus:outline-none focus:ring-0"
                    placeholder="Add item"
                    onFocus={() => setIsDropdownVisible(true)}
                />
            </FormControl>
            {isDropdownVisible && (inputValue || suggestions.length > 0) && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white p-2">
                    {inputValue && (
                        <FoodItem
                            foodName={inputValue}
                            onClick={() =>
                                handleSuggestionClick({ name: inputValue })
                            }
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

export default IngredientAutocomplete;
