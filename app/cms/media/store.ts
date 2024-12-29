import { create } from "zustand";
import type { MediaFile } from "./types";

interface MediaStore {
	selectedFilter: string;
	setSelectedFilter: (filter: string) => void;
	viewMode: "grid" | "list";
	setViewMode: (mode: "grid" | "list") => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedFile: MediaFile | null;
	setSelectedFile: (file: MediaFile | null) => void;
	selectedFiles: MediaFile[];
	setSelectedFiles: (files: MediaFile[]) => void;
	fileStats: Record<string, number>;
	setFileStats: (stats: Record<string, number>) => void;
	currentPath: string;
	setCurrentPath: (path: string) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
	selectedFilter: "all",
	setSelectedFilter: (filter) => set({ selectedFilter: filter }),
	viewMode: "grid",
	setViewMode: (mode) => set({ viewMode: mode }),
	searchQuery: "",
	setSearchQuery: (query) => set({ searchQuery: query }),
	selectedFile: null,
	setSelectedFile: (file) => set({ selectedFile: file }),
	selectedFiles: [],
	setSelectedFiles: (files) => set({ selectedFiles: files }),
	fileStats: {},
	setFileStats: (stats) => set({ fileStats: stats }),
	currentPath: "/",
	setCurrentPath: (path) => set({ currentPath: path }),
}));
