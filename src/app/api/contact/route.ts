import { NextResponse } from "next/server";
import { saveMessage } from "@/lib/admin";

type Payload = {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot
};

type SendEmailBinding = { send(message: unknown): Promise<void> };
type Env = {
  SEND_EMAIL?: SendEmailBinding;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
};

async function getEnv(): Promise<Env | null> {
  try {
    const mod = await import("@opennextjs/cloudflare");
    const ctx = mod.getCloudflareContext();
    return (ctx?.env as Env | undefined) ?? null;
  } catch {
    return null;
  }
}

function stripDisplayName(addr: string): string {
  const m = /<([^>]+)>/.exec(addr);
  return m ? m[1] : addr.trim();
}

async function deliver(
  from: string,
  to: string,
  subject: string,
  text: string,
  replyTo: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const env = await getEnv();

  if (!env?.SEND_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[VDTTest contact form] (dev, no SEND_EMAIL binding)");
      console.log({ from, to, replyTo, subject, text });
      return { ok: true };
    }
    return { ok: false, reason: "SEND_EMAIL binding not configured." };
  }

  try {
    const raw = [
      `From: ${from}`,
      `To: ${to}`,
      `Reply-To: ${replyTo}`,
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/plain; charset="utf-8"`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      text,
    ].join("\r\n");

    // Built-in Workers module - resolved at runtime, not bundle time.
    const spec = ["cloudflare", "email"].join(":");
    const mod = (await import(/* @vite-ignore */ /* webpackIgnore: true */ spec)) as {
      EmailMessage: new (from: string, to: string, raw: string) => unknown;
    };
    const msg = new mod.EmailMessage(
      stripDisplayName(from),
      stripDisplayName(to),
      raw,
    );
    await env.SEND_EMAIL.send(msg);
    return { ok: true };
  } catch (e) {
    const reason = e instanceof Error ? e.message : String(e);
    console.error("[VDTTest contact form] send_email threw:", reason);
    return { ok: false, reason };
  }
}

export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > 10_000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 413 });
  }

  let body: Payload;
  try {
    body = JSON.parse(raw) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot - silently accept for naive bots.
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const env = await getEnv();
  const to = env?.CONTACT_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL ?? "you@example.com";
  const from =
    env?.CONTACT_FROM_EMAIL ??
    process.env.CONTACT_FROM_EMAIL ??
    "VDT Test <noreply@example.com>";
  const subject = `VDT Test inquiry from ${name}`;
  const text = [
    `From: ${name} <${email}>`,
    "",
    message,
    "",
    "Sent from VDTTest contact form",
  ].join("\n");

  // Persist to KV first so the submission is captured in /admin even
  // if email delivery fails. This is the source of truth; the email is
  // a best-effort notification on top.
  const stored = await saveMessage({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  const result = await deliver(from, to, subject, text, email);

  // Only a hard failure (neither stored nor emailed) is an error.
  if (!stored && !result.ok) {
    return NextResponse.json(
      { error: "Could not send. Try again later." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
