"use client";

import { useCallback, useState } from "react";

interface HoverTooltipProps {
	content: React.ReactNode;
	children: React.ReactNode;
	offset?: { x: number; y: number };
}

export function HoverTooltip({
	content,
	children,
	offset = { x: 15, y: 15 },
}: HoverTooltipProps) {
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
	const [showTooltip, setShowTooltip] = useState(false);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;
			const tooltipWidth = 200; // max-w-[200px]
			const tooltipHeight = 50; // Approximate height
			const padding = 10; // Minimum distance from viewport edges

			// Initial positions
			let xPos = e.clientX + offset.x;
			let yPos = e.clientY + offset.y;

			// Check right edge
			if (xPos + tooltipWidth + padding > viewportWidth) {
				xPos = e.clientX - tooltipWidth - offset.x;
			}

			// Check bottom edge
			if (yPos + tooltipHeight + padding > viewportHeight) {
				yPos = e.clientY - tooltipHeight - offset.y;
			}

			// Check left edge
			if (xPos < padding) {
				xPos = padding;
			}

			// Check top edge
			if (yPos < padding) {
				yPos = padding;
			}

			setTooltipPosition({
				x: xPos,
				y: yPos,
			});
		},
		[offset],
	);

	return (
		<>
			{showTooltip && (
				<div
					className="fixed pointer-events-none animate-in fade-in duration-100"
					style={{
						left: tooltipPosition.x,
						top: tooltipPosition.y,
						zIndex: 9999,
					}}
				>
					<div className="bg-popover text-popover-foreground text-xs rounded-md px-2.5 py-1.5 max-w-[200px] shadow-lg border border-border whitespace-normal">
						{content}
					</div>
				</div>
			)}
			<div
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
				onMouseMove={handleMouseMove}
				className="w-full h-full"
			>
				{children}
			</div>
		</>
	);
}
