import type { ComponentType, ReactNode } from "react";

// Base props that all layout components receive
export interface BaseComponentProps {
	isOpen: boolean;
}

export interface BaseHeaderProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	onToggleLeftSidebar: () => void;
	onToggleRightSidebar: () => void;
}

export interface BaseFooterProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

// Component types for layout configuration
export type SidebarComponent = ComponentType<BaseComponentProps>;
export type RightSidebarComponent = ComponentType<
	BaseComponentProps & { children?: ReactNode }
>;
export type HeaderComponent = ComponentType<
	BaseHeaderProps & Record<string, unknown>
>;
export type FooterComponent = ComponentType<
	BaseFooterProps & Record<string, unknown>
>;

// Layout configuration interface
export interface LayoutConfig {
	id: string;
	header: HeaderComponent;
	sidebar: SidebarComponent;
	rightSidebar: RightSidebarComponent;
	footer: FooterComponent;
	defaultLeftSidebarOpen?: boolean;
	defaultRightSidebarOpen?: boolean;
	additionalProps?: Record<string, unknown>;
}

// Helper type for layout component props
export type LayoutComponentProps = {
	children: ReactNode;
	config: LayoutConfig;
};
