"use client";

import { BarChart, LineChart, PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { NodeEditor } from "@/components/analytics/NodeEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsStore } from "@/lib/nodes/analytics/store";

type MetricType = "users" | "revenue" | "conversion";
interface MetricData {
	value: number;
	change: number;
}
interface MetricsState {
	users: MetricData;
	revenue: MetricData;
	conversion: MetricData;
}

const DEMO_PAGES = [
	{ name: "Home", views: 8432, percentage: 75 },
	{ name: "Products", views: 6218, percentage: 62 },
	{ name: "About Us", views: 4129, percentage: 45 },
	{ name: "Contact", views: 2845, percentage: 28 },
];

const DEMO_ACTIVITIES = [
	{ text: "User signed up", time: 5 },
	{ text: "New order placed", time: 12 },
	{ text: "Product review submitted", time: 25 },
	{ text: "Customer support ticket opened", time: 38 },
	{ text: "Newsletter subscription", time: 45 },
];

export default function AnalyticsPage() {
	const [activeChart, setActiveChart] = useState<MetricType>("users");
	const [metrics, setMetrics] = useState<MetricsState>({
		users: { value: 0, change: 0 },
		revenue: { value: 0, change: 0 },
		conversion: { value: 0, change: 0 },
	});

	// Subscribe to node outputs
	useEffect(() => {
		const subscriptions = analyticsStore.nodes.map(({ node }) => ({
			value: node.outputs.currentValue.observable.subscribe((value) => {
				setMetrics((prev) => ({
					...prev,
					[node.inputs.metric.value]: {
						...prev[node.inputs.metric.value as MetricType],
						value: value as number,
					},
				}));
			}),
			change: node.outputs.percentageChange.observable.subscribe((change) => {
				setMetrics((prev) => ({
					...prev,
					[node.inputs.metric.value]: {
						...prev[node.inputs.metric.value as MetricType],
						change: change as number,
					},
				}));
			}),
		}));

		return () => {
			subscriptions.forEach((sub) => {
				sub.value.unsubscribe();
				sub.change.unsubscribe();
			});
		};
	}, []);

	return (
		<div className="flex-1 overflow-hidden h-[calc(100vh-110px)]">
			<div className="h-full overflow-auto">
				<div className="p-6 bg-background text-foreground">
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card className="bg-card border-border hover:border-accent transition-colors">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-card-foreground">
										Total Users
									</CardTitle>
									<BarChart className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-card-foreground">
										{metrics.users.value.toLocaleString()}
									</div>
									<p className="text-xs text-muted-foreground">
										{metrics.users.change > 0 ? "+" : ""}
										{metrics.users.change.toFixed(1)}% from last month
									</p>
								</CardContent>
							</Card>
							<Card className="bg-card border-border hover:border-accent transition-colors">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-card-foreground">
										Revenue
									</CardTitle>
									<LineChart className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-card-foreground">
										${metrics.revenue.value.toLocaleString()}
									</div>
									<p className="text-xs text-muted-foreground">
										{metrics.revenue.change > 0 ? "+" : ""}
										{metrics.revenue.change.toFixed(1)}% from last month
									</p>
								</CardContent>
							</Card>
							<Card className="bg-card border-border hover:border-accent transition-colors">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-card-foreground">
										Conversion Rate
									</CardTitle>
									<PieChart className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-card-foreground">
										{metrics.conversion.value.toFixed(2)}%
									</div>
									<p className="text-xs text-muted-foreground">
										{metrics.conversion.change > 0 ? "+" : ""}
										{metrics.conversion.change.toFixed(1)}% from last month
									</p>
								</CardContent>
							</Card>
						</div>

						<Card className="bg-card border-border hover:border-accent transition-colors">
							<CardHeader>
								<CardTitle className="text-card-foreground">
									Analytics Overview
								</CardTitle>
								<div className="flex space-x-2">
									<Button
										variant={activeChart === "users" ? "default" : "outline"}
										size="sm"
										onClick={() => setActiveChart("users")}
									>
										Users
									</Button>
									<Button
										variant={activeChart === "revenue" ? "default" : "outline"}
										size="sm"
										onClick={() => setActiveChart("revenue")}
									>
										Revenue
									</Button>
									<Button
										variant={
											activeChart === "conversion" ? "default" : "outline"
										}
										size="sm"
										onClick={() => setActiveChart("conversion")}
									>
										Conversion
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
									<NodeEditor className="w-full h-full" />
								</div>
							</CardContent>
						</Card>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card className="bg-card border-border hover:border-accent transition-colors">
								<CardHeader>
									<CardTitle className="text-card-foreground">
										Top Pages
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{DEMO_PAGES.map((page) => (
											<div key={page.name} className="flex items-center">
												<div className="w-[30%] font-medium text-card-foreground">
													{page.name}
												</div>
												<div className="w-[60%] bg-muted rounded-full h-2">
													<div
														className="bg-primary rounded-full h-2"
														style={{ width: `${page.percentage}%` }}
													/>
												</div>
												<div className="w-[10%] text-right text-sm text-muted-foreground">
													{page.views.toLocaleString()}
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
							<Card className="bg-card border-border hover:border-accent transition-colors">
								<CardHeader>
									<CardTitle className="text-card-foreground">
										Recent Activity
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{DEMO_ACTIVITIES.map((activity) => (
											<div
												key={`${activity.text}-${activity.time}`}
												className="flex items-center"
											>
												<div className="w-2 h-2 rounded-full bg-primary mr-2" />
												<div className="flex-1 text-card-foreground">
													{activity.text}
												</div>
												<div className="text-sm text-muted-foreground">
													{activity.time} min ago
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
