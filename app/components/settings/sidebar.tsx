"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface SettingsSidebarProps {
	isOpen: boolean;
}

export function SettingsSidebar({ isOpen }: SettingsSidebarProps) {
	if (!isOpen) return null;

	return (
		<aside className="w-[var(--sidebar-width)] h-full border-r border-[#1f1f1f] bg-[#0a0a0a]">
			<ScrollArea className="h-full">
				<div className="p-4 space-y-4">
					{/* Add settings navigation here */}
				</div>
			</ScrollArea>
		</aside>
	);
}
