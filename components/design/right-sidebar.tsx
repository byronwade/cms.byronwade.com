"use client";

import { Box, ChevronRight, Layout, PaintBucket } from "lucide-react";
import { CommonSidebar } from "@/components/common/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RightSidebarProps {
	isOpen: boolean;
	selectedElement?: {
		tagName: string;
		classes: string;
	} | null;
}

function RightSidebar({ isOpen, selectedElement }: RightSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="right">
			{selectedElement ? (
				<div className="h-full flex flex-col">
					<div className="flex items-center justify-between px-4 py-2 border-b border-border">
						<div className="flex items-center gap-2">
							<Box className="w-4 h-4 text-primary" />
							<span className="text-sm font-medium text-foreground">
								{selectedElement.tagName}
							</span>
							{selectedElement.classes && (
								<span className="text-xs text-muted-foreground">
									.{selectedElement.classes.split(" ")[0]}
								</span>
							)}
						</div>
						<ChevronRight className="w-4 h-4 text-muted-foreground" />
					</div>

					<Tabs defaultValue="layout" className="flex-1">
						<TabsList className="w-full justify-start px-4 py-2 bg-transparent border-b border-border">
							<TabsTrigger
								value="layout"
								className="data-[state=active]:bg-accent"
							>
								<Layout className="w-4 h-4 mr-2" />
								Layout
							</TabsTrigger>
							<TabsTrigger
								value="style"
								className="data-[state=active]:bg-accent"
							>
								<PaintBucket className="w-4 h-4 mr-2" />
								Style
							</TabsTrigger>
						</TabsList>

						<TabsContent value="layout" className="p-4 gap-4 flex flex-col">
							<div className="gap-2 flex flex-col">
								<Label>Position</Label>
								<div className="grid grid-cols-2 gap-2">
									<Input placeholder="X" className="bg-muted border-border" />
									<Input
										placeholder="Y"
										className="bg-input border-border"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Size</Label>
								<div className="grid grid-cols-2 gap-2">
									<Input
										placeholder="Width"
										className="bg-input border-border"
									/>
									<Input
										placeholder="Height"
										className="bg-input border-border"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Margin</Label>
								<div className="grid grid-cols-4 gap-2">
									<Input
										placeholder="T"
										className="bg-input border-border"
									/>
									<Input
										placeholder="R"
										className="bg-input border-border"
									/>
									<Input
										placeholder="B"
										className="bg-input border-border"
									/>
									<Input
										placeholder="L"
										className="bg-input border-border"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Padding</Label>
								<div className="grid grid-cols-4 gap-2">
									<Input
										placeholder="T"
										className="bg-input border-border"
									/>
									<Input
										placeholder="R"
										className="bg-input border-border"
									/>
									<Input
										placeholder="B"
										className="bg-input border-border"
									/>
									<Input
										placeholder="L"
										className="bg-input border-border"
									/>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="style" className="p-4 gap-4 flex flex-col">
							<div className="gap-2 flex flex-col">
								<Label>Background</Label>
								<Input type="color" className="h-8 bg-muted border-border" />
							</div>
							<div className="space-y-2">
								<Label>Border</Label>
								<div className="grid grid-cols-2 gap-2">
									<Input
										placeholder="Width"
										className="bg-input border-border"
									/>
									<Input type="color" className="h-8 bg-muted border-border" />
								</div>
							</div>
							<div className="space-y-2">
								<Label>Border Radius</Label>
								<Input
									placeholder="px"
									className="bg-[#1a1a1a] border-[#2a2a2a]"
								/>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			) : (
				<div className="p-4">
					<p className="text-xs text-muted-foreground">
						Select an element on the canvas to activate this panel
					</p>
				</div>
			)}
		</CommonSidebar>
	);
}

export { RightSidebar };
