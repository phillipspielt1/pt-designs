// Theme definitions for the carousel-driven theme switcher.
//
// Each theme is a self-contained visual identity that pitches a kind of
// business VDT Sites can build for. Clicking a card on the carousel
// re-themes the entire page so a prospective client can imagine their
// industry's site in that style.
//
// Token order: visual identity first (colors), type, geometry, depth.

export type Theme = {
  id: string;
  name: string;
  tagline: string;
  /**
   * Who this style is built for. Used in the hero subtext + frames
   * the carousel as a "what fits your business" picker rather than
   * a generic aesthetic chooser.
   */
  audience: string;
  /**
   * Short capability pill rendered on each rail card thumbnail.
   * Tells the visitor at a glance what this site demo shows them
   * VDT can build (e.g. "QUOTE WIDGET", "MICRO-INTERACTIONS").
   */
  capability: string;
  /**
   * One sentence describing what this preview actually demonstrates -
   * the interactive thing on the page, not just the styling.
   */
  pitch: string;
  /**
   * Real photo URL used as the card art + hero background.
   */
  image: string;
  /**
   * CSS gradient fallback behind the photo (covers slow loads + 404s).
   */
  swatch: string;

  // Color tokens
  bg: string;
  bgAlt: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accentInk: string;
  line: string;

  // Type
  fontDisplay: string;
  fontBody: string;

  // Geometry
  radiusSm: string;
  radiusLg: string;

  // Depth
  shadow: string;
};

