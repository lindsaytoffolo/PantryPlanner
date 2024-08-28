import Logo from "@/app/ui/logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-violet-900 p-4 md:h-44">
                <Logo />
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-2 rounded-lg bg-gray-50 px-4 py-6 md:w-2/5 md:gap-4 md:px-12">
                    <p className="text-lg text-gray-800 md:text-2xl md:leading-normal">
                        <b>PantryPlanner</b> is your go-to tool for meal
                        planning, featuring an intuitive system to organize your
                        favorite recipes and a user-friendly grocery list
                        manager. Whether you're planning your weekly meals or
                        keeping track of your shopping, PantryPlanner simplifies
                        your food planning, making it a breeze.
                    </p>
                    <Link
                        href="/login"
                        className="mt-4 flex items-center gap-5 self-start rounded-lg bg-violet-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-400 md:text-base"
                    >
                        <span>Log in</span>
                        <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                    <a
                        href="https://github.com/lindsaytoffolo/PantryPlanner"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 self-start rounded-md bg-gray-300 py-2 pl-4 pr-5 text-sm font-medium transition-colors hover:bg-gray-500 md:text-base"
                    >
                        <img
                            src="/github-mark.svg"
                            alt="GitHub Logo"
                            className="h-5 w-5"
                        />
                        <div className="mt-0.5">View project on GitHub</div>
                    </a>
                </div>
                <div className="flex items-center justify-center p-4 md:w-3/5">
                    <Image
                        src="/hero-desktop.png"
                        width={1000}
                        height={700}
                        className="hidden md:block"
                        alt="Screenshots of the app showing desktop version"
                    />
                    <Image
                        src="/hero-mobile.png"
                        width={560}
                        height={750}
                        className="block md:hidden"
                        alt="Screenshots of the app showing mobile version"
                    />
                </div>
            </div>
        </main>
    );
}
