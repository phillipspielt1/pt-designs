"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Truck, RefreshCw, Heart } from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const products = [
  { name: "Handwoven Throw", price: "$89", tag: "Bestseller", seed: "weave1", emoji: "🧵" },
  { name: "Cedar Soap Bar", price: "$18", tag: "New", seed: "soap1", emoji: "🌿" },
  { name: "Beeswax Candle Set", price: "$42", tag: null, seed: "candle1", emoji: "🕯️" },
  { name: "Linen Tote Bag", price: "$35", tag: "Sale", seed: "tote1", emoji: "👜" },
  { name: "Pine Incense Kit", price: "$24", tag: null, seed: "incense1", emoji: "🌲" },
  { name: "Hand Cream Duo", price: "$28", tag: "New", seed: "cream1", emoji: "🫙" },
];

const categories = [
  { label: "Home & Living", emoji: "🏡" },
  { label: "Skincare", emoji: "✨" },
  { label: "Candles & Scent", emoji: "🕯️" },
  { label: "Apparel", emoji: "🧥" },
  { label: "Gifting", emoji: "🎁" },
];

export default function EcommerceShowcase() {
  return (
    <div className="bg-[#faf6f1]">
      <ShowcaseNav />

      {/* Announcement bar */}
      <div className="bg-[#92400e] text-white text-xs text-center py-2.5 font-medium">
        Free shipping on orders over $75 · Handmade in BC 🌲
      </div>

      {/* Fictional Nav */}
      <div className="bg-[#faf6f1] border-b border-[#e8e0d4]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-base font-semibold text-[#3d2c1e] tracking-tight">Cedar & Co.</span>
          <nav className="hidden md:flex gap-7 text-xs text-[#8a7060] font-medium">
            {["Shop","Collections","Our Story","Journal"].map(l=><a key={l} href="#" className="hover:text-[#3d2c1e] transition-colors">{l}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-[#8a7060] hover:text-[#3d2c1e] transition-colors"><Heart size={18} /></button>
            <button className="relative text-[#3d2c1e]">
              <ShoppingCart size={18} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#92400e] text-white text-[9px] rounded-full flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-widest text-[#8a7060] font-medium mb-4">
                Handmade · Small Batch · BC Made
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-semibold text-[#3d2c1e] leading-tight tracking-tight">
                Crafted with care.<br />Made to last.
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 text-[#8a7060] text-lg leading-relaxed">
                Cedar & Co. makes everyday goods that feel good and do good. Every item is handmade in small batches in Tofino, BC.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex gap-3">
                <a href="#" className="bg-[#3d2c1e] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#5c4030] transition-colors">Shop Now</a>
                <a href="#" className="border border-[#c4a882] text-[#3d2c1e] text-sm font-medium px-6 py-3 rounded-full hover:bg-[#f0ebe3] transition-colors">Our Story</a>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-80 md:h-96 rounded-3xl overflow-hidden"
            >
              <Image src="https://picsum.photos/seed/cedar-hero/800/700" alt="Cedar & Co products" fill className="object-cover" unoptimized />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-8 bg-[#f5ede3] border-y border-[#e8ddd0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button key={c.label} className="flex-shrink-0 flex items-center gap-2 bg-white border border-[#e8ddd0] text-[#3d2c1e] text-xs font-medium px-4 py-2.5 rounded-full hover:bg-[#3d2c1e] hover:text-white hover:border-[#3d2c1e] transition-colors">
                <span>{c.emoji}</span> {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[#3d2c1e]">Featured Products</h2>
              <a href="#" className="text-xs font-medium text-[#8a7060] hover:text-[#3d2c1e] transition-colors">View all →</a>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <motion.div key={p.name} variants={fadeUp} className="group cursor-pointer">
                  <div className="relative h-52 rounded-2xl overflow-hidden mb-3">
                    <Image
                      src={`https://picsum.photos/seed/${p.seed}/400/400`}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                    {p.tag && (
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full ${p.tag==="Sale"?"bg-red-500 text-white":p.tag==="New"?"bg-[#3d2c1e] text-white":"bg-[#92400e] text-white"}`}>
                        {p.tag}
                      </span>
                    )}
                    <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Heart size={13} className="text-[#8a7060]" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-full bg-white text-[#3d2c1e] text-xs font-medium py-2 rounded-lg">Add to Cart</button>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-[#3d2c1e]">{p.name}</h3>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_,i)=><Star key={i} size={10} className="fill-[#c4a882] text-[#c4a882]"/>)}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-[#3d2c1e]">{p.price}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 px-6 bg-[#3d2c1e]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Free Shipping over $75", desc: "Across Canada, always" },
            { icon: RefreshCw, title: "30-Day Returns", desc: "No questions asked" },
            { icon: Heart, title: "Handmade in BC", desc: "Every single item" },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <t.icon size={16} className="text-[#c4a882]" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{t.title}</div>
                <div className="text-white/50 text-xs">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand story */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 rounded-3xl overflow-hidden">
            <Image src="https://picsum.photos/seed/tofino-craft/600/400" alt="Making products" fill className="object-cover" unoptimized />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-[#8a7060] font-medium mb-4">Our Story</p>
            <h2 className="text-3xl font-semibold text-[#3d2c1e]">Made with intention, loved for a lifetime.</h2>
            <p className="mt-4 text-[#8a7060] leading-relaxed text-sm">
              Cedar & Co. started in a Tofino garage in 2021, with a simple belief: the things you bring into your home should be beautiful, honest, and built to last.
            </p>
            <a href="#" className="inline-block mt-6 text-sm font-medium text-[#3d2c1e] border-b border-[#3d2c1e] pb-0.5 hover:text-[#8a7060] hover:border-[#8a7060] transition-colors">
              Meet the makers →
            </a>
          </div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
