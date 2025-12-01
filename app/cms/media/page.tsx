"use client";

// Import framer-motion normally - it's already tree-shaken by Next.js
import { AnimatePresence, motion } from "framer-motion";
// Optimize icon imports - only import what's needed immediately
import {
	Brain,
	Download,
	Eye,
	EyeOff,
	Grid,
	Link,
	List,
	Pencil,
	Plus,
	Search,
	Sparkles,
	Tags,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropProvider } from "@/components/media/drag-drop-provider";
import { UploadDialog } from "@/components/media/upload-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatBytes } from "@/lib/utils";
import { aiInsights, recentFiles, smartCollections } from "./data";
import { useMediaStore } from "./store";
import type { MediaFile, UploadingFile } from "./types";

export default function MediaPage() {
	const {
		selectedFilter,
		viewMode,
		setViewMode,
		searchQuery,
		setSearchQuery,
		selectedFile,
		setSelectedFile,
		selectedFiles,
		setSelectedFiles,
		setFileStats,
		currentPath,
	} = useMediaStore();

	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [draggedFile, setDraggedFile] = useState<MediaFile | null>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [sortBy, setSortBy] = useState<"date" | "name" | "size" | "type">(
		"date",
	);
	const [sortOrder, _setSortOrder] = useState<"asc" | "desc">("desc");
	const [isSelectionMode, setIsSelectionMode] = useState(false);
	const [quickEditId, setQuickEditId] = useState<number | null>(null);
	const [quickEditValue, setQuickEditValue] = useState("");
	const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

	// Memoize files with path to prevent recalculation
	const filesWithPath = useMemo(() => {
		return recentFiles.map((file) => ({
			...file,
			path: `${currentPath}/${file.title}`,
		}));
	}, [currentPath]);

	// Update file stats when files change
	useEffect(() => {
		setFileStats({
			total: filesWithPath.length,
			used: 5670000000, // 5.67 GB in bytes
			lastUpload: Date.now(),
		});
	}, [filesWithPath.length, setFileStats]);

	// Memoize filtered files to prevent recalculation on every render
	const filteredFiles = useMemo(() => {
		return filesWithPath.filter((file) => {
			const matchesSearch =
				!searchQuery ||
				file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				file.aiTags.some((tag) =>
					tag.toLowerCase().includes(searchQuery.toLowerCase()),
				);
			const matchesFilter =
				selectedFilter === "all" || file.type === selectedFilter;
			return matchesSearch && matchesFilter;
		});
	}, [filesWithPath, searchQuery, selectedFilter]);

	// Memoize sorted files to prevent recalculation on every render
	const sortedFiles = useMemo(() => {
		return [...filteredFiles].sort((a, b) => {
			switch (sortBy) {
				case "name":
					return sortOrder === "asc"
						? a.title.localeCompare(b.title)
						: b.title.localeCompare(a.title);
				case "date":
					return sortOrder === "asc"
						? new Date(a.time).getTime() - new Date(b.time).getTime()
						: new Date(b.time).getTime() - new Date(a.time).getTime();
				case "type":
					return sortOrder === "asc"
						? a.type.localeCompare(b.type)
						: b.type.localeCompare(a.type);
				default:
					return 0;
			}
		});
	}, [filteredFiles, sortBy, sortOrder]);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (draggedFile) {
				setMousePosition({ x: e.clientX, y: e.clientY });
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [draggedFile]);

	const handleDragStart = (file: MediaFile) => {
		setDraggedFile(file);
	};

	const handleDragEnd = () => {
		setDraggedFile(null);
	};

	const handleFileDrop = useCallback((files: File[]) => {
		const _newFiles: UploadingFile[] = files.map((file) => ({
			id: Math.random().toString(36).substring(7),
			file,
			progress: 0,
			status: "pending",
			startTime: Date.now(),
			metadata: {
				size: formatBytes(file.size),
				format: file.type,
			},
		}));
		setUploadDialogOpen(true);
	}, []);

	// Memoize handlers to prevent unnecessary re-renders
	const handleFileClickMemo = useCallback(
		(file: MediaFile) => {
			setSelectedFile(file);
			setIsPreviewOpen(true);
		},
		[setSelectedFile],
	);

	const handleFileSelectionMemo = useCallback(
		(file: MediaFile) => {
			const isSelected = selectedFiles.some((f) => f.id === file.id);
			const newSelection = isSelected
				? selectedFiles.filter((f) => f.id !== file.id)
				: [...selectedFiles, file];
			setSelectedFiles(newSelection);
		},
		[selectedFiles, setSelectedFiles],
	);

	// Optimistic update for upload completion
	const handleUploadComplete = useCallback(
		(_completedFiles: UploadingFile[]) => {
			// Optimistically add files to the list immediately
			// In a real app, you'd update the file list state here
			setUploadDialogOpen(false);
			// Here you would typically update your file list with the new files
			// For now, this is optimistic - files appear immediately
		},
		[],
	);

	// Handle quick edit
	const handleQuickEdit = useCallback(
		(fileId: number, currentTitle: string) => {
			setQuickEditId(fileId);
			setQuickEditValue(currentTitle);
		},
		[],
	);

	// Handle quick edit save
	const handleQuickEditSave = useCallback(() => {
		if (quickEditId !== null && quickEditValue.trim()) {
			// In a real app, you'd update the file title here
			// For now, just reset the edit state
			setQuickEditId(null);
			setQuickEditValue("");
		}
	}, [quickEditId, quickEditValue]);

	// Handle bulk actions
	const handleBulkAction = useCallback(
		(action: "download" | "tag" | "delete") => {
			// In a real app, you'd perform the bulk action here
			console.log(`Bulk action: ${action}`, selectedFiles);
			if (action === "delete") {
				// Optimistically remove selected files
				setSelectedFiles([]);
			}
		},
		[
			selectedFiles, // Optimistically remove selected files
			setSelectedFiles,
		],
	);

	return (
		<DragDropProvider onFileDrop={handleFileDrop}>
			<div className="relative h-screen flex flex-col">
				<div className="flex-1 overflow-auto">
					<div className="p-6 bg-background text-foreground">
						{/* Search and Actions Bar */}
						<div className="mb-6 flex items-center justify-between">
							<div className="flex-1 max-w-md relative">
								<Input
									type="text"
									placeholder="Search files, tags, or people..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="bg-muted border-border pl-10"
								/>
								<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
							</div>
							<div className="flex items-center space-x-2">
								<Button
									variant="outline"
									size="tiny"
									onClick={() => setUploadDialogOpen(true)}
									className="bg-muted hover:bg-accent border-border"
								>
									<Plus className="h-4 w-4 mr-2" />
									Upload
								</Button>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="outline"
												size="tiny"
												onClick={() => setIsSelectionMode(!isSelectionMode)}
												className="bg-muted hover:bg-accent border-border"
											>
												{isSelectionMode ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											{isSelectionMode
												? "Exit Selection Mode"
												: "Enter Selection Mode"}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<Button
									variant="outline"
									size="tiny"
									onClick={() =>
										setViewMode(viewMode === "grid" ? "list" : "grid")
									}
									className="bg-muted hover:bg-accent border-border"
								>
									{viewMode === "grid" ? (
										<List className="h-4 w-4" />
									) : (
										<Grid className="h-4 w-4" />
									)}
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											size="tiny"
											className="bg-muted hover:bg-accent border-border"
										>
											Sort by
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem onClick={() => setSortBy("date")}>
											Date
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => setSortBy("name")}>
											Name
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => setSortBy("type")}>
											Type
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>

						{/* Smart Collections */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-lg font-semibold">Smart Collections</h2>
								<Button
									variant="ghost"
									size="tiny"
									className="text-muted-foreground hover:text-foreground hover:bg-accent"
								>
									<Brain className="h-4 w-4 mr-2" />
									Manage Collections
								</Button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{smartCollections.map((collection) => (
									<Card
										key={collection.id}
										className="bg-card border-border hover:border-primary/50 transition-colors"
									>
										<div className="p-4">
											<div className="flex items-start justify-between">
												<div className="flex items-center gap-3">
													{collection.icon}
													<div>
														<h3 className="text-sm font-medium text-foreground">
															{collection.title}
														</h3>
														<p className="text-xs text-gray-400">
															{collection.description}
														</p>
													</div>
												</div>
												<Badge variant="secondary" className="bg-muted">
													{collection.count}
												</Badge>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>

						{/* AI Insights */}
						<div className="mb-8">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-lg font-semibold">AI Insights</h2>
								<Button
									variant="ghost"
									size="tiny"
									className="text-muted-foreground hover:text-foreground hover:bg-accent"
								>
									<Sparkles className="h-4 w-4 mr-2" />
									Customize Insights
								</Button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{aiInsights.map((insight) => (
									<Card
										key={insight.id}
										className="bg-card border-border hover:border-primary/50 transition-colors"
									>
										<div className="p-4">
											<div className="flex items-start justify-between">
												<div className="flex items-center gap-3">
													{insight.icon}
													<div>
														<h3 className="text-sm font-medium text-foreground">
															{insight.title}
														</h3>
														<p className="text-xs text-gray-400">
															{insight.description}
														</p>
													</div>
												</div>
												<Badge variant="secondary" className="bg-muted">
													{insight.count}
												</Badge>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>

						{/* Files Grid/List View */}
						<div className="mb-8">
							<h2 className="text-lg font-semibold mb-4">Media Library</h2>
							<AnimatePresence mode="wait">
								{viewMode === "grid" ? (
									<motion.div
										className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										key="grid"
									>
										{sortedFiles.length === 0 ? (
											<div className="col-span-full text-center py-12">
												<p className="text-muted-foreground">No files found</p>
											</div>
										) : (
											sortedFiles.map((file, index) => (
												<motion.div
													key={file.id}
													draggable
													onDragStart={() => handleDragStart(file)}
													onDragEnd={handleDragEnd}
													className="cursor-grab active:cursor-grabbing"
												>
													<Card
														className={cn(
															"bg-card border-border hover:border-primary/50 transition-colors cursor-pointer relative",
															selectedFiles.some((f) => f.id === file.id) &&
																"ring-2 ring-primary",
														)}
														onClick={() =>
															isSelectionMode
																? handleFileSelectionMemo(file)
																: handleFileClickMemo(file)
														}
													>
														<div className="p-4">
															<div className="flex items-start justify-between">
																<div className="flex items-center gap-3">
																	{file.icon}
																	<div>
																		{quickEditId === file.id ? (
																			<Input
																				value={quickEditValue}
																				onChange={(e) =>
																					setQuickEditValue(e.target.value)
																				}
																				onBlur={handleQuickEditSave}
																				onKeyDown={(e) =>
																					e.key === "Enter" &&
																					handleQuickEditSave()
																				}
																				className="h-6 text-sm"
																				autoFocus
																			/>
																		) : (
																			<h3 className="text-sm font-medium text-foreground truncate group-hover:text-blue-400">
																				{file.title}
																				<button
																					type="button"
																					onClick={(e) => {
																						e.stopPropagation();
																						handleQuickEdit(
																							file.id,
																							file.title,
																						);
																					}}
																					className="ml-2 opacity-0 group-hover:opacity-100"
																				>
																					<Pencil className="h-3 w-3" />
																				</button>
																			</h3>
																		)}
																		<div className="flex items-center mt-1">
																			<span className="text-xs text-gray-400">
																				{file.user}
																			</span>
																			<span className="mx-1 text-gray-600">
																				•
																			</span>
																			<span className="text-xs text-gray-400">
																				{file.action}
																			</span>
																		</div>
																	</div>
																</div>
																{file.metadata && (
																	<Badge
																		variant="secondary"
																		className="bg-muted text-xs"
																	>
																		{file.type === "image"
																			? file.metadata.dimensions
																			: file.metadata.duration}
																	</Badge>
																)}
															</div>
															{file.thumbnail && (
																<motion.div
																	className="mt-3 relative group"
																	whileHover={{ scale: 1.02 }}
																>
																	<Image
																		src={file.thumbnail}
																		alt={file.title}
																		width={400}
																		height={96}
																		className="w-full h-24 object-cover rounded"
																		style={{ height: "auto" }}
																		loading={index === 0 ? "eager" : "lazy"}
																	/>
																	<div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
																		<Button
																			size="tiny"
																			variant="ghost"
																			onClick={(e) => {
																				e.stopPropagation();
																				// Preview logic
																			}}
																		>
																			<Eye className="h-4 w-4" />
																		</Button>
																		<Button
																			size="tiny"
																			variant="ghost"
																			onClick={(e) => {
																				e.stopPropagation();
																				// Download logic
																			}}
																		>
																			<Download className="h-4 w-4" />
																		</Button>
																		<Button
																			size="tiny"
																			variant="ghost"
																			onClick={(e) => {
																				e.stopPropagation();
																				// Copy link logic
																			}}
																		>
																			<Link className="h-4 w-4" />
																		</Button>
																	</div>
																</motion.div>
															)}
															<div className="mt-3 flex flex-wrap gap-1">
																{file.aiTags.map((tag) => (
																	<Badge
																		key={tag}
																		variant="secondary"
																		className="bg-muted text-xs"
																	>
																		{tag}
																	</Badge>
																))}
															</div>
															<div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
																<div className="flex items-center justify-between">
																	<span>{file.usage.views} views</span>
																	<span>{file.usage.downloads} downloads</span>
																	<span>Last: {file.usage.lastUsed}</span>
																</div>
															</div>
														</div>
													</Card>
												</motion.div>
											))
										)}
									</motion.div>
								) : (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
									>
										<table className="w-full text-left">
											<thead>
												<tr className="border-b border-border">
													{isSelectionMode && (
														<th className="pb-2 text-sm font-medium w-8">
															<input
																type="checkbox"
																onChange={(e) => {
																	setSelectedFiles(
																		e.target.checked ? sortedFiles : [],
																	);
																}}
																checked={
																	selectedFiles.length === sortedFiles.length
																}
															/>
														</th>
													)}
													<th className="pb-2 text-sm font-medium">Name</th>
													<th className="pb-2 text-sm font-medium">Type</th>
													<th className="pb-2 text-sm font-medium">Size</th>
													<th className="pb-2 text-sm font-medium">Modified</th>
													<th className="pb-2 text-sm font-medium">Actions</th>
												</tr>
											</thead>
											<tbody>
												{sortedFiles.map((file) => (
													<motion.tr
														key={file.id}
														initial={{ opacity: 0 }}
														animate={{ opacity: 1 }}
														exit={{ opacity: 0 }}
														className={cn(
															"border-b border-border hover:bg-muted",
															selectedFiles.some((f) => f.id === file.id) &&
																"bg-muted",
														)}
														draggable
														onDragStart={() => handleDragStart(file)}
														onDragEnd={handleDragEnd}
													>
														{isSelectionMode && (
															<td className="py-2">
																<input
																	type="checkbox"
																	checked={selectedFiles.some(
																		(f) => f.id === file.id,
																	)}
																	onChange={() => handleFileSelectionMemo(file)}
																/>
															</td>
														)}
														<td className="py-2">
															<div className="flex items-center">
																{file.icon}
																<span className="ml-2 text-sm">
																	{file.title}
																</span>
															</div>
														</td>
														<td className="py-2 text-sm text-gray-400">
															{file.type}
														</td>
														<td className="py-2 text-sm text-gray-400">
															{file.metadata?.size || "-"}
														</td>
														<td className="py-2 text-sm text-gray-400">
															{file.time}
														</td>
														<td className="py-2">
															<div className="flex items-center space-x-2">
																<Button
																	variant="ghost"
																	size="tiny"
																	className="text-muted-foreground hover:text-foreground hover:bg-accent"
																>
																	<Eye className="h-4 w-4" />
																</Button>
																<Button
																	variant="ghost"
																	size="tiny"
																	className="text-muted-foreground hover:text-foreground hover:bg-accent"
																>
																	<Download className="h-4 w-4" />
																</Button>
																<Button
																	variant="ghost"
																	size="tiny"
																	className="text-muted-foreground hover:text-foreground hover:bg-accent"
																>
																	<Link className="h-4 w-4" />
																</Button>
															</div>
														</td>
													</motion.tr>
												))}
											</tbody>
										</table>
									</motion.div>
								)}
							</AnimatePresence>
						</div>

						{/* File Preview Dialog */}
						<Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
							<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border text-foreground z-[9999]">
								{selectedFile && (
									<>
										<DialogHeader className="mb-4">
											<DialogTitle className="text-lg font-semibold text-foreground">
												{selectedFile.title}
											</DialogTitle>
											<DialogDescription className="text-gray-400">
												Uploaded by {selectedFile.user} • {selectedFile.time}
											</DialogDescription>
										</DialogHeader>
										<div className="space-y-6">
											<div className="relative group">
												<Image
													src={selectedFile.thumbnail}
													alt={selectedFile.title}
													width={800}
													height={600}
													className="w-full rounded-lg border border-border"
													style={{ height: "auto" }}
												/>
												<div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
													<div className="flex items-center space-x-2">
														<Button
															size="tiny"
															variant="secondary"
															className="bg-muted hover:bg-accent border-border text-muted-foreground hover:text-foreground"
														>
															<Download className="h-4 w-4 mr-2" />
															Download
														</Button>
														<Button
															size="tiny"
															variant="secondary"
															className="bg-muted hover:bg-accent border-border text-muted-foreground hover:text-foreground"
														>
															<Link className="h-4 w-4 mr-2" />
															Copy Link
														</Button>
													</div>
												</div>
											</div>
											<div className="mt-6 grid grid-cols-2 gap-6">
												<div className="bg-muted p-4 rounded-lg">
													<h4 className="text-sm font-medium mb-3 text-foreground">
														File Information
													</h4>
													<dl className="space-y-2">
														<div className="flex justify-between items-center py-1">
															<dt className="text-sm text-gray-400">Type</dt>
															<dd className="text-sm text-foreground bg-accent px-2 py-0.5 rounded">
																{selectedFile.type.toUpperCase()}
															</dd>
														</div>
														<div className="flex justify-between items-center py-1">
															<dt className="text-sm text-gray-400">Size</dt>
															<dd className="text-sm text-foreground">
																{selectedFile.metadata?.size}
															</dd>
														</div>
														<div className="flex justify-between items-center py-1">
															<dt className="text-sm text-gray-400">
																Dimensions
															</dt>
															<dd className="text-sm text-foreground">
																{selectedFile.metadata?.dimensions}
															</dd>
														</div>
														<div className="flex justify-between items-center py-1">
															<dt className="text-sm text-gray-400">Format</dt>
															<dd className="text-sm text-foreground">
																{selectedFile.metadata?.format}
															</dd>
														</div>
													</dl>
												</div>
												<div className="bg-muted p-4 rounded-lg">
													<h4 className="text-sm font-medium mb-3 text-foreground">
														Usage Statistics
													</h4>
													<dl className="space-y-2">
														<div className="flex justify-between items-center py-1">
															<dt className="text-sm text-gray-400">Views</dt>
															<dd className="text-sm text-foreground">
																<span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
																	{selectedFile.usage.views.toLocaleString()}
																</span>
															</dd>
														</div>
														<div className="flex justify-between items-center py-1">
															<dt className="text-sm text-gray-400">
																Downloads
															</dt>
															<dd className="text-sm text-foreground">
																<span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded">
																	{selectedFile.usage.downloads.toLocaleString()}
																</span>
															</dd>
														</div>
														<div className="flex justify-between items-center py-1">
															<dt className="text-sm text-gray-400">
																Last Used
															</dt>
															<dd className="text-sm text-foreground">
																{selectedFile.usage.lastUsed}
															</dd>
														</div>
													</dl>
												</div>
											</div>
											<div className="mt-6 bg-muted p-4 rounded-lg">
												<h4 className="text-sm font-medium mb-3 text-foreground">
													AI Tags
												</h4>
												<div className="flex flex-wrap gap-2">
													{selectedFile.aiTags.map((tag) => (
														<Badge
															key={tag}
															variant="secondary"
															className="bg-accent hover:bg-accent/80 text-foreground border-0 cursor-pointer"
														>
															{tag}
														</Badge>
													))}
												</div>
											</div>
										</div>
									</>
								)}
							</DialogContent>
						</Dialog>

						{/* Bulk Actions Bar */}
						{isSelectionMode && selectedFiles.length > 0 && (
							<motion.div
								initial={{ y: 100, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: 100, opacity: 0 }}
								className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50"
							>
								<div className="container mx-auto flex items-center justify-between">
									<span className="text-sm">
										{selectedFiles.length} items selected
									</span>
									<div className="flex items-center space-x-2">
										<Button
											variant="outline"
											size="tiny"
											onClick={() => handleBulkAction("download")}
											className="bg-muted hover:bg-accent border-border text-muted-foreground hover:text-foreground"
										>
											<Download className="h-4 w-4 mr-2" />
											Download
										</Button>
										<Button
											variant="outline"
											size="tiny"
											onClick={() => handleBulkAction("tag")}
											className="bg-muted hover:bg-accent border-border text-muted-foreground hover:text-foreground"
										>
											<Tags className="h-4 w-4 mr-2" />
											Add Tags
										</Button>
										<Button
											variant="destructive"
											size="tiny"
											onClick={() => handleBulkAction("delete")}
											className="hover:bg-red-600"
										>
											<Trash2 className="h-4 w-4 mr-2" />
											Delete
										</Button>
									</div>
								</div>
							</motion.div>
						)}
					</div>
				</div>

				<UploadDialog
					open={uploadDialogOpen}
					onOpenChange={setUploadDialogOpen}
					currentPath={currentPath}
					onUploadComplete={handleUploadComplete}
				/>

				{/* Dragged File Cursor */}
				<AnimatePresence>
					{draggedFile && (
						<motion.div
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							className="fixed pointer-events-none z-50"
							style={{
								left: mousePosition.x,
								top: mousePosition.y,
								transform: "translate(-50%, -50%)",
							}}
						>
							<div className="bg-background/80 backdrop-blur-sm border rounded-full p-4 flex items-center gap-3">
								{draggedFile.icon}
								<div>
									<p className="text-sm font-medium">{draggedFile.title}</p>
									<p className="text-xs text-muted-foreground">
										{draggedFile.metadata?.size || "Unknown size"}
									</p>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</DragDropProvider>
	);
}
