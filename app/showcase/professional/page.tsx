"use client";

// Style: Clean Professional — inspired by Stripe / McKinsey
// Pure white, precise grid, large statement headline, data-driven proof,
// structured sections, minimal decoration, corporate authority
// Typography: System sans-serif throughout

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Shield, Users, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import ShowcaseNav from "@/components/layout/showcase-nav";

const fade = {
  hidden:{ opacity:0, y:16 },
  show:{ opacity:1, y:0, transition:{ duration:0.55, ease:[0.22,1,0.36,1] as [number,number,number,number] } },
};
const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.09 } } };

const services = [
  {
    icon: TrendingUp,
    title:"Wealth Management",
    desc:"Evidence-based portfolio construction tailored to your financial timeline, risk tolerance, and goals.",
    bullets:["Asset allocation & rebalancing","Tax-efficient investing","Retirement income planning","ESG integration available"],
  },
  {
    icon: Shield,
    title:"Risk & Insurance",
    desc:"Comprehensive analysis of your exposure with solutions that fit your life and budget precisely.",
    bullets:["Life & disability coverage","Business continuation","Estate liability protection","Annual policy reviews"],
  },
  {
    icon: Users,
    title:"Corporate Advisory",
    desc:"Strategic financial guidance for owners navigating growth, succession, or liquidity events.",
    bullets:["Business valuation","Succession planning","Key-person insurance","M&A financial advisory"],
  },
];

const articles = [
  { title:"Rate Rises and Your Portfolio: What to Do in 2025", date:"March 2025", cat:"Market Insights", seed:"finance-art1" },
  { title:"When to Review Your Life Insurance Coverage", date:"February 2025", cat:"Planning", seed:"finance-art2" },
  { title:"Succession Planning: Starting the Conversation Early", date:"January 2025", cat:"Business", seed:"finance-art3" },
];

const team = [
  { name:"David Harbour", role:"Managing Director, CFP®", bio:"22 years guiding high-net-worth families and business owners through every stage of their financial journey.", seed:"prof-team1" },
  { name:"Lena Reeves", role:"Senior Financial Advisor", bio:"Specialises in retirement income planning and tax-efficient investment strategies for pre-retirees.", seed:"prof-team2" },
  { name:"Marcus Chen", role:"Portfolio Analyst, CFA®", bio:"Quantitative portfolio construction with a focus on risk-adjusted returns across all market cycles.", seed:"prof-team3" },
];

