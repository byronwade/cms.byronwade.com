"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Upload, Search, Download, Trash, Copy, Image as ImageIcon, FileText, File } from "lucide-react";

interface MediaItem {
	id: string;
	name: string;
	type: "image" | "document" | "other";
	url: string;
	size: string;
	date: string;
}

const demoMedia: MediaItem[] = [
	{
		id: "1",
		name: "hero-image.jpg",
		type: "image",
		url: "/placeholder.jpg",
		size: "1.2 MB",
		date: "2024-01-15",
	},
	{
		id: "2",
		name: "document.pdf",
		type: "document",
		url: "/document.pdf",
		size: "2.5 MB",
		date: "2024-01-10",
	},
	{
		id: "3",
		name: "data.csv",
		type: "other",
		url: "/data.csv",
		size: "500 KB",
		date: "2024-01-16",
	},
];

export function MediaGrid() {
	const [searchQuery, setSearchQuery] = useState("");
	const [media] = useState<MediaItem[]>(demoMedia);

	const filteredMedia = media.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

	const getFileIcon = (type: MediaItem["type"]) => {
		switch (type) {
			case "image":
				return <ImageIcon className="h-12 w-12 text-blue-500" />;
			case "document":
				return <FileText className="h-12 w-12 text-red-500" />;
			default:
				return <File className="h-12 w-12 text-gray-500" />;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Media Library</h1>
				<Button>
					<Upload className="w-4 h-4 mr-2" />
					Upload Files
				</Button>
			</div>

			<Card className="p-6">
				<div className="flex items-center gap-4 mb-6">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input placeholder="Search media..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
					</div>
					<Button variant="outline">Filter</Button>
				</div>

				<ScrollArea className="h-[600px] pr-4">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{filteredMedia.map((item) => (
							<Card key={item.id} className="relative group">
								<div className="p-4 flex flex-col items-center">
									{getFileIcon(item.type)}
									<p className="mt-2 text-sm font-medium truncate w-full text-center">{item.name}</p>
									<p className="text-xs text-muted-foreground">{item.size}</p>
								</div>

								<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<Download className="mr-2 h-4 w-4" />
												Download
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Copy className="mr-2 h-4 w-4" />
												Copy URL
											</DropdownMenuItem>
											<DropdownMenuItem className="text-red-600">
												<Trash className="mr-2 h-4 w-4" />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</Card>
						))}
					</div>
				</ScrollArea>
			</Card>
		</div>
	);
}
