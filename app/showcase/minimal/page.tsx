"use client";

// Style: Editorial Minimal — inspired by Annie's Little Valley
// Straight lines, full-bleed photography, zero rounded corners, generous whitespace
// Typography: Cormorant Garamond — elegant light serif

import Image from "next/image";
import { motion } from "framer-motion";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
};
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.12 } } };

const works = [
  { title:"Coastal Light", cat:"Landscape", seed:"mara-coast", w:2, h:3 },
  { title:"Morning Study", cat:"Portrait",  seed:"mara-port1", w:3, h:2 },
  { title:"Still Life III", cat:"Editorial", seed:"mara-still", w:1, h:1 },
  { title:"Open Road",     cat:"Travel",    seed:"mara-road",  w:3, h:2 },
  { title:"Form Study",    cat:"Fine Art",  seed:"mara-form",  w:2, h:3 },
  { title:"Untitled No.7", cat:"Abstract",  seed:"mara-abs7",  w:1, h:1 },
];

export default function MinimalShowcase() {
  return (
    <div className="bg-white" style={{fontFamily:"var(--font-cormorant), Georgia, serif"}}>
      <ShowcaseNav />

      {/* ── Fictional nav ── */}
      <header className="fixed top-10 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16 h-[60px] bg-white/95 backdrop-blur-sm border-b border-black/[0.06]">
        <span className="text-xs tracking-[0.3em] font-medium text-black uppercase">Mara Studio</span>
        <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.15em] text-[#999] uppercase">
          {["Work","About","Services","Contact"].map(l=>(
            <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#" className="text-xs tracking-[0.15em] text-black uppercase border-b border-black pb-px hover:text-[#666] transition-colors">
          Inquire
        </a>
      </header>

      {/* ── Full-screen hero ── */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="https://picsum.photos/seed/mara-hero-main/1800/1200"
          alt="Hero"
          fill
          className="object-cover object-center"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/20"/>
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:1.2, delay:0.4 }}
          className="absolute bottom-16 left-8 md:left-16"
        >
          <p className="text-[10px] tracking-[0.35em] text-white/60 uppercase mb-4">Photography · Victoria, BC</p>
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-light text-white leading-none tracking-[-0.02em]">
            Light.<br/>Form.<br/>Feeling.
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:1, delay:0.9 }}
          className="absolute bottom-16 right-8 md:right-16 text-right"
        >
          <p className="text-xs text-white/60 max-w-[200px] leading-relaxed mb-4">
            Fine art and editorial photographer available for commissioned work.
          </p>
          <a href="#" className="text-xs tracking-[0.2em] text-white uppercase border-b border-white/40 pb-px hover:border-white transition-colors">
            View Portfolio
          </a>
        </motion.div>
      </section>

      {/* ── Introduction ── */}
      <section className="max-w-5xl mx-auto px-8 md:px-16 py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 items-start">
          <motion.div variants={fade}>
            <p className="text-[10px] tracking-[0.3em] text-[#999] uppercase mb-6">About</p>
            <div className="w-8 h-px bg-black mb-6"/>
            <p className="text-[10px] tracking-[0.2em] text-[#999] uppercase leading-loose">
              Mara Chen<br/>Photographer<br/>Victoria, BC
            </p>
          </motion.div>
          <motion.div variants={fade}>
            <h2 className="text-3xl md:text-4xl font-light text-black leading-snug mb-6">
              Guided by light,<br/>drawn to quiet moments.
            </h2>
            <p className="text-base text-[#666] leading-loose mb-6">
              Mara Chen has spent over a decade documenting the world through a careful and patient lens. Her work explores the relationship between light, form, and the spaces in between — producing images that linger long after you've looked away.
            </p>
            <p className="text-base text-[#666] leading-loose">
              Her editorial work has appeared in publications across North America and Europe, including Kinfolk, The New York Times, and National Geographic Traveller.
            </p>
            <a href="#" className="inline-block mt-8 text-xs tracking-[0.2em] text-black uppercase border-b border-black pb-px hover:text-[#666] transition-colors">
              Read More
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Full-bleed divider image ── */}
      <div className="relative h-[50vw] max-h-[600px] overflow-hidden">
        <Image src="https://picsum.photos/seed/mara-wide/1800/800" alt="" fill className="object-cover" unoptimized/>
      </div>

      {/* ── Selected Work ── */}
      <section className="px-8 md:px-16 py-24">
        <div className="flex items-baseline justify-between mb-14">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#999] uppercase mb-2">Selected Work</p>
            <h2 className="text-3xl font-light text-black">Recent Projects</h2>
          </div>
          <a href="#" className="text-xs tracking-[0.15em] text-[#999] uppercase hover:text-black transition-colors">
            View All
          </a>
        </div>
        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {works.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true }}
              transition={{ duration:0.7, delay: i * 0.08 }}
              className={`group relative overflow-hidden cursor-pointer ${i === 0 || i === 4 ? "row-span-2" : ""}`}
              style={{ aspectRatio: i===0||i===4 ? "2/3" : "3/2" }}
            >
              <Image
                src={`https://picsum.photos/seed/${w.seed}/800/800`}
                alt={w.title}
                fill
                className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                <div>
                  <div className="text-white text-sm font-light">{w.title}</div>
                  <div className="text-white/60 text-xs tracking-[0.15em] uppercase mt-1">{w.cat}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="border-t border-black/[0.08] py-24 px-8 md:px-16 bg-[#f9f8f6]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] text-[#999] uppercase mb-12">Services</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-black/[0.08]">
            {[
              { name:"Editorial", desc:"Magazine, book, and publication photography. Thoughtful, composed, and built to endure." },
              { name:"Portrait", desc:"Individual and group portrait sessions. Studio, location, or documentary style." },
              { name:"Commercial", desc:"Product and brand photography that communicates quality and intention." },
            ].map((s) => (
              <div key={s.name} className="border-r border-black/[0.08] px-8 py-6">
                <h3 className="text-xl font-light text-black mb-3">{s.name}</h3>
                <div className="w-6 h-px bg-black/20 mb-4"/>
                <p className="text-sm text-[#888] leading-loose">{s.desc}</p>
                <a href="#" className="inline-block mt-6 text-[10px] tracking-[0.2em] text-black uppercase border-b border-black/40 pb-px hover:border-black transition-colors">
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press ── */}
      <section className="py-16 px-8 md:px-16 border-t border-black/[0.08]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-10">
          <p className="text-[10px] tracking-[0.3em] text-[#999] uppercase flex-shrink-0">As Seen In</p>
          <div className="flex flex-wrap gap-10 items-center">
            {["Kinfolk","The New York Times","Condé Nast Traveller","National Geographic"].map(p=>(
              <span key={p} className="text-[13px] tracking-[0.1em] text-[#ccc] font-light italic">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="border-t border-black/[0.08] py-32 px-8 md:px-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#999] uppercase mb-6">Contact</p>
            <h2 className="text-3xl md:text-4xl font-light text-black leading-snug mb-6">
              Let&apos;s make<br/>something together.
            </h2>
            <p className="text-sm text-[#888] leading-loose mb-8">
              Currently accepting commissions for editorial, portrait, and commercial projects. Response within 48 hours.
            </p>
            <a href="mailto:hello@marastudio.com" className="text-base tracking-[0.05em] text-black border-b border-black pb-0.5 hover:text-[#666] transition-colors">
              hello@marastudio.com
            </a>
          </div>
          <div className="relative h-72 overflow-hidden">
            <Image src="https://picsum.photos/seed/mara-contact/700/600" alt="Studio" fill className="object-cover" unoptimized/>
          </div>
        </div>
      </section>

      {/* Spacer for floating buttons */}
      <div className="h-20"/>
    </div>
  );
}
