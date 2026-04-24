"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, ShoppingBag, User, Zap, Layers, Check, GraduationCap, MapPin, Users, MessageCircle } from "lucide-react";

/* ─── Preview Mockups - real photography + styled layouts ─── */

function MinimalPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-3 py-2 border-b border-black/10 flex-shrink-0">
        <span className="text-[5px] tracking-[0.2em] font-medium text-gray-800 uppercase">Mara Studio</span>
        <div className="flex gap-2">{["Work","About","Contact"].map(l=><span key={l} className="text-[4px] text-gray-400">{l}</span>)}</div>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/mara-hero-main/400/300" alt="" className="w-full h-full object-cover" style={{filter:"brightness(0.72)"}} />
        <div className="absolute bottom-0 left-0 p-3">
          <div className="text-[9px] font-light text-white leading-tight" style={{fontFamily:"Georgia,serif"}}>Light.<br/>Form.<br/>Feeling.</div>
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-px h-7">
        {["mara-coast","mara-port1","mara-road","mara-form"].map(s=>(
          <div key={s} className="flex-1 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${s}/80/80`} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlayfulPreview() {
  return (
    <div className="w-full h-full bg-[#1a3a2a] overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-3 py-2 flex-shrink-0">
        <span className="text-[6px] font-bold text-white tracking-wide" style={{fontFamily:"sans-serif"}}>ZEST CAFÉ</span>
        <div className="bg-[#f5e6c8] text-[#1a3a2a] text-[4px] font-bold px-2 py-0.5 rounded-full">Order →</div>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/zest-hero-main/400/300" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 flex flex-col justify-end p-3">
          <div className="text-[11px] font-bold text-[#f5e6c8] leading-tight" style={{fontFamily:"Georgia,serif"}}>Good coffee.<br/>Good life.</div>
          <div className="text-[4px] text-white/50 mt-1">Nanaimo, BC · Open daily</div>
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-1 p-1.5 bg-[#0f2419]">
        {[["Espresso","$4"],["Matcha","$5"],["Latte","$5"]].map(([n,p])=>(
          <div key={n} className="flex-1 bg-[#1a3a2a] rounded px-1.5 py-1">
            <div className="text-[4.5px] font-bold text-[#f5e6c8]">{n}</div>
            <div className="text-[4px] text-white/40">{p}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfessionalPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-3 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-600 rounded-sm"/>
          <span className="text-[5px] font-bold text-gray-900">Harbour Advisory</span>
        </div>
        <div className="bg-gray-900 text-white text-[4px] px-2 py-0.5 font-semibold rounded">Book a Call</div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-3 flex flex-col justify-center">
          <div className="text-[4px] text-blue-600 font-semibold uppercase tracking-wide mb-1">CFP · CFA Accredited</div>
          <div className="text-[8px] font-bold text-gray-900 leading-tight">Your financial<br/>future, secured.</div>
          <div className="mt-2 flex gap-1 items-center">
            <div className="flex -space-x-0.5">{[0,1,2].map(i=><div key={i} className="w-3 h-3 rounded-full bg-gray-300 border border-white"/>)}</div>
            <span className="text-[3.5px] text-gray-400">1,800+ clients</span>
          </div>
        </div>
        <div className="w-16 relative flex-shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/seed/harbour-hero-p/150/200" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/50"/>
        </div>
      </div>
      <div className="flex-shrink-0 flex bg-gray-50 border-t border-gray-100">
        {[["$2.4B","AUM"],["25yr","Exp"],["1.8k","Clients"]].map(([v,l])=>(
          <div key={l} className="flex-1 text-center py-1.5">
            <div className="text-[6px] font-bold text-gray-900">{v}</div>
            <div className="text-[3.5px] text-gray-400">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoldPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a0a] overflow-hidden flex flex-col relative">
      <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent z-10"/>
      <div className="flex justify-between items-center px-3 py-2 border-b border-white/[0.06] flex-shrink-0 relative z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#d4af37]" style={{clipPath:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"}}/>
          <span className="text-[5px] text-white tracking-[0.12em] uppercase font-light">Onyx Events</span>
        </div>
        <span className="text-[4px] border border-[#d4af37] text-[#d4af37] px-1.5 py-0.5 tracking-wider">Enquire</span>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/onyx-hero-main/400/300" alt="" className="w-full h-full object-cover" style={{filter:"brightness(0.4)"}} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 z-10">
          <div className="text-[5px] tracking-[0.25em] text-[#d4af37] uppercase mb-1.5 font-light">Luxury Events</div>
          <div className="text-[10px] font-light text-white leading-tight" style={{fontFamily:"Georgia,serif"}}>
            Where moments<br/><span className="italic text-[#d4af37]">become legend.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradesPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col">
      <div className="bg-[#f97316] text-white text-[4px] text-center py-0.5 flex-shrink-0 font-bold tracking-wider uppercase">
        24/7 Emergency Service
      </div>
      <div className="flex justify-between items-center px-3 py-1.5 bg-[#1e3a5f] flex-shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-[#f97316] rounded flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[5px] font-bold">⚙</span>
          </div>
          <span className="text-[5px] font-bold text-white">Peak Home Services</span>
        </div>
        <div className="bg-[#f97316] text-white text-[4px] font-bold px-1.5 py-0.5 rounded">Get a Quote</div>
      </div>
      <div className="flex-1 relative overflow-hidden min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://picsum.photos/seed/trades-hero-main/400/300" alt="" className="w-full h-full object-cover" style={{filter:"brightness(0.38)"}} />
        <div className="absolute inset-0 flex flex-col justify-center p-3">
          <div className="text-[8px] font-bold text-white leading-tight">Fast, Reliable<br/>Home Services</div>
          <div className="text-[3.5px] text-white/60 mt-1">Nanaimo, BC · Licensed & Insured</div>
          <div className="mt-2 flex gap-1">
            <div className="bg-[#f97316] text-white text-[3.5px] font-bold px-2 py-0.5 rounded">Free Quote</div>
            <div className="border border-white/60 text-white text-[3.5px] px-2 py-0.5 rounded">Call Now</div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-100 bg-white">
        {[["🔧","Plumbing"],["❄️","HVAC"],["⚡","Electric"],["🚰","Drains"]].map(([icon,label])=>(
          <div key={label} className="flex-1 text-center py-1.5 border-r border-gray-100 last:border-0">
            <div className="text-[7px]">{icon}</div>
            <div className="text-[3px] text-gray-500 font-medium">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EcommercePreview() {
  return (
    <div className="w-full h-full bg-[#faf7f2] overflow-hidden flex flex-col">
      <div className="bg-[#3d2c1e] text-white text-[4px] text-center py-1 flex-shrink-0">Free shipping over $75 · Handmade in BC</div>
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-[#e8ddd0] flex-shrink-0">
        <span className="text-[6px] font-semibold text-[#3d2c1e]" style={{fontFamily:"Georgia,serif"}}>Cedar & Co.</span>
        <div className="flex items-center gap-1.5">
          {["Shop","Story"].map(l=><span key={l} className="text-[4px] text-[#8a7060]">{l}</span>)}
          <div className="w-4 h-4 bg-[#3d2c1e] rounded-full flex items-center justify-center">
            <span className="text-white text-[4px]">2</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-3 flex flex-col justify-center">
          <div className="text-[5px] tracking-widest text-[#8a7060] uppercase mb-1">Handmade · BC</div>
          <div className="text-[8px] font-semibold text-[#3d2c1e] leading-tight" style={{fontFamily:"Georgia,serif"}}>Crafted<br/>with care.</div>
          <div className="mt-2 bg-[#3d2c1e] text-white text-[4px] px-2 py-0.5 rounded inline-block w-fit">Shop Now</div>
        </div>
        <div className="w-20 relative overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://picsum.photos/seed/cedar-hero-main/150/200" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-1 p-1.5 border-t border-[#e8ddd0]">
        {[["cedar-p1","$89"],["cedar-p2","$34"],["cedar-p3","$56"]].map(([s,p])=>(
          <div key={s} className="flex-1 relative overflow-hidden rounded" style={{height:"22px"}}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${s}/60/60`} alt="" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-0 bg-[#faf7f2]/90 text-[#3d2c1e] text-[3.5px] px-1 font-semibold">{p}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────── */
const showcases = [
  { href: "/showcase/minimal",      label: "Minimal",       tag: "Photography · Portfolio",   description: "Editorial space and quiet confidence. Perfect for creatives whose work does the talking.", Preview: MinimalPreview },
  { href: "/showcase/playful",      label: "Playful",        tag: "Café · Food & Drink",       description: "Bold colour and personality. Brands that want to be remembered.", Preview: PlayfulPreview },
  { href: "/showcase/professional", label: "Professional",   tag: "Finance · Consulting",      description: "Structured, trustworthy, polished. Authority in every pixel.", Preview: ProfessionalPreview },
  { href: "/showcase/bold",         label: "Bold & Dark",    tag: "Events · Luxury",           description: "Cinematic and dramatic. For brands that leave a lasting mark.", Preview: BoldPreview },
  { href: "/showcase/ecommerce",    label: "E-Commerce",     tag: "Retail · Artisan Goods",    description: "Warm, story-driven, and built to convert. Products showcased beautifully.", Preview: EcommercePreview },
  { href: "/showcase/trades",       label: "Trades & Services", tag: "Home Services · Local Business", description: "Conversion-first for local trades. Built to get calls, quotes, and bookings.", Preview: TradesPreview },
];

const pricingTiers = [
  {
    name: "Landing Page",
    price: "from $250",
    desc: "A single, high-impact page built to convert - ideal for new businesses, events, or campaigns.",
    features: ["Custom design", "Mobile-first", "Contact form", "Delivered in 1 week"],
  },
  {
    name: "Business Website",
    price: "from $500",
    desc: "A full multi-page site that tells your story, builds trust, and gets you found online.",
    features: ["Up to 5 pages", "SEO-ready", "Photo-optimised", "Delivered in 2 weeks"],
    highlight: true,
  },
  {
    name: "Online Store",
    price: "from $900",
    desc: "A complete e-commerce experience - product pages, cart, checkout, and brand story built in.",
    features: ["Full shop setup", "Product pages", "Payment ready", "Delivered in 3 weeks"],
  },
];

const services = [
  { icon: Globe,       label: "Landing Pages",        desc: "Convert visitors into customers with a focused, high-impact single page." },
  { icon: User,        label: "Portfolios",            desc: "Showcase your work with a site built to impress the right people." },
  { icon: ShoppingBag, label: "Online Stores",         desc: "Sell products with a smooth, beautiful shopping experience." },
  { icon: Zap,         label: "Small Business Sites",  desc: "Everything your business needs online - found, trusted, and chosen." },
  { icon: Layers,      label: "Custom Builds",         desc: "Got something unique in mind? Let's figure it out together." },
];

const marqueeItems = ["Minimal","Playful","Professional","Bold & Dark","E-Commerce","Trades & Services","Responsive","Fast","Modern","Custom","Clean","Strategic"];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

/* ─── Page ─────────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#ece7de]">
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "120px",
        }}/>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 items-center">

            {/* Left */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-[11px] font-medium px-3 py-1.5 rounded-full mb-7">
                <GraduationCap size={12}/>
                Student rates · Professional results
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-[clamp(3rem,7vw,6.5rem)] font-semibold text-[#1a1a1a] leading-[1.02] tracking-[-0.03em]">
                Websites built<br />
                <span className="text-[#999]">to impress.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-7 text-lg text-[#666] max-w-lg leading-relaxed">
                Custom websites for small businesses, portfolios, and online stores - at a fraction of agency prices, without the compromise.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-medium px-6 py-3.5 rounded-full hover:bg-black transition-all hover:gap-3">
                  Get a free quote <ArrowRight size={14} />
                </Link>
                <Link href="#showcase" className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] px-6 py-3.5 rounded-full border border-black/15 hover:bg-white transition-colors">
                  See the work
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-14 flex items-center gap-8">
                {[["5+","Design styles"],["~50%","Less than agencies"],["100%","Custom code"]].map(([v,l])=>(
                  <div key={l}>
                    <div className="text-lg font-semibold text-[#1a1a1a]">{v}</div>
                    <div className="text-xs text-[#999] mt-0.5">{l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Symmetric 3×2 preview grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:grid grid-cols-3 gap-2.5"
              style={{ gridTemplateRows: "138px 138px" }}
            >
              {showcases.map((s) => (
                <Link key={s.href} href={s.href}
                  className="group rounded-xl overflow-hidden border border-black/[0.08] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-full h-full relative">
                    <s.Preview />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <span className="text-white text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-1 rounded-full">
                        {s.label} →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative z-10 bg-[#f5f2ec] -mt-3 rounded-t-[2rem] overflow-hidden border-b border-black/[0.07] shadow-[0_-12px_40px_rgba(0,0,0,0.10)]">
        <div className="py-4 overflow-hidden">
          <div className="animate-marquee">
            {[...marqueeItems,...marqueeItems].map((item,i)=>(
              <span key={i} className="inline-flex items-center gap-5 text-[11px] font-medium tracking-[0.18em] uppercase text-[#aaa] mx-5">
                {item}<span className="w-1 h-1 rounded-full bg-black/20 inline-block"/>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SHOWCASE GRID ── */}
      <section id="showcase" className="bg-white py-24 px-6 border-t border-black/[0.05]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">Design Showcase</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight">Every business is different.</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-base text-[#888] max-w-lg">Five fully built demo sites - each a completely different style. Click any to explore the full layout.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showcases.map((s) => (
              <motion.div key={s.href} variants={fadeUp}>
                <Link href={s.href} className="group block">
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
                    className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-sm hover:shadow-xl transition-shadow duration-400">
                    <div className="h-52 relative overflow-hidden">
                      <s.Preview />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all duration-300 flex items-center justify-center">
                        <span className="bg-white text-[#1a1a1a] text-xs font-semibold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                          View full demo →
                        </span>
                      </div>
                    </div>
                    <div className="p-5 bg-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-[10px] uppercase tracking-widest text-[#999] font-medium">{s.tag}</div>
                          <h3 className="mt-0.5 text-lg font-semibold text-[#1a1a1a]">{s.label}</h3>
                        </div>
                        <div className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-colors">
                          <ArrowRight size={12} className="text-[#999] group-hover:text-white transition-colors"/>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-[#888] leading-relaxed">{s.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING - student value proposition ── */}
      <section className="relative z-10 bg-[#1a1a1a] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-12px_50px_rgba(0,0,0,0.12)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-[11px] font-medium px-3 py-1.5 rounded-full mb-6">
              <GraduationCap size={12}/>
              VIU Student · Vancouver Island, BC
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
              Agency quality.<br/><span className="text-white/40">Student pricing.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-base text-white/50 max-w-lg leading-relaxed">
              Because we&apos;re students, our overhead is near zero - which means we pass those savings directly to you. You get a professional, custom-built website for a fraction of what a studio charges.
            </motion.p>
          </motion.div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl p-7 flex flex-col ${tier.highlight ? "bg-white text-[#1a1a1a]" : "bg-white/[0.06] text-white border border-white/[0.08]"}`}
              >
                <div className={`text-xs font-semibold uppercase tracking-widest mb-1 ${tier.highlight ? "text-[#1a1a1a]" : "text-white/40"}`}>
                  {tier.name}
                </div>
                <div className={`text-3xl font-semibold mt-2 mb-4 ${tier.highlight ? "text-[#1a1a1a]" : "text-white"}`}>
                  {tier.price}
                </div>
                <p className={`text-sm leading-relaxed mb-6 ${tier.highlight ? "text-[#666]" : "text-white/50"}`}>
                  {tier.desc}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${tier.highlight ? "text-[#444]" : "text-white/60"}`}>
                      <Check size={13} className={tier.highlight ? "text-[#1a1a1a]" : "text-white/40"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className={`inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-3 rounded-full transition-all hover:gap-3 ${tier.highlight ? "bg-[#1a1a1a] text-white hover:bg-black" : "bg-white/10 text-white hover:bg-white/20"}`}>
                  Get a quote <ArrowRight size={13}/>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center text-sm text-white/30">
            All prices are starting points. Every project gets a custom quote - no surprises.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="relative z-10 bg-[#ece7de] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.07)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">What We Build</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight">One builder, every need.</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((svc) => (
              <motion.div key={svc.label} variants={fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl p-6 border border-black/[0.06]">
                <div className="w-9 h-9 bg-[#f5f4f2] rounded-xl flex items-center justify-center mb-4">
                  <svc.icon size={16} className="text-[#1a1a1a]"/>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-1">{svc.label}</h3>
                <p className="text-sm text-[#888] leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LOCAL & HONEST ── */}
      <section className="relative z-10 bg-[#f5f4f1] py-20 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">Who We Are</motion.p>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight leading-tight">
                Two people.<br />No nonsense.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-base text-[#666] max-w-xl leading-relaxed">
                We&apos;re a two-person operation based right here in Nanaimo, BC - not an agency, not a faceless online shop. Just two people who genuinely care about the work and the businesses behind it. We keep things straight with you, communicate clearly, and we&apos;re always happy to have a conversation before you commit to anything. No pressure, no pitch - just a chat.
              </motion.p>
            </div>
            <motion.div variants={fadeUp} className="flex flex-col gap-5 lg:min-w-[240px]">
              {[
                { icon: MapPin,         label: "Nanaimo, BC",       sub: "Locally based, locally invested" },
                { icon: Users,          label: "Two-person team",   sub: "You work with us, not past us" },
                { icon: MessageCircle,  label: "Always happy to chat", sub: "Reach out any time - no obligation" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 bg-[#f5f4f2] rounded-xl flex items-center justify-center flex-shrink-0 border border-black/[0.06]">
                    <item.icon size={15} className="text-[#1a1a1a]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1a1a1a]">{item.label}</div>
                    <div className="text-xs text-[#999] mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="relative z-10 bg-white py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.09)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">About Us</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight leading-tight">Young, driven,<br/>built for this.</motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-base text-[#666] leading-relaxed">
              We&apos;re Van Duist &amp; Treitel - two VIU students based in Nanaimo, BC, combining a genuine passion for design with a business-minded approach to every project.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-base text-[#666] leading-relaxed">
              Being students means low overhead and big motivation. Every site we build is crafted to not just look good, but to actually work for your goals.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-col gap-2">
              {["No agency markup - you pay for work, not overhead","Fast turnaround - most projects done in 1–3 weeks","Direct communication - you work with us, not a middleman"].map(pt=>(
                <div key={pt} className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#1a1a1a] mt-0.5 flex-shrink-0"/>
                  <span className="text-sm text-[#555]">{pt}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:gap-3 transition-all">
                Let&apos;s work together <ArrowRight size={14}/>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="rounded-3xl bg-[#1a1a1a] h-80 md:h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-white/[0.04] rounded-full blur-2xl"/>
            <div className="text-center relative z-10">
              <div className="w-20 h-20 rounded-full bg-white/10 border border-white/15 mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">VDT</span>
              </div>
              <div className="text-sm text-white/80 font-medium">Van Duist & Treitel</div>
              <div className="text-xs text-white/40 mt-1">VIU · Nanaimo, BC</div>
              <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-[10px] text-white/30 bg-white/5 px-3 py-1 rounded-full">International Business + Marketing</span>
                <span className="text-[10px] text-white/30 bg-white/5 px-3 py-1 rounded-full">Two-person team · Web Design</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative z-10 bg-[#f7f3ee] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight">Simple process.<br/>Great results.</motion.h2>
          </motion.div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "We chat about your business, goals, and vision. No jargon - just a real conversation about what you need." },
              { step: "02", title: "Design & Build", desc: "We design and build from scratch, checking in regularly. You see progress and can give feedback throughout." },
              { step: "03", title: "Launch", desc: "Your site goes live. We make sure everything runs perfectly and walk you through managing it yourself." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-2xl p-8 border border-black/[0.06]">
                <div className="text-4xl font-semibold text-black/[0.06] mb-5 font-mono">{item.step}</div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-3">{item.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 bg-white py-32 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-[3.5rem] font-semibold text-[#1a1a1a] tracking-tight">
              Ready to get started?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg text-[#888] max-w-md mx-auto">
              Tell us about your project. We&apos;ll reply within 24 hours with a free quote.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-base font-medium px-9 py-4 rounded-full hover:bg-black transition-all hover:gap-3 hover:shadow-2xl">
                Get in touch <ArrowRight size={16}/>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
