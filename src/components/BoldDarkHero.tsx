"use client";

/* -----------------------------------------------------------------------
 * Bold & Dark — signature hero.
 *
 * Replaces the standard left-aligned hero panel when Bold & Dark is the
 * active theme. A parallax cluster of website-design photographs drifts
 * behind a centered headline whose last word rotates character-by-
 * character via <TextRotate>. The accent word burns in the theme's
 * electric red. Everything else on the page below stays themed.
 * --------------------------------------------------------------------- */

import { motion } from "framer-motion";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { TextRotate } from "@/components/ui/text-rotate";

// Website-design photos — visually verified. Used as the floating
// parallax cluster framing the headline.
const DESIGN_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80",
    alt: "Landing page design on a monitor",
  },
  {
    url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80",
    alt: "UX wireframe being sketched",
  },
  {
    url: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&q=80",
    alt: "A website shown on desktop and laptop",
  },
  {
    url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80",
    alt: "A mobile app interface",
  },
  {
    url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80",
    alt: "A code editor on a laptop",
  },
];

const ROTATING = ["bold", "loud", "magnetic", "iconic", "yours"];
const ACCENT = "#FF2D2D";

export default function BoldDarkHero() {
  return (
    <div className="absolute inset-0 z-10">
      {/* Parallax cluster — negative sensitivity so images drift against
          the cursor. Sits above the vignette (z-5), below the text. */}
      <Floating sensitivity={-0.6} className="z-[8]">
        <FloatingElement depth={0.6} className="top-[12%] left-[4%]">
          <DesignCard src={DESIGN_IMAGES[0].url} alt={DESIGN_IMAGES[0].alt} rotate={-7} className="w-32 sm:w-44 lg:w-52" />
        </FloatingElement>
        <FloatingElement depth={1.4} className="top-[5%] left-[31%]">
          <DesignCard src={DESIGN_IMAGES[1].url} alt={DESIGN_IMAGES[1].alt} rotate={6} className="w-28 sm:w-36 lg:w-40" />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[44%] left-[2%]">
          <DesignCard src={DESIGN_IMAGES[4].url} alt={DESIGN_IMAGES[4].alt} rotate={4} className="w-32 sm:w-44 lg:w-52" />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[9%] right-[5%]">
          <DesignCard src={DESIGN_IMAGES[2].url} alt={DESIGN_IMAGES[2].alt} rotate={8} className="w-36 sm:w-48 lg:w-56" />
        </FloatingElement>
        <FloatingElement depth={2.6} className="top-[40%] right-[7%]">
          <DesignCard src={DESIGN_IMAGES[3].url} alt={DESIGN_IMAGES[3].alt} rotate={-9} className="w-24 sm:w-32 lg:w-36" />
        </FloatingElement>
      </Floating>

      {/* Centered headline — nudged up so it clears the card rail. */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pb-40 px-6 pointer-events-none">
        <motion.div
          className="text-center pointer-events-auto max-w-[42rem]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] sm:text-xs tracking-[0.34em] uppercase text-white/70 mb-6 flex items-center justify-center gap-2">
            <span aria-hidden className="inline-block size-1 rounded-full" style={{ background: ACCENT }} />
            Preview · For agencies, fashion, music
          </p>

          <h1
            className="uppercase text-white leading-[0.92] tracking-tight flex flex-col items-center"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            <span className="text-5xl sm:text-7xl md:text-8xl">Make your site</span>
            <TextRotate
              texts={ROTATING}
              mainClassName="text-6xl sm:text-8xl md:text-9xl justify-center overflow-hidden pb-2 text-[#FF2D2D]"
              elementLevelClassName="px-[0.01em]"
              staggerDuration={0.025}
              staggerFrom="last"
              rotationInterval={2600}
              transition={{ type: "spring", damping: 28, stiffness: 360 }}
            />
          </h1>

          <p className="mt-7 text-white/75 text-[15px] leading-relaxed max-w-md mx-auto">
            Editorial heroes, motion that earns attention, layouts people
            actually remember. One of five live previews — built by VDT
            Sites in 1–4 weeks.
          </p>

          <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-[11px] tracking-[0.28em] uppercase px-7 py-3 transition-transform hover:-translate-y-0.5"
              style={{ background: ACCENT, color: "#FFFFFF" }}
            >
              Get a quote
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-[11px] tracking-[0.28em] uppercase px-7 py-3 border border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              About VDT
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DesignCard({
  src,
  alt,
  rotate,
  className,
}: {
  src: string;
  alt: string;
  rotate: number;
  className: string;
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`${className} aspect-[4/3] object-cover rounded-lg shadow-2xl ring-1 ring-white/15 hover:scale-[1.04] transition-transform duration-300 cursor-pointer`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  );
}
