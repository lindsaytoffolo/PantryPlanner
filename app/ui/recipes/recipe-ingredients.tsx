import { Recipe } from "@/app/lib/definitions";

const RecipeIngredients = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="w-full grow rounded-xl bg-violet-100 p-4 shadow md:w-5/12 md:p-8">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Ingredients
            </h3>
            <ul className="list-disc space-y-2 pl-6">
                {recipe.ingredients?.map((i) => (
                    <li key={i.id} className="text-xl">
                        <span className="mr-2 font-semibold text-gray-700">
                            {i.quantity ? `${i.quantity} ${i.name}` : i.name}
                        </span>
                        <span className="text-gray-500">{i.comment}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeIngredients;
