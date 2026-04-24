/**
 * Single source of truth for site-level SEO constants.
 *
 * Update SITE_URL when a custom domain is wired up (or set NEXT_PUBLIC_SITE_URL
 * in Vercel project env vars to override without a code change).
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vdtsites.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Van Duist & Treitel";
export const SITE_TAGLINE = "Web Design in Nanaimo, BC";

export const SITE_DESCRIPTION =
  "Custom websites for small businesses, portfolios, and online stores in Nanaimo, Vancouver Island, and across BC. Two-person student studio — agency-quality builds without the agency price tag.";

export const DEFAULT_OG_IMAGE = "/icon.png"; // swap for a dedicated 1200x630 when available

/**
 * Schema.org JSON-LD for a local professional service.
 * Embedded once in the root layout — Google reads this for the knowledge panel,
 * local pack results, and rich snippets.
 */
export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  alternateName: "VDT Web Design",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/icon.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nanaimo",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "City", name: "Nanaimo" },
    { "@type": "AdministrativeArea", name: "Vancouver Island" },
    { "@type": "AdministrativeArea", name: "British Columbia" },
  ],
  knowsAbout: [
    "Web design",
    "Next.js development",
    "Small business websites",
    "E-commerce websites",
    "Portfolio websites",
    "Landing pages",
    "Responsive design",
    "SEO",
  ],
  slogan: "Agency quality. Student pricing.",
};

export const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-CA",
};
