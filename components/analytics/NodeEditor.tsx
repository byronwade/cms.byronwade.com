"use client";

import { useEffect, useRef, useState } from "react";
import { analyticsStore } from "@/lib/nodes/analytics/store";
import { Card } from "@/components/ui/card";
import { MetricsNode } from "@/lib/nodes/analytics/MetricsNode";

interface NodeEditorProps {
	className?: string;
}

interface NodePosition {
	x: number;
	y: number;
}

interface NodeData {
	node: MetricsNode;
	position: NodePosition;
}

export function NodeEditor({ className }: NodeEditorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [nodes, setNodes] = useState<NodeData[]>([]);

	useEffect(() => {
		setNodes(analyticsStore.nodes);
	}, []);

	return (
		<div ref={containerRef} className={`${className} relative bg-[#3a3a3a] rounded-md`}>
			{nodes.map(({ node, position }, index) => (
				<Card
					key={index}
					className="absolute bg-[#2a2a2a] border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors p-4 w-[200px]"
					style={{
						transform: `translate(${position.x}px, ${position.y}px)`,
					}}
				>
					<div className="text-sm font-medium text-white mb-2">{node.name}</div>
					<div className="space-y-2">
						<div className="text-xs text-gray-400">
							<div className="font-medium">Inputs</div>
							<div className="pl-2">
								<div>Date Range</div>
								<div>Metric Type: {node.inputs.metric.value}</div>
							</div>
						</div>
						<div className="text-xs text-gray-400">
							<div className="font-medium">Outputs</div>
							<div className="pl-2">
								<div>Time Series Data</div>
								<div>Current Value</div>
								<div>Percentage Change</div>
							</div>
						</div>
					</div>
				</Card>
			))}
			<svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
				{nodes.map(({ position }, index) => {
					// Draw connections between nodes
					if (index < nodes.length - 1) {
						const nextPosition = nodes[index + 1].position;
						return (
							<line
								key={index}
								x1={position.x + 200} // Node width
								y1={position.y + 50} // Half node height
								x2={nextPosition.x}
								y2={nextPosition.y + 50}
								stroke="#4a4a4a"
								strokeWidth={2}
							/>
						);
					}
					return null;
				})}
			</svg>
		</div>
	);
}
