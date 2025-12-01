"use client";

import {
	Database,
	Play,
	Plus,
	RefreshCw,
	Settings,
	Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommonHeader } from "@/components/ui/common-header";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface BuildHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onAddTable?: () => void;
}

function BuildHeader({
	leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
	onAddTable,
}: BuildHeaderProps) {
	const leftContent = (
		<div className="flex items-center gap-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							onClick={onAddTable}
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
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
			<div className="flex items-center gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Play className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Start Build (F5)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Square className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Stop Build (Shift+F5)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<RefreshCw className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Refresh (Ctrl+R)</TooltipContent>
				</Tooltip>

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
			icon={<Database className="w-4 h-4 text-primary" />}
			title="Database Builder"
			leftContent={leftContent}
			rightContent={rightContent}
		/>
	);
}

export { BuildHeader };
