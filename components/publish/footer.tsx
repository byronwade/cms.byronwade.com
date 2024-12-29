"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, Calendar, Globe } from "lucide-react";
import { CommonFooter } from "@/components/ui/common-footer";

interface PublishFooterProps {
	className?: string;
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function PublishFooter({ className = "", leftSidebarOpen, rightSidebarOpen }: PublishFooterProps) {
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [scheduledPosts, setScheduledPosts] = useState(0);
	const [publishedPosts, setPublishedPosts] = useState(0);
	const [draftPosts, setDraftPosts] = useState(0);

	// Auto-save simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLastSaved(new Date());
		}, 30000); // Auto-save every 30 seconds

		return () => clearInterval(interval);
	}, []);

	// Update post counts simulation
	useEffect(() => {
		// Simulated data update
		const updateCounts = () => {
			setScheduledPosts(Math.floor(Math.random() * 5));
			setPublishedPosts(Math.floor(Math.random() * 20));
			setDraftPosts(Math.floor(Math.random() * 10));
		};

		updateCounts(); // Initial update
		const interval = setInterval(updateCounts, 60000); // Update every minute

		return () => clearInterval(interval);
	}, []);

	const leftContent = (
		<span className="flex items-center">
			<FileText className="h-3 w-3 mr-1" />
			<span className="text-white">Publishing Dashboard</span>
		</span>
	);

	const centerContent = (
		<div className="flex items-center space-x-4">
			<div className="flex items-center gap-2">
				<Clock className="h-3 w-3" />
				<span>Scheduled: {scheduledPosts}</span>
			</div>
			<div className="flex items-center gap-2">
				<Globe className="h-3 w-3" />
				<span>Published: {publishedPosts}</span>
			</div>
			<div className="flex items-center gap-2">
				<Calendar className="h-3 w-3" />
				<span>Drafts: {draftPosts}</span>
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
				text: "All Systems Operational",
				icon: <Globe className="h-3 w-3 mr-1" />,
			}}
		/>
	);
}
