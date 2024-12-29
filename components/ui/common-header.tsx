"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PanelLeft, PanelRight } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface CommonHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	icon?: React.ReactNode;
	title: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
}

export function CommonHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar, icon, title, leftContent, rightContent }: CommonHeaderProps) {
	return (
		<div className="flex items-center justify-between px-4 h-[var(--header-height)] bg-[#1a1a1a] border-b border-[#2a2a2a]">
			<div className="flex items-center space-x-2">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={onToggleLeftSidebar} className="p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
								<PanelLeft className={`h-4 w-4 transition-transform ${leftSidebarOpen ? "" : "rotate-180"}`} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Toggle Left Sidebar (Ctrl+B)</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<div className="flex items-center">
					{icon}
					<h1 className="text-sm font-medium text-white ml-2">{title}</h1>
				</div>

				{leftContent && (
					<>
						<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />
						{leftContent}
					</>
				)}
			</div>

			<div className="flex items-center space-x-2">
				{rightContent}

				{rightContent && <Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />}

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={onToggleRightSidebar} className="p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
								<PanelRight className={`h-4 w-4 transition-transform ${rightSidebarOpen ? "" : "rotate-180"}`} />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Toggle Right Sidebar (Ctrl+E)</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
