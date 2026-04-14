"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const menuItems = [
  { name: "The Sunrise Latte", desc: "Espresso, oat milk, honey, cinnamon", price: "$6.50", tag: "Fan Fave", bg: "bg-[#fef3c7]", seed: "coffee1" },
  { name: "Zesty Matcha Bowl", desc: "Matcha, banana, mango, granola", price: "$11.00", tag: "New", bg: "bg-[#dcfce7]", seed: "food2" },
  { name: "The Classic Drip", desc: "Single origin, light roast, black", price: "$4.00", tag: null, bg: "bg-[#fff7ed]", seed: "coffee3" },
  { name: "Berry Burst Smoothie", desc: "Mixed berries, almond milk, chia", price: "$8.50", tag: "Vegan", bg: "bg-[#fce7f3]", seed: "fruit1" },
];

export default function PlayfulShowcase() {
  return (
    <div className="bg-[#fffbf5]">
      <ShowcaseNav />

      {/* Fictional Nav */}
      <div className="bg-[#f97316]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-black text-white tracking-tight">Zest Café ☀️</span>
          <nav className="hidden md:flex gap-6 text-sm text-white/80 font-medium">
            {["Menu","About","Visit"].map(l=><a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#f97316] px-6 pb-0 pt-12 overflow-hidden relative">
        <div className="absolute -right-20 top-0 w-64 h-64 rounded-full bg-[#fb923c] opacity-40" />
        <div className="absolute -left-10 bottom-0 w-48 h-48 rounded-full bg-[#fed7aa] opacity-30" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-xl pb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              ☕ Now Open 7am – 6pm
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight">
              Coffee worth<br />getting up for. ☕
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-white/80 text-lg leading-relaxed">
              Fresh brews, wholesome bites, and good vibes only. Locally loved in Nanaimo since 2019.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="bg-white text-[#f97316] text-sm font-bold px-6 py-3 rounded-full hover:bg-[#fff7ed] transition-colors">See Our Menu</a>
              <a href="#" className="border-2 border-white text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">Find Us</a>
            </motion.div>
          </motion.div>
        </div>
        {/* Hero image strip */}
        <div className="relative h-64 overflow-hidden">
          <Image src="https://picsum.photos/seed/cafe-hero/1200/400" alt="Café interior" fill className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f97316] via-[#f97316]/20 to-transparent" />
        </div>
      </section>

      {/* Wave */}
      <div className="bg-[#f97316]">
        <svg viewBox="0 0 1440 60" className="w-full h-12 fill-[#fffbf5]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      {/* Menu */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl font-black text-[#1d1d1f] mb-2">What&apos;s good today 🌿</motion.h2>
            <motion.p variants={fadeUp} className="text-[#6e6e73] mb-10">Seasonal ingredients, always fresh.</motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map((item) => (
                <motion.div key={item.name} variants={fadeUp} className={`${item.bg} rounded-3xl overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer`}>
                  <div className="relative h-40">
                    <Image src={`https://picsum.photos/seed/${item.seed}/600/300`} alt={item.name} fill className="object-cover" unoptimized />
                    {item.tag && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold bg-[#f97316] text-white px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-[#1d1d1f]">{item.name}</h3>
                      <p className="text-sm text-[#6e6e73] mt-0.5">{item.desc}</p>
                    </div>
                    <span className="font-black text-[#1d1d1f] ml-4 flex-shrink-0">{item.price}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-[#fff7ed]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-[#1d1d1f] mb-10">Why we&apos;re different 💛</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { img: "plant-food", icon: "🌱", title: "Plant-First Menu", desc: "Over 80% of our menu is plant-based or easily adaptable." },
              { img: "coffee-beans", icon: "☕", title: "Local Roasters Only", desc: "We source beans exclusively from BC-based roasters." },
              { img: "community", icon: "💛", title: "Community First", desc: "10% of profits go back to local food banks every month." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-3xl overflow-hidden border-2 border-[#fed7aa]">
                <div className="relative h-32">
                  <Image src={`https://picsum.photos/seed/${v.img}/400/200`} alt={v.title} fill className="object-cover" unoptimized />
                </div>
                <div className="p-5">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <h3 className="font-bold text-[#1d1d1f] mb-1">{v.title}</h3>
                  <p className="text-sm text-[#6e6e73] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-[#1d1d1f] mb-6">Come say hi 👋</h2>
            <div className="space-y-3">
              {[["Mon – Fri","7:00 am – 6:00 pm"],["Saturday","8:00 am – 5:00 pm"],["Sunday","9:00 am – 3:00 pm"]].map(([d,h])=>(
                <div key={d} className="flex justify-between text-sm border-b border-[#fed7aa] pb-3">
                  <span className="font-semibold text-[#1d1d1f]">{d}</span>
                  <span className="text-[#6e6e73]">{h}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-[#6e6e73]">📍 123 Harbour St, Nanaimo, BC</div>
          </div>
          <div className="relative h-64 rounded-3xl overflow-hidden">
            <Image src="https://picsum.photos/seed/nanaimo-cafe/600/400" alt="Café location" fill className="object-cover" unoptimized />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6 bg-[#f97316]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">People love us ⭐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Sarah M.", quote: "Best oat latte on the island, no contest." },
              { name: "Jordan T.", quote: "The vibe is just right. I come here to work every Friday." },
              { name: "Priya L.", quote: "Genuinely the most friendly staff I've ever encountered." },
            ].map((r) => (
              <div key={r.name} className="bg-white/10 backdrop-blur rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_,i)=><Star key={i} size={12} className="fill-white text-white"/>)}
                </div>
                <p className="text-white text-sm leading-relaxed mb-3">&quot;{r.quote}&quot;</p>
                <span className="text-white/60 text-xs font-medium">{r.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
