export default function SiteNav() {
  const links = ["Home", "Holidays", "Destinations", "Flights", "Offers", "Contacts"];
  return (
    <nav className="absolute top-0 left-0 right-0 z-30 px-12 py-7 flex items-center justify-between text-white">
      <a href="/" className="flex items-center gap-2.5 text-[11px] tracking-[0.32em] uppercase">
        <span className="inline-block size-5 rounded-full border border-white/70 relative">
          <span className="absolute inset-1 rounded-full border border-white/40" />
        </span>
        VDT Express
      </a>
      <ul className="hidden md:flex items-center gap-9 text-[11px] tracking-[0.28em] uppercase">
        {links.map((label, i) => (
          <li key={label} className="relative">
            <a href="#" className="text-white/85 hover:text-white transition-colors">
              {label}
            </a>
            {i === 0 && (
              <span className="absolute left-0 right-0 -bottom-1.5 h-px bg-amber-400" />
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-5 text-white/85">
        <button aria-label="Search" className="hover:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
        <button aria-label="Account" className="hover:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
