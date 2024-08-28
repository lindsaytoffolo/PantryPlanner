const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function RandomRecipeSkeleton() {
    return (
        <div
            className={`${shimmer} items-between relative flex flex-col justify-between overflow-hidden rounded-xl bg-gray-100 p-6 shadow-sm`}
        >
            <div className="h-8 w-48 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2">
                <div className="mt-auto h-6 w-48 rounded-md bg-gray-200" />
                <div className="h-4 w-full rounded-md bg-gray-200" />
                <div className="h-4 w-full rounded-md bg-gray-200" />
                <div className="ml-auto h-5 w-32 self-end rounded-md bg-gray-200" />
            </div>
        </div>
    );
}

function CreateRecipeSkeleton() {
    return (
        <div
            className={`${shimmer} relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-gray-50 p-6 shadow-sm`}
        >
            <div className="h-16 w-16 rounded-full bg-gray-200" />
            <div className="h-8 w-56 rounded-md bg-gray-200" />
        </div>
    );
}

export function RecipeSummarySkeleton() {
    return (
        <div
            className={`${shimmer} relative row-span-2 overflow-hidden rounded-xl bg-gray-200 p-6 shadow-sm`}
        >
            <div className="mb-4 h-6 w-48 rounded-md bg-gray-50" />
            <div className="flex h-[calc(100%-80px)] flex-col items-center justify-center gap-4 rounded-xl bg-white px-4 py-8">
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
                <div className="h-5 w-full rounded-md bg-gray-200" />
            </div>
            <div className="ml-auto mt-4 h-6 w-48 self-end rounded-md bg-gray-50" />
        </div>
    );
}

export function HomeSkeleton() {
    return (
        <div className="mx-auto grid max-w-[800px] grid-flow-col grid-cols-1 grid-rows-4 gap-4 md:h-[calc(100vh-96px)] md:grid-cols-2 md:grid-rows-2">
            <RandomRecipeSkeleton />
            <CreateRecipeSkeleton />
            <RecipeSummarySkeleton />
        </div>
    );
}

export function GroceryListSkeleton() {
    return (
        <div className={`${shimmer} mx-auto mt-8 w-full max-w-[700px]`}>
            <div className="mb-8 h-9 w-64 rounded-md bg-gray-200" />
            <div className="mb-8 h-10 w-full rounded-lg bg-white" />
            <div className="relative row-span-2 overflow-hidden rounded-xl bg-gray-200 p-4 shadow-sm">
                <div className="mb-4 h-5 w-48 rounded-md bg-gray-300" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
                <div className="mb-2 h-14 w-full rounded-md bg-white" />
            </div>
        </div>
    );
}

function RecipeCardSkeleton() {
    return (
        <div
            className={`${shimmer} items-between relative flex h-56 flex-col justify-end overflow-hidden rounded-lg bg-gray-50 p-6 shadow-sm`}
        >
            <div className="flex flex-col gap-2">
                <div className="h-7 w-full rounded-md bg-gray-200" />
                <div className="h-7 w-48 rounded-md bg-gray-200" />
                <div className="ml-auto h-5 w-32 self-end rounded-md bg-gray-200" />
            </div>
        </div>
    );
}

export function RecipesSkeleton() {
    return (
        <div className={`${shimmer} w-full`}>
            <div className="mb-6 h-8 w-40 rounded-md bg-gray-200" />
            <div className="mb-8 flex flex-col gap-2 md:flex-row">
                <div className="h-10 w-full rounded-lg bg-white" />
                <div className="h-10 w-full rounded-lg bg-gray-300 md:w-36" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
                <RecipeCardSkeleton />
            </div>
        </div>
    );
}

