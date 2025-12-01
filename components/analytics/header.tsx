"use client";

import {
	BarChart,
	BarChart3,
	Download,
	LineChart,
	PieChart,
	RefreshCw,
	Settings,
	Share2,
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

interface AnalyticsHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
}

export function AnalyticsHeader({
	leftSidebarOpen,
	rightSidebarOpen,
	onToggleLeftSidebar,
	onToggleRightSidebar,
}: AnalyticsHeaderProps) {
	const leftContent = (
		<div className="flex items-center gap-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
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
			<div className="flex items-center gap-1">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<BarChart3 className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Bar Chart</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<PieChart className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Pie Chart</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-border" />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Download className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Export Data</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant="ghost"
							size="tiny"
							className="text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						>
							<Share2 className="w-4 h-4" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Share</TooltipContent>
				</Tooltip>

				<Separator orientation="vertical" className="h-4 bg-border" />

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
					<TooltipContent>Refresh Data</TooltipContent>
				</Tooltip>

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
			icon={<BarChart className="w-4 h-4 text-primary" />}
			title="Analytics"
			leftContent={leftContent}
			rightContent={rightContent}
		/>
	);
}
