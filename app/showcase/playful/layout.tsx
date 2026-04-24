import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playful Brand Design",
  description:
    "A bold, colourful, personality-driven website style — built for cafés, food & drink brands, and businesses that want to be remembered.",
  alternates: { canonical: "/showcase/playful" },
  openGraph: {
    title: "Playful Website Design — Van Duist & Treitel",
    description:
      "Bold colour and personality. Brands that want to be remembered.",
    url: "/showcase/playful",
  },
  twitter: {
    title: "Playful Website Design — Van Duist & Treitel",
    description:
      "Bold colour and personality. Brands that want to be remembered.",
  },
};

export default function PlayfulLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