export function RecipeFormSkeleton() {
    return (
        <div>
            <div className="mb-6 flex flex-col gap-2 md:flex-row">
                <div className="h-6 w-32 rounded-md bg-gray-200 md:h-8" />
                <div className="h-6 w-36 rounded-md bg-gray-200 md:h-8" />
            </div>
            <div className={`${shimmer} mx-auto mt-8 w-full max-w-[700px]`}>
                <div className="mt-8 rounded-lg bg-white p-4 md:p-6">
                    <div className="mb-1 h-4 w-32 rounded-lg bg-gray-200" />
                    <div className="mb-4 h-[42px] w-full rounded-lg bg-gray-200" />

                    <div className="flex flex-col gap-4 md:flex-row">
                        <div>
                            <div className="mb-1 h-4 w-32 rounded-lg bg-gray-200" />
                            <div className="h-44 w-72 min-w-72 rounded-lg bg-gray-200 md:h-[198px]" />
                        </div>
                        <div className="w-full">
                            <div className="mb-1 h-4 w-32 rounded-lg bg-gray-200" />
                            <div className="mb-4 h-[42px] w-full rounded-lg bg-gray-200" />
                            <div className="mb-1 h-4 w-32 rounded-lg bg-gray-200" />
                            <div className="flex gap-4">
                                <div className="mb-4 h-[42px] w-full rounded-lg bg-gray-200" />
                                <div className="mb-4 h-[42px] w-full rounded-lg bg-gray-200" />
                            </div>
                            <div className="mb-1 h-4 w-32 rounded-lg bg-gray-200" />
                            <div className="flex gap-4">
                                <div className="mb-4 h-[42px] w-full rounded-lg bg-gray-200" />
                                <div className="mb-4 h-[42px] w-full rounded-lg bg-gray-200" />
                            </div>
                        </div>
                    </div>

                    <div className="mb-1 h-4 w-32 rounded-lg bg-gray-200" />
                    <div className="mb-4 h-[88px] w-full rounded-lg bg-gray-200" />

                    <div className="mb-6 h-4 w-32 rounded-lg bg-gray-200 md:mb-4" />
                    <div className="mb-8 flex items-center gap-2 md:mb-0">
                        <div className="flex w-full flex-col items-center gap-2 md:flex-row">
                            <div className="h-[42px] w-full rounded-lg bg-gray-200 md:mb-4" />
                            <div className="h-[42px] w-full rounded-lg bg-gray-200 md:mb-4" />
                            <div className="h-[42px] w-full rounded-lg bg-gray-200 md:mb-4" />
                        </div>
                        <div className="mb-4 max-h-6 min-h-6 min-w-6 rounded-full bg-gray-200 md:mb-3" />
                    </div>

                    <div className="mb-6 mt-2 h-6 w-48 rounded-lg bg-gray-200" />

                    <div className="mb-1 h-4 w-32 rounded-lg bg-gray-200" />
                    <div className="flex items-center gap-2">
                        <div className="mb-4 h-[64px] w-full rounded-lg bg-gray-200" />
                        <div className="mb-4 max-h-6 min-h-6 min-w-6 rounded-full bg-gray-200 md:mb-3" />
                    </div>

                    <div className="mb-6 mt-2 h-6 w-48 rounded-lg bg-gray-200 md:mb-5" />
                    <div className="ml-auto h-9 w-36 rounded-lg bg-gray-300" />
                </div>
            </div>
        </div>
    );
}

