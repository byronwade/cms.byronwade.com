"use client";

import { Download, Printer, Share2 } from "lucide-react";
import { useState } from "react";
import { CommonSidebar } from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AnalyticsRightSidebarProps {
	isOpen: boolean;
}

export function AnalyticsRightSidebar({ isOpen }: AnalyticsRightSidebarProps) {
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [autoRefresh, setAutoRefresh] = useState(false);

	return (
		<CommonSidebar isOpen={isOpen} side="right">
			<div className="gap-6 flex flex-col">
				{/* Date Range */}
				<div className="gap-3 flex flex-col">
					<h3 className="text-sm font-medium text-foreground">Date Range</h3>
					<div className="w-full">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							className="w-full rounded-md border border-border bg-card"
							classNames={{
								months: "w-full",
								month: "w-full",
								table: "w-full",
								head_cell: "text-muted-foreground text-xs p-0",
								cell: "text-xs p-0",
								day: "h-7 w-7 text-center text-xs p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
								day_selected:
									"bg-accent text-accent-foreground hover:bg-accent/80 hover:text-accent-foreground focus:bg-accent/80 focus:text-accent-foreground",
								day_today: "bg-muted text-foreground",
								day_outside: "text-muted-foreground opacity-50",
								day_disabled: "text-muted-foreground opacity-50",
								day_range_middle:
									"aria-selected:bg-accent aria-selected:text-accent-foreground",
								day_hidden: "invisible",
								nav_button:
									"text-muted-foreground hover:text-foreground hover:bg-accent border border-border h-7 w-7",
								nav_button_previous: "absolute left-1",
								nav_button_next: "absolute right-1",
								caption: "relative text-xs text-foreground mb-1 font-medium",
							}}
						/>
					</div>
				</div>

				{/* Auto Refresh */}
				<div className="gap-3 flex flex-col">
					<h3 className="text-sm font-medium text-foreground">Settings</h3>
					<div className="flex items-center justify-between gap-2">
						<Label
							htmlFor="auto-refresh"
							className="text-sm text-muted-foreground"
						>
							Auto Refresh
						</Label>
						<Switch
							id="auto-refresh"
							checked={autoRefresh}
							onCheckedChange={setAutoRefresh}
						/>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="gap-3 flex flex-col">
					<h3 className="text-sm font-medium text-foreground">Quick Actions</h3>
					<div className="gap-2 flex flex-col">
						<Button
							variant="ghost"
							size="sm"
							className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
						>
							<Download className="w-4 h-4 mr-2" />
							Export Data
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
						>
							<Share2 className="w-4 h-4 mr-2" />
							Share Report
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
						>
							<Printer className="w-4 h-4 mr-2" />
							Print Report
						</Button>
					</div>
				</div>
			</div>
		</CommonSidebar>
	);
}
