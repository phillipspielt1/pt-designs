"use client";

// Style: Luxury Dark Editorial — inspired by Soho House / luxury fashion brands
// Full-bleed editorial photography, elegant Cormorant serif,
// maximum restraint, gold accents used sparingly, generous whitespace
// Feels like a high-end magazine editorial

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fade = {
  hidden:{ opacity:0, y:20 },
  show:{ opacity:1, y:0, transition:{ duration:0.9, ease:[0.22,1,0.36,1] as [number,number,number,number] } },
};
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.15 } } };

const events = [
  { name:"The Obsidian Gala", type:"Corporate",     guests:"320", season:"Spring 2025", seed:"onyx-ev1" },
  { name:"Velvet Evenings",   type:"Private Dinner", guests:"40",  season:"Summer 2025", seed:"onyx-ev2" },
  { name:"Noir Collective",   type:"Cultural",      guests:"180", season:"Autumn 2025", seed:"onyx-ev3" },
];

export default function BoldShowcase() {
  return (
    <div className="bg-[#0a0a0a]" style={{fontFamily:"var(--font-cormorant), Georgia, serif"}}>
      <ShowcaseNav />

      {/* ── Fictional nav ── */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center px-8 md:px-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-[#d4af37]" style={{clipPath:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"}}>
              <div className="w-full h-full bg-[#d4af37]" style={{clipPath:"polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"}}/>
            </div>
            <span className="text-sm tracking-[0.25em] uppercase text-white font-light">Onyx Events</span>
          </div>
          <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.2em] uppercase text-white/40">
            {["Work","About","Enquire","Journal"].map(l=>(
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </nav>
          <a href="#" className="text-[11px] tracking-[0.2em] uppercase text-[#d4af37] border border-[#d4af37] px-4 py-2 hover:bg-[#d4af37] hover:text-black transition-colors">
            Private Enquiry
          </a>
        </div>
      </header>

      {/* ── Full-screen editorial hero ── */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="https://picsum.photos/seed/onyx-hero-main/1800/1200"
          alt="Onyx Events"
          fill
          className="object-cover object-center brightness-50"
          unoptimized
          priority
        />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"80px 80px"}}/>
        {/* Gold side accent */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37] to-transparent opacity-60"/>

        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:1.4, delay:0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37] mb-8 font-light">
            Luxury Event Planning · Victoria, BC
          </p>
          <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-light text-white leading-[1.0] tracking-[-0.02em]">
            Where moments
            <br />
            <span className="italic text-[#d4af37]">become legend.</span>
          </h1>
          <div className="mt-10 w-px h-16 bg-white/20 mx-auto"/>
          <a href="#" className="mt-6 flex items-center gap-3 group">
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/50 group-hover:text-white transition-colors">
              Begin your event
            </span>
            <div className="w-8 h-8 rounded-full border border-[#d4af37]/50 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-all">
              <ArrowRight size={13} className="text-[#d4af37] group-hover:text-black transition-colors"/>
            </div>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.6, repeat:Infinity }}
            className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"/>
        </div>
      </section>

      {/* ── Introduction — editorial two-column ── */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-20 items-start">
          <motion.div variants={fade}>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] mb-6 font-light">About</p>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-[1.1]">
              Crafted for those<br />who expect nothing less.
            </h2>
            <div className="mt-8 w-12 h-px bg-[#d4af37]"/>
          </motion.div>
          <motion.div variants={fade} className="pt-2">
            <p className="text-base text-white/50 leading-loose mb-6">
              Onyx Events was founded on a single principle: that a truly extraordinary event leaves no room for compromise. From the first conversation to the final curtain, every detail is considered, refined, and executed with precision.
            </p>
            <p className="text-base text-white/50 leading-loose mb-10">
              We work with a select number of clients each year — corporations, private individuals, cultural institutions — who share our commitment to the exceptional.
            </p>
            <div className="grid grid-cols-3 gap-6 border-t border-white/[0.08] pt-8">
              {[["15+","Years Experience"],["400+","Events Delivered"],["6","Countries"]].map(([v,l])=>(
                <div key={l}>
                  <div className="text-2xl font-light text-white">{v}</div>
                  <div className="text-xs text-white/30 mt-1 tracking-wide">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Full-bleed divider ── */}
      <div className="relative h-[55vw] max-h-[700px] overflow-hidden">
        <Image src="https://picsum.photos/seed/onyx-wide/1800/900" alt="" fill className="object-cover brightness-60" unoptimized/>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-60"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <blockquote className="text-center max-w-2xl px-8">
            <p className="text-2xl md:text-3xl font-light text-white/90 italic leading-relaxed">
              &ldquo;The measure of an extraordinary event is not what you remember — it&apos;s what you feel.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      {/* ── Recent Events ── */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}>
          <motion.div variants={fade} className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] mb-4 font-light">Portfolio</p>
              <h2 className="text-4xl font-light text-white">Recent Work</h2>
            </div>
            <a href="#" className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors">
              View All <ArrowUpRight size={13}/>
            </a>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((e) => (
              <motion.div key={e.name} variants={fade} className="group cursor-pointer">
                <div className="relative h-72 overflow-hidden">
                  <Image src={`https://picsum.photos/seed/${e.seed}/700/800`} alt={e.name} fill
                    className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-105 transition-all duration-700"
                    unoptimized/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent"/>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] mb-2">{e.type} · {e.season}</div>
                    <h3 className="text-xl font-light text-white">{e.name}</h3>
                    <div className="text-white/40 text-xs mt-1">{e.guests} guests</div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={13} className="text-white"/>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Services — editorial list ── */}
      <section className="border-t border-white/[0.06] py-32 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37] mb-16 font-light">Services</p>
          <div className="space-y-0">
            {[
              { n:"01", title:"Corporate Events", desc:"Annual galas, product launches, leadership summits, and client entertainment. Executed with precision and discretion." },
              { n:"02", title:"Private Gatherings", desc:"Intimate dinner parties, milestone celebrations, and curated social events for up to 200 guests." },
              { n:"03", title:"Cultural Events", desc:"Gallery openings, charity auctions, artistic performances, and institutional evenings." },
              { n:"04", title:"International Planning", desc:"Events across Canada, the US, and Europe. Full logistical support and local network in major cities." },
            ].map((s) => (
              <div key={s.n} className="group flex items-start gap-12 border-b border-white/[0.06] py-10 cursor-pointer hover:pl-4 transition-all duration-300">
                <span className="text-xs text-[#d4af37] font-light w-6 flex-shrink-0 mt-1">{s.n}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-light text-white group-hover:text-[#d4af37] transition-colors">{s.title}</h3>
                  <p className="text-sm text-white/40 mt-2 leading-relaxed max-w-lg">{s.desc}</p>
                </div>
                <ArrowUpRight size={16} className="text-white/20 group-hover:text-[#d4af37] transition-colors flex-shrink-0 mt-1"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-bleed closing image ── */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image src="https://picsum.photos/seed/onyx-close/1800/1000" alt="" fill className="object-cover brightness-40" unoptimized/>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-6 font-light">We accept a limited number of commissions per year</p>
          <h2 className="text-4xl md:text-6xl font-light text-white mb-10">Begin the conversation.</h2>
          <a href="#" className="inline-flex items-center gap-3 border border-[#d4af37] text-[#d4af37] text-[11px] tracking-[0.25em] uppercase px-8 py-4 hover:bg-[#d4af37] hover:text-black transition-colors">
            Private Enquiry <ArrowRight size={13}/>
          </a>
          <p className="mt-6 text-white/20 text-xs tracking-widest uppercase">Onyx Events · Victoria, BC · hello@onyxevents.ca</p>
        </div>
      </section>

      <div className="h-20"/>
    </div>
  );
}
