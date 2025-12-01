"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import type { MetricsNode } from "@/lib/nodes/analytics/MetricsNode";
import { analyticsStore } from "@/lib/nodes/analytics/store";

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
		<div
			ref={containerRef}
			className={`${className} relative bg-card rounded-md`}
		>
			{nodes.map(({ node, position }, index) => (
				<Card
					key={`node-${node.name || index}-${position.x}-${position.y}`}
					className="absolute bg-popover border-border hover:border-accent transition-colors p-4 w-[200px]"
					style={{
						transform: `translate(${position.x}px, ${position.y}px)`,
					}}
				>
					<div className="text-sm font-medium text-foreground mb-2">
						{node.name}
					</div>
					<div className="gap-2 flex flex-col">
						<div className="text-xs text-muted-foreground">
							<div className="font-medium">Inputs</div>
							<div className="pl-2">
								<div>Date Range</div>
								<div>Metric Type: {node.inputs.metric.value}</div>
							</div>
						</div>
						<div className="text-xs text-muted-foreground">
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
			<svg
				className="absolute inset-0 pointer-events-none"
				style={{ width: "100%", height: "100%" }}
				aria-label="Node connections"
			>
				<title>Node connections diagram</title>
				{nodes.map(({ position, node }, index) => {
					// Draw connections between nodes
					if (index < nodes.length - 1) {
						const nextPosition = nodes[index + 1].position;
						return (
							<line
								key={`connection-${node.name || index}-${index}`}
								x1={position.x + 200} // Node width
								y1={position.y + 50} // Half node height
								x2={nextPosition.x}
								y2={nextPosition.y + 50}
								stroke="hsl(var(--border))"
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
