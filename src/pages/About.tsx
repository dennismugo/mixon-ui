import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Globe, 
  Eye, 
  CheckCircle2, 
  Heart, 
  Layers, 
  Users, 
  Sparkles, 
  Target, 
  Compass, 
  Code2, 
  Smartphone, 
  Clock, 
  Check, 
  Shield, 
  Activity
} from 'lucide-react';
import MissionScrollReveal from '../components/ui/MissionScrollReveal';
import { ExpandingArrowButton } from '../components/ui/expanding-arrow-button';
import TeamCoverflow from '../components/TeamCoverflow';
import { DitheredStripeBand } from '../components/ui/DitheredStripeBand';
import MixonKeycaps from '../components/ui/MixonKeycaps';
import { HeroDotField } from '../components/ui/HeroDotField';

interface AboutProps {
  setCurrentPage: (page: any) => void;
}

export default function About({ setCurrentPage }: AboutProps) {
  const reduceMotion = useReducedMotion();
  const values = [
    {
      id: "01",
      title: "Clarity over complexity",
      category: "Architecture & Simplicity",
      tag: "Mixon Core Standard",
      icon: Layers,
      iconBg: "bg-amber-500 text-white",
      headline: "Delivering clarity over complexity in every system we engineer",
      quote: "We explain things like people, not manuals. If it needs a long manual, we built it wrong. Our software eliminates cognitive friction so teams execute without hesitation.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 215, 170, 0.45) 0%, transparent 65%)",
      storyLink: "Read the clarity framework"
    },
    {
      id: "02",
      title: "Craft in the details",
      category: "Design & Interaction Quality",
      tag: "Engineering Standard",
      icon: Sparkles,
      iconBg: "bg-[#0066FF] text-white",
      headline: "Uncompromising craft where every single interaction matters",
      quote: "Layouts, flows and code are finished properly. Good enough is never our standard. We obsess over edge cases and micro-moments so customers never experience a breakdown.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(191, 219, 254, 0.55) 0%, transparent 65%)",
      storyLink: "Explore our design system"
    },
    {
      id: "03",
      title: "Your progress is our progress",
      category: "Client Business Impact",
      tag: "Partnership Benchmark",
      icon: Activity,
      iconBg: "bg-emerald-500 text-white",
      headline: "Your operational progress is the only benchmark that counts",
      quote: "We measure ourselves by what changes in your business, not by the lines of code shipped. Features only succeed if they unlock real revenue, retention, and time saved.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(167, 243, 208, 0.45) 0%, transparent 65%)",
      storyLink: "See client case metrics"
    },
    {
      id: "04",
      title: "Access by design",
      category: "Mobile & Connectivity",
      tag: "Inclusive Architecture",
      icon: Smartphone,
      iconBg: "bg-cyan-500 text-white",
      headline: "Accessible by design across every device and network speed",
      quote: "Fast on the phones people actually carry, readable by everyone, and instant to begin. We optimize for high-latency mobile networks and intermittent connections across Africa.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(165, 243, 252, 0.45) 0%, transparent 65%)",
      storyLink: "How we build mobile-first"
    },
    {
      id: "05",
      title: "Honesty first",
      category: "Transparency & Ethics",
      tag: "Radical Candor",
      icon: Shield,
      iconBg: "bg-violet-600 text-white",
      headline: "Radical honesty first about what code and AI can deliver",
      quote: "We say what a product does today, what it does with AI, and what needs a person. No buzzwords, no inflated promises, and no hidden lock-in — just dependable software.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(221, 214, 254, 0.45) 0%, transparent 65%)",
      storyLink: "Our AI disclosure policy"
    },
    {
      id: "06",
      title: "Built to last",
      category: "Scalability & Resilience",
      tag: "Enterprise Endurance",
      icon: Globe,
      iconBg: "bg-slate-900 text-white",
      headline: "Engineered to endure market shifts and regulatory changes",
      quote: "Secure, supported and ready to grow with you across markets and regulatory shifts. We build infrastructure meant to stand and transact for years, not just sprints.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 240, 138, 0.4) 0%, transparent 65%)",
      storyLink: "Review security architecture"
    }
  ];

  const purposeCards = [
    {
      title: 'Our mission',
      copy: 'Make useful business technology easier to access and use through practical software and thoughtful digital services.',
      icon: Target,
      surface: 'bg-gradient-to-br from-[#1684ff] via-[#0875f5] to-[#0755b8] border-[#75b8ff]/50',
      iconSurface: 'bg-white/15 text-white ring-1 ring-white/20',
    },
    {
      title: 'Our vision',
      copy: 'A world where every business works smarter, serves people better, and grows with confidence.',
      icon: Eye,
      surface: 'bg-gradient-to-br from-[#0f766e] via-[#0b6b63] to-[#064e49] border-[#5eead4]/40',
      iconSurface: 'bg-white/15 text-white ring-1 ring-white/20',
    },
    {
      title: 'What we believe',
      copy: 'Technology should be clear, useful, and respectful of people’s time.',
      icon: Heart,
      surface: 'bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4c1d95] border-[#c4b5fd]/45',
      iconSurface: 'bg-white/15 text-white ring-1 ring-white/20',
    },
  ];

  return (
    <div className="mixon-about-page text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Option B crisp white surface + sweeping blue dot field */}
      {/* ========================================================================= */}
      <section
        id="about-hero"
        data-scroll-no-reveal=""
        className="relative isolate flex min-h-[calc(100svh-7rem)] flex-col justify-center overflow-hidden border-b border-gray-200/80 bg-white px-6 pb-14 pt-12 sm:px-10 sm:pb-16 sm:pt-16 lg:px-14"
      >
        <HeroDotField
          className="text-[#0066FF]/65"
          fine
          lively
          streams
          fillFootOnPhones
          solidDots
        />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-center"
          >
            <h1 className="max-w-4xl font-display text-[2.45rem] font-medium leading-[1.05] tracking-[-0.045em] text-[#10203a] sm:text-5xl lg:text-[3.7rem]">
              <span data-hero-pattern-hole="text">
                Technology that makes business <span className="text-[#0755b8]">easier to run.</span>
              </span>
            </h1>

            {/* 3D Tactile MIXON Keycaps with Entrance and Scroll Physics */}
            <div data-hero-pattern-hole="box" className="inline-flex max-w-full justify-center">
              <MixonKeycaps className="!w-fit" />
            </div>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#52647d] sm:text-base sm:leading-7">
              <span data-hero-pattern-hole="text">
                This is how practical software, connected telco rails, and modern digital platforms should work — eliminating friction and fitting how teams actually operate.
              </span>
            </p>
            <div data-hero-pattern-hole="box" className="mt-6 inline-flex justify-center">
              <ExpandingArrowButton
                size="pill"
                onClick={() => setCurrentPage('contact')}
                className="h-10 min-w-[145px]"
              >
                Book a demo
              </ExpandingArrowButton>
            </div>
          </motion.div>

          <div className="mt-12 grid w-full grid-cols-1 gap-3 text-left sm:mt-14 sm:grid-cols-3 sm:gap-4 lg:mt-16 lg:gap-5">
            {purposeCards.map(({ title, copy, icon: Icon, surface, iconSurface }, index) => (
              <motion.article
                key={title}
                data-hero-pattern-hole="box"
                initial={reduceMotion ? false : { opacity: 0, y: 38, scale: 0.975 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: reduceMotion ? 0 : 0.78, delay: reduceMotion ? 0 : index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative min-h-[240px] overflow-hidden rounded-[14px] border p-6 text-white shadow-[0_18px_42px_rgba(9,38,84,0.16)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(9,38,84,0.24)] sm:min-h-[258px] sm:p-7 ${surface}`}
              >
                <div aria-hidden="true" className="absolute -bottom-20 -right-12 h-48 w-48 rounded-full bg-white/15 blur-3xl transition-transform duration-500 group-hover:scale-125" />
                <div className="relative flex h-full flex-col">
                  <span className={`grid h-14 w-14 place-items-center rounded-[15px] ${iconSurface}`}>
                    <Icon size={27} strokeWidth={1.75} />
                  </span>
                  <h2 className="mt-6 font-display text-xl font-semibold tracking-[-0.03em] text-white sm:text-[22px]">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/85 sm:text-[15px] sm:leading-[1.65]">{copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTRO SECTION: "Our Story" with Scroll Text-Reveal & Avatar Cluster */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 border-b border-gray-200/80 bg-white px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-5xl mx-auto text-left space-y-9">
          
          <div className="space-y-4">
            <span className="text-sm font-sans font-medium text-gray-500 block">
              Our story
            </span>
            <MissionScrollReveal />
          </div>

          {/* Avatar Cluster with Social Proof (Matching User Reference) */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center -space-x-2.5">
              <img 
                src="/avatars/avatar1.jpg" 
                alt="Community member" 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#FAF9F5] shadow-xs" 
              />
              <img 
                src="/avatars/avatar2.jpg" 
                alt="Community member" 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#FAF9F5] shadow-xs" 
              />
              <img 
                src="/avatars/avatar4.jpg" 
                alt="Community member" 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#FAF9F5] shadow-xs" 
              />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-600">
              Join <span className="font-semibold text-gray-900">1,000+ businesses</span> and forward-thinking teams worldwide.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CORE PHILOSOPHY / OUR VALUES: Dark Obsidian 2-Column Split */}
      {/* ========================================================================= */}
      <section id="security" data-theme="dark" className="dark-section pt-0 pb-24 sm:pb-32 text-white border-b border-white/10 px-6 sm:px-10 lg:px-14 relative" style={{ background: 'linear-gradient(112deg, #0a2e68 0%, #0755b8 50%, #061d46 100%)' }}>
        
        {/* Tovnia-inspired Dither Stripe Band on Top of the Blue Section */}
        <div className="-mx-6 sm:-mx-10 lg:-mx-14 mb-16 sm:mb-20 overflow-hidden pointer-events-none select-none">
          <DitheredStripeBand
            rowHeight={16}
            bands={[
              { a: '#ffffff', b: '#d6e8f7', mix: true },
              { a: '#d6e8f7', b: '#38bdf8', mix: true },
              { a: '#38bdf8', b: '#0066ff', mix: true },
              { a: '#0066ff', b: '#d9e88e', mix: true },
              { a: '#d9e88e', b: '#d9e88e', mix: false },
              { a: '#d9e88e', b: '#0a2e68', mix: true },
              { a: '#0a2e68', b: '#0a2e68', mix: false },
            ]}
          />
        </div>

        {/* Ambient Brighter Blue Radial Glows clipped cleanly inside absolute container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" 
            style={{ background: 'radial-gradient(circle, rgba(56, 145, 255, 0.16) 0%, transparent 70%)' }} 
          />
        </div>

        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Serif Headline, Description, and Brighter Blue Solid Pill Button */}
            <div className="lg:col-span-5 space-y-6 text-left lg:sticky lg:top-28 self-start">
              <span className="text-xs font-mono uppercase tracking-widest text-[#a9d1ff] font-bold block">
                CORE PHILOSOPHY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal text-white tracking-tight leading-[1.12]">
                Our values
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-md">
                What these commitments actually mean in day-to-day engineering, architecture, and client partnership.
              </p>
              <div className="pt-4">
                <ExpandingArrowButton
                  size="pill"
                  variant="solid-blue"
                  onClick={() => setCurrentPage('contact')}
                  className="h-11 min-w-[175px] text-xs sm:text-[13.5px]"
                >
                  Talk to engineering
                </ExpandingArrowButton>
              </div>
            </div>

            {/* RIGHT COLUMN: Stacked Items with Horizontal Separator Lines and Brighter Blue Arrows */}
            <div className="lg:col-span-7 grid gap-4 sm:gap-5">
              {values.map((item, index) => {
                const ValueIcon = item.icon;
                const surfaces = ['bg-[#0d3670]/75', 'bg-[#0b3979]/80', 'bg-[#0a326d]/85'];
                return (
                <motion.article
                  key={item.id} 
                  initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 p-5 shadow-[0_16px_40px_rgba(0,14,48,.16)] transition-all duration-500 hover:-translate-y-1 hover:border-[#79b9ff]/35 hover:shadow-[0_22px_48px_rgba(0,14,48,.24)] sm:p-6 ${surfaces[index % surfaces.length]}`}
                >
                  <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#247cf0]/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-start gap-4 sm:gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] border border-[#90c5ff]/25 bg-[#1558a8]/60 text-[#a9d1ff] shadow-inner shadow-white/5 sm:h-[54px] sm:w-[54px]">
                      <ValueIcon size={24} strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="font-serif text-xl tracking-tight text-white transition-colors duration-300 group-hover:text-[#d8ebff] sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-2xl text-sm leading-6 text-[#d0def2] sm:text-base sm:leading-7">
                        {item.quote}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );})}
            </div>

          </div>
        </div>
      </section>

      {/* THE PEOPLE BEHIND MIXON */}
      <TeamCoverflow />

      {/* CLOSING SECTION — Vessa-style dither-field CTA */}
      <section className="dither-cta-section py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="dither-cta-plate">
          <h2 className="font-display">
            Let's make your next chapter easier.
          </h2>
          <div className="dither-cta-desc">
            Wherever you are in the world, whether you are running a rental portfolio, a guest house, a ticketed event, a shop or a growing company that needs a better digital presence, we would like to hear what you want to improve.
          </div>
          <ExpandingArrowButton
            size="pill"
            onClick={() => setCurrentPage('contact')}
            className="mx-auto h-11 min-w-[190px]"
          >
            Start a conversation
          </ExpandingArrowButton>
          <div className="text-[11px] font-mono text-white/50 tracking-wide" style={{ marginTop: '-0.5rem' }}>
            We reply within one business day · Nairobi HQ &amp; Global Remote
          </div>
        </div>
      </section>
    </div>
  );
}

