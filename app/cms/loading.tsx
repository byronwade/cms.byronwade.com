import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="gap-4 flex flex-col p-6">
			<Skeleton className="h-10 w-full" />
			<Skeleton className="h-48 w-full" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Skeleton className="h-24 w-full" />
				<Skeleton className="h-24 w-full" />
			</div>
		</div>
	);
}
