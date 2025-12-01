"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { CommandPalette } from "@/components/command-palette";
import { TopNav } from "@/components/top-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

// Note: Metadata cannot be exported from client components
// Metadata is handled at the root layout level

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

	// Memoize keyboard handler
	const handleKeyboardShortcut = useCallback((e: KeyboardEvent) => {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			setIsCommandPaletteOpen(true);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyboardShortcut);
		return () =>
			document.removeEventListener("keydown", handleKeyboardShortcut);
	}, [handleKeyboardShortcut]);

	const handleCloseCommandPalette = useCallback(() => {
		setIsCommandPaletteOpen(false);
	}, []);

	return (
		<SidebarProvider>
			<CommandPalette
				isOpen={isCommandPaletteOpen}
				onClose={handleCloseCommandPalette}
			/>
			<TopNav />
			<Suspense
				fallback={
					<div className="space-y-4 p-6">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-48 w-full" />
					</div>
				}
			>
				{children}
			</Suspense>
		</SidebarProvider>
	);
}
