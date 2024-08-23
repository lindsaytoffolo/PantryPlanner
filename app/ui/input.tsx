"use client";

import React from "react";
import FormControl from "./form-control";

type InputProps = {
    className?: string;
    label: string;
    id: string;
    defaultValue?: string;
    errors?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
    className,
    label,
    id,
    defaultValue,
    errors,
    required,
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
            <input
                type="text"
                id={id}
                name={id}
                className={`bg-white block px-2 pb-2 pt-3.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-600 peer`}
                placeholder=" "
                defaultValue={defaultValue}
                aria-describedby={`${id}-error`}
                {...inputProps}
            />
        </FormControl>
    );
};

export default Input;
