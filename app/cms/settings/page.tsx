"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
	return (
		<>
			<PageHeader>
				<div className="flex items-center justify-between w-full">
					<h1 className="text-lg font-semibold">Settings</h1>
					<div className="flex items-center gap-2">
						<Button size="tiny" className="gap-2">
							<Save className="h-3.5 w-3.5" />
							Save Changes
						</Button>
					</div>
				</div>
			</PageHeader>

			<main className="flex-1 p-4">{/* Settings form will go here */}</main>
		</>
	);
}
