"use client";

import {
	Activity,
	AlertTriangle,
	CheckCircle2,
	Database,
	GitCommit,
	Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useBuildStore } from "@/app/cms/build/store";
import { CommonFooter } from "@/components/ui/common-footer";

interface Field {
	id: string;
	label: string;
	type: string;
}

interface BuildFooterProps {
	className?: string;
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
}

export function BuildFooter({
	className = "",
	leftSidebarOpen,
	rightSidebarOpen,
}: BuildFooterProps) {
	const { nodes } = useBuildStore();
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [timeSpent, setTimeSpent] = useState("00:00:00");
	const [stats, setStats] = useState({
		totalTables: 0,
		totalFields: 0,
		totalConnections: 0,
		primaryKeys: 0,
		foreignKeys: 0,
		indexedFields: 0,
		validationIssues: 0,
	});

	// Update stats when nodes change
	useEffect(() => {
		if (!Array.isArray(nodes)) return;

		const totalTables = nodes.length;
		const totalFields = nodes.reduce(
			(acc, node) => acc + (node.data.details?.length || 0),
			0,
		);
		const totalConnections = nodes.reduce(
			(acc, node) =>
				acc +
				(node.data.details?.filter((field: Field) =>
					field.label.includes("_id"),
				).length || 0),
			0,
		);

		// Calculate additional metrics
		const primaryKeys = nodes.reduce(
			(acc, node) =>
				acc +
				(node.data.details?.filter((field: Field) => field.label === "id")
					.length || 0),
			0,
		);
		const foreignKeys = nodes.reduce(
			(acc, node) =>
				acc +
				(node.data.details?.filter((field: Field) =>
					field.label.includes("_id"),
				).length || 0),
			0,
		);
		const indexedFields = primaryKeys + foreignKeys;

		// Simple validation check (example)
		const validationIssues = nodes.reduce((acc, node) => {
			const issues = !node.data.details?.some(
				(field: Field) => field.label === "id",
			)
				? 1
				: 0;
			return acc + issues;
		}, 0);

		setStats({
			totalTables,
			totalFields,
			totalConnections,
			primaryKeys,
			foreignKeys,
			indexedFields,
			validationIssues,
		});
	}, [nodes]);

	// Timer effect
	useEffect(() => {
		const startTime = Date.now();
		const interval = setInterval(() => {
			const diff = Math.floor((Date.now() - startTime) / 1000);
			const hours = Math.floor(diff / 3600);
			const minutes = Math.floor((diff % 3600) / 60);
			const seconds = diff % 60;

			setTimeSpent(
				`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
			);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	// Auto-save simulation
	useEffect(() => {
		const interval = setInterval(() => {
			setLastSaved(new Date());
		}, 30000); // Auto-save every 30 seconds

		return () => clearInterval(interval);
	}, []);

	const leftContent = (
		<span className="flex items-center">
			<Database className="h-3 w-3 mr-1" />
			<span className="text-foreground">Database Schema</span>
		</span>
	);

	const rightContent = (
		<>
			<div className="flex items-center gap-2">
				<Activity className="h-3 w-3" />
				<span>Tables: {stats.totalTables}</span>
				<span>Fields: {stats.totalFields}</span>
			</div>

			<div className="flex items-center gap-2">
				<Workflow className="h-3 w-3" />
				<span>Relations: {stats.totalConnections}</span>
			</div>

			<div className="flex items-center gap-2">
				<GitCommit className="h-3 w-3" />
				<span>Time: {timeSpent}</span>
			</div>
		</>
	);

	return (
		<CommonFooter
			leftSidebarOpen={leftSidebarOpen}
			rightSidebarOpen={rightSidebarOpen}
			className={className}
			leftContent={leftContent}
			rightContent={rightContent}
			lastSaved={lastSaved}
			environment="development"
			status={
				stats.validationIssues > 0
					? {
							type: "warning",
							text: `${stats.validationIssues} Issues`,
							icon: <AlertTriangle className="h-3 w-3 mr-1" />,
						}
					: {
							type: "success",
							text: "Valid",
							icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
						}
			}
		/>
	);
}
