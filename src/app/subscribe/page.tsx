"use client";

import { useState, Suspense } from "react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Turnstile from "react-turnstile";

function SubscribeForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const entity = searchParams.get('entity') || 'Spectrum';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      toast.error("Please verify you are human.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, entity, token }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred.");
      }
      
      toast.success(data.message);
      setFullName("");
      setEmail("");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-center gap-6">
          <Image src="/spectrum.png" alt="Spectrum Logo" width={80} height={32} className="object-contain" />
          <Image src="/tcc.png" alt="TCC Logo" width={80} height={32} className="object-contain" />
          <Image src="/hos.png" alt="HOS Logo" width={80} height={32} className="object-contain" />
        </div>
        <CardTitle className="text-2xl mt-3 text-center">
          Subscribe to Our Newsletter
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information below to get the latest updates.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder=""
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder=""
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full my-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Subscribe
          </Button>
          <div className="flex justify-center w-full">
            <Turnstile
              sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onVerify={(token) => setToken(token)}
              size="normal"
            />
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function SubscribePage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <Suspense fallback={<div>Loading...</div>}>
                <SubscribeForm />
            </Suspense>
        </main>
    );
}