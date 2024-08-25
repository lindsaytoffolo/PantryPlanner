import "@/app/ui/global.css";
import { defaultFont } from "@/app/ui/fonts";
import { Metadata } from "next";
import SideNav from "@/app/ui/dashboard/sidenav";

export const metadata: Metadata = {
    title: {
        template: "%s | PantryPlanner",
        default: "PantryPlanner",
    },
    description:
        "PantryPlanner is an app that helps you manage both your recipe book and your grocery list to make meal planning easier",
    metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${defaultFont.className} antialiased bg-neutral-100`}>
                {children}
            </body>
        </html>
    );
}