function RecipeHeaderSkeleton() {
    return (
        <div className="flex w-full flex-col overflow-hidden rounded-xl md:h-96 md:flex-row">
            <div className="h-[218px] w-full bg-gray-200 md:h-full md:w-5/12 md:rounded-l-xl" />
            <div className="flex h-full w-full flex-col justify-between bg-gray-300 p-4 md:w-7/12 md:rounded-r-xl md:p-8">
                <div>
                    <div className="mb-4">
                        <div className="mb-2 h-8 w-full rounded-lg bg-gray-100" />
                        <div className="h-8 w-[35%] rounded-lg bg-gray-100" />
                    </div>
                    <div className="mb-6">
                        <div className="mb-2 h-5 w-full rounded-lg bg-gray-100" />
                        <div className="mb-2 h-5 w-full rounded-lg bg-gray-100" />
                        <div className="h-5 w-[60%] rounded-lg bg-gray-100" />
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <div className="flex items-center">
                            <div className="mb-2 mr-2 h-5 w-[72px] rounded-lg bg-gray-100 md:w-[81px]" />
                            <div className="mb-2 h-4 w-[21px] rounded-lg bg-gray-100" />
                        </div>
                        <div className="flex items-center">
                            <div className="mb-2 mr-2 h-5 w-[81px] rounded-lg bg-gray-100 md:w-[91px]" />
                            <div className="mb-2 h-4 w-[90px] rounded-lg bg-gray-100 md:w-[102px]" />
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 h-5 w-[83px] rounded-lg bg-gray-100 md:w-[94px]" />
                            <div className="h-4 w-[111px] rounded-lg bg-gray-100 md:w-[124px]" />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <div className="mr-4 h-6 w-6 rounded-full bg-gray-100 md:h-8 md:w-8" />
                        <div className="h-6 w-6 rounded-full bg-gray-100 md:h-8 md:w-8" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecipeIngredientsSkeleton() {
    return (
        <div className="w-full grow rounded-xl bg-gray-100 p-4 shadow md:w-5/12 md:p-8">
            <div className="mb-5 h-8 w-[85%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[97%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[82%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[71%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[90%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[65%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[84%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[76%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[88%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[92%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[85%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[73%] rounded-lg bg-gray-200" />
            <div className="mb-3 h-6 w-[95%] rounded-lg bg-gray-200" />
        </div>
    );
}

function RecipeInstructionsSkeleton() {
    return (
        <div className="w-full grow rounded-xl bg-white p-4 shadow md:w-7/12 md:p-8">
            <div className="mb-5 h-8 w-56 rounded-lg bg-gray-200" />
            <div className="mb-6 flex w-full">
                <div className="mr-1 h-5 w-4 rounded-full bg-gray-200" />
                <div className="w-full">
                    <div className="mb-4 h-5 w-[95%] rounded-lg bg-gray-200" />
                    <div className="h-5 w-64 rounded-lg bg-gray-200" />
                </div>
            </div>
            <div className="mb-6 flex w-full">
                <div className="mr-1 h-5 w-4 rounded-full bg-gray-200" />
                <div className="w-full">
                    <div className="mb-4 h-5 w-full rounded-lg bg-gray-200" />
                    <div className="mb-4 h-5 w-[92%] rounded-lg bg-gray-200" />
                    <div className="h-5 w-36 rounded-lg bg-gray-200" />
                </div>
            </div>
            <div className="mb-6 flex w-full">
                <div className="mr-1 h-5 w-4 rounded-full bg-gray-200" />
                <div className="w-full">
                    <div className="mb-4 h-5 w-[93%] rounded-lg bg-gray-200" />
                    <div className="mb-4 h-5 w-full rounded-lg bg-gray-200" />
                    <div className="mb-4 h-5 w-[97%] rounded-lg bg-gray-200" />
                    <div className="w-88 h-5 rounded-lg bg-gray-200" />
                </div>
            </div>
            <div className="mb-6 flex w-full">
                <div className="mr-1 h-5 w-4 rounded-full bg-gray-200" />
                <div className="w-full">
                    <div className="mb-4 h-5 w-full rounded-lg bg-gray-200" />
                    <div className="h-5 w-56 rounded-lg bg-gray-200" />
                </div>
            </div>
        </div>
    );
}

export function RecipeSkeleton() {
    return (
        <div>
            <div className="mb-6 flex flex-col gap-2 md:flex-row">
                <div className="h-6 w-32 rounded-md bg-gray-200 md:h-8" />
                <div className="h-6 w-64 rounded-md bg-gray-200 md:h-8" />
            </div>
            <RecipeHeaderSkeleton />
            <div className="mt-5 flex flex-col gap-5 md:flex-row">
                <RecipeIngredientsSkeleton />
                <RecipeInstructionsSkeleton />
            </div>
        </div>
    );
}
