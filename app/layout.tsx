import "@/styles/main.css";

import type { Metadata } from "next";

import { Providers } from "@/components/providers";
import { OpenGraph } from "@/lib/og";

import clsx from "clsx";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  ...OpenGraph,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(inter.className)} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <Providers>
          <RootProvider>
            <main className="mx-auto max-w-screen-sm overflow-x-hidden px-6 py-24 md:overflow-x-visible ">
              <article className="article">{children}</article>
            </main>
          </RootProvider>
        </Providers>
      </body>
    </html>
  );
}
