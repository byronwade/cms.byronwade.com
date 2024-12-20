"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SettingsForm() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl font-bold">Settings</h1>
				<Button>Save Changes</Button>
			</div>

			<Tabs defaultValue="general" className="space-y-4">
				<TabsList>
					<TabsTrigger value="general">General</TabsTrigger>
					<TabsTrigger value="appearance">Appearance</TabsTrigger>
					<TabsTrigger value="advanced">Advanced</TabsTrigger>
				</TabsList>

				<TabsContent value="general" className="space-y-4">
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Site Information</h2>
						<div className="space-y-4">
							<div className="grid gap-2">
								<Label htmlFor="site-title">Site Title</Label>
								<Input id="site-title" placeholder="My Awesome Site" defaultValue="My CMS" />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="site-description">Site Description</Label>
								<Input id="site-description" placeholder="A brief description of your site" defaultValue="A modern content management system" />
							</div>
						</div>
					</Card>

					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Content Settings</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Comments</Label>
									<p className="text-sm text-muted-foreground">Enable comments on posts</p>
								</div>
								<Switch defaultChecked />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Media Optimization</Label>
									<p className="text-sm text-muted-foreground">Automatically optimize uploaded images</p>
								</div>
								<Switch defaultChecked />
							</div>
						</div>
					</Card>
				</TabsContent>

				<TabsContent value="appearance" className="space-y-4">
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Dark Mode</Label>
									<p className="text-sm text-muted-foreground">Enable dark mode for the admin interface</p>
								</div>
								<Switch />
							</div>
							<Separator />
							<div className="grid gap-2">
								<Label htmlFor="primary-color">Primary Color</Label>
								<Input id="primary-color" type="color" defaultValue="#000000" className="h-10 w-20" />
							</div>
						</div>
					</Card>
				</TabsContent>

				<TabsContent value="advanced" className="space-y-4">
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">Advanced Settings</h2>
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Developer Mode</Label>
									<p className="text-sm text-muted-foreground">Enable additional developer features</p>
								</div>
								<Switch />
							</div>
							<Separator />
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>API Access</Label>
									<p className="text-sm text-muted-foreground">Enable API access for external applications</p>
								</div>
								<Switch defaultChecked />
							</div>
						</div>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
