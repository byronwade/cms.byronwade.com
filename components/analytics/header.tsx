"use client";

import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { BarChart3, PieChart, LineChart, Download, Share2, RefreshCw, Settings, BarChart } from "lucide-react";
import { CommonHeader } from "@/components/ui/common-header";

interface AnalyticsHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
}

export function AnalyticsHeader({ leftSidebarOpen, rightSidebarOpen, onToggleLeftSidebar, onToggleRightSidebar }: AnalyticsHeaderProps) {
	const leftContent = (
		<div className="flex items-center space-x-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<LineChart className="w-4 h-4 mr-1" />
							Line Chart
						</Button>
					</TooltipTrigger>
					<TooltipContent>View Line Chart</TooltipContent>
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
							<BarChart3 className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Bar Chart</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<PieChart className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Pie Chart</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Download className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Export Data</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<Share2 className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Share</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-[#2a2a2a]" />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="tiny" className="text-gray-400 hover:bg-gray-700 hover:text-white">
							<RefreshCw className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Refresh Data</TooltipContent>
				</Tooltip>

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

	return <CommonHeader leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} onToggleLeftSidebar={onToggleLeftSidebar} onToggleRightSidebar={onToggleRightSidebar} icon={<BarChart className="w-4 h-4 text-blue-500" />} title="Analytics" leftContent={leftContent} rightContent={rightContent} />;
}
