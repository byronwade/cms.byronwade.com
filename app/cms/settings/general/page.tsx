"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, Trash2 } from "lucide-react";

export default function GeneralSettingsPage() {
	const [workspaceName, setWorkspaceName] = useState("My Workspace");
	const [darkMode, setDarkMode] = useState(true);
	const [autoSave, setAutoSave] = useState(true);

	return (
		<div className="relative h-screen flex flex-col">
			<div className="flex-1 overflow-auto">
				<div className="p-6 bg-[#1a1a1a] text-white">
					<div className="space-y-6">
						{/* Workspace Settings */}
						<div>
							<h2 className="text-sm font-medium text-white mb-2">Workspace Settings</h2>
							<div className="p-4 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<div className="space-y-6">
									<div>
										<Label htmlFor="workspace-name" className="text-white">
											Workspace Name
										</Label>
										<div className="flex items-center gap-4 mt-2">
											<Input id="workspace-name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} className="max-w-[300px] bg-[#3a3a3a] border-[#4a4a4a] text-white focus:ring-offset-[#2a2a2a]" />
											<Button variant="outline" size="sm" className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white border-[#4a4a4a]">
												<Save className="w-4 h-4 mr-2" />
												Save
											</Button>
										</div>
									</div>

									<div>
										<Label className="text-white">Workspace Avatar</Label>
										<div className="mt-2 flex items-start gap-4">
											<Avatar className="h-20 w-20 cursor-pointer border-2 border-[#4a4a4a] hover:border-blue-500 transition-colors">
												<AvatarImage src="/placeholder.svg" alt="Workspace Avatar" />
												<AvatarFallback className="bg-[#3a3a3a] text-white">WS</AvatarFallback>
											</Avatar>
											<div className="space-y-2">
												<Button variant="outline" size="sm" className="bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white border-[#4a4a4a]">
													<Upload className="w-4 h-4 mr-2" />
													Upload New Avatar
												</Button>
												<p className="text-xs text-gray-400">Recommended size: 256x256px. Max file size: 5MB.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Interface Settings */}
						<div>
							<h2 className="text-sm font-medium text-white mb-2">Interface Settings</h2>
							<div className="p-4 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<div className="space-y-6">
									<div className="flex items-center justify-between">
										<div>
											<Label htmlFor="dark-mode" className="text-sm font-medium text-white">
												Dark Mode
											</Label>
											<p className="text-xs text-gray-400 mt-1">Enable dark mode for the interface</p>
										</div>
										<Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
									</div>

									<div className="flex items-center justify-between">
										<div>
											<Label htmlFor="auto-save" className="text-sm font-medium text-white">
												Auto Save
											</Label>
											<p className="text-xs text-gray-400 mt-1">Automatically save changes</p>
										</div>
										<Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
									</div>
								</div>
							</div>
						</div>

						{/* Danger Zone */}
						<div>
							<h2 className="text-sm font-medium text-white mb-2">Danger Zone</h2>
							<div className="p-4 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] hover:border-[#4a4a4a] transition-colors">
								<div className="space-y-4">
									<div>
										<div className="flex items-center justify-between mb-2">
											<div>
												<h3 className="text-sm font-medium text-red-400">Delete Workspace</h3>
												<p className="text-xs text-gray-400 mt-1">This action cannot be undone. All data will be permanently deleted.</p>
											</div>
											<Badge variant="secondary" className="bg-red-500/10 text-red-400 hover:bg-red-500/20">
												Danger
											</Badge>
										</div>
										<Button variant="destructive" size="sm" className="w-full sm:w-auto">
											<Trash2 className="w-4 h-4 mr-2" />
											Delete Workspace
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
