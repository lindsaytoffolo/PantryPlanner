import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function Logo() {
    return (
        <div className="flex flex-row items-center leading-none text-white">
            <BuildingStorefrontIcon className="mr-4 h-12 w-12 shrink-0 md:h-14 md:w-14" />
            <p className="text-[34px] md:text-[44px]">
                Pantry
                <br className="hidden md:block" />
                Planner
            </p>
        </div>
    );
}
