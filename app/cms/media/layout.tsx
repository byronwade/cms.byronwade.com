"use client";

export default function MediaLayout({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-1 flex-col">{children}</div>;
}
