"use client";

import { BarChart3, LineChart, PieChart, Users, Activity, MousePointerClick, Timer, Settings } from "lucide-react";
import { CommonSidebar, SidebarSection, SidebarItem } from "@/components/common/sidebar";
import { useRouter, usePathname } from "next/navigation";

interface AnalyticsSidebarProps {
	isOpen: boolean;
}

export function AnalyticsSidebar({ isOpen }: AnalyticsSidebarProps) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<CommonSidebar isOpen={isOpen} side="left">
			<SidebarSection title="Overview">
				<SidebarItem icon={<LineChart className="h-4 w-4" />} onClick={() => router.push("/cms/analytics")} isActive={pathname === "/cms/analytics"}>
					Dashboard
				</SidebarItem>
				<SidebarItem icon={<Timer className="h-4 w-4" />} onClick={() => router.push("/cms/analytics/real-time")} isActive={pathname === "/cms/analytics/real-time"}>
					Real-time
				</SidebarItem>
			</SidebarSection>

			<SidebarSection title="Metrics">
				<SidebarItem icon={<BarChart3 className="h-4 w-4" />} onClick={() => router.push("/cms/analytics/traffic")} isActive={pathname === "/cms/analytics/traffic"}>
					Traffic
				</SidebarItem>
				<SidebarItem icon={<PieChart className="h-4 w-4" />} onClick={() => router.push("/cms/analytics/engagement")} isActive={pathname === "/cms/analytics/engagement"}>
					Engagement
				</SidebarItem>
				<SidebarItem icon={<Users className="h-4 w-4" />} onClick={() => router.push("/cms/analytics/audience")} isActive={pathname === "/cms/analytics/audience"}>
					Audience
				</SidebarItem>
			</SidebarSection>

			<SidebarSection title="Analysis">
				<SidebarItem icon={<Activity className="h-4 w-4" />} onClick={() => router.push("/cms/analytics/performance")} isActive={pathname === "/cms/analytics/performance"}>
					Performance
				</SidebarItem>
				<SidebarItem icon={<MousePointerClick className="h-4 w-4" />} onClick={() => router.push("/cms/analytics/behavior")} isActive={pathname === "/cms/analytics/behavior"}>
					Behavior
				</SidebarItem>
				<SidebarItem icon={<Settings className="h-4 w-4" />}>Settings</SidebarItem>
			</SidebarSection>
		</CommonSidebar>
	);
}
