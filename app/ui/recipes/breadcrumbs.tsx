import { classNames } from "@/app/lib/utils";
import Link from "next/link";

interface Breadcrumb {
    label: string;
    href: string;
    active?: boolean;
}

export default function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: Breadcrumb[];
}) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 block">
            <ol className="flex flex-col text-xl md:flex-row md:text-2xl">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={breadcrumb.href}
                        aria-current={breadcrumb.active}
                        className={classNames(
                            "flex items-center",
                            breadcrumb.active
                                ? "text-gray-900"
                                : "text-gray-500",
                        )}
                    >
                        <span className="flex items-center overflow-hidden">
                            <Link href={breadcrumb.href} className="truncate">
                                {breadcrumb.label}
                            </Link>
                        </span>
                        {index < breadcrumbs.length - 1 && (
                            <span className="mx-3 inline-block whitespace-nowrap">
                                /
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
