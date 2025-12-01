"use client";

import {
	ArrowRightLeft,
	BarChart3,
	Bot,
	Braces,
	Database,
	FileText,
	FormInput,
	Globe2,
	LineChart,
	Link2,
	ListChecks,
	PieChart,
	ShoppingCart,
	Sparkles,
	Table2,
	Users,
	Webhook,
	Workflow,
} from "lucide-react";
import { CommonSidebar, SidebarSection } from "@/components/common/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";

interface BuildSidebarProps {
	isOpen: boolean;
}

type PresetType = {
	id: string;
	name: string;
	description: string;
	icon: JSX.Element;
} & (
	| { tables: string[] }
	| { examples: string[] }
	| { endpoints: string[] }
	| { components: string[] }
);

const AI_DATA_FLOWS = [
	{
		id: "transform",
		name: "Data Transformer",
		description:
			"Transform data between tables using natural language instructions",
		examples: [
			"Convert customer addresses to geocoordinates",
			"Extract keywords from product descriptions",
			"Normalize user names and emails",
		],
		icon: <ArrowRightLeft className="h-4 w-4 text-purple-400" />,
	},
	{
		id: "enrich",
		name: "Data Enricher",
		description: "Enhance existing data with AI-generated insights",
		examples: [
			"Generate SEO metadata from content",
			"Add sentiment analysis to comments",
			"Create product recommendations",
		],
		icon: <Sparkles className="h-4 w-4 text-primary" />,
	},
	{
		id: "validate",
		name: "Data Validator",
		description: "Validate and clean data using AI rules",
		examples: [
			"Verify email and phone formats",
			"Check for inappropriate content",
			"Standardize address formats",
		],
		icon: <Bot className="h-4 w-4 text-green-400" />,
	},
	{
		id: "merge",
		name: "Data Merger",
		description: "Intelligently merge data from multiple sources",
		examples: [
			"Combine duplicate customer records",
			"Merge product categories",
			"Unify user profiles",
		],
		icon: <Workflow className="h-4 w-4 text-orange-400" />,
	},
];

const DATABASE_PRESETS = [
	{
		id: "ecommerce",
		name: "E-commerce Platform",
		description: "Complete database structure for an online store",
		tables: ["Products", "Categories", "Orders", "Customers", "Reviews"],
		icon: <ShoppingCart className="h-4 w-4 text-green-400" />,
	},
	{
		id: "blog",
		name: "Blog System",
		description: "Database setup for a content management system",
		tables: ["Posts", "Categories", "Authors", "Comments", "Tags"],
		icon: <FileText className="h-4 w-4 text-primary" />,
	},
	{
		id: "crm",
		name: "CRM System",
		description: "Customer relationship management database",
		tables: ["Contacts", "Companies", "Deals", "Activities", "Notes"],
		icon: <Users className="h-4 w-4 text-orange-400" />,
	},
];

const VISUALIZATION_TOOLS = [
	{
		id: "charts",
		name: "Chart Builder",
		description: "Create interactive data visualizations",
		examples: [
			"Bar charts for sales data",
			"Line charts for trends",
			"Pie charts for distribution",
		],
		icon: <BarChart3 className="h-4 w-4 text-yellow-400" />,
	},
	{
		id: "dashboard",
		name: "Dashboard Builder",
		description: "Build custom data dashboards",
		examples: ["Sales overview", "User analytics", "Inventory tracking"],
		icon: <LineChart className="h-4 w-4 text-pink-400" />,
	},
	{
		id: "reports",
		name: "Report Generator",
		description: "Generate automated reports",
		examples: [
			"Monthly sales reports",
			"User engagement metrics",
			"Inventory status",
		],
		icon: <PieChart className="h-4 w-4 text-indigo-400" />,
	},
];

