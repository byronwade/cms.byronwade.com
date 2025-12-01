"use client";

import {
	AlertTriangle,
	History,
	Key,
	Lock,
	LogOut,
	Shield,
	Smartphone,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function SecuritySettingsPage() {
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
	const [sessionTimeout, setSessionTimeout] = useState(30);
	const [passwordLastChanged] = useState("2024-01-01");
	const [activeSessions, setActiveSessions] = useState([
		{
			id: 1,
			device: "Chrome on MacOS",
			location: "San Francisco, US",
			lastActive: "2024-01-15T10:30:00",
			current: true,
		},
		{
			id: 2,
			device: "Safari on iPhone",
			location: "San Francisco, US",
			lastActive: "2024-01-14T15:45:00",
			current: false,
		},
	]);

	const handleEnableTwoFactor = useCallback(() => {
		setTwoFactorEnabled((prev) => {
			toast.success(
				`Two-factor authentication ${!prev ? "enabled" : "disabled"}`,
			);
			return !prev;
		});
	}, []);

	const handleSessionTimeout = useCallback((value: string) => {
		const timeout = parseInt(value, 10);
		if (Number.isNaN(timeout) || timeout < 0) return;
		setSessionTimeout(timeout);
		toast.success("Session timeout updated");
	}, []);

	// Optimistic update for session revocation
	const handleRevokeSession = useCallback(
		async (id: number) => {
			// Optimistic update - remove immediately
			const sessionToRemove = activeSessions.find((s) => s.id === id);
			setActiveSessions((prev) => prev.filter((session) => session.id !== id));
			toast.success("Session revoked successfully");

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 500));
			} catch (_error) {
				// Revert on error
				if (sessionToRemove) {
					setActiveSessions((prev) => [...prev, sessionToRemove]);
				}
				toast.error("Failed to revoke session");
			}
		},
		[activeSessions],
	);

	const handleChangePassword = useCallback(() => {
		toast.success("Password changed successfully");
	}, []);

	return (
		<div className="p-6 space-y-6">
			{/* Two-Factor Authentication */}
			<div>
				<h2 className="text-sm font-medium mb-2">Two-Factor Authentication</h2>
				<Card className="p-4 bg-card border-border">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Shield className="w-5 h-5 text-primary mt-1" />
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-medium text-card-foreground">
											Two-Factor Authentication (2FA)
										</h3>
										<p className="text-xs text-muted-foreground mt-1">
											Add an extra layer of security to your account by
											requiring both your password and an authentication code.
										</p>
									</div>
									<Switch
										checked={twoFactorEnabled}
										onCheckedChange={handleEnableTwoFactor}
									/>
								</div>
								{twoFactorEnabled && (
									<div className="mt-4 p-3 rounded-md bg-muted border border-border">
										<div className="flex items-center gap-3">
											<Smartphone className="w-4 h-4 text-muted-foreground" />
											<div>
												<p className="text-sm text-foreground">
													Use an authenticator app to scan the QR code
												</p>
												<p className="text-xs text-muted-foreground mt-1">
													We recommend using Google Authenticator or Authy
												</p>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</Card>
			</div>

			{/* Password Settings */}
			<div>
				<h2 className="text-sm font-medium mb-2 text-foreground">
					Password Settings
				</h2>
				<Card className="p-4 bg-card border-border">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Key className="w-5 h-5 text-primary mt-1" />
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-medium text-card-foreground">
											Change Password
										</h3>
										<p className="text-xs text-muted-foreground mt-1">
											Last changed on{" "}
											{new Date(passwordLastChanged).toLocaleDateString()}
										</p>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={handleChangePassword}
									>
										Change Password
									</Button>
								</div>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<History className="w-5 h-5 text-primary mt-1" />
							<div className="flex-1">
								<div>
									<h3 className="text-sm font-medium text-card-foreground">
										Session Timeout
									</h3>
									<p className="text-xs text-muted-foreground mt-1">
										Automatically log out after a period of inactivity
									</p>
								</div>
								<div className="flex items-center gap-4 mt-3">
									<Input
										type="number"
										value={sessionTimeout}
										onChange={(e) => handleSessionTimeout(e.target.value)}
										className="max-w-[100px] bg-muted border-border"
									/>
									<span className="text-sm text-muted-foreground">minutes</span>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>

			{/* Active Sessions */}
			<div>
				<h2 className="text-sm font-medium mb-2 text-foreground">
					Active Sessions
				</h2>
				<Card className="p-4 bg-card border-border">
					<div className="space-y-4">
						{activeSessions.map((session) => (
							<div
								key={session.id}
								className="flex items-center justify-between p-3 rounded-md bg-muted border border-border"
							>
								<div className="flex items-center gap-3">
									<Lock className="w-4 h-4 text-muted-foreground" />
									<div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-foreground">
												{session.device}
											</span>
											{session.current && (
												<Badge
													variant="secondary"
													className="bg-primary/10 text-primary hover:bg-primary/20"
												>
													Current
												</Badge>
											)}
										</div>
										<div className="flex items-center gap-2 mt-1">
											<span className="text-xs text-muted-foreground">
												{session.location}
											</span>
											<span className="text-xs text-muted-foreground">•</span>
											<span className="text-xs text-muted-foreground">
												Last active{" "}
												{new Date(session.lastActive).toLocaleDateString()}
											</span>
										</div>
									</div>
								</div>

								{!session.current && (
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleRevokeSession(session.id)}
										className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
									>
										<LogOut className="w-4 h-4" />
									</Button>
								)}
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* Security Alerts */}
			<div>
				<h2 className="text-sm font-medium mb-2 text-foreground">
					Security Alerts
				</h2>
				<Card className="p-4 bg-card border-border">
					<div className="flex items-start gap-3">
						<AlertTriangle className="w-5 h-5 text-primary mt-1" />
						<div>
							<h3 className="text-sm font-medium text-card-foreground">
								Security Recommendations
							</h3>
							<ul className="mt-2 space-y-2">
								{!twoFactorEnabled && (
									<li className="flex items-center gap-2 text-xs text-primary">
										<span>•</span>
										Enable two-factor authentication for enhanced security
									</li>
								)}
								<li className="flex items-center gap-2 text-xs text-muted-foreground">
									<span>•</span>
									Regularly review your active sessions and revoke unused ones
								</li>
								<li className="flex items-center gap-2 text-xs text-muted-foreground">
									<span>•</span>
									Change your password every 90 days for better security
								</li>
							</ul>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
