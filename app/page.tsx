"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, ShoppingBag, User, Zap, Layers } from "lucide-react";

/* ─── CSS Preview Mockups (same as before) ─────────────── */
function MinimalPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-black/10">
        <span className="text-[5px] tracking-[0.15em] font-medium text-gray-800 uppercase">Mara Studio</span>
        <div className="flex gap-1">{[0,1,2].map(i=><div key={i} className="w-1 h-1 rounded-full bg-gray-300"/>)}</div>
      </div>
      <div className="relative h-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#d4d0cb]"/>
        <div className="absolute bottom-3 left-3">
          <div className="text-[11px] font-light text-white leading-tight" style={{fontFamily:"Georgia,serif"}}>Light.<br/>Form.</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0.5 p-1.5">
        {["bg-[#d4d0cb]","bg-[#c8cfc8]","bg-[#d9d4cc]","bg-[#ccccc8]","bg-[#c4c8cc]","bg-[#d0cccc]"].map((c,i)=>(
          <div key={i} className={`${c}`} style={{height:i%3===0?"28px":"20px"}}/>
        ))}
      </div>
    </div>
  );
}

function PlayfulPreview() {
  return (
    <div className="w-full h-full bg-[#1a3a2a] overflow-hidden">
      <div className="flex justify-between items-center px-3 py-1.5">
        <span className="text-[6px] font-bold text-white" style={{fontFamily:"Georgia,serif"}}>Zest Café</span>
        <div className="flex gap-1.5">{["Menu","Visit"].map(l=><span key={l} className="text-[4px] text-white/60">{l}</span>)}</div>
      </div>
      <div className="px-3 pt-1">
        <div className="text-[10px] font-bold text-[#f5e6c8] leading-tight" style={{fontFamily:"Georgia,serif"}}>Good coffee.<br/>Good life.</div>
        <div className="mt-2 inline-block bg-[#f5e6c8] text-[#1a3a2a] text-[4.5px] font-bold px-2 py-0.5 rounded-full">Order now</div>
      </div>
      <div className="mx-3 mt-2 grid grid-cols-2 gap-1">
        {["bg-[#c8d8c0]","bg-[#e8d8b0]"].map((c,i)=>(
          <div key={i} className={`${c} h-10 rounded flex items-end p-1`}>
            <div className="text-[4px] font-bold text-[#1a3a2a]">Item {i+1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfessionalPreview() {
  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-gray-100">
        <span className="text-[5.5px] font-semibold text-gray-900 tracking-wide">Harbour Advisory</span>
        <div className="flex gap-1.5">{["Services","Team"].map(l=><span key={l} className="text-[4px] text-gray-400">{l}</span>)}</div>
      </div>
      <div className="px-3 pt-3 pb-2">
        <div className="text-[5px] text-blue-600 font-semibold tracking-wide uppercase mb-1">Trusted Since 1998</div>
        <div className="text-[9px] font-bold text-gray-900 leading-tight">Your financial future,<br/>built on solid ground.</div>
        <div className="mt-2 flex gap-1">
          <div className="bg-gray-900 text-white text-[4px] px-2 py-0.5 font-semibold">Book a Call</div>
          <div className="border border-gray-300 text-gray-600 text-[4px] px-2 py-0.5">Services</div>
        </div>
      </div>
      <div className="flex bg-gray-50 border-t border-gray-100">
        {[["$2.4B","AUM"],["1.8k","Clients"],["25yr","Exp"]].map(([v,l])=>(
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
    <div className="w-full h-full bg-[#080808] overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"16px 16px"}}/>
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"/>
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-white/[0.06] relative">
        <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#d4af37]"/><span className="text-[5px] text-white font-semibold tracking-widest uppercase">Onyx Events</span></div>
        <span className="text-[4px] border border-[#d4af37] text-[#d4af37] px-1.5 py-0.5 tracking-wider uppercase">Enquire</span>
      </div>
      <div className="px-3 pt-3 relative">
        <div className="text-[5px] tracking-widest text-[#d4af37] uppercase mb-1.5">Luxury Events</div>
        <div className="text-[10px] font-bold text-white leading-tight" style={{fontFamily:"Georgia,serif"}}>Where moments</div>
        <div className="text-[10px] font-bold text-[#d4af37] leading-tight" style={{fontFamily:"Georgia,serif"}}>become legend.</div>
      </div>
      <div className="absolute right-2 bottom-1 text-[20px] font-bold text-white/[0.03] select-none">ONYX</div>
    </div>
  );
}

function EcommercePreview() {
  return (
    <div className="w-full h-full bg-[#faf7f2] overflow-hidden">
      <div className="bg-[#7c5c3a] text-white text-[4px] text-center py-1">Free shipping over $75 · Handmade in BC</div>
      <div className="flex justify-between items-center px-3 py-1.5 border-b border-[#e8ddd0]">
        <span className="text-[6px] font-semibold text-[#3d2c1e]" style={{fontFamily:"Georgia,serif"}}>Cedar & Co.</span>
        <div className="flex gap-1.5">{["Shop","Story"].map(l=><span key={l} className="text-[4px] text-[#8a7060]">{l}</span>)}</div>
      </div>
      <div className="px-3 pt-2">
        <div className="text-[5px] tracking-widest text-[#8a7060] uppercase mb-1">Handmade · BC</div>
        <div className="text-[9px] font-semibold text-[#3d2c1e] leading-tight" style={{fontFamily:"Georgia,serif"}}>Crafted with care.<br/>Made to last.</div>
      </div>
      <div className="grid grid-cols-3 gap-1 px-3 mt-2">
        {[["bg-[#e8ddd0]","🧵"],["bg-[#dce8d8]","🌿"],["bg-[#f0e8d0]","🕯️"]].map(([c,e],i)=>(
          <div key={i} className={`${c} rounded h-10 flex flex-col items-center justify-center`}>
            <span className="text-[8px]">{e}</span>
            <span className="text-[3.5px] text-[#8a7060] mt-0.5">${[89,18,42][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Data ─────────────────────────────────────────────── */
const showcases = [
  { href: "/showcase/minimal", label: "Minimal", tag: "Photography · Portfolio", description: "Editorial space and quiet confidence. Perfect for creatives whose work does the talking.", Preview: MinimalPreview },
  { href: "/showcase/playful", label: "Playful", tag: "Café · Food & Drink", description: "Bold colour and personality. Brands that want to be remembered.", Preview: PlayfulPreview },
  { href: "/showcase/professional", label: "Professional", tag: "Finance · Consulting", description: "Structured, trustworthy, polished. Authority in every pixel.", Preview: ProfessionalPreview },
  { href: "/showcase/bold", label: "Bold & Dark", tag: "Events · Luxury", description: "Cinematic and dramatic. For brands that leave a lasting mark.", Preview: BoldPreview },
  { href: "/showcase/ecommerce", label: "E-Commerce", tag: "Retail · Artisan Goods", description: "Warm, story-driven, and built to convert. Products showcased beautifully.", Preview: EcommercePreview },
];

const services = [
  { icon: Globe, label: "Landing Pages", desc: "Convert visitors into customers with a focused, high-impact single page." },
  { icon: User, label: "Portfolios", desc: "Showcase your work with a site built to impress the right people." },
  { icon: ShoppingBag, label: "Online Stores", desc: "Sell products with a smooth, beautiful shopping experience." },
  { icon: Zap, label: "Small Business Sites", desc: "Everything your business needs online — found, trusted, and chosen." },
  { icon: Layers, label: "Custom Builds", desc: "Got something unique in mind? Let's figure it out together." },
];

const marqueeItems = ["Minimal","Playful","Professional","Bold & Dark","E-Commerce","Responsive","Fast","Modern","Custom","Clean","Strategic"];

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

      {/* ── HERO — clean white editorial ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#faf9f7]">
        {/* Very subtle warm grain */}
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "120px",
        }}/>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 items-center">

            {/* Left: Text */}
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.22em] text-[#999] font-medium mb-7">
                Vancouver Island, BC — Web Design
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-[clamp(3rem,7vw,6.5rem)] font-semibold text-[#1a1a1a] leading-[1.02] tracking-[-0.03em]">
                Websites built<br />
                <span className="text-[#999]">to impress.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-7 text-lg text-[#666] max-w-lg leading-relaxed">
                Custom websites for small businesses, portfolios, and online stores — designed to look great and get results.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-sm font-medium px-6 py-3.5 rounded-full hover:bg-black transition-all hover:gap-3">
                  Get a free quote <ArrowRight size={14} />
                </Link>
                <Link href="#showcase" className="inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] px-6 py-3.5 rounded-full border border-black/15 hover:bg-white transition-colors">
                  See the work
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-14 flex items-center gap-6">
                {[["5+","Design Styles"],["BC","Based"],["100%","Custom"]].map(([v,l])=>(
                  <div key={l}>
                    <div className="text-lg font-semibold text-[#1a1a1a]">{v}</div>
                    <div className="text-xs text-[#999] mt-0.5">{l}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Collage of 5 showcase previews */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              {showcases.map((s, i) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className={`group rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${i === 4 ? "col-span-2" : ""}`}
                  style={{ height: i === 4 ? "72px" : "130px" }}
                >
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

      {/* ── MARQUEE — slides over hero ── */}
      <div className="relative z-10 bg-white -mt-3 rounded-t-[2rem] overflow-hidden border-b border-black/[0.06] shadow-[0_-12px_40px_rgba(0,0,0,0.08)]">
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
      <section id="showcase" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">Design Showcase</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight">Every business is different.</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-base text-[#888] max-w-lg">Five fully built demo sites — each a completely different style. Click any to explore the full layout.</motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showcases.map((s) => (
              <motion.div key={s.href} variants={fadeUp}>
                <Link href={s.href} className="group block">
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
                    className="rounded-2xl overflow-hidden border border-black/[0.07] shadow-sm hover:shadow-xl transition-shadow duration-400">
                    <div className="h-44 relative overflow-hidden">
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

      {/* ── SERVICES — slides over ── */}
      <section className="relative z-10 bg-[#f5f4f2] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">What I Build</motion.p>
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

      {/* ── ABOUT ── */}
      <section className="relative z-10 bg-white py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-[#999] font-medium mb-3">About Me</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] tracking-tight leading-tight">Young, driven,<br/>built for this.</motion.h2>
            <motion.p variants={fadeUp} className="mt-6 text-base text-[#666] leading-relaxed">
              I&apos;m Phillip Treitel — a student at VIU studying International Business and Marketing, and a varsity volleyball player on Vancouver Island.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-base text-[#666] leading-relaxed">
              I combine a genuine passion for design with a business-minded approach. Every site I build is crafted to not just look good — but to actually work for your goals.
            </motion.p>
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
                <span className="text-white text-xl font-semibold">PT</span>
              </div>
              <div className="text-sm text-white/80 font-medium">Phillip Treitel</div>
              <div className="text-xs text-white/40 mt-1">VIU · Vancouver Island, BC</div>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="text-[10px] text-white/30 bg-white/5 px-3 py-1 rounded-full">International Business</span>
                <span className="text-[10px] text-white/30 bg-white/5 px-3 py-1 rounded-full">Marketing</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS — dark ── */}
      <section className="relative z-10 bg-[#1a1a1a] py-24 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-12px_50px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.22em] text-white/30 font-medium mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-semibold text-white tracking-tight">Simple process.<br/>Great results.</motion.h2>
          </motion.div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
            {[
              { step: "01", title: "Discovery", desc: "We chat about your business, goals, and vision. No jargon — just a real conversation about what you need." },
              { step: "02", title: "Design & Build", desc: "I design and build from scratch, checking in regularly. You see progress and can give feedback throughout." },
              { step: "03", title: "Launch", desc: "Your site goes live. I make sure everything runs perfectly and walk you through managing it yourself." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-[#1a1a1a] p-10">
                <div className="text-5xl font-semibold text-white/[0.06] mb-5 font-mono">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 bg-white py-32 px-6 rounded-t-[2rem] -mt-3 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-[3.5rem] font-semibold text-[#1a1a1a] tracking-tight">
              Ready to get started?
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg text-[#888] max-w-md mx-auto">
              Tell me about your project. I&apos;ll reply within 24 hours.
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
