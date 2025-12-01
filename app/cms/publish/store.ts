import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";

export interface Comment {
	id: string;
	text: string;
	author: string;
}

export interface ContentItem {
	id: string;
	title: string;
	description: string;
	type: string;
	status: string;
	lastModified: string;
	relatedTo?: string;
	relationType?: string;
	scheduledFor?: string;
	assignedTo?: string;
	comments?: Comment[];
}

export interface Column {
	id: string;
	title: string;
}

export interface AIRecommendation {
	id: string;
	type: "move" | "schedule" | "optimize" | "workflow";
	title: string;
	description: string;
	actionType:
		| "move_item"
		| "schedule_publish"
		| "content_update"
		| "workflow_suggestion";
	priority: "high" | "medium" | "low";
	itemId: string;
	suggestedAction: {
		type: string;
		from?: string;
		to?: string;
		scheduledTime?: string;
		reason?: string;
	};
}

export interface AIAgentState {
	isAnalyzing: boolean;
	recommendations: AIRecommendation[];
	lastAnalysis: string | null;
}

export interface AISuggestedItem extends Omit<ContentItem, "id"> {
	id: string;
	isAISuggestion: true;
	confidence: number;
	reason: string;
}

interface PublishStore {
	items: ContentItem[];
	setItems: (
		items: ContentItem[] | ((prev: ContentItem[]) => ContentItem[]),
	) => void;
	selectedItem: ContentItem | null;
	setSelectedItem: (item: ContentItem | null) => void;
	sidebarOpen: boolean;
	setSidebarOpen: (open: boolean) => void;
	columns: Column[];
	setColumns: (columns: Column[] | ((prev: Column[]) => Column[])) => void;
	columnOrder: string[];
	setColumnOrder: (order: string[] | ((prev: string[]) => string[])) => void;
	newBoardId: string | null;
	setNewBoardId: (id: string | null) => void;
	handleAddBoard: () => void;
	handleDeleteBoard: (id: string) => void;
	aiSuggestedItems: Record<string, AISuggestedItem[]>;
	generateSuggestionsForColumn: (columnId: string) => void;
	convertSuggestionToItem: (suggestionId: string) => void;
	usedSuggestions: Set<string>;
}

export const initialColumns: Column[] = [
	{ id: "draft", title: "Draft" },
	{ id: "in-review", title: "In Review" },
	{ id: "scheduled", title: "Scheduled" },
	{ id: "published", title: "Published" },
];

