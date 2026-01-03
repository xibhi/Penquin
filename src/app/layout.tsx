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
  title: "Penquin",
  description: "Level up your bug bounty game with pre-built commands, streamlined workflows, and insider resources. Cut the clutter and hack smarter.",
  keywords: ["bug bounty", "penetration testing", "cybersecurity", "ethical hacking", "security tools", "command line", "hacking workflows"],
  openGraph: {
    title: "Penquin",
    description: "Level up your bug bounty game with pre-built commands, streamlined workflows, and insider resources.",
    siteName: "Penquin",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: "Penquin Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Penquin",
    description: "Level up your bug bounty game with pre-built commands, streamlined workflows, and insider resources.",
    images: ['/logo.jpg'],
  },
  icons: {
    icon: '/logo.jpg'
  },
  robots: {
    index: true,
    follow: true,
  }
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
