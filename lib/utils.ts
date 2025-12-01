import { type ClassValue, clsx } from "clsx";
import {
	FileAudioIcon,
	FileIcon,
	FileTextIcon,
	ImageIcon,
	VideoIcon,
} from "lucide-react";
import { createElement } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
	if (bytes === 0) return "0 Bytes";

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

export function getFileTypeIcon(mimeType: string, className = "h-4 w-4") {
	switch (true) {
		case mimeType.startsWith("image/"):
			return createElement(ImageIcon, { className });
		case mimeType.startsWith("video/"):
			return createElement(VideoIcon, { className });
		case mimeType.startsWith("audio/"):
			return createElement(FileAudioIcon, { className });
		case mimeType.startsWith("text/") || mimeType.includes("document"):
			return createElement(FileTextIcon, { className });
		default:
			return createElement(FileIcon, { className });
	}
}

export function formatDuration(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
	}
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function getFileExtension(filename: string) {
	return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function generateBreadcrumbs(path: string) {
	const parts = path.split("/").filter(Boolean);
	return [
		{ name: "Home", path: "/" },
		...parts.map((part, index) => ({
			name: part,
			path: `/${parts.slice(0, index + 1).join("/")}`,
		})),
	];
}

export function isImageFile(mimeType: string) {
	return mimeType.startsWith("image/");
}

export function isVideoFile(mimeType: string) {
	return mimeType.startsWith("video/");
}

export function isAudioFile(mimeType: string) {
	return mimeType.startsWith("audio/");
}

export function getFileTypeFromMime(mimeType: string) {
	if (isImageFile(mimeType)) return "image";
	if (isVideoFile(mimeType)) return "video";
	if (isAudioFile(mimeType)) return "audio";
	if (mimeType.includes("pdf")) return "pdf";
	if (mimeType.includes("document")) return "document";
	if (mimeType.includes("spreadsheet")) return "spreadsheet";
	if (mimeType.includes("presentation")) return "presentation";
	return "other";
}
