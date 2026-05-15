import Link from "next/link";
import SiteNav from "@/components/SiteNav";

/**
 * Shared chrome for all /blog routes — solid white nav on top, a clean
 * editorial footer below. The blog deliberately sits outside the
 * carousel theme system so it stays consistently legible and fast.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FFFFFF" }}>
      <SiteNav variant="solid" activeHref="/blog" />
      <div className="flex-1">{children}</div>

      <footer
        className="mt-24"
        style={{ borderTop: "1px solid rgba(21,17,11,0.10)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div
            className="flex items-center gap-5"
            style={{ color: "#6B6357", fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            <span>&copy; {new Date().getFullYear()} VDT Sites</span>
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/#contact" className="hover:underline">
              Contact
            </Link>
          </div>
          <a
            href="https://vdtsites.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono uppercase tracking-[0.18em] text-[10px] transition-opacity hover:opacity-70"
            style={{ color: "#9A9389" }}
          >
            Site by VDTSITES.COM
          </a>
        </div>
      </footer>
    </div>
  );
}
