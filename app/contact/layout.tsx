import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Van Duist & Treitel for a free website quote. Based in Nanaimo, BC — we reply within 24 hours.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Van Duist & Treitel",
    description:
      "Tell us about your project and get a free quote within 24 hours.",
    url: "/contact",
  },
  twitter: {
    title: "Contact Van Duist & Treitel",
    description:
      "Tell us about your project and get a free quote within 24 hours.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
