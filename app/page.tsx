"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, ShoppingBag, User, Zap, Layers } from "lucide-react";

/* ─── Tiny CSS preview mockups ────────────────────────────── */

function MinimalPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden text-[0]" style={{ fontFamily: "sans-serif" }}>
      {/* nav */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-black/10">
        <span className="text-[6px] tracking-[0.15em] font-semibold text-gray-800">MARA STUDIO</span>
        <div className="flex gap-1.5">{[0,1,2].map(i=><div key={i} className="w-1 h-1 rounded-full bg-gray-400"/>)}</div>
      </div>
      {/* hero */}
      <div className="px-3 pt-4 pb-2">
        <div className="text-[5px] tracking-widest text-gray-400 mb-1.5">PHOTOGRAPHY</div>
        <div className="text-[14px] font-light text-gray-900 leading-tight">Light.<br/>Form.<br/>Feeling.</div>
      </div>
      {/* grid */}
      <div className="grid grid-cols-3 gap-1 px-3 mt-1">
        {["bg-[#d4d0cb]","bg-[#c8cfc8]","bg-[#d9d4cc]","bg-[#ccccc8]","bg-[#c4c8cc]","bg-[#d0cccc]"].map((c,i)=>(
          <div key={i} className={`${c} rounded-sm`} style={{height: i===0||i===4?"28px":"20px"}}/>
        ))}
      </div>
    </div>
  );
}

