"use client";

import React from "react";
import { BaseLayout } from "@/components/ui/base-layout";
import { SettingsHeader } from "@/components/settings/header";
import { SettingsSidebar } from "@/components/settings/sidebar";
import { SettingsRightSidebar } from "@/components/settings/right-sidebar";
import { SettingsFooter } from "@/components/settings/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout Sidebar={SettingsSidebar} RightSidebar={SettingsRightSidebar} Header={SettingsHeader} Footer={SettingsFooter}>
			{children}
		</BaseLayout>
	);
}
