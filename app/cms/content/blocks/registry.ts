import { BlockSchema, defaultBlockSchema } from "@blocknote/core";

export interface CustomBlockConfig {
	id: string;
	title: string;
	description: string;
	icon: string;
	category: "layout" | "media" | "widgets" | "formatting" | "custom";
	schema: Partial<BlockSchema>;
}

// Registry of custom blocks
export const customBlocks: CustomBlockConfig[] = [
	{
		id: "callout",
		title: "Callout",
		description: "Add a callout block with different styles",
		icon: "AlertCircle",
		category: "formatting",
		schema: {
			type: "callout",
			propSchema: {
				type: {
					default: "info",
					values: ["info", "warning", "error", "success"] as const,
				},
				title: { default: "" },
			},
			content: "inline",
		},
	},
	{
		id: "cta",
		title: "Call to Action",
		description: "Add a call to action button",
		icon: "MousePointerClick",
		category: "widgets",
		schema: {
			type: "cta",
			propSchema: {
				buttonText: { default: "Click Here" },
				url: { default: "#" },
				style: {
					default: "primary",
					values: ["primary", "secondary", "outline"] as const,
				},
			},
			content: "none",
		},
	},
	{
		id: "testimonial",
		title: "Testimonial",
		description: "Add a customer testimonial",
		icon: "Quote",
		category: "widgets",
		schema: {
			type: "testimonial",
			propSchema: {
				author: { default: "" },
				role: { default: "" },
				avatar: { default: "" },
				rating: { default: 5 },
			},
			content: "rich-text",
		},
	},
	{
		id: "twoColumn",
		title: "Two Column Layout",
		description: "Add a two column layout",
		icon: "Layout",
		category: "layout",
		schema: {
			type: "twoColumn",
			propSchema: {
				ratio: {
					default: "50-50",
					values: ["50-50", "30-70", "70-30"] as const,
				},
				verticalAlignment: {
					default: "top",
					values: ["top", "center", "bottom"] as const,
				},
			},
			content: "blocks",
		},
	},
	{
		id: "imageGallery",
		title: "Image Gallery",
		description: "Add an image gallery",
		icon: "Images",
		category: "media",
		schema: {
			type: "imageGallery",
			propSchema: {
				columns: { default: 3 },
				gap: { default: "md" },
				images: { default: [] },
			},
			content: "none",
		},
	},
];

// Function to get all registered blocks
export function getRegisteredBlocks(): CustomBlockConfig[] {
	return customBlocks;
}

// Function to get blocks by category
export function getBlocksByCategory(category: CustomBlockConfig["category"]): CustomBlockConfig[] {
	return customBlocks.filter((block) => block.category === category);
}

// Function to get a block by ID
export function getBlockById(id: string): CustomBlockConfig | undefined {
	return customBlocks.find((block) => block.id === id);
}

// Function to create the extended schema with custom blocks
export function createExtendedBlockSchema(): BlockSchema {
	const customBlockSchemas = customBlocks.reduce((acc, block) => {
		acc[block.id] = block.schema;
		return acc;
	}, {} as Record<string, any>);

	return {
		...defaultBlockSchema,
		...customBlockSchemas,
	};
}