const API_INTEGRATIONS = [
	{
		id: "rest-api",
		name: "REST API",
		description: "Create RESTful API endpoints",
		endpoints: [
			"GET /api/v1/resources",
			"POST /api/v1/resources",
			"PUT /api/v1/resources/:id",
		],
		icon: <Globe2 className="h-4 w-4 text-emerald-400" />,
	},
	{
		id: "webhooks",
		name: "Webhook Handler",
		description: "Handle incoming webhook events",
		endpoints: [
			"POST /webhooks/stripe",
			"POST /webhooks/github",
			"POST /webhooks/custom",
		],
		icon: <Webhook className="h-4 w-4 text-cyan-400" />,
	},
	{
		id: "integrations",
		name: "Third-party Integration",
		description: "Connect with external services",
		endpoints: ["OAuth2 flow", "API key auth", "JWT authentication"],
		icon: <Link2 className="h-4 w-4 text-violet-400" />,
	},
];

const FORM_TOOLS = [
	{
		id: "form-builder",
		name: "Form Builder",
		description: "Create dynamic forms with validation",
		components: ["Input fields", "Select dropdowns", "File uploads"],
		icon: <FormInput className="h-4 w-4 text-red-400" />,
	},
	{
		id: "data-grid",
		name: "Data Grid",
		description: "Build interactive data tables",
		components: ["Sortable columns", "Filters", "Bulk actions"],
		icon: <Table2 className="h-4 w-4 text-amber-400" />,
	},
	{
		id: "workflow",
		name: "Form Workflow",
		description: "Create multi-step form workflows",
		components: ["Step navigation", "Conditional fields", "Data validation"],
		icon: <ListChecks className="h-4 w-4 text-lime-400" />,
	},
];

