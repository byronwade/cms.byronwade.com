"use client";

import {
	FileAudio,
	FileImage,
	FileVideo,
	HardDrive,
	Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CommonFooter } from "@/components/ui/common-footer";

interface MediaFooterProps {
	className?: string;
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function MediaFooter({
	className = "",
	leftSidebarOpen,
	rightSidebarOpen,
}: MediaFooterProps) {
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [storageUsed, setStorageUsed] = useState(0);
	const [mediaStats, setMediaStats] = useState({
		images: 0,
		videos: 0,
		audio: 0,
	});

	// Auto-save simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLastSaved(new Date());
		}, 30000); // Auto-save every 30 seconds

		return () => clearInterval(interval);
	}, []);

	// Update storage and media stats simulation
	useEffect(() => {
		const updateStats = () => {
			setStorageUsed(Math.floor(Math.random() * 100));
			setMediaStats({
				images: Math.floor(Math.random() * 1000),
				videos: Math.floor(Math.random() * 100),
				audio: Math.floor(Math.random() * 50),
			});
		};

		updateStats();
		const interval = setInterval(updateStats, 60000);

		return () => clearInterval(interval);
	}, []);

	const leftContent = (
		<span className="flex items-center">
			<ImageIcon className="h-3 w-3 mr-1" />
			<span className="text-foreground">Media Library</span>
		</span>
	);

	const centerContent = (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2">
				<HardDrive className="h-3 w-3" />
				<span>Storage: {storageUsed}GB used</span>
			</div>
			<div className="flex items-center gap-2">
				<FileImage className="h-3 w-3" />
				<span>Images: {mediaStats.images}</span>
			</div>
			<div className="flex items-center gap-2">
				<FileVideo className="h-3 w-3" />
				<span>Videos: {mediaStats.videos}</span>
			</div>
			<div className="flex items-center gap-2">
				<FileAudio className="h-3 w-3" />
				<span>Audio: {mediaStats.audio}</span>
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
				text: "Media Library",
				icon: <ImageIcon className="h-3 w-3 mr-1" />,
			}}
		/>
	);
}
