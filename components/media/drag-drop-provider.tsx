"use client";

import { type ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DragDropProviderProps {
	children: ReactNode;
	onFileDrop: (files: File[]) => void;
}

export function DragDropProvider({
	children,
	onFileDrop,
}: DragDropProviderProps) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			onFileDrop(acceptedFiles);
		},
		[onFileDrop],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		noClick: true,
		noKeyboard: true,
	});

	return (
		<div {...getRootProps()} className="relative h-full">
			<input {...getInputProps()} />
			{isDragActive && (
				<div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg z-50 flex items-center justify-center">
					<div className="text-center">
						<p className="text-lg font-medium">Drop files here</p>
						<p className="text-sm text-muted-foreground">
							Upload files to your media library
						</p>
					</div>
				</div>
			)}
			{children}
		</div>
	);
}
