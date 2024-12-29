"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Share, Coffee, Sparkles, Bell, User, Settings, LogOut, ChevronDown, Eye, Smartphone, Tablet, Monitor, Inbox, HelpCircle, FileText, Clock, Rss, Keyboard, Search, Copy, ClipboardPasteIcon as Paste, Edit, Trash, X, Menu } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Button, ButtonGroup } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FeedbackDialog from "@/components/feedback-dialog";
import { Calculator, Calendar, CreditCard, Smile } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

// Simulating multiple users for collaboration mode
const collaborators = [
	{ name: "John Doe", avatar: "/avatars/01.png" },
	{ name: "Jane Smith", avatar: "/avatars/02.png" },
	{ name: "Bob Johnson", avatar: "/avatars/03.png" },
];

export function TopNav() {
	const [publishDropdownOpen, setPublishDropdownOpen] = useState(false);
	const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
	const [keyboardHelpOpen, setKeyboardHelpOpen] = useState(false);
	const [searchWindowOpen, setSearchWindowOpen] = useState(false);
	const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
	const [contextMenuVisible, setContextMenuVisible] = useState(false);
	const contextMenuRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	// Simulating collaboration mode
	const isCollaborationMode = collaborators.length > 1;

	const toggleKeyboardHelp = () => {
		setKeyboardHelpOpen(!keyboardHelpOpen);
		// Here you would typically implement the logic to show/hide the keyboard navigation help sheet
	};

	const handleSearchButtonClick = () => {
		setSearchWindowOpen(true);
	};

	const handleContextMenuAction = useCallback((action: string) => {
		// Implement context menu actions here
		console.log("Context menu action:", action);
	}, []);

	const handleContextMenu = useCallback((event: React.MouseEvent) => {
		event.preventDefault();
		setContextMenuPosition({ x: event.clientX, y: event.clientY });
		setContextMenuVisible(true);
	}, []);

	const handleClickOutside = useCallback((event: MouseEvent) => {
		if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
			setContextMenuVisible(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [handleClickOutside]);

	const dropdownStyles = "py-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-[1002]";
	const dropdownItemStyles = "block px-4 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md";

	const NavLinks = () => (
		<>
			{[
				{ href: "/cms/build", label: "Build" },
				{ href: "/cms/content", label: "Content" },
				{ href: "/cms/design", label: "Design" },
				{ href: "/cms/media", label: "Media" },
				{ href: "/cms/publish", label: "Publish" },
				{ href: "/cms/analytics", label: "Analytics" },
				{ href: "/cms/settings", label: "Settings" },
			].map((link) => (
				<Link key={link.href} href={link.href} className={`text-xs px-2 py-1 rounded-md w-full ${pathname === link.href ? "bg-secondary text-secondary-foreground" : "text-gray-200 hover:bg-gray-700 hover:text-white"}`}>
					{link.label}
				</Link>
			))}
		</>
	);

	return (
		<div onContextMenu={handleContextMenu}>
			<div className="fixed top-0 left-0 right-0 flex h-10 items-center justify-between bg-[#1a1a1a] dark:bg-[#1a1a1a] px-4 border-b border-[#2a2a2a] dark:border-[#2a2a2a]">
				{/* Left side of the nav */}
				<div className="flex items-center gap-2">
					<span className="text-sm font-bold text-white">MyCMS</span>
					<span className="mx-1 text-neutral-400">/</span>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="tiny" className={`text-xs text-neutral-700 dark:text-neutral-300 px-2 flex items-center justify-center hover:bg-gray-700 gap-1 ${isCollaborationMode ? "animate-pulse-more-apparent" : ""}`}>
								{isCollaborationMode ? (
									<div className="flex -space-x-2">
										{collaborators.map((collaborator, index) => (
											<Avatar key={index} className="inline-block w-5 h-5 shadow">
												<AvatarImage src={collaborator.avatar} alt={collaborator.name} className="border rounded-full" />
												<AvatarFallback className="border rounded-full">{collaborator.name[0]}</AvatarFallback>
											</Avatar>
										))}
									</div>
								) : (
									<Avatar className="w-5 h-5">
										<AvatarImage src="/avatars/01.png" alt="@username" className="rounded-full" />
										<AvatarFallback className="rounded-full">JD</AvatarFallback>
									</Avatar>
								)}
								<span>{isCollaborationMode ? "" : "John Doe"}</span>
								<ChevronDown className="w-4 h-4 text-neutral-400" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className={dropdownStyles} align="end">
							{isCollaborationMode ? (
								collaborators.map((collaborator, index) => (
									<div key={index} className={dropdownItemStyles}>
										<div className="flex items-center space-x-2">
											<Avatar className="w-5 h-5">
												<AvatarImage src={collaborator.avatar} alt={collaborator.name} className="rounded-full" />
												<AvatarFallback className="rounded-full">{collaborator.name[0]}</AvatarFallback>
											</Avatar>
											<span>{collaborator.name}</span>
										</div>
									</div>
								))
							) : (
								<>
									<div className={dropdownItemStyles}>
										<div className="flex flex-col space-y-1">
											<p className="text-sm font-medium">John Doe</p>
											<p className="text-xs text-muted-foreground">john@example.com</p>
										</div>
									</div>
									<div className="my-1 border-t border-neutral-100"></div>
									<a href="#" className={dropdownItemStyles} role="menuitem">
										<User className="inline-block w-3 h-3 mr-2" />
										Profile
									</a>
									<a href="#" className={dropdownItemStyles} role="menuitem">
										<Settings className="inline-block w-3 h-3 mr-2" />
										Settings
									</a>
									<div className="my-1 border-t border-neutral-100"></div>
									<a href="#" className={dropdownItemStyles} role="menuitem">
										<LogOut className="inline-block w-3 h-3 mr-2" />
										Log out
									</a>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
					<Separator orientation="vertical" className="h-6 mx-2 bg-[#2a2a2a] dark:bg-[#2a2a2a]" />
					<div className="items-center hidden gap-2 md:flex">
						<NavLinks />
					</div>
				</div>

				{/* Right side of the nav */}
				<div className="flex items-center gap-2">
					<div className="items-center hidden gap-2 md:flex">
						<Button variant="ghost" size="tiny" className="flex items-center justify-center px-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-gray-700 hover:text-white" onClick={handleSearchButtonClick}>
							<Search className="w-4 h-4 text-neutral-300" />
						</Button>
						<Button variant="ghost" size="tiny" className="flex items-center justify-center px-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-gray-700 hover:text-white">
							<Coffee className="w-4 h-4 text-neutral-300" />
						</Button>
						<Button variant="ghost" size="tiny" className="flex items-center justify-center px-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-gray-700 hover:text-white">
							<Sparkles className="w-4 h-4 text-neutral-300" />
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="tiny" className="relative flex items-center justify-center px-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-gray-700 hover:text-white">
									<Bell className="w-4 h-4 text-neutral-300" />
									<span className="absolute flex w-2 h-2 top-1 right-1">
										<span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
										<span className="relative inline-flex w-2 h-2 rounded-full bg-sky-500"></span>
									</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-64 z-[1002]">
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium">Notifications</p>
										<p className="text-xs text-muted-foreground">You have 3 unread messages</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="rounded-md">
									<div className="flex flex-col space-y-1">
										<p className="text-xs">New comment on &quot;Getting Started&quot;</p>
										<p className="text-xs text-muted-foreground">2 minutes ago</p>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem className="rounded-md">
									<div className="flex flex-col space-y-1">
										<p className="text-xs">Page &quot;About Us&quot; was updated</p>
										<p className="text-xs text-muted-foreground">1 hour ago</p>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem className="rounded-md">
									<div className="flex flex-col space-y-1">
										<p className="text-xs">Media library sync completed</p>
										<p className="text-xs text-muted-foreground">3 hours ago</p>
									</div>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-xs rounded-md text-muted-foreground">View all notifications</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button variant="ghost" size="tiny" className="flex items-center justify-center px-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-gray-700 hover:text-white" onClick={() => setFeedbackDialogOpen(true)}>
							<Inbox className="w-4 h-4 text-neutral-300" />
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="tiny" className="flex items-center justify-center px-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-gray-700 hover:text-white">
									<HelpCircle className="w-4 h-4 text-neutral-300" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className={dropdownStyles} align="end">
								<a href="#" className={dropdownItemStyles} role="menuitem">
									<HelpCircle className="inline-block w-3 h-3 mr-2" />
									Support
								</a>
								<a href="#" className={dropdownItemStyles} role="menuitem">
									<FileText className="inline-block w-3 h-3 mr-2" />
									Documentation
								</a>
								<a href="#" className={dropdownItemStyles} role="menuitem">
									<Clock className="inline-block w-3 h-3 mr-2" />
									Changelogs
								</a>
								<a href="#" className={dropdownItemStyles} role="menuitem">
									<Rss className="inline-block w-3 h-3 mr-2" />
									Blog
								</a>
								<a href="#" className={dropdownItemStyles} role="menuitem" onClick={toggleKeyboardHelp}>
									<Keyboard className="inline-block w-3 h-3 mr-2" />
									Keyboard Shortcuts
								</a>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					{pathname === "/design" && (
						<div className="relative">
							<ButtonGroup>
								<Button size="tiny" variant="grouped" groupPosition="left" className="text-white bg-blue-500 border-r-2 border-blue-600 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-700 border-r-blue-700 dark:border-r-blue-800">
									Publish
								</Button>
								<Button size="tiny" variant="grouped" groupPosition="right" className="px-2 text-white bg-blue-500 border-blue-600 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:border-blue-700" onClick={() => setPublishDropdownOpen(!publishDropdownOpen)}>
									<ChevronDown className="w-4 h-4" />
								</Button>
							</ButtonGroup>
							{publishDropdownOpen && (
								<div className={`${dropdownStyles} z-[1002]`}>
									<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
										<a href="#" className={dropdownItemStyles} role="menuitem">
											<Eye className="inline-block w-3 h-3 mr-2" />
											Preview
										</a>
										<a href="#" className={dropdownItemStyles} role="menuitem">
											<Smartphone className="inline-block w-3 h-3 mr-2" />
											Preview as mobile
										</a>
										<a href="#" className={dropdownItemStyles} role="menuitem">
											<Tablet className="inline-block w-3 h-3 mr-2" />
											Preview as tablet
										</a>
										<a href="#" className={dropdownItemStyles} role="menuitem">
											<Monitor className="inline-block w-3 h-3 mr-2" />
											Preview as desktop
										</a>
										<div className="border-t border-neutral-100"></div>
										<a href="#" className={dropdownItemStyles} role="menuitem">
											<Share className="inline-block w-3 h-3 mr-2" />
											Share
										</a>
									</div>
								</div>
							)}
						</div>
					)}
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="ghost" size="tiny" className="flex items-center justify-center px-2 text-xs md:hidden text-neutral-700 dark:text-neutral-300 hover:bg-gray-700 hover:text-white">
								<Menu className="w-4 h-4 text-neutral-300" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[280px] sm:w-[400px] z-[1005] bg-[#1a1a1a] border-l border-[#2a2a2a]">
							<SheetHeader>
								<SheetTitle className="text-lg font-semibold text-white">Menu</SheetTitle>
							</SheetHeader>
							<div className="flex flex-wrap justify-start gap-2 mb-4">
								<Button variant="ghost" size="tiny" onClick={handleSearchButtonClick} className="text-gray-400 hover:text-white hover:bg-gray-700">
									<Search className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="tiny" className="text-gray-400 hover:text-white hover:bg-gray-700">
									<Coffee className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="tiny" className="text-gray-400 hover:text-white hover:bg-gray-700">
									<Sparkles className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="tiny" className="text-gray-400 hover:text-white hover:bg-gray-700">
									<Bell className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="tiny" onClick={() => setFeedbackDialogOpen(true)} className="text-gray-400 hover:text-white hover:bg-gray-700">
									<Inbox className="w-4 h-4" />
								</Button>
								<Button variant="ghost" size="tiny" className="text-gray-400 hover:text-white hover:bg-gray-700">
									<HelpCircle className="w-4 h-4" />
								</Button>
							</div>
							<nav className="flex flex-col space-y-2">
								<NavLinks />
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
			{/* Render FeedbackDialog outside of the fixed top nav */}
			<FeedbackDialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen} />
			{contextMenuVisible && (
				<div
					ref={contextMenuRef}
					className="fixed z-50 w-64 bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10"
					style={{
						top: `${contextMenuPosition.y}px`,
						left: `${contextMenuPosition.x}px`,
					}}
				>
					<div className="py-1" role="menu" aria-orientation="vertical">
						<a href="#" className={dropdownItemStyles} role="menuitem" onClick={() => handleContextMenuAction("copy")}>
							<Copy className="inline-block w-4 h-4 mr-2" />
							<span>Copy</span>
						</a>
						<a href="#" className={dropdownItemStyles} role="menuitem" onClick={() => handleContextMenuAction("paste")}>
							<Paste className="inline-block w-4 h-4 mr-2" />
							<span>Paste</span>
						</a>
						<a href="#" className={dropdownItemStyles} role="menuitem" onClick={() => handleContextMenuAction("edit")}>
							<Edit className="inline-block w-4 h-4 mr-2" />
							<span>Edit</span>
						</a>
						<a href="#" className={dropdownItemStyles} role="menuitem" onClick={() => handleContextMenuAction("delete")}>
							<Trash className="inline-block w-4 h-4 mr-2" />
							<span>Delete</span>
						</a>
					</div>
				</div>
			)}
			{searchWindowOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1003]" onClick={() => setSearchWindowOpen(false)}>
					<div className="max-h-[80vh] w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
						<Command className="w-full overflow-hidden bg-white border rounded-lg shadow-md dark:bg-gray-800">
							<CommandInput placeholder="Type a command or search..." />
							<div className="absolute top-2 right-2">
								<Button variant="ghost" size="sm" className="w-6 h-6 p-0" onClick={() => setSearchWindowOpen(false)}>
									<X className="w-4 h-4" />
								</Button>
							</div>
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup heading="Suggestions">
									<CommandItem>
										<Calendar className="w-4 h-4 mr-2" />
										<span>Calendar</span>
									</CommandItem>
									<CommandItem>
										<Smile className="w-4 h-4 mr-2" />
										<span>Search Emoji</span>
									</CommandItem>
									<CommandItem disabled>
										<Calculator className="w-4 h-4 mr-2" />
										<span>Calculator</span>
									</CommandItem>
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup heading="Settings">
									<CommandItem>
										<User className="w-4 h-4 mr-2" />
										<span>Profile</span>
										<CommandShortcut>⌘P</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<CreditCard className="w-4 h-4 mr-2" />
										<span>Billing</span>
										<CommandShortcut>⌘B</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<Settings className="w-4 h-4 mr-2" />
										<span>Settings</span>
										<CommandShortcut>⌘S</CommandShortcut>
									</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
					</div>
				</div>
			)}
		</div>
	);
}

export default TopNav;
