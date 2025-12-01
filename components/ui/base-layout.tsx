"use client";

import type React from "react";
import { useEffect, useState } from "react";
import type { LayoutConfig } from "@/lib/types/layout";

interface BaseLayoutProps {
	children: React.ReactNode;
	config: LayoutConfig;
}

export function BaseLayout({ children, config }: BaseLayoutProps) {
	const {
		header: Header,
		sidebar: Sidebar,
		rightSidebar: RightSidebar,
		footer: Footer,
		defaultLeftSidebarOpen = true,
		defaultRightSidebarOpen = false,
		additionalProps = {},
	} = config;
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(
		defaultLeftSidebarOpen,
	);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(
		defaultRightSidebarOpen,
	);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey) {
				if (event.key === "b") {
					event.preventDefault();
					setLeftSidebarOpen((prev) => !prev);
				} else if (event.key === "e") {
					event.preventDefault();
					setRightSidebarOpen((prev) => !prev);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const toggleLeftSidebar = () => setLeftSidebarOpen(!leftSidebarOpen);
	const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);

	return (
		<div 
			className="flex flex-col overflow-hidden" 
			style={{ 
				height: "calc(100vh - 2.5rem)",
				marginTop: "2.5rem",
				width: "100%"
			}}
		>
			{/* Main Container - Contains sidebars and main content area */}
			<div className="flex flex-1 min-h-0 transition-all duration-300 ease-in-out">
				{/* Left Sidebar - CommonSidebar handles its own positioning */}
				<Sidebar isOpen={leftSidebarOpen} />

				{/* Main Content Area - Shrinks when sidebars are open, contains toolbar, content and footer */}
				<div
					className="flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out overflow-hidden"
					style={{
						marginLeft: leftSidebarOpen ? "var(--sidebar-width)" : "0",
						marginRight: rightSidebarOpen ? "var(--sidebar-width)" : "0",
					}}
				>
					{/* Toolbar (Header) - Inside main content container */}
					<div className="shrink-0 w-full">
						<Header
							leftSidebarOpen={leftSidebarOpen}
							rightSidebarOpen={rightSidebarOpen}
							onToggleLeftSidebar={toggleLeftSidebar}
							onToggleRightSidebar={toggleRightSidebar}
							{...additionalProps}
						/>
					</div>

					{/* Main Content */}
					<main className="flex-1 overflow-auto bg-background min-h-0">
						{children}
					</main>

					{/* Footer - Inside main content container */}
					<div className="shrink-0 w-full">
						<Footer
							leftSidebarOpen={leftSidebarOpen}
							rightSidebarOpen={rightSidebarOpen}
							{...additionalProps}
						/>
					</div>
				</div>

				{/* Right Sidebar - CommonSidebar handles its own positioning */}
				<RightSidebar isOpen={rightSidebarOpen} />
			</div>
		</div>
	);
}
