"use client";

import React from "react";
import { BaseLayout } from "@/components/ui/base-layout";
import { BuildHeader } from "@/components/build/header";
import { BuildSidebar } from "@/components/build/sidebar";
import { BuildRightSidebar } from "@/components/build/right-sidebar";
import { BuildFooter } from "@/components/build/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout Sidebar={BuildSidebar} RightSidebar={BuildRightSidebar} Header={BuildHeader} Footer={BuildFooter}>
			{children}
		</BaseLayout>
	);
}
