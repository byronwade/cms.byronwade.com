"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

interface CommandItem {
	id: string;
	icon: React.ReactNode;
	title: string;
	shortcut?: string;
	category?: string;
}

const commandItems: CommandItem[] = [
	{
		id: "take-note",
		icon: "📝",
		title: "Take note",
		shortcut: "T",
		category: "Favorites",
	},
	{
		id: "create-document",
		icon: "📄",
		title: "Create document",
		shortcut: "N",
		category: "Favorites",
	},
	{
		id: "add-contact",
		icon: "👤",
		title: "Add contact",
		shortcut: "A",
		category: "Favorites",
	},
	{
		id: "compose-mail",
		icon: "✉️",
		title: "Compose mail",
		shortcut: "A",
		category: "Favorites",
	},
	{
		id: "play-spotify",
		icon: "🎵",
		title: "Play Spotify",
		shortcut: "S",
		category: "Favorites",
	},
	{
		id: "dashboard",
		icon: "📊",
		title: "Dashboard",
		shortcut: "D",
		category: "Quick actions",
	},
	{
		id: "settings",
		icon: "⚙️",
		title: "Settings",
		shortcut: "S",
		category: "Quick actions",
	},
	{
		id: "notifications",
		icon: "🔔",
		title: "Notifications",
		shortcut: "N",
		category: "Quick actions",
	},
	{
		id: "language",
		icon: "🌐",
		title: "Language & region",
		shortcut: "L",
		category: "Quick actions",
	},
];

export function CommandPalette({ className, isOpen, onClose }: CommandPaletteProps) {
	const [search, setSearch] = React.useState("");
	const [pages] = React.useState(["All", "Task", "Document", "Media", "People"]);
	const [selectedPage, setSelectedPage] = React.useState("All");

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				onClose();
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [onClose]);

	return (
		<Command.Dialog open={isOpen} onOpenChange={onClose} className={cn("fixed top-[20%] left-1/2 -translate-x-1/2 w-[640px] max-w-[90vw] rounded-xl bg-white dark:bg-[#1a1a1a] shadow-2xl", className)}>
			<div className="flex items-center border-b border-[#2a2a2a] px-3">
				<Search className="w-4 h-4 text-gray-400 mr-2" />
				<Command.Input value={search} onValueChange={setSearch} placeholder="Search..." className="flex-1 h-12 bg-transparent outline-none placeholder:text-gray-400 text-white" />
			</div>

			<div className="border-b border-[#2a2a2a] px-3 py-2 flex space-x-4">
				{pages.map((page) => (
					<button key={page} onClick={() => setSelectedPage(page)} className={cn("text-sm", selectedPage === page ? "text-white" : "text-gray-400 hover:text-white transition-colors")}>
						{page}
					</button>
				))}
			</div>

			<Command.List className="max-h-[300px] overflow-y-auto p-2">
				{commandItems.map((group, index) => (
					<React.Fragment key={group.category}>
						{index === 0 || group.category !== commandItems[index - 1].category ? (
							<Command.Group heading={group.category} className="px-2 py-1">
								<div className="text-xs text-gray-400 uppercase mb-2">{group.category}</div>
							</Command.Group>
						) : null}
						<Command.Item
							value={group.title}
							onSelect={() => {
								console.log(`Selected: ${group.title}`);
								onClose();
							}}
							className="flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-gray-400 hover:bg-[#2a2a2a] hover:text-white cursor-pointer"
						>
							<div className="flex items-center gap-2">
								<span className="text-lg">{group.icon}</span>
								<span>{group.title}</span>
							</div>
							{group.shortcut && (
								<div className="flex items-center gap-1">
									<kbd className="px-2 py-1 text-xs bg-[#2a2a2a] rounded text-gray-400">{group.shortcut}</kbd>
								</div>
							)}
						</Command.Item>
					</React.Fragment>
				))}
			</Command.List>

			<div className="border-t border-[#2a2a2a] p-2">
				<div className="flex items-center justify-between text-xs text-gray-400">
					<div className="flex items-center gap-2">
						<span>↑↓</span>
						<span>Navigate</span>
						<span>Esc</span>
						<span>Close</span>
					</div>
					<div className="flex items-center gap-2">
						<span>↵</span>
						<span>Select</span>
					</div>
				</div>
			</div>
		</Command.Dialog>
	);
}
