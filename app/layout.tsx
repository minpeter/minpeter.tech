import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

// import { Noto_Serif_KR as Serif } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "minpeter",
  description: "minpeter's blog - a blog about development",
};

export const FontSans = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../assets/fonts/AritaBuri-Medium.woff2",

      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/AritaBuri-SemiBold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body
        className={cn("min-h-screen font-sans antialiased", FontSans.className)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="container flex min-h-screen max-w-2xl flex-col py-8">
            <main className="flex flex-col space-y-2">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
