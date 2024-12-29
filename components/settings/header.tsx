"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Save, Undo2, Redo2, Settings } from "lucide-react";
import { CommonHeader } from "@/components/ui/common-header";

interface SettingsHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
}

export function SettingsHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar }: SettingsHeaderProps) {
	const leftContent = (
		<div className="flex items-center space-x-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Undo2 className="w-4 h-4 mr-1" />
							Undo
						</Button>
					</TooltipTrigger>
					<TooltipContent>Undo Changes (Ctrl+Z)</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);

	const rightContent = (
		<TooltipProvider>
			<div className="flex items-center space-x-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Redo2 className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Redo (Ctrl+Y)</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Save className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Save Changes (Ctrl+S)</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);

	return <CommonHeader leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} onToggleLeftSidebar={onToggleLeftSidebar} onToggleRightSidebar={onToggleRightSidebar} icon={<Settings className="w-4 h-4 text-blue-500" />} title="Settings" leftContent={leftContent} rightContent={rightContent} />;
}
