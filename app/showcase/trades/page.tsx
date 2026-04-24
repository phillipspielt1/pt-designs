"use client";

// Style: Local Trades / Service Business - Peak Home Services
// Navy + orange, conversion-first, trust signals everywhere
// Inspired by real high-performing local service business websites
// Goal: get visitors to call or request a quote

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone, CheckCircle, Star, MapPin, Clock, Shield,
  Wrench, Zap, Wind, Droplets, ArrowRight, ChevronRight, Mail,
} from "lucide-react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] as [number,number,number,number] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

const services = [
  { icon: Droplets, name: "Plumbing",          desc: "Repairs, fixture installs, pipe work, and full bathroom & kitchen plumbing.",  price: "from $89/hr",  badge: "bg-blue-50 text-blue-700"   },
  { icon: Wind,     name: "Heating & Cooling",  desc: "Furnace repair, AC installation, heat pumps, and seasonal system tune-ups.",   price: "from $120/hr", badge: "bg-orange-50 text-orange-700" },
  { icon: Zap,      name: "Electrical",         desc: "Panel upgrades, wiring, outlets, lighting, and EV charger installation.",       price: "from $110/hr", badge: "bg-yellow-50 text-yellow-700" },
  { icon: Wrench,   name: "Drain Cleaning",     desc: "Clog removal, hydro-jetting, drain camera inspection, and maintenance.",        price: "from $149",    badge: "bg-green-50 text-green-700"  },
  { icon: Shield,   name: "Emergency Repairs",  desc: "24/7 response for burst pipes, no heat, flooding, and urgent situations.",      price: "Call for rates",badge: "bg-red-50 text-red-700"      },
  { icon: CheckCircle, name: "Home Inspections",desc: "Full mechanical inspection reports for buyers, sellers, and landlords.",        price: "from $299",    badge: "bg-purple-50 text-purple-700"},
];

const pricingTiers = [
  {
    name: "Service Call",
    price: "$89",
    unit: "flat fee",
    items: ["Diagnosis included", "Written estimate provided", "No work = no charge", "Fee waived with any repair"],
    cta: "Book a Call",
  },
  {
    name: "Common Repairs",
    price: "$149–$349",
    unit: "typical range",
    items: ["Faucet & fixture repair", "Drain unclogging", "Thermostat install", "Outlet replacement"],
    cta: "Get a Quote",
    highlight: true,
  },
  {
    name: "Major Work",
    price: "$499+",
    unit: "full install / replace",
    items: ["Water heater install", "Furnace replacement", "Electrical panel upgrade", "Full bathroom rough-in"],
    cta: "Get a Quote",
  },
];

const reviews = [
  { name: "Karen M.", loc: "Nanaimo, BC",       rating: 5, text: "Peak came out within 2 hours of my call on a Saturday. Fixed our burst pipe, cleaned up after, and charged exactly what they quoted. Couldn't ask for more." },
  { name: "Dave T.", loc: "Parksville, BC",      rating: 5, text: "We've used Peak for HVAC maintenance for 3 years. They're always on time, honest about what needs doing, and never try to oversell. 100% recommend." },
  { name: "Sandra L.", loc: "Courtenay, BC",     rating: 5, text: "Got quotes from 3 companies. Peak was most upfront about pricing and had the best reviews. Work was done perfectly. They've got a customer for life." },
];

const areas = ["Nanaimo","Parksville","Qualicum Beach","Courtenay","Comox","Port Alberni","Ladysmith","Chemainus","Duncan"];

