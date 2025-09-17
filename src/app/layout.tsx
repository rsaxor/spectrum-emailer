import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { EntityProvider } from "@/context/EntityContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spectrum Emailer",
  description: "In-house emailer system by Spectrum Dev - rsaxor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EntityProvider>
          {children}
          {/* Add the closeButton prop here */}
          <Toaster closeButton />
        </EntityProvider>
      </body>
    </html>
  );
}