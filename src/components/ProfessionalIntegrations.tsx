"use client";

/* -----------------------------------------------------------------------
 * Professional theme — signature interaction.
 *
 * Adapted from the IntegrationHero pattern: two opposite-direction
 * scrolling rows of icon "chips" inside a glass-on-navy section with a
 * gold accent. Re-skinned to use Professional's theme tokens so it
 * feels native to the rest of the page when this theme is active.
 *
 * Reads as a "trusted by / integrates with" strip — the kind of social
 * proof element law firms, accounting firms, and financial advisors
 * actually use. Renders only when the active theme is Professional.
 * --------------------------------------------------------------------- */

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  Award,
  Banknote,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  FileText,
  Gem,
  KeyRound,
  Landmark,
  Lock,
  Scale,
  Shield,
  Star,
  Users,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

// Two distinct sets so rows don't visually duplicate at any moment.
const ROW_ONE: IconType[] = [Scale, Briefcase, Building2, BookOpen, Award, FileText, Users];
const ROW_TWO: IconType[] = [Banknote, BarChart3, Calculator, Lock, Shield, KeyRound, Landmark, Gem, Star];

const repeatIcons = (icons: IconType[], times = 4) =>
  Array.from({ length: times }, () => icons).flat();

export default function ProfessionalIntegrations() {
  const { activeId } = useTheme();
  if (activeId !== "professional") return null;

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background: "var(--theme-bg)",
        color: "var(--theme-ink)",
        borderTop: "1px solid var(--theme-line)",
        borderBottom: "1px solid var(--theme-line)",
      }}
      aria-label="Trusted partners and integrations"
    >
      {/* Faint dot grid — Professional theme aesthetic */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(201,169,97,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 mb-5 text-[11px] tracking-[0.22em] uppercase rounded-full"
          style={{
            background: "rgba(201,169,97,0.10)",
            border: "1px solid var(--theme-line)",
            color: "var(--theme-accent)",
            fontFamily: "var(--theme-font-body)",
          }}
        >
          <span
            aria-hidden
            className="inline-block size-1.5 rounded-full"
            style={{ background: "var(--theme-accent)" }}
          />
          Trusted partners
        </span>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight max-w-3xl mx-auto"
          style={{ fontFamily: "var(--theme-font-display)" }}
        >
          Built to <span className="italic" style={{ color: "var(--theme-accent)" }}>plug in</span>
          {" "}with the systems you already run on.
        </h2>

        <p
          className="mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          style={{
            color: "var(--theme-ink-muted)",
            fontFamily: "var(--theme-font-body)",
          }}
        >
          Sites that talk to your CRM, accounting platform, scheduler, and
          payment processor, without a brittle handoff.
        </p>

        <div className="mt-8 flex items-center justify-center">
          <Button
            asChild
            className="px-6 py-5 rounded-full text-sm tracking-[0.18em] uppercase"
            style={{
              background: "var(--theme-accent)",
              color: "var(--theme-accent-ink)",
              fontFamily: "var(--theme-font-body)",
            }}
          >
            <a href="#contact">See it applied to your stack →</a>
          </Button>
        </div>

        {/* Scrolling logo carousels */}
        <div className="mt-16 relative pb-2">
          <Row icons={repeatIcons(ROW_ONE, 4)} direction="left" />
          <div className="h-6" />
          <Row icons={repeatIcons(ROW_TWO, 4)} direction="right" />

          {/* Fade overlays */}
          <div
            className="absolute left-0 top-0 h-full w-28 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--theme-bg), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 h-full w-28 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--theme-bg), transparent)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes prof-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes prof-scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .anim-left {
          animation: prof-scroll-left 38s linear infinite;
        }
        .anim-right {
          animation: prof-scroll-right 38s linear infinite;
        }
      `}</style>
    </section>
  );
}

function Row({ icons, direction }: { icons: IconType[]; direction: "left" | "right" }) {
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-6 whitespace-nowrap ${
          direction === "left" ? "anim-left" : "anim-right"
        }`}
      >
        {icons.map((Icon, i) => (
          <div
            key={i}
            className="h-16 w-16 flex-shrink-0 rounded-full flex items-center justify-center transition-transform hover:scale-110"
            style={{
              background: "var(--theme-bg-alt)",
              border: "1px solid var(--theme-line)",
              boxShadow: "var(--theme-shadow)",
              color: "var(--theme-accent)",
            }}
            aria-hidden
          >
            <Icon width={22} height={22} strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
