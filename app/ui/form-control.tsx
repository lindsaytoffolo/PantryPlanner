"use client";

import React from "react";
import { classNames } from "../lib/utils";
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
        <div className="w-full flex-1 md:w-auto">
            {label && (
                <FormLabel htmlFor={id} label={label} required={required} />
            )}
            <div
                className={classNames(
                    "flex w-full rounded-lg border border-gray-300 bg-transparent shadow-custom-input focus-within:border-gray-500 hover:border-gray-500",
                    className,
                )}
            >
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
