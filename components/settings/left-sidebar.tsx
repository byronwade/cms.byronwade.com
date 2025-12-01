"use client";

import {
	Bell,
	Database,
	Globe,
	Lock,
	Settings,
	Shield,
	User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SettingsLeftSidebar() {
	const pathname = usePathname();

	const links = [
		{
			href: "/cms/settings/general",
			label: "General",
			icon: Settings,
		},
		{
			href: "/cms/settings/profile",
			label: "Profile",
			icon: User,
		},
		{
			href: "/cms/settings/security",
			label: "Security",
			icon: Lock,
		},
		{
			href: "/cms/settings/notifications",
			label: "Notifications",
			icon: Bell,
		},
		{
			href: "/cms/settings/domains",
			label: "Domains",
			icon: Globe,
		},
		{
			href: "/cms/settings/database",
			label: "Database",
			icon: Database,
		},
		{
			href: "/cms/settings/permissions",
			label: "Permissions",
			icon: Shield,
		},
	];

	return (
		<div className="w-64 border-r border-border bg-background overflow-y-auto">
			<nav className="p-4 gap-1 flex flex-col">
				{links.map((link) => {
					const Icon = link.icon;
					const isActive = pathname === link.href;

					return (
						<Link
							key={link.href}
							href={link.href}
							className={cn(
								"flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
								isActive
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-muted",
							)}
						>
							<Icon className="w-4 h-4" />
							{link.label}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
