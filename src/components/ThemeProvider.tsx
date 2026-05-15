"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { DEFAULT_THEME_ID, THEMES, type Theme } from "@/lib/themes";

type Ctx = {
  themes: Theme[];
  activeId: string;
  active: Theme;
  setActiveId: (id: string) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/**
 * Like useTheme, but returns null instead of throwing when there's no
 * provider above. Used by components (e.g. SiteNav) that render both
 * inside the themed home page and on un-themed pages like the blog.
 */
export function useThemeOptional() {
  return useContext(ThemeCtx);
}

/**
 * ThemeProvider holds the active theme state, exposes it via context, and
 * applies the theme's color/type tokens as CSS custom properties on its
 * root div. Every section below can simply read `var(--theme-bg)` etc.,
 * and the browser's CSS transitions will animate any property changes
 * smoothly during a theme switch.
 */
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeId, setActiveIdState] = useState(DEFAULT_THEME_ID);

  const setActiveId = useCallback((id: string) => {
    setActiveIdState(id);
  }, []);

  const active = useMemo(
    () => THEMES.find((t) => t.id === activeId) ?? THEMES[0],
    [activeId],
  );

  const value = useMemo<Ctx>(
    () => ({ themes: THEMES, activeId, active, setActiveId }),
    [activeId, active, setActiveId],
  );

  // Theme tokens are applied as CSS custom properties on the wrapping
  // div. Sections downstream consume them via var() so theme switches
  // animate through CSS transitions on color/background/border.
  const cssVars = {
    "--theme-bg": active.bg,
    "--theme-bg-alt": active.bgAlt,
    "--theme-ink": active.ink,
    "--theme-ink-muted": active.inkMuted,
    "--theme-accent": active.accent,
    "--theme-accent-ink": active.accentInk,
    "--theme-line": active.line,
    "--theme-font-display": active.fontDisplay,
    "--theme-font-body": active.fontBody,
    "--theme-radius-sm": active.radiusSm,
    "--theme-radius-lg": active.radiusLg,
    "--theme-shadow": active.shadow,
  } as React.CSSProperties;

  return (
    <ThemeCtx.Provider value={value}>
      <div
        style={cssVars}
        className="themed-root"
        data-theme={active.id}
      >
        {children}
      </div>
    </ThemeCtx.Provider>
  );
}
