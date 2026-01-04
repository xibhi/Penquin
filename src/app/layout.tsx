import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContextProvider";
import { RootProvider } from "fumadocs-ui/provider"
import Navbar from "@/components/index/Navbar";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://penquin.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Penquin ",
    template: "%s | Penquin Tool"
  },
  description: "Penquin is a powerful Cyber Security tool designed for Bug Bounty hunters and security researchers. Level up your game with pre-built commands, streamlined workflows, and insider resources. Cut the clutter and hack smarter with the Penquin Tool.",
  keywords: [
    "Penquin",
    "Penquin Tool",
    "Cyber Security",
    "Bug Bounty",
    "Bug Bounty Tools",
    "Ethical Hacking",
    "Penetration Testing",
    "Security Automation",
    "Reconnaissance",
    "Vulnerability Assessment",
    "AppSec",
    "Hacking Workflows",
    "InfoSec Tooling"
  ],
  authors: [{ name: "Penquin Team", url: "https://penquin.vercel.app" }],
  creator: "Penquin",
  publisher: "Penquin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Penquin - The Ultimate Cyber Security & Bug Bounty Tool",
    description: "Level up your bug bounty game with Penquin Tool. Pre-built commands, streamlined workflows, and insider resources for Cyber Security professionals.",
    url: 'https://penquin.vercel.app',
    siteName: "Penquin",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: "Penquin - Cyber Security Tool",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penquin - The Ultimate Cyber Security & Bug Bounty Tool",
    description: "Master Bug Bounty with Penquin. The essential tool for Cyber Security researchers featuring pre-built commands and elite workflows.",
    images: ['/logo.jpg'],
    creator: "@PenquinTool",
  },
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeContextProvider>
          <RootProvider>
            <Navbar />
            {children}
            <Analytics />
          </RootProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
