import { motion } from "framer-motion";
import { Bot, Database, Plus, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useBuildStore } from "@/app/cms/build/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AISuggestions() {
	// Cast store to any to access AI suggestion helpers that may not be typed yet
	const {
		aiSuggestedNodes = [],
		generateNodeSuggestions = () => {},
		convertSuggestionToNode = () => {},
		// biome-ignore lint/suspicious/noExplicitAny: Zustand store type inference
	} = useBuildStore() as any;

	useEffect(() => {
		generateNodeSuggestions();
	}, [generateNodeSuggestions]);

	if (aiSuggestedNodes.length === 0) return null;

	return (
		<Card className="bg-card border-border shadow-lg">
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<Bot className="w-4 h-4 text-blue-400" />
						<h3 className="text-sm font-medium text-foreground">
							AI Table Suggestions
						</h3>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => generateNodeSuggestions()}
						className="h-7 w-7 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
					>
						<Sparkles className="h-3.5 w-3.5" />
					</Button>
				</div>

				<ScrollArea className="h-[calc(100vh-280px)]">
					<div className="gap-3 flex flex-col">
						{/* biome-ignore lint/suspicious/noExplicitAny: Suggestion type is dynamic */}
						{aiSuggestedNodes.map((suggestion: any) => (
							<motion.div
								key={suggestion.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								className="group"
							>
								<div className="p-3 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 bg-card hover:bg-card/80 gap-2 flex flex-col">
									<div className="flex items-start justify-between gap-2">
										<div className="flex items-center gap-2">
											<Database className="w-4 h-4 text-primary" />
											<div>
												<h4 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
													{suggestion.name}
												</h4>
												<div className="flex items-center gap-2">
													<p className="text-xs text-muted-foreground">
														{suggestion.details.length} fields
													</p>
													<Badge
														variant="secondary"
														className="bg-primary/10 text-primary text-[10px] px-1.5"
													>
														{suggestion.confidence}% match
													</Badge>
												</div>
											</div>
										</div>
									</div>

									<HoverCard>
										<HoverCardTrigger>
											<p className="text-xs text-muted-foreground line-clamp-2 cursor-help">
												{suggestion.reason}
											</p>
										</HoverCardTrigger>
										<HoverCardContent
											side="right"
											className="w-80 bg-popover border-border text-popover-foreground"
										>
											<p className="text-sm">{suggestion.reason}</p>
											{suggestion.details.length > 0 && (
												<div className="mt-2 pt-2 border-t border-border">
													<p className="text-xs font-medium text-muted-foreground mb-1">
														Suggested Fields:
													</p>
													<ul className="text-xs text-foreground gap-1 flex flex-col">
														{suggestion.details
															.slice(0, 5)
															// biome-ignore lint/suspicious/noExplicitAny: Field type is dynamic
															.map((field: any) => (
																<li
																	key={field.id}
																	className="flex items-center gap-2"
																>
																	<span className="text-blue-400">
																		{field.label}
																	</span>
																	<span className="text-gray-500">
																		({field.type})
																	</span>
																</li>
															))}
														{suggestion.details.length > 5 && (
															<li className="text-gray-500">
																+{suggestion.details.length - 5} more fields...
															</li>
														)}
													</ul>
												</div>
											)}
										</HoverCardContent>
									</HoverCard>

									{suggestion.suggestedConnections &&
										suggestion.suggestedConnections.length > 0 && (
											<div className="text-[10px] text-gray-500">
												<span className="text-gray-400">Connects with: </span>
												{suggestion.suggestedConnections.map(
													// biome-ignore lint/suspicious/noExplicitAny: Connection type is dynamic
													(conn: any, i: number) => (
														<span key={`connection-${conn.targetNodeId || i}`}>
															<span className="text-blue-400">
																{conn.targetNodeId}
															</span>
															{i < suggestion.suggestedConnections?.length - 1
																? ", "
																: ""}
														</span>
													),
												)}
											</div>
										)}

									<Button
										size="sm"
										onClick={() => convertSuggestionToNode(suggestion.id)}
										className="w-full h-7 mt-2 bg-blue-500 hover:bg-blue-600 text-xs font-medium"
									>
										<Plus className="w-3.5 h-3.5 mr-1.5" />
										Add Table
									</Button>
								</div>
							</motion.div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
