"use client";

import { useState, useEffect } from "react";
import { TopNav } from "@/components/top-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CommandPalette } from "@/components/command-palette";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsCommandPaletteOpen(true);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<SidebarProvider>
			<div className="min-h-screen bg-[#0a0a0a] overflow-hidden" style={{ "--sidebar-width": "16rem" } as React.CSSProperties}>
				<CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
				<TopNav />
				{children}
			</div>
		</SidebarProvider>
	);
}
