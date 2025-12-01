"use client";

import { usePathname } from "next/navigation";
import { getLayoutConfig } from "@/lib/layout-config";
import { BaseLayout } from "./base-layout";

interface CMSLayoutWrapperProps {
	children: React.ReactNode;
}

export function CMSLayoutWrapper({ children }: CMSLayoutWrapperProps) {
	const pathname = usePathname();
	const config = getLayoutConfig(pathname);

	if (!config) {
		console.error(`No layout config found for pathname: ${pathname}`);
		return <>{children}</>;
	}

	return <BaseLayout config={config}>{children}</BaseLayout>;
}
