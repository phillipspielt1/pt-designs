import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Corporate Design",
  description:
    "A structured, trustworthy, polished website style - built for finance, consulting, legal, and advisory firms that need authority in every pixel.",
  alternates: { canonical: "/showcase/professional" },
  openGraph: {
    title: "Professional Website Design - Van Duist & Treitel",
    description:
      "Structured, trustworthy, polished. Authority in every pixel.",
    url: "/showcase/professional",
  },
  twitter: {
    title: "Professional Website Design - Van Duist & Treitel",
    description:
      "Structured, trustworthy, polished. Authority in every pixel.",
  },
};

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
