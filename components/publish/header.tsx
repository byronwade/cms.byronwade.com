"use client";

import {
	Calendar,
	Clock,
	FileText,
	Filter,
	Globe,
	Plus,
	Settings,
} from "lucide-react";
import { SocialShareToolbar } from "@/components/publish/social-share-toolbar";
import { Button } from "@/components/ui/button";
import { CommonHeader } from "@/components/ui/common-header";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface PublishHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onAddBoard?: () => void;
}

export function PublishHeader({
	leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
	onAddBoard,
}: PublishHeaderProps) {
	const leftContent = (
		<div className="flex items-center gap-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							onClick={onAddBoard}
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
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
			<div className="flex items-center gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Filter className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Filter</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Clock className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Schedule</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Calendar className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Calendar</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Globe className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Publish</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-border" />

				<SocialShareToolbar
					onShare={(platforms) => {
						console.log("Sharing to platforms:", platforms);
					}}
				/>

				<Separator orientation="vertical" className="h-4 bg-border" />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Settings className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Settings</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);

	return (
		<CommonHeader
			leftSidebarOpen={leftSidebarOpen}
			rightSidebarOpen={rightSidebarOpen}
			onToggleLeftSidebar={onToggleLeftSidebar}
			onToggleRightSidebar={onToggleRightSidebar}
			icon={<FileText className="w-4 h-4 text-primary" />}
			title="Content Publishing"
			leftContent={leftContent}
			rightContent={rightContent}
		/>
	);
}
