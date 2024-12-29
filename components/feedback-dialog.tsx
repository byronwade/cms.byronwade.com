"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onOpenChange }) => {
	const [feedback, setFeedback] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log("Feedback submitted:", feedback);
		setFeedback("");
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] z-[9999]">
				<DialogHeader>
					<DialogTitle>Provide Feedback</DialogTitle>
					<DialogDescription>We value your input. Please share your thoughts or suggestions with us.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="feedback">Your feedback</Label>
							<Textarea id="feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Type your feedback here." className="h-32" required />
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Submit Feedback</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default FeedbackDialog;
