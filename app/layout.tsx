import "@/app/ui/global.css";
import { defaultFont } from "@/app/ui/fonts";
import { Metadata } from "next";
import SideNav from "@/app/ui/dashboard/sidenav";

export const metadata: Metadata = {
    title: {
        template: "%s | Recipe Book",
        default: "Recipe Book",
    },
    description: "A Recipe Book playground app to learn Next.js",
    metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export const experimental_ppr = true;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${defaultFont.className} antialiased`}>
                <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                    <div className="w-full flex-none md:w-72">
                        <SideNav />
                    </div>
                    <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
                </div>
            </body>
        </html>
    );
}
