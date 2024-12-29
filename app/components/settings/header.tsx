"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft, PanelRight } from "lucide-react";

interface SettingsHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
}

export function SettingsHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar }: SettingsHeaderProps) {
	return (
		<header className="h-[var(--header-height)] border-b border-[#1f1f1f] bg-[#0a0a0a] flex items-center justify-between px-4">
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="icon" onClick={onToggleLeftSidebar}>
					<PanelLeft className={`h-5 w-5 transition-transform ${!leftSidebarOpen ? "rotate-180" : ""}`} />
				</Button>
				<h1 className="text-lg font-semibold">Settings</h1>
			</div>

			<Button variant="ghost" size="icon" onClick={onToggleRightSidebar}>
				<PanelRight className={`h-5 w-5 transition-transform ${!rightSidebarOpen ? "-rotate-180" : ""}`} />
			</Button>
		</header>
	);
}
