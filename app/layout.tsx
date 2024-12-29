import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CMS",
	description: "Content Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} min-h-screen bg-background font-sans antialiased`}>
				<TooltipProvider>{children}</TooltipProvider>
				<Toaster />
			</body>
		</html>
	);
}
