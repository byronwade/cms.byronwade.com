"use client";

import React from "react";
import { BaseLayout } from "@/components/ui/base-layout";
import { PublishHeader } from "@/components/publish/header";
import { PublishSidebar } from "@/components/publish/sidebar";
import { PublishRightSidebar } from "@/components/publish/right-sidebar";
import { PublishFooter } from "@/components/publish/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout Sidebar={PublishSidebar} RightSidebar={PublishRightSidebar} Header={PublishHeader} Footer={PublishFooter}>
			{children}
		</BaseLayout>
	);
}
