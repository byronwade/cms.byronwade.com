"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";
import { analyticsStore } from "@/lib/nodes/analytics/store";
import { NodeEditor } from "@/components/analytics/NodeEditor";

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
				<div className="p-6 bg-[#1a1a1a] text-white">
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<Card className="bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-white">Total Users</CardTitle>
									<BarChart className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-white">{metrics.users.value.toLocaleString()}</div>
									<p className="text-xs text-gray-400">
										{metrics.users.change > 0 ? "+" : ""}
										{metrics.users.change.toFixed(1)}% from last month
									</p>
								</CardContent>
							</Card>
							<Card className="bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-white">Revenue</CardTitle>
									<LineChart className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-white">${metrics.revenue.value.toLocaleString()}</div>
									<p className="text-xs text-gray-400">
										{metrics.revenue.change > 0 ? "+" : ""}
										{metrics.revenue.change.toFixed(1)}% from last month
									</p>
								</CardContent>
							</Card>
							<Card className="bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium text-white">Conversion Rate</CardTitle>
									<PieChart className="h-4 w-4 text-gray-400" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold text-white">{metrics.conversion.value.toFixed(2)}%</div>
									<p className="text-xs text-gray-400">
										{metrics.conversion.change > 0 ? "+" : ""}
										{metrics.conversion.change.toFixed(1)}% from last month
									</p>
								</CardContent>
							</Card>
						</div>

						<Card className="bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
							<CardHeader>
								<CardTitle className="text-white">Analytics Overview</CardTitle>
								<div className="flex space-x-2">
									<Button variant={activeChart === "users" ? "default" : "outline"} size="sm" onClick={() => setActiveChart("users")} className={activeChart === "users" ? "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white border-[#4a4a4a]" : "bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 border-[#3a3a3a]"}>
										Users
									</Button>
									<Button variant={activeChart === "revenue" ? "default" : "outline"} size="sm" onClick={() => setActiveChart("revenue")} className={activeChart === "revenue" ? "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white border-[#4a4a4a]" : "bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 border-[#3a3a3a]"}>
										Revenue
									</Button>
									<Button variant={activeChart === "conversion" ? "default" : "outline"} size="sm" onClick={() => setActiveChart("conversion")} className={activeChart === "conversion" ? "bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white border-[#4a4a4a]" : "bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-400 border-[#3a3a3a]"}>
										Conversion
									</Button>
								</div>
							</CardHeader>
							<CardContent>
								<div className="h-[300px] flex items-center justify-center bg-[#3a3a3a] rounded-md">
									<NodeEditor className="w-full h-full" />
								</div>
							</CardContent>
						</Card>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Card className="bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<CardHeader>
									<CardTitle className="text-white">Top Pages</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{DEMO_PAGES.map((page) => (
											<div key={page.name} className="flex items-center">
												<div className="w-[30%] font-medium text-white">{page.name}</div>
												<div className="w-[60%] bg-[#3a3a3a] rounded-full h-2">
													<div className="bg-blue-500 rounded-full h-2" style={{ width: `${page.percentage}%` }} />
												</div>
												<div className="w-[10%] text-right text-sm text-gray-400">{page.views.toLocaleString()}</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
							<Card className="bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<CardHeader>
									<CardTitle className="text-white">Recent Activity</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{DEMO_ACTIVITIES.map((activity, index) => (
											<div key={index} className="flex items-center">
												<div className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
												<div className="flex-1 text-white">{activity.text}</div>
												<div className="text-sm text-gray-400">{activity.time} min ago</div>
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
