import { Settings, Layout, Box, Type, PaintBucket, Layers, ChevronRight } from "lucide-react";
import { CommonSidebar, SidebarSection, SidebarItem } from "@/components/common/sidebar";
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

export function RightSidebar({ isOpen, selectedElement }: RightSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="right">
			{selectedElement ? (
				<div className="h-full flex flex-col">
					<div className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a2a]">
						<div className="flex items-center gap-2">
							<Box className="w-4 h-4 text-purple-500" />
							<span className="text-sm font-medium">{selectedElement.tagName}</span>
							{selectedElement.classes && <span className="text-xs text-gray-400">.{selectedElement.classes.split(" ")[0]}</span>}
						</div>
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</div>

					<Tabs defaultValue="layout" className="flex-1">
						<TabsList className="w-full justify-start px-4 py-2 bg-transparent border-b border-[#2a2a2a]">
							<TabsTrigger value="layout" className="data-[state=active]:bg-[#2a2a2a]">
								<Layout className="w-4 h-4 mr-2" />
								Layout
							</TabsTrigger>
							<TabsTrigger value="style" className="data-[state=active]:bg-[#2a2a2a]">
								<PaintBucket className="w-4 h-4 mr-2" />
								Style
							</TabsTrigger>
						</TabsList>

						<TabsContent value="layout" className="p-4 space-y-4">
							<div className="space-y-2">
								<Label>Position</Label>
								<div className="grid grid-cols-2 gap-2">
									<Input placeholder="X" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="Y" className="bg-[#1a1a1a] border-[#2a2a2a]" />
								</div>
							</div>
							<div className="space-y-2">
								<Label>Size</Label>
								<div className="grid grid-cols-2 gap-2">
									<Input placeholder="Width" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="Height" className="bg-[#1a1a1a] border-[#2a2a2a]" />
								</div>
							</div>
							<div className="space-y-2">
								<Label>Margin</Label>
								<div className="grid grid-cols-4 gap-2">
									<Input placeholder="T" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="R" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="B" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="L" className="bg-[#1a1a1a] border-[#2a2a2a]" />
								</div>
							</div>
							<div className="space-y-2">
								<Label>Padding</Label>
								<div className="grid grid-cols-4 gap-2">
									<Input placeholder="T" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="R" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="B" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input placeholder="L" className="bg-[#1a1a1a] border-[#2a2a2a]" />
								</div>
							</div>
						</TabsContent>

						<TabsContent value="style" className="p-4 space-y-4">
							<div className="space-y-2">
								<Label>Background</Label>
								<Input type="color" className="h-8 bg-[#1a1a1a] border-[#2a2a2a]" />
							</div>
							<div className="space-y-2">
								<Label>Border</Label>
								<div className="grid grid-cols-2 gap-2">
									<Input placeholder="Width" className="bg-[#1a1a1a] border-[#2a2a2a]" />
									<Input type="color" className="h-8 bg-[#1a1a1a] border-[#2a2a2a]" />
								</div>
							</div>
							<div className="space-y-2">
								<Label>Border Radius</Label>
								<Input placeholder="px" className="bg-[#1a1a1a] border-[#2a2a2a]" />
							</div>
						</TabsContent>
					</Tabs>
				</div>
			) : (
				<div className="p-4">
					<p className="text-xs text-gray-400">Select an element on the canvas to activate this panel</p>
				</div>
			)}
		</CommonSidebar>
	);
}
