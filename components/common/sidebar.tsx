import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarSectionProps {
	title: string;
	children: ReactNode;
	titleExtra?: ReactNode;
}

interface SidebarItemProps {
	icon?: ReactNode;
	children: ReactNode;
	onClick?: () => void;
	isActive?: boolean;
}

export function SidebarSection({ title, children, titleExtra }: SidebarSectionProps) {
	return (
		<div className="mb-6 last:mb-0">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
				{titleExtra}
			</div>
			<div className="space-y-1">{children}</div>
		</div>
	);
}

export function SidebarItem({ icon, children, onClick, isActive = false }: SidebarItemProps) {
	return (
		<button onClick={onClick} className={cn("w-full flex items-center gap-2 py-1.5 text-sm text-gray-400 hover:text-white rounded-md transition-all duration-200", "hover:bg-[#2a2a2a]", isActive && "text-white bg-[#2a2a2a]")}>
			{icon}
			<span>{children}</span>
		</button>
	);
}

interface CommonSidebarProps {
	children: ReactNode;
	isOpen: boolean;
	side?: "left" | "right";
}

export function CommonSidebar({ children, isOpen, side = "left" }: CommonSidebarProps) {
	return (
		<aside className={cn("fixed top-[var(--header-height)] bottom-0 w-[var(--sidebar-width)] bg-[#1a1a1a] border-[#2a2a2a] shadow-xl", "transition-all duration-300 ease-in-out z-30", side === "left" ? "left-0 border-r" : "right-0 border-l", !isOpen && (side === "left" ? "-translate-x-full" : "translate-x-full"))}>
			<ScrollArea className="h-[calc(100vh-var(--header-height)-var(--footer-height))]">
				<div className="p-4 w-[var(--sidebar-width)] box-border">{children}</div>
			</ScrollArea>
		</aside>
	);
}
