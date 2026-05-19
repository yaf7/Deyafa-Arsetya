import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "deyafa.dev",
  description: "Portfolio of Deyafa Arsetya — Web & Mobile Developer based in Kediri, Indonesia. Specialized in Laravel, React, Next.js, and Kotlin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased min-h-screen bg-[#0B1120] text-white selection:bg-purple-900 selection:text-white`}
      >
        {/* Elegant Deep Slate Blue Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#0B1120]" />

        {children}
      </body>
    </html>
  );
}
