"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { THEMES } from "@/lib/themes";
import { useTheme } from "@/components/ThemeProvider";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import BoldDarkHero from "@/components/BoldDarkHero";

// Morph theme hero - three-line poster ("Two people. / [ADJ] / No nonsense.")
// with three background swatches to choose from (no gradient).
const MORPH_ADJ = ["SHARP", "DRIVEN", "READY", "FAST"];

type MorphBg = "dark" | "light" | "warm";

const MORPH_BG_OPTIONS: Record<
  MorphBg,
  { name: string; bg: string; ink: string; eyebrow: string; vignette: boolean }
> = {
  dark: {
    name: "Dark",
    bg: "#0A0A0A",
    ink: "#FFFFFF",
    eyebrow: "rgba(255,255,255,0.70)",
    vignette: true,
  },
  light: {
    name: "Light",
    bg: "#FFFFFF",
    ink: "#0A0A0A",
    eyebrow: "rgba(10,10,10,0.55)",
    vignette: false,
  },
  warm: {
    name: "Warm",
    bg: "#FAF5EC",
    ink: "#15110B",
    eyebrow: "rgba(21,17,11,0.55)",
    vignette: false,
  },
};

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
  const [morphBg, setMorphBg] = useState<MorphBg>("dark");
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

  // Preload every theme's photo on mount so the card-to-hero morph
  // never reveals a half-loaded image when the user clicks.
  useEffect(() => {
    THEMES.forEach((t) => {
      const img = new window.Image();
      img.src = t.image;
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

  const current = THEMES[active];
  const card = CARD[bp];
  const paddingRight = bp === "md" ? 48 : bp === "sm" ? 32 : 20;

  const cards = Array.from({ length: VISIBLE_CARDS }, (_, i) => {
    const idx = (active + 1 + i) % LEN;
    return { ...THEMES[idx], _idx: idx };
  });

  // Morph theme overrides its gradient swatch with a solid bg chosen
  // from the picker. Applies to both the hero motion.div and any rail
  // card representing Morph, so the card-to-hero morph stays clean.
  const morphCfg = MORPH_BG_OPTIONS[morphBg];
  const swatchFor = (themeId: string, defaultSwatch: string) =>
    themeId === "morph" ? morphCfg.bg : defaultSwatch;
  const isMorphActive = current.id === "morph";

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

      {/* HERO LAYER - photo on top of each theme's gradient swatch.
          Swatch shows while the photo loads (or if the URL ever 404s),
          so the hero never appears as a blank frame. */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current.id}
          layoutId={`theme-${current.id}`}
          className="absolute inset-0 z-0 overflow-hidden"
          style={{
            background: swatchFor(current.id, current.swatch),
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
        >
          <img
            src={current.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* PLAYFUL theme - GLSL shader animated bg. Mounts only when
          Playful is active so the WebGL context isn't held for the
          other four themes. Fades in over the morph so the
          card-to-hero photo transition stays visible, then the shader
          layer takes over. */}
      <AnimatePresence>
        {current.id === "playful" && (
          <motion.div
            key="shader-playful"
            initial={{ opacity: 0 }}
            // Enter: hold for the morph, then fade in slowly.
            animate={{
              opacity: 1,
              transition: { duration: 0.9, delay: 0.4, ease: "easeOut" },
            }}
            // Exit: snap out fast so it doesn't linger when the user
            // switches away from Playful (no delay, short duration).
            exit={{
              opacity: 0,
              transition: { duration: 0.22, ease: "easeIn" },
            }}
            className="absolute inset-0 z-[2] pointer-events-none"
          >
            <ShaderAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static vignette - only when the active hero is dark, so text
          stays legible. Hidden on Morph + light/warm. */}
      {(!isMorphActive || morphCfg.vignette) && (
        <div className="absolute inset-0 z-[5] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
        </div>
      )}

      {/* Bg picker - only on Morph theme AND only in local dev. The
          deployed site uses the default morphBg state and the picker
          is stripped entirely. Pick locally, ship the chosen value. */}
      {isMorphActive && process.env.NODE_ENV !== "production" && (
        <div className="absolute top-7 left-1/2 -translate-x-1/2 z-[45] flex items-center gap-2 pointer-events-auto">
          <span
            className="text-[10px] tracking-[0.28em] uppercase mr-1"
            style={{ color: morphCfg.eyebrow }}
          >
            Background
          </span>
          {(["dark", "light", "warm"] as const).map((v) => {
            const isActive = morphBg === v;
            const chipBase = morphCfg.ink === "#FFFFFF" ? "255,255,255" : "10,10,10";
            return (
              <button
                key={v}
                type="button"
                onClick={() => setMorphBg(v)}
                className="px-3 h-7 rounded-full text-[10px] font-medium uppercase tracking-[0.18em] transition-all"
                style={{
                  background: isActive
                    ? morphCfg.ink
                    : `rgba(${chipBase}, 0.08)`,
                  color: isActive ? morphCfg.bg : morphCfg.ink,
                  border: `1px solid rgba(${chipBase}, 0.25)`,
                }}
                aria-pressed={isActive}
              >
                {MORPH_BG_OPTIONS[v].name}
              </button>
            );
          })}
        </div>
      )}

      {/* Hero text - Explore gets the floating-image + TextRotate
          composition; Morph gets the three-line poster; everything else
          falls through to the standard left-aligned panel. */}
      {current.id === "explore" ? (
        <BoldDarkHero />
      ) : isMorphActive ? (
        <MorphHero
          ink={morphCfg.ink}
          eyebrowColor={morphCfg.eyebrow}
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
                className="text-[10px] tracking-[0.32em] uppercase mb-5 flex items-center gap-2 flex-wrap"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                <span
                  aria-hidden
                  className="inline-block size-1 rounded-full"
                  style={{ background: current.accent }}
                />
                <span>Preview · For {current.audience}</span>
              </p>
              <h1
                className="uppercase text-white leading-[0.92] tracking-tight text-6xl sm:text-7xl md:text-8xl mb-4"
                style={{ fontFamily: current.fontDisplay }}
              >
                {current.name}
              </h1>
              <p
                className="text-white/85 max-w-md mb-4 leading-relaxed text-[15px]"
                style={{ fontFamily: current.fontBody }}
              >
                {current.pitch}
              </p>
              <p
                className="text-white/55 max-w-md mb-9 leading-relaxed text-[12px] italic"
                style={{ fontFamily: current.fontBody }}
              >
                One of 5 live previews — VDT Sites builds in any style,
                shipped in 1–4 weeks.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full text-[11px] tracking-[0.28em] uppercase px-7 py-3 transition-colors"
                  style={{
                    background: current.accent,
                    color: current.accentInk,
                  }}
                >
                  Get a quote
                </button>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-full text-[11px] tracking-[0.28em] uppercase px-7 py-3 transition-colors border border-white/40 text-white hover:bg-white/10"
                >
                  About VDT
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
                background: swatchFor(c.id, c.swatch),
                willChange: "transform, filter",
              }}
              aria-label={`Switch to ${c.name} theme`}
            >
              <img
                src={c.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />
            </motion.button>
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

              {/* Capability badge - tells the visitor what this card
                  actually demos, not just what color it is. */}
              <div className="absolute top-2 left-2 right-2 flex justify-start">
                <span
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] tracking-[0.2em] uppercase backdrop-blur-md"
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: "#FFFFFF",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <span
                    aria-hidden
                    className="inline-block size-1 rounded-full"
                    style={{ background: c.accent }}
                  />
                  <span className="truncate max-w-[8rem]">{c.capability}</span>
                </span>
              </div>

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
 * MorphHero - the chosen "Variant C" composition: three centered lines,
 * with the middle line morphing through MORPH_ADJ. Colours are passed
 * in so the same component handles Dark / Light / Warm backgrounds.
 * --------------------------------------------------------------------- */

type MorphHeroProps = {
  ink: string;
  eyebrowColor: string;
  fontDisplay: string;
  fontBody: string;
  accent: string;
  accentInk: string;
};

function MorphHero({
  ink,
  eyebrowColor,
  fontDisplay,
  fontBody,
  accent,
  accentInk,
}: MorphHeroProps) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
      <motion.div
        // Re-key on `ink` so the entrance animation replays when the
        // user flips between backgrounds - subtle confirmation that
        // the change registered.
        key={`morph-${ink}`}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center pointer-events-auto"
      >
        <p
          className="uppercase leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl"
          style={{ color: ink, fontFamily: fontDisplay, fontWeight: 500 }}
        >
          Two people.
        </p>
        {/* Container height is generous (~1.6x text size) so absolute
            text spans never overflow upward into the line above. */}
        <GooeyText
          texts={MORPH_ADJ}
          morphTime={1.0}
          cooldownTime={1.5}
          className="h-[6rem] sm:h-[8rem] md:h-[10rem] w-full my-3 sm:my-4"
          textClassName="text-6xl sm:text-7xl md:text-8xl leading-none uppercase tracking-tighter"
          textStyle={{ color: ink, fontFamily: fontDisplay, fontWeight: 500 }}
        />
        <p
          className="uppercase leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl"
          style={{ color: ink, fontFamily: fontDisplay, fontWeight: 500 }}
        >
          No nonsense.
        </p>
        <p
          className="mt-8 max-w-md mx-auto leading-relaxed text-[15px]"
          style={{ color: eyebrowColor, fontFamily: fontBody }}
        >
          A two-student studio in Nanaimo, BC. We build websites for people who
          want results, not invoices.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
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
        </div>
      </motion.div>
    </div>
  );
}