export default function ProfessionalShowcase() {
  const [openFaq, setOpenFaq] = useState<number|null>(null);

  return (
    <div className="bg-white" style={{fontFamily:"system-ui, -apple-system, sans-serif"}}>
      <ShowcaseNav />

      {/* ── Fictional nav ── */}
      <header className="fixed top-10 left-0 right-0 z-40 bg-white border-b border-[#e5e7eb] h-[60px] flex items-center">
        <div className="max-w-6xl mx-auto px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#1e3a8a] rounded flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">HA</span>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-gray-900 leading-none">Harbour Advisory</div>
              <div className="text-[9px] text-gray-400 leading-none mt-px">Group</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-[13px] text-gray-500">
            {["Services","About Us","Insights","Contact"].map(l=>(
              <a key={l} href="#" className="hover:text-gray-900 transition-colors">{l}</a>
            ))}
          </nav>
          <a href="#" className="bg-[#1e3a8a] text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg hover:bg-[#1e40af] transition-colors">
            Book a Consultation
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-[60px] bg-white">
        <div className="max-w-6xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fade} className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-2">
                {["prof-av1","prof-av2","prof-av3"].map(s=>(
                  <div key={s} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src={`https://picsum.photos/seed/${s}/50/50`} alt="" fill className="object-cover" unoptimized/>
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500">Trusted by 1,800+ Canadian families</span>
            </motion.div>
            <motion.h1 variants={fade} className="text-[clamp(2.4rem,5vw,4rem)] font-bold text-gray-900 leading-tight tracking-tight">
              Your financial future,<br/>built on solid ground.
            </motion.h1>
            <motion.p variants={fade} className="mt-5 text-base text-gray-500 leading-relaxed max-w-lg">
              Harbour Advisory Group provides independent, fee-based financial planning for individuals, families, and business owners across British Columbia.
            </motion.p>
            <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
              <a href="#" className="inline-flex items-center gap-2 bg-[#1e3a8a] text-white text-sm font-semibold px-6 py-3.5 rounded-lg hover:bg-[#1e40af] transition-colors">
                Book a Free Call <ArrowRight size={15}/>
              </a>
              <a href="#" className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 text-sm font-medium px-6 py-3.5 rounded-lg hover:border-gray-400 transition-colors">
                Our Services
              </a>
            </motion.div>
            <motion.div variants={fade} className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              {[["$2.4B+","Assets Under Management"],["1,800+","Client Relationships"],["25+ yrs","Average Experience"]].map(([v,l])=>(
                <div key={l}>
                  <div className="text-xl font-bold text-gray-900">{v}</div>
                  <div className="text-xs text-gray-400 mt-1 leading-tight">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.2 }}
            className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl">
            <Image src="https://picsum.photos/seed/harbour-hero/700/900" alt="Harbour Advisory" fill className="object-cover" unoptimized priority/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/60 to-transparent flex items-end p-8">
              <div>
                <div className="text-white text-sm font-medium">Independent · Fee-Based · Fiduciary</div>
                <div className="text-white/60 text-xs mt-1">Registered with the BC Securities Commission</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div className="bg-gray-50 border-y border-gray-100 py-5 px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {["CFP® Certified","CFA® Charterholder","IIROC Registered","25+ Years Experience","Fee-Based Only"].map(t=>(
            <div key={t} className="flex items-center gap-2 text-xs text-gray-500 font-medium">
              <CheckCircle2 size={13} className="text-[#1e3a8a]"/>{t}
            </div>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once:true }} variants={stagger}>
            <motion.p variants={fade} className="text-xs font-semibold tracking-widest uppercase text-[#1e3a8a] mb-3">What We Do</motion.p>
            <motion.h2 variants={fade} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive financial solutions.</motion.h2>
            <motion.p variants={fade} className="text-base text-gray-500 max-w-xl mb-14">From day-to-day wealth management to complex estate planning, we provide expert advice at every stage.</motion.p>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((svc) => (
                <motion.div key={svc.title} variants={fade} className="border border-gray-100 rounded-xl p-7 hover:border-[#1e3a8a]/30 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-[#1e3a8a]/8 rounded-lg flex items-center justify-center mb-5">
                    <svc.icon size={20} className="text-[#1e3a8a]"/>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{svc.desc}</p>
                  <ul className="space-y-2">
                    {svc.bullets.map(b=>(
                      <li key={b} className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="w-1 h-1 rounded-full bg-[#1e3a8a] flex-shrink-0"/>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-[#1e3a8a] mt-6 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={12}/>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-gray-50 py-24 px-8 border-y border-gray-100">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#1e3a8a] mb-3">Our Team</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Experienced. Independent. On your side.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <div className="relative h-52">
                  <Image src={`https://picsum.photos/seed/${m.seed}/400/350`} alt={m.name} fill className="object-cover object-top" unoptimized/>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900">{m.name}</h3>
                  <p className="text-xs font-semibold text-[#1e3a8a] mt-0.5 mb-3">{m.role}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-24 px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_,i)=><Star key={i} size={18} className="fill-amber-400 text-amber-400"/>)}
          </div>
          <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed italic">
            &ldquo;Harbour Advisory helped us consolidate a complex estate and finally plan for retirement with real confidence. Their advice was clear, honest, and completely in our interest.&rdquo;
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden relative">
              <Image src="https://picsum.photos/seed/testimonial-prof/80/80" alt="" fill className="object-cover" unoptimized/>
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">Robert & Claire M.</div>
              <div className="text-xs text-gray-400">Victoria, BC · Client since 2017</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section className="bg-gray-50 py-24 px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#1e3a8a] mb-2">Insights</p>
              <h2 className="text-3xl font-bold text-gray-900">From our advisors.</h2>
            </div>
            <a href="#" className="text-sm font-semibold text-[#1e3a8a] hover:underline">View all articles</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((a) => (
              <div key={a.title} className="bg-white rounded-xl overflow-hidden border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
                <div className="relative h-44">
                  <Image src={`https://picsum.photos/seed/${a.seed}/500/350`} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized/>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1e3a8a] bg-[#1e3a8a]/8 px-2 py-0.5 rounded-full">{a.cat}</span>
                    <span className="text-[11px] text-gray-400">{a.date}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-[#1e3a8a] transition-colors">{a.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widests uppercase text-[#1e3a8a] mb-3">FAQ</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Common questions.</h2>
          <div className="space-y-2">
            {[
              { q:"What does 'fee-based' mean?", a:"We charge a transparent fee based on assets under management — not commissions. This means our advice is always in your best interest, not influenced by product sales." },
              { q:"How do I get started?", a:"Book a complimentary 30-minute discovery call. We'll discuss your situation, goals, and whether we're the right fit. No obligation, no sales pressure." },
              { q:"What's the minimum investment?", a:"We typically work with clients with $250,000+ in investable assets, though we make exceptions for young professionals with strong savings trajectories." },
              { q:"Are you regulated?", a:"Yes. Harbour Advisory Group is registered with the British Columbia Securities Commission (BCSC) and all advisors hold relevant professional designations." },
            ].map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform flex-shrink-0 ${openFaq===i?"rotate-180":""}`}/>
                </button>
                {openFaq===i && (
                  <div className="px-6 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1e3a8a] py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to take control of your financial future?</h2>
          <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">Schedule a no-obligation 30-minute discovery call. No pressure, no jargon — just an honest conversation.</p>
          <a href="#" className="inline-flex items-center gap-2 bg-white text-[#1e3a8a] text-sm font-bold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors">
            Book a Free Consultation <ArrowRight size={15}/>
          </a>
        </div>
      </section>

      <div className="h-20"/>
    </div>
  );
}

function Star({ size, className }: { size:number, className:string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}
