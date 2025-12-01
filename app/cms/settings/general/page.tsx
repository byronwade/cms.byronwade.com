"use client";

import { Save, Trash2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function GeneralSettingsPage() {
	const [workspaceName, setWorkspaceName] = useState("My Workspace");
	const [darkMode, setDarkMode] = useState(true);
	const [autoSave, setAutoSave] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<"idle" | "saved" | "error">(
		"idle",
	);

	const handleWorkspaceNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setWorkspaceName(e.target.value);
		},
		[],
	);

	// Optimistic save handler
	const handleSave = useCallback(async () => {
		setIsSaving(true);
		setSaveStatus("idle");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));
			setSaveStatus("saved");
			setTimeout(() => setSaveStatus("idle"), 2000);
		} catch (_error) {
			setSaveStatus("error");
			setTimeout(() => setSaveStatus("idle"), 3000);
		} finally {
			setIsSaving(false);
		}
	}, []);

	return (
		<div className="relative h-screen flex flex-col">
			<div className="flex-1 overflow-auto">
				<div className="p-6 bg-background text-foreground">
					<div className="space-y-6">
						{/* Workspace Settings */}
						<div>
							<h2 className="text-sm font-medium text-foreground mb-2">
								Workspace Settings
							</h2>
							<div className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
								<div className="space-y-6">
									<div>
										<Label htmlFor="workspace-name" className="text-foreground">
											Workspace Name
										</Label>
										<div className="flex items-center gap-4 mt-2">
											<Input
												id="workspace-name"
												value={workspaceName}
												onChange={handleWorkspaceNameChange}
												className="max-w-[300px] bg-muted border-border"
											/>
											<Button
												variant="outline"
												size="sm"
												onClick={handleSave}
												disabled={isSaving}
												className="min-w-[80px]"
											>
												{isSaving ? (
													<span className="flex items-center gap-2">
														<div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
														Saving...
													</span>
												) : saveStatus === "saved" ? (
													<span className="flex items-center gap-2 text-green-600 dark:text-green-400">
														<Save className="w-4 h-4" />
														Saved
													</span>
												) : (
													<>
														<Save className="w-4 h-4 mr-2" />
														Save
													</>
												)}
											</Button>
										</div>
									</div>

									<div>
										<Label className="text-foreground">Workspace Avatar</Label>
										<div className="mt-2 flex items-start gap-4">
											<Avatar className="h-20 w-20 cursor-pointer border-2 border-border hover:border-primary transition-colors">
												<AvatarImage
													src="/placeholder.svg"
													alt="Workspace Avatar"
												/>
												<AvatarFallback className="bg-muted text-foreground">
													WS
												</AvatarFallback>
											</Avatar>
											<div className="space-y-2">
												<Button variant="outline" size="sm">
													<Upload className="w-4 h-4 mr-2" />
													Upload New Avatar
												</Button>
												<p className="text-xs text-muted-foreground">
													Recommended size: 256x256px. Max file size: 5MB.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Interface Settings */}
						<div>
							<h2 className="text-sm font-medium text-foreground mb-2">
								Interface Settings
							</h2>
							<div className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
								<div className="space-y-6">
									<div className="flex items-center justify-between">
										<div>
											<Label
												htmlFor="dark-mode"
												className="text-sm font-medium text-foreground"
											>
												Dark Mode
											</Label>
											<p className="text-xs text-muted-foreground mt-1">
												Enable dark mode for the interface
											</p>
										</div>
										<Switch
											id="dark-mode"
											checked={darkMode}
											onCheckedChange={setDarkMode}
										/>
									</div>

									<div className="flex items-center justify-between">
										<div>
											<Label
												htmlFor="auto-save"
												className="text-sm font-medium text-foreground"
											>
												Auto Save
											</Label>
											<p className="text-xs text-muted-foreground mt-1">
												Automatically save changes
											</p>
										</div>
										<Switch
											id="auto-save"
											checked={autoSave}
											onCheckedChange={setAutoSave}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Danger Zone */}
						<div>
							<h2 className="text-sm font-medium text-foreground mb-2">
								Danger Zone
							</h2>
							<div className="p-4 rounded-lg bg-card border border-border hover:border-destructive/50 transition-colors">
								<div className="space-y-4">
									<div>
										<div className="flex items-center justify-between mb-2">
											<div>
												<h3 className="text-sm font-medium text-red-400">
													Delete Workspace
												</h3>
												<p className="text-xs text-muted-foreground mt-1">
													This action cannot be undone. All data will be
													permanently deleted.
												</p>
											</div>
											<Badge
												variant="secondary"
												className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
											>
												Danger
											</Badge>
										</div>
										<Button
											variant="destructive"
											size="sm"
											className="w-full sm:w-auto"
										>
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
