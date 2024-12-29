"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { GripVertical, MoreHorizontal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Column, ContentItem } from "@/app/cms/publish/store";
import { cn } from "@/lib/utils";
import { usePublishStore } from "@/app/cms/publish/store";
import { Card, CardContent } from "@/components/ui/card";
import { SortableItem } from "@/components/dnd/sortable-item";

interface DroppableColumnProps {
	column: Column;
	items: ContentItem[];
	children: React.ReactNode;
	onAddItem: () => void;
	onTitleChange: (columnId: string, newTitle: string) => void;
	onDeleteColumn: (id: string) => void;
	autoFocus?: boolean;
}

function getTypeStyles(type: string): { color: string; bgColor: string } {
	switch (type.toLowerCase()) {
		case "navigation":
			return { color: "text-orange-400/70", bgColor: "bg-orange-400/10" };
		case "page":
			return { color: "text-blue-400/70", bgColor: "bg-blue-400/10" };
		case "product":
			return { color: "text-green-400/70", bgColor: "bg-green-400/10" };
		case "blog":
			return { color: "text-purple-400/70", bgColor: "bg-purple-400/10" };
		case "campaign":
			return { color: "text-pink-400/70", bgColor: "bg-pink-400/10" };
		case "seo":
			return { color: "text-yellow-400/70", bgColor: "bg-yellow-400/10" };
		default:
			return { color: "text-gray-400/70", bgColor: "bg-gray-400/10" };
	}
}

export function DroppableColumn({ column, items, children, onAddItem, onTitleChange, onDeleteColumn, autoFocus }: DroppableColumnProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [deleteConfirmation, setDeleteConfirmation] = useState("");
	const [isHovered, setIsHovered] = useState(false);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const { setNodeRef, isOver } = useDroppable({
		id: column.id,
	});
	const { aiSuggestedItems, generateSuggestionsForColumn } = usePublishStore();
	const suggestions = aiSuggestedItems[column.id] || [];

	useEffect(() => {
		if ((autoFocus || isEditing) && titleRef.current) {
			titleRef.current.focus();
			const range = document.createRange();
			const selection = window.getSelection();
			range.selectNodeContents(titleRef.current);
			range.collapse(false);
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}, [autoFocus, isEditing]);

	useEffect(() => {
		generateSuggestionsForColumn(column.id);
	}, [column.id, generateSuggestionsForColumn]);

	const handleTitleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleTitleBlur = () => {
		setIsEditing(false);
		if (titleRef.current) {
			const newTitle = titleRef.current.textContent || column.title;
			if (newTitle !== column.title) {
				onTitleChange(column.id, newTitle);
			}
		}
	};

	const handleTitleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			titleRef.current?.blur();
		}
		if (e.key === "Escape") {
			if (titleRef.current) {
				titleRef.current.textContent = column.title;
			}
			setIsEditing(false);
		}
	};

	const handleDelete = () => {
		if (items.length === 0) {
			onDeleteColumn(column.id);
		} else {
			setShowDeleteDialog(true);
		}
	};

	const handleConfirmDelete = () => {
		if (deleteConfirmation === "DELETE") {
			onDeleteColumn(column.id);
			setShowDeleteDialog(false);
			setDeleteConfirmation("");
		}
	};

	return (
		<div className="flex-shrink-0 w-[300px] h-full">
			<div className={cn("flex flex-col h-full")} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
				<div className="flex items-center justify-between flex-shrink-0 px-4 py-3">
					<div className="relative flex items-center">
						<GripVertical className={cn("absolute -left-6 w-4 h-4 text-gray-400 transition-opacity", isHovered ? "opacity-100" : "opacity-0")} data-drag-handle />
						<h3 ref={titleRef} contentEditable={isEditing} onDoubleClick={handleTitleDoubleClick} onBlur={handleTitleBlur} onKeyDown={handleTitleKeyDown} className={cn("text-sm font-medium text-white outline-none px-1.5 -mx-1.5 rounded transition-colors min-w-0", isEditing && "bg-[#2a2a2a]/70 ring-1 ring-white/5")} suppressContentEditableWarning>
							{column.title}
						</h3>
					</div>
					<div className="flex items-center">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="tiny" className="h-6 px-2 text-white hover:text-white hover:bg-[#3a3a3a]">
									<MoreHorizontal className="w-4 h-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48 bg-[#2a2a2a] border-[#3a3a3a]">
								<DropdownMenuItem onClick={handleDelete} className="text-sm text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-400/10">
									Delete Board
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				<div ref={setNodeRef} className={cn("flex-1 overflow-y-auto pr-2", isOver && "bg-[#2a2a2a]/20")}>
					<div className="px-4">
						{children}

						{suggestions.length > 0 && (
							<div className="mt-4">
								<div className="flex items-center gap-2 px-2 mb-2">
									<Sparkles className="w-3 h-3 text-blue-400" />
									<span className="text-xs font-medium text-gray-400">AI Suggestions</span>
								</div>
								<div className="space-y-3">
									{suggestions.map((suggestion) => (
										<SortableItem key={suggestion.id} id={suggestion.id}>
											<div className="transition-opacity opacity-60 hover:opacity-100">
												<Card className="relative bg-[#1a1a1a] border-[#3a3a3a] hover:border-blue-500/50 transition-colors">
													<CardContent className="p-4 space-y-2">
														<div className="flex items-start justify-between gap-2">
															<div className="flex-1 min-w-0">
																<h4 className="font-medium text-white truncate">{suggestion.title}</h4>
															</div>
															<span className={cn("text-[10px] leading-none px-1.5 py-0.5 rounded uppercase tracking-wide font-medium", getTypeStyles(suggestion.type).color, getTypeStyles(suggestion.type).bgColor)}>{suggestion.type}</span>
														</div>
														<p className="text-sm text-gray-400 line-clamp-2">{suggestion.description}</p>
														<div className="flex items-center justify-between text-xs">
															<span className="text-blue-400">{suggestion.confidence}% confidence</span>
															<span className="text-gray-500">Drag to use</span>
														</div>
														<div className="mt-1 text-xs text-gray-500">{suggestion.reason}</div>
													</CardContent>
												</Card>
											</div>
										</SortableItem>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Board</DialogTitle>
						<DialogDescription>This board contains items. Type "DELETE" to confirm deletion.</DialogDescription>
					</DialogHeader>
					<Input value={deleteConfirmation} onChange={(e) => setDeleteConfirmation(e.target.value)} placeholder="Type DELETE to confirm" />
					<DialogFooter>
						<Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
							Cancel
						</Button>
						<Button variant="destructive" onClick={handleConfirmDelete} disabled={deleteConfirmation !== "DELETE"}>
							Delete Board
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
