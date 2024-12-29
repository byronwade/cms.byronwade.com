"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Database, ShoppingCart, Users, FileText, MessageSquare, Calendar, Settings, ChevronRight, Boxes, Box, PlusCircle, LayoutDashboard, Blocks, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBuildStore } from "@/app/cms/build/store";
import { MarkerType, Edge, Node } from "reactflow";

const PRESET_FLOWS = [
	{
		id: "ecommerce",
		name: "E-commerce Platform",
		icon: <ShoppingCart className="w-4 h-4" />,
		description: "Complete e-commerce system with products, orders, and customers",
		tables: ["Products", "Orders", "Customers", "Cart", "Inventory", "Categories", "Reviews"],
	},
	{
		id: "blog",
		name: "Blog System",
		icon: <FileText className="w-4 h-4" />,
		description: "Full blog platform with posts, comments, and user management",
		tables: ["Posts", "Comments", "Users", "Categories", "Tags", "Media"],
	},
	{
		id: "crm",
		name: "CRM System",
		icon: <Users className="w-4 h-4" />,
		description: "Customer relationship management with leads and deals",
		tables: ["Contacts", "Companies", "Deals", "Activities", "Tasks", "Notes"],
	},
	{
		id: "events",
		name: "Event Management",
		icon: <Calendar className="w-4 h-4" />,
		description: "Event planning and booking system",
		tables: ["Events", "Bookings", "Venues", "Attendees", "Speakers", "Schedule"],
	},
	{
		id: "forum",
		name: "Community Forum",
		icon: <MessageSquare className="w-4 h-4" />,
		description: "Discussion forum with topics and replies",
		tables: ["Forums", "Topics", "Posts", "Users", "Categories", "Reactions"],
	},
];

const DRAGGABLE_NODES = [
	{ id: "table", name: "Database Table", icon: <Database className="w-4 h-4" />, type: "table" },
	{ id: "transform", name: "Transform AI", icon: <Box className="w-4 h-4" />, type: "transform" },
	{ id: "enrich", name: "Enrich AI", icon: <PlusCircle className="w-4 h-4" />, type: "enrich" },
	{ id: "validate", name: "Validate AI", icon: <Settings className="w-4 h-4" />, type: "validate" },
	{ id: "merge", name: "Merge AI", icon: <Boxes className="w-4 h-4" />, type: "merge" },
];

const NAVIGATION_ITEMS = [
	{ name: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, href: "/cms" },
	{ name: "Build", icon: <Blocks className="w-4 h-4" />, href: "/cms/build" },
	{ name: "Deploy", icon: <Workflow className="w-4 h-4" />, href: "/cms/deploy" },
];

