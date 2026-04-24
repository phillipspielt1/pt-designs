import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bold & Dark Luxury Design",
  description:
    "A cinematic, dramatic website style - built for luxury events, high-end hospitality, and brands that want to leave a lasting mark.",
  alternates: { canonical: "/showcase/bold" },
  openGraph: {
    title: "Bold & Dark Website Design - Van Duist & Treitel",
    description:
      "Cinematic and dramatic. For brands that leave a lasting mark.",
    url: "/showcase/bold",
  },
  twitter: {
    title: "Bold & Dark Website Design - Van Duist & Treitel",
    description:
      "Cinematic and dramatic. For brands that leave a lasting mark.",
  },
};

export default function BoldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
