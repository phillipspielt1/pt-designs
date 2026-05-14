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

const SLIDE_MS = 7000;
const BUBBLE_S = 1.1;
// easeOutQuart - long fluid tail, no bounce. Feels like a bubble inflating.
const BUBBLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const LEN = DESTINATIONS.length;
const RAIL_SLOTS = LEN - 1;

const CARD = {
  base: { w: 96, h: 138, gap: 8, bottom: 104 },
  sm: { w: 124, h: 175, gap: 10, bottom: 120 },
  md: { w: 148, h: 210, gap: 12, bottom: 144 },
};

export default function HeroCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // While `prev !== null`, a bubble transition is playing: previous image
  // sits underneath, new image clip-paths in as a growing circle.
  const [prev, setPrev] = useState<number | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [bp, setBp] = useState<"base" | "sm" | "md">("md");
  const [size, setSize] = useState({ w: 1200, h: 800 });

  // Track viewport breakpoint + section size (for bubble max radius).
  useEffect(() => {
    const update = () => {
      const sect = sectionRef.current;
      if (sect) {
        setSize({ w: sect.clientWidth, h: sect.clientHeight });
      }
      const w = window.innerWidth;
      setBp(w >= 768 ? "md" : w >= 640 ? "sm" : "base");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Preload all destination images.
  useEffect(() => {
    DESTINATIONS.forEach((d) => {
      const img = new window.Image();
      img.src = d.image;
    });
  }, []);

  const card = CARD[bp];
  const paddingRight = bp === "md" ? 48 : bp === "sm" ? 32 : 20;

  // Default bubble origin when auto-advance fires - center of the
  // leftmost rail card, the one visually "next up".
  const autoOrigin = useCallback(() => {
    const rightPx = paddingRight + (RAIL_SLOTS - 1) * (card.w + card.gap);
    return {
      x: size.w - rightPx - card.w / 2,
      y: size.h - card.bottom - card.h / 2,
    };
  }, [paddingRight, card, size]);

  const transitionTo = useCallback(
    (toIndex: number, originPx?: { x: number; y: number }) => {
      const i = ((toIndex % LEN) + LEN) % LEN;
      if (i === active) return;
      // Already mid-transition? Ignore - a clean bubble in flight beats
      // queueing a new one and clipping the current one short.
      if (prev !== null) return;

      setOrigin(originPx ?? autoOrigin());
      setPrev(active);
      setActive(i);
      setProgress(0);
    },
    [active, prev, autoOrigin],
  );

  // Auto-advance loop - paused during a bubble transition and on hover.
  useEffect(() => {
    if (paused || prev !== null) return;
    const startedAt = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const pct = Math.min(100, (elapsed / SLIDE_MS) * 100);
      setProgress(pct);
      if (elapsed >= SLIDE_MS) {
        transitionTo(active + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, prev, transitionTo]);

  // Compute the max radius needed for the bubble to fully cover the
  // section from the chosen origin (distance from origin to the
  // furthest corner).
  const maxR = Math.hypot(
    Math.max(origin.x, size.w - origin.x),
    Math.max(origin.y, size.h - origin.y),
  );

  const current = DESTINATIONS[active];
  const prevDest = prev !== null ? DESTINATIONS[prev] : null;

  // Card click - bubble origin is the card's center.
  const onCardClick = (e: React.MouseEvent<HTMLButtonElement>, destIdx: number) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    const sectRect = sectionRef.current?.getBoundingClientRect();
    if (!sectRect) {
      transitionTo(destIdx);
      return;
    }
    transitionTo(destIdx, {
      x: cardRect.left + cardRect.width / 2 - sectRect.left,
      y: cardRect.top + cardRect.height / 2 - sectRect.top,
    });
  };

  // Card list - all destinations except current, in cyclic order
  // starting from active+1.
  const cards = Array.from({ length: RAIL_SLOTS }, (_, i) => {
    const idx = (active + 1 + i) % LEN;
    return { ...DESTINATIONS[idx], _idx: idx };
  });

  return (
    <section
      ref={sectionRef}
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
            transition: paused || prev !== null ? "width 200ms ease-out" : "none",
          }}
        />
      </div>

      {/* Z-0: previous hero image - visible only during a bubble transition.
          Sits under the new image so the bubble effect reveals the new
          photo over the old. */}
      {prevDest && (
        <div
          key={`prev-${prevDest.id}`}
          className="absolute inset-0 z-0"
          style={{ background: prevDest.fallback }}
        >
          <img
            src={prevDest.image}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      )}

      {/* Z-1: current hero image with bubble clip-path. On a transition,
          starts as a 0px circle at the click origin and grows to cover
          the section. */}
      <motion.div
        key={`current-${current.id}`}
        className="absolute inset-0 z-[1]"
        style={{ background: current.fallback }}
        initial={
          prev !== null
            ? { clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }
            : false
        }
        animate={{
          clipPath: `circle(${maxR}px at ${origin.x}px ${origin.y}px)`,
        }}
        transition={{ duration: BUBBLE_S, ease: BUBBLE_EASE }}
        onAnimationComplete={() => setPrev(null)}
      >
        <img
          src={current.image}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Z-5: static vignette - tints both prev + current images. */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      {/* Z-10: hero text - pure opacity crossfade, no movement, no blur. */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 max-w-[44rem] pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
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

      {/* Z-20: card rail - 5 non-active destinations, infinite cyclic order.
          Cards use framer-motion's `layout` so position shifts animate
          smoothly. Click any card to fire the bubble from its center. */}
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
              layout
              onClick={(e) => onCardClick(e, c._idx)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.55, ease: BUBBLE_EASE }}
              className="relative overflow-hidden text-left shadow-2xl ring-1 ring-white/10 rounded-2xl shrink-0 cursor-pointer"
              style={{
                width: `${card.w}px`,
                height: `${card.h}px`,
                background: c.fallback,
              }}
              aria-label={`Go to ${c.title}`}
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-[9px] tracking-[0.22em] uppercase text-white/65 mb-1 truncate">
                  {c.eyebrow}
                </p>
                <p className="font-display uppercase text-white text-sm sm:text-base leading-tight tracking-tight">
                  {c.title}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Z-30: controls + counter */}
      <div className="absolute bottom-8 left-0 right-0 z-30 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => transitionTo(active - 1)}
            className="size-11 rounded-full border border-white/40 text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center"
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => transitionTo(active + 1)}
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
                transition: paused || prev !== null ? "width 200ms ease-out" : "none",
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
            transition={{ duration: 0.4, ease: "easeOut" }}
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
