"use client";

import {
	Bell,
	Brush,
	Cloud,
	Database,
	Globe,
	Laptop,
	Lock,
	Shield,
	User,
} from "lucide-react";
import {
	CommonSidebar,
	SidebarItem,
	SidebarSection,
} from "@/components/common/sidebar";

interface SettingsSidebarProps {
	isOpen: boolean;
}

export function SettingsSidebar({ isOpen }: SettingsSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="left">
			<SidebarSection title="User">
				<SidebarItem icon={<User className="h-4 w-4" />} isActive>
					Profile
				</SidebarItem>
				<SidebarItem icon={<Shield className="h-4 w-4" />}>
					Permissions
				</SidebarItem>
				<SidebarItem icon={<Bell className="h-4 w-4" />}>
					Notifications
				</SidebarItem>
			</SidebarSection>

			<SidebarSection title="System">
				<SidebarItem icon={<Globe className="h-4 w-4" />}>
					Site Settings
				</SidebarItem>
				<SidebarItem icon={<Lock className="h-4 w-4" />}>Security</SidebarItem>
				<SidebarItem icon={<Database className="h-4 w-4" />}>
					Database
				</SidebarItem>
			</SidebarSection>

			<SidebarSection title="Preferences">
				<SidebarItem icon={<Brush className="h-4 w-4" />}>
					Appearance
				</SidebarItem>
				<SidebarItem icon={<Laptop className="h-4 w-4" />}>System</SidebarItem>
				<SidebarItem icon={<Cloud className="h-4 w-4" />}>Backups</SidebarItem>
			</SidebarSection>
		</CommonSidebar>
	);
}
