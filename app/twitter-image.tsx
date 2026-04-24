/**
 * Reuse the OG image for Twitter/X link previews.
 * Next's file convention requires a separate twitter-image.* file; a
 * re-export keeps us DRY without duplicating the render logic.
 */
export { default, alt, size, contentType } from "./opengraph-image";
