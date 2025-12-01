"use client";

import {
	Copy,
	ExternalLink,
	Globe,
	Plus,
	RefreshCw,
	Trash2,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DomainsSettingsPage() {
	const [newDomain, setNewDomain] = useState("");
	const [domains, setDomains] = useState([
		{
			id: 1,
			domain: "example.com",
			status: "active",
			ssl: true,
			primary: true,
			addedOn: "2024-01-01",
		},
		{
			id: 2,
			domain: "staging.example.com",
			status: "pending",
			ssl: true,
			primary: false,
			addedOn: "2024-01-01",
		},
	]);

	const handleAddDomain = useCallback(async () => {
		if (!newDomain) {
			toast.error("Please enter a domain name");
			return;
		}

		const domainExists = domains.some((d) => d.domain === newDomain);
		if (domainExists) {
			toast.error("Domain already exists");
			return;
		}

		// Optimistic update - add domain immediately
		const newDomainObj = {
			id: domains.length + 1,
			domain: newDomain,
			status: "pending" as const,
			ssl: false,
			primary: domains.length === 0,
			addedOn: new Date().toISOString().split("T")[0],
		};

		// Optimistically add to UI
		setDomains([...domains, newDomainObj]);
		const domainToAdd = newDomain;
		setNewDomain("");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 500));
			toast.success("Domain added successfully");
		} catch (_error) {
			// Revert on error
			setDomains(domains);
			setNewDomain(domainToAdd);
			toast.error("Failed to add domain");
		}
	}, [newDomain, domains]);

	const handleRemoveDomain = useCallback(
		async (id: number) => {
			const domain = domains.find((d) => d.id === id);
			if (domain?.primary) {
				toast.error("Cannot remove primary domain");
				return;
			}

			// Optimistic update - remove immediately
			const domainToRemove = domain;
			setDomains(domains.filter((d) => d.id !== id));
			toast.success("Domain removed successfully");

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 500));
			} catch (_error) {
				// Revert on error
				if (domainToRemove) {
					setDomains([...domains]);
				}
				toast.error("Failed to remove domain");
			}
		},
		[domains],
	);

	const handleMakePrimary = useCallback(
		async (id: number) => {
			// Optimistic update - update immediately
			const previousDomains = domains;
			setDomains(
				domains.map((d) => ({
					...d,
					primary: d.id === id,
				})),
			);
			toast.success("Primary domain updated");

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 500));
			} catch (_error) {
				// Revert on error
				setDomains(previousDomains);
				toast.error("Failed to update primary domain");
			}
		},
		[domains],
	);

	const handleRefreshStatus = useCallback(
		(id: number) => {
			setDomains(
				domains.map((d) =>
					d.id === id
						? {
								...d,
								status: d.status === "pending" ? "active" : "pending",
								ssl: d.status === "pending" ? true : d.ssl,
							}
						: d,
				),
			);
			toast.success("Domain status refreshed");
		},
		[domains],
	);

	const handleCopyText = useCallback((text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard");
	}, []);

	return (
		<div className="p-6 space-y-6">
			{/* Add Domain */}
			<div>
				<h2 className="text-sm font-medium mb-2">Add Domain</h2>
				<Card className="p-4 bg-card border-border">
					<div className="space-y-4">
						<div>
							<Label htmlFor="new-domain">Domain Name</Label>
							<div className="flex items-center gap-4 mt-2">
								<Input
									id="new-domain"
									value={newDomain}
									onChange={(e) => setNewDomain(e.target.value)}
									placeholder="Enter domain name"
									className="max-w-[300px] bg-muted border-border"
								/>
								<Button variant="outline" size="sm" onClick={handleAddDomain}>
									<Plus className="w-4 h-4 mr-2" />
									Add Domain
								</Button>
							</div>
						</div>
					</div>
				</Card>
			</div>

			{/* Domain List */}
			<div>
				<h2 className="text-sm font-medium mb-2">Domains</h2>
				<Card className="p-4 bg-card border-border">
					<div className="space-y-4">
						{domains.map((domain) => (
							<div
								key={domain.id}
								className="flex items-center justify-between p-3 rounded-md bg-muted border border-border"
							>
								<div className="flex items-center gap-3">
									<Globe className="w-4 h-4 text-muted-foreground" />
									<div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium text-card-foreground">
												{domain.domain}
											</span>
											{domain.primary ? (
												<Badge
													variant="secondary"
													className="bg-primary/10 text-primary hover:bg-primary/20"
												>
													Primary
												</Badge>
											) : (
												<Button
													variant="ghost"
													size="sm"
													onClick={() => handleMakePrimary(domain.id)}
													className="px-2 py-0 h-5 text-xs text-muted-foreground hover:text-foreground hover:bg-accent"
												>
													Make Primary
												</Button>
											)}
											<Badge
												variant="secondary"
												className={
													domain.status === "active"
														? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
														: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
												}
											>
												{domain.status === "active" ? "Active" : "Pending"}
											</Badge>
											{domain.ssl && (
												<Badge
													variant="secondary"
													className="bg-accent/10 text-accent hover:bg-accent/20"
												>
													SSL
												</Badge>
											)}
										</div>
										<p className="text-xs text-muted-foreground mt-1">
											Added on {new Date(domain.addedOn).toLocaleDateString()}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() =>
											window.open(`https://${domain.domain}`, "_blank")
										}
										className="text-muted-foreground hover:text-foreground hover:bg-accent"
									>
										<ExternalLink className="w-4 h-4" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleRefreshStatus(domain.id)}
										className="text-muted-foreground hover:text-foreground hover:bg-accent"
									>
										<RefreshCw className="w-4 h-4" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleRemoveDomain(domain.id)}
										className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
										disabled={domain.primary}
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>

			{/* DNS Configuration */}
			<div>
				<h2 className="text-sm font-medium mb-2">DNS Configuration</h2>
				<Card className="p-4 bg-card border-border">
					<div className="space-y-4">
						<div>
							<Label>A Record</Label>
							<div className="mt-2 p-3 rounded-md bg-muted border border-border">
								<div className="flex items-center justify-between">
									<code className="text-sm text-muted-foreground">
										@ IN A 123.456.789.0
									</code>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleCopyText("@ IN A 123.456.789.0")}
										className="text-muted-foreground hover:text-foreground hover:bg-accent"
									>
										<Copy className="w-4 h-4" />
									</Button>
								</div>
							</div>
						</div>

						<div>
							<Label>CNAME Record</Label>
							<div className="mt-2 p-3 rounded-md bg-muted border border-border">
								<div className="flex items-center justify-between">
									<code className="text-sm text-muted-foreground">
										www IN CNAME example.com.
									</code>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleCopyText("www IN CNAME example.com.")}
										className="text-muted-foreground hover:text-foreground hover:bg-accent"
									>
										<Copy className="w-4 h-4" />
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
