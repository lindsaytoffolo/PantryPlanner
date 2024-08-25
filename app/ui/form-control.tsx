"use client";

import React from "react";
import FormLabel from "./form-label";

type FormControlProps = {
    className?: string;
    label?: string;
    id: string;
    errors?: string[];
    required?: boolean;
    children: React.ReactNode;
};

const FormControl: React.FC<FormControlProps> = ({
    className,
    label,
    id,
    errors,
    required,
    children,
}) => {
    return (
        <div className={className}>
            {label && <FormLabel htmlFor={id} label={label} required={required} />}
            <div className="flex w-full bg-transparent rounded-lg border border-gray-300 hover:border-gray-500 focus-within:border-violet-900 shadow-custom-input">
                {children}
            </div>
            <div id={`${id}-error`} aria-live="polite" aria-atomic="true">
                {errors &&
                    errors.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default FormControl;
