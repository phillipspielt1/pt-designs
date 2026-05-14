"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

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

// Timings measured directly off the reference video (1.2s total
// transition, 60fps source, broken into phases).
const SLIDE_MS = 7000;
const MORPH_S = 1.2; // total transition duration
const FADE_S = 0.85; // old hero opacity fade
const BLUR_PX = 8; // peak motion blur during transition
const VISIBLE_CARDS = 4;
// easeOutCubic - matches the reference video's deceleration curve
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Crossfade easing - symmetric for smooth tail
const FADE_EASE: [number, number, number, number] = [0.4, 0, 0.6, 1];

const LEN = DESTINATIONS.length;

const CARD = {
  base: { w: 108, h: 152, gap: 10, bottom: 108 },
  sm: { w: 132, h: 188, gap: 12, bottom: 124 },
  md: { w: 158, h: 222, gap: 14, bottom: 144 },
};

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [bp, setBp] = useState<"base" | "sm" | "md">("md");
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive(((index % LEN) + LEN) % LEN);
    setProgress(0);
    setTransitioning(true);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      setTransitioning(false);
    }, MORPH_S * 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w >= 768 ? "md" : w >= 640 ? "sm" : "base");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Preload every image so the morph never reveals a half-loaded photo.
  useEffect(() => {
    DESTINATIONS.forEach((d) => {
      const img = new window.Image();
      img.src = d.image;
    });
  }, []);

  // Auto-advance
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

  const cards = Array.from({ length: VISIBLE_CARDS }, (_, i) => {
    const idx = (active + 1 + i) % LEN;
    return { ...DESTINATIONS[idx], _idx: idx };
  });

  // Text variants - precise per-state timing to match the reference
  // video where old text exits fast (~0.25s) and new text appears
  // late (~0.45s after transition start).
  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.45, delay: 0.45, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" as const },
    },
  };

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

      {/* HERO LAYER - shared layoutId morphs the clicked card UP into
          this frame. Motion blur ramps on during the morph and clears
          as the new image settles, matching the reference video's
          micro-second timing precisely. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          layoutId={`dest-${current.id}`}
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ background: current.fallback, willChange: "transform, filter" }}
          initial={{ filter: `blur(${BLUR_PX}px)` }}
          animate={{ filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: `blur(${BLUR_PX}px)` }}
          transition={{
            layout: { duration: MORPH_S, ease: EASE },
            filter: { duration: MORPH_S * 0.75, ease: "easeOut" },
            opacity: { duration: FADE_S, ease: FADE_EASE },
            default: { duration: MORPH_S, ease: EASE },
          }}
        >
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Static vignette - above the hero image, below text/cards. */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      {/* Hero text - per-state variants so old exits fast (0.25s) and
          new enters with a 0.45s delay (after the morph is half-way
          through), matching the video where the new text only appears
          once the morph is settling. */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 max-w-[44rem] pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
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

      {/* CARD RAIL - cards lift -6px and blur 4px while transitioning,
          matching the "preparation" phase in the reference video where
          all cards rise slightly and motion-blur for ~200ms. */}
      <div
        className="absolute right-0 z-20 flex"
        style={{
          bottom: `${card.bottom}px`,
          gap: `${card.gap}px`,
          paddingRight: `${paddingRight}px`,
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {cards.map((c) => (
            <motion.button
              key={c.id}
              type="button"
              layoutId={`dest-${c.id}`}
              onClick={() => goTo(c._idx)}
              initial={{ opacity: 0, x: 50, scale: 0.92, filter: `blur(${BLUR_PX}px)` }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                y: transitioning ? -6 : 0,
                filter: transitioning ? "blur(4px)" : "blur(0px)",
              }}
              exit={{ opacity: 0, filter: `blur(${BLUR_PX}px)` }}
              whileHover={transitioning ? undefined : { y: -6 }}
              transition={{
                layout: { duration: MORPH_S, ease: EASE },
                opacity: { duration: MORPH_S * 0.6, ease: EASE },
                x: { duration: MORPH_S * 0.7, ease: EASE },
                scale: { duration: MORPH_S * 0.65, ease: EASE },
                y: { duration: 0.35, ease: EASE },
                filter: { duration: 0.35, ease: "easeOut" },
                default: { duration: MORPH_S, ease: EASE },
              }}
              className="relative overflow-hidden text-left shadow-2xl ring-1 ring-white/10 rounded-2xl shrink-0 cursor-pointer"
              style={{
                width: `${card.w}px`,
                height: `${card.h}px`,
                background: c.fallback,
                willChange: "transform, filter",
              }}
              aria-label={`Go to ${c.title}`}
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* CARD LABELS - parallel layer, decoupled from card morph. Exit
          animation is BLUR + SLIDE DOWN + FADE (matching the video
          where labels blur out as the card lifts off), not just a
          slide. */}
      <div
        className="absolute right-0 z-[21] flex pointer-events-none"
        style={{
          bottom: `${card.bottom}px`,
          gap: `${card.gap}px`,
          paddingRight: `${paddingRight}px`,
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {cards.map((c) => (
            <motion.div
              key={`label-${c.id}`}
              layout
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: transitioning ? "blur(2px)" : "blur(0px)",
              }}
              exit={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              transition={{
                duration: 0.4,
                ease: EASE,
                opacity: { duration: 0.35 },
                filter: { duration: 0.3 },
              }}
              className="relative shrink-0 rounded-2xl overflow-hidden"
              style={{ width: `${card.w}px`, height: `${card.h}px` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[9px] tracking-[0.22em] uppercase text-white/65 mb-1 truncate">
                  {c.eyebrow}
                </p>
                <p className="font-display uppercase text-white text-sm sm:text-base leading-tight tracking-tight">
                  {c.title}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Controls + counter */}
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
        {/* Counter flips immediately on transition start - matches the
            video where "02" appears at t=2.9s (just 0.2s after the
            transition begins). */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.05 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
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
