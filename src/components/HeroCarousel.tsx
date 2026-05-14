"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Destination = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

// Replace these Unsplash IDs with your own assets later. If any 404, the
// gradient fallback under each <img> keeps the layout intact.
const DESTINATIONS: Destination[] = [
  {
    id: "saint-antonien",
    eyebrow: "Switzerland Alps",
    title: "Saint Antönien",
    body: "Carve through the high passes of the Prättigau on dirt and switchbacks. Long-day rides, alpine huts, no crowds.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1800&q=80",
  },
  {
    id: "nagano",
    eyebrow: "Japan Alps",
    title: "Nagano Prefecture",
    body: "Onsens, snow monkeys, and a powder season that never seems to quit. Jigokudani is one stop on a longer tour.",
    image: "https://images.unsplash.com/photo-1568050642090-15a39a92faf0?w=1800&q=80",
  },
  {
    id: "merzouga",
    eyebrow: "Sahara Desert · Morocco",
    title: "Marrakech Merzouga",
    body: "Cross the Atlas to the Erg Chebbi dunes. Camel trek at golden hour, sleep under a sky thick with stars.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1800&q=80",
  },
  {
    id: "yosemite",
    eyebrow: "Sierra Nevada · United States",
    title: "Yosemite National Park",
    body: "Granite walls, sequoia groves, and a valley floor that drops your jaw every quarter mile. Stand on Glacier Point.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=80",
  },
  {
    id: "los-lances",
    eyebrow: "Tarifa · Spain",
    title: "Los Lances Beach",
    body: "Where the Mediterranean meets the Atlantic. Wind every afternoon, kites every evening, North Africa across the strait.",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1800&q=80",
  },
  {
    id: "goreme",
    eyebrow: "Cappadocia · Turkey",
    title: "Göreme Valley",
    body: "Wake before dawn for the balloons. Stay for cave hotels, fairy chimneys, and underground cities cut from tuff.",
    image: "https://images.unsplash.com/photo-1631160246376-aaab3c34671c?w=1800&q=80",
  },
];

const SLIDE_MS = 6000;
const VISIBLE_CARDS = 4;
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    const len = DESTINATIONS.length;
    setActive(((index % len) + len) % len);
    setProgress(0);
  }, []);

  // Auto-advance loop (paused on hover).
  useEffect(() => {
    if (paused) return;
    const startedAt = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const pct = Math.min(100, (elapsed / SLIDE_MS) * 100);
      setProgress(pct);
      if (elapsed >= SLIDE_MS) {
        goTo(active + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, goTo]);

  const current = DESTINATIONS[active];
  // The next N destinations after the active one - these render as the
  // small card rail on the right. When you click one (or auto-advance
  // promotes it) its layoutId matches the new hero's, so framer-motion
  // morphs the card image into the full-bleed hero automatically.
  const cards = Array.from({ length: VISIBLE_CARDS }, (_, i) => {
    const idx = (active + 1 + i) % DESTINATIONS.length;
    return { ...DESTINATIONS[idx], _idx: idx };
  });

  return (
    <section
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden bg-black select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top progress bar (auto-rotate timer). */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-40">
        <div
          className="h-full bg-amber-400 transition-[width] duration-75 linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero background. layoutId is shared with the matching card so the
          transition between cards and hero morphs naturally. */}
      <motion.div
        key={current.id}
        layoutId={`dest-${current.id}`}
        className="absolute inset-0 z-0"
        transition={{ duration: 0.9, ease: EASE }}
      >
        <img
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Tints: vignette so text + cards have contrast over any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15" />
      </motion.div>

      {/* Hero text panel (left). Swaps with a vertical fade per slide. */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 max-w-[44rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="w-10 h-px bg-white mb-5" />
            <p className="text-xs tracking-[0.28em] uppercase text-white/85 mb-4">
              {current.eyebrow}
            </p>
            <h1 className="font-display uppercase text-white leading-[0.92] tracking-tight text-6xl sm:text-7xl md:text-8xl mb-6">
              {current.title}
            </h1>
            <p className="text-white/75 max-w-md mb-9 leading-relaxed text-[15px]">
              {current.body}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="size-11 rounded-full bg-amber-400 text-black flex items-center justify-center hover:bg-amber-300 transition-colors"
                aria-label="Save destination"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 3h12v18l-6-4-6 4V3z" />
                </svg>
              </button>
              <button
                type="button"
                className="rounded-full border border-white/45 text-white px-7 py-3 text-[11px] tracking-[0.28em] uppercase hover:bg-white hover:text-black transition-colors"
              >
                Discover Location
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Card rail (right). Each card shares its layoutId with the hero
          when it becomes active - clicking promotes it via goTo. */}
      <div className="absolute right-0 bottom-28 sm:bottom-36 z-20 pr-6 sm:pr-12 flex gap-4">
        {cards.map((c) => (
          <motion.button
            key={c.id}
            type="button"
            layoutId={`dest-${c.id}`}
            onClick={() => goTo(c._idx)}
            className="relative w-[140px] sm:w-[170px] h-[200px] sm:h-[240px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer text-left group ring-1 ring-white/10"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <img
              src={c.image}
              alt={c.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3.5">
              <p className="text-[9px] tracking-[0.22em] uppercase text-white/65 mb-1">
                {c.eyebrow}
              </p>
              <p className="font-display uppercase text-white text-base sm:text-lg leading-tight tracking-tight">
                {c.title}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Pagination controls + counter (bottom). */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            className="size-11 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            className="size-11 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="ml-4 hidden sm:block h-px w-40 bg-white/25 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-amber-400 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div
          className="font-display text-white text-4xl sm:text-5xl tracking-tight tabular-nums"
          aria-label={`Slide ${active + 1} of ${DESTINATIONS.length}`}
        >
          {String(active + 1).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}
