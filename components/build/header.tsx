"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Database, Plus, Play, Square, RefreshCw, Settings } from "lucide-react";
import { CommonHeader } from "@/components/ui/common-header";

interface BuildHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onAddTable?: () => void;
}

export function BuildHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar, onAddTable }: BuildHeaderProps) {
	const leftContent = (
		<div className="flex items-center space-x-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" onClick={onAddTable} className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Plus className="w-4 h-4 mr-1" />
							Add Table
						</Button>
					</TooltipTrigger>
					<TooltipContent>Add New Table (Ctrl+N)</TooltipContent>
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
							<Play className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Start Build (F5)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Square className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Stop Build (Shift+F5)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<RefreshCw className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Refresh (Ctrl+R)</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Settings className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Settings</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);

	return <CommonHeader leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} onToggleLeftSidebar={onToggleLeftSidebar} onToggleRightSidebar={onToggleRightSidebar} icon={<Database className="w-4 h-4 text-blue-500" />} title="Database Builder" leftContent={leftContent} rightContent={rightContent} />;
}
