import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trades & Services Website Design",
  description:
    "A conversion-first website style for local trades - plumbers, HVAC, electricians, and home services. Built to get calls, quotes, and bookings.",
  alternates: { canonical: "/showcase/trades" },
  openGraph: {
    title: "Trades & Services Website Design - Van Duist & Treitel",
    description:
      "Conversion-first for local trades. Built to get calls, quotes, and bookings.",
    url: "/showcase/trades",
  },
  twitter: {
    title: "Trades & Services Website Design - Van Duist & Treitel",
    description:
      "Conversion-first for local trades. Built to get calls, quotes, and bookings.",
  },
};

export default function TradesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
