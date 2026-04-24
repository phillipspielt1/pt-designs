"use client";

// Style: Warm Artisan E-Commerce - inspired by Brightland / Otherland
// Alternating editorial image/text sections, warm cream palette,
// story-forward design, Lora serif headlines, product-focused with lifestyle imagery
// Every section tells part of the brand story

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Truck, RefreshCw, Leaf, Star } from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fade = {
  hidden:{ opacity:0, y:20 },
  show:{ opacity:1, y:0, transition:{ duration:0.65, ease:[0.22,1,0.36,1] as [number,number,number,number] } },
};
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.1 } } };

const products = [
  { name:"Cedarmoss Throw",    price:"$89",  originalPrice:null,  img:"https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80", badge:"Bestseller", desc:"Hand-loomed from recycled cotton, 140×180cm" },
  { name:"Old-Growth Soap",    price:"$18",  originalPrice:null,  img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80", badge:"New",        desc:"Cedar, Douglas fir & sea salt. 120g bar" },
  { name:"Beeswax Taper Set",  price:"$42",  originalPrice:"$52", img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80", badge:"Sale",       desc:"6 tapers, hand-dipped in pure BC beeswax" },
  { name:"Linen Market Tote",  price:"$35",  originalPrice:null,  img:"https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500&q=80", badge:null,         desc:"Undyed Belgian linen, reinforced handles" },
  { name:"Forest Incense Kit", price:"$28",  originalPrice:null,  img:"https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=500&q=80", badge:"New",         desc:"30 sticks of pine, cedar & sage. Includes holder" },
  { name:"Hand & Body Cream",  price:"$32",  originalPrice:null,  img:"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80", badge:null,        desc:"Shea, beeswax & wild rose hip. 200ml" },
];

const stories = [
  {
    title:"Where we start:\nthe forest.",
    body:"Every Cedar & Co. product begins with the forest. We source our raw materials from sustainable BC forestry operations, working directly with small-scale harvesters who share our values.",
    img:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&q=80",
    imgLeft:true,
  },
  {
    title:"Made by hand,\none at a time.",
    body:"Our Tofino studio produces everything in small batches. No assembly lines, no shortcuts. Each item is made by one of our nine makers - people who care deeply about what they make.",
    img:"https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=700&q=80",
    imgLeft:false,
  },
  {
    title:"Packaged to\nlast a lifetime.",
    body:"Our packaging is 100% recyclable or compostable. We use soy-based inks, recycled paper, and avoid single-use plastic entirely. The box is part of the experience - and it goes back to the earth.",
    img:"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=80",
    imgLeft:true,
  },
];

const reviews = [
  { name:"Amanda K.", location:"Vancouver, BC", stars:5, text:"The Cedarmoss Throw is the most beautiful thing I own. The weight, the texture, the smell when it arrived - nothing like it.", product:"Cedarmoss Throw" },
  { name:"Tom R.", location:"Victoria, BC", stars:5, text:"I've tried a lot of artisan soaps. Cedar & Co. is in a different category entirely. Three bars in and I'm a lifer.", product:"Old-Growth Soap" },
  { name:"Sarah L.", location:"Tofino, BC", stars:5, text:"Gave the incense kit as a gift and immediately ordered one for myself. The forest scent is exactly right - not perfumey, just real.", product:"Forest Incense Kit" },
];

export default function EcommerceShowcase() {
  return (
    <div className="bg-[#faf7f2]" style={{fontFamily:"system-ui, -apple-system, sans-serif"}}>
      <ShowcaseNav />

      {/* ── Announcement ── */}
      <div className="bg-[#3d2c1e] text-[#f5ede0] text-xs text-center py-2.5 font-medium tracking-wide">
        Free shipping on orders over $75 · 100% handmade in Tofino, BC 🌲
      </div>

      {/* ── Fictional nav ── */}
      <header className="sticky top-16 z-40 bg-[#faf7f2]/95 backdrop-blur-sm border-b border-[#e8ddd0]">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <span className="text-lg font-semibold text-[#3d2c1e] tracking-tight" style={{fontFamily:"var(--font-lora), Georgia, serif"}}>
            Cedar & Co.
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#8a7060]">
            {["Shop","Collections","Our Story","Journal"].map(l=>(
              <a key={l} href="#" className="hover:text-[#3d2c1e] transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-[#8a7060] hover:text-[#3d2c1e] transition-colors"><Heart size={18}/></button>
            <button className="relative text-[#3d2c1e]">
              <ShoppingCart size={18}/>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#3d2c1e] text-white text-[9px] rounded-full flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero - split editorial ── */}
      <section className="max-w-6xl mx-auto px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p variants={fade} className="text-xs uppercase tracking-[0.2em] text-[#8a7060] mb-5">
              Handmade · Small Batch · Tofino, BC
            </motion.p>
            <motion.h1 variants={fade}
              className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-[#3d2c1e]"
              style={{fontFamily:"var(--font-lora), Georgia, serif"}}
            >
              Made with care.<br/>Built to last.
            </motion.h1>
            <motion.p variants={fade} className="mt-6 text-base text-[#8a7060] leading-relaxed max-w-md">
              Everything we make starts with a simple question: would we want it in our own home? If the answer isn&apos;t an immediate yes, we start again.
            </motion.p>
            <motion.div variants={fade} className="mt-8 flex gap-3">
              <a href="#" className="bg-[#3d2c1e] text-[#f5ede0] text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#5c4030] transition-colors">
                Shop the Collection
              </a>
              <a href="#" className="border border-[#c4a882] text-[#3d2c1e] text-sm font-medium px-6 py-3.5 rounded-full hover:bg-[#f0ebe3] transition-colors">
                Our Story
              </a>
            </motion.div>
            <motion.div variants={fade} className="mt-10 flex gap-8 pt-8 border-t border-[#e8ddd0]">
              {[["2021","Founded in Tofino"],["9","Makers on our team"],["1,200+","Happy customers"]].map(([v,l])=>(
                <div key={l}>
                  <div className="text-lg font-semibold text-[#3d2c1e]" style={{fontFamily:"var(--font-lora), Georgia, serif"}}>{v}</div>
                  <div className="text-xs text-[#aaa] mt-0.5">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.9 }}
            className="relative">
            <div className="relative h-[480px] rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=700&q=80" alt="Cedar & Co." fill className="object-cover" unoptimized priority/>
            </div>
            {/* Floating award badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-[#e8ddd0]">
              <div className="flex items-center gap-2 mb-1">
                <Leaf size={14} className="text-[#3d7a4f]"/>
                <span className="text-xs font-bold text-[#3d2c1e]">100% Sustainable</span>
              </div>
              <div className="text-xs text-[#8a7060]">All materials sourced in BC</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="bg-[#f5ede0] py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}>
            <motion.div variants={fade} className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#8a7060] mb-2">Products</p>
                <h2 className="text-3xl font-semibold text-[#3d2c1e]" style={{fontFamily:"var(--font-lora), Georgia, serif"}}>
                  The Collection
                </h2>
              </div>
              <a href="#" className="text-sm text-[#8a7060] hover:text-[#3d2c1e] transition-colors">View all →</a>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay: i * 0.07 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-3">
                  <div className="relative" style={{paddingBottom:"120%"}}>
                    <Image src={p.img} alt={p.name} fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-600"
                      unoptimized/>
                  </div>
                  {p.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${p.badge==="Sale"?"bg-red-500 text-white":p.badge==="New"?"bg-[#3d2c1e] text-white":"bg-[#3d7a4f] text-white"}`}>
                      {p.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white">
                    <Heart size={14} className="text-[#8a7060]"/>
                  </button>
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-full bg-[#3d2c1e] text-[#f5ede0] text-xs font-semibold py-2.5 rounded-lg">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-[#3d2c1e] text-sm" style={{fontFamily:"var(--font-lora), Georgia, serif"}}>{p.name}</h3>
                  <p className="text-xs text-[#aaa] mt-0.5">{p.desc}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-semibold text-[#3d2c1e] text-sm">{p.price}</span>
                    {p.originalPrice && <span className="text-xs text-[#aaa] line-through">{p.originalPrice}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand story - alternating editorial sections ── */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8a7060] mb-4">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3d2c1e] mb-20 max-w-xl leading-tight"
            style={{fontFamily:"var(--font-lora), Georgia, serif"}}>
            Made with intention,<br/>loved for a lifetime.
          </h2>
          <div className="space-y-24">
            {stories.map((s) => (
              <motion.div key={s.title}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.7 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${!s.imgLeft ? "md:[&>:first-child]:order-2" : ""}`}
              >
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                  <Image src={s.img} alt={s.title} fill className="object-cover" unoptimized/>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#3d2c1e] leading-tight mb-5 whitespace-pre-line"
                    style={{fontFamily:"var(--font-lora), Georgia, serif"}}>
                    {s.title}
                  </h3>
                  <div className="w-8 h-px bg-[#c4a882] mb-5"/>
                  <p className="text-base text-[#8a7060] leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust signals ── */}
      <section className="bg-[#3d2c1e] py-14 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon:Truck, title:"Free Shipping over $75", desc:"Across Canada, every order." },
            { icon:RefreshCw, title:"30-Day Returns", desc:"No questions, no hassle." },
            { icon:Leaf, title:"Sustainably Made", desc:"Materials sourced in BC only." },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-5">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <t.icon size={18} className="text-[#c4a882]"/>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#f5ede0]">{t.title}</div>
                <div className="text-xs text-white/40 mt-0.5">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-24 px-8 bg-[#faf7f2]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8a7060] mb-2">Reviews</p>
              <h2 className="text-3xl font-semibold text-[#3d2c1e]" style={{fontFamily:"var(--font-lora), Georgia, serif"}}>
                What our customers say.
              </h2>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#3d2c1e]" style={{fontFamily:"var(--font-lora), Georgia, serif"}}>4.9</div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_,i)=><Star key={i} size={12} className="fill-[#c4a882] text-[#c4a882]"/>)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 border border-[#e8ddd0]">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.stars)].map((_,i)=><Star key={i} size={13} className="fill-[#c4a882] text-[#c4a882]"/>)}
                </div>
                <p className="text-sm text-[#666] leading-relaxed mb-4 italic">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#3d2c1e]">{r.name}</div>
                    <div className="text-xs text-[#aaa]">{r.location}</div>
                  </div>
                  <span className="text-[10px] text-[#8a7060] bg-[#f5ede0] px-2 py-1 rounded-full">{r.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-24 px-8 bg-[#f5ede0] border-t border-[#e8ddd0]">
        <div className="max-w-md mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8a7060] mb-3">Stay Connected</p>
          <h2 className="text-3xl font-semibold text-[#3d2c1e] mb-4" style={{fontFamily:"var(--font-lora), Georgia, serif"}}>
            Stories from the studio.
          </h2>
          <p className="text-sm text-[#8a7060] mb-8 leading-relaxed">
            New products, behind-the-scenes stories, and early access to seasonal releases. No spam, ever.
          </p>
          <div className="flex gap-2">
            <input type="email" placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-[#c4a882] bg-white text-sm text-[#3d2c1e] placeholder:text-[#c4a882] focus:outline-none focus:border-[#3d2c1e]"/>
            <button className="bg-[#3d2c1e] text-[#f5ede0] text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#5c4030] transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <div className="h-20"/>
    </div>
  );
}
