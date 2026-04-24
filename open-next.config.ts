/**
 * OpenNext adapter config for Cloudflare.
 *
 * Minimal setup: no KV cache binding, no R2 incremental cache - this site
 * has no ISR or on-demand revalidation (just SSR pages + a POST route),
 * so the defaults are fine. If we ever add `revalidate` or `revalidateTag`,
 * wire up an incrementalCache here and a KV/R2 binding in wrangler.jsonc.
 */
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
