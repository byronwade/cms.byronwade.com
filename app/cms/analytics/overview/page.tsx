"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Users, Clock, MousePointer, Globe } from "lucide-react";

export default function AnalyticsOverviewPage() {
	return (
		<div className="p-6 space-y-6">
			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-400">Total Users</p>
							<h3 className="text-2xl font-semibold mt-1">12,345</h3>
						</div>
						<div className="flex flex-col items-end">
							<Users className="w-5 h-5 text-blue-400" />
							<Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-400">
								<ArrowUp className="w-3 h-3 mr-1" />
								12%
							</Badge>
						</div>
					</div>
				</Card>

				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-400">Avg. Session</p>
							<h3 className="text-2xl font-semibold mt-1">4m 32s</h3>
						</div>
						<div className="flex flex-col items-end">
							<Clock className="w-5 h-5 text-purple-400" />
							<Badge variant="secondary" className="mt-2 bg-red-500/10 text-red-400">
								<ArrowDown className="w-3 h-3 mr-1" />
								5%
							</Badge>
						</div>
					</div>
				</Card>

				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-400">Click Rate</p>
							<h3 className="text-2xl font-semibold mt-1">2.4%</h3>
						</div>
						<div className="flex flex-col items-end">
							<MousePointer className="w-5 h-5 text-green-400" />
							<Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-400">
								<ArrowUp className="w-3 h-3 mr-1" />
								8%
							</Badge>
						</div>
					</div>
				</Card>

				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-400">Page Views</p>
							<h3 className="text-2xl font-semibold mt-1">45.2K</h3>
						</div>
						<div className="flex flex-col items-end">
							<Globe className="w-5 h-5 text-yellow-400" />
							<Badge variant="secondary" className="mt-2 bg-green-500/10 text-green-400">
								<ArrowUp className="w-3 h-3 mr-1" />
								15%
							</Badge>
						</div>
					</div>
				</Card>
			</div>

			{/* Charts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<h3 className="text-sm font-medium mb-4">Traffic Overview</h3>
					<div className="h-[300px] flex items-center justify-center text-gray-400">Chart Component Here</div>
				</Card>

				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<h3 className="text-sm font-medium mb-4">User Activity</h3>
					<div className="h-[300px] flex items-center justify-center text-gray-400">Chart Component Here</div>
				</Card>
			</div>

			{/* Top Pages */}
			<div>
				<h3 className="text-sm font-medium mb-2">Top Pages</h3>
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="space-y-4">
						{[
							{ path: "/home", views: "12.5K", increase: true },
							{ path: "/products", views: "8.2K", increase: true },
							{ path: "/about", views: "6.1K", increase: false },
							{ path: "/contact", views: "4.7K", increase: true },
						].map((page) => (
							<div key={page.path} className="flex items-center justify-between p-2 rounded-md hover:bg-[#2a2a2a] transition-colors">
								<span className="text-sm text-gray-400">{page.path}</span>
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium">{page.views}</span>
									<Badge variant="secondary" className={page.increase ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}>
										{page.increase ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</div>
	);
}
