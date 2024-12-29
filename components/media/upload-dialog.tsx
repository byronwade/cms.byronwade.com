"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileIcon, X, AlertCircle, CheckCircle2, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import type { UploadingFile } from "@/app/cms/media/types";

interface UploadDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	currentPath: string;
	onUploadComplete: (files: UploadingFile[]) => void;
}

export function UploadDialog({ open, onOpenChange, currentPath, onUploadComplete }: UploadDialogProps) {
	const [files, setFiles] = useState<UploadingFile[]>([]);

	const onDrop = (acceptedFiles: File[]) => {
		const newFiles: UploadingFile[] = acceptedFiles.map((file) => ({
			id: Math.random().toString(36).substring(7),
			file,
			progress: 0,
			status: "pending",
			startTime: Date.now(),
			metadata: {
				size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
				format: file.type,
			},
		}));
		setFiles((prev) => [...prev, ...newFiles]);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: true,
	});

	useEffect(() => {
		if (!open) {
			setFiles([]);
		}
	}, [open]);

	const simulateUpload = async (file: UploadingFile) => {
		const steps = 10;
		const stepTime = 500;

		for (let i = 1; i <= steps; i++) {
			await new Promise((resolve) => setTimeout(resolve, stepTime));
			setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress: (i / steps) * 100, status: "uploading" } : f)));
		}

		setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "completed" } : f)));
	};

	const handleUpload = async () => {
		const uploadPromises = files.map((file) => simulateUpload(file));
		await Promise.all(uploadPromises);
		onUploadComplete(files);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-h-[90vh] overflow-y-auto p-0">
				<div className="flex flex-col h-[80vh]">
					<div {...getRootProps()} className={cn("flex-1 border-2 border-dashed rounded-lg m-4 flex flex-col items-center justify-center gap-4 transition-colors", isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25")}>
						<input {...getInputProps()} />
						<Upload className="h-12 w-12 text-muted-foreground" />
						<div className="text-center">
							<p className="text-lg font-medium">Drop files here or click to upload</p>
							<p className="text-sm text-muted-foreground mt-1">Upload files to {currentPath}</p>
						</div>
					</div>

					{files.length > 0 && (
						<div className="border-t p-4 space-y-4">
							<div className="space-y-4">
								{files.map((file) => (
									<div key={file.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
										<div className="w-10 h-10 flex items-center justify-center bg-background rounded-lg">
											<FileIcon className="w-6 h-6" />
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex items-center justify-between">
												<p className="text-sm font-medium truncate">{file.file.name}</p>
												<div className="flex items-center gap-2">
													{file.status === "error" && <AlertCircle className="w-4 h-4 text-destructive" />}
													{file.status === "completed" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
													<button onClick={() => setFiles((prev) => prev.filter((f) => f.id !== file.id))} className="text-muted-foreground hover:text-foreground">
														<X className="w-4 h-4" />
													</button>
												</div>
											</div>
											<div className="mt-2">
												<Progress value={file.progress} className="h-1" />
											</div>
											<div className="mt-1 flex items-center gap-4">
												<p className="text-xs text-muted-foreground">{file.metadata.size}</p>
												<p className="text-xs text-muted-foreground">{file.status === "completed" ? "Completed" : file.status === "error" ? file.error || "Upload failed" : `${Math.round(file.progress)}%`}</p>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="flex justify-end gap-2">
								<Button variant="outline" onClick={() => onOpenChange(false)}>
									Cancel
								</Button>
								<Button onClick={handleUpload} disabled={files.length === 0}>
									Upload {files.length} {files.length === 1 ? "file" : "files"}
								</Button>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
