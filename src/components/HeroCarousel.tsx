"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

type Destination = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
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
const MORPH_S = 1.0;
// easeOutQuint - long tail, no bounce
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LEN = DESTINATIONS.length;
const RAIL_SLOTS = LEN - 1; // every non-active destination

// Card dimensions per breakpoint (kept small enough that all 5 fit
// comfortably above tablet width).
const CARD = {
  base: { w: 96, h: 138, gap: 8 },
  sm: { w: 124, h: 175, gap: 10 },
  md: { w: 148, h: 210, gap: 12 },
};

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [bp, setBp] = useState<"base" | "sm" | "md">("md");

  const goTo = useCallback((index: number) => {
    setActive(((index % LEN) + LEN) % LEN);
    setProgress(0);
  }, []);

  // Track current breakpoint so card positions are pixel-correct
  // (framer-motion needs concrete numbers to animate between).
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w >= 768 ? "md" : w >= 640 ? "sm" : "base");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Preload every image so swaps never reveal a half-loaded photo.
  useEffect(() => {
    DESTINATIONS.forEach((d) => {
      const img = new window.Image();
      img.src = d.image;
    });
  }, []);

  // Auto-advance - pauses on hover. RAF for fluid progress bar.
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
  const card = CARD[bp];
  const paddingRight = bp === "md" ? 48 : bp === "sm" ? 32 : 20;

  // Compute the right-px for a given rail slot (0 = leftmost of rail).
  const railRightPx = (slot: number) =>
    paddingRight + (RAIL_SLOTS - 1 - slot) * (card.w + card.gap);

  return (
    <section
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden bg-black select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-40 pointer-events-none">
        <div
          className="h-full bg-amber-400"
          style={{
            width: `${progress}%`,
            transition: paused ? "width 200ms ease-out" : "none",
          }}
        />
      </div>

      {/*
        Every destination is rendered ONCE with a stable layoutId. Its
        position/size depends on offset from `active`:
          offset 0  → hero (full bleed)
          offset 1..N-1 → rail slot 0..N-2 (left to right)
        When `active` changes, each element's target position changes and
        framer-motion smoothly morphs every one in parallel. The old hero
        slides + shrinks to the far right of the rail, the next card grows
        into the hero, and the middle cards shift one slot left.
      */}
      {DESTINATIONS.map((d, i) => {
        const offset = (i - active + LEN) % LEN;
        const isHero = offset === 0;
        const railSlot = offset - 1;

        const heroBox = { top: 0, left: 0, right: 0, bottom: 0, borderRadius: 0 };
        const cardBottom = bp === "md" ? "9rem" : bp === "sm" ? "7.5rem" : "6.5rem";
        const cardBox = isHero
          ? null
          : {
              top: "auto" as const,
              left: "auto" as const,
              right: `${railRightPx(railSlot)}px`,
              bottom: cardBottom,
              width: `${card.w}px`,
              height: `${card.h}px`,
              borderRadius: "1rem",
            };

        return (
          <motion.button
            key={d.id}
            type="button"
            layoutId={`dest-${d.id}`}
            onClick={isHero ? undefined : () => goTo(i)}
            className="absolute overflow-hidden text-left shadow-2xl ring-1 ring-white/10"
            style={{
              ...(isHero ? heroBox : cardBox!),
              background: d.fallback,
              cursor: isHero ? "default" : "pointer",
              zIndex: isHero ? 0 : 20,
              willChange: "transform",
            }}
            transition={{ duration: MORPH_S, ease: EASE }}
            whileHover={isHero ? undefined : { y: -6 }}
            aria-label={isHero ? undefined : `Go to ${d.title}`}
          >
            <img
              src={d.image}
              alt={d.title}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0";
              }}
            />
            {/* Card-only label + vignette. Rendered always; opacity flips
                with the role so framer-motion doesn't have to mount/unmount
                children mid-morph (which would cause a flicker). */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-opacity duration-300"
              style={{ opacity: isHero ? 0 : 1 }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300"
              style={{ opacity: isHero ? 0 : 1 }}
            >
              <p className="text-[9px] tracking-[0.22em] uppercase text-white/65 mb-1">
                {d.eyebrow}
              </p>
              <p className="font-display uppercase text-white text-sm sm:text-base leading-tight tracking-tight">
                {d.title}
              </p>
            </div>
          </motion.button>
        );
      })}

      {/* Static vignette over the hero image only (z-5, above hero z-0
          but below text/cards). Doesn't move with the morph. */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      {/* HERO TEXT - simple opacity crossfade only. No blur, no movement,
          intentionally decoupled from the image morph timing. */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 max-w-[44rem] pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
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

      {/* CONTROLS + COUNTER */}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-white text-4xl sm:text-5xl tracking-tight tabular-nums"
            aria-label={`Slide ${active + 1} of ${LEN}`}
          >
            {String(active + 1).padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
