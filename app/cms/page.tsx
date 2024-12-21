import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DashboardPage() {
	return (
		<>
			<PageHeader>
				<div className="flex items-center justify-between w-full">
					<h1 className="text-lg font-semibold">Dashboard</h1>
					<div className="flex items-center gap-2">
						<Button size="tiny" className="gap-2">
							<Plus className="h-3.5 w-3.5" />
							Add Widget
						</Button>
					</div>
				</div>
			</PageHeader>

			<main className="flex-1 p-4">
				<div>
					<h2 className="text-lg font-semibold">Changelogs</h2>
				</div>
			</main>
		</>
	);
}
