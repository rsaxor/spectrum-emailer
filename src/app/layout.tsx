import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      {/* The AuthProvider is no longer needed */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}