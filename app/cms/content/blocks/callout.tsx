import { createBlockSpec } from "@blocknote/core";

export const calloutBlockSchema = createBlockSpec(
	// biome-ignore lint/suspicious/noExplicitAny: BlockNote types are complex
	{} as any,
	// biome-ignore lint/suspicious/noExplicitAny: BlockNote types are complex
	{ render: () => null } as any,
);
