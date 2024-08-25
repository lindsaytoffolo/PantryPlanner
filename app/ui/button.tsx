import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "default" | "text";
    loading?: boolean;
}

const Spinner = () => {
    return (
        <div className="mr-2 w-4 h-4 border-2 border-t-2 border-white border-solid border-t-transparent rounded-full animate-spin" />
    );
};

export function Button({
    type = "button",
    children,
    className,
    variant = "default",
    loading = false,
    disabled,
    ...rest
}: ButtonProps) {
    const baseStyles = "flex h-10 items-center rounded-lg text-sm font-medium transition-colors";
    const variantStyles =
        variant === "default"
            ? "px-4 bg-violet-900 text-white hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900 active:bg-violet-950 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            : "px-1 text-violet-900 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900 aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

    return (
        <button
            {...rest}
            type={type}
            className={twMerge(clsx(baseStyles, variantStyles, className))}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
        >
            {loading && <Spinner />}
            {children}
        </button>
    );
}
