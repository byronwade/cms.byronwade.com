"use client";

import { Eye, FileText, Plus, Redo, Save, Settings, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommonHeader } from "@/components/ui/common-header";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContentHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onAddContent?: () => void;
}

export function ContentHeader({
	leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
	onAddContent,
}: ContentHeaderProps) {
	const leftContent = (
		<div className="flex items-center gap-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							onClick={onAddContent}
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Plus className="w-4 h-4 mr-1" />
							Add Content
						</Button>
					</TooltipTrigger>
					<TooltipContent>Add New Content (Ctrl+N)</TooltipContent>
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
							<Save className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Save (Ctrl+S)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Undo className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Undo (Ctrl+Z)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Redo className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Redo (Ctrl+Y)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Eye className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Preview (Ctrl+P)</TooltipContent>
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
			icon={<FileText className="w-4 h-4 text-primary" />}
			title="Content Management"
			leftContent={leftContent}
			rightContent={rightContent}
		/>
	);
}
