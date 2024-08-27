import { classNames } from "@/app/lib/utils";
import Link from "next/link";
import React from "react";

interface HomeCardProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

const HomeCard: React.FC<HomeCardProps> = ({ href, className, children }) => {
    return (
        <Link
            href={href}
            className={classNames(
                "transform overflow-hidden rounded-lg bg-gray-100 p-6 shadow-lg transition-transform hover:scale-105 focus:outline-none",
                className,
            )}
        >
            <div className="flex h-full flex-col items-center justify-center text-center">
                {children}
            </div>
        </Link>
    );
};

export default HomeCard;
