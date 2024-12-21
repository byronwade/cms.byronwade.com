"use client";

import { ChevronRight, LayoutDashboard, FileText, Image as ImageIcon, Settings, Bot, BookOpen, Plus, ArrowLeft, Text, Heading, List, Table, FileImage, ArrowRight, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useEffect, useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";

// Define different sidebar contents
const contentBlocks = [
	{ title: "Heading", icon: Heading, type: "heading" },
	{ title: "Paragraph", icon: Text, type: "paragraph" },
	{ title: "Rich Text", icon: Text, type: "rich-text" },
	{ title: "List", icon: List, type: "list" },
	{ title: "Table", icon: Table, type: "table" },
	{ title: "Image", icon: FileImage, type: "image" },
];

const mainNavItems = [
	{
		title: "Home",
		icon: House,
		href: "/cms",
		hasSubmenu: false,
	},
	{
		title: "Dashboard",
		icon: LayoutDashboard,
		href: "/cms/dashboard",
		hasSubmenu: true,
		items: [
			{ title: "Overview", href: "/cms/dashboard" },
			{ title: "Analytics", href: "/cms/dashboard/analytics" },
			{ title: "Reports", href: "/cms/dashboard/reports" },
		],
	},
	{
		title: "Content",
		icon: FileText,
		href: "/cms/content",
		hasSubmenu: true,
		items: [
			{ title: "Pages", href: "/cms/content/pages" },
			{ title: "Posts", href: "/cms/content/posts" },
			{ title: "Categories", href: "/cms/content/categories" },
			{ title: "Add Content Type", href: "/cms/content/types/new", icon: Plus },
		],
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
		href: "/cms/integrations",
		hasSubmenu: false,
	},
	{
		title: "Documentation",
		icon: BookOpen,
		href: "/cms/docs",
		hasSubmenu: false,
	},
];

const teams = [
	{
		name: "Main Website",
		logo: FileText,
		plan: "Pro",
	},
	{
		name: "Blog Site",
		logo: FileText,
		plan: "Free",
	},
	{
		name: "Store",
		logo: FileText,
		plan: "Enterprise",
	},
];

interface SidebarState {
	sidebarContent: "navigation" | "blocks" | "media";
	contextTitle: string | null;
	contextType: string | null;
}

interface ContentContext {
	sidebarContent: SidebarState["sidebarContent"];
	contextTitle: string | null;
	contextType: string | null;
}

export function AppSidebar() {
	const pathname = usePathname();
	const [showNavigation, setShowNavigation] = useState(true);

	// Helper function to get context from path
	const getContextFromPath = useCallback((path: string, isNavigationView: boolean): ContentContext => {
		// Media context
		if (path.includes("/media")) {
			return {
				sidebarContent: isNavigationView ? "navigation" : "media",
				contextTitle: "Media Library",
				contextType: "media",
			};
		}

		// Content contexts
		if (path.includes("/content/")) {
			// Extract the content type from the path
			const matches = path.match(/\/content\/([^/]+)/);
			const contentType = matches?.[1];
			if (contentType) {
				// Remove trailing 's' and capitalize
				const displayType = contentType.replace(/s$/, "").charAt(0).toUpperCase() + contentType.slice(1).replace(/s$/, "");

				return {
					sidebarContent: isNavigationView ? "navigation" : "blocks",
					contextTitle: "Content Blocks",
					contextType: displayType.toLowerCase(),
				};
			}
		}

		// Default navigation
		return {
			sidebarContent: "navigation",
			contextTitle: null,
			contextType: null,
		};
	}, []);

	// Determine which content to show based on the current route
	const context = useMemo<ContentContext>(() => {
		return getContextFromPath(pathname, showNavigation);
	}, [pathname, showNavigation, getContextFromPath]);

	const { sidebarContent, contextType } = context;

	// Effect to update showNavigation based on route changes
	useEffect(() => {
		const shouldShowContextView = pathname.includes("/content/") || pathname.includes("/media");
		if (shouldShowContextView) {
			setShowNavigation(false);
		} else {
			setShowNavigation(true);
		}
	}, [pathname]);

	// Function to toggle between navigation and context views
	const toggleView = () => {
		setShowNavigation(!showNavigation);
	};

	// Helper to determine if we should show the context toggle
	const shouldShowContextToggle = pathname.includes("/content/") || pathname.includes("/media");

	return (
		<Sidebar className="fixed left-0 top-9 bottom-0 z-40" collapsible="icon">
			<SidebarHeader>
				<TeamSwitcher teams={teams} />
			</SidebarHeader>
			<SidebarContent>
				<div className="px-2 flex">
					{sidebarContent !== "navigation" ? (
						<Button variant="ghost" size="tiny" className="flex-1 justify-start gap-2" onClick={toggleView}>
							<ArrowLeft className="h-4 w-4" />
							<span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">Back to Navigation</span>
						</Button>
					) : shouldShowContextToggle ? (
						<Button variant="ghost" size="tiny" className="flex-1 justify-end gap-2 ml-auto" onClick={toggleView}>
							<span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">Back to {contextType?.charAt(0).toUpperCase() + contextType?.slice(1)} View</span>
							<ArrowRight className="h-4 w-4" />
						</Button>
					) : null}
				</div>

				{sidebarContent === "navigation" && (
					<>
						<SidebarGroup>
							<SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
							<SidebarMenu>
								{mainNavItems.map((item) => {
									if (!item.hasSubmenu) {
										return (
											<SidebarMenuItem key={item.title}>
												<Link href={item.href} passHref legacyBehavior>
													<SidebarMenuButton tooltip={item.title} data-active={pathname === item.href}>
														<item.icon className="h-4 w-4" />
														<span>{item.title}</span>
													</SidebarMenuButton>
												</Link>
											</SidebarMenuItem>
										);
									}

									const isActive = pathname.startsWith(item.href);
									const shouldExpand = isActive;

									return (
										<Collapsible key={item.title} asChild defaultOpen={shouldExpand} className="group/collapsible">
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton tooltip={item.title} data-active={isActive}>
														<item.icon className="h-4 w-4" />
														<span>{item.title}</span>
														<ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
													</SidebarMenuButton>
												</CollapsibleTrigger>
												<CollapsibleContent>
													<SidebarMenuSub>
														{item.items?.map((subItem) => (
															<SidebarMenuSubItem key={subItem.title}>
																<Link href={subItem.href} passHref legacyBehavior>
																	<SidebarMenuSubButton data-active={pathname === subItem.href}>
																		{subItem.icon && <subItem.icon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />}
																		<span>{subItem.title}</span>
																	</SidebarMenuSubButton>
																</Link>
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
									<SidebarMenuItem key={item.title}>
										<Link href={item.href} passHref legacyBehavior>
											<SidebarMenuButton tooltip={item.title} data-active={pathname === item.href}>
												<item.icon className="h-4 w-4" />
												<span>{item.title}</span>
											</SidebarMenuButton>
										</Link>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroup>
					</>
				)}

				{sidebarContent === "blocks" && (
					<SidebarGroup>
						<SidebarGroupLabel>Content Blocks</SidebarGroupLabel>
						<SidebarMenu>
							{contentBlocks.map((block) => (
								<SidebarMenuItem key={block.title}>
									<SidebarMenuButton tooltip={block.title} onClick={() => console.log(`Add ${block.type} block`)}>
										<block.icon className="h-4 w-4" />
										<span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">{block.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				)}

				{sidebarContent === "media" && (
					<SidebarGroup>
						<SidebarGroupLabel>Media Library</SidebarGroupLabel>
						<div className="p-4 group-has-[[data-collapsible=icon]]/sidebar-wrapper:p-2">
							<Button variant="outline" size="tiny" className="w-full justify-center gap-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-8 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-8 group-has-[[data-collapsible=icon]]/sidebar-wrapper:min-w-8 group-has-[[data-collapsible=icon]]/sidebar-wrapper:p-0" tooltip="Upload Media">
								<Plus className="h-4 w-4 shrink-0" />
								<span className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">Upload Media</span>
							</Button>
						</div>
						<div className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">{/* Add media filters and organization options here */}</div>
					</SidebarGroup>
				)}
			</SidebarContent>

			{sidebarContent === "navigation" && (
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<Link href="/cms/settings" passHref legacyBehavior>
								<SidebarMenuButton data-active={pathname === "/cms/settings"}>
									<Settings className="h-4 w-4" />
									<span>Settings</span>
								</SidebarMenuButton>
							</Link>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			)}
			<SidebarRail />
		</Sidebar>
	);
}