export function Sidebar() {
	const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
	const [selectedSection, setSelectedSection] = useState<string>("builder");
	const { setNodes, setEdges } = useBuildStore();

	const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string, isAI: boolean = false) => {
		event.dataTransfer.setData(isAI ? "application/aiflow" : "application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	const handlePresetClick = (preset: (typeof PRESET_FLOWS)[0]) => {
		setSelectedPreset(selectedPreset === preset.id ? null : preset.id);

		// If opening the preset, add all its tables to the flow
		if (selectedPreset !== preset.id) {
			const newNodes = preset.tables.map((table, index) => ({
				id: `${table.toLowerCase()}_${Date.now()}_${index}`,
				type: "tableNode",
				position: { x: 100 + index * 300, y: 100 + index * 100 },
				data: {
					name: table,
					details: [
						{ id: "id", label: "id", type: "UUID" },
						{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
						{ id: "updated_at", label: "updated_at", type: "TIMESTAMP" },
					],
				},
			}));

			setNodes((prevNodes: Node[]) => [...prevNodes, ...newNodes]);

			// Create edges between the nodes
			const newEdges = newNodes.slice(1).map((node, index) => ({
				id: `e${index}-${Date.now()}`,
				source: newNodes[index].id,
				target: node.id,
				sourceHandle: "id",
				targetHandle: `${newNodes[index].id}_id`,
				type: "smoothstep",
				animated: true,
				label: "1:N",
				labelStyle: { fill: "white", fontWeight: "bold" },
				labelBgStyle: { fill: "#1b1b1b" },
				markerEnd: {
					type: MarkerType.ArrowClosed,
					color: "white",
				},
				style: { stroke: "white", strokeWidth: 2 },
			}));

			setEdges((prevEdges: Edge[]) => [...prevEdges, ...newEdges]);
		}
	};

	return (
		<div className="w-80 border-r border-[#1f1f1f] bg-[#0a0a0a] flex flex-col">
			{/* Navigation Section */}
			<div className="p-4 border-b border-[#1f1f1f]">
				<div className="flex items-center gap-2">
					<Button variant="ghost" className={cn("flex-1 justify-start gap-2", selectedSection === "navigation" && "bg-[#1b1b1b]")} onClick={() => setSelectedSection("navigation")}>
						<LayoutDashboard className="w-4 h-4" />
						<span>Navigation</span>
					</Button>
					<Button variant="ghost" className={cn("flex-1 justify-start gap-2", selectedSection === "builder" && "bg-[#1b1b1b]")} onClick={() => setSelectedSection("builder")}>
						<Blocks className="w-4 h-4" />
						<span>Builder</span>
					</Button>
				</div>
			</div>

			<ScrollArea className="flex-1">
				<AnimatePresence mode="wait">
					{selectedSection === "navigation" ? (
						<motion.div key="navigation" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-4 space-y-2">
							{NAVIGATION_ITEMS.map((item) => (
								<Button key={item.name} variant="ghost" className="w-full justify-start gap-2" asChild>
									<a href={item.href}>
										{item.icon}
										{item.name}
									</a>
								</Button>
							))}
						</motion.div>
					) : (
						<motion.div key="builder" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-4 space-y-6">
							{/* Draggable Nodes Section */}
							<div>
								<h3 className="text-sm font-medium text-gray-200 mb-3">Quick Add</h3>
								<div className="grid grid-cols-2 gap-2">
									{DRAGGABLE_NODES.map((node) => (
										<div
											key={node.id}
											draggable
											onDragStart={(e) => onDragStart(e, node.name, node.id !== "table")}
											className="
                                                flex items-center gap-2 p-2 rounded-md border border-[#1f1f1f] 
                                                bg-[#1b1b1b] cursor-grab hover:bg-[#2a2a2a] hover:border-[#2f2f2f]
                                                transition-colors group
                                            "
										>
											<div className="p-1.5 rounded bg-[#2a2a2a] group-hover:bg-[#3a3a3a] transition-colors">{node.icon}</div>
											<span className="text-sm font-medium text-gray-300">{node.name}</span>
										</div>
									))}
								</div>
							</div>

							{/* Preset Flows Section */}
							<div>
								<h3 className="text-sm font-medium text-gray-200 mb-3">Preset Flows</h3>
								<div className="space-y-2">
									{PRESET_FLOWS.map((preset) => (
										<div key={preset.id} className="group">
											<Button variant="ghost" className={cn("w-full justify-between px-3 py-4 h-auto hover:bg-[#1b1b1b] text-left", selectedPreset === preset.id && "bg-[#1b1b1b]")} onClick={() => handlePresetClick(preset)}>
												<div className="flex items-start gap-3">
													<div className="p-1.5 rounded bg-[#2a2a2a] group-hover:bg-[#3a3a3a] transition-colors">{preset.icon}</div>
													<div>
														<div className="font-medium text-sm text-gray-200">{preset.name}</div>
														<div className="text-xs text-gray-400 mt-0.5">{preset.description}</div>
													</div>
												</div>
												<ChevronRight className={cn("w-4 h-4 text-gray-400 transition-transform", selectedPreset === preset.id && "rotate-90")} />
											</Button>

											<AnimatePresence>
												{selectedPreset === preset.id && (
													<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
														<div className="px-4 py-2 space-y-1">
															{preset.tables.map((table) => (
																<div
																	key={table}
																	draggable
																	onDragStart={(e) => onDragStart(e, table)}
																	className="
                                                                        flex items-center gap-2 px-3 py-1.5 rounded-md
                                                                        hover:bg-[#2a2a2a] cursor-grab text-sm text-gray-300
                                                                        transition-colors
                                                                    "
																>
																	<Database className="w-3.5 h-3.5 text-gray-400" />
																	{table}
																</div>
															))}
														</div>
													</motion.div>
												)}
											</AnimatePresence>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</ScrollArea>
		</div>
	);
}
