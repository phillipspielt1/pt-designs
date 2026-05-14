// Theme definitions for the carousel-driven theme switcher.
// Each theme is a self-contained visual identity: colors, type, radius,
// and a CSS gradient "swatch" that serves as the carousel card art and
// the hero background. We start with gradient swatches (not photos) so
// every theme's imagery is guaranteed to match its palette - we can
// swap in real photos per-theme later without changing the framework.

export type Theme = {
  id: string;
  name: string; // shown on the card label
  tagline: string; // short descriptor under the name
  swatch: string; // CSS gradient used as the card art + hero background

  // Color tokens
  bg: string; // primary page background
  bgAlt: string; // alt surface (cards, panels)
  ink: string; // primary text color
  inkMuted: string; // secondary text color
  accent: string; // CTA / highlight
  accentInk: string; // text color on accent
  line: string; // borders, hairlines

  // Type
  fontDisplay: string;
  fontBody: string;

  // Geometry
  radiusSm: string; // small radii (inputs, chips)
  radiusLg: string; // large radii (cards, sections)

  // Visual feel
  shadow: string; // box-shadow used on raised surfaces
};

export const THEMES: Theme[] = [
  {
    id: "morph",
    name: "Morph",
    tagline: "Liquid type, warm palette",
    swatch: "linear-gradient(135deg, #FAF5EC 0%, #E8DCC4 45%, #D89A2D 100%)",
    bg: "#FAF5EC",
    bgAlt: "#F2EADA",
    ink: "#15110B",
    inkMuted: "#5B5240",
    accent: "#D89A2D",
    accentInk: "#15110B",
    line: "rgba(21, 17, 11, 0.12)",
    fontDisplay: "'Fraunces', 'Iowan Old Style', Georgia, serif",
    fontBody: "'Hanken Grotesk', 'Inter', system-ui, sans-serif",
    radiusSm: "0.5rem",
    radiusLg: "1rem",
    shadow: "0 1px 2px rgba(21,17,11,0.05), 0 8px 24px rgba(21,17,11,0.06)",
  },
  {
    id: "brutalist",
    name: "Brutalist",
    tagline: "Loud, raw, unapologetic",
    swatch: "linear-gradient(135deg, #0A0A0A 0%, #161616 55%, #FF3B30 100%)",
    bg: "#0A0A0A",
    bgAlt: "#161616",
    ink: "#FFFFFF",
    inkMuted: "#9A9A9A",
    accent: "#FF3B30",
    accentInk: "#FFFFFF",
    line: "rgba(255, 255, 255, 0.16)",
    fontDisplay: "'Anton', 'Arial Black', sans-serif",
    fontBody: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace",
    radiusSm: "0px",
    radiusLg: "0px",
    shadow: "none",
  },
  {
    id: "minimal",
    name: "Soft Minimal",
    tagline: "Quiet, airy, precise",
    swatch: "linear-gradient(135deg, #FFFFFF 0%, #F4F4F2 50%, #7C8B7E 100%)",
    bg: "#FFFFFF",
    bgAlt: "#F7F7F5",
    ink: "#1A1F1B",
    inkMuted: "#7A8079",
    accent: "#5D6A4A",
    accentInk: "#FFFFFF",
    line: "rgba(26, 31, 27, 0.1)",
    fontDisplay: "'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    radiusSm: "0.375rem",
    radiusLg: "0.75rem",
    shadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  {
    id: "glass",
    name: "Pastel Glass",
    tagline: "Soft, frosted, dreamy",
    swatch:
      "linear-gradient(135deg, #FAD7E3 0%, #C6DCFB 45%, #B4F0DD 100%)",
    bg: "#F2EBF7",
    bgAlt: "rgba(255, 255, 255, 0.55)",
    ink: "#2B1F47",
    inkMuted: "#6E5F8A",
    accent: "#7B5BE6",
    accentInk: "#FFFFFF",
    line: "rgba(43, 31, 71, 0.12)",
    fontDisplay: "'Fraunces', Georgia, serif",
    fontBody: "'Hanken Grotesk', system-ui, sans-serif",
    radiusSm: "0.875rem",
    radiusLg: "1.75rem",
    shadow: "0 8px 32px rgba(123, 91, 230, 0.18)",
  },
  {
    id: "cyber",
    name: "Cyber Tech",
    tagline: "Dark, neon, technical",
    swatch:
      "linear-gradient(135deg, #050810 0%, #0B1426 50%, #00F0B5 100%)",
    bg: "#050810",
    bgAlt: "#0B1426",
    ink: "#E6F1FF",
    inkMuted: "#6A7993",
    accent: "#00F0B5",
    accentInk: "#050810",
    line: "rgba(0, 240, 181, 0.18)",
    fontDisplay: "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace",
    fontBody: "'Inter', system-ui, sans-serif",
    radiusSm: "0.125rem",
    radiusLg: "0.25rem",
    shadow: "0 0 0 1px rgba(0, 240, 181, 0.2), 0 12px 32px rgba(0, 240, 181, 0.08)",
  },
];

export const DEFAULT_THEME_ID = THEMES[0].id;
