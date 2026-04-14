"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Shield, Users, ChevronRight } from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const services = [
  { icon: TrendingUp, title: "Wealth Management", desc: "Personalized strategies to grow and protect your portfolio through every stage of life." },
  { icon: Shield, title: "Risk & Insurance", desc: "Comprehensive risk analysis and insurance planning to safeguard what matters most." },
  { icon: Users, title: "Corporate Advisory", desc: "Strategic guidance for business owners navigating growth, acquisition, or succession." },
];

const team = [
  { name: "David Harbour", role: "Managing Director", yrs: "22 yrs experience", seed: "man1" },
  { name: "Lena Reeves", role: "Senior Advisor", yrs: "15 yrs experience", seed: "woman1" },
  { name: "Marcus Chen", role: "Portfolio Analyst", yrs: "9 yrs experience", seed: "man2" },
];

export default function ProfessionalShowcase() {
  return (
    <div className="bg-white">
      <ShowcaseNav />

      {/* Fictional Nav */}
      <div className="bg-[#0f2357]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <span className="text-white text-sm font-semibold tracking-wide">Harbour Advisory</span>
            <span className="text-white/40 text-xs ml-2">Group</span>
          </div>
          <nav className="hidden md:flex gap-8 text-xs text-white/70 font-medium tracking-wide">
            {["Services","Our Team","Insights","Contact"].map(l=><a key={l} href="#" className="hover:text-white transition-colors">{l}</a>)}
          </nav>
          <a href="#" className="hidden md:block text-xs font-semibold bg-[#c9a84c] text-white px-4 py-2 hover:bg-[#b8963f] transition-colors">
            Book a Consultation
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0f2357] px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://picsum.photos/seed/city-night/1600/600" alt="City background" fill className="object-cover opacity-10" unoptimized />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-6">
              Trusted Financial Advisory Since 1998
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Your financial future,<br />built on solid ground.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 text-white/60 text-lg leading-relaxed max-w-lg">
              Harbour Advisory Group delivers independent, evidence-based financial planning for individuals, families, and businesses across Canada.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <a href="#" className="bg-[#c9a84c] text-white text-sm font-semibold px-6 py-3 hover:bg-[#b8963f] transition-colors">Book a Consultation</a>
              <a href="#" className="border border-white/30 text-white text-sm font-medium px-6 py-3 hover:border-white/60 transition-colors">Our Services</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-[#0d1e4a] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-3 gap-6 text-center">
          {[["$2.4B+","Assets Under Management"],["1,800+","Clients Served"],["25 yrs","Combined Experience"]].map(([v,l])=>(
            <div key={l}>
              <div className="text-2xl font-bold text-[#c9a84c]">{v}</div>
              <div className="text-xs text-white/50 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-4">Our Services</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#0f2357] mb-12">Comprehensive financial solutions.</motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((svc) => (
                <motion.div key={svc.title} variants={fadeUp} className="border border-[#e2e8f0] p-8 hover:border-[#c9a84c] transition-colors group">
                  <svc.icon size={24} className="text-[#c9a84c] mb-5" />
                  <h3 className="font-bold text-[#0f2357] text-lg mb-3">{svc.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed mb-6">{svc.desc}</p>
                  <a href="#" className="flex items-center gap-1 text-xs font-semibold text-[#c9a84c] group-hover:gap-2 transition-all">
                    Learn more <ChevronRight size={14} />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] font-semibold mb-4">Our Team</p>
          <h2 className="text-3xl font-bold text-[#0f2357] mb-12">Experienced. Independent. On your side.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.name} className="bg-white border border-[#e2e8f0] overflow-hidden">
                <div className="relative h-48">
                  <Image src={`https://picsum.photos/seed/${m.seed}/400/300`} alt={m.name} fill className="object-cover object-top" unoptimized />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#0f2357]">{m.name}</h3>
                  <p className="text-sm text-[#c9a84c] font-medium mt-0.5">{m.role}</p>
                  <p className="text-xs text-[#94a3b8] mt-2">{m.yrs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-[#0f2357] relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://picsum.photos/seed/office-dark/1600/600" alt="" fill className="object-cover opacity-5" unoptimized />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="text-[#c9a84c] text-4xl mb-6">"</div>
          <p className="text-white text-xl md:text-2xl font-light leading-relaxed">
            Harbour Advisory helped us consolidate a complex estate and plan for retirement with confidence. Their advice was clear, honest, and entirely in our interest.
          </p>
          <p className="mt-8 text-white/50 text-sm font-medium">— Robert & Claire M., Victoria, BC</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold text-[#0f2357]">Ready to take control of your future?</h2>
            <p className="text-[#64748b] mt-2">Schedule a no-obligation consultation with our team.</p>
          </div>
          <a href="#" className="bg-[#0f2357] text-white text-sm font-semibold px-8 py-4 whitespace-nowrap hover:bg-[#0d1e4a] transition-colors">
            Book a Free Consultation
          </a>
        </div>
      </section>

      <div className="h-20" />
    </div>
  );
}
