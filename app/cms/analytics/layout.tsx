"use client";

import React from "react";
import { BaseLayout } from "@/components/ui/base-layout";
import { AnalyticsHeader } from "@/components/analytics/header";
import { AnalyticsSidebar } from "@/components/analytics/sidebar";
import { AnalyticsRightSidebar } from "@/components/analytics/right-sidebar";
import { AnalyticsFooter } from "@/components/analytics/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout Sidebar={AnalyticsSidebar} RightSidebar={AnalyticsRightSidebar} Header={AnalyticsHeader} Footer={AnalyticsFooter}>
			{children}
		</BaseLayout>
	);
}
