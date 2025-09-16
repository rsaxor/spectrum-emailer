"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// A wrapper component to use useSearchParams
function UnsubscribeContent() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id"); // Get the 'id' from the URL (e.g., /unsubscribe?id=...)

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleUnsubscribe = async () => {
		if (!id) {
			setMessage("No subscriber ID provided.");
			return;
		}

		setIsLoading(true);
		setMessage("");

		const response = await fetch("/api/unsubscribe", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});

		const data = await response.json();
		setMessage(data.message || "An error occurred.");
		setIsLoading(false);
	};

	if (!id) {
		return (
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Invalid Link</CardTitle>
					<CardDescription>
						This unsubscribe link is missing an ID.
					</CardDescription>
				</CardHeader>
			</Card>
		);
	}

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<div className="flex items-center justify-center gap-6">
					<Image
						src="/spectrum.png"
						alt="Spectrum Logo"
						width={80}
						height={32}
						className="object-contain"
					/>
					<Image
						src="/tcc.png"
						alt="TCC Logo"
						width={80}
						height={32}
						className="object-contain"
					/>
					<Image
						src="/hos.png"
						alt="HOS Logo"
						width={80}
						height={32}
						className="object-contain"
					/>
				</div>
				<CardTitle className="mt-4 text-center text-2xl">
					Unsubscribe
				</CardTitle>
				<CardDescription className="text-center">
					Are you sure you want to unsubscribe from our newsletter?
				</CardDescription>
			</CardHeader>
			<CardContent>
				{message ? (
					<p className="text-center text-xs">{message}</p>
				) : (
					<Button
						className="w-full"
						onClick={handleUnsubscribe}
						disabled={isLoading}
					>
						{isLoading && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						Confirm Unsubscribe
					</Button>
				)}
			</CardContent>
		</Card>
	);
}

// The main page component that wraps the content in Suspense
export default function UnsubscribePage() {
	return (
		<main className="flex items-center justify-center min-h-screen bg-gray-50">
			<Suspense fallback={<div>Loading...</div>}>
				<UnsubscribeContent />
			</Suspense>
		</main>
	);
}