function PlayfulPreview() {
  return (
    <div className="w-full h-full bg-[#f97316] overflow-hidden">
      {/* nav */}
      <div className="flex justify-between items-center px-3 py-2">
        <span className="text-[7px] font-black text-white">Zest Café ☀️</span>
        <div className="flex gap-1">{["Menu","About"].map(l=><span key={l} className="text-[5px] text-white/70">{l}</span>)}</div>
      </div>
      {/* hero */}
      <div className="px-3 pt-2">
        <div className="text-[11px] font-black text-white leading-tight">Coffee worth<br/>getting up for ☕</div>
        <div className="flex gap-1.5 mt-2">
          <div className="bg-white text-[5px] font-bold text-orange-500 px-2 py-0.5 rounded-full">See Menu</div>
          <div className="border border-white/50 text-[5px] font-bold text-white px-2 py-0.5 rounded-full">Find Us</div>
        </div>
      </div>
      {/* wave */}
      <svg viewBox="0 0 100 14" className="w-full mt-2 fill-[#faf6f1]">
        <path d="M0,8 C25,14 75,2 100,8 L100,14 L0,14 Z"/>
      </svg>
      {/* cards */}
      <div className="bg-[#faf6f1] px-3 pb-2">
        <div className="grid grid-cols-2 gap-1">
          {[["bg-[#fef3c7]","🥣"],["bg-[#dcfce7]","🍵"]].map(([c,e],i)=>(
            <div key={i} className={`${c} rounded-lg p-1.5`}>
              <div className="text-[8px]">{e}</div>
              <div className="text-[5px] font-bold text-gray-800 mt-0.5">Menu Item</div>
              <div className="text-[4px] text-gray-500">$6.50</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfessionalPreview() {
  return (
    <div className="w-full h-full bg-[#0f2357] overflow-hidden">
      {/* nav */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-white/10">
        <span className="text-[6px] font-semibold text-white tracking-wide">Harbour Advisory</span>
        <div className="flex gap-2">{["Services","Team","Contact"].map(l=><span key={l} className="text-[4.5px] text-white/50">{l}</span>)}</div>
      </div>
      {/* hero */}
      <div className="px-3 pt-3">
        <div className="text-[5px] tracking-widest text-[#c9a84c] font-semibold mb-1.5">TRUSTED SINCE 1998</div>
        <div className="text-[10px] font-bold text-white leading-tight">Your financial future,<br/>built on solid ground.</div>
        <div className="text-[5px] text-white/40 mt-1.5 leading-relaxed">Independent, evidence-based planning for Canadian families.</div>
        <div className="flex gap-1.5 mt-2">
          <div className="bg-[#c9a84c] text-[5px] font-bold text-white px-2 py-0.5">Book Consultation</div>
        </div>
      </div>
      {/* stats */}
      <div className="flex gap-0 mt-3 bg-[#0d1e4a] mx-0 px-3 py-2">
        {[["$2.4B+","AUM"],["1,800+","Clients"],["25yrs","Exp"]].map(([v,l])=>(
          <div key={l} className="flex-1 text-center">
            <div className="text-[7px] font-bold text-[#c9a84c]">{v}</div>
            <div className="text-[4px] text-white/40 mt-0.5">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoldPreview() {
  return (
    <div className="w-full h-full bg-[#060606] overflow-hidden relative"
      style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"16px 16px" }}>
      {/* gold bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"/>
      {/* nav */}
      <div className="flex justify-between items-center px-3 py-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#d4af37] rounded-[1px]"/>
          <span className="text-[5.5px] font-semibold text-white tracking-[0.15em] uppercase">Onyx Events</span>
        </div>
        <div className="flex gap-1.5">{["Events","Gallery"].map(l=><span key={l} className="text-[4px] text-white/40 tracking-widest uppercase">{l}</span>)}</div>
      </div>
      {/* hero */}
      <div className="px-3 pt-4">
        <div className="text-[5px] tracking-[0.2em] text-[#d4af37] uppercase mb-1.5">Luxury Event Planning</div>
        <div className="text-[11px] font-bold text-white leading-tight">Where moments</div>
        <div className="text-[11px] font-bold text-[#d4af37] leading-tight">become legend.</div>
        <div className="mt-3 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full border border-[#d4af37] flex items-center justify-center">
            <div className="w-1.5 h-1.5 border-r border-t border-[#d4af37] rotate-45 -translate-x-[1px]"/>
          </div>
          <span className="text-[5px] text-white/60 tracking-widest uppercase">Begin your event</span>
        </div>
      </div>
      {/* watermark */}
      <div className="absolute bottom-2 right-2 text-[22px] font-bold text-white/[0.03] leading-none select-none">ONYX</div>
    </div>
  );
}

function EcommercePreview() {
  return (
    <div className="w-full h-full bg-[#faf6f1] overflow-hidden">
      {/* announcement */}
      <div className="bg-[#92400e] text-white text-[4.5px] text-center py-1 font-medium">
        Free shipping over $75 · Handmade in BC 🌲
      </div>
      {/* nav */}
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-[#e8ddd0]">
        <span className="text-[7px] font-semibold text-[#3d2c1e] tracking-tight">Cedar & Co.</span>
        <div className="flex items-center gap-2">
          {["Shop","Story"].map(l=><span key={l} className="text-[4.5px] text-[#8a7060]">{l}</span>)}
          <div className="relative">
            <div className="w-3 h-3 text-[#3d2c1e]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#92400e] rounded-full flex items-center justify-center">
              <span className="text-[3px] text-white font-bold">2</span>
            </div>
          </div>
        </div>
      </div>
      {/* hero */}
      <div className="px-3 pt-2">
        <div className="text-[5px] tracking-widest text-[#8a7060] mb-1 uppercase">Handmade · BC Made</div>
        <div className="text-[10px] font-semibold text-[#3d2c1e] leading-tight">Crafted with care.<br/>Made to last.</div>
      </div>
      {/* products */}
      <div className="grid grid-cols-3 gap-1 px-3 mt-2">
        {[["bg-[#e8ddd0]","🧵","$89"],["bg-[#dce8d8]","🌿","$18"],["bg-[#f0e8d0]","🕯️","$42"]].map(([c,e,p],i)=>(
          <div key={i} className={`${c} rounded-lg p-1.5`}>
            <div className="text-[9px] text-center">{e}</div>
            <div className="text-[4.5px] font-semibold text-[#3d2c1e] mt-0.5 truncate">Item {i+1}</div>
            <div className="text-[4px] text-[#8a7060]">{p}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────── */

const showcases = [
  {
    href: "/showcase/minimal",
    label: "Minimal",
    tag: "Photography · Portfolio",
    description: "Clean lines and breathable space. Perfect for creatives who want their work to speak.",
    Preview: MinimalPreview,
    dark: false,
    cardBg: "bg-white",
    cardBorder: "border-black/10",
  },
  {
    href: "/showcase/playful",
    label: "Playful",
    tag: "Café · Food & Drink",
    description: "Bold colours and big personality. Great for brands that want energy and fun.",
    Preview: PlayfulPreview,
    dark: false,
    cardBg: "bg-[#fff7ed]",
    cardBorder: "border-orange-200",
  },
  {
    href: "/showcase/professional",
    label: "Professional",
    tag: "Finance · Consulting",
    description: "Structured, trustworthy, polished. For businesses that need to project authority.",
    Preview: ProfessionalPreview,
    dark: false,
    cardBg: "bg-[#f0f4ff]",
    cardBorder: "border-blue-200",
  },
  {
    href: "/showcase/bold",
    label: "Bold & Dark",
    tag: "Events · Luxury",
    description: "Cinematic contrast and dramatic presence. For brands that leave a mark.",
    Preview: BoldPreview,
    dark: true,
    cardBg: "bg-[#0a0a0a]",
    cardBorder: "border-white/10",
  },
  {
    href: "/showcase/ecommerce",
    label: "E-Commerce",
    tag: "Retail · Artisan Goods",
    description: "Warm, inviting, and conversion-focused. Showcases products beautifully.",
    Preview: EcommercePreview,
    dark: false,
    cardBg: "bg-[#faf6f1]",
    cardBorder: "border-amber-200",
  },
];

const services = [
  { icon: Globe, label: "Landing Pages", desc: "Single-page sites that convert visitors into customers." },
  { icon: User, label: "Portfolios", desc: "Showcase your work with a site that gets you noticed." },
  { icon: ShoppingBag, label: "Online Stores", desc: "Sell products online with a smooth shopping experience." },
  { icon: Zap, label: "Small Business Sites", desc: "Multi-page sites with everything your business needs." },
  { icon: Layers, label: "Custom Builds", desc: "Have something unique in mind? Let's figure it out together." },
];

const marqueeItems = ["Minimal", "Playful", "Professional", "Bold & Dark", "E-Commerce", "Responsive", "Fast", "Modern", "Custom"];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ─── Component ───────────────────────────────────────────── */

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -160]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.88]);

  return (
    <div>
      {/* ── HERO ── dark, cinematic */}
      <section ref={heroRef} className="relative min-h-screen bg-[#060606] flex items-center overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="blob absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-violet-600/[0.12] rounded-full blur-3xl pointer-events-none" />
        <div className="blob blob-delay-2 absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/[0.09] rounded-full blur-3xl pointer-events-none" />
        <div className="blob blob-delay-4 absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-indigo-400/[0.07] rounded-full blur-3xl pointer-events-none" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Parallax content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-20 pb-32"
        >
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p
              variants={fadeUp}
              className="text-xs font-medium text-white/40 mb-8 tracking-[0.2em] uppercase"
            >
              Web Design · Vancouver Island, BC
            </motion.p>

            {/* Word-split headline */}
            <motion.h1
              variants={stagger}
              className="text-5xl md:text-7xl lg:text-[90px] font-semibold text-white leading-[1.0] tracking-tight overflow-hidden"
            >
              {"Websites that".split(" ").map((word, i) => (
                <motion.span key={i} variants={fadeUp} className="inline-block mr-[0.25em]">
                  {word}
                </motion.span>
              ))}
              <br />
              {"mean business.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  className={`inline-block mr-[0.25em] ${word === "business." ? "text-white/30" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
            >
              Custom websites for small businesses, portfolios, and online stores — built to look great and get results.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#1d1d1f] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-white/90 transition-all hover:gap-3"
              >
                Get a free quote <ArrowRight size={15} />
              </Link>
              <Link
                href="#showcase"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/60 px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 hover:text-white transition-all"
              >
                See my work
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── MARQUEE ── slides over hero */}
      <div className="relative z-10 -mt-6 bg-white rounded-t-[2.5rem] overflow-hidden border-b border-black/[0.06] shadow-[0_-24px_80px_rgba(0,0,0,0.4)]">
        <div className="py-5 overflow-hidden">
          <div className="animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-6 text-xs font-medium tracking-[0.2em] uppercase text-[#6e6e73] mx-6">
                {item}
                <span className="w-1 h-1 rounded-full bg-[#d4af37] inline-block" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SHOWCASE ── */}
      <section id="showcase" className="bg-white py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
              Design Showcase
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              Every business is different.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg text-[#6e6e73] max-w-xl">
              Five fully built demo sites — each showing a completely different design direction. Click any to explore the full layout.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {showcases.map((s) => (
              <motion.div key={s.href} variants={fadeUp}>
                <Link href={s.href} className="group block">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.01 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`rounded-3xl ${s.cardBg} border ${s.cardBorder} overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500`}
                  >
                    {/* CSS Preview mockup — looks like a real screenshot */}
                    <div className="relative h-48 overflow-hidden border-b border-black/[0.06]">
                      <s.Preview />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="bg-white text-[#1d1d1f] text-xs font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                        >
                          View full demo →
                        </motion.div>
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className={`text-[10px] font-medium uppercase tracking-widest ${s.dark ? "text-white/40" : "text-[#6e6e73]"}`}>
                            {s.tag}
                          </span>
                          <h3 className={`mt-0.5 text-xl font-semibold tracking-tight ${s.dark ? "text-white" : "text-[#1d1d1f]"}`}>
                            {s.label}
                          </h3>
                        </div>
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${s.dark ? "border-white/20 text-white/60" : "border-black/15 text-[#1d1d1f]"}`}>
                          <ArrowRight size={13} />
                        </div>
                      </div>
                      <p className={`text-sm leading-relaxed ${s.dark ? "text-white/50" : "text-[#6e6e73]"}`}>
                        {s.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── slides over showcase */}
      <section className="relative z-10 bg-[#f5f5f7] py-28 px-6 rounded-t-[2.5rem] -mt-4 shadow-[0_-16px_60px_rgba(0,0,0,0.07)]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
              What I Build
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight">
              One builder, every need.
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {services.map((svc) => (
              <motion.div
                key={svc.label}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-6 border border-black/[0.06] shadow-sm"
              >
                <div className="w-10 h-10 bg-[#f5f5f7] rounded-xl flex items-center justify-center mb-4">
                  <svc.icon size={18} className="text-[#1d1d1f]" />
                </div>
                <h3 className="font-semibold text-[#1d1d1f] mb-1">{svc.label}</h3>
                <p className="text-sm text-[#6e6e73] leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative z-10 bg-white py-28 px-6 rounded-t-[2.5rem] -mt-4 shadow-[0_-16px_60px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#6e6e73] font-medium mb-4">
                About Me
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] tracking-tight leading-tight">
                Young, driven,<br />built for this.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-[#6e6e73] leading-relaxed">
                I&apos;m Phillip Treitel — a student at VIU studying International Business and Marketing,
                and a varsity volleyball player on Vancouver Island.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-4 text-lg text-[#6e6e73] leading-relaxed">
                I combine a genuine passion for design with a business-minded approach. Every site I build
                is crafted to not just look good — but to actually work for your goals.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1d1d1f] hover:gap-3 transition-all"
                >
                  Let&apos;s work together <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-3xl bg-[#060606] h-80 md:h-96 flex items-center justify-center overflow-hidden relative">
                {/* Background blobs */}
                <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-violet-600/20 rounded-full blur-2xl" />
                <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-blue-500/15 rounded-full blur-2xl" />
                <div className="relative text-center z-10">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-xl font-semibold">PT</span>
                  </div>
                  <div className="text-sm text-white/80 font-medium">Phillip Treitel</div>
                  <div className="text-xs text-white/40 mt-1">VIU · Vancouver Island, BC</div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="text-[10px] text-white/30 bg-white/5 px-3 py-1 rounded-full">International Business</span>
                    <span className="text-[10px] text-white/30 bg-white/5 px-3 py-1 rounded-full">Marketing</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── dark, sticky-feel */}
      <section className="relative z-10 bg-[#060606] py-28 px-6 rounded-t-[2.5rem] -mt-4 shadow-[0_-16px_60px_rgba(0,0,0,0.3)]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-white/30 font-medium mb-4">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Simple process.<br />Great results.
            </motion.h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              { step: "01", title: "Discovery", desc: "We chat about your business, goals, and what you need. No jargon, no pressure — just a real conversation." },
              { step: "02", title: "Design & Build", desc: "I design and build your site from scratch, sending you updates along the way. You stay in the loop." },
              { step: "03", title: "Launch", desc: "Your site goes live. I make sure everything works perfectly and you know how to manage it." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#060606] p-10"
              >
                <div className="text-6xl font-semibold text-white/[0.06] mb-5 font-mono">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 bg-white py-32 px-6 rounded-t-[2.5rem] -mt-4 shadow-[0_-16px_60px_rgba(0,0,0,0.05)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight">
              Ready to get started?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-xl text-[#6e6e73] max-w-md mx-auto">
              Tell me about your project. I&apos;ll get back within 24 hours with ideas and a quote.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white text-base font-semibold px-8 py-4 rounded-full hover:bg-[#3d3d3f] transition-all hover:gap-3 hover:shadow-xl"
              >
                Get in touch <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
