import { createBlockSpec } from "@blocknote/core";

// biome-ignore lint/suspicious/noExplicitAny: BlockNote types are complex and this is a placeholder implementation
export const calloutBlockSchema = createBlockSpec(
	// biome-ignore lint/suspicious/noExplicitAny: BlockNote types are complex
	{} as any,
	// biome-ignore lint/suspicious/noExplicitAny: BlockNote types are complex
	{ render: () => null } as any,
);
