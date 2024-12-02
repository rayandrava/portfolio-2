import type { Metadata } from "next/types";

export const OpenGraph: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Rayandra Valera - Designer",
    template: "%s",
  },
  description: "...",
  keywords: ["Design", "Development", "Engineering"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    title: "Rayandra Valera - Designer",
    description: "...",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/og`],
    siteName: "Rayandra Valera - Designer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayandra Valera - Designer",
    description: "...",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/og`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
