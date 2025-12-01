"use client";

import { format } from "date-fns";
import { CalendarIcon, Clock, Globe, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { usePublishStore } from "@/app/cms/publish/store";
import { CommonSidebar } from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface PublishRightSidebarProps {
	isOpen: boolean;
}

function PublishRightSidebar({ isOpen }: PublishRightSidebarProps) {
	const [date, setDate] = useState<Date>();
	const selectedItem = usePublishStore((state) => state.selectedItem);
	const items = usePublishStore((state) => state.items) || [];

	if (!selectedItem) return null;

	const relatedItem = selectedItem.relatedTo
		? items.find((i) => i.id === selectedItem.relatedTo)
		: null;
	const relatedToThis =
		items.filter((i) => i.relatedTo === selectedItem.id) || [];

	return (
		<CommonSidebar isOpen={isOpen} side="right">
			<div className="border-b border-border">
				<div className="px-4 py-4">
					<h2 className="text-lg font-medium text-foreground mb-3">
						{selectedItem.title}
					</h2>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1.5">
							<Clock className="w-4 h-4 text-muted-foreground" />
							<span className="text-sm text-muted-foreground">
								{selectedItem.lastModified}
							</span>
						</div>
						{selectedItem.scheduledFor && (
							<div className="flex items-center gap-1.5">
								<CalendarIcon className="w-4 h-4 text-muted-foreground" />
								<span className="text-sm text-muted-foreground">
									{new Date(selectedItem.scheduledFor).toLocaleDateString()}
								</span>
							</div>
						)}
						{selectedItem.assignedTo && (
							<div className="flex items-center gap-1.5">
								<Avatar className="w-6 h-6">
									<AvatarImage
										src="/avatars/default.svg"
										alt={selectedItem.assignedTo}
									/>
									<AvatarFallback>
										{selectedItem.assignedTo[0].toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<span className="text-sm text-muted-foreground">
									{selectedItem.assignedTo}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="p-4 gap-6 flex flex-col">
				{/* Schedule */}
				<div className="gap-3 flex flex-col">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-medium text-foreground">Schedule</h3>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									size="sm"
									className={cn(
										"justify-start text-left font-normal",
										!date && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="w-4 h-4 mr-2" />
									{date ? format(date, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>

				{/* Visibility */}
				<div className="gap-3 flex flex-col">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-medium text-foreground">Visibility</h3>
						<Button variant="outline" size="sm" className="gap-2">
							<Globe className="w-4 h-4" />
							Public
						</Button>
					</div>
				</div>

				{/* Related Content */}
				{(relatedItem || relatedToThis.length > 0) && (
					<div className="gap-3 flex flex-col">
						<h3 className="text-sm font-medium text-foreground">
							Related Content
						</h3>
						<div className="gap-3 flex flex-col">
							{relatedItem && (
								<div className="p-3 rounded-lg bg-muted gap-2 flex flex-col">
									<div className="text-xs text-muted-foreground">
										Related to:
									</div>
									<div className="font-medium text-foreground">
										{relatedItem.title}
									</div>
									<div className="text-xs text-muted-foreground">
										{selectedItem.relationType}
									</div>
								</div>
							)}
							{relatedToThis.length > 0 && (
								<div className="p-3 rounded-lg bg-muted gap-2 flex flex-col">
									<div className="text-xs text-muted-foreground">
										Referenced by:
									</div>
									{relatedToThis.map((item) => (
										<div key={item.id} className="gap-1 flex flex-col">
											<div className="font-medium text-foreground">
												{item.title}
											</div>
											<div className="text-xs text-muted-foreground">
												{item.relationType}
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				)}

				{/* Comments */}
				{selectedItem.comments && selectedItem.comments.length > 0 && (
					<div className="gap-3 flex flex-col">
						<h3 className="text-sm font-medium text-foreground">Comments</h3>
						<div className="gap-3 flex flex-col">
							{selectedItem.comments.map((comment: any) => (
								<div
									key={comment.id}
									className="p-3 gap-2 flex flex-col rounded-lg bg-card"
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Avatar className="w-6 h-6">
												<AvatarImage
													src="/avatars/default.png"
													alt={comment.author}
												/>
												<AvatarFallback>
													{comment.author[0].toUpperCase()}
												</AvatarFallback>
											</Avatar>
											<span className="text-sm font-medium text-foreground">
												{comment.author}
											</span>
										</div>
										<span className="text-xs text-muted-foreground">
											{comment.timestamp}
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{comment.content}
									</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Add Comment */}
				<div className="gap-3 flex flex-col">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-medium text-foreground">Add Comment</h3>
					</div>
					<div className="gap-3 flex flex-col">
						<Textarea
							placeholder="Write a comment..."
							className="min-h-[100px]"
						/>
						<div className="flex justify-end">
							<Button size="sm">
								<MessageSquare className="w-4 h-4 mr-2" />
								Comment
							</Button>
						</div>
					</div>
				</div>

				{/* Assign */}
				<div className="gap-3 flex flex-col">
					<div className="flex items-center justify-between">
						<h3 className="text-sm font-medium text-foreground">Assign</h3>
						<Button variant="outline" size="sm" className="gap-2">
							<User className="w-4 h-4" />
							Assign
						</Button>
					</div>
				</div>
			</div>
		</CommonSidebar>
	);
}

export { PublishRightSidebar };
