"use client";

import { CMSLayoutWrapper } from "@/components/ui/cms-layout-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <CMSLayoutWrapper>{children}</CMSLayoutWrapper>;
}
