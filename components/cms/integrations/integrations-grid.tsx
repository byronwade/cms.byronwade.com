"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Container, Figma, Github, GitBranch, Mail, FileText, Phone, MessageCircle, CreditCard, Send, Trello as TrelloIcon, MessageCircleMore, Video, Settings2 } from "lucide-react";

interface Integration {
	name: string;
	description: string;
	icon: React.ReactNode;
	connected: boolean;
}

const integrations: Integration[] = [
	{
		name: "Discord",
		description: "Connect with Discord for seamless team communication.",
		icon: <MessageSquare className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Docker",
		description: "Effortlessly manage Docker containers on your dashboard.",
		icon: <Container className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Figma",
		description: "View and collaborate on Figma designs in one place.",
		icon: <Figma className="h-6 w-6" />,
		connected: true,
	},
	{
		name: "GitHub",
		description: "Streamline code management with GitHub integration.",
		icon: <Github className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "GitLab",
		description: "Efficiently manage code projects with GitLab integration.",
		icon: <GitBranch className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Gmail",
		description: "Access and manage Gmail messages effortlessly.",
		icon: <Mail className="h-6 w-6" />,
		connected: true,
	},
	{
		name: "Medium",
		description: "Explore and share Medium stories on your dashboard.",
		icon: <FileText className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Notion",
		description: "Effortlessly sync Notion pages for seamless collaboration.",
		icon: <FileText className="h-6 w-6" />,
		connected: true,
	},
	{
		name: "Skype",
		description: "Connect with Skype contacts seamlessly.",
		icon: <Phone className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Slack",
		description: "Integrate Slack for efficient team communication.",
		icon: <MessageCircle className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Stripe",
		description: "Easily manage Stripe transactions and payments.",
		icon: <CreditCard className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Telegram",
		description: "Connect with Telegram for real-time communication.",
		icon: <Send className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Trello",
		description: "Sync Trello cards for streamlined project management.",
		icon: <TrelloIcon className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "WhatsApp",
		description: "Easily integrate WhatsApp for direct messaging.",
		icon: <MessageCircleMore className="h-6 w-6" />,
		connected: false,
	},
	{
		name: "Zoom",
		description: "Host Zoom meetings directly from the dashboard.",
		icon: <Video className="h-6 w-6" />,
		connected: true,
	},
];

export function IntegrationsGrid() {
	return (
		<div className="px-4 py-6 flex flex-col flex-grow overflow-hidden">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">App Integrations</h1>
				<p className="text-muted-foreground">Here&apos;s a list of your apps for the integration!</p>
			</div>

			<div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
				<div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
					<Input className="w-40 lg:w-[250px]" placeholder="Filter apps..." />
					<Select>
						<SelectTrigger className="w-36">
							<SelectValue placeholder="All Apps" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Apps</SelectItem>
							<SelectItem value="connected">Connected</SelectItem>
							<SelectItem value="not-connected">Not Connected</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<Select>
					<SelectTrigger className="w-16">
						<Settings2 className="h-4 w-4" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="name">Name</SelectItem>
						<SelectItem value="status">Status</SelectItem>
						<SelectItem value="date">Date Added</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<Separator className="shadow" />

			<ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
				{integrations.map((integration, index) => (
					<li key={index} className="rounded-lg border p-4 hover:shadow-md">
						<div className="mb-8 flex items-center justify-between">
							<div className="flex size-10 items-center justify-center rounded-lg bg-muted p-2">{integration.icon}</div>
							<Button variant={integration.connected ? "connected" : "outline"} size="sm">
								{integration.connected ? "Connected" : "Connect"}
							</Button>
						</div>
						<div>
							<h2 className="mb-1 font-semibold">{integration.name}</h2>
							<p className="line-clamp-2 text-gray-500">{integration.description}</p>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
