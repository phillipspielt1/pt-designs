import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://vdtsites.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VDT Sites: Web Design for Small Business in Nanaimo, BC",
    template: "%s | VDT Sites",
  },
  description:
    "VDT Sites is a two-person web design studio in Nanaimo, BC. We build fast, modern, SEO-ready websites for small businesses.",
  keywords: [
    "web design Nanaimo",
    "small business websites",
    "web developer BC",
    "website design Vancouver Island",
    "VDT Sites",
  ],
  authors: [{ name: "VDT Sites" }],
  creator: "VDT Sites",
  publisher: "VDT Sites",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "VDT Sites",
    title: "VDT Sites: Web Design for Small Business in Nanaimo, BC",
    description:
      "A two-person web design studio in Nanaimo, BC. Fast, modern, SEO-ready websites for small businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VDT Sites: Web Design for Small Business",
    description:
      "A two-person web design studio in Nanaimo, BC. Fast, modern websites for small businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=Hanken+Grotesk:wght@300..600&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400..700&family=IBM+Plex+Mono:wght@400..600&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
