"use client";

import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export default function MediaPage() {
	return (
		<>
			<PageHeader>
				<div className="flex items-center justify-between w-full">
					<h1 className="text-lg font-semibold">Media Library</h1>
					<div className="flex items-center gap-2">
						<Button size="tiny" className="gap-2">
							<Upload className="h-3.5 w-3.5" />
							Upload Media
						</Button>
					</div>
				</div>
			</PageHeader>

			<main className="flex-1 p-4">{/* Media grid will go here */}</main>
		</>
	);
}
