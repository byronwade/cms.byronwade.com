"use client";

interface SettingsFooterProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function SettingsFooter({
	leftSidebarOpen: _leftSidebarOpen,
	rightSidebarOpen: _rightSidebarOpen,
}: SettingsFooterProps) {
	return (
		<footer className="h-[var(--footer-height)] border-t border-[#1f1f1f] bg-[#0a0a0a] flex items-center justify-between px-4">
			{/* Add footer content here */}
		</footer>
	);
}
