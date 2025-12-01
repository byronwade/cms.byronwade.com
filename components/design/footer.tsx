"use client";

import { Box, Paintbrush, Ruler, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { CommonFooter } from "@/components/ui/common-footer";

interface DesignFooterProps {
	className?: string;
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function DesignFooter({
	className = "",
	leftSidebarOpen,
	rightSidebarOpen,
}: DesignFooterProps) {
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [elementCount, setElementCount] = useState(0);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
	const selectedTool = "select";

	// Auto-save simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLastSaved(new Date());
		}, 30000); // Auto-save every 30 seconds

		return () => clearInterval(interval);
	}, []);

	// Update element counts and canvas size simulation
	useEffect(() => {
		const updateStats = () => {
			setElementCount(Math.floor(Math.random() * 50));
			setCanvasSize({
				width: Math.floor(Math.random() * 1000) + 500,
				height: Math.floor(Math.random() * 800) + 400,
			});
		};

		updateStats();
		const interval = setInterval(updateStats, 60000);

		return () => clearInterval(interval);
	}, []);

	const leftContent = (
		<span className="flex items-center">
			<Paintbrush className="h-3 w-3 mr-1" />
			<span className="text-foreground">Visual Designer</span>
		</span>
	);

	const centerContent = (
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-2">
				<Box className="h-3 w-3" />
				<span>Elements: {elementCount}</span>
			</div>
			<div className="flex items-center gap-2">
				<Ruler className="h-3 w-3" />
				<span>
					Canvas: {canvasSize.width}x{canvasSize.height}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<Type className="h-3 w-3" />
				<span>Tool: {selectedTool}</span>
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
				text: "Design Mode",
				icon: <Paintbrush className="h-3 w-3 mr-1" />,
			}}
		/>
	);
}
