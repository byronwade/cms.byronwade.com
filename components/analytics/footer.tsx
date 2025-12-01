"use client";

import { Activity, Clock, FileText, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { CommonFooter } from "@/components/ui/common-footer";

interface AnalyticsFooterProps {
	className?: string;
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function AnalyticsFooter({
	className = "",
	leftSidebarOpen,
	rightSidebarOpen,
}: AnalyticsFooterProps) {
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [stats, setStats] = useState({
		pageViews: 0,
		activeUsers: 0,
		avgSessionTime: "0:00",
	});

	// Auto-save simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLastSaved(new Date());
		}, 30000); // Auto-save every 30 seconds

		return () => clearInterval(interval);
	}, []);

	// Update analytics stats simulation
	useEffect(() => {
		const updateStats = () => {
			setStats({
				pageViews: Math.floor(Math.random() * 10000),
				activeUsers: Math.floor(Math.random() * 1000),
				avgSessionTime: `${Math.floor(Math.random() * 10)}:${Math.floor(
					Math.random() * 60,
				)
					.toString()
					.padStart(2, "0")}`,
			});
		};

		updateStats();
		const interval = setInterval(updateStats, 60000);

		return () => clearInterval(interval);
	}, []);

	const leftContent = (
		<span className="flex items-center">
			<Activity className="h-3 w-3 mr-1" />
			<span className="text-foreground">Analytics Dashboard</span>
		</span>
	);

	const centerContent = (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2">
				<Globe className="h-3 w-3" />
				<span>Page Views: {stats.pageViews.toLocaleString()}</span>
			</div>
			<div className="flex items-center gap-2">
				<FileText className="h-3 w-3" />
				<span>Active Users: {stats.activeUsers.toLocaleString()}</span>
			</div>
			<div className="flex items-center gap-2">
				<Clock className="h-3 w-3" />
				<span>Avg. Session: {stats.avgSessionTime}</span>
			</div>
		</div>
	);

	return (
		<CommonFooter
			leftSidebarOpen={leftSidebarOpen}
			rightSidebarOpen={rightSidebarOpen}
			className={className}
			leftContent={leftContent}
			centerContent={centerContent}
			lastSaved={lastSaved}
			environment="development"
			status={{
				type: "success",
				text: "Live Data",
				icon: <Activity className="h-3 w-3 mr-1" />,
			}}
		/>
	);
}
