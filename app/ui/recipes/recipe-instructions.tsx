import { Recipe } from "@/app/lib/definitions";

const RecipeInstructions = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="w-full grow rounded-xl bg-white p-4 shadow md:w-7/12 md:p-8">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Instructions
            </h3>
            <ol className="list-decimal space-y-2 pl-6 marker:font-semibold">
                {recipe.instructions?.map((i) => (
                    <li key={i.id} className="text-lg text-gray-600">
                        <span className="whitespace-pre-line">
                            {i.instruction}
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeInstructions;
