"use client";

import React from "react";
import { classNames } from "../lib/utils";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    label: string;
    required?: boolean;
}

const FormLabel: React.FC<FormLabelProps> = ({
    label,
    required = false,
    className = "",
    ...labelProps
}) => {
    return (
        <label
            {...labelProps}
            className={classNames(
                "block text-sm font-medium text-gray-700",
                required && 'after:content-["*"] after:text-red-500 after:ml-1',
                className
            )}
        >
            {label}
        </label>
    );
};

export default FormLabel;
