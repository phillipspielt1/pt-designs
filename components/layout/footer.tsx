import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.08] bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-sm font-semibold text-[#1d1d1f]">Van Duist & Treitel</div>
            <div className="text-xs text-[#6e6e73] mt-1">Web Design · Nanaimo, BC</div>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-[#6e6e73]">
            <Link href="/" className="hover:text-[#1d1d1f] transition-colors">Home</Link>
            <Link href="/showcase/minimal" className="hover:text-[#1d1d1f] transition-colors">Minimal</Link>
            <Link href="/showcase/playful" className="hover:text-[#1d1d1f] transition-colors">Playful</Link>
            <Link href="/showcase/professional" className="hover:text-[#1d1d1f] transition-colors">Professional</Link>
            <Link href="/showcase/bold" className="hover:text-[#1d1d1f] transition-colors">Bold & Dark</Link>
            <Link href="/showcase/ecommerce" className="hover:text-[#1d1d1f] transition-colors">E-Commerce</Link>
            <Link href="/contact" className="hover:text-[#1d1d1f] transition-colors">Contact</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-black/[0.06] text-xs text-[#6e6e73]">
          © {new Date().getFullYear()} Van Duist & Treitel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
