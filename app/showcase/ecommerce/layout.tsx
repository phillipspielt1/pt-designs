import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce & Online Store Design",
  description:
    "A warm, story-driven e-commerce website style — built for retail, artisan goods, and direct-to-consumer brands. Product pages and checkout designed to convert.",
  alternates: { canonical: "/showcase/ecommerce" },
  openGraph: {
    title: "E-Commerce Website Design — Van Duist & Treitel",
    description:
      "Warm, story-driven, and built to convert. Products showcased beautifully.",
    url: "/showcase/ecommerce",
  },
  twitter: {
    title: "E-Commerce Website Design — Van Duist & Treitel",
    description:
      "Warm, story-driven, and built to convert. Products showcased beautifully.",
  },
};

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
