"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const showcases = [
  { href: "/showcase/minimal", label: "Minimal" },
  { href: "/showcase/playful", label: "Playful" },
  { href: "/showcase/professional", label: "Professional" },
  { href: "/showcase/bold", label: "Bold & Dark" },
  { href: "/showcase/ecommerce", label: "E-Commerce" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isShowcase = pathname.startsWith("/showcase");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-400 ${scrolled ? "bg-white/90 backdrop-blur-xl border-black/[0.07]" : "bg-white/70 backdrop-blur-md border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Stacked wordmark */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="text-[13px] font-semibold tracking-tight text-[#1a1a1a] group-hover:text-black transition-colors">
            Phillip Treitel
          </span>
          <span className="text-[9px] tracking-[0.22em] text-[#999] uppercase font-medium mt-[2px]">
            Web Design
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-[13px] text-[#6e6e73]">
          <Link href="/" className={`hover:text-[#1a1a1a] transition-colors ${pathname === "/" ? "text-[#1a1a1a]" : ""}`}>
            Home
          </Link>
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className={`flex items-center gap-1 hover:text-[#1a1a1a] transition-colors ${isShowcase ? "text-[#1a1a1a]" : ""}`}>
              Showcase
              <svg className="w-3 h-3 mt-px" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="bg-white rounded-2xl shadow-xl border border-black/[0.08] py-2 min-w-[190px]">
                  {showcases.map((s) => (
                    <Link key={s.href} href={s.href} className="block px-5 py-2.5 text-[13px] text-[#1a1a1a] hover:bg-[#f5f5f7] transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/contact" className={`hover:text-[#1a1a1a] transition-colors ${pathname === "/contact" ? "text-[#1a1a1a]" : ""}`}>
            Contact
          </Link>
        </div>

        {/* CTA */}
        <Link href="/contact" className="hidden md:inline-flex items-center text-[13px] font-medium bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full hover:bg-black transition-colors">
          Get a Quote
        </Link>

        {/* Mobile */}
        <button className="md:hidden text-[#1a1a1a]" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-5 flex flex-col gap-4">
          <Link href="/" className="text-sm text-[#1a1a1a]" onClick={() => setOpen(false)}>Home</Link>
          <div className="text-[10px] uppercase tracking-widest text-[#999] font-medium">Showcase</div>
          {showcases.map((s) => (
            <Link key={s.href} href={s.href} className="text-sm text-[#1a1a1a] pl-2" onClick={() => setOpen(false)}>{s.label}</Link>
          ))}
          <Link href="/contact" className="text-sm text-[#1a1a1a]" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/contact" className="text-sm font-medium bg-[#1a1a1a] text-white px-4 py-3 rounded-full text-center" onClick={() => setOpen(false)}>
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
