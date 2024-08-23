"use client";

import React from "react";

type FormControlProps = {
    className?: string;
    label: string;
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
            <div className="relative">
                {children}
                <label
                    htmlFor={id}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-violet-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[22px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
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
