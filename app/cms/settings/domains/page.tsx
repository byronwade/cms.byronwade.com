"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, Trash2, ExternalLink, RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

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

	const handleAddDomain = () => {
		if (!newDomain) {
			toast.error("Please enter a domain name");
			return;
		}

		const domainExists = domains.some((d) => d.domain === newDomain);
		if (domainExists) {
			toast.error("Domain already exists");
			return;
		}

		const newDomainObj = {
			id: domains.length + 1,
			domain: newDomain,
			status: "pending",
			ssl: false,
			primary: domains.length === 0,
			addedOn: new Date().toISOString().split("T")[0],
		};

		setDomains([...domains, newDomainObj]);
		setNewDomain("");
		toast.success("Domain added successfully");
	};

	const handleRemoveDomain = (id: number) => {
		const domain = domains.find((d) => d.id === id);
		if (domain?.primary) {
			toast.error("Cannot remove primary domain");
			return;
		}

		setDomains(domains.filter((d) => d.id !== id));
		toast.success("Domain removed successfully");
	};

	const handleMakePrimary = (id: number) => {
		setDomains(
			domains.map((d) => ({
				...d,
				primary: d.id === id,
			}))
		);
		toast.success("Primary domain updated");
	};

	const handleRefreshStatus = (id: number) => {
		setDomains(
			domains.map((d) =>
				d.id === id
					? {
							...d,
							status: d.status === "pending" ? "active" : "pending",
							ssl: d.status === "pending" ? true : d.ssl,
					  }
					: d
			)
		);
		toast.success("Domain status refreshed");
	};

	const handleCopyText = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard");
	};

	return (
		<div className="p-6 space-y-6">
			{/* Add Domain */}
			<div>
				<h2 className="text-sm font-medium mb-2">Add Domain</h2>
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="space-y-4">
						<div>
							<Label htmlFor="new-domain">Domain Name</Label>
							<div className="flex items-center gap-4 mt-2">
								<Input id="new-domain" value={newDomain} onChange={(e) => setNewDomain(e.target.value)} placeholder="Enter domain name" className="max-w-[300px] bg-[#2a2a2a] border-[#3a3a3a] text-white" />
								<Button variant="outline" size="sm" onClick={handleAddDomain} className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white border-[#3a3a3a]">
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
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="space-y-4">
						{domains.map((domain) => (
							<div key={domain.id} className="flex items-center justify-between p-3 rounded-md bg-[#2a2a2a] border border-[#3a3a3a]">
								<div className="flex items-center gap-3">
									<Globe className="w-4 h-4 text-gray-400" />
									<div>
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium">{domain.domain}</span>
											{domain.primary ? (
												<Badge variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
													Primary
												</Badge>
											) : (
												<Button variant="ghost" size="sm" onClick={() => handleMakePrimary(domain.id)} className="px-2 py-0 h-5 text-xs text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
													Make Primary
												</Button>
											)}
											<Badge variant="secondary" className={domain.status === "active" ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"}>
												{domain.status === "active" ? "Active" : "Pending"}
											</Badge>
											{domain.ssl && (
												<Badge variant="secondary" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
													SSL
												</Badge>
											)}
										</div>
										<p className="text-xs text-gray-400 mt-1">Added on {new Date(domain.addedOn).toLocaleDateString()}</p>
									</div>
								</div>

								<div className="flex items-center gap-2">
									<Button variant="ghost" size="sm" onClick={() => window.open(`https://${domain.domain}`, "_blank")} className="text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
										<ExternalLink className="w-4 h-4" />
									</Button>
									<Button variant="ghost" size="sm" onClick={() => handleRefreshStatus(domain.id)} className="text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
										<RefreshCw className="w-4 h-4" />
									</Button>
									<Button variant="ghost" size="sm" onClick={() => handleRemoveDomain(domain.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10" disabled={domain.primary}>
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
				<Card className="p-4 bg-[#1a1a1a] border-[#2a2a2a]">
					<div className="space-y-4">
						<div>
							<Label>A Record</Label>
							<div className="mt-2 p-3 rounded-md bg-[#2a2a2a] border border-[#3a3a3a]">
								<div className="flex items-center justify-between">
									<code className="text-sm text-gray-400">@ IN A 123.456.789.0</code>
									<Button variant="ghost" size="sm" onClick={() => handleCopyText("@ IN A 123.456.789.0")} className="text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
										<Copy className="w-4 h-4" />
									</Button>
								</div>
							</div>
						</div>

						<div>
							<Label>CNAME Record</Label>
							<div className="mt-2 p-3 rounded-md bg-[#2a2a2a] border border-[#3a3a3a]">
								<div className="flex items-center justify-between">
									<code className="text-sm text-gray-400">www IN CNAME example.com.</code>
									<Button variant="ghost" size="sm" onClick={() => handleCopyText("www IN CNAME example.com.")} className="text-gray-400 hover:text-white hover:bg-[#3a3a3a]">
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
