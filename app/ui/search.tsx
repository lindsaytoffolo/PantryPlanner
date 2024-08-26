"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import FormControl from "./form-control";
import useDebouncedCallback from "../hooks/useDebouncedCallback";

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
            <MagnifyingGlassIcon className="w-5 ml-2" />
            <input
                className="w-full text-gray-800 appearance-none border-0 p-2 rounded-lg focus:outline-none focus:ring-0"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get("query")?.toString()}
            />
        </FormControl>
    );
}
