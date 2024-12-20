"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Calendar, Download } from "lucide-react";

export default function AnalyticsPage() {
	return (
		<>
			<PageHeader>
				<div className="flex items-center justify-between w-full">
					<h1 className="text-lg font-semibold">Analytics</h1>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="tiny" className="gap-2">
							<Calendar />
							Last 7 Days
						</Button>
						<Button variant="outline" size="tiny" className="gap-2">
							<Download />
							Download
						</Button>
					</div>
				</div>
			</PageHeader>

			<main className="flex-1 p-4">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{/* Quick stats */}
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Total Views</div>
							<div className="mt-2 text-2xl font-bold">45,231</div>
							<div className="mt-1 text-xs text-muted-foreground">+20.1% from last week</div>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Unique Visitors</div>
							<div className="mt-2 text-2xl font-bold">23,420</div>
							<div className="mt-1 text-xs text-muted-foreground">+10.3% from last week</div>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Avg. Time on Site</div>
							<div className="mt-2 text-2xl font-bold">3m 42s</div>
							<div className="mt-1 text-xs text-muted-foreground">+5% from last week</div>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Bounce Rate</div>
							<div className="mt-2 text-2xl font-bold">42.3%</div>
							<div className="mt-1 text-xs text-muted-foreground">-2.1% from last week</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
