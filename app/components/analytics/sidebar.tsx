"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalyticsSidebarProps {
	isOpen: boolean;
}

export function AnalyticsSidebar({ isOpen }: AnalyticsSidebarProps) {
	if (!isOpen) return null;

	return (
		<aside className="w-[var(--sidebar-width)] h-full border-r border-[#1f1f1f] bg-[#0a0a0a]">
			<ScrollArea className="h-full">
				<div className="p-4 space-y-4">{/* Add analytics navigation here */}</div>
			</ScrollArea>
		</aside>
	);
}
