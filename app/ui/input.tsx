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
            {unit && <span className="flex items-center my-2 ml-2 text-gray-400">{unit}</span>}
            <input
                type="text"
                id={id}
                name={id}
                className="w-full text-gray-800 appearance-none border-0 p-2 rounded-lg focus:outline-none focus:ring-0"
                defaultValue={defaultValue}
                aria-describedby={`${id}-error`}
                {...inputProps}
            />
        </FormControl>
    );
};

export default Input;
