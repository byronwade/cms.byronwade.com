import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
	disabled?: boolean;
	"aria-label"?: string;
}

export function SidebarSection({
	title,
	children,
	titleExtra,
}: SidebarSectionProps) {
	return (
		<div className="mb-6 last:mb-0">
			<div className="flex items-center justify-between mb-3">
				<h3 className="text-xs font-medium text-text-quaternary uppercase tracking-wider">
					{title}
				</h3>
				{titleExtra}
			</div>
			<nav className="gap-1 flex flex-col" aria-label={title}>
				{children}
			</nav>
		</div>
	);
}

export function SidebarItem({
	icon,
	children,
	onClick,
	isActive = false,
	disabled = false,
	"aria-label": ariaLabel,
}: SidebarItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			aria-label={
				ariaLabel || (typeof children === "string" ? children : undefined)
			}
			aria-current={isActive ? "page" : undefined}
			className={cn(
				"w-full flex items-center gap-2 py-1.5 px-2 text-sm rounded-md transition-all duration-200",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
				"disabled:opacity-50 disabled:pointer-events-none",
				isActive
					? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
					: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			)}
		>
			{icon && (
				<span className="flex-shrink-0" aria-hidden="true">
					{icon}
				</span>
			)}
			<span className="truncate">{children}</span>
		</button>
	);
}

interface CommonSidebarProps {
	children: ReactNode;
	isOpen: boolean;
	side?: "left" | "right";
	"aria-label"?: string;
}

export function CommonSidebar({
	children,
	isOpen,
	side = "left",
	"aria-label": ariaLabel,
}: CommonSidebarProps) {
	return (
		<aside
			aria-label={ariaLabel || `${side} sidebar`}
			aria-hidden={!isOpen}
			className={cn(
				"fixed top-[2.5rem] bottom-0 w-[var(--sidebar-width)]",
				"bg-sidebar-background text-sidebar-foreground",
				"border-sidebar-border shadow-xl",
				"transition-transform duration-300 ease-in-out z-[var(--z-sidebar)]",
				side === "left" ? "left-0 border-r" : "right-0 border-l",
				!isOpen && (side === "left" ? "-translate-x-full" : "translate-x-full"),
			)}
		>
			<ScrollArea className="h-full">
				<nav className="p-4 w-[var(--sidebar-width)] box-border">
					{children}
				</nav>
			</ScrollArea>
		</aside>
	);
}
