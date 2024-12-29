"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings, User, Lock, Bell, Globe, Database, Shield } from "lucide-react";

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
		<div className="w-64 border-r border-[#2a2a2a] bg-[#0a0a0a] overflow-y-auto">
			<nav className="p-4 space-y-1">
				{links.map((link) => {
					const Icon = link.icon;
					const isActive = pathname === link.href;

					return (
						<Link key={link.href} href={link.href} className={cn("flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors", isActive ? "bg-[#2a2a2a] text-white" : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]")}>
							<Icon className="w-4 h-4" />
							{link.label}
						</Link>
					);
				})}
			</nav>
		</div>
	);
}
