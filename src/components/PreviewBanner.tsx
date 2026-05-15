"use client";

import { useTheme } from "@/components/ThemeProvider";

/**
 * Thin always-visible banner sitting above the nav.
 *
 * Establishes context for first-time visitors: this carousel below is a
 * showcase of styles VDT can build, not VDT's own brand site. Stays
 * fixed black-on-white regardless of which theme is active so it
 * never reads as part of the demo.
 */
export default function PreviewBanner() {
  const { active } = useTheme();

  return (
    <div className="relative z-40 bg-black text-white text-[10px] sm:text-[11px] tracking-[0.22em] uppercase">
      <div className="max-w-[1340px] mx-auto px-6 sm:px-10 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <span aria-hidden className="inline-block size-1.5 rounded-full bg-amber-400 shrink-0" />
          <span className="truncate">
            Live preview · each card is a different site we build
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span className="opacity-50">Showing</span>
          <span className="text-amber-300">{active.name}</span>
          <a href="#about" className="opacity-70 hover:opacity-100 transition-opacity">
            About VDT →
          </a>
        </div>
      </div>
    </div>
  );
}
