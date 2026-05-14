"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useTheme } from "@/components/ThemeProvider";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const STAGGER_PARENT: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const STAGGER_CHILD: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

type Props = {
  children: ReactNode;
  /**
   * Themes for which the scroll-reveal should be active. When the
   * current theme isn't in this list, children render statically.
   * Default: only the "morph" theme.
   */
  themes?: string[];
  delay?: number;
  /**
   * "fade" = each child as one fade-up unit.
   * "stagger" = children render as motion items, indented 0.12s apart.
   */
  variant?: "fade" | "stagger";
  className?: string;
  /**
   * Re-trigger the reveal each time it scrolls back into view. Off by
   * default - usually you want it to fire once.
   */
  retrigger?: boolean;
};

/**
 * Theme-aware scroll reveal. When the Editorial theme (or any other
 * listed theme) is active, children fade up as they enter the viewport.
 * For non-listed themes the children render with no animation.
 */
export default function ScrollReveal({
  children,
  themes = ["morph"],
  delay = 0,
  variant = "fade",
  className,
  retrigger = false,
}: Props) {
  const { activeId } = useTheme();
  const enabled = themes.includes(activeId);

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  if (variant === "stagger") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: !retrigger, amount: 0.25 }}
        variants={STAGGER_PARENT}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !retrigger, amount: 0.25 }}
      variants={FADE_UP}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export const SCROLL_STAGGER_CHILD = STAGGER_CHILD;
