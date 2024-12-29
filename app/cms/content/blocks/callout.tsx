import { AlertCircle, Info, CheckCircle2, AlertTriangle } from "lucide-react";
import { defaultBlockSchema, createBlockSpec, BlockNoteEditor, Block, BlockSchema } from "@blocknote/core";

// Callout types configuration
export const CalloutType = {
	info: { icon: Info, color: "blue" },
	success: { icon: CheckCircle2, color: "green" },
	warning: { icon: AlertTriangle, color: "yellow" },
	error: { icon: AlertCircle, color: "red" },
} as const;

// Type for callout variants
export type CalloutVariant = keyof typeof CalloutType;

// Type for callout block props
interface CalloutBlockProps {
	textColor: string;
	backgroundColor: string;
	textAlignment: "left" | "center" | "right";
	variant: CalloutVariant;
}

// Create the callout block schema
export const calloutBlockSchema = createBlockSpec({
	type: "callout" as const,
	propSchema: {
		textColor: {
			default: "default",
		},
		backgroundColor: {
			default: "default",
		},
		textAlignment: {
			default: "left",
			values: ["left", "center", "right"] as const,
		},
		variant: {
			default: "info" as CalloutVariant,
			values: ["info", "success", "warning", "error"] as const,
		},
	},
	content: "inline" as const,
	render: ({ block, editor }: { block: Block<CalloutBlockProps>; editor: BlockNoteEditor }) => {
		const variant = block.props.variant;
		const { icon: Icon, color } = CalloutType[variant];

		return (
			<div className={`flex items-start p-4 rounded-lg my-2 bg-${color}-500/10 border border-${color}-500/20`} contentEditable={false}>
				<Icon className={`w-5 h-5 mt-0.5 mr-3 text-${color}-500 shrink-0`} />
				<div contentEditable={true} className="flex-1 min-w-0">
					{editor.createContentRenderer(block)}
				</div>
			</div>
		);
	},
});
