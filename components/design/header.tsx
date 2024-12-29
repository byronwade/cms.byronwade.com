"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Paintbrush, Plus, Layout, Type, Image as ImageIcon, Box, Move, Code, Settings, Undo, Redo, Eye } from "lucide-react";
import { CommonHeader } from "@/components/ui/common-header";

interface DesignHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onDeviceChange?: (width: number) => void;
	currentWidth?: number;
	onToolChange?: (tool: string) => void;
}

export function DesignHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar, onDeviceChange, currentWidth = 1440, onToolChange }: DesignHeaderProps) {
	const leftContent = (
		<div className="flex items-center space-x-1">
			<TooltipProvider>
				<div className="flex items-center space-x-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={() => onToolChange?.("layout")} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Layout className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Layout Tool (L)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={() => onToolChange?.("type")} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Type className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Typography Tool (T)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={() => onToolChange?.("image")} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<ImageIcon className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Image Tool (I)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={() => onToolChange?.("box")} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Box className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Box Tool (B)</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>

			<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

			<TooltipProvider>
				<div className="flex items-center space-x-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={() => onToolChange?.("move")} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Move className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Move Tool (V)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={() => onToolChange?.("paint")} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Paintbrush className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Paint Tool (P)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={() => onToolChange?.("code")} className="text-gray-400 hover:bg-gray-700 hover:text-white">
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
			<div className="flex items-center space-x-1">
				<Button variant="outline" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
					{currentWidth}px
				</Button>

				<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Undo className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Undo (Ctrl+Z)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Redo className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Redo (Ctrl+Y)</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Eye className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Preview (Ctrl+P)</TooltipContent>
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

	return <CommonHeader leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} onToggleLeftSidebar={onToggleLeftSidebar} onToggleRightSidebar={onToggleRightSidebar} icon={<Paintbrush className="w-4 h-4 text-blue-500" />} title="Visual Designer" leftContent={leftContent} rightContent={rightContent} />;
}
