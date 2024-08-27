import { classNames } from "../lib/utils";

// cva

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "default" | "text";
    loading?: boolean;
}

const Spinner = () => {
    return (
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-2 border-solid border-white border-t-transparent" />
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
    const baseStyles =
        "flex h-10 items-center rounded-lg text-sm font-medium transition-colors";
    const variantStyles =
        variant === "default"
            ? "px-4 bg-violet-900 text-white hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900 active:bg-violet-950 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            : "pl-1 pr-4 text-violet-900 hover:text-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900 aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

    return (
        <button
            {...rest}
            type={type}
            className={classNames(baseStyles, variantStyles, className)}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
        >
            {loading && <Spinner />}
            {children}
        </button>
    );
}
