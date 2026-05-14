"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Destination = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  // CSS gradient shown behind the image so failed loads don't reveal a
  // blank box - the gradient also tints the hero while the image loads.
  fallback: string;
};

const DESTINATIONS: Destination[] = [
  {
    id: "saint-antonien",
    eyebrow: "Switzerland Alps",
    title: "Saint Antönien",
    body: "Carve through the high passes of the Prättigau on dirt and switchbacks. Long-day rides, alpine huts, no crowds.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1800&q=80",
    fallback: "linear-gradient(135deg, #3d4a3b 0%, #1d2624 60%, #0f1310 100%)",
  },
  {
    id: "nagano",
    eyebrow: "Japan Alps",
    title: "Nagano Prefecture",
    body: "Mist-laced cedar forests, onsens, and a powder season that never seems to quit. A long quiet tour of mountain Japan.",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1800&q=80",
    fallback: "linear-gradient(135deg, #4a5552 0%, #232a29 60%, #11171a 100%)",
  },
  {
    id: "merzouga",
    eyebrow: "Sahara Desert · Morocco",
    title: "Marrakech Merzouga",
    body: "Cross the Atlas to the Erg Chebbi dunes. Camel trek at golden hour, sleep under a sky thick with stars.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1800&q=80",
    fallback: "linear-gradient(135deg, #c7894a 0%, #7a4a1f 60%, #2b1c0d 100%)",
  },
  {
    id: "yosemite",
    eyebrow: "Sierra Nevada · United States",
    title: "Yosemite National Park",
    body: "Granite walls, sequoia groves, and a valley floor that drops your jaw every quarter mile. Stand on Glacier Point.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=80",
    fallback: "linear-gradient(135deg, #5a6873 0%, #2d3640 60%, #0e1418 100%)",
  },
  {
    id: "los-lances",
    eyebrow: "Tarifa · Spain",
    title: "Los Lances Beach",
    body: "Where the Mediterranean meets the Atlantic. Wind every afternoon, kites every evening, North Africa across the strait.",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1800&q=80",
    fallback: "linear-gradient(135deg, #4a6680 0%, #25384a 60%, #0f1820 100%)",
  },
  {
    id: "tromso",
    eyebrow: "Northern Norway",
    title: "Tromsø Aurora",
    body: "Chase the green light across the Arctic. Reindeer at dusk, fjord kayaking under the midnight glow, no crowds at all.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1800&q=80",
    fallback: "linear-gradient(135deg, #1a2940 0%, #0e1b2e 60%, #050a14 100%)",
  },
];

const SLIDE_MS = 7000;
const MORPH_MS = 1100;
const VISIBLE_CARDS = 4;
// easeOutQuint - long tail, no bounce, very film-like
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imgLoaded, setImgLoaded] = useState<Record<string, boolean>>({});

  const goTo = useCallback((index: number) => {
    const len = DESTINATIONS.length;
    setActive(((index % len) + len) % len);
    setProgress(0);
  }, []);

  // Preload every destination image once on mount so swaps don't pop.
  useEffect(() => {
    DESTINATIONS.forEach((d) => {
      const img = new Image();
      img.onload = () => setImgLoaded((s) => ({ ...s, [d.id]: true }));
      img.onerror = () => setImgLoaded((s) => ({ ...s, [d.id]: false }));
      img.src = d.image;
    });
  }, []);

  // Auto-advance - pauses on hover. requestAnimationFrame keeps the
  // progress bar buttery (16ms ticks) without flooding React renders.
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
      {/* Top progress bar (auto-rotate timer) */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-40 pointer-events-none">
        <div
          className="h-full bg-amber-400"
          style={{
            width: `${progress}%`,
            transition: paused ? "width 200ms ease-out" : "none",
          }}
        />
      </div>

      {/* MORPH LAYER (z-0): just the hero image. layoutId shared with the
          matching card so framer-motion morphs the card image to the full
          hero frame. Gradients live OUTSIDE this layer so they don't scale
          weirdly during the transform. */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current.id}
          layoutId={`dest-${current.id}`}
          className="absolute inset-0 z-0"
          style={{
            background: current.fallback,
            willChange: "transform",
          }}
          transition={{
            duration: MORPH_MS / 1000,
            ease: EASE,
            layout: { duration: MORPH_MS / 1000, ease: EASE },
          }}
        >
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
            style={{
              opacity: imgLoaded[current.id] === false ? 0 : 1,
              transition: "opacity 600ms ease",
            }}
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
              setImgLoaded((s) => ({ ...s, [current.id]: false }));
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* STATIC VIGNETTE (z-5): doesn't move with the morph. Always blankets
          the hero image for legible text + cards over any photo. */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
      </div>

      {/* HERO TEXT (z-10): crossfade between slides. mode="popLayout"
          lets entering and exiting content overlap, so there's no gap. */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 max-w-[44rem] pointer-events-none">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
            className="pointer-events-auto"
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

      {/* CARD RAIL (z-20): each card shares its layoutId with the hero when
          it becomes active. Click promotes it via goTo. */}
      <div className="absolute right-0 bottom-28 sm:bottom-36 z-20 pr-6 sm:pr-12 flex gap-4">
        <AnimatePresence initial={false} mode="popLayout">
          {cards.map((c) => (
            <motion.button
              key={c.id}
              type="button"
              layoutId={`dest-${c.id}`}
              onClick={() => goTo(c._idx)}
              initial={{ opacity: 0, x: 40, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{
                duration: MORPH_MS / 1000,
                ease: EASE,
                layout: { duration: MORPH_MS / 1000, ease: EASE },
              }}
              className="relative w-[140px] sm:w-[170px] h-[200px] sm:h-[240px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer text-left group ring-1 ring-white/10"
              style={{ background: c.fallback, willChange: "transform" }}
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ opacity: imgLoaded[c.id] === false ? 0 : 1 }}
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                  setImgLoaded((s) => ({ ...s, [c.id]: false }));
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
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
        </AnimatePresence>
      </div>

      {/* CONTROLS + COUNTER (z-30) */}
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
              className="absolute inset-y-0 left-0 bg-amber-400"
              style={{
                width: `${progress}%`,
                transition: paused ? "width 200ms ease-out" : "none",
              }}
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
