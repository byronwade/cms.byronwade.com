import { MetricsNode } from "./MetricsNode";

interface NodePosition {
	x: number;
	y: number;
}

interface NodeData {
	node: MetricsNode;
	position: NodePosition;
}

// Create nodes
const usersMetrics = new MetricsNode();
const revenueMetrics = new MetricsNode();
const conversionMetrics = new MetricsNode();

// Set initial metric types
usersMetrics.inputs.metric.next("users");
revenueMetrics.inputs.metric.next("revenue");
conversionMetrics.inputs.metric.next("conversion");

// Create store
class AnalyticsStore {
	private _nodes: NodeData[] = [];

	constructor() {
		this._nodes = [
			{ node: usersMetrics, position: { x: 100, y: 100 } },
			{ node: revenueMetrics, position: { x: 400, y: 100 } },
			{ node: conversionMetrics, position: { x: 700, y: 100 } },
		];
	}

	get nodes() {
		return this._nodes;
	}
}

export const analyticsStore = new AnalyticsStore();
