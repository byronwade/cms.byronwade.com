"use client";

import { useCallback, useEffect, useState } from "react";
import { ContentArea } from "@/components/design/content-area";

export default function Page() {
	const [contentWidth, setContentWidth] = useState(1440);

	const handleWidthChange = useCallback((event: CustomEvent<number>) => {
		setContentWidth(event.detail);
	}, []);

	useEffect(() => {
		window.addEventListener(
			"content:width-change",
			handleWidthChange as EventListener,
		);
		return () => {
			window.removeEventListener(
				"content:width-change",
				handleWidthChange as EventListener,
			);
		};
	}, [handleWidthChange]);

	return (
		<div className="h-full">
			<ContentArea
				initialWidth={contentWidth}
				onWidthChange={setContentWidth}
			/>
		</div>
	);
}
