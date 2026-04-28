import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "deyafa.dev",
  description: "Web & Mobile Developer - Politeknik Negeri Malang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0B1120] text-white selection:bg-blue-900 selection:text-white`}
      >
        {/* Elegant Deep Slate Blue Background - Continuous, no black spots */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#0B1120]" />
        
        {children}
      </body>
    </html>
  );
}
