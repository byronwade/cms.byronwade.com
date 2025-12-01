import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toaster from "@/components/ui/toaster-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	preload: true,
	variable: "--font-inter",
	fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
	title: {
		default: "CMS - Content Management System",
		template: "%s | CMS",
	},
	description: "Modern content management system built with Next.js",
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
	),
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning className="dark">
			<body
				className={`${inter.className} min-h-screen bg-background text-foreground font-sans antialiased`}
			>
				<TooltipProvider>{children}</TooltipProvider>
				<Toaster />
			</body>
		</html>
	);
}
