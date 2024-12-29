"use client";

import { Button } from "@/components/ui/button";
import { HelpCircle, ExternalLink } from "lucide-react";
import { CommonSidebar } from "@/components/common/sidebar";

interface SettingsRightSidebarProps {
	isOpen: boolean;
}

export function SettingsRightSidebar({ isOpen }: SettingsRightSidebarProps) {
	return (
		<CommonSidebar isOpen={isOpen} side="right">
			<div className="space-y-6">
				{/* Help Card */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-white">Need Help?</h3>
					<div className="p-3 rounded-lg bg-[#2a2a2a] space-y-3">
						<div className="flex items-start gap-3">
							<HelpCircle className="w-5 h-5 text-blue-400 mt-0.5" />
							<div>
								<p className="text-xs text-gray-400 mb-3">Check our documentation for detailed information about settings and configuration options.</p>
								<Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
									<ExternalLink className="w-4 h-4 mr-2" />
									View Documentation
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Tips */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-white">Quick Tips</h3>
					<div className="p-3 rounded-lg bg-[#2a2a2a]">
						<ul className="space-y-2 text-xs text-gray-400">
							<li>• Keep your workspace name short and memorable</li>
							<li>• Enable two-factor authentication for extra security</li>
							<li>• Regularly review your notification preferences</li>
							<li>• Check domain settings before going live</li>
						</ul>
					</div>
				</div>

				{/* Support Links */}
				<div className="space-y-3">
					<h3 className="text-sm font-medium text-white">Support</h3>
					<div className="space-y-1">
						<Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
							Contact Support
						</Button>
						<Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
							Report a Bug
						</Button>
						<Button variant="ghost" size="sm" className="w-full justify-start text-gray-400 hover:text-white hover:bg-[#2a2a2a]">
							Feature Request
						</Button>
					</div>
				</div>
			</div>
		</CommonSidebar>
	);
}
