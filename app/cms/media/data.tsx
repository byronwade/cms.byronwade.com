import { FileTextIcon, VideoIcon, ImageIcon } from "lucide-react";
import { Tags, Copy, Archive, Users, BarChart3, FileText } from "lucide-react";
import type { MediaFile } from "./types";
import { ReactNode } from "react";

interface Collection {
	id: string;
	title: string;
	description: string;
	count: number;
	icon: ReactNode;
}

export const smartCollections: Collection[] = [
	{
		id: "unused",
		title: "Unused Media",
		description: "Files not used in any content",
		count: 23,
		icon: <Tags className="h-4 w-4 text-purple-500" />,
	},
	{
		id: "duplicates",
		title: "Possible Duplicates",
		description: "Visually similar images",
		count: 8,
		icon: <Copy className="h-4 w-4 text-orange-500" />,
	},
	{
		id: "compress",
		title: "Compression Suggested",
		description: "Large files that can be optimized",
		count: 15,
		icon: <Archive className="h-4 w-4 text-blue-500" />,
	},
];

export const aiInsights: Collection[] = [
	{
		id: "faces",
		title: "People & Faces",
		description: "Images containing people",
		count: 45,
		icon: <Users className="h-4 w-4 text-green-500" />,
	},
	{
		id: "charts",
		title: "Charts & Graphs",
		description: "Data visualizations",
		count: 12,
		icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
	},
	{
		id: "text",
		title: "Text Heavy",
		description: "Images with significant text",
		count: 18,
		icon: <FileText className="h-4 w-4 text-orange-500" />,
	},
];

export const recentFiles: Omit<MediaFile, "path">[] = [
	{
		id: 1,
		title: "Program Evaluation Report",
		type: "word",
		user: "Carlos Slattery",
		action: "mentioned you",
		time: "27m ago",
		icon: <FileTextIcon className="h-4 w-4 text-blue-500" />,
		thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60",
		aiTags: ["document", "business", "report"],
		usage: {
			views: 128,
			downloads: 45,
			lastUsed: "2 days ago",
		},
		relatedFiles: [2, 4],
	},
	{
		id: 2,
		title: "Community Service",
		type: "powerpoint",
		user: "Robin Counts",
		action: "+4 others edited this",
		time: "2h ago",
		icon: <FileTextIcon className="h-4 w-4 text-orange-500" />,
		thumbnail: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60",
		aiTags: ["presentation", "community", "social"],
		usage: {
			views: 256,
			downloads: 89,
			lastUsed: "1 hour ago",
		},
		relatedFiles: [1],
	},
	{
		id: 3,
		title: "Fundraising Plan",
		type: "sway",
		user: "Chris Naidoo",
		action: "recorded a meeting",
		time: "Friday",
		icon: <VideoIcon className="h-4 w-4 text-purple-500" />,
		thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&auto=format&fit=crop&q=60",
		aiTags: ["video", "meeting", "fundraising"],
		usage: {
			views: 89,
			downloads: 12,
			lastUsed: "3 days ago",
		},
		relatedFiles: [4],
	},
	{
		id: 4,
		title: "Budget Breakdown FY23Q2",
		type: "excel",
		user: "David Power",
		action: "assigned you a task",
		time: "Thursday",
		icon: <FileTextIcon className="h-4 w-4 text-green-500" />,
		thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60",
		aiTags: ["spreadsheet", "finance", "quarterly"],
		usage: {
			views: 167,
			downloads: 34,
			lastUsed: "1 day ago",
		},
		relatedFiles: [1, 3],
	},
	{
		id: 5,
		title: "Team Photo 2023",
		type: "image",
		user: "Sarah Chen",
		action: "uploaded",
		time: "2 days ago",
		icon: <ImageIcon className="h-4 w-4 text-pink-500" />,
		thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60",
		aiTags: ["people", "team", "office"],
		usage: {
			views: 342,
			downloads: 56,
			lastUsed: "1 hour ago",
		},
		relatedFiles: [6],
		metadata: {
			dimensions: "2400x1600",
			size: "2.3 MB",
			format: "JPG",
		},
	},
	{
		id: 6,
		title: "Product Launch Video",
		type: "video",
		user: "Mike Ross",
		action: "edited",
		time: "3 days ago",
		icon: <VideoIcon className="h-4 w-4 text-purple-500" />,
		thumbnail: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?w=500&auto=format&fit=crop&q=60",
		aiTags: ["product", "marketing", "launch"],
		usage: {
			views: 567,
			downloads: 123,
			lastUsed: "5 hours ago",
		},
		relatedFiles: [5],
		metadata: {
			duration: "2:15",
			size: "45.6 MB",
			format: "MP4",
		},
	},
];