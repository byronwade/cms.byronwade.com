"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

export default function DashboardPage() {
	return (
		<>
			<PageHeader>
				<div className="flex items-center justify-between w-full">
					<h1 className="text-lg font-semibold">Dashboard</h1>
					<div className="flex items-center gap-2">
						<Button size="tiny" className="gap-2">
							<Plus className="h-3.5 w-3.5" />
							Add Widget
						</Button>
					</div>
				</div>
			</PageHeader>

			<main className="flex-1 p-4">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{/* Quick stats */}
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
							<div className="mt-2 text-2xl font-bold">$45,231.89</div>
							<div className="mt-1 text-xs text-muted-foreground">+20.1% from last month</div>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Subscriptions</div>
							<div className="mt-2 text-2xl font-bold">+2350</div>
							<div className="mt-1 text-xs text-muted-foreground">+180.1% from last month</div>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Sales</div>
							<div className="mt-2 text-2xl font-bold">+12,234</div>
							<div className="mt-1 text-xs text-muted-foreground">+19% from last month</div>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<div className="text-sm font-medium text-muted-foreground">Active Now</div>
							<div className="mt-2 text-2xl font-bold">+573</div>
							<div className="mt-1 text-xs text-muted-foreground">+201 since last hour</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
