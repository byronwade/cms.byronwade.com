"use client";

import {
	Download,
	Eye,
	Filter,
	Image as ImageIcon,
	Redo,
	Settings,
	Trash2,
	Undo,
	Upload,
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

interface MediaHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onUpload?: () => void;
	onDownload?: () => void;
	onDelete?: () => void;
}

export function MediaHeader({
	leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
	onUpload,
	onDownload,
	onDelete,
}: MediaHeaderProps) {
	const leftContent = (
		<div className="flex items-center gap-1">
			<TooltipProvider>
				<div className="flex items-center gap-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={onUpload}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Upload className="w-4 h-4 mr-1" />
								Upload
							</Button>
						</TooltipTrigger>
						<TooltipContent>Upload Media (Ctrl+U)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={onDownload}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Download className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Download Selected (Ctrl+D)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={onDelete}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Trash2 className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Delete Selected (Del)</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>

			<Separator orientation="vertical" className="h-4 bg-border" />

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
						<TooltipContent>Filter Media (Ctrl+F)</TooltipContent>
					</Tooltip>
				</div>
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
			icon={<ImageIcon className="w-4 h-4 text-primary" />}
			title="Media Library"
			leftContent={leftContent}
			rightContent={rightContent}
		/>
	);
}
