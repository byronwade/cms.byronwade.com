"use client";

import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalloutProps {
	type?: "info" | "warning" | "error" | "success";
	title?: string;
	children?: ReactNode;
	className?: string;
}

const typeConfig = {
	info: {
		icon: Info,
		bgColor: "bg-blue-500/10",
		borderColor: "border-blue-500/20",
		textColor: "text-blue-500",
	},
	warning: {
		icon: AlertTriangle,
		bgColor: "bg-yellow-500/10",
		borderColor: "border-yellow-500/20",
		textColor: "text-yellow-500",
	},
	error: {
		icon: AlertCircle,
		bgColor: "bg-red-500/10",
		borderColor: "border-red-500/20",
		textColor: "text-red-500",
	},
	success: {
		icon: CheckCircle,
		bgColor: "bg-green-500/10",
		borderColor: "border-green-500/20",
		textColor: "text-green-500",
	},
};

export function CalloutBlock({
	type = "info",
	title,
	children,
	className,
}: CalloutProps) {
	const config = typeConfig[type];
	const Icon = config.icon;

	return (
		<div
			className={cn(
				"p-4 rounded-lg border",
				config.bgColor,
				config.borderColor,
				className,
			)}
		>
			<div className="flex items-start space-x-3">
				<Icon className={cn("w-5 h-5 mt-0.5", config.textColor)} />
				<div className="flex-1">
					{title && (
						<h4 className={cn("font-medium mb-1", config.textColor)}>
							{title}
						</h4>
					)}
					<div className="text-gray-200">{children}</div>
				</div>
			</div>
		</div>
	);
}

// BlockNote integration component
// biome-ignore lint/suspicious/noExplicitAny: BlockNote types are complex
// biome-ignore lint/correctness/noUnusedFunctionParameters: editor may be used in future
export function CalloutBlockComponent({ block, editor: _editor }: any) {
	return (
		<CalloutBlock type={block.props.type} title={block.props.title}>
			{block.content}
		</CalloutBlock>
	);
}
