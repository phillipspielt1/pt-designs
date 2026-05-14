export default function AboutSection() {
  const bullets = [
    "No agency markup. You pay for work, not overhead.",
    "Fast turnaround. Most projects done in 1–4 weeks.",
    "Direct communication. You work with us, not a middle layer.",
  ];

  return (
    <section
      id="about"
      className="themed-section py-24 sm:py-32 px-6 sm:px-12"
      style={{
        background: "var(--theme-bg)",
        color: "var(--theme-ink)",
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p
            className="text-[11px] tracking-[0.32em] uppercase mb-6"
            style={{ color: "var(--theme-ink-muted)" }}
          >
            About us
          </p>
          <h2
            className="text-5xl sm:text-6xl leading-[0.95] tracking-tight mb-6"
            style={{ fontFamily: "var(--theme-font-display)" }}
          >
            Young, driven,
            <br />
            built for this.
          </h2>
          <p
            className="text-base leading-relaxed mb-8 max-w-md"
            style={{
              color: "var(--theme-ink-muted)",
              fontFamily: "var(--theme-font-body)",
            }}
          >
            We&apos;re Van Dusit &amp; Tristel — two VIU students based in
            Nanaimo, BC, combining a genuine passion for design with a
            business-minded approach to every project. Being students means
            low overhead and big motivation. Every site we build is crafted
            to not just look good, but to actually work for your goals.
          </p>
          <ul className="space-y-3 mb-8">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{
                  color: "var(--theme-ink)",
                  fontFamily: "var(--theme-font-body)",
                }}
              >
                <span
                  className="mt-1.5 size-1.5 rounded-full shrink-0"
                  style={{ background: "var(--theme-accent)" }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm tracking-wide group"
            style={{
              color: "var(--theme-accent)",
              fontFamily: "var(--theme-font-body)",
            }}
          >
            Let&apos;s work together
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Right-side panel that picks up alt surface + a hint of accent */}
        <div
          className="themed-panel aspect-square sm:aspect-video md:aspect-square w-full relative overflow-hidden flex items-center justify-center"
          style={{
            background: "var(--theme-bg-alt)",
            borderRadius: "var(--theme-radius-lg)",
            border: "1px solid var(--theme-line)",
            boxShadow: "var(--theme-shadow)",
          }}
        >
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ background: "var(--theme-swatch, transparent)" }}
          />
          <div className="relative text-center px-8">
            <div
              className="size-14 rounded-full mx-auto mb-4 flex items-center justify-center text-lg font-bold"
              style={{
                background: "var(--theme-accent)",
                color: "var(--theme-accent-ink)",
                borderRadius: "var(--theme-radius-sm)",
              }}
            >
              VDT
            </div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-2"
              style={{ color: "var(--theme-ink-muted)" }}
            >
              Van Dusit &amp; Tristel
            </p>
            <p
              className="text-sm"
              style={{
                color: "var(--theme-ink)",
                fontFamily: "var(--theme-font-body)",
              }}
            >
              VIU · Nanaimo, BC
            </p>
            <div
              className="mt-6 h-px"
              style={{ background: "var(--theme-line)" }}
            />
            <div className="mt-4 flex justify-center gap-6 text-[10px] tracking-[0.22em] uppercase">
              <span style={{ color: "var(--theme-ink-muted)" }}>Web design</span>
              <span style={{ color: "var(--theme-ink-muted)" }}>Marketing</span>
              <span style={{ color: "var(--theme-ink-muted)" }}>Strategy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
