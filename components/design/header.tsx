"use client";

import {
	Box,
	Code,
	Eye,
	Image as ImageIcon,
	Layout,
	Move,
	Paintbrush,
	Redo,
	Settings,
	Type,
	Undo,
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

interface DesignHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onDeviceChange?: (width: number) => void;
	currentWidth?: number;
	onToolChange?: (tool: string) => void;
}

function DesignHeader({
	leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
	onDeviceChange: _onDeviceChange,
	currentWidth = 1440,
	onToolChange,
}: DesignHeaderProps) {
	const leftContent = (
		<div className="flex items-center gap-1">
			<TooltipProvider>
				<div className="flex items-center gap-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={() => onToolChange?.("layout")}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Layout className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Layout Tool (L)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={() => onToolChange?.("type")}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Type className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Typography Tool (T)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={() => onToolChange?.("image")}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<ImageIcon className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Image Tool (I)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={() => onToolChange?.("box")}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Box className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Box Tool (B)</TooltipContent>
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
								onClick={() => onToolChange?.("move")}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Move className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Move Tool (V)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={() => onToolChange?.("paint")}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Paintbrush className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Paint Tool (P)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="tiny"
								onClick={() => onToolChange?.("code")}
								className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
							>
								<Code className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Code Tool (C)</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</div>
	);

	const rightContent = (
		<TooltipProvider>
			<div className="flex items-center gap-1">
				<Button
					variant="outline"
					size="tiny"
					className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
				>
					{currentWidth}px
				</Button>

				<Separator orientation="vertical" className="h-4 bg-border" />

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
			icon={<Paintbrush className="w-4 h-4 text-primary" />}
			title="Visual Designer"
			leftContent={leftContent}
			rightContent={rightContent}
		/>
	);
}

export { DesignHeader };
