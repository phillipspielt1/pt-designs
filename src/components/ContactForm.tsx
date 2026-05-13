"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setErrorMsg(j.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      (e.target as HTMLFormElement).reset();
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="text-center py-10">
        <p className="font-display text-2xl">Thanks, message received.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field name="name" label="Name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="message" label="Message" required multiline />

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      {status === "error" && (
        <p className="text-sm text-red-700">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[var(--color-ink)] text-[var(--color-bone)] py-3 hover:bg-[var(--color-accent-strong)] transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  multiline = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const cls =
    "w-full bg-white/60 border border-[var(--color-line)] rounded-xl px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/40 focus:outline-none focus:border-[var(--color-accent)] focus:bg-white transition-colors";
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.22em] text-[var(--color-ink-soft)]/70 mb-2">
        {label} {required && <span className="text-red-700">*</span>}
      </span>
      {multiline ? (
        <textarea name={name} required={required} rows={5} className={`${cls} resize-none`} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
