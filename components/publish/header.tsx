"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { FileText, Plus, Filter, Clock, Calendar, Globe, Settings } from "lucide-react";
import { CommonHeader } from "@/components/ui/common-header";
import { SocialShareToolbar } from "@/components/publish/social-share-toolbar";

interface PublishHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onAddBoard?: () => void;
}

export function PublishHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar, onAddBoard }: PublishHeaderProps) {
	const leftContent = (
		<div className="flex items-center space-x-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" onClick={onAddBoard} className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Plus className="w-4 h-4 mr-1" />
							Add Board
						</Button>
					</TooltipTrigger>
					<TooltipContent>Add New Board (Ctrl+N)</TooltipContent>
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
							<Filter className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Filter</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Clock className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Schedule</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Calendar className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Calendar</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Globe className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Publish</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

				<SocialShareToolbar
					onShare={(platforms) => {
						console.log("Sharing to platforms:", platforms);
					}}
				/>

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

	return <CommonHeader leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} onToggleLeftSidebar={onToggleLeftSidebar} onToggleRightSidebar={onToggleRightSidebar} icon={<FileText className="w-4 h-4 text-blue-500" />} title="Content Publishing" leftContent={leftContent} rightContent={rightContent} />;
}
