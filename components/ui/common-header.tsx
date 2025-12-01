"use client";

import { PanelLeft, PanelRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface CommonHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	icon?: React.ReactNode;
	title: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
	"aria-label"?: string;
}

export function CommonHeader({
	leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
	icon,
	title,
	leftContent,
	rightContent,
	"aria-label": ariaLabel,
}: CommonHeaderProps) {
	return (
		<header
			className="flex items-center justify-between px-[var(--header-padding-x)] h-[var(--header-height)] bg-card border-b border-border shrink-0 w-full z-[var(--z-header)]"
			aria-label={ariaLabel || title}
		>
			<div className="flex items-center gap-2 min-w-0 flex-1">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={onToggleLeftSidebar}
								aria-label={
									leftSidebarOpen ? "Hide left sidebar" : "Show left sidebar"
								}
								aria-expanded={leftSidebarOpen}
								className="p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground shrink-0"
							>
								<PanelLeft
									className={`h-4 w-4 transition-transform ${leftSidebarOpen ? "" : "rotate-180"}`}
									aria-hidden="true"
								/>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Toggle Left Sidebar (Ctrl+B)</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<div className="flex items-center gap-2 min-w-0">
					{icon && (
						<span className="flex-shrink-0" aria-hidden="true">
							{icon}
						</span>
					)}
					<h1 className="text-sm font-medium text-foreground truncate">
						{title}
					</h1>
				</div>

				{leftContent && (
					<>
						<Separator
							orientation="vertical"
							className="h-4 bg-border"
							aria-hidden="true"
						/>
						<div className="flex items-center gap-1">{leftContent}</div>
					</>
				)}
			</div>

			<div className="flex items-center gap-2 shrink-0">
				{rightContent && (
					<div className="flex items-center gap-1">{rightContent}</div>
				)}

				{rightContent && (
					<Separator
						orientation="vertical"
						className="h-4 bg-border"
						aria-hidden="true"
					/>
				)}

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={onToggleRightSidebar}
								aria-label={
									rightSidebarOpen ? "Hide right sidebar" : "Show right sidebar"
								}
								aria-expanded={rightSidebarOpen}
								className="p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground shrink-0"
							>
								<PanelRight
									className={`h-4 w-4 transition-transform ${rightSidebarOpen ? "" : "rotate-180"}`}
									aria-hidden="true"
								/>
							</Button>
						</TooltipTrigger>
						<TooltipContent>Toggle Right Sidebar (Ctrl+E)</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</header>
	);
}
