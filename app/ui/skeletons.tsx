// Loading animation
const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function RecipeCardSkeleton() {
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

export function CreateRecipeSkeleton() {
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
            <RecipeCardSkeleton />
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
