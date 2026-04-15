"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const showcases = [
  { href: "/showcase/minimal",      label: "Minimal" },
  { href: "/showcase/playful",      label: "Playful" },
  { href: "/showcase/professional", label: "Professional" },
  { href: "/showcase/bold",         label: "Bold & Dark" },
  { href: "/showcase/ecommerce",    label: "E-Commerce" },
  { href: "/showcase/trades",       label: "Trades & Services" },
];

export default function ShowcaseNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  // e.g. "/showcase/playful" → "playful"
  const styleSlug = pathname.startsWith("/showcase/") ? pathname.split("/showcase/")[1] : "";
  const contactHref = styleSlug ? `/contact?style=${styleSlug}` : "/contact";
  const activeShowcase = showcases.find(s => s.href === pathname) ?? null;

  return (
    <>
      {/* ── Site nav — identical styling to main Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-[60] border-b bg-white/90 backdrop-blur-xl border-black/[0.07]" style={{fontFamily:"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Wordmark */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-[13px] font-semibold tracking-tight text-[#1a1a1a] group-hover:text-black transition-colors">
              Phillip Treitel
            </span>
            <span className="text-[9px] tracking-[0.22em] text-[#999] uppercase font-medium mt-[2px]">
              Web Design
            </span>
          </Link>

          {/* Centered nav links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] text-[#6e6e73]">
            <Link href="/" className="hover:text-[#1a1a1a] transition-colors">
              Home
            </Link>
            <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <button className="flex items-center gap-1.5 text-[#1a1a1a] hover:text-[#1a1a1a] transition-colors">
                {activeShowcase ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] inline-block flex-shrink-0" />
                    {activeShowcase.label}
                  </>
                ) : "Showcase"}
                <svg className="w-3 h-3 mt-px" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                  <div className="bg-white rounded-2xl shadow-xl border border-black/[0.08] py-2 min-w-[190px]">
                    {showcases.map(s => {
                      const isActive = s.href === pathname;
                      return (
                        <Link key={s.href} href={s.href}
                          className={`flex items-center justify-between px-5 py-2.5 text-[13px] hover:bg-[#f5f5f7] transition-colors ${isActive ? "font-semibold text-[#1a1a1a]" : "text-[#1a1a1a]"}`}>
                          {s.label}
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] flex-shrink-0" />}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <Link href="/contact" className="hover:text-[#1a1a1a] transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA */}
          <Link href={contactHref}
            className="hidden md:inline-flex items-center gap-1.5 text-[13px] font-medium bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full hover:bg-black transition-colors">
            Want this style? <ArrowRight size={13}/>
          </Link>

        </div>
      </nav>

      {/* Spacer — same height as nav so content starts below it */}
      <div className="h-16" />

      {/* Floating home pill — bottom left */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-white text-[#1d1d1f] text-sm font-semibold px-4 py-3 rounded-full shadow-xl border border-black/10 hover:bg-[#f5f5f7] transition-all hover:shadow-2xl hover:-translate-y-0.5 group"
        style={{fontFamily:"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
      >
        <Home size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        Phillip Treitel
      </Link>

      {/* Floating CTA pill — bottom right */}
      <Link
        href={contactHref}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1d1d1f] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl hover:bg-[#3d3d3f] transition-all hover:shadow-2xl hover:-translate-y-0.5 group"
        style={{fontFamily:"ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"}}
      >
        Want this style?
        <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </>
  );
}