export const demoContent: ContentItem[] = [
	{
		id: "homepage-redesign",
		title: "Homepage Redesign 2024",
		type: "page",
		description:
			"Complete overhaul of the main landing page with new hero section, testimonials, and product showcases",
		status: "draft",
		lastModified: "2 hours ago",
		assignedTo: "Sarah",
		comments: [
			{
				id: "1",
				text: "Need to coordinate with the marketing team on new copy",
				author: "John",
			},
			{
				id: "2",
				text: "Hero section assets are ready for review",
				author: "Sarah",
			},
		],
	},
	{
		id: "seo-meta",
		title: "SEO Metadata Updates",
		type: "seo",
		description:
			"Implementing new meta descriptions and title tags across all product pages",
		status: "draft",
		lastModified: "30 minutes ago",
		relatedTo: "product-category",
		relationType: "depends on",
		assignedTo: "Mike",
	},
	{
		id: "winter-campaign",
		title: "Winter Sale Campaign",
		type: "campaign",
		description:
			"Holiday season promotional campaign including email templates, landing pages, and social media assets",
		status: "draft",
		lastModified: "1 day ago",
		scheduledFor: "2024-01-15",
		assignedTo: "Emma",
		comments: [
			{
				id: "3",
				text: "Creative assets approved by marketing",
				author: "Emma",
			},
		],
	},
	{
		id: "product-category",
		title: "Product Category Restructure",
		type: "navigation",
		description:
			"Reorganizing product categories for better user navigation and SEO optimization",
		status: "in-review",
		lastModified: "3 days ago",
		assignedTo: "John",
		comments: [
			{
				id: "4",
				text: "UX team has approved the new structure",
				author: "Lisa",
			},
			{
				id: "5",
				text: "Need final sign-off from product team",
				author: "John",
			},
		],
	},
	{
		id: "blog-series",
		title: "Tech Trends 2024 Series",
		type: "blog",
		description:
			"A 6-part blog series covering emerging technology trends and their impact on e-commerce",
		status: "in-review",
		lastModified: "1 day ago",
		scheduledFor: "2024-02-01",
		assignedTo: "Lisa",
	},
	{
		id: "product-launch",
		title: "New Product Line Launch",
		type: "product",
		description:
			"Complete product documentation and marketing materials for the spring collection",
		status: "in-review",
		lastModified: "5 hours ago",
		relatedTo: "spring-campaign",
		relationType: "part of",
		assignedTo: "Mike",
		comments: [
			{ id: "6", text: "Product photos are now available", author: "Sarah" },
		],
	},
	{
		id: "black-friday",
		title: "Black Friday Campaign Launch",
		type: "campaign",
		description:
			"Complete Black Friday promotional campaign including doorbusters, flash sales, and email sequences",
		status: "scheduled",
		lastModified: "1 day ago",
		scheduledFor: "2024-11-29",
		assignedTo: "Emma",
		comments: [
			{ id: "11", text: "All promotional banners are ready", author: "Sarah" },
			{
				id: "12",
				text: "Email sequences approved by marketing",
				author: "Emma",
			},
		],
	},
	{
		id: "new-mobile-app",
		title: "Mobile App Launch Announcement",
		type: "page",
		description:
			"Official announcement and documentation for our new mobile app release",
		status: "scheduled",
		lastModified: "3 days ago",
		scheduledFor: "2024-01-10",
		assignedTo: "John",
		comments: [
			{ id: "13", text: "App Store approval received", author: "Mike" },
		],
	},
	{
		id: "year-review",
		title: "2023 Year in Review",
		type: "blog",
		description:
			"Annual review highlighting key achievements, product launches, and community stories",
		status: "scheduled",
		lastModified: "2 days ago",
		scheduledFor: "2023-12-28",
		assignedTo: "Lisa",
		relatedTo: "winter-campaign",
		relationType: "precedes",
		comments: [
			{ id: "14", text: "All department reports collected", author: "Lisa" },
			{ id: "15", text: "Infographics are ready for review", author: "Sarah" },
		],
	},
	{
		id: "spring-campaign",
		title: "Spring Collection Campaign",
		type: "campaign",
		description:
			"Main marketing campaign for the new spring product line including social media strategy",
		status: "ready",
		lastModified: "2 days ago",
		scheduledFor: "2024-03-01",
		assignedTo: "Emma",
	},
	{
		id: "api-docs",
		title: "API Documentation Update",
		type: "page",
		description:
			"Comprehensive update to developer documentation including new endpoints and examples",
		status: "ready",
		lastModified: "4 days ago",
		assignedTo: "John",
		comments: [
			{ id: "7", text: "All code examples have been tested", author: "Mike" },
			{ id: "8", text: "Added new authentication section", author: "John" },
		],
	},
	{
		id: "checkout-seo",
		title: "Checkout Flow SEO",
		type: "seo",
		description:
			"Optimization of checkout process pages for better search engine visibility",
		status: "ready",
		lastModified: "1 week ago",
		relatedTo: "checkout-redesign",
		relationType: "enhances",
		assignedTo: "Mike",
	},
	{
		id: "checkout-redesign",
		title: "Checkout Experience Redesign",
		type: "page",
		description:
			"Streamlined checkout process with improved mobile responsiveness and payment integration",
		status: "published",
		lastModified: "1 week ago",
		assignedTo: "Sarah",
		comments: [
			{
				id: "9",
				text: "A/B testing shows 15% improvement in conversion",
				author: "Emma",
			},
		],
	},
	{
		id: "holiday-guide",
		title: "Holiday Shopping Guide",
		type: "blog",
		description:
			"Curated gift guide featuring top products and exclusive holiday deals",
		status: "published",
		lastModified: "2 days ago",
		scheduledFor: "2023-12-01",
		assignedTo: "Lisa",
		comments: [
			{
				id: "10",
				text: "Social media team has started promotion",
				author: "Emma",
			},
		],
	},
	{
		id: "nav-update",
		title: "Navigation Menu Update",
		type: "navigation",
		description:
			"Implementation of new mega menu with improved category organization",
		status: "published",
		lastModified: "3 days ago",
		relatedTo: "product-category",
		relationType: "implements",
		assignedTo: "John",
	},
];

