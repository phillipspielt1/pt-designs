import { headers } from "next/headers";

/**
 * Minimal KV namespace shape. Avoids pulling in @cloudflare/workers-types
 * just for one binding — only the methods we actually use are declared.
 */
export type AdminKV = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list(opts?: {
    prefix?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
};

type Env = { ADMIN_KV?: AdminKV };

/** The ADMIN_KV binding, or null when running outside the Workers runtime. */
export async function getAdminKV(): Promise<AdminKV | null> {
  try {
    const mod = await import("@opennextjs/cloudflare");
    const ctx = mod.getCloudflareContext();
    return (ctx?.env as Env | undefined)?.ADMIN_KV ?? null;
  } catch {
    return null;
  }
}

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  at: string; // ISO timestamp
};

const MSG_PREFIX = "msg:";
const messageKey = (id: string) => MSG_PREFIX + id;

/**
 * Persist a contact submission to KV. Returns false if KV is unavailable
 * (e.g. local dev without the binding) so the caller can decide what to do.
 */
export async function saveMessage(
  m: Pick<ContactMessage, "name" | "email" | "message">,
): Promise<boolean> {
  const kv = await getAdminKV();
  if (!kv) return false;
  // Date.now() is a fixed-width prefix, so key order == chronological order.
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const record: ContactMessage = { id, at: new Date().toISOString(), ...m };
  await kv.put(messageKey(id), JSON.stringify(record));
  return true;
}

/** Every stored contact message, newest first. */
export async function listMessages(): Promise<ContactMessage[]> {
  const kv = await getAdminKV();
  if (!kv) return [];
  const { keys } = await kv.list({ prefix: MSG_PREFIX, limit: 1000 });
  const records = await Promise.all(
    keys.map(async (k) => {
      const raw = await kv.get(k.name);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as ContactMessage;
      } catch {
        return null;
      }
    }),
  );
  return records
    .filter((r): r is ContactMessage => r !== null)
    .sort((a, b) => (a.at < b.at ? 1 : -1));
}

export async function deleteMessage(id: string): Promise<void> {
  const kv = await getAdminKV();
  if (!kv) return;
  await kv.delete(messageKey(id));
}

/**
 * Admin auth gate.
 *
 * Production relies on Cloudflare Access: when an Access application
 * protects /admin* and /api/admin/*, Cloudflare authenticates the user
 * at the edge and injects Cf-Access-* headers. We additionally check
 * for that header so the admin fails CLOSED if Access is ever removed
 * or misconfigured.
 *
 * In dev (no Access in front) we allow through so /admin is previewable
 * with `npm run dev`.
 */
export async function adminGate(): Promise<
  { ok: true; email: string } | { ok: false }
> {
  if (process.env.NODE_ENV !== "production") {
    return { ok: true, email: "dev@localhost" };
  }
  const h = await headers();
  const jwt = h.get("cf-access-jwt-assertion");
  if (!jwt) return { ok: false };
  return {
    ok: true,
    email: h.get("cf-access-authenticated-user-email") ?? "authenticated",
  };
}
