"use client";

import React from "react";
import { BaseLayout } from "@/components/ui/base-layout";
import { ContentHeader } from "@/components/content/header";
import { ContentSidebar } from "@/components/content/sidebar";
import { ContentRightSidebar } from "@/components/content/right-sidebar";
import { ContentFooter } from "@/components/content/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout Sidebar={ContentSidebar} RightSidebar={ContentRightSidebar} Header={ContentHeader} Footer={ContentFooter}>
			{children}
		</BaseLayout>
	);
}