// Example AI recommendations
const _demoRecommendations: AIRecommendation[] = [
	{
		id: "r1",
		type: "move",
		title: "Ready for Review",
		description:
			"This content has met the basic requirements and appears ready for review.",
		actionType: "move_item",
		priority: "high",
		itemId: "1",
		suggestedAction: {
			type: "move",
			from: "draft",
			to: "in-review",
			reason: "Content completeness score above 80%",
		},
	},
	{
		id: "r2",
		type: "schedule",
		title: "Optimal Publishing Time",
		description:
			"Based on your audience analytics, schedule this post for maximum engagement.",
		actionType: "schedule_publish",
		priority: "medium",
		itemId: "4",
		suggestedAction: {
			type: "schedule",
			scheduledTime: "2024-02-01T09:00:00Z",
			reason: "Peak audience engagement time",
		},
	},
	{
		id: "r3",
		type: "workflow",
		title: "Content Dependencies",
		description:
			"Related content items should be published together for consistency.",
		actionType: "workflow_suggestion",
		priority: "medium",
		itemId: "2",
		suggestedAction: {
			type: "coordinate",
			reason: "Coordinate publishing with related SEO content",
		},
	},
];

// Example AI suggested items
const generateSuggestedItems = (
	columnId: string,
	usedSuggestions: Set<string>,
): AISuggestedItem[] => {
	const allSuggestions = {
		draft: [
			{
				title: "Product Review: Latest iPhone",
				description:
					"Comprehensive review of the newest iPhone features and comparisons",
				type: "blog",
				reason: "Based on trending topics and user engagement patterns",
				confidence: 85,
			},
			{
				title: "Holiday Gift Guide",
				description:
					"Curated selection of top tech gifts for the holiday season",
				type: "campaign",
				reason: "Seasonal content opportunity with high conversion potential",
				confidence: 92,
			},
			{
				title: "Top 10 Tech Trends",
				description: "Analysis of emerging technology trends and their impact",
				type: "blog",
				reason: "High search volume for tech trend content",
				confidence: 88,
			},
		],
		"in-review": [
			{
				title: "Tech Support FAQ",
				description: "Common questions and answers for product support",
				type: "page",
				reason: "Based on common support tickets and user queries",
				confidence: 78,
			},
			{
				title: "Product Comparison Guide",
				description: "Detailed comparison of our products with competitors",
				type: "page",
				reason: "High conversion impact content type",
				confidence: 85,
			},
		],
	};

	// Filter out used suggestions and create new ones
	const suggestions = (
		allSuggestions[columnId as keyof typeof allSuggestions] || []
	)
		.filter((suggestion) => !usedSuggestions.has(suggestion.title))
		.map((suggestion) => ({
			...suggestion,
			id: `ai-${uuidv4()}`,
			isAISuggestion: true as const,
			status: columnId,
			lastModified: "Just now",
		}));

	return suggestions;
};

