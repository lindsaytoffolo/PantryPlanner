"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useDebouncedCallback from "../hooks/useDebouncedCallback";
import FormControl from "./form-control";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 200);

    return (
        <FormControl className="flex flex-1 flex-shrink-0 bg-white" id="search">
            <MagnifyingGlassIcon className="ml-2 w-5" />
            <input
                className="w-full appearance-none rounded-lg border-0 p-2 text-gray-800 placeholder:text-sm focus:outline-none focus:ring-0 md:placeholder:text-base"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
            />
        </FormControl>
    );
}
