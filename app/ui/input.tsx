"use client";

import React from "react";
import FormControl from "./form-control";

type InputProps = {
    className?: string;
    label?: string;
    id: string;
    errors?: string[];
    unit?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
    className,
    label,
    id,
    defaultValue,
    errors,
    required,
    unit,
    ...inputProps
}) => {
    return (
        <FormControl
            className={className}
            label={label}
            id={id}
            errors={errors}
            required={required}
        >
            {unit && (
                <span className="my-2 ml-2 flex items-center text-gray-500">
                    {unit}
                </span>
            )}
            <input
                type="text"
                id={id}
                name={id}
                className="w-full appearance-none rounded-lg border-0 p-2 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                defaultValue={defaultValue}
                aria-describedby={`${id}-error`}
                onFocus={
                    inputProps.type === "number"
                        ? (e) =>
                              e.target.addEventListener(
                                  "wheel",
                                  (e) => e.preventDefault(),
                                  { passive: false },
                              )
                        : undefined
                }
                {...inputProps}
            />
        </FormControl>
    );
};

export default Input;
