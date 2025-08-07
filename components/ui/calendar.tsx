"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium text-white",
				nav: "space-x-1 flex items-center",
				nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-[#2a2a2a] border-[#3a3a3a] p-0 text-white hover:bg-[#3a3a3a] hover:text-white"),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell: "text-gray-400 rounded-md w-8 font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#3a3a3a]", props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"),
				day: cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0 font-normal text-white hover:bg-[#3a3a3a] hover:text-white aria-selected:opacity-100"),
				day_range_start: "day-range-start",
				day_range_end: "day-range-end",
				day_selected: "bg-[#3a3a3a] text-white hover:bg-[#4a4a4a] hover:text-white focus:bg-[#4a4a4a] focus:text-white",
				day_today: "bg-[#2a2a2a] text-white",
				day_outside: "text-gray-500 opacity-50 aria-selected:bg-[#3a3a3a]/50 aria-selected:text-gray-500",
				day_disabled: "text-gray-500 opacity-50",
				day_range_middle: "aria-selected:bg-[#3a3a3a] aria-selected:text-white",
				day_hidden: "invisible",
				...classNames,
			}}
                        components={{
                                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4 text-white" {...props} />,
                                IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4 text-white" {...props} />,
                        } as any}
			{...props}
		/>
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
