"use client";

import React from "react";
import { BaseLayout } from "@/components/ui/base-layout";
import { MediaHeader } from "@/components/media/header";
import { MediaSidebar } from "@/components/media/sidebar";
import { MediaRightSidebar } from "@/components/media/right-sidebar";
import { MediaFooter } from "@/components/media/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout Sidebar={MediaSidebar} RightSidebar={MediaRightSidebar} Header={MediaHeader} Footer={MediaFooter}>
			{children}
		</BaseLayout>
	);
}
