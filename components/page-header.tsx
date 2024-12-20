"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

interface PageHeaderProps {
	children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps) {
	return (
		<header className="flex h-12 shrink-0 items-center border-b transition-[width,height] ease-linear sticky top-0 bg-background z-[49]">
			<div className="flex items-center w-full px-2 gap-2">
				<div className="flex items-center gap-2">
					<Button variant="outline" size="tiny" className="w-[26px] p-0" asChild>
						<SidebarTrigger>
							<Menu />
						</SidebarTrigger>
					</Button>
					<Separator orientation="vertical" className="h-4" />
				</div>
				{children}
			</div>
		</header>
	);
}