export default function TradesShowcase() {
  return (
    <div className="bg-white" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <ShowcaseNav />

      {/* ── Emergency banner ── */}
      <div className="bg-[#f97316] text-white text-center py-2 text-xs font-bold tracking-wide relative z-50">
        ⚡ 24/7 Emergency Service Available -{" "}
        <a href="tel:2505550198" className="underline underline-offset-2 hover:text-orange-100 transition-colors">(250) 555-0198</a>
      </div>

      {/* ── Sticky header ── */}
      <header className="sticky top-16 z-40 bg-[#1e3a5f] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#f97316] rounded-md flex items-center justify-center flex-shrink-0">
              <Wrench size={15} className="text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-none">Peak Home Services</div>
              <div className="text-white/50 text-[10px] mt-0.5">Licensed & Insured · Est. 2008</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-white/70">
            {["Services","Pricing","Reviews","About","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="tel:2505550198" className="hidden md:flex items-center gap-1.5 text-white font-semibold text-sm hover:text-orange-300 transition-colors">
              <Phone size={14} />(250) 555-0198
            </a>
            <a href="#contact" className="bg-[#f97316] hover:bg-[#ea6d10] text-white text-xs font-bold px-4 py-2.5 rounded-md transition-colors uppercase tracking-wide">
              Free Quote
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1800&q=80"
          alt="Technician at work"
          fill
          className="object-cover"
          style={{ filter: "brightness(0.32)" }}
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/80 via-[#1e3a5f]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl">
            <motion.div variants={fade} className="inline-flex items-center gap-2 bg-[#f97316] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              <Star size={11} fill="white" />4.9 ★ Google · 500+ Reviews
            </motion.div>
            <motion.h1 variants={fade} className="text-5xl md:text-6xl font-bold text-white leading-[1.05] tracking-tight">
              Fast, Reliable<br />Home Services<br /><span className="text-[#f97316]">on Vancouver Island</span>
            </motion.h1>
            <motion.p variants={fade} className="mt-6 text-lg text-white/75 leading-relaxed max-w-xl">
              Licensed plumbers, electricians, and HVAC technicians serving Nanaimo and surrounding areas since 2008. Same-day service available.
            </motion.p>
            <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6d10] text-white font-bold px-7 py-4 rounded-md transition-colors text-sm uppercase tracking-wide">
                Get a Free Quote <ArrowRight size={15} />
              </a>
              <a href="tel:2505550198" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#1e3a5f] font-bold px-7 py-4 rounded-md transition-colors text-sm uppercase tracking-wide">
                <Phone size={15} /> Call Now
              </a>
            </motion.div>
            <motion.div variants={fade} className="mt-10 flex flex-wrap gap-6">
              {["Licensed & Insured","Same-Day Available","No Hidden Fees","2,400+ Jobs Done"].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-white/75 text-sm">
                  <CheckCircle size={14} className="text-[#f97316] flex-shrink-0" />{t}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating emergency card */}
        <div className="hidden xl:block absolute right-16 bottom-16 bg-white rounded-xl shadow-2xl p-6 w-52">
          <div className="text-[10px] font-bold text-[#1e3a5f] uppercase tracking-wide mb-1">Emergency? Call now</div>
          <a href="tel:2505550198" className="text-xl font-bold text-[#f97316] hover:text-[#ea6d10] transition-colors block">(250) 555-0198</a>
          <p className="text-xs text-gray-500 mt-1">Available 24/7 for urgent repairs</p>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-gray-400">
            <Clock size={11} /> Avg. response: 2 hrs
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fade} className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">Our Services</motion.p>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-[#1e3a5f] tracking-tight">Everything your home needs.</motion.h2>
            <motion.p variants={fade} className="mt-3 text-[#6b7280] max-w-lg">One call handles it all. Our licensed team covers plumbing, HVAC, electrical, and more.</motion.p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <motion.div key={svc.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${svc.badge}`}>
                  <svc.icon size={18} />
                </div>
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-2">{svc.name}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed mb-4">{svc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#f97316]">{svc.price}</span>
                  <a href="#contact" className="text-xs font-semibold text-[#1e3a5f] flex items-center gap-1 group-hover:text-[#f97316] transition-colors">
                    Book <ChevronRight size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-16 px-6 bg-[#1e3a5f]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Shield,       title: "Licensed & Insured",  desc: "Every tech fully licensed, bonded, and insured for your protection." },
            { icon: Clock,        title: "Same-Day Service",    desc: "Call before noon and we'll typically be there the same day." },
            { icon: CheckCircle,  title: "Upfront Pricing",     desc: "We quote before we start. No surprises on your final invoice." },
            { icon: Star,         title: "4.9★ Google Rating",  desc: "Over 500 five-star reviews from homeowners across the Island." },
          ].map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-12 h-12 rounded-full bg-[#f97316]/20 flex items-center justify-center mx-auto mb-4">
                <item.icon size={20} className="text-[#f97316]" />
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
              <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fade} className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">Transparent Pricing</motion.p>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-[#1e3a5f] tracking-tight">No surprises. Ever.</motion.h2>
            <motion.p variants={fade} className="mt-3 text-[#6b7280] max-w-lg">We quote your job before starting. These are standard starting rates - contact us for a free exact quote.</motion.p>
          </motion.div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`rounded-xl p-7 border ${tier.highlight ? "border-[#f97316] shadow-xl ring-1 ring-[#f97316]/30" : "border-gray-200"}`}>
                {tier.highlight && (
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#f97316] mb-3">Most Common</div>
                )}
                <div className="text-sm font-semibold text-[#6b7280] mb-1">{tier.name}</div>
                <div className="text-3xl font-bold text-[#1e3a5f] mb-1">{tier.price}</div>
                <div className="text-xs text-[#9ca3af] mb-6">{tier.unit}</div>
                <ul className="space-y-2.5 mb-7">
                  {tier.items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                      <CheckCircle size={14} className="text-[#f97316] flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <a href="#contact"
                  className={`block text-center text-sm font-bold py-3 rounded-md transition-colors ${tier.highlight ? "bg-[#f97316] text-white hover:bg-[#ea6d10]" : "bg-[#1e3a5f] text-white hover:bg-[#163058]"}`}>
                  {tier.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-6 bg-[#f8fafc] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">Simple Process</p>
            <h2 className="text-3xl font-bold text-[#1e3a5f]">From call to done - fast.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-7 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gray-200" />
            {[
              { step: "1", title: "Call or Request Online",  desc: "Give us a call or fill out the form below. We'll get you scheduled - often the same day." },
              { step: "2", title: "We Diagnose & Quote",     desc: "Our tech arrives on time, diagnoses the issue, and gives a written upfront quote before any work starts." },
              { step: "3", title: "Job Done Right",          desc: "We do the work, clean up completely, and don't leave until you're 100% satisfied." },
            ].map((item, i) => (
              <motion.div key={item.step}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center relative">
                <div className="w-14 h-14 rounded-full bg-[#1e3a5f] text-white font-bold text-xl flex items-center justify-center mx-auto mb-5 relative z-10 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-[#1e3a5f] text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="reviews" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fade} className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">Customer Reviews</motion.p>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">Don&apos;t just take our word for it.</motion.h2>
            <motion.div variants={fade} className="flex items-center justify-center gap-1 mt-4">
              {[0,1,2,3,4].map(i => <Star key={i} size={18} fill="#f97316" className="text-[#f97316]" />)}
              <span className="text-[#1e3a5f] font-bold ml-2">4.9</span>
              <span className="text-[#9ca3af] text-sm ml-1">· 500+ Google Reviews</span>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div key={r.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#f8fafc] rounded-xl p-7 border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {[0,1,2,3,4].map(j => <Star key={j} size={13} fill="#f97316" className="text-[#f97316]" />)}
                </div>
                <p className="text-[#374151] text-sm leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-[#1e3a5f] text-sm">{r.name}</div>
                    <div className="flex items-center gap-1 text-[11px] text-[#9ca3af]">
                      <MapPin size={10} />{r.loc}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="relative h-80 md:h-[420px] rounded-xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80" alt="Our team" fill className="object-cover" unoptimized />
            <div className="absolute bottom-5 left-5 bg-white rounded-lg px-4 py-3 shadow-md">
              <div className="text-2xl font-bold text-[#1e3a5f]">16+</div>
              <div className="text-xs text-[#6b7280]">Years in Business</div>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fade} className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">About Us</motion.p>
            <motion.h2 variants={fade} className="text-3xl font-bold text-[#1e3a5f] leading-tight">Serving Vancouver Island families since 2008.</motion.h2>
            <motion.p variants={fade} className="mt-5 text-[#6b7280] leading-relaxed">
              Peak Home Services started as a one-man plumbing operation in Nanaimo. Today we&apos;re a team of 14 licensed tradespeople serving the entire mid-Island region. Same values, bigger team.
            </motion.p>
            <motion.p variants={fade} className="mt-4 text-[#6b7280] leading-relaxed">
              We built this business on word-of-mouth. Our reputation for honest pricing, on-time arrivals, and clean workmanship keeps homeowners calling us back year after year.
            </motion.p>
            <motion.div variants={fade} className="mt-8 grid grid-cols-3 gap-4">
              {[["2,400+","Jobs Done"],["14","Licensed Techs"],["24/7","Emergency"]].map(([v,l]) => (
                <div key={l} className="text-center bg-white rounded-lg p-4 border border-gray-100">
                  <div className="text-2xl font-bold text-[#1e3a5f]">{v}</div>
                  <div className="text-xs text-[#6b7280] mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="py-16 px-6 bg-[#1e3a5f]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">Service Area</p>
            <h2 className="text-3xl font-bold text-white mb-4">We come to you.</h2>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Serving Nanaimo and the entire mid-Vancouver Island region. Not sure if we cover your area? Just call - we&apos;ll let you know right away.
            </p>
            <div className="flex flex-wrap gap-2">
              {areas.map(area => (
                <span key={area} className="inline-flex items-center gap-1 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">
                  <MapPin size={9} className="text-[#f97316]" />{area}
                </span>
              ))}
            </div>
          </div>
          <div className="relative h-60 md:h-72 rounded-xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" alt="Service area" fill className="object-cover opacity-50" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fade} className="text-xs font-bold uppercase tracking-widest text-[#f97316] mb-2">Get In Touch</motion.p>
            <motion.h2 variants={fade} className="text-3xl font-bold text-[#1e3a5f] mb-5">Get your free quote.</motion.h2>
            <motion.p variants={fade} className="text-[#6b7280] mb-8 leading-relaxed text-sm">
              Fill out the form and we&apos;ll get back to you within a few hours with pricing. For urgent issues, call us directly.
            </motion.p>
            <motion.div variants={fade} className="space-y-5">
              <a href="tel:2505550198" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#f97316] flex items-center justify-center flex-shrink-0 group-hover:bg-[#ea6d10] transition-colors">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-[#9ca3af] uppercase tracking-wide font-bold">Call or Text</div>
                  <div className="text-lg font-bold text-[#1e3a5f] group-hover:text-[#f97316] transition-colors">(250) 555-0198</div>
                </div>
              </a>
              <a href="mailto:info@peakhomeservices.ca" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#1e3a5f]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#9ca3af] uppercase tracking-wide font-bold">Email</div>
                  <div className="text-sm font-medium text-[#1e3a5f] group-hover:text-[#f97316] transition-colors">info@peakhomeservices.ca</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-[#1e3a5f]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#9ca3af] uppercase tracking-wide font-bold">Hours</div>
                  <div className="text-sm text-[#374151]">Mon–Fri 7am–6pm · Sat 8am–4pm</div>
                  <div className="text-xs text-[#f97316] font-bold mt-0.5">24/7 Emergency Line Available</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <form className="bg-[#f8fafc] rounded-xl p-7 border border-gray-100 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Name *</label>
                  <input type="text" placeholder="Your name" required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f] bg-white transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Phone</label>
                  <input type="tel" placeholder="(250) 555-0000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f] bg-white transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">Email *</label>
                <input type="email" placeholder="your@email.com" required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f] bg-white transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">Service Needed</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f] bg-white transition-colors appearance-none">
                  <option value="">Select a service...</option>
                  <option>Plumbing Repair</option>
                  <option>Heating & Cooling</option>
                  <option>Electrical</option>
                  <option>Drain Cleaning</option>
                  <option>Emergency Repair</option>
                  <option>Home Inspection</option>
                  <option>Other / Not Sure</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">Describe the issue</label>
                <textarea rows={4} placeholder="Tell us what's going on and we'll get back to you with a quote..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1e3a5f] bg-white transition-colors resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-[#f97316] hover:bg-[#ea6d10] text-white font-bold py-4 rounded-lg transition-colors text-sm uppercase tracking-wide flex items-center justify-center gap-2">
                Request a Free Quote <ArrowRight size={14} />
              </button>
              <p className="text-xs text-[#9ca3af] text-center">We respond within 2 business hours. No obligation.</p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#111827] text-white pt-14 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-[#f97316] rounded-md flex items-center justify-center">
                  <Wrench size={15} className="text-white" />
                </div>
                <span className="font-bold text-lg">Peak Home Services</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Licensed and insured plumbing, HVAC, and electrical services on Vancouver Island since 2008.
              </p>
              <a href="tel:2505550198" className="inline-flex items-center gap-2 mt-5 text-[#f97316] font-bold hover:text-orange-300 transition-colors text-sm">
                <Phone size={14} />(250) 555-0198
              </a>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-4">Services</h4>
              <ul className="space-y-2 text-white/50 text-sm">
                {["Plumbing","Heating & Cooling","Electrical","Drain Cleaning","Emergency Repairs","Home Inspections"].map(s => (
                  <li key={s}><a href="#services" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-4">Contact</h4>
              <ul className="space-y-3 text-white/50 text-sm">
                <li className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 flex-shrink-0 text-[#f97316]" />123 Nicol St, Nanaimo, BC V9R 4S6</li>
                <li className="flex items-center gap-2"><Phone size={13} className="text-[#f97316]" />(250) 555-0198</li>
                <li className="flex items-center gap-2"><Mail size={13} className="text-[#f97316]" />info@peakhomeservices.ca</li>
                <li className="flex items-start gap-2"><Clock size={13} className="mt-0.5 flex-shrink-0 text-[#f97316]" />Mon–Fri 7am–6pm · Sat 8am–4pm<br />24/7 Emergency Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <span>© 2025 Peak Home Services Ltd. All rights reserved.</span>
            <span>Licensed Plumbing & Gas BC #12345 · Electrical #67890 · Fully Insured</span>
          </div>
        </div>
      </footer>

      <div className="h-20" />
    </div>
  );
}
