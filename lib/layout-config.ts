"use client";

import { AnalyticsFooter } from "@/components/analytics/footer";
import { AnalyticsHeader } from "@/components/analytics/header";
import { AnalyticsRightSidebar } from "@/components/analytics/right-sidebar";
import { AnalyticsSidebar } from "@/components/analytics/sidebar";
import { BuildFooter } from "@/components/build/footer";
// Import all layout components - using direct imports
import { BuildHeader } from "@/components/build/header";
import { BuildRightSidebar } from "@/components/build/right-sidebar";
import { BuildSidebar } from "@/components/build/sidebar";
import { ContentFooter } from "@/components/content/footer";
import { ContentHeader } from "@/components/content/header";
import { ContentRightSidebar } from "@/components/content/right-sidebar";
import { ContentSidebar } from "@/components/content/sidebar";
import { DesignFooter } from "@/components/design/footer";
import { DesignHeader } from "@/components/design/header";
import { RightSidebar as DesignRightSidebar } from "@/components/design/right-sidebar";
import { DesignSidebar } from "@/components/design/sidebar";
import { MediaFooter } from "@/components/media/footer";
import { MediaHeader } from "@/components/media/header";
import { MediaRightSidebar } from "@/components/media/right-sidebar";
import { MediaSidebar } from "@/components/media/sidebar";
import { PublishFooter } from "@/components/publish/footer";
import { PublishHeader } from "@/components/publish/header";
import { PublishRightSidebar } from "@/components/publish/right-sidebar";
import { PublishSidebar } from "@/components/publish/sidebar";
import { SettingsFooter } from "@/components/settings/footer";

import { SettingsHeader } from "@/components/settings/header";
import { SettingsRightSidebar } from "@/components/settings/right-sidebar";
import { SettingsSidebar } from "@/components/settings/sidebar";
import type { LayoutConfig } from "./types/layout";

// Layout configurations mapped to routes
export const layoutConfigs: Record<string, LayoutConfig> = {
	"/cms/build": {
		id: "build",
		header: BuildHeader,
		sidebar: BuildSidebar,
		rightSidebar: BuildRightSidebar,
		footer: BuildFooter,
		defaultLeftSidebarOpen: true,
		defaultRightSidebarOpen: false,
	},
	"/cms/content": {
		id: "content",
		header: ContentHeader,
		sidebar: ContentSidebar,
		rightSidebar: ContentRightSidebar,
		footer: ContentFooter,
		defaultLeftSidebarOpen: true,
		defaultRightSidebarOpen: false,
	},
	"/cms/design": {
		id: "design",
		header: DesignHeader,
		sidebar: DesignSidebar,
		rightSidebar: DesignRightSidebar,
		footer: DesignFooter,
		defaultLeftSidebarOpen: true,
		defaultRightSidebarOpen: false,
	},
	"/cms/media": {
		id: "media",
		header: MediaHeader,
		sidebar: MediaSidebar,
		rightSidebar: MediaRightSidebar,
		footer: MediaFooter,
		defaultLeftSidebarOpen: true,
		defaultRightSidebarOpen: false,
	},
	"/cms/publish": {
		id: "publish",
		header: PublishHeader,
		sidebar: PublishSidebar,
		rightSidebar: PublishRightSidebar,
		footer: PublishFooter,
		defaultLeftSidebarOpen: true,
		defaultRightSidebarOpen: false,
	},
	"/cms/analytics": {
		id: "analytics",
		header: AnalyticsHeader,
		sidebar: AnalyticsSidebar,
		rightSidebar: AnalyticsRightSidebar,
		footer: AnalyticsFooter,
		defaultLeftSidebarOpen: true,
		defaultRightSidebarOpen: false,
	},
	"/cms/settings": {
		id: "settings",
		header: SettingsHeader,
		sidebar: SettingsSidebar,
		rightSidebar: SettingsRightSidebar,
		footer: SettingsFooter,
		defaultLeftSidebarOpen: true,
		defaultRightSidebarOpen: false,
	},
};

// Helper function to get layout config by pathname
export function getLayoutConfig(pathname: string): LayoutConfig | null {
	// Try exact match first
	if (layoutConfigs[pathname]) {
		return layoutConfigs[pathname];
	}

	// Try to match by prefix (for nested routes like /cms/content/[...slug])
	for (const [route, config] of Object.entries(layoutConfigs)) {
		if (pathname.startsWith(route)) {
			return config;
		}
	}

	return null;
}

// Get default layout config (fallback)
export function getDefaultLayoutConfig(): LayoutConfig | null {
	return layoutConfigs["/cms/build"] || null;
}
