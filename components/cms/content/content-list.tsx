"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Plus, Search, Edit, Trash, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ContentItem {
	id: string;
	title: string;
	status: "published" | "draft";
	author: string;
	date: string;
	type: "post" | "page";
}

const demoContent: ContentItem[] = [
	{
		id: "1",
		title: "Getting Started with Next.js",
		status: "published",
		author: "John Doe",
		date: "2024-01-15",
		type: "post",
	},
	{
		id: "2",
		title: "About Us",
		status: "published",
		author: "Jane Smith",
		date: "2024-01-10",
		type: "page",
	},
	{
		id: "3",
		title: "Draft Post",
		status: "draft",
		author: "John Doe",
		date: "2024-01-16",
		type: "post",
	},
];

export function ContentList() {
	const [searchQuery, setSearchQuery] = useState("");
	const [content] = useState<ContentItem[]>(demoContent);

	const filteredContent = content.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Content</h1>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					New Content
				</Button>
			</div>

			<Card className="p-6">
				<div className="flex items-center gap-4 mb-6">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input placeholder="Search content..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
					</div>
					<Button variant="outline">Filter</Button>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Author</TableHead>
								<TableHead>Date</TableHead>
								<TableHead className="w-[100px]">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredContent.map((item) => (
								<TableRow key={item.id}>
									<TableCell className="font-medium">{item.title}</TableCell>
									<TableCell className="capitalize">{item.type}</TableCell>
									<TableCell>
										<div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{item.status}</div>
									</TableCell>
									<TableCell>{item.author}</TableCell>
									<TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>
													<Eye className="mr-2 h-4 w-4" />
													View
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Edit className="mr-2 h-4 w-4" />
													Edit
												</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													<Trash className="mr-2 h-4 w-4" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Card>
		</div>
	);
}
