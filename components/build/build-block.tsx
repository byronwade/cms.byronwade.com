"use client";

import { MoreVertical } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BuildBlockProps {
	id: string;
	data: {
		label: string;
		icon?: JSX.Element;
	};
	selected?: boolean;
	position?: { x: number; y: number };
	onSelect: (id: string, multiple: boolean) => void;
}

export function BuildBlock({
	id,
	data,
	selected,
	position,
	onSelect,
}: BuildBlockProps) {
	const blockRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (blockRef.current && position) {
			blockRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
		}
	}, [position]);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (e.button !== 0) return; // Only handle left click
		onSelect(id, e.shiftKey);
	};

	return (
		<button
			type="button"
			ref={blockRef}
			id={`block-${id}`}
			className={`absolute bg-card rounded-lg border ${selected ? "border-primary" : "border-border"} w-[300px] transition-colors hover:border-primary/50 cursor-move select-none text-left`}
			onMouseDown={handleMouseDown}
		>
			<div className="p-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						{data.icon}
						<div>
							<h3 className="text-sm font-medium text-card-foreground">
								{data.label}
							</h3>
						</div>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="h-8 w-8 p-0"
								onMouseDown={(e) => e.stopPropagation()} // Prevent dragging when clicking menu
							>
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>View Logs</DropdownMenuItem>
							<DropdownMenuItem>Restart</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</button>
	);
}
