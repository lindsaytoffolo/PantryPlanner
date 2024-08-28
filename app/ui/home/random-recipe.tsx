import { fetchRandomRecipe } from "@/app/lib/data";
import { formatTime } from "@/app/lib/utils";
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import HomeCard from "./home-card";

export default async function RandomRecipe() {
    const recipe = await fetchRandomRecipe();

    let totalMinutes =
        (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);
    let totalHours =
        (recipe.prep_time_hours || 0) + (recipe.cook_time_hours || 0);
    if (totalMinutes >= 60) {
        totalMinutes -= 60;
        totalHours += 1;
    }

    return (
        <HomeCard
            href={`/recipes/${recipe.id}`}
            className="relative overflow-hidden rounded-xl p-0 shadow-lg md:p-0"
        >
            <div className="relative h-full w-full">
                {recipe.image && (
                    <Image
                        priority
                        src={recipe.image}
                        alt={recipe.title}
                        className="absolute inset-0 object-cover"
                        fill
                        sizes="50vw"
                    />
                )}
            </div>

            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 to-transparent p-6 text-left text-white">
                <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-1 text-base font-medium text-black">
                    Recipe Spotlight
                </div>

                <h2 className="mb-1 mt-auto text-2xl font-bold">
                    {recipe.title}
                </h2>
                <div className="line-clamp-2 text-sm italic md:line-clamp-3">
                    {recipe.description}
                </div>

                <div className="mt-1 flex justify-between">
                    <div className="flex">
                        <ClockIcon className="mr-1 w-5" />
                        {formatTime(totalHours, totalMinutes)}
                    </div>
                    <span className="underline underline-offset-4">
                        View recipe
                    </span>
                </div>
            </div>
        </HomeCard>
    );
}
