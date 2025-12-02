"use client";

import dynamic from "next/dynamic";
import {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type {
	Connection,
	Edge,
	Node,
	NodeChange,
	NodeTypes,
	OnConnectStartParams,
	ReactFlowInstance,
} from "reactflow";
import {
	applyNodeChanges,
	ConnectionMode,
	Handle,
	MarkerType,
	Position,
	ReactFlowProvider,
	useEdgesState,
	useReactFlow,
} from "reactflow";

import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import ReactFlow to reduce initial bundle size
const ReactFlow = dynamic(
	() => import("reactflow").then((mod) => mod.default),
	{
		ssr: false,
		loading: () => (
			<div className="space-y-4 p-6">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-96 w-full" />
				<div className="grid grid-cols-2 gap-4">
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-32 w-full" />
				</div>
			</div>
		),
	},
);

const Background = dynamic(
	() => import("reactflow").then((mod) => mod.Background),
	{
		ssr: false,
	},
);

// Import framer-motion normally but consider lazy loading for heavy animations
import { motion } from "framer-motion";

// Import reactflow styles
import "reactflow/dist/style.css";

import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
// Optimize icon imports - only import what's needed
import {
	Braces,
	Calendar,
	CircleDot,
	CreditCard,
	Database,
	DollarSign,
	FileText,
	Hash,
	Key,
	ListOrdered,
	Maximize2,
	Minus,
	Plus,
	PlusCircle,
	ShoppingCart,
	Tag,
	ToggleLeft,
	Trash2,
	Users,
} from "lucide-react";
import { AINode } from "@/components/build/ai-node";
import { Button } from "@/components/ui/button";
import { HoverTooltip } from "@/components/ui/hover-tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useBuildStore } from "./store";

// PostgreSQL data types
const POSTGRES_TYPES = [
	"UUID",
	"VARCHAR",
	"TEXT",
	"INTEGER",
	"BIGINT",
	"DECIMAL",
	"BOOLEAN",
	"DATE",
	"TIMESTAMP",
	"JSON",
	"JSONB",
	"ARRAY",
] as const;

// Add friendly names mapping
const TYPE_FRIENDLY_NAMES: Record<string, string> = {
	UUID: "ID",
	VARCHAR: "Short Text",
	TEXT: "Long Text",
	INTEGER: "Whole Number",
	BIGINT: "Large Number",
	DECIMAL: "Decimal Number",
	BOOLEAN: "Yes/No",
	DATE: "Date",
	TIMESTAMP: "Date & Time",
	JSON: "Complex Data",
	JSONB: "Complex Data (Fast)",
	ARRAY: "List",
};

// Node Types
interface TableNodeData {
	name: string;
	details: Array<{
		id: string;
		label: string;
		type: string;
	}>;
	icon?: JSX.Element | string;
	type?: string;
	description?: string;
	input?: string;
}

// Define icon type
type TableIcon = {
	value: string;
	label: string;
	icon: JSX.Element;
};

// Add more icons as needed
const TABLE_ICONS: TableIcon[] = [
	{
		value: "database",
		label: "Database",
		icon: <Database className="w-4 h-4" />,
	},
	{ value: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
	{
		value: "shopping-cart",
		label: "Products",
		icon: <ShoppingCart className="w-4 h-4" />,
	},
	{
		value: "credit-card",
		label: "Payments",
		icon: <CreditCard className="w-4 h-4" />,
	},
	{
		value: "file-text",
		label: "Orders",
		icon: <FileText className="w-4 h-4" />,
	},
	{ value: "tag", label: "Categories", icon: <Tag className="w-4 h-4" /> },
];

// Get appropriate icon for field type
const getFieldIcon = (label: string, type: string) => {
	// First check for special field names
	if (label.includes("id") && !label.includes("_id"))
		return <Key className="w-4 h-4 text-primary" />;
	if (label.includes("_id")) return <Key className="w-4 h-4 text-green-500" />;

	// Then check field types
	switch (type) {
		case "UUID":
			return <Key className="w-4 h-4 text-accent" />;
		case "VARCHAR":
		case "TEXT":
			return <FileText className="w-4 h-4 text-yellow-500" />;
		case "INTEGER":
		case "BIGINT":
			return <Hash className="w-4 h-4 text-primary" />;
		case "DECIMAL":
			return <DollarSign className="w-4 h-4 text-green-500" />;
		case "BOOLEAN":
			return <ToggleLeft className="w-4 h-4 text-orange-500" />;
		case "DATE":
		case "TIMESTAMP":
			return <Calendar className="w-4 h-4 text-pink-500" />;
		case "JSON":
		case "JSONB":
			return <Braces className="w-4 h-4 text-cyan-500" />;
		case "ARRAY":
			return <ListOrdered className="w-4 h-4 text-indigo-500" />;
		default:
			return <CircleDot className="w-4 h-4 text-muted-foreground" />;
	}
};

// Add field type descriptions
const TYPE_DESCRIPTIONS: Record<string, string> = {
	UUID: "A unique code that helps identify each item, like a special name tag",
	VARCHAR: "A short piece of text, like someone's name or a title",
	TEXT: "A long piece of text, like a description or a story",
	INTEGER: "A whole number, like counting how many items you have",
	BIGINT:
		"A really big whole number, for when you need to count lots of things",
	DECIMAL: "A number with decimal points, like money or measurements",
	BOOLEAN: "A yes/no choice, like turning a light switch on or off",
	DATE: "A calendar date, like your birthday",
	TIMESTAMP: "A date and time together, like when something happened",
	JSON: "A way to store lots of different information together",
	JSONB: "A faster way to store lots of different information together",
	ARRAY: "A list of things, like your favorite colors",
};

// Custom Node Component
function TableNode({ data, id }: { data: TableNodeData; id: string }) {
	const [isEditing, setIsEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const [selectedIcon, setSelectedIcon] = useState<TableIcon>(() =>
		getInitialIcon(data.name),
	);
	const [isIconMenuOpen, setIsIconMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const { updateNodeData, nodes } = useBuildStore();
	const [isHoveredWithConnection, setIsHoveredWithConnection] = useState(false);
	const [sourceNodeName, setSourceNodeName] = useState<string | null>(null);
	const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
	const { getNode } = useReactFlow();

	const filteredIcons = TABLE_ICONS.filter(
		(icon) =>
			icon.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
			icon.value.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	function getInitialIcon(name: string): TableIcon {
		return (
			TABLE_ICONS.find(
				(icon) =>
					icon.label.toLowerCase() === name.toLowerCase() ||
					icon.value === name.toLowerCase(),
			) || TABLE_ICONS[0]
		);
	}

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
			inputRef.current.select();
		}
	}, [isEditing]);

	const handleTitleClick = () => {
		setIsEditing(true);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateNodeData(id, { name: e.target.value });
	};

	const handleTitleBlur = () => {
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			setIsEditing(false);
		}
		if (e.key === "Escape") {
			setIsEditing(false);
			updateNodeData(id, { name: data.name });
		}
	};

	const handleIconSelect = (icon: TableIcon) => {
		setSelectedIcon(icon);
		setIsIconMenuOpen(false);
		setSearchQuery("");
		updateNodeData(id, { icon: icon.value });
	};

	// Get field type description
	const getFieldDescription = (type: string) => {
		return TYPE_FRIENDLY_NAMES[type] || type;
	};

	// Handle connection hover
	const onConnectStart = useCallback(
		(
			_event: React.MouseEvent | TouchEvent,
			params: { nodeId: string; handleId: string },
		) => {
			const sourceNode = getNode(params.nodeId);
			if (sourceNode) {
				setSourceNodeName(sourceNode.data.name.toLowerCase());
				setSourceNodeId(sourceNode.id);
			}
		},
		[getNode],
	);

	const onConnectEnd = useCallback(() => {
		setSourceNodeName(null);
		setSourceNodeId(null);
		setIsHoveredWithConnection(false);
		// Remove the preview field when connection ends
		updateNodeData(id, {
			details: data.details.filter((field) => !field.id.startsWith("preview_")),
		});
	}, [id, data.details, updateNodeData]);

	// Handle mouse enter/leave for the entire node
	const handleMouseEnter = useCallback(() => {
		if (sourceNodeName && sourceNodeId) {
			const existingConnection = data.details.some(
				(field) => field.label === `${sourceNodeId}_id`,
			);

			if (!existingConnection) {
				setIsHoveredWithConnection(true);
				// Add preview field
				const previewField = {
					id: `preview_${sourceNodeId}_id`,
					label: `${sourceNodeId}_id`,
					type: "UUID",
				};
				updateNodeData(id, {
					details: [
						...data.details.filter((field) => !field.id.startsWith("preview_")),
						previewField,
					],
				});
			}
		}
	}, [sourceNodeName, sourceNodeId, id, data.details, updateNodeData]);

	const handleMouseLeave = useCallback(() => {
		setIsHoveredWithConnection(false);
		// Remove preview field
		updateNodeData(id, {
			details: data.details.filter((field) => !field.id.startsWith("preview_")),
		});
	}, [id, data.details, updateNodeData]);

	useEffect(() => {
		const reactFlowWrapper = document.querySelector(".react-flow__pane");
		if (reactFlowWrapper) {
			// biome-ignore lint/suspicious/noExplicitAny: Event listener type mismatch
			reactFlowWrapper.addEventListener("connectstart", onConnectStart as any);
			reactFlowWrapper.addEventListener("connectend", onConnectEnd);
		}
		return () => {
			if (reactFlowWrapper) {
				// biome-ignore lint/suspicious/noExplicitAny: Event listener type mismatch
				reactFlowWrapper.removeEventListener(
					"connectstart",
					onConnectStart as any,
				);
				reactFlowWrapper.removeEventListener("connectend", onConnectEnd);
			}
		};
	}, [onConnectStart, onConnectEnd]);

	return (
		<motion.div
			className="
				w-[300px] bg-card rounded-lg border border-border 
				relative hover:border-accent transition-colors shadow-lg
				[&.selected]:border-primary [&.selected]:border-2 [&.selected]:rounded-lg
				focus:border-primary focus:border-2 focus:rounded-lg focus:outline-none
				focus-visible:border-primary focus-visible:border-2 focus-visible:rounded-lg focus-visible:outline-none
			"
			initial={false}
			animate={{ scale: 1 }}
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			tabIndex={0}
		>
			<div className="p-4 text-card-foreground relative z-10">
				<div className="flex items-start pb-2 mb-4 border-b border-border">
					<Popover open={isIconMenuOpen} onOpenChange={setIsIconMenuOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="p-0 h-auto hover:bg-transparent group"
							>
								{selectedIcon.icon}
								<span className="sr-only">Change table icon</span>
								<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-xs text-popover-foreground px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
									Change Icon
								</div>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-2" align="start">
							<div className="space-y-2">
								<Input
									type="text"
									placeholder="Search icons..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="h-8"
								/>
								<ScrollArea className="h-[200px]">
									<div className="space-y-1">
										{filteredIcons.length === 0 ? (
											<div className="py-2 px-1 text-sm text-muted-foreground">
												No icons found
											</div>
										) : (
											filteredIcons.map((icon) => (
												<Button
													key={icon.value}
													variant="ghost"
													size="sm"
													className="w-full justify-start gap-2 group"
													onClick={() => handleIconSelect(icon)}
												>
													{icon.icon}
													<span>{icon.label}</span>
												</Button>
											))
										)}
									</div>
								</ScrollArea>
							</div>
						</PopoverContent>
					</Popover>

					<div className="flex-1 ml-2">
						{isEditing ? (
							<input
								ref={inputRef}
								type="text"
								value={data.name}
								onChange={handleTitleChange}
								onBlur={handleTitleBlur}
								onKeyDown={handleKeyDown}
								className="w-full bg-transparent border-none text-lg font-bold leading-tight focus:outline-none focus:ring-1 focus:ring-primary rounded px-1 text-card-foreground"
							/>
						) : (
							<div
								className="group cursor-pointer"
								onClick={handleTitleClick}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										handleTitleClick();
									}
								}}
							>
								<h4 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors text-card-foreground">
									{data.name}
								</h4>
								<div className="absolute opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-xs text-popover-foreground px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
									Click to edit name
								</div>
							</div>
						)}
						<p className="text-xs text-muted-foreground">Database Table</p>
					</div>
				</div>

				<ul className="flex-1 space-y-2 text-sm">
					{data.details.map((detail, idx) => {
						const fieldIcon = getFieldIcon(detail.label, detail.type);
						const description = getFieldDescription(detail.type);
						const fieldName = detail.label.replace(/\s*\(.*?\)\s*/, "");
						const isPrimaryKey =
							detail.label === "id" && detail.type === "UUID";
						const isForeignKey = detail.label.includes("_id");

						return (
							<HoverTooltip key={idx} content={TYPE_DESCRIPTIONS[detail.type]}>
								<li
									className={`
										relative flex items-start px-2 py-1.5 -mx-2 rounded group 
										hover:bg-accent/30 transition-colors
										${isPrimaryKey ? "bg-primary/10" : ""}
										${isForeignKey ? "bg-green-500/10" : ""}
									`}
								>
									<div className="flex items-center flex-1 min-w-0">
										<span className="flex-shrink-0 mr-2 transition-transform group-hover:scale-110">
											{fieldIcon}
										</span>
										<span className="font-medium truncate">
											{fieldName}
											{isPrimaryKey && (
												<span className="ml-2 text-xs text-primary bg-primary/10 px-1.5 py-0.5 rounded">
													Primary Key
												</span>
											)}
											{isForeignKey && (
												<span className="ml-2 text-xs text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">
													Foreign Key
												</span>
											)}
										</span>
									</div>
									<span className="flex-shrink-0 ml-2 text-xs text-muted-foreground group-hover:text-foreground">
										{description}
									</span>

									{/* Source Handle (Left) - All fields can be sources */}
									<Handle
										type="source"
										position={Position.Left}
										id={`${detail.id}-source`}
										className={`
											!w-4 !h-4 !-left-4 !border-2 !border-card 
											hover:!bg-accent !transition-colors !cursor-crosshair
											before:content-[''] before:absolute before:w-12 before:h-12 
											before:-left-4 before:-top-4 before:opacity-0
											${isPrimaryKey ? "!bg-primary" : "!bg-muted-foreground"}
										`}
										isConnectable={true}
										isValidConnection={(connection: Connection) => {
											const targetNode = nodes.find(
												(n) => n.id === connection.target,
											);
											if (!targetNode) return false;
											if (targetNode.type === "aiNode") return true;

											// For primary keys, allow connecting to UUID fields
											if (isPrimaryKey) {
												const targetField = (
													targetNode.data as TableNodeData
												).details.find(
													(f) =>
														f.id ===
														connection.targetHandle?.replace("-target", ""),
												);
												return targetField?.type === "UUID";
											}

											// For other fields, allow connecting to AI nodes only
											return targetNode.type === "aiNode";
										}}
									/>

									{/* Target Handle (Right) - All fields can be targets */}
									<Handle
										type="target"
										position={Position.Right}
										id={`${detail.id}-target`}
										className={`
											!w-4 !h-4 !-right-4 !border-2 !border-card 
											hover:!bg-accent !transition-colors !cursor-crosshair
											before:content-[''] before:absolute before:w-12 before:h-12 
											before:-right-4 before:-top-4 before:opacity-0
											${isForeignKey ? "!bg-green-500" : "!bg-muted-foreground"}
										`}
										isConnectable={true}
										isValidConnection={(connection: Connection) => {
											const sourceNode = nodes.find(
												(n) => n.id === connection.source,
											);
											if (!sourceNode) return false;
											if (sourceNode.type === "aiNode") return true;

											// For UUID fields, allow receiving connections from primary keys
											if (detail.type === "UUID") {
												const sourceField = (
													sourceNode.data as TableNodeData
												).details.find(
													(f) =>
														f.id ===
														connection.sourceHandle?.replace("-source", ""),
												);
												return (
													sourceField?.label === "id" &&
													sourceField?.type === "UUID"
												);
											}

											// For other fields, allow connecting from AI nodes only
											return sourceNode.type === "aiNode";
										}}
									/>
								</li>
							</HoverTooltip>
						);
					})}
				</ul>
			</div>

			{/* Connection Preview */}
			{isHoveredWithConnection && sourceNodeName && (
				<div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-foreground/90 to-transparent">
					<div className="text-xs text-background">
						<span className="text-green-400">New Connection:</span>{" "}
						{sourceNodeName} �� {data.name}
					</div>
				</div>
			)}
		</motion.div>
	);
}

