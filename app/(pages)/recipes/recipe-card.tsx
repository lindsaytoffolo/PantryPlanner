import { Recipe } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="h-56 relative bg-cover bg-center rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0">
                {recipe.image && !recipe.image.includes("example") && (
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                        width={200}
                        height={200}
                    />
                )}
            </div>

            <div className="relative p-6 flex flex-col justify-between h-full bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold text-white mb-2 mt-auto">{recipe.title}</h2>
                <div className="flex justify-end">
                    <Link
                        className="text-white underline underline-offset-4"
                        href={`/recipes/${recipe.id}`}
                    >
                        View Recipe
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
