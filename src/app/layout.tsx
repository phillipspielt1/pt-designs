import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vdtsites.ca"),
  title: "VDT Test",
  description: "VDT Test - sandbox site for skills practice.",
  robots: { index: false, follow: false },
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