// Initial nodes
const initialNodes: Node<TableNodeData>[] = [
	// User Management Group (Top Left)
	{
		id: "users",
		type: "tableNode",
		position: { x: 100, y: 100 },
		data: {
			name: "Users",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "email", label: "email", type: "VARCHAR" },
				{ id: "username", label: "username", type: "VARCHAR" },
				{ id: "password_hash", label: "password_hash", type: "VARCHAR" },
				{ id: "first_name", label: "first_name", type: "VARCHAR" },
				{ id: "last_name", label: "last_name", type: "VARCHAR" },
				{ id: "avatar_url", label: "avatar_url", type: "VARCHAR" },
				{ id: "bio", label: "bio", type: "TEXT" },
				{ id: "role_id", label: "role_id", type: "UUID" },
				{ id: "is_verified", label: "is_verified", type: "BOOLEAN" },
				{ id: "last_login", label: "last_login", type: "TIMESTAMP" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
				{ id: "updated_at", label: "updated_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "roles",
		type: "tableNode",
		position: { x: 500, y: 100 },
		data: {
			name: "Roles",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "name", label: "name", type: "VARCHAR" },
				{ id: "description", label: "description", type: "TEXT" },
				{ id: "permissions", label: "permissions", type: "JSONB" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "user_sessions",
		type: "tableNode",
		position: { x: 900, y: 100 },
		data: {
			name: "UserSessions",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "user_id", label: "user_id", type: "UUID" },
				{ id: "token", label: "token", type: "VARCHAR" },
				{ id: "ip_address", label: "ip_address", type: "VARCHAR" },
				{ id: "user_agent", label: "user_agent", type: "VARCHAR" },
				{ id: "expires_at", label: "expires_at", type: "TIMESTAMP" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},

	// Content Management Group (Center Left)
	{
		id: "pages",
		type: "tableNode",
		position: { x: 100, y: 500 },
		data: {
			name: "Pages",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "title", label: "title", type: "VARCHAR" },
				{ id: "slug", label: "slug", type: "VARCHAR" },
				{ id: "content", label: "content", type: "TEXT" },
				{ id: "meta_title", label: "meta_title", type: "VARCHAR" },
				{ id: "meta_description", label: "meta_description", type: "TEXT" },
				{ id: "layout_id", label: "layout_id", type: "UUID" },
				{ id: "author_id", label: "author_id", type: "UUID" },
				{ id: "status", label: "status", type: "VARCHAR" },
				{ id: "published_at", label: "published_at", type: "TIMESTAMP" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
				{ id: "updated_at", label: "updated_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "posts",
		type: "tableNode",
		position: { x: 500, y: 500 },
		data: {
			name: "Posts",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "title", label: "title", type: "VARCHAR" },
				{ id: "slug", label: "slug", type: "VARCHAR" },
				{ id: "excerpt", label: "excerpt", type: "TEXT" },
				{ id: "content", label: "content", type: "TEXT" },
				{ id: "featured_image", label: "featured_image", type: "VARCHAR" },
				{ id: "author_id", label: "author_id", type: "UUID" },
				{ id: "category_id", label: "category_id", type: "UUID" },
				{ id: "status", label: "status", type: "VARCHAR" },
				{ id: "published_at", label: "published_at", type: "TIMESTAMP" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
				{ id: "updated_at", label: "updated_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "categories",
		type: "tableNode",
		position: { x: 900, y: 500 },
		data: {
			name: "Categories",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "name", label: "name", type: "VARCHAR" },
				{ id: "slug", label: "slug", type: "VARCHAR" },
				{ id: "description", label: "description", type: "TEXT" },
				{ id: "parent_id", label: "parent_id", type: "UUID" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "tags",
		type: "tableNode",
		position: { x: 1300, y: 500 },
		data: {
			name: "Tags",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "name", label: "name", type: "VARCHAR" },
				{ id: "slug", label: "slug", type: "VARCHAR" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "post_tags",
		type: "tableNode",
		position: { x: 1700, y: 500 },
		data: {
			name: "PostTags",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "post_id", label: "post_id", type: "UUID" },
				{ id: "tag_id", label: "tag_id", type: "UUID" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},

	// Media Management Group (Bottom Left)
	{
		id: "media",
		type: "tableNode",
		position: { x: 100, y: 900 },
		data: {
			name: "Media",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "filename", label: "filename", type: "VARCHAR" },
				{
					id: "original_filename",
					label: "original_filename",
					type: "VARCHAR",
				},
				{ id: "mime_type", label: "mime_type", type: "VARCHAR" },
				{ id: "size", label: "size", type: "INTEGER" },
				{ id: "width", label: "width", type: "INTEGER" },
				{ id: "height", label: "height", type: "INTEGER" },
				{ id: "url", label: "url", type: "VARCHAR" },
				{ id: "thumbnail_url", label: "thumbnail_url", type: "VARCHAR" },
				{ id: "alt_text", label: "alt_text", type: "VARCHAR" },
				{ id: "uploaded_by", label: "uploaded_by", type: "UUID" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},

	// Navigation Group (Center)
	{
		id: "menus",
		type: "tableNode",
		position: { x: 500, y: 900 },
		data: {
			name: "Menus",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "name", label: "name", type: "VARCHAR" },
				{ id: "location", label: "location", type: "VARCHAR" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "menu_items",
		type: "tableNode",
		position: { x: 900, y: 900 },
		data: {
			name: "MenuItems",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "menu_id", label: "menu_id", type: "UUID" },
				{ id: "parent_id", label: "parent_id", type: "UUID" },
				{ id: "title", label: "title", type: "VARCHAR" },
				{ id: "url", label: "url", type: "VARCHAR" },
				{ id: "target", label: "target", type: "VARCHAR" },
				{ id: "order", label: "order", type: "INTEGER" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},

	// Forms Group (Center Right)
	{
		id: "forms",
		type: "tableNode",
		position: { x: 100, y: 1300 },
		data: {
			name: "Forms",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "name", label: "name", type: "VARCHAR" },
				{ id: "description", label: "description", type: "TEXT" },
				{ id: "fields", label: "fields", type: "JSONB" },
				{ id: "success_message", label: "success_message", type: "TEXT" },
				{
					id: "notification_email",
					label: "notification_email",
					type: "VARCHAR",
				},
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "form_submissions",
		type: "tableNode",
		position: { x: 500, y: 1300 },
		data: {
			name: "FormSubmissions",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "form_id", label: "form_id", type: "UUID" },
				{ id: "data", label: "data", type: "JSONB" },
				{ id: "ip_address", label: "ip_address", type: "VARCHAR" },
				{ id: "user_agent", label: "user_agent", type: "VARCHAR" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},

	// SEO and Analytics Group (Bottom Right)
	{
		id: "seo_settings",
		type: "tableNode",
		position: { x: 900, y: 1300 },
		data: {
			name: "SeoSettings",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "page_id", label: "page_id", type: "UUID" },
				{ id: "meta_title", label: "meta_title", type: "VARCHAR" },
				{ id: "meta_description", label: "meta_description", type: "TEXT" },
				{ id: "og_title", label: "og_title", type: "VARCHAR" },
				{ id: "og_description", label: "og_description", type: "TEXT" },
				{ id: "og_image", label: "og_image", type: "VARCHAR" },
				{ id: "twitter_card", label: "twitter_card", type: "VARCHAR" },
				{ id: "canonical_url", label: "canonical_url", type: "VARCHAR" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
				{ id: "updated_at", label: "updated_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "page_views",
		type: "tableNode",
		position: { x: 1300, y: 1300 },
		data: {
			name: "PageViews",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "page_id", label: "page_id", type: "UUID" },
				{ id: "session_id", label: "session_id", type: "VARCHAR" },
				{ id: "user_id", label: "user_id", type: "UUID" },
				{ id: "ip_address", label: "ip_address", type: "VARCHAR" },
				{ id: "user_agent", label: "user_agent", type: "VARCHAR" },
				{ id: "referrer", label: "referrer", type: "VARCHAR" },
				{ id: "duration", label: "duration", type: "INTEGER" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},

	// Comments and Interactions Group (Far Right)
	{
		id: "comments",
		type: "tableNode",
		position: { x: 100, y: 1700 },
		data: {
			name: "Comments",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "post_id", label: "post_id", type: "UUID" },
				{ id: "user_id", label: "user_id", type: "UUID" },
				{ id: "parent_id", label: "parent_id", type: "UUID" },
				{ id: "content", label: "content", type: "TEXT" },
				{ id: "status", label: "status", type: "VARCHAR" },
				{ id: "ip_address", label: "ip_address", type: "VARCHAR" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
				{ id: "updated_at", label: "updated_at", type: "TIMESTAMP" },
			],
		},
	},
	{
		id: "reactions",
		type: "tableNode",
		position: { x: 500, y: 1700 },
		data: {
			name: "Reactions",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "user_id", label: "user_id", type: "UUID" },
				{ id: "post_id", label: "post_id", type: "UUID" },
				{ id: "type", label: "type", type: "VARCHAR" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
			],
		},
	},

	// Settings Group (Bottom)
	{
		id: "settings",
		type: "tableNode",
		position: { x: 900, y: 1700 },
		data: {
			name: "Settings",
			details: [
				{ id: "id", label: "id", type: "UUID" },
				{ id: "key", label: "key", type: "VARCHAR" },
				{ id: "value", label: "value", type: "TEXT" },
				{ id: "type", label: "type", type: "VARCHAR" },
				{ id: "created_at", label: "created_at", type: "TIMESTAMP" },
				{ id: "updated_at", label: "updated_at", type: "TIMESTAMP" },
			],
		},
	},
];

// Remove initial edges
const initialEdges: Edge[] = [
	// User Management Connections
	{
		id: "roles-users",
		source: "roles",
		target: "users",
		sourceHandle: "id-source",
		targetHandle: "role_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "users-user_sessions",
		source: "users",
		target: "user_sessions",
		sourceHandle: "id-source",
		targetHandle: "user_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},

	// Content Management Connections
	{
		id: "users-pages",
		source: "users",
		target: "pages",
		sourceHandle: "id-source",
		targetHandle: "author_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "users-posts",
		source: "users",
		target: "posts",
		sourceHandle: "id-source",
		targetHandle: "author_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "categories-posts",
		source: "categories",
		target: "posts",
		sourceHandle: "id-source",
		targetHandle: "category_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "categories-categories",
		source: "categories",
		target: "categories",
		sourceHandle: "id-source",
		targetHandle: "parent_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "posts-post_tags",
		source: "posts",
		target: "post_tags",
		sourceHandle: "id-source",
		targetHandle: "post_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "tags-post_tags",
		source: "tags",
		target: "post_tags",
		sourceHandle: "id-source",
		targetHandle: "tag_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},

	// Media Management Connections
	{
		id: "users-media",
		source: "users",
		target: "media",
		sourceHandle: "id-source",
		targetHandle: "uploaded_by-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},

	// Navigation Connections
	{
		id: "menus-menu_items",
		source: "menus",
		target: "menu_items",
		sourceHandle: "id-source",
		targetHandle: "menu_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "menu_items-menu_items",
		source: "menu_items",
		target: "menu_items",
		sourceHandle: "id-source",
		targetHandle: "parent_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},

	// Forms Connections
	{
		id: "forms-form_submissions",
		source: "forms",
		target: "form_submissions",
		sourceHandle: "id-source",
		targetHandle: "form_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},

	// SEO and Analytics Connections
	{
		id: "pages-seo_settings",
		source: "pages",
		target: "seo_settings",
		sourceHandle: "id-source",
		targetHandle: "page_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "pages-page_views",
		source: "pages",
		target: "page_views",
		sourceHandle: "id-source",
		targetHandle: "page_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "users-page_views",
		source: "users",
		target: "page_views",
		sourceHandle: "id-source",
		targetHandle: "user_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},

	// Comments and Interactions Connections
	{
		id: "posts-comments",
		source: "posts",
		target: "comments",
		sourceHandle: "id-source",
		targetHandle: "post_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "users-comments",
		source: "users",
		target: "comments",
		sourceHandle: "id-source",
		targetHandle: "user_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "comments-comments",
		source: "comments",
		target: "comments",
		sourceHandle: "id-source",
		targetHandle: "parent_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "users-reactions",
		source: "users",
		target: "reactions",
		sourceHandle: "id-source",
		targetHandle: "user_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
	{
		id: "posts-reactions",
		source: "posts",
		target: "reactions",
		sourceHandle: "id-source",
		targetHandle: "post_id-target",
		type: "smoothstep",
		animated: true,
		label: "1:N",
		labelStyle: { fill: "white", fontWeight: "bold" },
		labelBgStyle: { fill: "#1b1b1b" },
		markerEnd: { type: MarkerType.ArrowClosed, color: "white" },
		style: { stroke: "white", strokeWidth: 2 },
	},
];

// Node types definition
const _nodeTypes: NodeTypes = {
	tableNode: TableNode,
	aiNode: AINode,
};

// Field Item Component
function FieldItem({
	field,
	nodeId,
	isPrimaryKey,
	isForeignKey,
}: {
	field: { id: string; label: string; type: string };
	nodeId: string;
	isPrimaryKey: boolean;
	isForeignKey: boolean;
}) {
	const { updateField, deleteField } = useBuildStore();
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: field.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<HoverTooltip content={TYPE_DESCRIPTIONS[field.type]}>
			<div
				ref={setNodeRef}
				style={style}
				className="p-2 space-y-1.5 rounded-md border border-border bg-card hover:border-accent transition-colors"
			>
				<div className="flex items-center gap-2">
					<div
						{...attributes}
						{...listeners}
						className="cursor-grab hover:text-foreground text-muted-foreground"
					>
						<DragHandleDots2Icon className="h-4 w-4" />
					</div>
					<div className="flex-1">
						<Input
							value={field.label}
							onChange={(e) =>
								updateField(nodeId, field.id, { label: e.target.value })
							}
							className="h-7 bg-muted border-border hover:border-accent focus:border-primary text-foreground text-sm focus:ring-offset-0"
						/>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => deleteField(nodeId, field.id)}
						className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
					>
						<Trash2 className="h-3.5 w-3.5" />
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<Select
						defaultValue={field.type}
						value={field.type}
						onValueChange={(value) =>
							updateField(nodeId, field.id, { type: value })
						}
					>
						<SelectTrigger className="h-7 bg-muted border-border hover:border-accent focus:border-primary text-foreground text-sm">
							<SelectValue placeholder={TYPE_FRIENDLY_NAMES[field.type]} />
						</SelectTrigger>
						<SelectContent className="bg-popover border-border">
							{POSTGRES_TYPES.map((type) => (
								<SelectItem
									key={type}
									value={type}
									className="text-sm text-popover-foreground hover:bg-accent focus:bg-accent focus:text-accent-foreground"
								>
									<div className="flex items-center gap-2">
										{getFieldIcon("", type)}
										<span>{TYPE_FRIENDLY_NAMES[type]}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				{(isPrimaryKey || isForeignKey) && (
					<div className="text-[10px] font-medium text-muted-foreground">
						{isPrimaryKey
							? "This is the main ID - Like a name tag that other tables can use to find this item"
							: "This connects to another table - Like saying this belongs to something else"}
					</div>
				)}
			</div>
		</HoverTooltip>
	);
}

// SidebarContent Component
function SidebarContent({ node }: { node: Node<TableNodeData> }) {
	const { updateNodeData, addField, deleteField } = useBuildStore();
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor),
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (active.id !== over.id) {
			const oldIndex = node.data.details.findIndex(
				(field) => field.id === active.id,
			);
			const newIndex = node.data.details.findIndex(
				(field) => field.id === over.id,
			);
			const newDetails = [...node.data.details];
			const [removed] = newDetails.splice(oldIndex, 1);
			newDetails.splice(newIndex, 0, removed);
			updateNodeData(node.id, { details: newDetails });
		}
	};

	return (
		<div className="h-full p-3 space-y-4">
			<div className="space-y-3">
				<div className="space-y-1.5">
					<Label className="text-xs font-medium text-foreground">
						Table Name
					</Label>
					<Input
						value={node.data.name}
						onChange={(e) => {
							updateNodeData(node.id, { name: e.target.value });
						}}
						className="h-8 bg-muted border-border hover:border-accent focus:border-primary text-foreground text-sm font-medium"
					/>
					<p className="text-xs text-muted-foreground">Database Table</p>
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label className="text-xs font-medium text-foreground">
							Fields
						</Label>
						<Button
							variant="secondary"
							size="sm"
							onClick={() =>
								addField(node.id, {
									id: `field_${Date.now()}`,
									label: "new_field",
									type: "VARCHAR",
								})
							}
							className="h-7 text-xs px-2.5 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
						>
							<PlusCircle className="w-3.5 h-3.5 mr-1.5" />
							Add Field
						</Button>
					</div>

					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={node.data.details.map((field) => field.id)}
							strategy={verticalListSortingStrategy}
						>
							<div className="space-y-2">
								{node.data.details.map((field) => {
									const isPrimaryKey =
										field.label.includes("id") && !field.label.includes("_id");
									const isForeignKey = field.label.includes("_id");
									return (
										<FieldItem
											key={field.id}
											field={field}
											nodeId={node.id}
											isPrimaryKey={isPrimaryKey}
											isForeignKey={isForeignKey}
										/>
									);
								})}
							</div>
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</div>
	);
}

// Add this component near the top with other components
function NodeSelector({
	position,
	onSelect,
	onClose,
}: {
	position: { x: number; y: number };
	onSelect: (nodeId: string) => void;
	onClose: () => void;
}) {
	const { nodes } = useBuildStore();
	const [searchQuery, setSearchQuery] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const { getZoom } = useReactFlow();
	const zoom = getZoom();

	useEffect(() => {
		setIsVisible(true);
		const handleClickOutside = (e: MouseEvent) => {
			if (!(e.target as Element).closest(".node-selector")) {
				onClose();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	const filteredNodes = nodes.filter((node) =>
		node.data.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div
			className="absolute z-50"
			style={{
				left: position.x,
				top: position.y,
				transform: `scale(${Math.max(0.5, 1 / zoom)})`,
				transformOrigin: "top left",
			}}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }}
				className="node-selector w-48 bg-popover border border-border rounded-lg shadow-xl"
			>
				<div className="p-2">
					<Input
						type="text"
						placeholder="Search nodes..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-7 bg-muted border-border hover:border-accent focus:border-primary text-foreground placeholder:text-muted-foreground text-xs"
						autoFocus
					/>
				</div>
				<ScrollArea className="h-48">
					<div className="p-1">
						{filteredNodes.length === 0 ? (
							<div className="px-2 py-1 text-xs text-muted-foreground">
								No nodes found
							</div>
						) : (
							filteredNodes.map((node) => (
								<Button
									key={node.id}
									variant="ghost"
									className="w-full justify-start gap-2 px-2 py-1 text-xs text-left text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
									onClick={() => onSelect(node.id)}
								>
									<div className="flex items-center gap-2">
										<Database className="w-3 h-3 text-muted-foreground" />
										<span className="font-medium">{node.data.name}</span>
									</div>
								</Button>
							))
						)}
					</div>
				</ScrollArea>
			</motion.div>
		</div>
	);
}

function Flow() {
	const {
		selectedNode,
		setSelectedNode,
		setRightSidebarContent,
		openRightSidebar,
		updateNodePosition,
		loadNodePositions,
		findAvailablePosition,
		initializePositions,
		nodes,
		setNodes,
	} = useBuildStore();
	const { toast } = useToast();
	const {
		zoomIn: flowZoomIn,
		zoomOut: flowZoomOut,
		fitView,
		setCenter,
		getViewport,
	} = useReactFlow();
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [reactFlowInstance, setReactFlowInstance] =
		useState<ReactFlowInstance | null>(null);
	const reactFlowWrapper = useRef<HTMLDivElement>(null);

	// Memoize nodeTypes to prevent React Flow warning about new object creation
	const memoizedNodeTypes = useMemo(
		() => ({
			tableNode: TableNode,
			aiNode: AINode,
		}),
		[],
	);

	// Add these new states at the top of the Flow component
	const [_sourceNodeName, setSourceNodeName] = useState<string | null>(null);
	const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
	const [_isHoveredWithConnection, setIsHoveredWithConnection] =
		useState(false);
	const [nodeSelector, setNodeSelector] = useState<{
		visible: boolean;
		position: { x: number; y: number };
		sourceHandle: string | null;
		sourceNode: string | null;
	}>({
		visible: false,
		position: { x: 0, y: 0 },
		sourceHandle: null,
		sourceNode: null,
	});

	// Store toast function in a ref to use it in callbacks
	const toastRef = useRef(toast);
	useEffect(() => {
		toastRef.current = toast;
	}, [toast]);

	const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent<HTMLDivElement>) => {
			event.preventDefault();

			const type = event.dataTransfer.getData("application/reactflow");
			const aiType = event.dataTransfer.getData("application/aiflow");

			if (typeof type === "undefined" && !aiType) {
				return;
			}

			const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
			const position = reactFlowInstance?.screenToFlowPosition({
				x: event.clientX - (reactFlowBounds?.left ?? 0),
				y: event.clientY - (reactFlowBounds?.top ?? 0),
			}) || { x: 0, y: 0 };

			// Check if we're dropping on an edge
			const droppedOnEdge = edges.find((edge) => {
				const edgeElement = document.querySelector(
					`[data-edge-id="${edge.id}"]`,
				);
				if (!edgeElement) return false;
				const edgeBounds = edgeElement.getBoundingClientRect();
				return (
					event.clientX >= edgeBounds.left &&
					event.clientX <= edgeBounds.right &&
					event.clientY >= edgeBounds.top &&
					event.clientY <= edgeBounds.bottom
				);
			});

			if (aiType && droppedOnEdge) {
				// Create AI node
				const newNode = {
					id: `ai-${Date.now()}`,
					type: "aiNode",
					position,
					data: {
						type: aiType,
						description: "",
						input: `Transform data from source to target...`,
					},
				};

				// Create new edges
				const newEdge1 = {
					id: `e-${Date.now()}-1`,
					source: droppedOnEdge.source,
					target: newNode.id,
					sourceHandle: droppedOnEdge.sourceHandle,
					targetHandle: "target",
					type: "smoothstep",
					animated: true,
					label: droppedOnEdge.label,
					labelStyle: { fill: "white", fontWeight: "bold" },
					labelBgStyle: { fill: "#1b1b1b" },
					markerEnd: {
						type: MarkerType.ArrowClosed,
						color: "white",
					},
					style: { stroke: "white", strokeWidth: 2 },
				};

				const newEdge2 = {
					id: `e-${Date.now()}-2`,
					source: newNode.id,
					target: droppedOnEdge.target,
					sourceHandle: "source",
					targetHandle: droppedOnEdge.targetHandle,
					type: "smoothstep",
					animated: true,
					label: droppedOnEdge.label,
					labelStyle: { fill: "white", fontWeight: "bold" },
					labelBgStyle: { fill: "#1b1b1b" },
					markerEnd: {
						type: MarkerType.ArrowClosed,
						color: "white",
					},
					style: { stroke: "white", strokeWidth: 2 },
				};

				// Remove old edge and add new node and edges
				setEdges((eds) =>
					eds
						.filter((e) => e.id !== droppedOnEdge.id)
						.concat([newEdge1, newEdge2]),
				);
				setNodes((nds) => nds.concat(newNode));
				return;
			}

			// Handle normal node creation
			if (type) {
				const newNode = {
					id: `${type.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`,
					type: "tableNode",
					position,
					data: {
						name: type,
						details: [{ id: "id", label: "id", type: "UUID" }],
					},
				};
				setNodes((nds) => nds.concat(newNode));
			}
		},
		[reactFlowInstance, edges, setNodes, setEdges],
	);

	// Initialize positions from localStorage
	useEffect(() => {
		const savedPositions = loadNodePositions();
		if (Object.keys(savedPositions).length > 0) {
			initializePositions(savedPositions);
			const updatedNodes = initialNodes.map((node) => ({
				...node,
				position: savedPositions[node.id] || node.position,
			}));
			setNodes(updatedNodes);
		} else {
			setNodes(initialNodes);
		}
	}, [initializePositions, loadNodePositions, setNodes]);

	// Handle node drag stop
	const handleNodeDragStop = useCallback(
		(_event: React.MouseEvent, node: Node<TableNodeData>) => {
			const { id, position } = node;
			updateNodePosition(id, position);
		},
		[updateNodePosition],
	);

	// Handle node selection
	const handleNodesChange = useCallback(
		(changes: NodeChange[]) => {
			const selectionChange = changes.find(
				(change) => change.type === "select",
			) as { type: "select"; id: string; selected: boolean } | undefined;

			if (selectionChange) {
				const node = nodes.find((n) => n.id === selectionChange.id);
				if (selectionChange.selected) {
					setSelectedNode(node || null);
					openRightSidebar();
				} else if (
					changes.length === 1 &&
					!changes.some((change) => change.type === "select" && change.selected)
				) {
					setSelectedNode(null);
				}
			}

			const nextNodes = applyNodeChanges(
				changes,
				nodes,
			) as Node<TableNodeData>[];
			setNodes(nextNodes);
		},
		[nodes, setNodes, setSelectedNode, openRightSidebar],
	);

	// Function to add a new node
	const addNewNode = useCallback(
		(type: string = "New Table", data: any = []) => {
			const newNodeId = `${type.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}`;
			const position = findAvailablePosition(nodes);

			const newNode: Node<TableNodeData> = {
				id: newNodeId,
				type: "tableNode",
				position,
				data: {
					name: type,
					details: [{ id: "id", label: "id", type: "UUID" }, ...data],
				},
			};

			setNodes((nds: Node[]) => [...nds, newNode]);
			updateNodePosition(newNodeId, position);

			// Use RAF to ensure DOM is updated before animation
			requestAnimationFrame(() => {
				setCenter(position.x + 150, position.y + 100, {
					zoom: 1,
					duration: 1000,
				});
			});

			return newNode;
		},
		[nodes, setNodes, setCenter, findAvailablePosition, updateNodePosition],
	);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === "n") {
				event.preventDefault();
				addNewNode();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [addNewNode]);

	// Update the onConnect function to handle connections properly
	const onConnect = useCallback(
		(params: Connection) => {
			if (
				!params.source ||
				!params.target ||
				!params.sourceHandle ||
				!params.targetHandle
			) {
				toastRef.current({
					title: "Connection Failed",
					description: "Please ensure both source and target are selected.",
					variant: "destructive",
				});
				return;
			}

			const sourceNodeId = params.source;
			const targetNodeId = params.target;

			// Prevent self-connections
			if (sourceNodeId === targetNodeId) {
				toastRef.current({
					title: "Invalid Connection",
					description: "Cannot connect a node to itself.",
					variant: "destructive",
				});
				return;
			}

			const sourceNode = nodes.find((node) => node.id === sourceNodeId);
			const targetNode = nodes.find((node) => node.id === targetNodeId);

			if (!sourceNode || !targetNode) {
				toastRef.current({
					title: "Connection Error",
					description: "Could not find the nodes to connect. Please try again.",
					variant: "destructive",
				});
				return;
			}

			// If either node is an AI node, allow the connection
			if (sourceNode.type === "aiNode" || targetNode.type === "aiNode") {
				const newEdge: Edge = {
					id: `${sourceNodeId}-${targetNodeId}-${Date.now()}`,
					source: sourceNodeId,
					target: targetNodeId,
					sourceHandle: params.sourceHandle,
					targetHandle: params.targetHandle,
					type: "smoothstep",
					animated: true,
					label: "AI",
					labelStyle: { fill: "white", fontWeight: "bold" },
					labelBgStyle: { fill: "#1b1b1b" },
					markerEnd: {
						type: MarkerType.ArrowClosed,
						color: "white",
					},
					style: { stroke: "white", strokeWidth: 2 },
				};
				setEdges((eds) => [...eds, newEdge]);
				return;
			}

			// For table nodes, validate primary key to foreign key connections
			const sourceField = sourceNode.data.details.find(
				(field: { id: string; label: string; type: string }) =>
					field.id === params.sourceHandle,
			);
			const targetField = targetNode.data.details.find(
				(field: { id: string; label: string; type: string }) =>
					field.id === params.targetHandle,
			);

			if (!sourceField || !targetField) {
				toastRef.current({
					title: "Connection Error",
					description:
						"Could not find the fields to connect. Please try again.",
					variant: "destructive",
				});
				return;
			}

			// Validate that source is a primary key
			if (!(sourceField.label === "id" && sourceField.type === "UUID")) {
				toastRef.current({
					title: "Invalid Connection",
					description:
						"You can only connect from a primary key (blue) to create relationships.",
					variant: "destructive",
				});
				return;
			}

			// Create the edge with improved styling
			const newEdge: Edge = {
				id: `${sourceNodeId}-${targetNodeId}-${Date.now()}`,
				source: sourceNodeId,
				target: targetNodeId,
				sourceHandle: params.sourceHandle,
				targetHandle: params.targetHandle,
				type: "smoothstep",
				animated: true,
				label: "1:N",
				labelStyle: { fill: "#3b82f6", fontWeight: "bold" },
				labelBgStyle: { fill: "#1b1b1b" },
				markerEnd: {
					type: MarkerType.ArrowClosed,
					color: "#3b82f6",
					width: 20,
					height: 20,
				},
				style: { stroke: "#3b82f6", strokeWidth: 3 },
			};

			// Update the target field to be a foreign key
			const updatedNodes = nodes.map((node) => {
				if (node.id === targetNodeId) {
					return {
						...node,
						data: {
							...node.data,
							details: node.data.details.map(
								(field: { id: string; label: string; type: string }) => {
									if (field.id === params.targetHandle) {
										return {
											...field,
											label: `${sourceNodeId}_id`,
											type: "UUID",
										};
									}
									return field;
								},
							),
						},
					};
				}
				return node;
			});

			setNodes(updatedNodes);
			setEdges((eds) => [...eds, newEdge]);

			toastRef.current({
				title: "Connection Created",
				description: `Successfully connected ${sourceNode.data.name} to ${targetNode.data.name}!`,
			});
		},
		[nodes, setEdges, setNodes],
	);

	// Update sidebar content when node is selected
	useEffect(() => {
		if (selectedNode) {
			const currentNode = nodes.find((n) => n.id === selectedNode.id);
			if (!currentNode) return;
			setRightSidebarContent(<SidebarContent node={currentNode} />);
		} else {
			setRightSidebarContent(null);
		}
	}, [selectedNode, nodes, setRightSidebarContent]);

	// Listen for add table events
	useEffect(() => {
		const handleAddTable = () => {
			addNewNode();
		};

		window.addEventListener("build:addTable", handleAddTable);
		return () => window.removeEventListener("build:addTable", handleAddTable);
	}, [addNewNode]);

	// Add this new handler
	const onConnectStart = useCallback(
		(
			_event: React.MouseEvent | React.TouchEvent,
			params: OnConnectStartParams,
		) => {
			if (params.nodeId && params.handleId) {
				const sourceNode = nodes.find((n) => n.id === params.nodeId);
				if (sourceNode) {
					setSourceNodeName(sourceNode.data.name.toLowerCase());
					setSourceNodeId(params.nodeId);
				}
			}
		},
		[nodes],
	);

	// Add this new handler
	const onConnectEnd = useCallback(
		(event: MouseEvent | TouchEvent) => {
			const target = event?.target as Element | null;
			if (!target) return;

			const targetIsNode = target.closest(".react-flow__node");
			const targetIsPane = target.classList.contains("react-flow__pane");

			if (!targetIsNode && targetIsPane && sourceNodeId) {
				// Only show selector if we have a source node
				const bounds = reactFlowWrapper.current?.getBoundingClientRect();
				const position = {
					x:
						event instanceof MouseEvent
							? event.clientX - (bounds?.left || 0)
							: 0,
					y:
						event instanceof MouseEvent
							? event.clientY - (bounds?.top || 0)
							: 0,
				};

				setNodeSelector({
					visible: true,
					position,
					sourceHandle: sourceNodeId,
					sourceNode: sourceNodeId,
				});
			} else {
				setNodeSelector((prev) => ({ ...prev, visible: false }));
			}

			setSourceNodeName(null);
			setSourceNodeId(null);
			setIsHoveredWithConnection(false);
		},
		[sourceNodeId],
	);

	// Add this new handler
	const handleNodeSelection = useCallback(
		(targetNodeId: string) => {
			if (nodeSelector.sourceNode && nodeSelector.sourceHandle) {
				// Create the connection
				const params: Connection = {
					source: nodeSelector.sourceNode,
					sourceHandle: nodeSelector.sourceHandle,
					target: targetNodeId,
					targetHandle: "id", // Default to connecting to the ID field
				};
				onConnect(params);
			}
			setNodeSelector((prev) => ({ ...prev, visible: false }));
		},
		[nodeSelector, onConnect],
	);

	return (
		<div className="h-full relative bg-background" ref={reactFlowWrapper}>
			{/* Custom Zoom Controls */}
			<div className="absolute z-20 flex flex-col gap-2 -translate-y-1/2 left-4 top-1/2">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => flowZoomIn()}
					className="bg-card border border-border hover:bg-accent text-foreground"
				>
					<Plus className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => flowZoomOut()}
					className="bg-card border border-border hover:bg-accent text-foreground"
				>
					<Minus className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => fitView({ padding: 0.2 })}
					className="bg-card border border-border hover:bg-accent text-foreground"
				>
					<Maximize2 className="w-4 h-4" />
				</Button>
			</div>

			<Suspense
				fallback={
					<div className="flex items-center justify-center h-full bg-background">
						<div className="text-muted-foreground">Loading...</div>
					</div>
				}
			>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={handleNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onConnectStart={onConnectStart}
					onConnectEnd={onConnectEnd}
					onNodeDragStop={handleNodeDragStop}
					nodeTypes={memoizedNodeTypes}
					onInit={setReactFlowInstance}
					onDrop={onDrop}
					onDragOver={onDragOver}
					fitView
					fitViewOptions={{ padding: 0.5, maxZoom: 0.8 }}
					defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
					minZoom={0.2}
					maxZoom={4}
					defaultEdgeOptions={{
						type: "smoothstep",
						style: { stroke: "#3b82f6", strokeWidth: 3 },
						animated: true,
						markerEnd: {
							type: MarkerType.ArrowClosed,
							color: "#3b82f6",
							width: 20,
							height: 20,
						},
						labelStyle: { fill: "#3b82f6", fontWeight: "bold" },
						labelBgStyle: { fill: "#1b1b1b" },
					}}
					proOptions={{ hideAttribution: true }}
					className="react-flow-dark h-full"
					snapToGrid
					snapGrid={[16, 16]}
					connectOnClick={false}
					selectNodesOnDrag={false}
					connectionMode={ConnectionMode.Loose}
				>
					<Background color="hsl(var(--muted))" gap={16} />
					{nodeSelector.visible && (
						<NodeSelector
							position={nodeSelector.position}
							onSelect={handleNodeSelection}
							onClose={() =>
								setNodeSelector((prev) => ({ ...prev, visible: false }))
							}
						/>
					)}
				</ReactFlow>
			</Suspense>
		</div>
	);
}

export default function BuildPage() {
	return (
		<div className="h-full w-full">
			<ReactFlowProvider>
				<Suspense
					fallback={
						<div className="space-y-4 p-6">
							<Skeleton className="h-10 w-full" />
							<Skeleton className="h-96 w-full" />
							<div className="grid grid-cols-2 gap-4">
								<Skeleton className="h-32 w-full" />
								<Skeleton className="h-32 w-full" />
							</div>
						</div>
					}
				>
					<Flow />
				</Suspense>
			</ReactFlowProvider>
		</div>
	);
}
