import { create } from "zustand";
import { Node, XYPosition, Edge } from "reactflow";
import { TableNodeData } from "./types";

interface BuildStore {
	nodes: Node<TableNodeData>[];
	edges: Edge[];
	selectedNode: Node | null;
	rightSidebarContent: React.ReactNode | null;
	isRightSidebarOpen: boolean;
	setNodes: (nodes: Node<TableNodeData>[] | ((prev: Node<TableNodeData>[]) => Node<TableNodeData>[])) => void;
	setSelectedNode: (node: Node | null) => void;
	setRightSidebarContent: (content: React.ReactNode | null) => void;
	openRightSidebar: () => void;
	closeRightSidebar: () => void;
	updateNodeData: (nodeId: string, data: Partial<TableNodeData>) => void;
	updateNodePosition: (nodeId: string, position: XYPosition) => void;
	addField: (nodeId: string, field: { id: string; label: string; type: string }) => void;
	updateField: (nodeId: string, fieldId: string, updates: Partial<{ label: string; type: string }>) => void;
	deleteField: (nodeId: string, fieldId: string) => void;
	loadNodePositions: () => Record<string, XYPosition>;
	findAvailablePosition: (nodes: Node[]) => XYPosition;
	initializePositions: (positions: Record<string, XYPosition>) => void;
	setEdges: (edges: Edge[] | ((prev: Edge[]) => Edge[])) => void;
}

export const useBuildStore = create<BuildStore>((set) => ({
	nodes: [] as Node<TableNodeData>[],
	edges: [],
	selectedNode: null,
	rightSidebarContent: null,
	isRightSidebarOpen: false,

	setNodes: (nodes) => {
		if (typeof nodes === "function") {
			set((state) => ({ nodes: nodes(state.nodes) }));
		} else {
			set({ nodes: Array.isArray(nodes) ? nodes : [] });
		}
	},

	setSelectedNode: (node) => set({ selectedNode: node }),

	setRightSidebarContent: (content) => set({ rightSidebarContent: content }),

	openRightSidebar: () => set({ isRightSidebarOpen: true }),

	closeRightSidebar: () => set({ isRightSidebarOpen: false }),

	updateNodeData: (nodeId, data) => {
		set((state) => ({
			nodes: state.nodes.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node)),
		}));
	},

	updateNodePosition: (nodeId, position) => {
		set((state) => ({
			nodes: state.nodes.map((node) => (node.id === nodeId ? { ...node, position } : node)),
		}));

		// Save position to localStorage
		const positions = JSON.parse(localStorage.getItem("nodePositions") || "{}");
		positions[nodeId] = position;
		localStorage.setItem("nodePositions", JSON.stringify(positions));
	},

	addField: (nodeId, field) => {
		set((state) => ({
			nodes: state.nodes.map((node) =>
				node.id === nodeId
					? {
							...node,
							data: {
								...node.data,
								details: [...(node.data.details || []), field],
							},
					  }
					: node
			),
		}));
	},

	updateField: (nodeId, fieldId, updates) => {
		set((state) => ({
			nodes: state.nodes.map((node) =>
				node.id === nodeId
					? {
							...node,
							data: {
								...node.data,
								details: node.data.details.map((field: { id: string }) => (field.id === fieldId ? { ...field, ...updates } : field)),
							},
					  }
					: node
			),
		}));
	},

	deleteField: (nodeId, fieldId) => {
		set((state) => ({
			nodes: state.nodes.map((node) =>
				node.id === nodeId
					? {
							...node,
							data: {
								...node.data,
								details: node.data.details.filter((field: { id: string }) => field.id !== fieldId),
							},
					  }
					: node
			),
		}));
	},

	loadNodePositions: () => {
		try {
			return JSON.parse(localStorage.getItem("nodePositions") || "{}");
		} catch {
			return {};
		}
	},

	findAvailablePosition: (nodes) => {
		const basePosition = { x: 100, y: 100 };
		const spacing = 250;
		const position = { ...basePosition };
		let attempts = 0;
		const maxAttempts = 100;

		while (nodes.some((node) => Math.abs(node.position.x - position.x) < spacing && Math.abs(node.position.y - position.y) < spacing) && attempts < maxAttempts) {
			position.x += spacing;
			if (position.x > basePosition.x + spacing * 4) {
				position.x = basePosition.x;
				position.y += spacing;
			}
			attempts++;
		}

		return position;
	},

	initializePositions: (positions) => {
		localStorage.setItem("nodePositions", JSON.stringify(positions));
	},

	setEdges: (edges) =>
		set((state) => ({
			edges: typeof edges === "function" ? edges(state.edges) : edges,
		})),
}));
