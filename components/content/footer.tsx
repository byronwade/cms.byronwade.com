"use client";

import { Eye, FileText, Redo, Save, Settings, Undo } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CommonFooter } from "@/components/ui/common-footer";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContentFooterProps {
	className?: string;
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function ContentFooter({
	className = "",
	leftSidebarOpen,
	rightSidebarOpen,
}: ContentFooterProps) {
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [wordCount, setWordCount] = useState(0);
	const [charCount, setCharCount] = useState(0);

	// Auto-save simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLastSaved(new Date());
		}, 30000); // Auto-save every 30 seconds

		return () => clearInterval(interval);
	}, []);

	// Update word and character count
	useEffect(() => {
		const handleContentChange = () => {
			const content = document.querySelector('[contenteditable="true"]');
			if (content) {
				const text = content.textContent || "";
				setCharCount(text.length);
				setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
			}
		};

		const observer = new MutationObserver(handleContentChange);
		const content = document.querySelector('[contenteditable="true"]');

		if (content) {
			observer.observe(content, {
				childList: true,
				characterData: true,
				subtree: true,
			});
			handleContentChange(); // Initial count
		}

		return () => observer.disconnect();
	}, []);

	const leftContent = (
		<span className="flex items-center">
			<FileText className="h-3 w-3 mr-1" />
			<span className="text-foreground">Content Editor</span>
		</span>
	);

	const centerContent = (
		<div className="flex items-center gap-4">
			<span>Words: {wordCount}</span>
			<span>Characters: {charCount}</span>
		</div>
	);

	const rightContent = (
		<TooltipProvider>
			<div className="flex items-center gap-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" className="h-6 w-6">
							<Save className="h-3 w-3" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Save Draft</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" className="h-6 w-6">
							<Undo className="h-3 w-3" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Undo</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" className="h-6 w-6">
							<Redo className="h-3 w-3" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Redo</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" className="h-6 w-6">
							<Eye className="h-3 w-3" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Preview</TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="icon" className="h-6 w-6">
							<Settings className="h-3 w-3" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Settings</TooltipContent>
				</Tooltip>
			</div>
		</TooltipProvider>
	);

	return (
		<CommonFooter
			leftSidebarOpen={leftSidebarOpen}
			rightSidebarOpen={rightSidebarOpen}
			className={className}
			leftContent={leftContent}
			centerContent={centerContent}
			rightContent={rightContent}
			lastSaved={lastSaved}
			environment="development"
			status={{
				type: "success",
				text: "Draft",
				icon: <FileText className="h-3 w-3 mr-1" />,
			}}
		/>
	);
}
