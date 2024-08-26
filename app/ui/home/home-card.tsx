import React from "react";
import Link from "next/link";
import { classNames } from "@/app/lib/utils";

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
                "bg-gray-100 rounded-lg shadow-lg overflow-scroll transition-transform p-6 transform hover:scale-105 focus:outline-none",
                className
            )}
        >
            <div className="flex flex-col items-center justify-center h-full text-center">
                {children}
            </div>
        </Link>
    );
};

export default HomeCard;
