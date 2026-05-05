import type { Metadata } from "next";
import Providers from "./providers";
import { Outfit } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ITC Pokedex | Next.js App Router",
  description: "Pokedex test application built with Next.js App Router, TailwindCSS, and TanStack Query.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`${outfit.className} min-h-full flex flex-col bg-slate-50 text-slate-900`} suppressHydrationWarning>
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
