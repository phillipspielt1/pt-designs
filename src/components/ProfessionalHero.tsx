"use client";

/* -----------------------------------------------------------------------
 * Professional — signature hero.
 *
 * Cinematic full-bleed treatment: the theme photo (a premium car at
 * dusk) fills the frame via the carousel's morph layer; this component
 * lays a dark left-to-right gradient over it so a bold headline,
 * description, white CTA, and a row of credibility stats stay legible
 * on the left. The carousel's own prev/next + counter sit bottom-right.
 *
 * Copy is original demo copy for a fictional corporate client — the
 * point is to show the layout VDT can build, not any real business.
 * --------------------------------------------------------------------- */

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Honest stats for a brand-new studio: speed, quality, value — things
// that can be promised on day one, not invented track record.
const STATS = [
  { value: "24h", label: "Quote Reply Time" },
  { value: "100%", label: "Custom-Built" },
  { value: "$0", label: "Agency Markup" },
];

export default function ProfessionalHero() {
  return (
    <div className="absolute inset-0 z-10">
      {/* Left-to-right dark wash so the headline reads over the photo. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, #0A1422 0%, rgba(10,20,34,0.92) 26%, rgba(10,20,34,0.55) 48%, rgba(10,20,34,0) 70%)",
        }}
      />
      {/* Floor wash so the stats row stays readable. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,20,34,0.85) 0%, rgba(10,20,34,0) 100%)",
        }}
      />

      {/* Headline block — left aligned, vertically centred, nudged up
          so it clears the stats row. */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 pb-44 max-w-[46rem] pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="pointer-events-auto"
        >
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/65 mb-5 flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block size-1.5 rounded-full"
              style={{ background: "#3B6FE0" }}
            />
            Preview · For corporate &amp; professional services
          </p>

          <h1
            className="text-white font-extrabold leading-[1.04] tracking-[-0.02em] text-4xl sm:text-5xl md:text-6xl mb-5"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Built to Perform.
            <br />
            Designed to Impress.
          </h1>

          <p className="text-white/75 max-w-md mb-8 leading-relaxed text-[15px]">
            A polished, fast, conversion-built site that makes your business
            look every bit as established as it is, and turns visitors into
            clients.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2.5 rounded-full bg-white text-[#0A1422] text-[12px] font-semibold tracking-[0.04em] px-6 py-3 transition-transform hover:-translate-y-0.5"
            >
              See How It Works
              <span
                aria-hidden
                className="inline-flex items-center justify-center size-5 rounded-full text-white"
                style={{ background: "#3B6FE0" }}
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full text-[12px] tracking-[0.04em] font-medium px-6 py-3 transition-colors border border-white/35 text-white hover:bg-white/10"
            >
              Get a quote
            </button>
          </div>
        </motion.div>
      </div>

      {/* Credibility stats — bottom-left. */}
      <motion.div
        className="absolute left-6 sm:left-12 bottom-24 sm:bottom-28 flex gap-7 sm:gap-12 pointer-events-auto"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease, delay: 0.2 }}
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <p
              className="text-white font-extrabold leading-none text-3xl sm:text-4xl tracking-[-0.02em]"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              {s.value}
            </p>
            <p className="mt-2 text-[11px] sm:text-[12px] leading-tight text-white/60 max-w-[7.5rem]">
              {s.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
