"use client";

import { CommonSidebar } from "@/components/common/sidebar";

interface BuildRightSidebarProps {
	isOpen: boolean;
	children?: React.ReactNode;
}

export function BuildRightSidebar({
	isOpen,
	children,
}: BuildRightSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="right">
			{children}
		</CommonSidebar>
	);
}
