"use client";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js error boundary requires 'error' prop name
export default function Error({ error: errorInfo, reset }: ErrorProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4">
			<h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
			<p className="text-muted-foreground mb-4">
				{errorInfo.message || "An unexpected error occurred"}
			</p>
			<button
				type="button"
				onClick={reset}
				className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
			>
				Try again
			</button>
		</div>
	);
}
