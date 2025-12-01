"use client";

import { Settings } from "lucide-react";
import {
	CommonSidebar,
	SidebarItem,
	SidebarSection,
} from "@/components/common/sidebar";

interface MediaRightSidebarProps {
	isOpen: boolean;
}

function MediaRightSidebar({ isOpen }: MediaRightSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="right">
			<SidebarSection title="Media Properties">
				<SidebarItem icon={<Settings className="h-4 w-4" />}>
					Settings
				</SidebarItem>
			</SidebarSection>
			<div className="px-4">
				<p className="text-xs text-gray-400">
					Select a media item to view and edit its properties
				</p>
			</div>
		</CommonSidebar>
	);
}

export { MediaRightSidebar };
