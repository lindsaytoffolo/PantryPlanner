import { Recipe } from "@/app/lib/definitions";

const RecipeInstructions = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="w-7/12 grow rounded-xl bg-white p-8 shadow">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Instructions
            </h3>
            <ol className="list-decimal space-y-2 pl-6">
                {recipe.instructions?.map((i) => (
                    <li key={i.id} className="text-xl">
                        <span className="whitespace-pre-line text-gray-500">
                            {i.instruction}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeInstructions;
