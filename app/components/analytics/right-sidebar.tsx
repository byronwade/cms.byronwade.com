"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalyticsRightSidebarProps {
	isOpen: boolean;
}

export function AnalyticsRightSidebar({ isOpen }: AnalyticsRightSidebarProps) {
	if (!isOpen) return null;

	return (
		<aside className="w-[var(--sidebar-width)] h-full border-l border-[#1f1f1f] bg-[#0a0a0a]">
			<ScrollArea className="h-full">
				<div className="p-4 space-y-4">{/* Add analytics details here */}</div>
			</ScrollArea>
		</aside>
	);
}
