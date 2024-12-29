import { FileText, Clock, Globe, CalendarClock, Tag, Settings, Filter } from "lucide-react";
import { CommonSidebar, SidebarSection, SidebarItem } from "@/components/common/sidebar";

interface PublishSidebarProps {
	isOpen: boolean;
}

export function PublishSidebar({ isOpen }: PublishSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="left">
			<SidebarSection title="Content">
				<SidebarItem icon={<FileText className="h-4 w-4" />}>All Content</SidebarItem>
				<SidebarItem icon={<Clock className="h-4 w-4" />}>Drafts</SidebarItem>
				<SidebarItem icon={<Globe className="h-4 w-4" />}>Published</SidebarItem>
				<SidebarItem icon={<CalendarClock className="h-4 w-4" />}>Scheduled</SidebarItem>
			</SidebarSection>

			<SidebarSection title="Organize">
				<SidebarItem icon={<Tag className="h-4 w-4" />}>Categories</SidebarItem>
				<SidebarItem icon={<Tag className="h-4 w-4" />}>Tags</SidebarItem>
			</SidebarSection>

			<SidebarSection title="Tools">
				<SidebarItem icon={<Filter className="h-4 w-4" />}>Bulk Actions</SidebarItem>
				<SidebarItem icon={<Settings className="h-4 w-4" />}>Settings</SidebarItem>
			</SidebarSection>
		</CommonSidebar>
	);
}
