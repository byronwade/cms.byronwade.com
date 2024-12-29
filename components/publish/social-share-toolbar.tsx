"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram, Linkedin, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

const platforms = [
	{ id: "twitter", icon: Twitter, color: "text-blue-400 hover:text-blue-300", label: "Twitter" },
	{ id: "facebook", icon: Facebook, color: "text-blue-600 hover:text-blue-500", label: "Facebook" },
	{ id: "instagram", icon: Instagram, color: "text-pink-500 hover:text-pink-400", label: "Instagram" },
	{ id: "linkedin", icon: Linkedin, color: "text-blue-700 hover:text-blue-600", label: "LinkedIn" },
];

export function SocialShareToolbar({ onShare, className }: { onShare?: (platforms: string[]) => void; className?: string }) {
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

	const togglePlatform = (platformId: string) => {
		setSelectedPlatforms((prev) => (prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]));
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" size="tiny" className={cn("bg-transparent border-0 px-2 text-gray-400 hover:text-white hover:bg-[#3a3a3a]", selectedPlatforms.length > 0 && "text-blue-400", className)}>
					<Share2 className="w-4 h-4 mr-1.5" />
					Share
					{selectedPlatforms.length > 0 && (
						<Badge variant="secondary" className="ml-1.5 h-5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/10">
							{selectedPlatforms.length}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-56 p-2 bg-[#2a2a2a] border-[#3a3a3a]" align="end">
				<div className="space-y-1">
					{platforms.map((platform) => (
						<Button key={platform.id} variant="ghost" onClick={() => togglePlatform(platform.id)} className={cn("w-full justify-start px-2 py-1.5 h-8", selectedPlatforms.includes(platform.id) ? `${platform.color} bg-[#1a1a1a]` : "text-gray-400 hover:text-gray-300")}>
							<platform.icon className="w-4 h-4 mr-2" />
							<span className="text-sm">{platform.label}</span>
						</Button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
