"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Lock, Key, Shield, Smartphone, AlertTriangle, History, LogOut } from "lucide-react";
import { toast } from "sonner";

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

	const handleEnableTwoFactor = () => {
		setTwoFactorEnabled(!twoFactorEnabled);
		toast.success(`Two-factor authentication ${!twoFactorEnabled ? "enabled" : "disabled"}`);
	};

	const handleSessionTimeout = (value: string) => {
		const timeout = parseInt(value);
		if (isNaN(timeout) || timeout < 0) return;
		setSessionTimeout(timeout);
		toast.success("Session timeout updated");
	};

	const handleRevokeSession = (id: number) => {
		setActiveSessions(activeSessions.filter((session) => session.id !== id));
		toast.success("Session revoked successfully");
	};

	const handleChangePassword = () => {
		toast.success("Password changed successfully");
	};

	return (
		<div className="p-6 space-y-6">
			{/* Two-Factor Authentication */}
			<div>
				<h2 className="text-sm font-medium mb-2">Two-Factor Authentication</h2>
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Shield className="w-5 h-5 text-blue-400 mt-1" />
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-medium">Two-Factor Authentication (2FA)</h3>
										<p className="text-xs text-gray-400 mt-1">Add an extra layer of security to your account by requiring both your password and an authentication code.</p>
									</div>
									<Switch checked={twoFactorEnabled} onCheckedChange={handleEnableTwoFactor} />
								</div>
								{twoFactorEnabled && (
									<div className="mt-4 p-3 rounded-md bg-[#2a2a2a] border border-[#3a3a3a]">
										<div className="flex items-center gap-3">
											<Smartphone className="w-4 h-4 text-gray-400" />
											<div>
												<p className="text-sm">Use an authenticator app to scan the QR code</p>
												<p className="text-xs text-gray-400 mt-1">We recommend using Google Authenticator or Authy</p>
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
				<h2 className="text-sm font-medium mb-2">Password Settings</h2>
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="space-y-4">
						<div className="flex items-start gap-3">
							<Key className="w-5 h-5 text-yellow-400 mt-1" />
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-medium">Change Password</h3>
										<p className="text-xs text-gray-400 mt-1">Last changed on {new Date(passwordLastChanged).toLocaleDateString()}</p>
									</div>
									<Button variant="outline" size="sm" onClick={handleChangePassword} className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border-[#3a3a3a]">
										Change Password
									</Button>
								</div>
							</div>
						</div>

						<div className="flex items-start gap-3">
							<History className="w-5 h-5 text-purple-400 mt-1" />
							<div className="flex-1">
								<div>
									<h3 className="text-sm font-medium">Session Timeout</h3>
									<p className="text-xs text-gray-400 mt-1">Automatically log out after a period of inactivity</p>
								</div>
								<div className="flex items-center gap-4 mt-3">
									<Input type="number" value={sessionTimeout} onChange={(e) => handleSessionTimeout(e.target.value)} className="max-w-[100px] bg-[#2a2a2a] border-[#3a3a3a] text-white" />
									<span className="text-sm text-gray-400">minutes</span>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>

			{/* Active Sessions */}
			<div>
				<h2 className="text-sm font-medium mb-2">Active Sessions</h2>
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="space-y-4">
						{activeSessions.map((session) => (
							<div key={session.id} className="flex items-center justify-between p-3 rounded-md bg-[#2a2a2a] border border-[#3a3a3a]">
								<div className="flex items-center gap-3">
									<Lock className="w-4 h-4 text-gray-400" />
									<div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium">{session.device}</span>
											{session.current && (
												<Badge variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
													Current
												</Badge>
											)}
										</div>
										<div className="flex items-center gap-2 mt-1">
											<span className="text-xs text-gray-400">{session.location}</span>
											<span className="text-xs text-gray-400">•</span>
											<span className="text-xs text-gray-400">Last active {new Date(session.lastActive).toLocaleDateString()}</span>
										</div>
									</div>
								</div>

								{!session.current && (
									<Button variant="ghost" size="sm" onClick={() => handleRevokeSession(session.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
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
				<h2 className="text-sm font-medium mb-2">Security Alerts</h2>
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="flex items-start gap-3">
						<AlertTriangle className="w-5 h-5 text-yellow-400 mt-1" />
						<div>
							<h3 className="text-sm font-medium">Security Recommendations</h3>
							<ul className="mt-2 space-y-2">
								{!twoFactorEnabled && (
									<li className="flex items-center gap-2 text-xs text-yellow-400">
										<span>•</span>
										Enable two-factor authentication for enhanced security
									</li>
								)}
								<li className="flex items-center gap-2 text-xs text-gray-400">
									<span>•</span>
									Regularly review your active sessions and revoke unused ones
								</li>
								<li className="flex items-center gap-2 text-xs text-gray-400">
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
