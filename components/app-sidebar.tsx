"use client";

import { ChevronRight, LayoutDashboard, FileText, Image as ImageIcon, Settings, Bot, BookOpen, Frame, Map, ChevronsUpDown, GalleryVerticalEnd, AudioWaveform, Command } from "lucide-react";
import { useState } from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";

const teams = [
	{
		name: "Main Website",
		logo: GalleryVerticalEnd,
		plan: "Pro",
	},
	{
		name: "Blog Site",
		logo: AudioWaveform,
		plan: "Free",
	},
	{
		name: "Store",
		logo: Command,
		plan: "Enterprise",
	},
];

const mainNavItems = [
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		hasSubmenu: true,
		items: [{ title: "Overview" }, { title: "Analytics" }, { title: "Reports" }],
	},
	{
		title: "Content",
		icon: FileText,
		hasSubmenu: true,
		items: [{ title: "Pages" }, { title: "Posts" }, { title: "Categories" }],
	},
	{
		title: "Media",
		icon: ImageIcon,
		href: "/cms/media",
		hasSubmenu: false,
	},
];

const toolsNavItems = [
	{
		title: "Integrations",
		icon: Bot,
		items: [{ title: "Connected Apps" }, { title: "Available Apps" }],
	},
	{
		title: "Documentation",
		icon: BookOpen,
		items: [{ title: "Guides" }, { title: "API Reference" }],
	},
];

const projectsItems = [
	{
		name: "Website",
		icon: Frame,
	},
	{
		name: "Blog",
		icon: Map,
	},
];

export function AppSidebar() {
	const [activeTeam, setActiveTeam] = useState(teams[0]);

	return (
		<Sidebar className="fixed left-0 top-9 bottom-0 z-40" collapsible="icon">
			<SidebarHeader>
				<SidebarMenu className="py-2">
					<SidebarMenuItem>
						<DropdownMenu modal={false}>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
									<div className="flex aspect-square size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
										<activeTeam.logo className="size-4" />
									</div>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">{activeTeam.name}</span>
										<span className="truncate text-xs">{activeTeam.plan}</span>
									</div>
									<ChevronsUpDown className="ml-auto h-4 w-4" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="right" sideOffset={4}>
								<DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
								{teams.map((team, index) => (
									<DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
										<div className="flex size-6 items-center justify-center rounded-md border">
											<team.logo className="size-4 shrink-0" />
										</div>
										{team.name}
										<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
					<SidebarMenu>
						{mainNavItems.map((item) => {
							if (!item.hasSubmenu) {
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton tooltip={item.title} onClick={() => (window.location.href = item.href)}>
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							}

							return (
								<Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton tooltip={item.title}>
												<item.icon className="h-4 w-4" />
												<span>{item.title}</span>
												<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton>
															<span>{subItem.title}</span>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Tools</SidebarGroupLabel>
					<SidebarMenu>
						{toolsNavItems.map((item) => (
							<Collapsible key={item.title} asChild className="group/collapsible">
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton tooltip={item.title}>
											<item.icon className="h-4 w-4" />
											<span>{item.title}</span>
											<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{item.items?.map((subItem) => (
												<SidebarMenuSubItem key={subItem.title}>
													<SidebarMenuSubButton>
														<span>{subItem.title}</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						))}
					</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup className="group-data-[collapsible=icon]:hidden">
					<SidebarGroupLabel>Projects</SidebarGroupLabel>
					<SidebarMenu>
						{projectsItems.map((item) => (
							<SidebarMenuItem key={item.name}>
								<SidebarMenuButton>
									<item.icon className="h-4 w-4" />
									<span>{item.name}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<Settings className="h-4 w-4" />
							<span>Settings</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
