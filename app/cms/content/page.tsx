"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export default function ContentPage() {
	return (
		<>
			<PageHeader>
				<div className="flex items-center justify-between w-full">
					<h1 className="text-lg font-semibold">Content</h1>
					<div className="flex items-center gap-2">
						<Button size="tiny" className="gap-2">
							<Plus className="h-3.5 w-3.5" />
							New Page
						</Button>
						<Button size="tiny" className="gap-2">
							<Plus className="h-3.5 w-3.5" />
							New Post
						</Button>
					</div>
				</div>
			</PageHeader>

			<main className="flex-1 p-4">{/* Content list will go here */}</main>
		</>
	);
}