export const THEMES: Theme[] = [
  /* ------------------------ 1. MINIMAL --------------------------------
   * For: tech startups, design studios, photographers, architects.
   * Mood: quiet, considered, "the work speaks for itself".
   * ------------------------------------------------------------------ */
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Clean, quiet, intentional",
    audience: "Tech, design studios, photographers",
    capability: "Static · Fast",
    pitch:
      "Sub-second load, no animation noise, Lighthouse-100 build. Get out of the way of the work.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&q=80",
    swatch: "linear-gradient(135deg, #FFFFFF 0%, #EDEDED 55%, #0A0A0A 100%)",
    bg: "#FFFFFF",
    bgAlt: "#F7F7F5",
    ink: "#0A0A0A",
    inkMuted: "#7A7A7A",
    accent: "#0A0A0A",
    accentInk: "#FFFFFF",
    line: "rgba(10,10,10,0.10)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radiusSm: "0.25rem",
    radiusLg: "0.5rem",
    shadow: "0 1px 2px rgba(0,0,0,0.04)",
  },

  /* ------------------------ 2. PLAYFUL --------------------------------
   * For: cafes, kids brands, bakeries, ice cream shops, creative makers.
   * Mood: warm, friendly, expressive, fun. Rounded everything.
   * ------------------------------------------------------------------ */
  {
    id: "playful",
    name: "Playful",
    tagline: "Warm, friendly, expressive",
    audience: "Cafés, kids brands, bakeries, makers",
    capability: "Micro-Interactions",
    pitch:
      "Animated shader bg, buttons that wiggle, cards that hover, confetti on submit. Personality on every click.",
    // A captured frame of the live shader animation, picked by sweeping
    // the animation and scoring the centre region for brightness +
    // colour - this is the peak-colour moment, not a dim frame.
    image: "/playful-bg-2.jpg",
    swatch:
      "linear-gradient(135deg, #FFEDD8 0%, #FAD8D8 35%, #A8DAEA 100%)",
    bg: "#FFEDD8",
    bgAlt: "#FFE0C2",
    ink: "#28104E",
    inkMuted: "#6B5BA3",
    // Pastel sky blue - playful + airy without the cosmetic-pink read.
    // Paired with a deep teal-navy ink for button labels so the pastel
    // doesn't wash out at the CTA.
    accent: "#A8DAEA",
    accentInk: "#1B2F3F",
    line: "rgba(40,16,78,0.14)",
    fontDisplay: "'Fraunces', Georgia, serif",
    fontBody: "'Hanken Grotesk', system-ui, sans-serif",
    radiusSm: "1rem",
    radiusLg: "2rem",
    shadow: "0 12px 32px rgba(168,218,234,0.32)",
  },

  /* ------------------------ 3. PROFESSIONAL ---------------------------
   * For: law firms, accountants, consultants, financial advisors.
   * Mood: polished, trusted, established. Navy & gold, serif headers.
   * ------------------------------------------------------------------ */
  {
    id: "professional",
    name: "Professional",
    tagline: "Polished, trusted, established",
    audience: "Corporate, transport, professional services",
    capability: "Stat-Driven Hero",
    pitch:
      "Cinematic full-bleed hero, headline credibility stats, polished corporate styling. Built to make a business look established.",
    image: "/professional-hero.jpg",
    swatch:
      "linear-gradient(135deg, #0A1422 0%, #14233A 55%, #3B6FE0 100%)",
    bg: "#0E1B2C",
    bgAlt: "#16263D",
    ink: "#EEF2F8",
    inkMuted: "#93A2B8",
    accent: "#3B6FE0",
    accentInk: "#FFFFFF",
    line: "rgba(238,242,248,0.14)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radiusSm: "0.35rem",
    radiusLg: "0.75rem",
    shadow: "0 8px 24px rgba(0,0,0,0.40)",
  },

  /* ------------------------ 4. BOLD & DARK ----------------------------
   * For: creative agencies, fashion, music, art studios.
   * Mood: loud, raw, magnetic. Anton condensed, black, electric red.
   * ------------------------------------------------------------------ */
  {
    id: "explore",
    name: "Explore",
    tagline: "Loud, raw, magnetic",
    audience: "Agencies, fashion, music, art studios",
    capability: "Editorial Hero",
    pitch:
      "Parallax image cluster, character-by-character morphing type, motion that earns attention. Built to be remembered.",
    // Dark colourful code closeup, served locally so it can't fail to
    // load the way a remote Unsplash URL intermittently did.
    image: "/explore-bg.jpg",
    swatch:
      "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 55%, #FF2D2D 100%)",
    bg: "#0A0A0A",
    bgAlt: "#161616",
    ink: "#FFFFFF",
    inkMuted: "#8A8A8A",
    accent: "#FF2D2D",
    accentInk: "#FFFFFF",
    line: "rgba(255,255,255,0.14)",
    fontDisplay: "'Anton', 'Arial Black', sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radiusSm: "0px",
    radiusLg: "0px",
    shadow: "0 8px 24px rgba(255,45,45,0.14)",
  },

  /* ------------------------ 5. TRADES ---------------------------------
   * For: plumbers, electricians, contractors, builders, mechanics.
   * Mood: hard-working, hi-vis, ready to roll. Warm off-white with
   * safety-orange accent, Anton uppercase for blowout headers.
   * ------------------------------------------------------------------ */
  {
    id: "trades",
    name: "Trades",
    tagline: "Hard-working, hi-vis, ready",
    audience: "Contractors, plumbers, electricians, builders",
    capability: "Quote · Booking",
    pitch:
      "Live quote calculator and click-to-call sticky. Turns visitors into booked jobs while you're still on a worksite.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=80",
    swatch:
      "linear-gradient(135deg, #F8F6F2 0%, #1E1E1E 55%, #FF6B0F 100%)",
    bg: "#F8F6F2",
    bgAlt: "#EDE9E1",
    ink: "#0F0F0F",
    inkMuted: "#5C5C5C",
    accent: "#FF6B0F",
    accentInk: "#FFFFFF",
    line: "rgba(15,15,15,0.14)",
    fontDisplay: "'Anton', 'Arial Black', sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radiusSm: "0.25rem",
    radiusLg: "0.375rem",
    shadow: "0 4px 12px rgba(15,15,15,0.10)",
  },
];

export const DEFAULT_THEME_ID = THEMES[0].id;
