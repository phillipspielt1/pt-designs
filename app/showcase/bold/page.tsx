"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const events = [
  { name: "Noir Gala", date: "May 17", capacity: "250 guests", type: "Corporate" },
  { name: "The Obsidian", date: "Jun 7", capacity: "120 guests", type: "Private" },
  { name: "Velvet Evening", date: "Jun 28", capacity: "80 guests", type: "Intimate" },
];

const packages = [
  { name: "Signature", price: "From $4,800", features: ["Venue styling","Lighting design","6-hr coordination","Vendor management"] },
  { name: "Prestige", price: "From $9,500", features: ["Full signature service","Custom décor","12-hr coordination","Photography liaison","Bar & catering curation"] },
  { name: "Bespoke", price: "On request", features: ["Everything in Prestige","Multi-day events","International planning","White-glove concierge"] },
];

const gallerySeeds = ["event-dark1","event-dark2","event-dark3","event-dark4","event-dark5","event-dark6","event-dark7","event-dark8"];

export default function BoldShowcase() {
  return (
    <div className="bg-[#0a0a0a]">
      <ShowcaseNav />

      {/* Fictional Nav */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d4af37] rounded-sm" />
            <span className="text-white text-sm font-semibold tracking-[0.1em] uppercase">Onyx Events</span>
          </div>
          <nav className="hidden md:flex gap-8 text-xs text-white/50 tracking-widest uppercase">
            {["Events","Packages","Gallery","Contact"].map(l=><a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
          </nav>
          <a href="#" className="text-xs font-semibold border border-[#d4af37] text-[#d4af37] px-4 py-2 hover:bg-[#d4af37] hover:text-black transition-colors tracking-wider uppercase">
            Enquire
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://picsum.photos/seed/luxury-event/1600/900" alt="Luxury event" fill className="object-cover opacity-25" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        </div>
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize:"60px 60px" }} />
        {/* Gold accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-[#d4af37] to-transparent" />

        <div className="max-w-6xl mx-auto w-full px-6 relative">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-8 font-medium">
              Luxury Event Planning · Victoria, BC
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-bold text-white leading-[1.0] tracking-tighter">
              Where moments<br />
              <span className="text-[#d4af37]">become legend.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 text-white/40 text-lg max-w-lg leading-relaxed">
              Onyx Events crafts extraordinary experiences for discerning clients. From intimate gatherings to landmark galas.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-12 flex items-center gap-8">
              <a href="#" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center group-hover:bg-[#d4af37] transition-colors">
                  <ArrowRight size={16} className="text-[#d4af37] group-hover:text-black transition-colors" />
                </div>
                <span className="text-white/80 text-sm tracking-wider uppercase">Begin your event</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute right-6 bottom-12 text-[120px] md:text-[200px] font-bold text-white/[0.02] select-none leading-none pointer-events-none">
          ONYX
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.2em] text-[#d4af37] uppercase mb-2">Upcoming</p>
                <h2 className="text-3xl font-bold text-white">Exclusive Events</h2>
              </div>
              <a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-widest uppercase">View all</a>
            </motion.div>
            <motion.div variants={stagger} className="space-y-3">
              {events.map((e) => (
                <motion.div key={e.name} variants={fadeUp}
                  className="bg-[#111] border border-white/[0.08] p-6 flex items-center justify-between group hover:border-[#d4af37]/40 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-8">
                    <div className="text-[#d4af37] font-mono text-sm w-12">{e.date}</div>
                    <div>
                      <h3 className="text-white font-semibold">{e.name}</h3>
                      <p className="text-white/40 text-xs mt-0.5">{e.type} · {e.capacity}</p>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-white/20 group-hover:text-[#d4af37] transition-colors" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-[#d4af37] uppercase mb-4">Gallery</p>
          <h2 className="text-3xl font-bold text-white mb-10">The Onyx Aesthetic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {gallerySeeds.map((seed, i) => (
              <div key={seed} className={`relative overflow-hidden ${i === 0 ? "row-span-2" : i === 5 ? "row-span-2" : ""}`} style={{ minHeight: "140px" }}>
                <Image
                  src={`https://picsum.photos/seed/${seed}/400/400`}
                  alt="Gallery"
                  fill
                  className="object-cover brightness-75 hover:brightness-90 transition-all duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-6 bg-[#060606] border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.2em] text-[#d4af37] uppercase mb-4">Packages</p>
          <h2 className="text-3xl font-bold text-white mb-12">Crafted for every scale.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((p, i) => (
              <div key={p.name} className={`p-8 border ${i === 1 ? "border-[#d4af37]/50 bg-[#d4af37]/[0.03]" : "border-white/[0.08] bg-[#0f0f0f]"}`}>
                {i === 1 && <div className="text-[10px] tracking-widest uppercase text-[#d4af37] font-bold mb-4">Most Popular</div>}
                <h3 className={`text-xl font-bold mb-1 ${i === 1 ? "text-[#d4af37]" : "text-white"}`}>{p.name}</h3>
                <p className="text-white/40 text-sm mb-6">{p.price}</p>
                <ul className="space-y-2.5 mb-8">
                  {p.features.map(f=>(
                    <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                      <div className="w-1 h-1 bg-[#d4af37] rounded-full flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`block text-center text-xs font-semibold tracking-wider uppercase py-3 transition-colors ${i===1?"bg-[#d4af37] text-black hover:bg-[#c9a020]":"border border-white/20 text-white hover:border-white/40"}`}>
                  Enquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
