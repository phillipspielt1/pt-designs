// Minimal type declarations for Cloudflare's built-in `cloudflare:email`
// module so TypeScript doesn't complain at build time. The actual
// implementation is provided by the Workers runtime.
declare module "cloudflare:email" {
  export class EmailMessage {
    constructor(from: string, to: string, raw: string);
  }
}
