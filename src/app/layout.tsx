import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Weather Web · Real-time Dashboard",
  description:
    "Real-time weather dashboard with city search, current conditions, 5-day forecast, caching, and dark/light theme.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://cdn.jsdelivr.net/npm/web-vitals@4/dist/web-vitals.iife.js"
          strategy="lazyOnload"
        />
        <Script id="web-vitals-init" strategy="lazyOnload">
          {`window.addEventListener("load", function () {
  if (window.webVitals && window.location.hostname === "localhost") {
    const logMetric = function (metric) {
      console.log("[web-vitals]", metric.name, metric.value);
    };
    window.webVitals.onCLS(logMetric);
    window.webVitals.onINP(logMetric);
    window.webVitals.onLCP(logMetric);
  }
});`}
        </Script>
      </body>
    </html>
  );
}
