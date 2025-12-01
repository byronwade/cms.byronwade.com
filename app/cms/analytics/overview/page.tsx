// Server Component - no interactivity needed, just displaying data

import {
	ArrowDown,
	ArrowUp,
	Clock,
	Globe,
	MousePointer,
	Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function AnalyticsOverviewPage() {
	return (
		<div className="p-6 gap-6 flex flex-col">
			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="p-4 bg-card border-border">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Total Users</p>
							<h3 className="text-2xl font-semibold mt-1 text-card-foreground">
								12,345
							</h3>
						</div>
						<div className="flex flex-col items-end">
							<Users className="w-5 h-5 text-primary" />
							<Badge
								variant="secondary"
								className="mt-2 bg-green-500/10 text-green-500"
							>
								<ArrowUp className="w-3 h-3 mr-1" />
								12%
							</Badge>
						</div>
					</div>
				</Card>

				<Card className="p-4 bg-card border-border">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Avg. Session</p>
							<h3 className="text-2xl font-semibold mt-1 text-card-foreground">
								4m 32s
							</h3>
						</div>
						<div className="flex flex-col items-end">
							<Clock className="w-5 h-5 text-accent" />
							<Badge
								variant="secondary"
								className="mt-2 bg-destructive/10 text-destructive"
							>
								<ArrowDown className="w-3 h-3 mr-1" />
								5%
							</Badge>
						</div>
					</div>
				</Card>

				<Card className="p-4 bg-card border-border">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Click Rate</p>
							<h3 className="text-2xl font-semibold mt-1 text-card-foreground">
								2.4%
							</h3>
						</div>
						<div className="flex flex-col items-end">
							<MousePointer className="w-5 h-5 text-green-500" />
							<Badge
								variant="secondary"
								className="mt-2 bg-green-500/10 text-green-500"
							>
								<ArrowUp className="w-3 h-3 mr-1" />
								8%
							</Badge>
						</div>
					</div>
				</Card>

				<Card className="p-4 bg-card border-border">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Page Views</p>
							<h3 className="text-2xl font-semibold mt-1 text-card-foreground">
								45.2K
							</h3>
						</div>
						<div className="flex flex-col items-end">
							<Globe className="w-5 h-5 text-yellow-500" />
							<Badge
								variant="secondary"
								className="mt-2 bg-green-500/10 text-green-500"
							>
								<ArrowUp className="w-3 h-3 mr-1" />
								15%
							</Badge>
						</div>
					</div>
				</Card>
			</div>

			{/* Charts Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card className="p-4 bg-card border-border">
					<h3 className="text-sm font-medium mb-4 text-card-foreground">
						Traffic Overview
					</h3>
					<div className="h-[300px] flex items-center justify-center text-muted-foreground">
						Chart Component Here
					</div>
				</Card>

				<Card className="p-4 bg-card border-border">
					<h3 className="text-sm font-medium mb-4 text-card-foreground">
						User Activity
					</h3>
					<div className="h-[300px] flex items-center justify-center text-muted-foreground">
						Chart Component Here
					</div>
				</Card>
			</div>

			{/* Top Pages */}
			<div>
				<h3 className="text-sm font-medium mb-2">Top Pages</h3>
				<Card className="p-4 bg-card border-border">
					<div className="gap-4 flex flex-col">
						{[
							{ path: "/home", views: "12.5K", increase: true },
							{ path: "/products", views: "8.2K", increase: true },
							{ path: "/about", views: "6.1K", increase: false },
							{ path: "/contact", views: "4.7K", increase: true },
						].map((page) => (
							<div
								key={page.path}
								className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors"
							>
								<span className="text-sm text-muted-foreground">
									{page.path}
								</span>
								<div className="flex items-center gap-2">
									<span className="text-sm font-medium text-card-foreground">
										{page.views}
									</span>
									<Badge
										variant="secondary"
										className={
											page.increase
												? "bg-green-500/10 text-green-500"
												: "bg-destructive/10 text-destructive"
										}
									>
										{page.increase ? (
											<ArrowUp className="w-3 h-3" />
										) : (
											<ArrowDown className="w-3 h-3" />
										)}
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
