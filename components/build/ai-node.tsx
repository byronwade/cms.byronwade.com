"use client";

import { Bot, ArrowRightLeft, Sparkles, Workflow } from "lucide-react";
import { Handle, NodeProps, Position } from "reactflow";
import { motion } from "framer-motion";

interface AINodeData {
	type: "transform" | "enrich" | "validate" | "merge";
	description: string;
	input?: string;
}

const nodeStyles = {
	transform: {
		icon: <ArrowRightLeft className="h-4 w-4" />,
		color: "purple",
	},
	enrich: {
		icon: <Sparkles className="h-4 w-4" />,
		color: "blue",
	},
	validate: {
		icon: <Bot className="h-4 w-4" />,
		color: "green",
	},
	merge: {
		icon: <Workflow className="h-4 w-4" />,
		color: "orange",
	},
};

export function AINode({ data, isConnectable = true }: NodeProps<AINodeData>) {
	const style = nodeStyles[data.type];

	return (
		<motion.div
			className="
				w-[300px] bg-[#1b1b1b] rounded-lg border-2 border-purple-500/30 
				relative hover:border-purple-400/50 transition-colors shadow-lg
				[&.selected]:border-purple-500 [&.selected]:border-2 [&.selected]:rounded-lg
				focus:border-purple-500 focus:border-2 focus:rounded-lg focus:outline-none
				focus-visible:border-purple-500 focus-visible:border-2 focus-visible:rounded-lg focus-visible:outline-none
			"
			initial={false}
			animate={{ scale: 1 }}
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 200, damping: 20 }}
			tabIndex={0}
		>
			<div className="p-4 text-white">
				<div className="flex items-center gap-2 pb-2 mb-4 border-b border-purple-500/20">
					<div className="p-2 rounded-lg bg-purple-500/10">{style.icon}</div>
					<div>
						<h4 className="text-lg font-bold leading-tight text-purple-400">{data.type.charAt(0).toUpperCase() + data.type.slice(1)} AI</h4>
						<p className="text-xs text-purple-300/50">AI Processing Node</p>
					</div>
				</div>
				<textarea
					defaultValue={data.input || "Enter your instructions..."}
					placeholder="Enter your instructions..."
					className="w-full mt-2 text-sm bg-purple-500/5 border border-purple-500/20 rounded p-2 text-purple-100 
							 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none hover:border-purple-500/30"
					rows={3}
				/>
			</div>

			{/* Input Handle (Left) */}
			<Handle
				type="target"
				position={Position.Left}
				id="target"
				className="
					!w-4 !h-4 !-left-4 !bg-purple-400 !border-2 !border-[#1b1b1b] 
					hover:!bg-purple-300 !transition-colors !cursor-crosshair
					before:content-[''] before:absolute before:w-12 before:h-12 
					before:-left-4 before:-top-4 before:opacity-0
				"
				isConnectable={isConnectable}
				isValidConnection={() => true}
			/>

			{/* Output Handle (Right) */}
			<Handle
				type="source"
				position={Position.Right}
				id="source"
				className="
					!w-4 !h-4 !-right-4 !bg-purple-400 !border-2 !border-[#1b1b1b] 
					hover:!bg-purple-300 !transition-colors !cursor-crosshair
					before:content-[''] before:absolute before:w-12 before:h-12 
					before:-right-4 before:-top-4 before:opacity-0
				"
				isConnectable={isConnectable}
				isValidConnection={() => true}
			/>
		</motion.div>
	);
}
