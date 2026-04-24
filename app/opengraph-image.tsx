import { ImageResponse } from "next/og";

// Next.js file-convention metadata - these exports drive the <meta og:image:*> tags
export const alt =
  "Van Duist & Treitel - Web Design in Nanaimo, BC. Websites built to impress.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide Open Graph image, rendered once at build time by Next (cached).
 * Applies to every route that doesn't supply its own opengraph-image file.
 *
 * Uses Satori's default font (Noto Sans) - still clean at link-preview sizes.
 * Upgrade to a custom font later by loading a .ttf via node:fs and passing
 * it to the ImageResponse `fonts` option.
 */
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          backgroundColor: "#ece7de",
          // Subtle radial highlight so it doesn't look flat
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 55%)",
          color: "#1a1a1a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: eyebrow wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#6e6e73",
            fontWeight: 600,
          }}
        >
          <span>Van Duist &amp; Treitel</span>
          <span style={{ color: "#bbb" }}>·</span>
          <span style={{ color: "#888" }}>Web Design</span>
        </div>

        {/* Middle: big headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 132,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            <span>Websites built</span>
            <span style={{ color: "#8a8880" }}>to impress.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#555",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Custom small-business sites · Nanaimo, BC · Vancouver Island
          </div>
        </div>

        {/* Bottom row: locator pill + VDT mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              border: "1.5px solid rgba(26,26,26,0.15)",
              borderRadius: "999px",
              fontSize: 20,
              color: "#1a1a1a",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            <span>Agency quality</span>
            <span style={{ color: "#aaa" }}>·</span>
            <span>Student pricing</span>
          </div>

          {/* VDT mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
              height: 110,
              borderRadius: "50%",
              backgroundColor: "#1a1a1a",
              color: "white",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.06em",
            }}
          >
            VDT
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
