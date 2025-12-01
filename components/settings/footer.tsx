"use client";

import { Bell, Database, Settings, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { CommonFooter } from "@/components/ui/common-footer";

interface SettingsFooterProps {
	className?: string;
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function SettingsFooter({
	className = "",
	leftSidebarOpen,
	rightSidebarOpen,
}: SettingsFooterProps) {
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [stats, setStats] = useState({
		activeUsers: 0,
		pendingInvites: 0,
		unreadNotifications: 0,
	});

	// Auto-save simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLastSaved(new Date());
		}, 30000); // Auto-save every 30 seconds

		return () => clearInterval(interval);
	}, []);

	// Update stats simulation
	useEffect(() => {
		const updateStats = () => {
			setStats({
				activeUsers: Math.floor(Math.random() * 100),
				pendingInvites: Math.floor(Math.random() * 10),
				unreadNotifications: Math.floor(Math.random() * 20),
			});
		};

		updateStats();
		const interval = setInterval(updateStats, 60000);

		return () => clearInterval(interval);
	}, []);

	const leftContent = (
		<span className="flex items-center">
			<Settings className="h-3 w-3 mr-1" />
			<span className="text-foreground">Settings</span>
		</span>
	);

	const centerContent = (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2">
				<Shield className="h-3 w-3" />
				<span>Active Users: {stats.activeUsers}</span>
			</div>
			<div className="flex items-center gap-2">
				<Database className="h-3 w-3" />
				<span>Pending Invites: {stats.pendingInvites}</span>
			</div>
			<div className="flex items-center gap-2">
				<Bell className="h-3 w-3" />
				<span>Notifications: {stats.unreadNotifications}</span>
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
				text: "System Status",
				icon: <Settings className="h-3 w-3 mr-1" />,
			}}
		/>
	);
}
