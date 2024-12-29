"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { PartialBlock, BlockNoteEditor, defaultBlockSchema, DefaultBlockSchema } from "@blocknote/core";

// Add custom styles to override BlockNote defaults
import "./editor.css";

// Default block props
const defaultBlockProps = {
	textColor: "default",
	backgroundColor: "default",
	textAlignment: "left",
} as const;

// Enhanced placeholder content
const placeholderContent: PartialBlock[] = [
	{
		type: "heading",
		props: {
			level: 1,
			...defaultBlockProps,
		},
		content: "Getting Started with Our CMS",
		children: [],
	},
	{
		type: "paragraph",
		props: defaultBlockProps,
		content: "Welcome to our powerful content management system. This editor provides a rich set of features to help you create engaging content. Press '/' to open the block menu!",
		children: [],
	},
	{
		type: "paragraph",
		props: {
			...defaultBlockProps,
			backgroundColor: "blue",
		},
		content: "This is a callout block - Use it to highlight important information",
		children: [],
	},
	{
		type: "paragraph",
		props: {
			...defaultBlockProps,
			backgroundColor: "green",
		},
		content: "This is a call to action block - Use it to prompt user action",
		children: [],
	},
	{
		type: "paragraph",
		props: {
			...defaultBlockProps,
			backgroundColor: "purple",
		},
		content: "This is a testimonial block - Use it to showcase customer feedback",
		children: [],
	},
];

export default function ContentPage() {
	const params = useParams();
	const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug || "home";

	// Creates a new editor instance
	const editor = useCreateBlockNote({
		initialContent: placeholderContent,
		defaultStyles: false,
		domAttributes: {
			editor: {
				class: "bg-[#191919] rounded-none min-h-screen",
			},
			block: {
				class: "bg-[#191919] rounded-none",
			},
			blockGroup: {
				class: "bg-[#191919] rounded-none",
			},
		},
	});

	// Save content function
	const saveContent = async (blocks: PartialBlock[]) => {
		try {
			await fetch(`/api/content/${slug}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					content: blocks,
				}),
			});
		} catch (error) {
			console.error("Error saving content:", error);
		}
	};

	// Load content function
	const loadContent = async () => {
		try {
			const response = await fetch(`/api/content/${slug}`);
			const data = await response.json();
			if (data.content && data.content.length > 0 && editor) {
				editor.replaceBlocks(editor.topLevelBlocks, data.content);
			}
		} catch (error) {
			console.error("Error loading content:", error);
		}
	};

	// Set up event handlers
	useEffect(() => {
		if (editor) {
			// Load initial content
			loadContent();

			// Set up content change handler
			editor.onEditorContentChange(() => {
				saveContent(editor.topLevelBlocks);
			});
		}
	}, [editor, slug]);

	if (!editor) return null;

	return (
		<div className="flex-1 bg-[#191919] pt-8 pl-8 pr-8">
			<BlockNoteView editor={editor} theme="dark" className="bg-[#191919] rounded-none" />
		</div>
	);
}
