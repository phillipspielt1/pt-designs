"use client";

import Link from "next/link";
import { Home, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

const showcases = [
  { href: "/showcase/minimal",      label: "Minimal" },
  { href: "/showcase/playful",      label: "Playful" },
  { href: "/showcase/professional", label: "Professional" },
  { href: "/showcase/bold",         label: "Bold & Dark" },
  { href: "/showcase/ecommerce",    label: "E-Commerce" },
  { href: "/showcase/trades",       label: "Trades & Services" },
];

export default function ShowcaseNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Site nav strip — sits above the showcase's own header ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-white/95 backdrop-blur-md border-b border-black/[0.08] flex items-center justify-between px-6 shadow-sm">
        {/* Logo / home */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-[11px] font-semibold tracking-tight text-[#1a1a1a] group-hover:text-black transition-colors">Phillip Treitel</span>
          <span className="text-[7px] tracking-[0.2em] text-[#999] uppercase font-medium">Web Design</span>
        </Link>

        {/* Centered nav links */}
        <div className="hidden sm:flex items-center gap-6 text-[11px] text-[#666] absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>

          {/* Showcase dropdown */}
          <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button className="flex items-center gap-0.5 hover:text-[#1a1a1a] transition-colors">
              Showcase <ChevronDown size={10} className="mt-px"/>
            </button>
            {open && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                <div className="bg-white rounded-xl shadow-xl border border-black/[0.08] py-1.5 min-w-[180px]">
                  {showcases.map(s => (
                    <Link key={s.href} href={s.href}
                      className="block px-4 py-2 text-[12px] text-[#1a1a1a] hover:bg-[#f5f5f7] transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/contact" className="hover:text-[#1a1a1a] transition-colors">Contact</Link>
        </div>

        {/* Right: CTA */}
        <Link href="/contact"
          className="flex items-center gap-1 bg-[#1a1a1a] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full hover:bg-black transition-colors">
          Want this style? <ArrowRight size={9}/>
        </Link>
      </div>

      {/* Spacer — pushes page content below the fixed strip */}
      <div className="h-10" />

      {/* Floating home pill — bottom left */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-white text-[#1d1d1f] text-sm font-semibold px-4 py-3 rounded-full shadow-xl border border-black/10 hover:bg-[#f5f5f7] transition-all hover:shadow-2xl hover:-translate-y-0.5 group"
      >
        <Home size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Phillip Treitel
      </Link>

      {/* Floating CTA pill — bottom right */}
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
