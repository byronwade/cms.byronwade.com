"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BuildRightSidebarProps {
	isOpen: boolean;
	children?: React.ReactNode;
}

export function BuildRightSidebar({ isOpen, children }: BuildRightSidebarProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.3 }} className="fixed top-10 bottom-0 right-0 w-[var(--sidebar-width)] bg-[#1a1a1a] border-l border-[#2a2a2a]">
					<ScrollArea className="h-[calc(100vh-40px)]">
						<div className="p-4">{children}</div>
					</ScrollArea>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
