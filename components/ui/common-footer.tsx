"use client";

import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CommonFooterProps {
	leftSidebarOpen: boolean;
	rightSidebarOpen: boolean;
	className?: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
	centerContent?: React.ReactNode;
	lastSaved?: Date | null;
	environment?: "development" | "production" | "staging";
	status?: {
		type: "success" | "warning" | "error";
		text: string;
		icon?: React.ReactNode;
	};
	"aria-label"?: string;
}

export function CommonFooter({
	leftSidebarOpen,
	rightSidebarOpen,
	className = "",
	leftContent,
	rightContent,
	centerContent,
	lastSaved,
	environment = "development",
	status,
	"aria-label": ariaLabel,
}: CommonFooterProps) {
	const getLastSavedText = () => {
		if (!lastSaved) return "Not saved yet";
		const diff = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
		if (diff < 60) return "Just now";
		const minutes = Math.floor(diff / 60);
		return `${minutes}m ago`;
	};

	const getStatusVariant = (type: "success" | "warning" | "error") => {
		switch (type) {
			case "success":
				return "text-green-600 dark:text-green-400";
			case "warning":
				return "text-yellow-600 dark:text-yellow-400";
			case "error":
				return "text-destructive";
			default:
				return "";
		}
	};

	return (
		<footer
			className={cn(
				"relative flex h-[var(--footer-height)] items-center justify-between px-[var(--footer-padding-x)]",
				"border-t border-border bg-card text-xs text-muted-foreground",
				"shrink-0 w-full",
				className,
			)}
			aria-label={ariaLabel || "Page footer"}
			role="contentinfo"
		>
			<div className="flex items-center gap-4 min-w-0 flex-1">
				{leftContent && (
					<div className="flex items-center gap-2">{leftContent}</div>
				)}

				{lastSaved && (
					<>
						<Separator
							orientation="vertical"
							className="h-3 bg-border"
							aria-hidden="true"
						/>
						<span
							className="flex items-center gap-1.5 whitespace-nowrap"
							aria-label={`Last saved ${getLastSavedText()}`}
						>
							<Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
							<span>Last saved: {getLastSavedText()}</span>
						</span>
					</>
				)}

				{(environment || status) && (
					<>
						<Separator
							orientation="vertical"
							className="h-3 bg-border"
							aria-hidden="true"
						/>
						<div className="flex items-center gap-2">
							{environment && (
								<Badge
									variant="outline"
									className="bg-muted text-muted-foreground border-border capitalize"
									aria-label={`Environment: ${environment}`}
								>
									{environment}
								</Badge>
							)}
							{status && (
								<Badge
									variant="outline"
									className={cn(
										"bg-muted border-border flex items-center gap-1",
										getStatusVariant(status.type),
									)}
									aria-label={`Status: ${status.text}`}
								>
									{status.icon && <span aria-hidden="true">{status.icon}</span>}
									<span>{status.text}</span>
								</Badge>
							)}
						</div>
					</>
				)}
			</div>

			{centerContent && (
				<div
					className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
					aria-label="Footer center content"
				>
					{centerContent}
				</div>
			)}

			{rightContent && (
				<div
					className="flex items-center gap-4 shrink-0"
					aria-label="Footer right content"
				>
					{rightContent}
				</div>
			)}
		</footer>
	);
}
