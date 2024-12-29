"use client";

import { ContentArea } from "@/components/design/content-area";
import { useState, useEffect } from "react";

interface PageProps {
	reactScanEnabled?: boolean;
}

export default function Page({ reactScanEnabled = false }: PageProps) {
	const [contentWidth, setContentWidth] = useState(1440);

	useEffect(() => {
		const handleWidthChange = (event: CustomEvent<number>) => {
			setContentWidth(event.detail);
		};

		window.addEventListener("content:width-change", handleWidthChange as EventListener);
		return () => {
			window.removeEventListener("content:width-change", handleWidthChange as EventListener);
		};
	}, []);

	return (
		<div className="h-full">
			<ContentArea initialWidth={contentWidth} onWidthChange={setContentWidth} reactScanEnabled={reactScanEnabled} />
		</div>
	);
}
