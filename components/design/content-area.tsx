import type React from "react";
import { useEffect, useRef, useState } from "react";

const GRAB_BAR_WIDTH = 8;
const MIN_CONTENT_WIDTH = 300;
const WEBSITE_URL = "https://www.byronwade.com";
const PROXY_URL = `/api/proxy?url=${encodeURIComponent(WEBSITE_URL)}`;

// Add device presets
export const DEVICE_PRESETS = {
	// Mobile Phones
	"iPhone SE": 375,
	"iPhone 12 Mini": 360,
	"iPhone 12/13/14": 390,
	"iPhone 12/13/14 Pro Max": 428,
	"Pixel 7": 412,
	"Samsung Galaxy S21": 360,
	"Samsung Galaxy S21 Ultra": 384,

	// Tablets
	"iPad Mini": 768,
	'iPad Air/Pro 10.5"': 834,
	'iPad Pro 11"': 834,
	'iPad Pro 12.9"': 1024,
	"Samsung Galaxy Tab S7": 800,
	"Surface Pro": 912,

	// Laptops/Desktops
	"Laptop (720p)": 1280,
	"Laptop (1080p)": 1920,
	"Desktop (1440p)": 2560,
	'iMac 24"': 4480,
	'iMac 27"': 5120,

	// Common Breakpoints
	xs: 320,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

export type DevicePreset = keyof typeof DEVICE_PRESETS;

interface ElementHighlight {
	element: HTMLElement;
	rect: DOMRect;
	tagName: string;
	classes: string;
}

interface DraggableElement extends ElementHighlight {
	parentElement: HTMLElement;
	index: number;
}

interface ContentAreaProps {
	initialWidth: number;
	onWidthChange: (width: number) => void;
	reactScanEnabled?: boolean;
	boundingBoxesEnabled?: boolean;
}

export function ContentArea({
	initialWidth,
	onWidthChange,
	reactScanEnabled = false,
	boundingBoxesEnabled = false,
}: ContentAreaProps) {
	const [contentWidth, setContentWidth] = useState(initialWidth);
	const [highlightedElement, setHighlightedElement] =
		useState<ElementHighlight | null>(null);
	const [selectedElement, setSelectedElement] =
		useState<ElementHighlight | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const activeHandleRef = useRef<"left" | "right" | null>(null);
	const [draggedElement, setDraggedElement] = useState<DraggableElement | null>(
		null,
	);
	const [dropTarget, setDropTarget] = useState<{
		element: HTMLElement;
		position: "before" | "after";
	} | null>(null);

	// Use ref to access current highlightedElement value in event handlers
	const highlightedElementRef = useRef<ElementHighlight | null>(null);

	// Keep ref in sync with state
	useEffect(() => {
		highlightedElementRef.current = highlightedElement;
	}, [highlightedElement]);

	// Clear highlights when features are toggled
	useEffect(() => {
		setHighlightedElement(null);
		setSelectedElement(null);
	}, []);

	// Update width when initialWidth changes (device preset changes)
	useEffect(() => {
		if (!isDragging) {
			setContentWidth(initialWidth);
		}
	}, [initialWidth, isDragging]);

	useEffect(() => {
		if (!isDragging) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef.current || !contentRef.current) return;

			const containerRect = containerRef.current.getBoundingClientRect();
			const contentRect = contentRef.current.getBoundingClientRect();

			let newWidth;
			if (activeHandleRef.current === "left") {
				// For left handle, calculate from the right edge
				const rightEdge = contentRect.right;
				newWidth = rightEdge - e.clientX;
			} else {
				// For right handle, calculate from the left edge
				const leftEdge = contentRect.left;
				newWidth = e.clientX - leftEdge;
			}

			// Apply constraints without padding
			const maxWidth = containerRect.width;
			const constrainedWidth = Math.max(
				MIN_CONTENT_WIDTH,
				Math.min(newWidth, maxWidth),
			);

			// Only update if the width has changed significantly
			if (Math.abs(constrainedWidth - contentWidth) > 1) {
				setContentWidth(constrainedWidth);
				onWidthChange(constrainedWidth);
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			activeHandleRef.current = null;
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		};

		document.addEventListener("mousemove", handleMouseMove, { passive: true });
		document.addEventListener("mouseup", handleMouseUp);

		document.body.style.userSelect = "none";
		document.body.style.cursor = "ew-resize";

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
			document.body.style.userSelect = "";
			document.body.style.cursor = "";
		};
	}, [isDragging, contentWidth, onWidthChange]);

	const handleMouseDown = (e: React.MouseEvent, handle: "left" | "right") => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
		activeHandleRef.current = handle;
	};

	const _handleDragStart = (e: DragEvent) => {
		const target = e.target as HTMLElement;
		if (!target || !target.parentElement) return;

		// Set draggable attributes
		target.setAttribute("draggable", "true");
		target.style.cursor = "move";

		// Store the drag data
		const siblings = Array.from(target.parentElement.children);
		const index = siblings.indexOf(target);

		setDraggedElement({
			element: target,
			parentElement: target.parentElement,
			index,
			rect: target.getBoundingClientRect(),
			tagName: target.tagName.toLowerCase(),
			classes: Array.from(target.classList).join(" "),
		});

		// Visual feedback
		target.style.opacity = "0.5";
		target.classList.add("dragging");
		setIsDragging(true);

		// Set drag data
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/plain", "");
		}
	};

	const _handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const target = e.target as HTMLElement;
		if (!draggedElement || !target || target === draggedElement.element) return;

		// Only allow dropping on elements that can contain children
		if (target.tagName === "HTML" || target.tagName === "BODY") return;

		const rect = target.getBoundingClientRect();
		const midpoint = rect.top + rect.height / 2;
		const position = e.clientY < midpoint ? "before" : "after";

		// Remove existing drop indicators
		const iframe = iframeRef.current;
		if (!iframe?.contentDocument) return;

		const indicators =
			iframe.contentDocument.querySelectorAll(".drop-indicator");
		indicators.forEach((indicator) => indicator.remove());

		// Add new drop indicator
		const indicator = document.createElement("div");
		indicator.className = "drop-indicator";
		indicator.style.cssText = `
			position: absolute;
			left: 0;
			right: 0;
			height: 4px;
			background-color: hsl(var(--primary));
			pointer-events: none;
			z-index: 99999;
			transition: transform 0.2s ease;
		`;

		indicator.style.top =
			position === "before" ? `${rect.top}px` : `${rect.bottom}px`;
		target.parentElement?.insertBefore(
			indicator,
			position === "before" ? target : target.nextSibling,
		);

		setDropTarget({ element: target, position });
		e.dataTransfer!.dropEffect = "move";
	};

	const _handleDrop = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const iframe = iframeRef.current;
		if (!draggedElement || !dropTarget || !iframe?.contentDocument) return;

		const { element: sourceElement, parentElement } = draggedElement;
		const { element: targetElement, position } = dropTarget;

		// Remove drop indicators
		const indicators =
			iframe.contentDocument.querySelectorAll(".drop-indicator");
		indicators.forEach((indicator) => indicator.remove());

		// Move the element
		if (position === "before") {
			parentElement.insertBefore(sourceElement, targetElement);
		} else {
			parentElement.insertBefore(sourceElement, targetElement.nextSibling);
		}

		// Reset states
		sourceElement.style.opacity = "1";
		sourceElement.classList.remove("dragging");
		sourceElement.style.cursor = "";
		setIsDragging(false);
		setDraggedElement(null);
		setDropTarget(null);
	};

	const _handleDragEnd = (e: DragEvent) => {
		const target = e.target as HTMLElement;
		if (!target) return;

		target.style.opacity = "1";
		target.classList.remove("dragging");
		setIsDragging(false);
		setDraggedElement(null);
		setDropTarget(null);
	};

	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe || !iframe.contentWindow || !iframe.contentDocument) return;

		// Clean up function
		const cleanup = () => {
			if (!iframe.contentDocument) return;

			// Remove all existing styles and scripts
			const styles = iframe.contentDocument.querySelectorAll(
				"style[data-designer-styles]",
			);
			styles?.forEach((style) => style.remove());

			const scripts = iframe.contentDocument.querySelectorAll(
				'script[src*="react-scan"]',
			);
			scripts?.forEach((script) => script.remove());

			// Remove event listeners if they exist
			if (handleMouseMove && handleClick) {
				iframe.contentDocument.removeEventListener(
					"mousemove",
					handleMouseMove,
					true,
				);
				iframe.contentDocument.removeEventListener("click", handleClick, true);
			}
		};

		// Function to handle mousemove
		const handleMouseMove = (e: MouseEvent) => {
			if (isDragging || !boundingBoxesEnabled || reactScanEnabled) return;
			const target = e.target as HTMLElement;
			if (!target || target.tagName === "HTML" || target.tagName === "BODY")
				return;

			const rect = target.getBoundingClientRect();
			const iframe = iframeRef.current;
			if (!iframe || !iframe.contentWindow) return;

			// Calculate position relative to the iframe's viewport
			const relativeTop = rect.top + (iframe.contentWindow.pageYOffset || 0);
			const relativeLeft = rect.left + (iframe.contentWindow.pageXOffset || 0);

			// Create the highlight rectangle
			setHighlightedElement({
				element: target,
				rect: new DOMRect(relativeLeft, relativeTop, rect.width, rect.height),
				tagName: target.tagName.toLowerCase(),
				classes: Array.from(target.classList).join(" "),
			});

			// Prevent default behavior
			e.preventDefault();
			e.stopPropagation();
		};

		// Function to handle click
		const handleClick = (e: MouseEvent) => {
			if (!boundingBoxesEnabled || reactScanEnabled) return;
			e.preventDefault();
			e.stopPropagation();

			const target = e.target as HTMLElement;
			if (!target || target.tagName === "HTML" || target.tagName === "BODY")
				return;

			const iframe = iframeRef.current;
			if (!iframe || !iframe.contentDocument) return;

			// Remove selection from all elements
			const allSelected = iframe.contentDocument.querySelectorAll(
				"[data-designer-selected]",
			);
			allSelected.forEach((el) => {
				el.removeAttribute("data-designer-selected");
				const handle = el.querySelector(".drag-handle");
				if (handle) handle.remove();
			});

			const currentHighlighted = highlightedElementRef.current;
			if (currentHighlighted) {
				setSelectedElement(currentHighlighted);
				target.setAttribute("data-designer-selected", "true");

				// Add drag handle
				const dragHandle = document.createElement("div");
				dragHandle.className = "drag-handle";
				dragHandle.innerHTML = "⋮⋮";
				target.appendChild(dragHandle);
			}
		};

		// Clean up before setting up new state
		cleanup();

		// Clear any existing highlights and selections
		setHighlightedElement(null);
		setSelectedElement(null);

		if (reactScanEnabled) {
			console.log("React Scan Enabled");
			// Add React Scan script
			const script = document.createElement("script");
			script.src = "https://unpkg.com/react-scan/dist/auto.global.js";
			script.async = true;
			iframe.contentDocument.head.appendChild(script);

			// Add React Scan indicator styles
			const style = document.createElement("style");
			style.setAttribute("data-designer-styles", "true");
			style.textContent = `
				* {
					cursor: default !important;
				}
			`;
			iframe.contentDocument.head.appendChild(style);
		} else if (boundingBoxesEnabled) {
			console.log("Bounding Boxes Enabled");
			// Add event listeners for bounding boxes
			iframe.contentDocument.addEventListener(
				"mousemove",
				handleMouseMove,
				true,
			);
			iframe.contentDocument.addEventListener("click", handleClick, true);

			// Add styles for bounding boxes
			const style = document.createElement("style");
			style.setAttribute("data-designer-styles", "true");
			style.textContent = `
				* {
					cursor: pointer !important;
				}
				*:hover {
					outline: 2px solid hsl(var(--primary) / 0.5) !important;
					outline-offset: -2px !important;
				}
				[data-designer-selected="true"] {
					outline: 2px solid hsl(var(--accent)) !important;
					outline-offset: -2px !important;
					position: relative !important;
				}
				.drag-handle {
					position: absolute !important;
					left: -20px !important;
					top: 50% !important;
					transform: translateY(-50%) !important;
					background: hsl(var(--card)) !important;
					color: hsl(var(--primary)) !important;
					padding: 2px 4px !important;
					border-radius: 4px !important;
					font-size: 14px !important;
					cursor: move !important;
					z-index: 99999 !important;
					opacity: 0;
					transition: opacity 0.2s ease !important;
					pointer-events: auto !important;
				}
				[data-designer-selected="true"]:hover .drag-handle {
					opacity: 1 !important;
				}
			`;
			iframe.contentDocument.head.appendChild(style);
		}

		return cleanup;
	}, [reactScanEnabled, boundingBoxesEnabled, isDragging]);

	// Update the navigation message handling
	useEffect(() => {
		const handleMessage = async (event: MessageEvent) => {
			if (event.data.type === "NAVIGATE") {
				const iframe = iframeRef.current;
				if (!iframe) return;

				// Clear any existing highlights
				setHighlightedElement(null);
				setSelectedElement(null);

				// Create the proxy URL
				const proxyUrl = `/api/proxy?url=${encodeURIComponent(event.data.url)}`;

				if (event.data.method?.toLowerCase() === "post" && event.data.data) {
					// Handle POST navigation
					const form = document.createElement("form");
					form.method = "POST";
					form.action = proxyUrl;
					form.target = iframe.name || "iframe-proxy";
					form.style.display = "none";

					// Add form data
					Object.entries(event.data.data).forEach(([key, value]) => {
						const input = document.createElement("input");
						input.type = "hidden";
						input.name = key;
						input.value = value as string;
						form.appendChild(input);
					});

					document.body.appendChild(form);
					form.submit();
					document.body.removeChild(form);
				} else {
					// Handle GET navigation
					iframe.src = proxyUrl;
				}
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative h-full flex flex-col items-center bg-muted"
		>
			<div className="flex justify-center flex-grow w-full">
				<div
					className="relative"
					style={{
						width: `${contentWidth}px`,
						transition: isDragging ? "none" : "width 0.3s ease-in-out",
					}}
				>
					{/* Content area */}
					<div
						ref={contentRef}
						className="relative overflow-hidden bg-background"
						style={{
							width: "100%",
							height: "100vh",
							transition: isDragging ? "none" : "width 0.2s ease",
						}}
					>
						{/* Iframe */}
						<iframe
							ref={iframeRef}
							src={PROXY_URL}
							className="w-full h-full border-0"
							sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-modals"
							style={{ pointerEvents: "auto" }}
							name="iframe-proxy"
							allow="clipboard-read; clipboard-write"
						/>

						{/* React Scan Overlay */}
						{reactScanEnabled && (
							<div className="absolute inset-0 pointer-events-none bg-foreground/5">
								<div className="absolute px-3 py-1 text-sm text-foreground rounded top-4 left-4 bg-background/10 border border-border">
									React Scan Active
								</div>
							</div>
						)}

						{/* Element Highlight Overlay */}
						{!reactScanEnabled &&
							boundingBoxesEnabled &&
							highlightedElement &&
							!selectedElement && (
								<div
									className="absolute z-[99999]"
									style={{
										top: `${highlightedElement.rect.top}px`,
										left: `${highlightedElement.rect.left}px`,
										width: `${highlightedElement.rect.width}px`,
										height: `${highlightedElement.rect.height}px`,
									}}
								>
									<div className="absolute inset-0 border-2 border-primary pointer-events-none bg-primary/10" />
									<div className="absolute left-0 flex items-center px-2 py-1 text-xs text-primary-foreground bg-primary rounded-t pointer-events-none -top-6">
										<span>{highlightedElement.tagName}</span>
										{highlightedElement.classes && (
											<span className="ml-1 opacity-75">
												.{highlightedElement.classes.split(" ")[0]}
											</span>
										)}
									</div>
								</div>
							)}

						{/* Selected Element Overlay */}
						{!reactScanEnabled && boundingBoxesEnabled && selectedElement && (
							<div
								className="absolute z-[99999]"
								style={{
									top: `${selectedElement.rect.top}px`,
									left: `${selectedElement.rect.left}px`,
									width: `${selectedElement.rect.width}px`,
									height: `${selectedElement.rect.height}px`,
								}}
							>
								<div className="absolute inset-0 border-2 border-accent pointer-events-none bg-accent/10" />
								<div className="absolute left-0 flex items-center px-2 py-1 text-xs text-accent-foreground bg-accent rounded-t pointer-events-none -top-6">
									<span>{selectedElement.tagName}</span>
									{selectedElement.classes && (
										<span className="ml-1 opacity-75">
											.{selectedElement.classes.split(" ")[0]}
										</span>
									)}
								</div>
							</div>
						)}

						{/* Drag Prevention Overlay */}
						{isDragging && (
							<div
								className="absolute inset-0 z-[99999]"
								style={{
									cursor: "ew-resize",
									userSelect: "none",
								}}
							/>
						)}
					</div>

					{/* Left resize handle */}
					<div
						className="absolute flex items-center justify-center cursor-ew-resize group"
						style={{
							width: `${GRAB_BAR_WIDTH}px`,
							left: -GRAB_BAR_WIDTH,
							top: 0,
							height: "100vh",
							backgroundColor:
								isDragging && activeHandleRef.current === "left"
									? "hsl(var(--primary))"
									: isHovering
										? "hsl(var(--primary))"
										: "hsl(var(--muted))",
							borderRight: "1px solid hsl(var(--border))",
							transition: "background-color 0.2s ease",
							zIndex: 10,
						}}
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						onMouseDown={(e) => handleMouseDown(e, "left")}
					>
						<div
							className={`${isHovering ? "text-primary-foreground" : "text-muted-foreground"} font-bold text-lg leading-none`}
						>
							⋮
						</div>
					</div>

					{/* Right resize handle */}
					<div
						className="absolute flex items-center justify-center cursor-ew-resize group"
						style={{
							width: `${GRAB_BAR_WIDTH}px`,
							right: -GRAB_BAR_WIDTH,
							top: 0,
							height: "100vh",
							backgroundColor:
								isDragging && activeHandleRef.current === "right"
									? "hsl(var(--primary))"
									: isHovering
										? "hsl(var(--primary))"
										: "hsl(var(--muted))",
							borderLeft: "1px solid hsl(var(--border))",
							transition: "background-color 0.2s ease",
							zIndex: 10,
						}}
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						onMouseDown={(e) => handleMouseDown(e, "right")}
					>
						<div
							className={`${isHovering ? "text-primary-foreground" : "text-muted-foreground"} font-bold text-lg leading-none`}
						>
							⋮
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
