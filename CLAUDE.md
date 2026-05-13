# VDTTest

Sandbox / skills-practice site. Not for a client.

**Vault notes:** `C:\Websites\.claude\Obsidian\Sem's\Projects\VDTTest\Overview.md`

## Stack

Next.js 15 + React 19 + TypeScript + Tailwind v4 + OpenNext + Cloudflare Workers. Contact form posts to `/api/contact`, which delivers via the Workers `send_email` binding. Dev mode logs to console instead of sending.

## Local

- `npm install` once
- `npm run dev` for local dev (form will console.log)
- `npm run preview` to run the OpenNext build locally with Workers runtime
- `npm run deploy` to push to Cloudflare

## Before first deploy

In `wrangler.jsonc`, replace the placeholders:
- `send_email[0].destination_address` - must be a verified destination in Cloudflare Email Routing for the account
- `vars.CONTACT_FROM_EMAIL` - must live on a domain with Email Routing enabled
- `vars.CONTACT_TO_EMAIL`
