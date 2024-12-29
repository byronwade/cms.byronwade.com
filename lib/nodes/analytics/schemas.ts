import { z } from "zod";
import { schema } from "@nodl/core";

// Basic schemas
export const DateRangeSchema = schema(
	"DateRange",
	z.object({
		start: z.date(),
		end: z.date(),
	})
);

export const MetricTypeSchema = schema("MetricType", z.enum(["users", "revenue", "conversion"]));

export const TimeSeriesDataSchema = schema(
	"TimeSeriesData",
	z.array(
		z.object({
			timestamp: z.date(),
			value: z.number(),
		})
	)
);

export const PageViewSchema = schema(
	"PageView",
	z.object({
		page: z.string(),
		views: z.number(),
		percentage: z.number(),
	})
);

export const ActivitySchema = schema(
	"Activity",
	z.object({
		type: z.string(),
		timestamp: z.date(),
		details: z.string(),
	})
);

export const AnalyticsSummarySchema = schema(
	"AnalyticsSummary",
	z.object({
		totalUsers: z.number(),
		totalRevenue: z.number(),
		conversionRate: z.number(),
		timeSeriesData: TimeSeriesDataSchema,
		topPages: z.array(PageViewSchema),
		recentActivity: z.array(ActivitySchema),
	})
);
