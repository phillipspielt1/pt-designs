"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

/**
 * Trades capability demo — a working quote calculator that drops into
 * the hero when the Trades theme is active. Demonstrates the kind of
 * conversion widget VDT can build for contractor / plumber / electrician
 * sites: pick a job, pick a property size, get an instant ballpark.
 *
 * Numbers are illustrative — the point is the interaction, not the math.
 */

const JOBS = [
  { id: "plumbing", label: "Plumbing", base: 180 },
  { id: "electrical", label: "Electrical", base: 220 },
  { id: "carpentry", label: "Carpentry", base: 150 },
  { id: "roofing", label: "Roofing", base: 320 },
  { id: "hvac", label: "HVAC", base: 260 },
];

const SIZES = [
  { id: "small", label: "Small job", factor: 1 },
  { id: "medium", label: "Half day", factor: 2.4 },
  { id: "large", label: "Full day +", factor: 4.5 },
];

const ACCENT = "#FF6B0F";

export default function TradesQuoteWidget() {
  const [jobId, setJobId] = useState(JOBS[0].id);
  const [sizeId, setSizeId] = useState(SIZES[0].id);
  const [urgent, setUrgent] = useState(false);

  const quote = useMemo(() => {
    const job = JOBS.find((j) => j.id === jobId) ?? JOBS[0];
    const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[0];
    const base = job.base * size.factor;
    const urgencyMultiplier = urgent ? 1.35 : 1;
    const total = base * urgencyMultiplier;
    const lo = Math.round(total * 0.9);
    const hi = Math.round(total * 1.2);
    return { lo, hi };
  }, [jobId, sizeId, urgent]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 max-w-md rounded-xl backdrop-blur-md text-white border overflow-hidden"
      style={{
        background: "rgba(15,15,15,0.72)",
        borderColor: "rgba(255,255,255,0.14)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      }}
      aria-label="Live demo: quote calculator"
    >
      <header
        className="flex items-center justify-between px-4 py-2.5 text-[10px] tracking-[0.22em] uppercase"
        style={{ background: ACCENT, color: "#0A0A0A" }}
      >
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full"
            style={{ background: "#0A0A0A" }}
          />
          Live demo · quote in 10 seconds
        </span>
        <span className="opacity-70">Try it</span>
      </header>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Job type */}
        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-white/55 mb-2">
            Job type
          </p>
          <div className="flex flex-wrap gap-1.5">
            {JOBS.map((j) => {
              const active = j.id === jobId;
              return (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => setJobId(j.id)}
                  className="text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-sm transition-colors"
                  style={{
                    background: active ? ACCENT : "rgba(255,255,255,0.08)",
                    color: active ? "#0A0A0A" : "#FFFFFF",
                    border: `1px solid ${active ? ACCENT : "rgba(255,255,255,0.16)"}`,
                  }}
                >
                  {j.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Size */}
        <div>
          <p className="text-[10px] tracking-[0.22em] uppercase text-white/55 mb-2">
            Scope
          </p>
          <div className="flex gap-1.5">
            {SIZES.map((s) => {
              const active = s.id === sizeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSizeId(s.id)}
                  className="flex-1 text-[11px] tracking-wider uppercase px-3 py-1.5 rounded-sm transition-colors"
                  style={{
                    background: active ? ACCENT : "rgba(255,255,255,0.08)",
                    color: active ? "#0A0A0A" : "#FFFFFF",
                    border: `1px solid ${active ? ACCENT : "rgba(255,255,255,0.16)"}`,
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Urgent toggle */}
        <label className="flex items-center justify-between gap-3 cursor-pointer">
          <span className="text-[12px] text-white/80">
            Same-day callout (+35%)
          </span>
          <span
            className="relative inline-block w-10 h-5 rounded-full transition-colors"
            style={{
              background: urgent ? ACCENT : "rgba(255,255,255,0.18)",
            }}
            onClick={() => setUrgent((v) => !v)}
            role="switch"
            aria-checked={urgent}
          >
            <span
              className="absolute top-0.5 left-0.5 size-4 rounded-full bg-white transition-transform"
              style={{ transform: urgent ? "translateX(20px)" : "translateX(0)" }}
            />
          </span>
        </label>

        {/* Output */}
        <div
          className="pt-4 mt-2 border-t flex items-baseline justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-white/55 mb-1">
              Estimated quote
            </p>
            <motion.p
              key={`${quote.lo}-${quote.hi}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-2xl sm:text-3xl tabular-nums leading-none"
              style={{ color: ACCENT, fontFamily: "'Anton', sans-serif" }}
            >
              ${quote.lo}–${quote.hi}
            </motion.p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase px-4 py-2.5 rounded-sm transition-colors"
            style={{ background: ACCENT, color: "#0A0A0A" }}
          >
            Book free quote
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </motion.aside>
  );
}
