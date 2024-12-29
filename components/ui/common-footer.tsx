"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

interface CommonFooterProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	className?: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
	centerContent?: React.ReactNode;
	lastSaved?: Date | null;
	environment?: "development" | "production" | "staging";
	status?: {
		type: "success" | "warning" | "error";
		text: string;
		icon?: React.ReactNode;
	};
}

export function CommonFooter({ leftSidebarOpen, rightSidebarOpen, className = "", leftContent, rightContent, centerContent, lastSaved, environment = "development", status }: CommonFooterProps) {
	const getLastSavedText = () => {
		if (!lastSaved) return "Not saved yet";
		const diff = Math.floor((new Date().getTime() - lastSaved.getTime()) / 1000);
		if (diff < 60) return "Just now";
		const minutes = Math.floor(diff / 60);
		return `${minutes}m ago`;
	};

	return (
		<div
			className={`fixed bottom-0 flex h-[var(--footer-height)] items-center justify-between px-4 border-t border-[#2a2a2a] bg-[#1a1a1a] text-xs text-gray-400 transition-all duration-300 ease-in-out ${className}`}
			style={{
				left: leftSidebarOpen ? "var(--sidebar-width)" : "0",
				right: rightSidebarOpen ? "var(--sidebar-width)" : "0",
			}}
		>
			<div className="flex items-center space-x-4">
				{leftContent}

				{lastSaved && (
					<>
						<Separator orientation="vertical" className="h-3 bg-[#2a2a2a]" />
						<span className="flex items-center">
							<Clock className="h-3 w-3 mr-1" />
							Last saved: {getLastSavedText()}
						</span>
					</>
				)}

				{(environment || status) && (
					<>
						<Separator orientation="vertical" className="h-3 bg-[#2a2a2a]" />
						<div className="flex items-center space-x-2">
							{environment && (
								<Badge variant="outline" className="bg-[#2a2a2a] text-white border-[#3a3a3a] capitalize">
									{environment}
								</Badge>
							)}
							{status && (
								<Badge variant="outline" className={`bg-[#2a2a2a] border-[#3a3a3a] ${status.type === "success" ? "text-green-400" : status.type === "warning" ? "text-yellow-400" : "text-red-400"}`}>
									{status.icon}
									{status.text}
								</Badge>
							)}
						</div>
					</>
				)}
			</div>

			{centerContent && <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{centerContent}</div>}

			{rightContent && <div className="flex items-center space-x-4">{rightContent}</div>}
		</div>
	);
}
