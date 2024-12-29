import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface MetadataType {
	title: string;
	description: string;
	keywords: string[];
	author: string;
	publishDate: string;
	lastModified: string;
	status: "draft" | "published" | "archived";
}

interface ContentRightSidebarProps {
	isOpen: boolean;
	metadata?: MetadataType;
	onUpdateMetadata?: (key: keyof MetadataType, value: MetadataType[keyof MetadataType]) => void;
}

export function ContentRightSidebar({ isOpen, metadata, onUpdateMetadata }: ContentRightSidebarProps) {
	if (!isOpen) return null;

	return (
		<div className="w-[var(--sidebar-width)] h-full border-l border-[#1a1a1a] bg-[#0a0a0a] overflow-y-auto">
			<div className="p-4">
				<h2 className="text-lg font-semibold mb-4">Content Settings</h2>

				{metadata && onUpdateMetadata ? (
					<div className="space-y-6">
						{/* Title */}
						<div>
							<Label htmlFor="title">Title</Label>
							<Input id="title" value={metadata.title} onChange={(e) => onUpdateMetadata("title", e.target.value)} className="mt-1" />
						</div>

						{/* Description */}
						<div>
							<Label htmlFor="description">Description</Label>
							<Textarea id="description" value={metadata.description} onChange={(e) => onUpdateMetadata("description", e.target.value)} className="mt-1" />
						</div>

						{/* Keywords */}
						<div>
							<Label htmlFor="keywords">Keywords</Label>
							<Input
								id="keywords"
								value={metadata.keywords.join(", ")}
								onChange={(e) =>
									onUpdateMetadata(
										"keywords",
										e.target.value.split(",").map((k) => k.trim())
									)
								}
								className="mt-1"
								placeholder="Separate keywords with commas"
							/>
						</div>

						{/* Author */}
						<div>
							<Label htmlFor="author">Author</Label>
							<Input id="author" value={metadata.author} onChange={(e) => onUpdateMetadata("author", e.target.value)} className="mt-1" />
						</div>

						{/* Status */}
						<div>
							<Label>Status</Label>
							<div className="flex items-center justify-between mt-1">
								<span className="text-sm text-gray-400">Published</span>
								<Switch checked={metadata.status === "published"} onCheckedChange={(checked) => onUpdateMetadata("status", checked ? "published" : "draft")} />
							</div>
						</div>

						{/* Save Button */}
						<Button className="w-full">Save Changes</Button>
					</div>
				) : (
					<Card className="p-4">
						<p className="text-sm text-gray-400">Select content to view and edit settings</p>
					</Card>
				)}
			</div>
		</div>
	);
}
