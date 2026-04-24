"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const HCAPTCHA_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const STYLE_TO_TYPE: Record<string, string> = {
  minimal:      "Minimal",
  playful:      "Playful",
  professional: "Professional",
  bold:         "Bold & Dark",
  ecommerce:    "E-Commerce / Online Store",
  trades:       "Trades & Services",
};

type Status = "idle" | "sending" | "success" | "error";

function ContactPageInner() {
  const [status, setStatus]             = useState<Status>("idle");
  const [errorMsg, setErrorMsg]         = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const searchParams   = useSearchParams();
  const preselectedType = STYLE_TO_TYPE[searchParams.get("style") ?? ""] ?? "";

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!captchaToken) {
      setErrorMsg("Please complete the captcha first.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name:         (form.elements.namedItem("name")     as HTMLInputElement).value,
      email:        (form.elements.namedItem("email")    as HTMLInputElement).value,
      business:     (form.elements.namedItem("business") as HTMLInputElement).value,
      type:         (form.elements.namedItem("type")     as HTMLSelectElement).value,
      message:      (form.elements.namedItem("message")  as HTMLTextAreaElement).value,
      captchaToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        let errorMessage = "Something went wrong. Please try again.";
        try {
          const json = await res.json();
          errorMessage = json.error || errorMessage;
        } catch { /* non-JSON response, use default message */ }
        setErrorMsg(errorMessage);
        setStatus("error");
        captchaRef.current?.resetCaptcha();
        setCaptchaToken(null);
      }
    } catch {
      setErrorMsg("Could not reach the server. Please try again later.");
      setStatus("error");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-black/10 text-sm text-[#1d1d1f] placeholder:text-[#aaa] focus:outline-none focus:border-[#1d1d1f] transition-colors bg-[#f5f5f7]";

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-36 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

            {/* Left */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
                Contact
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                Let&apos;s build<br />something great.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-[#6e6e73] leading-relaxed">
                Got a project in mind? Not sure where to start? Reach out and
                We&apos;ll get back to you within 24 hours.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 space-y-4">
                <div className="flex items-center gap-3 text-[#6e6e73]">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f7] flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <span className="text-sm">Vancouver Island, BC, Canada</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#1d1d1f]">Message sent!</h2>
                  <p className="text-[#6e6e73] max-w-xs">
                    Thanks - we&apos;ll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm font-medium text-[#1d1d1f] underline underline-offset-4 hover:text-[#6e6e73] transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Name *</label>
                      <input type="text" name="name" placeholder="Your name" required className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Email *</label>
                      <input type="email" name="email" placeholder="your@email.com" required className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Business / Project Name</label>
                    <input type="text" name="business" placeholder="e.g. My Café, My Portfolio..." className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-2">What type of site are you interested in?</label>
                    <select name="type" defaultValue={preselectedType} className={inputClass}>
                      <option value="">Select one...</option>
                      <option>Minimal</option>
                      <option>Playful</option>
                      <option>Professional</option>
                      <option>Bold &amp; Dark</option>
                      <option>E-Commerce / Online Store</option>
                      <option>Trades &amp; Services</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#1d1d1f] mb-2">Tell us about your project *</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="What are you looking to build? Any ideas, inspo, or goals..."
                      required
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* hCaptcha */}
                  <div>
                    <HCaptcha
                      sitekey={HCAPTCHA_SITE_KEY}
                      onVerify={(token) => { setCaptchaToken(token); setStatus("idle"); setErrorMsg(""); }}
                      onExpire={() => setCaptchaToken(null)}
                      ref={captchaRef}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle size={15} />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending" || !captchaToken}
                    className="w-full bg-[#1d1d1f] text-white text-sm font-medium py-3.5 rounded-xl hover:bg-[#3d3d3f] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <><Loader2 size={15} className="animate-spin" /> Sending...</>
                    ) : "Send Message"}
                  </button>
                  <p className="text-xs text-[#6e6e73] text-center">We&apos;ll get back to you within 24 hours.</p>
                </motion.form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageInner />
    </Suspense>
  );
}
