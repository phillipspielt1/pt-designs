"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/ThemeProvider";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

// Three hero variants exist for the Morph theme - pick one with the
// preview chips at top-center, ship the winner, then delete the rest.

// Variant A - "Sentence Stack" - the verb morphs.
const MORPH_VERBS = ["BUILD", "CRAFT", "SHIP", "DESIGN"];
// Variant B - "Centered Noun" - the noun morphs.
const MORPH_NOUNS = ["WEBSITES", "BRANDS", "STORES", "TOOLS"];
// Variant C - "Three-Line Poster" - the descriptor morphs.
const MORPH_ADJ = ["SHARP", "DRIVEN", "READY", "FAST"];

type MorphVariant = "a" | "b" | "c";

const SLIDE_MS = 8500;
const MORPH_S = 1.2;
const FADE_S = 0.85;
const BLUR_PX = 8;
const VISIBLE_CARDS = 4;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FADE_EASE: [number, number, number, number] = [0.4, 0, 0.6, 1];

const LEN = THEMES.length;

const CARD = {
  base: { w: 108, h: 152, gap: 10, bottom: 108 },
  sm: { w: 132, h: 188, gap: 12, bottom: 124 },
  md: { w: 158, h: 222, gap: 14, bottom: 144 },
};

export default function HeroCarousel() {
  const { activeId, setActiveId } = useTheme();
  const active = Math.max(
    0,
    THEMES.findIndex((t) => t.id === activeId),
  );

  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [bp, setBp] = useState<"base" | "sm" | "md">("md");
  const [morphVariant, setMorphVariant] = useState<MorphVariant>("a");
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const i = ((index % LEN) + LEN) % LEN;
      setActiveId(THEMES[i].id);
      setProgress(0);
      setTransitioning(true);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(() => {
        setTransitioning(false);
      }, MORPH_S * 1000);
    },
    [setActiveId],
  );

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

  const current = THEMES[active];
  const card = CARD[bp];
  const paddingRight = bp === "md" ? 48 : bp === "sm" ? 32 : 20;

  const cards = Array.from({ length: VISIBLE_CARDS }, (_, i) => {
    const idx = (active + 1 + i) % LEN;
    return { ...THEMES[idx], _idx: idx };
  });

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
      className="relative w-full h-[100svh] min-h-[680px] overflow-hidden select-none"
      style={{ background: "#000" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-40 pointer-events-none">
        <div
          className="h-full"
          style={{
            background: current.accent,
            width: `${progress}%`,
            transition: paused ? "width 200ms ease-out" : "none",
          }}
        />
      </div>

      {/* HERO LAYER - swatch (CSS gradient) as the morphing image, so
          every theme's hero is guaranteed to match its palette. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          layoutId={`theme-${current.id}`}
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            background: current.swatch,
            willChange: "transform, filter",
          }}
          initial={{ filter: `blur(${BLUR_PX}px)` }}
          animate={{ filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: `blur(${BLUR_PX}px)` }}
          transition={{
            layout: { duration: MORPH_S, ease: EASE },
            filter: { duration: MORPH_S * 0.75, ease: "easeOut" },
            opacity: { duration: FADE_S, ease: FADE_EASE },
            default: { duration: MORPH_S, ease: EASE },
          }}
        />
      </AnimatePresence>

      {/* Static vignette */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      {/* Variant picker - only on Morph theme. Top center. */}
      {current.id === "morph" && (
        <div className="absolute top-7 left-1/2 -translate-x-1/2 z-[45] flex items-center gap-2 pointer-events-auto">
          <span className="text-[10px] tracking-[0.28em] uppercase text-white/55 mr-1">
            Hero variant
          </span>
          {(["a", "b", "c"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setMorphVariant(v)}
              className="size-7 rounded-full text-[10px] font-medium uppercase transition-all"
              style={{
                background: morphVariant === v ? "#fff" : "rgba(255,255,255,0.10)",
                color: morphVariant === v ? "#000" : "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              aria-label={`Hero variant ${v.toUpperCase()}`}
              aria-pressed={morphVariant === v}
            >
              {v.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Hero text - layout differs by theme and (for morph) by variant. */}
      {current.id === "morph" ? (
        <MorphHero
          variant={morphVariant}
          fontDisplay={current.fontDisplay}
          fontBody={current.fontBody}
          accent={current.accent}
          accentInk={current.accentInk}
        />
      ) : (
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
              <p
                className="text-xs tracking-[0.32em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Active theme
              </p>
              <h1
                className="uppercase text-white leading-[0.92] tracking-tight text-6xl sm:text-7xl md:text-8xl mb-4"
                style={{ fontFamily: current.fontDisplay }}
              >
                {current.name}
              </h1>
              <p
                className="text-white/80 max-w-md mb-9 leading-relaxed text-[15px]"
                style={{ fontFamily: current.fontBody }}
              >
                {current.tagline}. Click any card on the right to switch the
                page&apos;s palette, type, and shape.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const next = document.getElementById("about");
                    next?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full text-[11px] tracking-[0.28em] uppercase px-7 py-3 transition-colors"
                  style={{
                    background: current.accent,
                    color: current.accentInk,
                  }}
                >
                  See it applied
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* CARD RAIL */}
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
              layoutId={`theme-${c.id}`}
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
                background: c.swatch,
                willChange: "transform, filter",
              }}
              aria-label={`Switch to ${c.name} theme`}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* CARD LABELS - parallel layer with blur+slide exit */}
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
                  {c.tagline}
                </p>
                <p
                  className="uppercase text-white text-sm sm:text-base leading-tight tracking-tight"
                  style={{ fontFamily: c.fontDisplay }}
                >
                  {c.name}
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
              className="absolute inset-y-0 left-0"
              style={{
                background: current.accent,
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
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.05 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="text-white text-4xl sm:text-5xl tracking-tight tabular-nums"
            style={{ fontFamily: current.fontDisplay }}
            aria-label={`Theme ${active + 1} of ${LEN}`}
          >
            {String(active + 1).padStart(2, "0")}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------------------
 * MorphHero - three swappable hero compositions, all powered by GooeyText.
 * Pick one (A/B/C) via the chip picker at top-center of the section.
 * --------------------------------------------------------------------- */

type MorphHeroProps = {
  variant: MorphVariant;
  fontDisplay: string;
  fontBody: string;
  accent: string;
  accentInk: string;
};

function MorphHero({
  variant,
  fontDisplay,
  fontBody,
  accent,
  accentInk,
}: MorphHeroProps) {
  const ctaBtn = (
    <button
      type="button"
      onClick={() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="rounded-full text-[11px] tracking-[0.28em] uppercase px-7 py-3 transition-colors"
      style={{ background: accent, color: accentInk, fontFamily: fontBody }}
    >
      See it applied
    </button>
  );

  /* -------- VARIANT A: SENTENCE STACK, LEFT-ALIGNED ------------------ */
  if (variant === "a") {
    return (
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-12 max-w-[44rem] pointer-events-none">
        <motion.div
          key={`morph-a`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto"
        >
          <p
            className="text-xs tracking-[0.32em] uppercase mb-6 text-white/70"
            style={{ fontFamily: fontBody }}
          >
            Two-person studio · Nanaimo BC
          </p>
          <p
            className="uppercase text-white leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl mb-1"
            style={{ fontFamily: fontDisplay, fontWeight: 500 }}
          >
            We
          </p>
          <GooeyText
            texts={MORPH_VERBS}
            morphTime={1.1}
            cooldownTime={1.6}
            className="h-[5.5rem] sm:h-[7rem] md:h-[8.5rem] -ml-1"
            textClassName="!justify-start !text-left text-7xl sm:text-8xl md:text-9xl leading-none uppercase tracking-tight"
            textStyle={{ color: "#FFFFFF", fontFamily: fontDisplay, fontWeight: 500 }}
          />
          <p
            className="uppercase text-white leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl mb-7 mt-1"
            style={{ fontFamily: fontDisplay, fontWeight: 500 }}
          >
            websites that work.
          </p>
          <p
            className="text-white/75 max-w-md mb-9 leading-relaxed text-[15px]"
            style={{ fontFamily: fontBody }}
          >
            No agency markup. No twelve-week timelines. Just two students who
            ship sites that look good and do their job.
          </p>
          <div className="flex items-center gap-3">{ctaBtn}</div>
        </motion.div>
      </div>
    );
  }

  /* -------- VARIANT B: CENTERED NOUN, POSTER STYLE ------------------ */
  if (variant === "b") {
    return (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
        <motion.div
          key={`morph-b`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center pointer-events-auto"
        >
          <p
            className="text-xs tracking-[0.42em] uppercase mb-5 text-white/70"
            style={{ fontFamily: fontBody }}
          >
            We make
          </p>
          <GooeyText
            texts={MORPH_NOUNS}
            morphTime={1.1}
            cooldownTime={1.6}
            className="h-[6rem] sm:h-[8rem] md:h-[10rem] w-full"
            textClassName="text-7xl sm:text-8xl md:text-[120pt] leading-none uppercase tracking-tighter"
            textStyle={{ color: "#FFFFFF", fontFamily: fontDisplay, fontWeight: 500 }}
          />
          <p
            className="mt-6 text-white/80 max-w-xl mx-auto leading-relaxed text-base sm:text-lg"
            style={{ fontFamily: fontBody }}
          >
            for ambitious businesses that mean it. Built in Nanaimo by two
            students who&apos;ve had enough of bloated agency invoices.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            {ctaBtn}
          </div>
        </motion.div>
      </div>
    );
  }

  /* -------- VARIANT C: THREE-LINE STATEMENT POSTER ------------------ */
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
      <motion.div
        key={`morph-c`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center pointer-events-auto"
      >
        <p
          className="uppercase text-white leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl"
          style={{ fontFamily: fontDisplay, fontWeight: 500 }}
        >
          Two people.
        </p>
        <GooeyText
          texts={MORPH_ADJ}
          morphTime={1.0}
          cooldownTime={1.5}
          className="h-[5.5rem] sm:h-[7.5rem] md:h-[9rem] w-full my-1"
          textClassName="text-7xl sm:text-8xl md:text-[110pt] leading-none uppercase tracking-tighter"
          textStyle={{ color: "#FFFFFF", fontFamily: fontDisplay, fontWeight: 500 }}
        />
        <p
          className="uppercase text-white leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl"
          style={{ fontFamily: fontDisplay, fontWeight: 500 }}
        >
          No nonsense.
        </p>
        <p
          className="mt-8 text-white/75 max-w-md mx-auto leading-relaxed text-[15px]"
          style={{ fontFamily: fontBody }}
        >
          A two-student studio in Nanaimo, BC. We build websites for people who
          want results, not invoices.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">{ctaBtn}</div>
      </motion.div>
    </div>
  );
}