export function BuildSidebar({ isOpen }: BuildSidebarProps) {
	const onDragStart = (
		event: React.DragEvent,
		nodeType: string,
		preset?: PresetType,
	) => {
		const data = preset ? { type: nodeType, preset } : { type: nodeType };
		event.dataTransfer.setData("application/aiflow", JSON.stringify(data));
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<CommonSidebar isOpen={isOpen} side="left">
			<div className="gap-6 flex flex-col">
				<SidebarSection title="Quick Add">
					<div className="gap-2 flex flex-col">
						<div
							className="group cursor-grab active:cursor-grabbing"
							draggable
							onDragStart={(e) => onDragStart(e, "table")}
						>
							<div className="p-3 rounded-lg border border-border hover:border-primary/50 bg-card hover:bg-card/80 transition-all duration-200">
								<div className="flex items-center gap-3">
									<Database className="h-4 w-4 flex-shrink-0 text-primary" />
									<div className="flex-1 min-w-0">
										<h4 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
											Database Table
										</h4>
										<p className="text-xs text-muted-foreground line-clamp-1">
											Create a new database table
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</SidebarSection>

				<SidebarSection
					title="Database Presets"
					titleExtra={
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
						>
							<Database className="h-3.5 w-3.5" />
						</Button>
					}
				>
					<div className="gap-2 flex flex-col">
						{DATABASE_PRESETS.map((preset) => (
							<HoverCard key={preset.id}>
								<HoverCardTrigger asChild>
									<div
										className="group cursor-grab active:cursor-grabbing"
										draggable
										onDragStart={(e) => onDragStart(e, "preset", preset)}
									>
										<div className="p-3 rounded-lg border border-border hover:border-primary/50 bg-card hover:bg-card/80 transition-all duration-200">
											<div className="flex items-start gap-3">
												{preset.icon}
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 flex-wrap">
														<h4 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
															{preset.name}
														</h4>
														<Badge
															variant="secondary"
															className="bg-primary/10 text-primary text-[10px] px-1.5 flex-shrink-0"
														>
															Preset
														</Badge>
													</div>
													<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
														{preset.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								</HoverCardTrigger>
								<HoverCardContent
									side="right"
									className="w-80 bg-popover border-border text-popover-foreground"
								>
									<h5 className="font-medium text-primary mb-1">
										{preset.name}
									</h5>
									<p className="text-sm text-muted-foreground mb-3">
										{preset.description}
									</p>
									<div className="gap-2 flex flex-col">
										<h6 className="text-xs font-medium text-muted-foreground">
											Included Tables:
										</h6>
										<ul className="text-xs gap-1.5 flex flex-col">
											{preset.tables.map((table, i) => (
												<li key={i} className="flex items-center gap-2">
													<span className="w-1 h-1 rounded-full bg-primary" />
													<span className="text-foreground">{table}</span>
												</li>
											))}
										</ul>
									</div>
								</HoverCardContent>
							</HoverCard>
						))}
					</div>
				</SidebarSection>

				<SidebarSection
					title="AI Data Flow"
					titleExtra={
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"
						>
							<Braces className="h-3.5 w-3.5" />
						</Button>
					}
				>
					<div className="gap-2 flex flex-col">
						{AI_DATA_FLOWS.map((flow) => (
							<HoverCard key={flow.id}>
								<HoverCardTrigger asChild>
									<div
										className="group cursor-grab active:cursor-grabbing"
										draggable
										onDragStart={(e) => onDragStart(e, flow.id)}
									>
										<div className="p-3 rounded-lg border border-border hover:border-primary/50 bg-card hover:bg-card/80 transition-all duration-200">
											<div className="flex items-start gap-3">
												{flow.icon}
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 flex-wrap">
														<h4 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
															{flow.name}
														</h4>
														<Badge
															variant="secondary"
															className="bg-primary/10 text-primary text-[10px] px-1.5 flex-shrink-0"
														>
															AI
														</Badge>
													</div>
													<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
														{flow.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								</HoverCardTrigger>
								<HoverCardContent
									side="right"
									className="w-80 bg-popover border-border text-popover-foreground"
								>
									<h5 className="font-medium text-primary mb-1">{flow.name}</h5>
									<p className="text-sm text-muted-foreground mb-3">
										{flow.description}
									</p>
									<div className="gap-2 flex flex-col">
										<h6 className="text-xs font-medium text-muted-foreground">
											Examples:
										</h6>
										<ul className="text-xs gap-1.5 flex flex-col">
											{flow.examples.map((example, i) => (
												<li key={i} className="flex items-center gap-2">
													<span className="w-1 h-1 rounded-full bg-primary" />
													<span className="text-foreground">{example}</span>
												</li>
											))}
										</ul>
									</div>
								</HoverCardContent>
							</HoverCard>
						))}
					</div>
				</SidebarSection>

				<SidebarSection
					title="Visualization Tools"
					titleExtra={
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400"
						>
							<BarChart3 className="h-3.5 w-3.5" />
						</Button>
					}
				>
					<div className="gap-2 flex flex-col">
						{VISUALIZATION_TOOLS.map((tool) => (
							<HoverCard key={tool.id}>
								<HoverCardTrigger asChild>
									<div
										className="group cursor-grab active:cursor-grabbing"
										draggable
										onDragStart={(e) => onDragStart(e, tool.id)}
									>
										<div className="p-3 rounded-lg border border-border hover:border-primary/50 bg-card hover:bg-card/80 transition-all duration-200">
											<div className="flex items-start gap-3">
												{tool.icon}
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 flex-wrap">
														<h4 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
															{tool.name}
														</h4>
														<Badge
															variant="secondary"
															className="bg-primary/10 text-primary text-[10px] px-1.5 flex-shrink-0"
														>
															Chart
														</Badge>
													</div>
													<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
														{tool.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								</HoverCardTrigger>
								<HoverCardContent
									side="right"
									className="w-80 bg-popover border-border text-popover-foreground"
								>
									<h5 className="font-medium text-primary mb-1">{tool.name}</h5>
									<p className="text-sm text-muted-foreground mb-3">
										{tool.description}
									</p>
									<div className="gap-2 flex flex-col">
										<h6 className="text-xs font-medium text-muted-foreground">
											Examples:
										</h6>
										<ul className="text-xs gap-1.5 flex flex-col">
											{tool.examples.map((example, i) => (
												<li key={i} className="flex items-center gap-2">
													<span className="w-1 h-1 rounded-full bg-primary" />
													<span className="text-foreground">{example}</span>
												</li>
											))}
										</ul>
									</div>
								</HoverCardContent>
							</HoverCard>
						))}
					</div>
				</SidebarSection>

				<SidebarSection
					title="API Integration"
					titleExtra={
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
						>
							<Globe2 className="h-3.5 w-3.5" />
						</Button>
					}
				>
					<div className="gap-2 flex flex-col">
						{API_INTEGRATIONS.map((api) => (
							<HoverCard key={api.id}>
								<HoverCardTrigger asChild>
									<div
										className="group cursor-grab active:cursor-grabbing"
										draggable
										onDragStart={(e) => onDragStart(e, api.id)}
									>
										<div className="p-3 rounded-lg border border-border hover:border-primary/50 bg-card hover:bg-card/80 transition-all duration-200">
											<div className="flex items-start gap-3">
												{api.icon}
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 flex-wrap">
														<h4 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
															{api.name}
														</h4>
														<Badge
															variant="secondary"
															className="bg-primary/10 text-primary text-[10px] px-1.5 flex-shrink-0"
														>
															API
														</Badge>
													</div>
													<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
														{api.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								</HoverCardTrigger>
								<HoverCardContent
									side="right"
									className="w-80 bg-popover border-border text-popover-foreground"
								>
									<h5 className="font-medium text-primary mb-1">{api.name}</h5>
									<p className="text-sm text-muted-foreground mb-3">
										{api.description}
									</p>
									<div className="gap-2 flex flex-col">
										<h6 className="text-xs font-medium text-muted-foreground">
											Example Endpoints:
										</h6>
										<ul className="text-xs gap-1.5 flex flex-col">
											{api.endpoints.map((endpoint, i) => (
												<li key={i} className="flex items-center gap-2">
													<span className="w-1 h-1 rounded-full bg-primary" />
													<span className="text-foreground">{endpoint}</span>
												</li>
											))}
										</ul>
									</div>
								</HoverCardContent>
							</HoverCard>
						))}
					</div>
				</SidebarSection>

				<SidebarSection
					title="Form Builder"
					titleExtra={
						<Button
							variant="ghost"
							size="icon"
							className="h-5 w-5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400"
						>
							<FormInput className="h-3.5 w-3.5" />
						</Button>
					}
				>
					<div className="gap-2 flex flex-col">
						{FORM_TOOLS.map((form) => (
							<HoverCard key={form.id}>
								<HoverCardTrigger asChild>
									<div
										className="group cursor-grab active:cursor-grabbing"
										draggable
										onDragStart={(e) => onDragStart(e, form.id)}
									>
										<div className="p-3 rounded-lg border border-border hover:border-destructive/50 bg-card hover:bg-card/80 transition-all duration-200">
											<div className="flex items-start gap-3">
												{form.icon}
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2 flex-wrap">
														<h4 className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
															{form.name}
														</h4>
														<Badge
															variant="secondary"
															className="bg-primary/10 text-primary text-[10px] px-1.5 flex-shrink-0"
														>
															Form
														</Badge>
													</div>
													<p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
														{form.description}
													</p>
												</div>
											</div>
										</div>
									</div>
								</HoverCardTrigger>
								<HoverCardContent
									side="right"
									className="w-80 bg-popover border-border text-popover-foreground"
								>
									<h5 className="font-medium text-primary mb-1">{form.name}</h5>
									<p className="text-sm text-muted-foreground mb-3">
										{form.description}
									</p>
									<div className="gap-2 flex flex-col">
										<h6 className="text-xs font-medium text-muted-foreground">
											Components:
										</h6>
										<ul className="text-xs gap-1.5 flex flex-col">
											{form.components.map((component, i) => (
												<li key={i} className="flex items-center gap-2">
													<span className="w-1 h-1 rounded-full bg-primary" />
													<span className="text-foreground">{component}</span>
												</li>
											))}
										</ul>
									</div>
								</HoverCardContent>
							</HoverCard>
						))}
					</div>
				</SidebarSection>
			</div>
		</CommonSidebar>
	);
}
