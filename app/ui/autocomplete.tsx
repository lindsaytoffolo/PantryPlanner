"use client";

import { useState, useCallback, useEffect } from "react";
import { performFoodSearch } from "../lib/actions";
import { useDebouncedCallback } from "use-debounce";

type FatSecretFood = {
    brand_name: string;
    food_description: string;
    food_id: string;
    food_name: string;
    food_type: string;
    food_url: string;
};

const Autocomplete: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    // Create a debounced version of the API call function
    const fetchSuggestions = useDebouncedCallback(async (query: string) => {
        try {
            const response = await performFoodSearch(query);
            const options = response?.foods?.food?.map((f: FatSecretFood) => f.food_name) || [];
            setSuggestions(options);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }, 300); // Adjust the debounce delay as needed (e.g., 300ms)

    useEffect(() => {
        if (inputValue) {
            fetchSuggestions(inputValue);
        } else {
            setSuggestions([]);
        }
    }, [inputValue, fetchSuggestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsDropdownVisible(true);
    };

    const handleSuggestionClick = (value: string) => {
        setInputValue(value);
        setIsDropdownVisible(false);
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
        <div className="relative autocomplete">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
                placeholder="Type to search..."
            />
            {isDropdownVisible && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full border border-gray-300 bg-white rounded mt-1 max-h-60 overflow-auto">
                    <li
                        onClick={() => handleSuggestionClick(inputValue)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                        {inputValue}
                    </li>
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
