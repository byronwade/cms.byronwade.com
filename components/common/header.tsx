"use client";

import { MenuIcon, PanelRightClose, PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommonHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	children?: React.ReactNode;
}

export function CommonHeader({
	leftSidebarOpen: _leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
	children,
}: CommonHeaderProps) {
	return (
		<header className="h-14 border-b border-border bg-background flex items-center justify-between px-4">
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="sm"
					onClick={onToggleLeftSidebar}
					className="text-gray-400 hover:text-foreground"
				>
					<MenuIcon className="w-5 h-5" />
				</Button>
				{children && <div className="flex-1">{children}</div>}
			</div>

			<Button
				variant="ghost"
				size="sm"
				onClick={onToggleRightSidebar}
				className="text-gray-400 hover:text-white"
			>
				{rightSidebarOpen ? (
					<PanelRightClose className="w-5 h-5" />
				) : (
					<PanelRightOpen className="w-5 h-5" />
				)}
			</Button>
		</header>
	);
}
