"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CommonSidebar } from "@/components/common/sidebar";
import { Download, Share2, Printer } from "lucide-react";

interface AnalyticsRightSidebarProps {
	isOpen: boolean;
}

export function AnalyticsRightSidebar({ isOpen }: AnalyticsRightSidebarProps) {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [autoRefresh, setAutoRefresh] = useState(false);

	return (
		<CommonSidebar isOpen={isOpen} side="right">
			<div className="space-y-6">
				{/* Date Range */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-white">Date Range</h3>
					<div className="w-full">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							className="w-full rounded-md border border-[#3a3a3a] bg-[#2a2a2a]"
							classNames={{
								months: "w-full",
								month: "w-full",
								table: "w-full",
								head_cell: "text-gray-400 text-xs p-0",
								cell: "text-xs p-0",
								day: "h-7 w-7 text-center text-xs p-0 relative [&:has([aria-selected])]:bg-[#3a3a3a] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
								day_selected: "bg-[#3a3a3a] text-white hover:bg-[#4a4a4a] hover:text-white focus:bg-[#4a4a4a] focus:text-white",
								day_today: "bg-[#3a3a3a] text-white",
								day_outside: "text-gray-400 opacity-50",
								day_disabled: "text-gray-400 opacity-50",
								day_range_middle: "aria-selected:bg-[#3a3a3a] aria-selected:text-white",
								day_hidden: "invisible",
								nav_button: "text-gray-400 hover:text-white hover:bg-[#3a3a3a] border border-[#3a3a3a] h-7 w-7",
								nav_button_previous: "absolute left-1",
								nav_button_next: "absolute right-1",
								caption: "relative text-xs text-white mb-1 font-medium",
							}}
						/>
					</div>
				</div>

				{/* Auto Refresh */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-white">Settings</h3>
					<div className="flex items-center justify-between space-x-2">
						<Label htmlFor="auto-refresh" className="text-sm text-gray-400">
							Auto Refresh
						</Label>
						<Switch id="auto-refresh" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
					</div>
				</div>

				{/* Quick Actions */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-white">Quick Actions</h3>
					<div className="space-y-2">
						<Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
							<Download className="w-4 h-4 mr-2" />
							Export Data
						</Button>
						<Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
							<Share2 className="w-4 h-4 mr-2" />
							Share Report
						</Button>
						<Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
							<Printer className="w-4 h-4 mr-2" />
							Print Report
						</Button>
					</div>
				</div>
			</div>
		</CommonSidebar>
	);
}
