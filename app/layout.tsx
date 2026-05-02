import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
    title: "PantryNet — Find Food Pantries Near You",
    description:
        "Connecting communities with nutritious food — discover pantries, check hours, and get help when you need it most.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col font-sans bg-pantry-cream text-pantry-ink">
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
