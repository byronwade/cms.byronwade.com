import { Home, Lock, FileWarning, Plus, Users, ShoppingCart } from "lucide-react";
import { CommonSidebar, SidebarSection, SidebarItem } from "@/components/common/sidebar";

interface DesignSidebarProps {
	isOpen: boolean;
}

export function DesignSidebar({ isOpen }: DesignSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="left">
			<SidebarSection title="Pages">
				<SidebarItem icon={<Home className="h-4 w-4" />}>Home</SidebarItem>
				<SidebarItem icon={<Lock className="h-4 w-4" />}>Password</SidebarItem>
				<SidebarItem icon={<FileWarning className="h-4 w-4" />}>404</SidebarItem>
			</SidebarSection>
			<SidebarSection title="CMS Collection pages">
				<div className="px-4 py-2">
					<Plus className="h-8 w-8 text-gray-400 mx-auto" />
					<p className="text-xs text-gray-400 text-center mt-2">No CMS Collection pages</p>
				</div>
			</SidebarSection>
			<SidebarSection title="Ecommerce pages">
				<div className="px-4 py-2">
					<ShoppingCart className="h-8 w-8 text-gray-400 mx-auto" />
					<p className="text-xs text-gray-400 text-center mt-2">No Ecommerce pages</p>
				</div>
			</SidebarSection>
			<SidebarSection title="User pages">
				<div className="px-4 py-2">
					<Users className="h-8 w-8 text-gray-400 mx-auto" />
					<p className="text-xs text-gray-400 text-center mt-2">No User pages</p>
				</div>
			</SidebarSection>
		</CommonSidebar>
	);
}
