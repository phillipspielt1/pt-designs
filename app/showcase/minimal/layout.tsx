import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minimal Editorial Design",
  description:
    "A minimal editorial website style — light serif typography, full-bleed photography, and generous whitespace. Perfect for photographers, artists, and portfolio-first brands.",
  alternates: { canonical: "/showcase/minimal" },
  openGraph: {
    title: "Minimal Editorial Website Design — Van Duist & Treitel",
    description:
      "Editorial space, quiet confidence. For creatives whose work does the talking.",
    url: "/showcase/minimal",
  },
  twitter: {
    title: "Minimal Editorial Website Design — Van Duist & Treitel",
    description:
      "Editorial space, quiet confidence. For creatives whose work does the talking.",
  },
};

export default function MinimalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
