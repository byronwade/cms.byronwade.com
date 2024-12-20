"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Command, LogOut, Search, Settings, Sparkles, User, Coffee, Plus, Bell, ExternalLink, FileText, Image, Layout, FileCode } from "lucide-react";
import { useState } from "react";

export default function CMSLayout({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col min-h-screen overflow-y-auto">
			{/* Thin WordPress-style header */}
			<header className="h-9 bg-black text-white flex items-center justify-between text-xs z-50 fixed top-0 left-0 right-0">
				<div className="flex items-center">
					<a href="/cms" className="flex items-center h-9 px-3 hover:bg-white/15 transition-colors border-r border-white/10">
						<span className="font-medium">CMS</span>
					</a>
					<div className="flex items-center border-r border-white/10 h-full">
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<button className="flex items-center h-9 px-3 hover:bg-white/15 transition-colors gap-1.5">
									<Plus className="h-3.5 w-3.5" />
									<span>New</span>
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48" sideOffset={8}>
								<DropdownMenuItem>
									<Layout className="mr-2 h-4 w-4" />
									<span>Page</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<FileText className="mr-2 h-4 w-4" />
									<span>Post</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Image className="mr-2 h-4 w-4" />
									<span>Media</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<FileCode className="mr-2 h-4 w-4" />
									<span>Custom Type</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex items-center h-full">
						<a href="/" className="flex items-center h-9 px-3 hover:bg-white/15 transition-colors gap-1.5">
							<ExternalLink className="h-3.5 w-3.5" />
							<span>View Site</span>
						</a>
					</div>
					<button onClick={() => setOpen(true)} className="flex items-center h-9 px-3 hover:bg-neutral-600 transition-colors border-l border-white/10 text-white/70 gap-2 min-w-[280px] bg-neutral-700">
						<Search className="h-3.5 w-3.5" />
						<span>Search...</span>
						<div className="flex items-center gap-0.5 text-white/40 ml-auto">
							<Command className="h-3 w-3" />
							<span className="text-[10px]">K</span>
						</div>
					</button>
				</div>
				<div className="flex items-center h-full">
					<a href="#" className="flex items-center h-9 px-3 hover:bg-yellow-500/20 transition-colors border-l border-white/10">
						<Coffee className="h-3.5 w-3.5 mr-1.5" />
						<span>Buy me a coffee</span>
					</a>
					<button className="flex items-center h-9 px-3 hover:bg-purple-500/20 transition-colors text-purple-300 border-l border-white/10">
						<Sparkles className="h-3.5 w-3.5 mr-1.5" />
						<span>AI Assistant</span>
					</button>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<button className="flex items-center h-9 w-9 justify-center hover:bg-white/15 transition-colors border-l border-white/10 relative">
								<Bell className="h-3.5 w-3.5" />
								<span className="absolute top-1.5 right-1.5 flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
								</span>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-80" sideOffset={8}>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium">Notifications</p>
									<p className="text-xs text-muted-foreground">You have 3 unread messages</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<div className="flex flex-col space-y-1">
									<p className="text-sm">New comment on "Getting Started"</p>
									<p className="text-xs text-muted-foreground">2 minutes ago</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className="flex flex-col space-y-1">
									<p className="text-sm">Page "About Us" was updated</p>
									<p className="text-xs text-muted-foreground">1 hour ago</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className="flex flex-col space-y-1">
									<p className="text-sm">Media library sync completed</p>
									<p className="text-xs text-muted-foreground">3 hours ago</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-xs text-muted-foreground">View all notifications</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<button className="flex items-center h-9 px-3 hover:bg-white/15 transition-colors border-l border-white/10">
								<Avatar className="h-5 w-5">
									<AvatarImage src="/avatars/01.png" alt="@username" />
									<AvatarFallback className="text-[10px]">JD</AvatarFallback>
								</Avatar>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" sideOffset={8}>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium">John Doe</p>
									<p className="text-xs text-muted-foreground">john@example.com</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<User className="mr-2 h-4 w-4" />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									<span>Settings</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			{/* Main content with sidebar */}
			<div className="flex pt-9 flex-1">
				<SidebarProvider defaultOpen>
					<AppSidebar />
					<SidebarInset>
						<div className="flex flex-1 flex-col relative">
							<div className="absolute inset-0 overflow-auto">{children}</div>
						</div>
					</SidebarInset>
				</SidebarProvider>
			</div>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<div className="sr-only">Search Commands</div>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emoji</CommandItem>
						<CommandItem>Calculator</CommandItem>
					</CommandGroup>
					<CommandGroup heading="Settings">
						<CommandItem>Profile</CommandItem>
						<CommandItem>Billing</CommandItem>
						<CommandItem>Settings</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}
