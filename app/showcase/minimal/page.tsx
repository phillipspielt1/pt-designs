"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

const works = [
  { title: "Coastal Light", category: "Landscape", seed: "coastal1", aspect: "aspect-[3/4]" },
  { title: "Still Life III", category: "Editorial", seed: "still3", aspect: "aspect-square" },
  { title: "Morning Study", category: "Portrait", seed: "portrait2", aspect: "aspect-[4/3]" },
  { title: "Untitled No. 7", category: "Abstract", seed: "abstract7", aspect: "aspect-[3/4]" },
  { title: "Open Road", category: "Travel", seed: "road1", aspect: "aspect-[16/9]" },
  { title: "Form Study", category: "Fine Art", seed: "fineart2", aspect: "aspect-square" },
];

export default function MinimalShowcase() {
  return (
    <div className="bg-white">
      <ShowcaseNav />

      {/* Fictional Nav */}
      <div className="border-b border-black/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-sm font-medium tracking-widest uppercase text-[#1d1d1f]">Mara Studio</span>
          <nav className="hidden md:flex gap-8 text-xs text-[#6e6e73]">
            {["Work","About","Services","Contact"].map(l=><a key={l} href="#" className="hover:text-[#1d1d1f] transition-colors">{l}</a>)}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-32">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-8">
            Photography & Visual Art
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-light text-[#1d1d1f] tracking-tight leading-none">
            Light.<br />Form.<br />Feeling.
          </motion.h1>
          <motion.div variants={fadeUp} className="mt-12 flex items-end justify-between flex-wrap gap-6">
            <p className="text-base text-[#6e6e73] max-w-xs leading-relaxed">
              Mara Chen is a fine art photographer based in Victoria, BC. Available for editorial, portrait, and commercial work.
            </p>
            <a href="#" className="text-sm text-[#1d1d1f] font-medium border-b border-[#1d1d1f] pb-0.5 hover:text-[#6e6e73] hover:border-[#6e6e73] transition-colors">
              View portfolio →
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Full-bleed hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[60vh] relative overflow-hidden"
      >
        <Image
          src="https://picsum.photos/seed/mara-hero/1600/900"
          alt="Mara Studio hero"
          fill
          className="object-cover"
          unoptimized
        />
      </motion.div>

      {/* Work grid */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-light text-[#1d1d1f] tracking-tight">Selected Work</h2>
            <a href="#" className="text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">View all →</a>
          </motion.div>
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {works.map((w) => (
              <motion.div key={w.title} variants={fadeUp} className="group cursor-pointer">
                <div className={`${w.aspect} relative overflow-hidden rounded-sm`}>
                  <Image
                    src={`https://picsum.photos/seed/${w.seed}/600/600`}
                    alt={w.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end p-4 opacity-0 group-hover:opacity-100">
                    <div>
                      <div className="text-white text-sm font-medium">{w.title}</div>
                      <div className="text-white/70 text-xs">{w.category}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section className="border-t border-black/[0.06] py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-80 rounded-sm overflow-hidden">
              <Image src="https://picsum.photos/seed/mara-portrait/600/800" alt="Mara Chen" fill className="object-cover" unoptimized />
            </div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-6">About</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-light text-[#1d1d1f] leading-snug">
                Guided by light,<br />drawn to quiet moments.
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-6 text-sm text-[#6e6e73] leading-loose">
                Mara has spent over a decade documenting the world with a careful eye and a patient hand.
                Her work has appeared in publications across North America and Europe.
              </motion.p>
              <motion.a variants={fadeUp} href="#" className="inline-block mt-8 text-xs text-[#1d1d1f] border-b border-[#1d1d1f] pb-0.5 hover:text-[#6e6e73] transition-colors">
                Read more
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-[#f9f8f7]">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-10">Services</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.06]">
            {["Editorial","Portrait","Commercial"].map((s) => (
              <div key={s} className="bg-[#f9f8f7] p-8">
                <h3 className="text-lg font-light text-[#1d1d1f] mb-3">{s}</h3>
                <p className="text-xs text-[#6e6e73] leading-loose">
                  Thoughtful, collaborative sessions tailored to your vision and publication needs.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 max-w-5xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#6e6e73] mb-6">Available for projects</p>
        <h2 className="text-4xl md:text-5xl font-light text-[#1d1d1f]">Let&apos;s make something together.</h2>
        <a href="#" className="inline-block mt-10 text-sm text-[#1d1d1f] border border-[#1d1d1f] px-8 py-3 hover:bg-[#1d1d1f] hover:text-white transition-colors">
          Get in touch
        </a>
      </section>

      {/* Spacer for floating buttons */}
      <div className="h-20" />
    </div>
  );
}
