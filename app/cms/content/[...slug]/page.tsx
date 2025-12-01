"use client";

import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import BlockNote components to reduce initial bundle size
const BlockNoteView = dynamic(
	() =>
		import("@blocknote/mantine").then((mod) => ({
			default: mod.BlockNoteView,
		})),
	{
		ssr: false,
		loading: () => (
			<div className="gap-4 flex flex-col p-8">
				<Skeleton className="h-12 w-full" />
				<Skeleton className="h-64 w-full" />
				<Skeleton className="h-32 w-full" />
			</div>
		),
	},
);

// Import BlockNote styles
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

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
		content:
			"Welcome to our powerful content management system. This editor provides a rich set of features to help you create engaging content. Press '/' to open the block menu!",
		children: [],
	},
	{
		type: "paragraph",
		props: {
			...defaultBlockProps,
			backgroundColor: "blue",
		},
		content:
			"This is a callout block - Use it to highlight important information",
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
		content:
			"This is a testimonial block - Use it to showcase customer feedback",
		children: [],
	},
];

// Client-only editor component to avoid SSR issues
function EditorContent({
	onEditorReady,
}: {
	onEditorReady: (editor: BlockNoteEditor) => void;
}) {
	// Always call the hook unconditionally - this component only renders on client
	const editor = useCreateBlockNote({
		initialContent: placeholderContent,
		defaultStyles: false,
		domAttributes: {
			editor: {
				class: "bg-background rounded-none min-h-screen",
			},
			block: {
				class: "bg-background rounded-none",
			},
			blockGroup: {
				class: "bg-background rounded-none",
			},
		},
	});

	useEffect(() => {
		if (editor) {
			onEditorReady(editor);
		}
	}, [editor, onEditorReady]);

	return null;
}

export default function ContentPage() {
	const params = useParams();
	const slug = Array.isArray(params.slug)
		? params.slug.join("/")
		: params.slug || "home";
	const [isLoading, setIsLoading] = useState(true);
	const [saveStatus, setSaveStatus] = useState<
		"idle" | "saving" | "saved" | "error"
	>("idle");
	const [editor, setEditor] = useState<BlockNoteEditor | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	// Set mounted state on client
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleEditorReady = useCallback((editorInstance: BlockNoteEditor) => {
		setEditor(editorInstance);
	}, []);

	// Optimistic save content function with status feedback
	const saveContent = useCallback(
		async (blocks: PartialBlock[]) => {
			// Optimistic update - assume save will succeed
			setSaveStatus("saving");

			try {
				await fetch(`/api/content/${slug}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						content: blocks,
					}),
				});
				// Success - show saved status briefly
				setSaveStatus("saved");
				setTimeout(() => setSaveStatus("idle"), 2000);
			} catch (error) {
				console.error("Error saving content:", error);
				setSaveStatus("error");
				// Revert optimistic update on error (could restore previous content here)
				setTimeout(() => setSaveStatus("idle"), 3000);
			}
		},
		[slug],
	);

	// Load content function with skeleton loading
	const loadContent = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/content/${slug}`);
			const data = await response.json();
			if (data.content && data.content.length > 0 && editor) {
				editor.replaceBlocks(editor.topLevelBlocks, data.content);
			}
		} catch (error) {
			console.error("Error loading content:", error);
		} finally {
			setIsLoading(false);
		}
	}, [editor, slug]);

	// Set up event handlers
	useEffect(() => {
		if (editor) {
			// Load initial content
			loadContent();

			// Set up content change handler with debouncing
			let saveTimeout: NodeJS.Timeout;
			editor.onEditorContentChange(() => {
				clearTimeout(saveTimeout);
				saveTimeout = setTimeout(() => {
					saveContent(editor.topLevelBlocks);
				}, 1000); // Debounce saves by 1 second
			});

			return () => clearTimeout(saveTimeout);
		}
	}, [editor, loadContent, saveContent]);

	return (
		<>
			{isMounted && <EditorContent onEditorReady={handleEditorReady} />}
			{!editor ? (
				<div className="gap-4 flex flex-col p-8">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-64 w-full" />
					<Skeleton className="h-32 w-full" />
				</div>
			) : (
				<Suspense
					fallback={
						<div className="gap-4 flex flex-col p-8">
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-64 w-full" />
							<Skeleton className="h-32 w-full" />
						</div>
					}
				>
					<div className="flex-1 bg-background pt-8 pl-8 pr-8 relative">
						{isLoading && (
							<div className="absolute top-4 right-4 z-10">
								<Skeleton className="h-6 w-24" />
							</div>
						)}
						{saveStatus !== "idle" && !isLoading && (
							<div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border text-xs">
								{saveStatus === "saving" && (
									<>
										<div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
										<span className="text-muted-foreground">Saving...</span>
									</>
								)}
								{saveStatus === "saved" && (
									<>
										<div className="h-2 w-2 rounded-full bg-green-500" />
										<span className="text-green-600 dark:text-green-400">
											Saved
										</span>
									</>
								)}
								{saveStatus === "error" && (
									<>
										<div className="h-2 w-2 rounded-full bg-red-500" />
										<span className="text-red-600 dark:text-red-400">
											Error saving
										</span>
									</>
								)}
							</div>
						)}
						<BlockNoteView
							// biome-ignore lint/suspicious/noExplicitAny: BlockNote editor type mismatch
							editor={editor as any}
							theme="dark"
							className="bg-background rounded-none"
						/>
					</div>
				</Suspense>
			)}
		</>
	);
}
