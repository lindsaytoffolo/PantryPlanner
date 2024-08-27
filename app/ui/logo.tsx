import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function Logo() {
    return (
        <div className="flex flex-row items-center leading-none text-white">
            <BuildingStorefrontIcon className="mr-4 h-14 w-14 shrink-0" />
            <p className="text-[44px]">
                Pantry
                <br />
                Planner
            </p>
        </div>
    );
}
