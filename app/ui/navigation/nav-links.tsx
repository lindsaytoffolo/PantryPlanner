"use client";

import { classNames } from "@/app/lib/utils";
import {
    CakeIcon,
    HomeIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: "Home", href: "/home", icon: HomeIcon },
    { name: "Recipes", href: "/recipes", icon: CakeIcon },
    { name: "Grocery List", href: "/grocery-list", icon: ShoppingCartIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={classNames(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium shadow hover:bg-violet-100 hover:text-violet-900 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-violet-100 text-violet-900":
                                    pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6 stroke-2" />
                        <p className="mt-[2px] hidden text-lg md:block">
                            {link.name}
                        </p>
                    </Link>
                );
            })}
        </>
    );
}
