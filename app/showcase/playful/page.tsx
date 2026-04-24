"use client";

// Style: Bold Playful - Inspired by Blank Street Coffee / Joe & The Juice
// Deep forest green + cream, display serif headlines, asymmetric layouts,
// large overlapping photo elements, full personality
// Typography: Syne (bold display) + Cormorant (serif accent)

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, Clock } from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fade = {
  hidden: { opacity:0, y:20 },
  show: { opacity:1, y:0, transition:{ duration:0.6, ease:[0.22,1,0.36,1] as [number,number,number,number] } },
};
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

const drinks = [
  { name:"The Forest Blend", desc:"Single origin Ethiopia, light roast, floral notes", price:"$5.50", img:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&q=80", badge:null },
  { name:"Matcha Ritual", desc:"Ceremonial grade matcha, oat milk, honey", price:"$7.00", img:"https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300&q=80", badge:"Staff Pick" },
  { name:"Sunrise Latte", desc:"Espresso, oat milk, house orange syrup, cinnamon", price:"$6.50", img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80", badge:"Bestseller" },
  { name:"Cold Brew Tonic", desc:"18-hour cold brew, tonic water, citrus peel", price:"$6.00", img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&q=80", badge:null },
];

const food = [
  { name:"Avocado Toast", desc:"Sourdough, smashed avo, chili flakes, microgreens", price:"$13.00", img:"https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500&q=80" },
  { name:"Grain Bowl", desc:"Farro, roasted veg, tahini, pickled onion", price:"$15.00", img:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80" },
  { name:"Banana Loaf", desc:"House-baked, oat milk, brown butter glaze", price:"$5.50", img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80" },
];

export default function PlayfulShowcase() {
  return (
    <div style={{fontFamily:"var(--font-syne), sans-serif"}}>
      <ShowcaseNav />

      {/* ── Fictional sticky nav ── */}
      <header className="fixed top-16 left-0 right-0 z-40 bg-[#1a3a2a] h-14 flex items-center px-8">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <span className="text-lg font-bold text-[#f5e6c8] tracking-tight" style={{fontFamily:"var(--font-cormorant), Georgia, serif"}}>
            Zest Café
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#f5e6c8]/60 font-medium">
            {["Menu","About","Locations","Catering"].map(l=>(
              <a key={l} href="#" className="hover:text-[#f5e6c8] transition-colors">{l}</a>
            ))}
          </nav>
          <a href="#" className="bg-[#f5e6c8] text-[#1a3a2a] text-xs font-bold px-4 py-2 rounded-full hover:bg-white transition-colors">
            Order Online
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-[#1a3a2a] pt-14 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 pt-16 pb-0 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 items-end">
          <motion.div initial="hidden" animate="show" variants={stagger} className="pb-16">
            <motion.span variants={fade} className="inline-block bg-[#f5e6c8]/10 text-[#f5e6c8]/70 text-xs font-semibold px-3 py-1.5 rounded-full mb-8 tracking-wide">
              Open Daily 7am – 6pm · Nanaimo, BC
            </motion.span>
            <motion.h1 variants={fade}
              className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-[#f5e6c8]"
              style={{fontFamily:"var(--font-cormorant), Georgia, serif", fontStyle:"italic"}}
            >
              Good coffee.<br/>Good life.
            </motion.h1>
            <motion.p variants={fade} className="mt-6 text-[#f5e6c8]/60 text-base leading-relaxed max-w-sm">
              Specialty coffee, wholesome food, and the kind of atmosphere that makes you want to stay. Locally rooted since 2019.
            </motion.p>
            <motion.div variants={fade} className="mt-8 flex gap-3 flex-wrap">
              <a href="#" className="bg-[#f5e6c8] text-[#1a3a2a] font-bold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors">
                See Our Menu
              </a>
              <a href="#" className="border border-[#f5e6c8]/30 text-[#f5e6c8] font-semibold text-sm px-6 py-3 rounded-full hover:border-[#f5e6c8]/60 transition-colors">
                Our Story
              </a>
            </motion.div>
            <motion.div variants={fade} className="mt-10 flex items-center gap-2">
              {[...Array(5)].map((_,i)=><Star key={i} size={14} className="fill-[#f5e6c8] text-[#f5e6c8]"/>)}
              <span className="text-[#f5e6c8]/50 text-sm ml-2">4.9 · 340 Google reviews</span>
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:0.3 }}
            className="relative h-[420px] md:h-[500px]"
          >
            <Image
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&q=80"
              alt="Zest Café"
              fill
              className="object-cover object-top"
              unoptimized
              priority
            />
            <div className="absolute top-6 right-6 bg-[#f5e6c8] text-[#1a3a2a] rounded-2xl p-4 shadow-xl">
              <div className="text-2xl font-black">4.9</div>
              <div className="text-xs font-semibold">Stars</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Drinks menu ── */}
      <section className="bg-[#faf7f0] py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}>
            <motion.p variants={fade} className="text-xs font-bold tracking-[0.2em] uppercase text-[#1a3a2a]/40 mb-2">What We Brew</motion.p>
            <motion.h2 variants={fade} className="text-4xl md:text-5xl font-extrabold text-[#1a3a2a] leading-tight mb-12"
              style={{fontFamily:"var(--font-cormorant), Georgia, serif", fontStyle:"italic"}}>
              The Menu.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {drinks.map((d) => (
              <motion.div
                key={d.name}
                initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5 }}
                className="group bg-white rounded-2xl overflow-hidden flex cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="relative w-32 flex-shrink-0">
                  <Image src={d.img} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized/>
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {d.badge && (
                        <span className="inline-block bg-[#1a3a2a] text-white text-[9px] font-bold px-2 py-0.5 rounded-full mb-1.5 tracking-wide">
                          {d.badge}
                        </span>
                      )}
                      <h3 className="font-bold text-[#1a3a2a] text-base">{d.name}</h3>
                      <p className="text-sm text-[#888] mt-1 leading-relaxed">{d.desc}</p>
                    </div>
                    <span className="font-extrabold text-[#1a3a2a] ml-4 text-base flex-shrink-0">{d.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Food */}
          <h3 className="text-2xl font-extrabold text-[#1a3a2a] mt-16 mb-6"
            style={{fontFamily:"var(--font-cormorant), Georgia, serif", fontStyle:"italic"}}>
            Something to Eat
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {food.map((f) => (
              <div key={f.name} className="bg-white rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-40">
                  <Image src={f.img} alt={f.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized/>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[#1a3a2a]">{f.name}</h4>
                    <span className="font-bold text-[#1a3a2a] ml-2 flex-shrink-0">{f.price}</span>
                  </div>
                  <p className="text-xs text-[#888] mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story / About ── */}
      <section className="bg-[#1a3a2a] py-24 px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#f5e6c8]/40 mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#f5e6c8] leading-tight"
              style={{fontFamily:"var(--font-cormorant), Georgia, serif", fontStyle:"italic"}}>
              Born on the<br/>North Shore.
            </h2>
            <p className="mt-6 text-[#f5e6c8]/60 text-base leading-relaxed">
              Zest started as a farmers&apos; market pop-up in 2019. We outgrew our tent pretty fast. Now we&apos;re in the heart of Nanaimo, serving the neighbourhood we love with coffee sourced from BC roasters we believe in.
            </p>
            <p className="mt-4 text-[#f5e6c8]/60 text-base leading-relaxed">
              Everything on our menu is made in-house, in small batches, with ingredients we can actually name. No shortcuts. No compromises.
            </p>
            <div className="mt-10 flex gap-10">
              {[["2019","Founded"],["100%","BC Sourced"],["4,000+","Monthly Guests"]].map(([v,l])=>(
                <div key={l}>
                  <div className="text-2xl font-extrabold text-[#f5e6c8]">{v}</div>
                  <div className="text-xs text-[#f5e6c8]/40 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=80" alt="Our story" fill className="object-cover" unoptimized/>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-[#f5e6c8] text-[#1a3a2a] rounded-2xl p-4 shadow-xl">
              <div className="text-lg font-black">Plant-First</div>
              <div className="text-xs">80% of our menu</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-[#faf7f0] py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-[#1a3a2a] mb-12"
            style={{fontFamily:"var(--font-cormorant), Georgia, serif", fontStyle:"italic"}}>
            What we stand for.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji:"🌱", title:"Plant-First Menu", desc:"Over 80% of our menu is fully plant-based or easily adapted. Eating well shouldn't be complicated.", img:"https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80" },
              { emoji:"☕", title:"BC Roasters Only", desc:"We source exclusively from independent BC roasters who share our values. Every cup has a story.", img:"https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80" },
              { emoji:"🤝", title:"Community Roots", desc:"10% of monthly profits go to local food security programs. Business should give back.", img:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80" },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl overflow-hidden">
                <div className="relative h-44">
                  <Image src={v.img} alt={v.title} fill className="object-cover" unoptimized/>
                  <div className="absolute top-4 left-4 text-3xl">{v.emoji}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-[#1a3a2a] mb-3">{v.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hours & Location ── */}
      <section className="bg-white py-24 px-8 border-t border-[#f0ebe3]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#999] mb-4">Visit Us</p>
            <h2 className="text-4xl font-extrabold text-[#1a3a2a] mb-8"
              style={{fontFamily:"var(--font-cormorant), Georgia, serif", fontStyle:"italic"}}>
              Come say hi.
            </h2>
            <div className="flex items-start gap-3 mb-6">
              <MapPin size={16} className="text-[#1a3a2a] mt-1 flex-shrink-0"/>
              <div>
                <div className="font-bold text-[#1a3a2a] text-sm">123 Harbour Street</div>
                <div className="text-sm text-[#888]">Nanaimo, BC V9R 2N4</div>
              </div>
            </div>
            <div className="flex items-start gap-3 mb-10">
              <Clock size={16} className="text-[#1a3a2a] mt-1 flex-shrink-0"/>
              <div className="space-y-2 text-sm">
                {[["Monday – Friday","7:00 am – 6:00 pm"],["Saturday","8:00 am – 5:00 pm"],["Sunday","9:00 am – 3:00 pm"]].map(([d,h])=>(
                  <div key={d} className="flex gap-6">
                    <span className="font-semibold text-[#1a3a2a] w-32">{d}</span>
                    <span className="text-[#888]">{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <a href="#" className="inline-block bg-[#1a3a2a] text-[#f5e6c8] font-bold text-sm px-6 py-3 rounded-full hover:bg-black transition-colors">
              Get Directions
            </a>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80" alt="Location" fill className="object-cover" unoptimized/>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="bg-[#1a3a2a] py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#f5e6c8] mb-10"
            style={{fontFamily:"var(--font-cormorant), Georgia, serif", fontStyle:"italic"}}>
            What people are saying.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name:"Sarah M.", text:"Best oat latte on the island. The vibe is immaculate - I come every morning before work.", stars:5 },
              { name:"Jordan T.", text:"I work remotely and Zest is my office. Fast WiFi, great playlist, and the cold brew is elite.", stars:5 },
              { name:"Priya L.", text:"The grain bowl changed my lunch game. And the staff somehow remember everyone's name.", stars:5 },
            ].map((r) => (
              <div key={r.name} className="bg-[#f5e6c8]/10 rounded-2xl p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(r.stars)].map((_,i)=><Star key={i} size={14} className="fill-[#f5e6c8] text-[#f5e6c8]"/>)}
                </div>
                <p className="text-[#f5e6c8]/80 text-sm leading-relaxed mb-4">&quot;{r.text}&quot;</p>
                <span className="text-[#f5e6c8]/40 text-xs font-bold tracking-wide">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-20"/>
    </div>
  );
}
