"use client";

import React from "react";
import { BaseLayout } from "@/components/ui/base-layout";
import { DesignHeader } from "@/components/design/header";
import { DesignSidebar } from "@/components/design/sidebar";
import { RightSidebar } from "@/components/design/right-sidebar";
import { DesignFooter } from "@/components/design/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<BaseLayout Sidebar={DesignSidebar} RightSidebar={RightSidebar} Header={DesignHeader} Footer={DesignFooter}>
			{children}
		</BaseLayout>
	);
}
