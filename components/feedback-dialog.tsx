"use client";

import type React from "react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
	open,
	onOpenChange,
}) => {
	const [feedback, setFeedback] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");

	// Optimistic submit with loading state
	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (!feedback.trim()) return;

			setIsSubmitting(true);
			setSubmitStatus("idle");

			// Optimistic update - assume success
			const feedbackToSubmit = feedback;
			setFeedback("");

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 500));
				console.log("Feedback submitted:", feedbackToSubmit);
				setSubmitStatus("success");

				// Close dialog after brief success message
				setTimeout(() => {
					onOpenChange(false);
					setIsSubmitting(false);
					setSubmitStatus("idle");
				}, 1500);
			} catch (error) {
				console.error("Error submitting feedback:", error);
				setSubmitStatus("error");
				setFeedback(feedbackToSubmit); // Restore on error
				setIsSubmitting(false);
			}
		},
		[feedback, onOpenChange],
	);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Provide Feedback</DialogTitle>
					<DialogDescription>
						We value your input. Please share your thoughts or suggestions with
						us.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="feedback">Your feedback</Label>
							<Textarea
								id="feedback"
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
								placeholder="Type your feedback here."
								className="h-32"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="submit"
							disabled={isSubmitting || !feedback.trim()}
							className="min-w-[120px]"
						>
							{isSubmitting ? (
								<span className="flex items-center gap-2">
									<div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
									Submitting...
								</span>
							) : submitStatus === "success" ? (
								<span className="text-green-600 dark:text-green-400">
									✓ Submitted
								</span>
							) : submitStatus === "error" ? (
								"Retry"
							) : (
								"Submit Feedback"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default FeedbackDialog;
