"use client";

import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor, closestCenter, DragStartEvent, DragEndEvent, DragOverEvent, pointerWithin } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { usePublishStore, type ContentItem, type Column, demoContent } from "./store";
import { DroppableColumn } from "@/components/dnd/droppable-column";
import { SortableItem } from "@/components/dnd/sortable-item";
import { Clock, Calendar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// Add getTypeStyles function
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

// Add ContentCard component
function ContentCard({ item, isSelected, onTitleChange }: { item: ContentItem; isSelected: boolean; onTitleChange: (id: string, newTitle: string) => void }) {
	const [isEditing, setIsEditing] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
	const titleRef = useRef<HTMLHeadingElement>(null);
	const typeStyles = getTypeStyles(item.type);
	const items = usePublishStore((state) => state.items) || [];
	const relatedItem = item.relatedTo ? items.find((i) => i.id === item.relatedTo) : null;
	const relatedToThis = items.filter((i) => i.relatedTo === item.id);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (relatedItem || relatedToThis.length > 0) {
			setTooltipPosition({ x: e.clientX + 10, y: e.clientY + 10 });
		}
	};

	useEffect(() => {
		if (isEditing && titleRef.current) {
			titleRef.current.focus();
			const range = document.createRange();
			const selection = window.getSelection();
			range.selectNodeContents(titleRef.current);
			range.collapse(false);
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}, [isEditing]);

	const handleTitleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleTitleBlur = () => {
		setIsEditing(false);
		if (titleRef.current) {
			const newTitle = titleRef.current.textContent || item.title;
			if (newTitle !== item.title) {
				onTitleChange(item.id, newTitle);
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
				titleRef.current.textContent = item.title;
			}
			setIsEditing(false);
		}
	};

	return (
		<div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} onMouseMove={handleMouseMove}>
			<Card className={cn("relative bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors", isSelected && "border-blue-500", isEditing && "ring-1 ring-blue-500/20")}>
				<CardContent className="p-4 space-y-2">
					<div className="flex items-start justify-between gap-2">
						<div className="flex-1 min-w-0">
							<h4 ref={titleRef} contentEditable={isEditing} onDoubleClick={handleTitleDoubleClick} onBlur={handleTitleBlur} onKeyDown={handleTitleKeyDown} className={cn("font-medium text-white outline-none px-1.5 -mx-1.5 rounded transition-colors flex-1 min-w-0 leading-tight", isEditing && "bg-[#3a3a3a]/70 ring-1 ring-white/5")} suppressContentEditableWarning>
								{item.title}
							</h4>
						</div>
						<span className={cn("text-[10px] leading-none px-1.5 py-0.5 rounded uppercase tracking-wide font-medium", typeStyles.color, typeStyles.bgColor)}>{item.type}</span>
					</div>
					<p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
					<div className="flex items-center justify-between text-xs text-gray-400">
						<div className="flex items-center gap-3">
							<span className="flex items-center">
								<Clock className="w-3 h-3 mr-1" />
								{item.lastModified}
							</span>
							{item.scheduledFor && (
								<span className="flex items-center">
									<Calendar className="w-3 h-3 mr-1" />
									{new Date(item.scheduledFor).toLocaleDateString()}
								</span>
							)}
						</div>
						<div className="flex items-center gap-2">
							{item.comments && item.comments.length > 0 && (
								<span className="flex items-center text-blue-400/70">
									<MessageSquare className="w-3 h-3 mr-1" />
									{item.comments.length}
								</span>
							)}
							{item.assignedTo && (
								<div className="relative flex-shrink-0">
									<Avatar className="w-4 h-4">
										<AvatarImage src="/avatars/default.png" alt={item.assignedTo} />
										<AvatarFallback>{item.assignedTo[0].toUpperCase()}</AvatarFallback>
									</Avatar>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Relationship Tooltip */}
			{showTooltip && (relatedItem || relatedToThis.length > 0) && (
				<div
					className="fixed z-50 p-3 text-sm bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg shadow-lg pointer-events-none min-w-[200px] max-w-[300px]"
					style={{
						left: tooltipPosition.x,
						top: tooltipPosition.y,
					}}
				>
					{relatedItem && (
						<div className="mb-2">
							<div className="flex items-center gap-2 mb-1">
								<span className={cn("w-2 h-2 rounded-full", getTypeStyles(relatedItem.type).color.replace("text-", "bg-"))} />
								<span className="text-gray-400">Related to:</span>
							</div>
							<div className="pl-4">
								<div className="font-medium text-white">{relatedItem.title}</div>
								<div className="text-xs text-gray-400">{item.relationType}</div>
							</div>
						</div>
					)}
					{relatedToThis.length > 0 && (
						<div className={relatedItem ? "pt-2 mt-2 border-t border-[#3a3a3a]" : ""}>
							<div className="flex items-center gap-2 mb-1">
								<span className={cn("w-2 h-2 rounded-full", typeStyles.color.replace("text-", "bg-"))} />
								<span className="text-gray-400">Referenced by:</span>
							</div>
							<div className="pl-4 space-y-1">
								{relatedToThis.map((related) => (
									<div key={related.id}>
										<div className="font-medium text-white">{related.title}</div>
										<div className="text-xs text-gray-400">{related.relationType}</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default function PublishPage() {
	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	);

	const [activeId, setActiveId] = useState<string | null>(null);
	const { items = demoContent, setItems, selectedItem, setSelectedItem, sidebarOpen, columns = [], setColumns, columnOrder = [], setColumnOrder, newBoardId, handleDeleteBoard, convertSuggestionToItem, aiSuggestedItems } = usePublishStore();

	// Initialize items if empty
	useEffect(() => {
		if (!items || items.length === 0) {
			setItems(demoContent);
		}
	}, [items, setItems]);

	function findContainer(id: string) {
		if (id.startsWith("ai-")) {
			// Find which column contains this AI suggestion
			return Object.entries(aiSuggestedItems).find(([_, items]) => items.some((item) => item.id === id))?.[0] || null;
		}
		if (columns.find((col) => col.id === id)) return id;
		const item = items.find((item) => item.id === id);
		return item ? item.status : null;
	}

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const activeId = active.id as string;
		setActiveId(activeId);
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		// Find the actual column we're hovering over
		let overContainer = findContainer(overId);

		// If we're hovering over an item, find its container
		if (!columns.find((col) => col.id === overContainer)) {
			const item = items.find((item) => item.id === overId);
			if (item) {
				overContainer = item.status;
			}
		}

		const activeContainer = findContainer(activeId);

		if (!activeContainer || !overContainer || activeContainer === overContainer) return;

		// Handle AI suggestion movement
		if (activeId.startsWith("ai-")) {
			convertSuggestionToItem(activeId);
			return;
		}

		// If we're dragging a column
		const isActiveColumn = columns.find((col) => col.id === activeId);
		const isOverColumn = columns.find((col) => col.id === overContainer);

		if (isActiveColumn && isOverColumn && activeId !== overContainer) {
			const activeIndex = columnOrder.indexOf(activeId);
			const overIndex = columnOrder.indexOf(overContainer);
			setColumnOrder((current) => arrayMove(current, activeIndex, overIndex));
			return;
		}

		// Handle regular item movement
		setItems((prev) => prev.map((item) => (item.id === activeId ? { ...item, status: overContainer } : item)));
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);

		if (!over) return;

		const activeId = active.id.toString();
		const overId = over.id.toString();

		// Find the actual column we're hovering over
		let overContainer = findContainer(overId);

		// If we're hovering over an item, find its container
		if (!columns.find((col) => col.id === overContainer)) {
			const item = items.find((item) => item.id === overId);
			if (item) {
				overContainer = item.status;
			}
		}

		const activeContainer = findContainer(activeId);

		if (!activeContainer || !overContainer) return;

		// Handle AI suggestion conversion
		if (activeId.startsWith("ai-")) {
			convertSuggestionToItem(activeId);
			return;
		}

		// Check if dragging a column
		const isActiveColumn = columns.find((col) => col.id === activeId);
		const isOverColumn = columns.find((col) => col.id === overContainer);

		if (isActiveColumn && isOverColumn && activeId !== overContainer) {
			const activeIndex = columnOrder.indexOf(activeId);
			const overIndex = columnOrder.indexOf(overContainer);
			setColumnOrder((current) => arrayMove(current, activeIndex, overIndex));
			return;
		}

		// Moving within the same container
		if (activeContainer === overContainer) {
			const activeIndex = items.findIndex((item) => item.id === activeId);
			const overIndex = items.findIndex((item) => item.id === overId);

			if (activeIndex !== overIndex) {
				setItems((prev) => arrayMove(prev, activeIndex, overIndex));
			}
		} else {
			// Moving to a different container
			setItems((prev) => prev.map((item) => (item.id === activeId ? { ...item, status: overContainer } : item)));
		}
	};

	const handleDragCancel = () => {
		setActiveId(null);
	};

	const handleItemClick = (item: ContentItem) => {
		setSelectedItem(item);
	};

	const handleCardTitleChange = (itemId: string, newTitle: string) => {
		setItems((prev: ContentItem[]) => [...prev].map((item) => (item.id === itemId ? { ...item, title: newTitle } : item)));
	};

	const handleTitleChange = (columnId: string, newTitle: string) => {
		setColumns((prev: Column[]) => {
			const updatedColumns = [...prev].map((col) => (col.id === columnId ? { ...col, title: newTitle } : col));
			return updatedColumns;
		});
	};

	// Group items into nodes
	const groupItems = (items: ContentItem[]) => {
		const grouped: ContentItem[][] = [];
		const used = new Set<string>();

		items.forEach((item) => {
			if (used.has(item.id)) return;

			const group: ContentItem[] = [];
			let currentItem = item;

			// Add the main item
			group.push(currentItem);
			used.add(currentItem.id);

			// Add items that this item relates to
			while (currentItem.relatedTo) {
				const relatedItem = items.find((i) => i.id === currentItem.relatedTo);
				if (relatedItem && !used.has(relatedItem.id)) {
					group.unshift(relatedItem); // Add to start to maintain hierarchy
					used.add(relatedItem.id);
					currentItem = relatedItem;
				} else {
					break;
				}
			}

			// Add items that relate to this item
			items.forEach((relatedItem) => {
				if (relatedItem.relatedTo === item.id && !used.has(relatedItem.id)) {
					group.push(relatedItem);
					used.add(relatedItem.id);
				}
			});

			if (group.length > 0) {
				grouped.push(group);
			}
		});

		return grouped;
	};

	return (
		<div className="flex-1 overflow-hidden h-[calc(100vh-110px)]">
			<DndContext id="publish-kanban" sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} onDragCancel={handleDragCancel}>
				<div className="h-full pt-5 pb-10 px-6 bg-[#1a1a1a] overflow-x-auto">
					<SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
						<div className="flex h-full gap-3 min-w-fit">
							{columnOrder.map((columnId) => {
								const column = columns.find((col) => col.id === columnId)!;
								const columnItems = items.filter((item) => item.status === column.id) || [];
								const columnSuggestions = aiSuggestedItems[column.id] || [];
								const groupedItems = groupItems(columnItems);

								return (
									<SortableItem key={column.id} id={column.id} className="flex-none">
										<DroppableColumn column={column} items={columnItems} onAddItem={() => {}} onTitleChange={handleTitleChange} onDeleteColumn={handleDeleteBoard} autoFocus={column.id === newBoardId}>
											<SortableContext items={[...columnItems.map((item) => item.id), ...columnSuggestions.map((item) => item.id)]} strategy={verticalListSortingStrategy}>
												<div className="space-y-3">
													{groupedItems.map((group) => (
														<div key={group[0].id} className="space-y-3">
															{group.map((item) => (
																<SortableItem key={item.id} id={item.id} onClick={() => handleItemClick(item)}>
																	<ContentCard item={item} isSelected={selectedItem?.id === item.id} onTitleChange={handleCardTitleChange} />
																</SortableItem>
															))}
														</div>
													))}
												</div>
											</SortableContext>
										</DroppableColumn>
									</SortableItem>
								);
							})}
						</div>
					</SortableContext>
				</div>
				<DragOverlay>
					{activeId &&
						(columns.find((col) => col.id === activeId) ? (
							<div className="flex-shrink-0 w-[300px] h-full">
								<div className="flex flex-col h-full">
									<DroppableColumn column={columns.find((col) => col.id === activeId)!} items={items.filter((item) => item.status === activeId)} onAddItem={() => {}} onTitleChange={handleTitleChange} onDeleteColumn={handleDeleteBoard}>
										<SortableContext items={items.filter((item) => item.status === activeId).map((item) => item.id)} strategy={verticalListSortingStrategy}>
											<div className="space-y-3">
												{groupItems(items.filter((item) => item.status === activeId)).map((group) => (
													<div key={group[0].id} className="space-y-3">
														{group.map((item) => (
															<div key={item.id}>
																<ContentCard item={item} isSelected={selectedItem?.id === activeId} onTitleChange={handleCardTitleChange} />
															</div>
														))}
													</div>
												))}
											</div>
										</SortableContext>
									</DroppableColumn>
								</div>
							</div>
						) : (
							<div className="w-[300px]">
								{activeId.startsWith("ai-") ? (
									(() => {
										const suggestion = Object.values(aiSuggestedItems)
											.flat()
											.find((item) => item.id === activeId);
										if (!suggestion) return null;
										return (
											<Card className="relative bg-[#1a1a1a] border-[#3a3a3a] hover:border-blue-500/50 transition-colors opacity-60">
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
										);
									})()
								) : (
									<ContentCard item={items.find((item) => item.id === activeId)!} isSelected={selectedItem?.id === activeId} onTitleChange={handleCardTitleChange} />
								)}
							</div>
						))}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
