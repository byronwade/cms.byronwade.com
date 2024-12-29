"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Image as ImageIcon, Upload, Download, Filter, Trash2, Settings, Undo, Redo, Eye } from "lucide-react";
import { CommonHeader } from "@/components/ui/common-header";

interface MediaHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
	onUpload?: () => void;
	onDownload?: () => void;
	onDelete?: () => void;
}

export function MediaHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar, onUpload, onDownload, onDelete }: MediaHeaderProps) {
	const leftContent = (
		<div className="flex items-center space-x-1">
			<TooltipProvider>
				<div className="flex items-center space-x-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={onUpload} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Upload className="w-4 h-4 mr-1" />
								Upload
							</Button>
						</TooltipTrigger>
						<TooltipContent>Upload Media (Ctrl+U)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={onDownload} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Download className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Download Selected (Ctrl+D)</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" onClick={onDelete} className="text-gray-400 hover:bg-gray-700 hover:text-white">
								<Trash2 className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Delete Selected (Del)</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>

			<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

			<TooltipProvider>
				<div className="flex items-center space-x-1">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
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
			<div className="flex items-center space-x-1">
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

	return <CommonHeader leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} onToggleLeftSidebar={onToggleLeftSidebar} onToggleRightSidebar={onToggleRightSidebar} icon={<ImageIcon className="w-4 h-4 text-blue-500" />} title="Media Library" leftContent={leftContent} rightContent={rightContent} />;
}
