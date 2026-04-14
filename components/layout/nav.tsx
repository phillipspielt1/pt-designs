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
  const isDark = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBase = isDark && !scrolled
    ? "bg-transparent border-transparent"
    : "bg-white/85 backdrop-blur-xl border-black/[0.06]";

  const textColor = isDark && !scrolled ? "text-white/80 hover:text-white" : "text-[#6e6e73] hover:text-[#1d1d1f]";
  const logoColor = isDark && !scrolled ? "text-white" : "text-[#1d1d1f]";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${navBase}`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className={`transition-colors duration-300 ${logoColor}`}>
          <span className="text-sm font-semibold tracking-tight">Phillip</span>
          <span className="text-sm font-light tracking-tight"> Treitel</span>
          <span className={`text-sm font-semibold ${isDark && !scrolled ? "text-white/40" : "text-[#c9a84c]"}`}>.</span>
        </Link>

        {/* Desktop links */}
        <div className={`hidden md:flex items-center gap-8 text-sm transition-colors duration-300 ${textColor}`}>
          <Link
            href="/"
            className={`transition-colors ${pathname === "/" ? (isDark && !scrolled ? "text-white" : "text-[#1d1d1f]") : ""}`}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className={`flex items-center gap-1 transition-colors ${isShowcase ? (isDark && !scrolled ? "text-white" : "text-[#1d1d1f]") : ""}`}>
              Showcase
              <svg className="w-3 h-3 mt-px" viewBox="0 0 12 12" fill="none">
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="bg-white rounded-2xl shadow-xl border border-black/[0.08] py-2 min-w-[180px]">
                  {showcases.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2.5 text-sm text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/contact" className={`transition-colors ${pathname === "/contact" ? (isDark && !scrolled ? "text-white" : "text-[#1d1d1f]") : ""}`}>
            Contact
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
              isDark && !scrolled
                ? "bg-white text-[#1d1d1f] hover:bg-white/90"
                : "bg-[#1d1d1f] text-white hover:bg-[#3d3d3f]"
            }`}
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden transition-colors ${logoColor}`} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-black/[0.06] px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-sm text-[#1d1d1f]" onClick={() => setOpen(false)}>Home</Link>
          <div className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mt-1">Showcase</div>
          {showcases.map((s) => (
            <Link key={s.href} href={s.href} className="text-sm text-[#1d1d1f] pl-2" onClick={() => setOpen(false)}>
              {s.label}
            </Link>
          ))}
          <Link href="/contact" className="text-sm text-[#1d1d1f]" onClick={() => setOpen(false)}>Contact</Link>
          <Link
            href="/contact"
            className="text-sm font-medium bg-[#1d1d1f] text-white px-4 py-2.5 rounded-full text-center"
            onClick={() => setOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
