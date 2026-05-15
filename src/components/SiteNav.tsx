export default function SiteNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-30 px-6 sm:px-10 py-6 flex items-center justify-between text-white">
      <a href="/" className="flex items-center gap-2.5 text-[11px] tracking-[0.32em] uppercase">
        <span className="inline-block size-5 rounded-full border border-white/70 relative">
          <span className="absolute inset-1 rounded-full border border-white/40" />
        </span>
        VDT Sites
      </a>
      <ul className="flex items-center gap-7 sm:gap-9 text-[11px] tracking-[0.28em] uppercase">
        <li className="relative">
          <a href="/" className="text-white/85 hover:text-white transition-colors">
            Home
          </a>
          <span className="absolute left-0 right-0 -bottom-1.5 h-px bg-amber-400" />
        </li>
        <li>
          <a
            href="#contact"
            className="text-white/85 hover:text-white transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
