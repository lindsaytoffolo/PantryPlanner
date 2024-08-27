"use client";

import React from "react";
import FormControl from "./form-control";

type TextAreaProps = {
    className?: string;
    label?: string;
    id: string;
    errors?: string[];
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({
    className,
    label,
    id,
    defaultValue,
    errors,
    required,
    ...textareaProps
}) => {
    return (
        <FormControl
            className={className}
            label={label}
            id={id}
            errors={errors}
            required={required}
        >
            <textarea
                id={id}
                name={id}
                className="w-full appearance-none rounded-lg border-0 p-2 text-gray-900 focus:outline-none focus:ring-0"
                defaultValue={defaultValue}
                {...textareaProps}
            />
        </FormControl>
    );
};

export default TextArea;
