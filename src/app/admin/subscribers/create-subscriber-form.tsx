"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Subscriber } from "@/lib/subscriber.service";
import { useEntity } from "@/context/EntityContext";

interface CreateSubscriberFormProps {
	setOpen: (open: boolean) => void;
	onSuccess: (newSubscriber: Subscriber) => void;
}

export function CreateSubscriberForm({
	setOpen,
	onSuccess,
}: CreateSubscriberFormProps) {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { entity } = useEntity();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			// FIX: Use admin endpoint instead of public subscribe endpoint
			const response = await fetch("/api/admin/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, email, entity }),
			});

			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "An error occurred.");
			}

			setOpen(false);
			setFullName("");
			setEmail("");
			onSuccess(data.newSubscriber);
			toast.success(data.message);
		} catch (err) {
			if (err instanceof Error) {
				toast.error(err.message);
			} else {
				toast.error("An unexpected error occurred");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="grid gap-4 py-4">
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="fullName" className="text-right">
					Full Name
				</Label>
				<Input
					id="fullName"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					className="col-span-3"
					required
				/>
			</div>
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="email" className="text-right">
					Email
				</Label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="col-span-3"
					required
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
				Create Subscriber
			</Button>
		</form>
	);
}