export const usePublishStore = create<PublishStore>((set, get) => ({
	items: demoContent,
	setItems: (items) => {
		if (typeof items === "function") {
			set((state) => ({ items: items(state.items) }));
		} else {
			set({ items });
		}
	},
	selectedItem: null,
	setSelectedItem: (item) => {
		set((state) => {
			if (item && (!state.selectedItem || state.selectedItem.id !== item.id)) {
				return { selectedItem: item, sidebarOpen: true };
			}
			if (item && state.selectedItem && state.selectedItem.id === item.id) {
				return { selectedItem: item };
			}
			return { selectedItem: null, sidebarOpen: false };
		});
	},
	sidebarOpen: false,
	setSidebarOpen: (open) => set({ sidebarOpen: open }),
	columns: initialColumns,
	setColumns: (columns) => {
		if (typeof columns === "function") {
			set((state) => ({ columns: columns(state.columns) }));
		} else {
			set({ columns });
		}
	},
	columnOrder: initialColumns.map((col) => col.id),
	setColumnOrder: (order) => {
		if (typeof order === "function") {
			set((state) => ({ columnOrder: order(state.columnOrder) }));
		} else {
			set({ columnOrder: order });
		}
	},
	newBoardId: null,
	setNewBoardId: (id) => set({ newBoardId: id }),
	handleAddBoard: () => {
		const id = uuidv4();
		set((state) => ({
			columns: [{ id, title: "New Board" }, ...state.columns],
			columnOrder: [id, ...state.columnOrder],
			newBoardId: id,
		}));
	},
	handleDeleteBoard: (id) =>
		set((state) => ({
			columns: state.columns.filter((col) => col.id !== id),
			columnOrder: state.columnOrder.filter((colId) => colId !== id),
			items: state.items.filter((item) => item.status !== id),
		})),
	usedSuggestions: new Set<string>(),
	aiSuggestedItems: {},
	generateSuggestionsForColumn: (columnId: string) => {
		const _state = get();
		set((state) => ({
			aiSuggestedItems: {
				...state.aiSuggestedItems,
				[columnId]: generateSuggestedItems(columnId, state.usedSuggestions),
			},
		}));
	},
	convertSuggestionToItem: (suggestionId: string) => {
		const state = get();
		const foundSuggestion = Object.entries(state.aiSuggestedItems).reduce<
			[string, AISuggestedItem] | null
		>((acc, [colId, items]) => {
			const found = items.find((item) => item.id === suggestionId);
			return found ? [colId, found] : acc;
		}, null);

		if (!foundSuggestion) return;
		const [targetColumnId, suggestion] = foundSuggestion;

		// Add the suggestion title to used suggestions
		set((state) => ({
			usedSuggestions: new Set([...state.usedSuggestions, suggestion.title]),
		}));

		// Convert suggestion to real item
		const newItem: ContentItem = {
			id: uuidv4(),
			title: suggestion.title,
			description: suggestion.description,
			type: suggestion.type,
			status: targetColumnId,
			lastModified: new Date().toLocaleString(),
		};

		// Add the new item and remove the suggestion
		set((state) => ({
			items: [...state.items, newItem],
			aiSuggestedItems: {
				...state.aiSuggestedItems,
				[targetColumnId]:
					state.aiSuggestedItems[targetColumnId]?.filter(
						(item) => item.id !== suggestionId,
					) || [],
			},
		}));

		// Regenerate suggestions for all columns after a short delay
		setTimeout(() => {
			const currentState = get();
			const updatedSuggestions = Object.keys(
				currentState.aiSuggestedItems,
			).reduce(
				// biome-ignore lint/performance/noAccumulatingSpread: Need to build object from keys
				(acc, colId) => ({
					...acc,
					[colId]: generateSuggestedItems(colId, currentState.usedSuggestions),
				}),
				{},
			);

			set((_state) => ({
				aiSuggestedItems: updatedSuggestions,
			}));
		}, 100);
	},
}));
