"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Image as ImageIcon, Users, MessageSquare, Plus } from "lucide-react";

interface Metric {
	title: string;
	value: number;
	icon: React.ReactNode;
	description: string;
}

const metrics: Metric[] = [
	{
		title: "Total Posts",
		value: 24,
		icon: <FileText className="w-4 h-4" />,
		description: "Published posts",
	},
	{
		title: "Media Items",
		value: 156,
		icon: <ImageIcon className="w-4 h-4" />,
		description: "Images and files",
	},
	{
		title: "Users",
		value: 3,
		icon: <Users className="w-4 h-4" />,
		description: "Active users",
	},
	{
		title: "Comments",
		value: 89,
		icon: <MessageSquare className="w-4 h-4" />,
		description: "Pending moderation",
	},
];

export function DashboardOverview() {
	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					New Post
				</Button>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{metrics.map((metric, index) => (
					<Card key={index} className="p-6">
						<div className="flex items-center gap-2">
							{metric.icon}
							<h3 className="font-medium">{metric.title}</h3>
						</div>
						<p className="mt-4 text-3xl font-bold">{metric.value}</p>
						<p className="mt-1 text-sm text-muted-foreground">{metric.description}</p>
					</Card>
				))}
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card className="p-6">
					<h3 className="font-medium mb-4">Recent Activity</h3>
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 rounded-full bg-green-500" />
							<div>
								<p className="text-sm font-medium">New post published</p>
								<p className="text-sm text-muted-foreground">2 minutes ago</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 rounded-full bg-blue-500" />
							<div>
								<p className="text-sm font-medium">Media library updated</p>
								<p className="text-sm text-muted-foreground">1 hour ago</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-2 h-2 rounded-full bg-yellow-500" />
							<div>
								<p className="text-sm font-medium">New comment received</p>
								<p className="text-sm text-muted-foreground">3 hours ago</p>
							</div>
						</div>
					</div>
				</Card>

				<Card className="p-6">
					<h3 className="font-medium mb-4">Quick Actions</h3>
					<div className="grid gap-2">
						<Button variant="outline" className="justify-start">
							<FileText className="w-4 h-4 mr-2" />
							Create new post
						</Button>
						<Button variant="outline" className="justify-start">
							<ImageIcon className="w-4 h-4 mr-2" />
							Upload media
						</Button>
						<Button variant="outline" className="justify-start">
							<Users className="w-4 h-4 mr-2" />
							Manage users
						</Button>
						<Button variant="outline" className="justify-start">
							<MessageSquare className="w-4 h-4 mr-2" />
							View comments
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
