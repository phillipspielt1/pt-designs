import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn-style className combiner: clsx for conditional classes, then
 * tailwind-merge to resolve conflicting Tailwind utilities (e.g.
 * "px-2 px-4" -> "px-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Relative luminance (0..1) of a #rrggbb hex colour. */
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  if (h.length < 6) return 1;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Returns the accent colour as-is, unless it's too dark to read on a
 * dark surface (e.g. the Minimal theme's near-black accent on the
 * black preview banner) — in which case it falls back to white.
 */
export function accentForDark(hex: string): string {
  return luminance(hex) < 0.22 ? "#FFFFFF" : hex;
}
