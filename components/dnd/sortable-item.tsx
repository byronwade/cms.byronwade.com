"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface SortableItemProps {
	id: string;
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

export function SortableItem({
	id,
	children,
	onClick,
	className,
}: SortableItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : undefined,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn("touch-none relative", className)}
			onClick={onClick}
			data-sortable-item
		>
			{children}
		</div>
	);
}
