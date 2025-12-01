"use client";

import { ExternalLink, HelpCircle } from "lucide-react";
import { CommonSidebar } from "@/components/common/sidebar";
import { Button } from "@/components/ui/button";

interface SettingsRightSidebarProps {
	isOpen: boolean;
}

export function SettingsRightSidebar({ isOpen }: SettingsRightSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="right">
			<div className="gap-6 flex flex-col">
				{/* Help Card */}
				<div className="gap-3 flex flex-col">
					<h3 className="text-sm font-medium text-foreground">Need Help?</h3>
					<div className="p-3 rounded-lg bg-muted gap-3 flex flex-col">
						<div className="flex items-start gap-3">
							<HelpCircle className="w-5 h-5 text-primary mt-0.5" />
							<div>
								<p className="text-xs text-muted-foreground mb-3">
									Check our documentation for detailed information about
									settings and configuration options.
								</p>
								<Button
									variant="ghost"
									size="sm"
									className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
								>
									<ExternalLink className="w-4 h-4 mr-2" />
									View Documentation
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Tips */}
				<div className="gap-3 flex flex-col">
					<h3 className="text-sm font-medium text-foreground">Quick Tips</h3>
					<div className="p-3 rounded-lg bg-muted">
						<ul className="gap-2 flex flex-col text-xs text-muted-foreground">
							<li>• Keep your workspace name short and memorable</li>
							<li>• Enable two-factor authentication for extra security</li>
							<li>• Regularly review your notification preferences</li>
							<li>• Check domain settings before going live</li>
						</ul>
					</div>
				</div>

				{/* Support Links */}
				<div className="gap-3 flex flex-col">
					<h3 className="text-sm font-medium text-foreground">Support</h3>
					<div className="gap-1 flex flex-col">
						<Button
							variant="ghost"
							size="sm"
							className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
						>
							Contact Support
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
						>
							Report a Bug
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent"
						>
							Feature Request
						</Button>
					</div>
				</div>
			</div>
		</CommonSidebar>
	);
}
