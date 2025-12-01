import type { ReactNode } from "react";

export interface FileMetadata {
	dimensions?: string;
	size: string;
	format: string;
	duration?: string;
}

export interface FileUsage {
	views: number;
	downloads: number;
	lastUsed: string;
}

export interface MediaFile {
	id: number;
	title: string;
	type: string;
	user: string;
	action: string;
	time: string;
	icon: ReactNode;
	thumbnail: string;
	aiTags: string[];
	usage: FileUsage;
	relatedFiles: number[];
	metadata?: FileMetadata;
	path: string;
}

export interface Folder {
	id: string;
	name: string;
	path: string;
	parentId?: string;
	createdAt: string;
	updatedAt: string;
	totalFiles: number;
	totalSize: string;
	color?: string;
	icon?: ReactNode;
	type: "folder";
	shared?: boolean;
	permissions?: {
		read: boolean;
		write: boolean;
		delete: boolean;
	};
}

export interface UploadingFile {
	id: string;
	file: File;
	progress: number;
	status: "pending" | "uploading" | "completed" | "error";
	startTime: number;
	metadata: {
		size: string;
		format: string;
	};
	error?: string;
}

export type FileSystemItem = MediaFile | Folder;

export interface FileSystemState {
	currentPath: string;
	selectedItems: string[];
	clipboard: {
		items: string[];
		action: "copy" | "cut" | null;
	};
	uploadQueue: UploadingFile[];
	breadcrumbs: Array<{
		name: string;
		path: string;
	}>;
}
