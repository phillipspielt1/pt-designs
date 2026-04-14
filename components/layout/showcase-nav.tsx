"use client";

import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function ShowcaseNav() {
  return (
    <>
      {/* Floating home button — bottom left */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-white text-[#1d1d1f] text-sm font-semibold px-4 py-3 rounded-full shadow-xl border border-black/10 hover:bg-[#f5f5f7] transition-all hover:shadow-2xl hover:-translate-y-0.5 group"
      >
        <Home size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Phillip Treitel
      </Link>

      {/* Floating CTA — bottom right */}
      <Link
        href="/contact"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1d1d1f] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl hover:bg-[#3d3d3f] transition-all hover:shadow-2xl hover:-translate-y-0.5 group"
      >
        Want this style?
        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </>
  );
}
