"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="themed-section py-24 sm:py-32 px-6 sm:px-12"
      style={{
        background: "var(--theme-bg)",
        color: "var(--theme-ink)",
      }}
    >
      <ScrollReveal className="max-w-2xl mx-auto text-center">
        <h2
          className="text-5xl sm:text-6xl leading-[0.95] tracking-tight mb-5"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          Ready to get started?
        </h2>
        <p
          className="mb-10 text-base"
          style={{
            color: "var(--theme-ink-muted)",
            fontFamily: "var(--theme-font-body)",
          }}
        >
          Tell us about your project. We&apos;ll reply within 24 hours with a
          free quote.
        </p>
        <a
          href="#form"
          className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.18em] uppercase transition-transform hover:translate-y-[-1px]"
          style={{
            background: "var(--theme-accent)",
            color: "var(--theme-accent-ink)",
            borderRadius: "var(--theme-radius-lg)",
            boxShadow: "var(--theme-shadow)",
            fontFamily: "var(--theme-font-body)",
          }}
        >
          Get in touch
          <span aria-hidden>→</span>
        </a>
      </ScrollReveal>
    </section>
  );
}
