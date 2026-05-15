import Link from "next/link";

type NavVariant = "overlay" | "solid";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

/**
 * Site header.
 *
 * - "overlay"  — transparent, white text, absolutely positioned over
 *   the dark hero carousel (used on the home page).
 * - "solid"    — opaque white bar with dark text + bottom hairline,
 *   used on content pages like the blog where there's no dark hero.
 *
 * Layout is a 3-column grid so the nav links sit dead-centre
 * regardless of how wide the brand mark is.
 */
export default function SiteNav({
  variant = "overlay",
  activeHref,
}: {
  variant?: NavVariant;
  activeHref?: string;
}) {
  const solid = variant === "solid";
  const ink = solid ? "#15110B" : "#FFFFFF";
  const muted = solid ? "rgba(21,17,11,0.62)" : "rgba(255,255,255,0.85)";

  return (
    <nav
      className={
        solid
          ? "sticky top-0 z-40 w-full"
          : "absolute top-0 left-0 right-0 z-30"
      }
      style={
        solid
          ? {
              background: "#FFFFFF",
              borderBottom: "1px solid rgba(21,17,11,0.10)",
            }
          : undefined
      }
    >
      <div className="grid grid-cols-3 items-center px-6 sm:px-10 py-5">
        {/* Left — brand */}
        <div className="flex justify-start">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[11px] tracking-[0.32em] uppercase"
            style={{ color: ink }}
          >
            <span
              className="inline-block size-5 rounded-full relative"
              style={{ border: `1px solid ${muted}` }}
            >
              <span
                className="absolute inset-1 rounded-full"
                style={{ border: `1px solid ${muted}` }}
              />
            </span>
            VDT Sites
          </Link>
        </div>

        {/* Centre — nav links */}
        <ul className="flex justify-center items-center gap-7 sm:gap-10 text-[11px] tracking-[0.28em] uppercase">
          {LINKS.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className="transition-opacity hover:opacity-100"
                  style={{ color: isActive ? ink : muted, opacity: isActive ? 1 : 0.95 }}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1.5 h-px bg-amber-400" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Right — spacer keeps the centre column truly centred */}
        <div aria-hidden />
      </div>
    </nav>
  );
}
