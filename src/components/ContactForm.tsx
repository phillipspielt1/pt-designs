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
        <p
          className="text-2xl"
          style={{
            color: "var(--theme-ink)",
            fontFamily: "var(--theme-font-display)",
          }}
        >
          Thanks, message received.
        </p>
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
        <p className="text-sm" style={{ color: "#dc2626" }}>
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 transition-colors disabled:opacity-60 text-sm tracking-[0.18em] uppercase"
        style={{
          background: "var(--theme-accent)",
          color: "var(--theme-accent-ink)",
          borderRadius: "var(--theme-radius-lg)",
          fontFamily: "var(--theme-font-body)",
        }}
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
  const fieldStyle: React.CSSProperties = {
    background: "var(--theme-bg)",
    border: "1px solid var(--theme-line)",
    color: "var(--theme-ink)",
    borderRadius: "var(--theme-radius-sm)",
    fontFamily: "var(--theme-font-body)",
  };
  const cls = "w-full px-4 py-3 focus:outline-none focus:ring-2 transition-colors";
  return (
    <label className="block">
      <span
        className="block text-[11px] uppercase tracking-[0.22em] mb-2"
        style={{
          color: "var(--theme-ink-muted)",
          fontFamily: "var(--theme-font-body)",
        }}
      >
        {label}{" "}
        {required && (
          <span style={{ color: "var(--theme-accent)" }}>*</span>
        )}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={5}
          className={`${cls} resize-none`}
          style={fieldStyle}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={cls}
          style={fieldStyle}
        />
      )}
    </label>
  );
}
