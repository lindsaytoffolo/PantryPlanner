import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";

export default function Logo() {
    return (
        <div className="flex flex-row items-center leading-none text-white">
            <BuildingStorefrontIcon className="h-14 w-14 shrink-0 mr-4" />
            <p className="text-[44px]">
                Pantry
                <br />
                Planner
            </p>
        </div>
    );
}
