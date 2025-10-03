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

function UnsubscribeContent() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
  	const entity = searchParams.get('entity') || 'Spectrum';

	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	const entityMap = {
		TCC: { alt: "The Card Co.", img: "/tcc.png", width: 80, height:32 },
		Spectrum: { alt: "Spectrum Sustainable Print", img: "/spectrum.png", width: 80, height:32 },
		HOS: { alt: "House of Spectrum", img: "/hos.png", width: 80, height:32 },
		All: { alt: "Spectrum Sustainable Print", img: "/all.png", width: 250, height:150 },
	} as const;

	const { alt, img, width, height } = entityMap[entity as keyof typeof entityMap] ?? entityMap.Spectrum;

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
			body: JSON.stringify({ id, entity }),
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
						src={img}
						alt={`${alt} Logo`}
						width={width}
						height={height}
						className="object-contain"
					/>
				</div>
				<CardTitle className="mt-1 text-center text-2xl">
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
