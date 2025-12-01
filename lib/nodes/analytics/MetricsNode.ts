import { Input, Output } from "@nodl/core";
import { combineLatest, map, Observable } from "rxjs";
import {
	DateRangeSchema,
	MetricTypeSchema,
	TimeSeriesDataSchema,
} from "./schemas";

interface TimeSeriesData {
	timestamp: Date;
	value: number;
}

// Mock data generator (replace with real API calls later)
const generateMockData = (dateRange: {
	start: Date;
	end: Date;
}): TimeSeriesData[] => {
	const days = Math.ceil(
		(dateRange.end.getTime() - dateRange.start.getTime()) /
			(1000 * 60 * 60 * 24),
	);
	return Array.from({ length: days }, (_, i) => ({
		timestamp: new Date(dateRange.start.getTime() + i * 24 * 60 * 60 * 1000),
		value: Math.floor(Math.random() * 1000),
	}));
};

export class MetricsNode {
	name = "Analytics Metrics";

	inputs = {
		dateRange: new Input({
			name: "Date Range",
			type: DateRangeSchema,
			defaultValue: {
				start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				end: new Date(),
			},
		}),
		metric: new Input({
			name: "Metric Type",
			type: MetricTypeSchema,
			defaultValue: "users",
		}),
	};

	outputs = {
		timeSeriesData: new Output({
			name: "Time Series Data",
			type: TimeSeriesDataSchema,
			observable: combineLatest([
				this.inputs.dateRange,
				this.inputs.metric,
			]).pipe(map(([dateRange]) => generateMockData(dateRange))),
		}),
		currentValue: new Output({
			name: "Current Value",
			type: TimeSeriesDataSchema,
			observable: new Observable((subscriber) => {
				this.outputs.timeSeriesData.observable.subscribe((data) => {
					subscriber.next(data[data.length - 1]?.value || 0);
				});
			}),
		}),
		percentageChange: new Output({
			name: "Percentage Change",
			type: TimeSeriesDataSchema,
			observable: new Observable((subscriber) => {
				this.outputs.timeSeriesData.observable.subscribe((data) => {
					if (data.length < 2) {
						subscriber.next(0);
						return;
					}
					const current = data[data.length - 1].value;
					const previous = data[data.length - 2].value;
					subscriber.next(((current - previous) / previous) * 100);
				});
			}),
		}),
	};
}
