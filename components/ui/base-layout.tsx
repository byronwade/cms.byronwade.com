"use client";

import React, { useState, useEffect } from "react";

// Define base props that all components will receive
interface BaseComponentProps {
	isOpen: boolean;
}

interface BaseHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
}

interface BaseFooterProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

interface BaseLayoutProps {
	children: React.ReactNode;
	Sidebar: React.ComponentType<BaseComponentProps>;
	RightSidebar: React.ComponentType<BaseComponentProps & { children?: React.ReactNode }>;
	Header: React.ComponentType<BaseHeaderProps & Record<string, unknown>>;
	Footer: React.ComponentType<BaseFooterProps & Record<string, unknown>>;
	defaultLeftSidebarOpen?: boolean;
	defaultRightSidebarOpen?: boolean;
	additionalProps?: Record<string, unknown>;
}

export function BaseLayout({ children, Sidebar, RightSidebar, Header, Footer, defaultLeftSidebarOpen = true, defaultRightSidebarOpen = false, additionalProps = {} }: BaseLayoutProps) {
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(defaultLeftSidebarOpen);
	const [rightSidebarOpen, setRightSidebarOpen] = useState(defaultRightSidebarOpen);

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
		<div className="relative h-screen flex flex-col">
			{/* Main Content Area */}
			<div className="flex-1 relative">
				{/* Sidebars - Fixed position */}
				<div className="fixed top-[var(--header-height)] left-0 bottom-0 z-[49]">
					<Sidebar isOpen={leftSidebarOpen} />
				</div>
				<div className="fixed top-[var(--header-height)] right-0 bottom-0 z-[49]">
					<RightSidebar isOpen={rightSidebarOpen} />
				</div>

				{/* Content Area */}
				<div
					className="fixed transition-all duration-300 ease-in-out flex flex-col"
					style={{
						top: "var(--header-height)",
						left: leftSidebarOpen ? "var(--sidebar-width)" : "0",
						right: rightSidebarOpen ? "var(--sidebar-width)" : "0",
						bottom: 0,
					}}
				>
					{/* Section Header */}
					<Header leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} onToggleLeftSidebar={toggleLeftSidebar} onToggleRightSidebar={toggleRightSidebar} {...additionalProps} />

					{/* Main Content */}
					<div className="flex-1 overflow-auto bg-[#1a1a1a]">{children}</div>

					{/* Section Footer */}
					<Footer leftSidebarOpen={leftSidebarOpen} rightSidebarOpen={rightSidebarOpen} {...additionalProps} />
				</div>
			</div>
		</div>
	);
}
