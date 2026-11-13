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
import aboutCtaPhoto from '../assets/images/about-cta-desk.jpg';

interface AboutProps {
  setCurrentPage: (page: any) => void;
}

function RollingCtaLabel({ text }: { text: string }) {
  return (
    <span className="relative inline-flex h-[1.25em] items-center overflow-hidden leading-[1.25]">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-focus-visible:translate-y-0">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:hidden"
      >
        {text}
      </span>
    </span>
  );
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
      accentBar: 'bg-[#389bff]',
      accentIcon: 'text-[#6db5ff] border-[#389bff]/30 bg-[#0066FF]/10',
      glowStyle: 'radial-gradient(circle at 85% 15%, rgba(0, 102, 255, 0.2), transparent 60%)',
    },
    {
      title: 'Our vision',
      copy: 'A world where every business works smarter, serves people better, and grows with confidence.',
      icon: Eye,
      accentBar: 'bg-[#2dd4bf]',
      accentIcon: 'text-[#5eead4] border-[#2dd4bf]/30 bg-[#14b8a6]/10',
      glowStyle: 'radial-gradient(circle at 85% 15%, rgba(20, 184, 166, 0.18), transparent 60%)',
    },
    {
      title: 'What we believe',
      copy: 'Technology should be clear, useful, and respectful of people’s time.',
      icon: Heart,
      accentBar: 'bg-[#a78bfa]',
      accentIcon: 'text-[#c4b5fd] border-[#a78bfa]/30 bg-[#7c3aed]/10',
      glowStyle: 'radial-gradient(circle at 85% 15%, rgba(124, 58, 237, 0.2), transparent 60%)',
    },
  ];

  return (
    <div className="mixon-about-page text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section
        id="about-hero"
        data-scroll-no-reveal=""
        className="relative isolate flex min-h-[clamp(520px,74svh,700px)] flex-col justify-center overflow-hidden bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14"
      >
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
                onClick={() => setCurrentPage('book-demo')}
                className="h-10 min-w-[145px]"
              >
                Book a demo
              </ExpandingArrowButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PURPOSE SECTION: Mission, Vision & Beliefs on Architectural Blueprint Grid */}
      {/* ========================================================================= */}
      <section
        id="about-purpose"
        data-theme="dark"
        data-scroll-no-reveal=""
        aria-label="Mission, vision, and core beliefs"
        className="dark-section relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-28 lg:pb-24"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 mb-12 sm:mb-16 text-left">
          <h2 className="about-purpose-heading max-w-4xl font-ptserif text-white">
            Businesses deserve better tools.
            <br className="hidden sm:inline" /> Everything we build starts with why.
          </h2>
          <p className="mt-5 max-w-[60ch] text-sm sm:text-base leading-[1.65] text-[#c7daf8] font-normal">
            Too much business software feels fragmented, rigid, and out of touch with real teams. Three principles guide how we build practical technology across operations, payments, and customer experiences.
          </p>
        </div>

        <div className="about-purpose-blueprint">
          {/* Full-bleed horizontal architectural rails spanning behind stepped cells */}
          <div className="about-purpose-rails-h" aria-hidden="true">
            <span className="about-purpose-rail-h" style={{ top: '4.5rem' }} />
            <span className="about-purpose-rail-h" style={{ top: '9rem' }} />
            <span className="about-purpose-rail-h" style={{ top: '14.5rem' }} />
            <span className="about-purpose-rail-h" style={{ top: '24.5rem' }} />
          </div>

          <div className="px-6 sm:px-10 lg:px-14">
            <div className="about-purpose-stage mx-auto w-full max-w-7xl">
              {/* Vertical blueprint column rails spanning top-to-bottom within stage */}
              <div className="about-purpose-rails-v" aria-hidden="true">
                <span className="about-purpose-rail-v left-0" />
                <span className="about-purpose-rail-v left-1/3" />
                <span className="about-purpose-rail-v left-2/3" />
                <span className="about-purpose-rail-v right-0" />
              </div>

              <div className="about-purpose-grid">
                {purposeCards.map(({ title, copy, icon: Icon, accentBar, accentIcon, glowStyle }, index) => (
                  <motion.article
                    key={title}
                    data-step={index}
                    initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.72,
                      delay: reduceMotion ? 0 : index * 0.14,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="about-purpose-card group text-left"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: glowStyle }}
                    />

                    <div className="relative space-y-6">
                      <span className={`inline-grid h-11 w-11 place-items-center rounded-[10px] border transition-transform duration-300 group-hover:scale-105 ${accentIcon}`}>
                        <Icon size={21} strokeWidth={1.75} />
                      </span>

                      <div className="space-y-3">
                        <h3 className="about-purpose-card-title">{title}</h3>
                        <p className="text-[15px] sm:text-base leading-[1.65] text-[#c7daf8] font-normal max-w-[36ch]">
                          {copy}
                        </p>
                      </div>
                    </div>

                    <div className="relative pt-2">
                      <span
                        aria-hidden="true"
                        className={`block h-[2px] w-8 rounded-full transition-all duration-300 group-hover:w-16 ${accentBar}`}
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
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

            {/* RIGHT COLUMN: Architectural Pure-White Sharp-Corner Value Cards */}
            <div className="lg:col-span-7 grid gap-4 sm:gap-5">
              {values.map((item, index) => {
                const ValueIcon = item.icon;
                return (
                <motion.article
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.99 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="about-value-card group relative rounded-none border border-[#04122b]/15 border-t-[3px] border-t-[#0755b8] bg-white p-6 transition-all duration-300 hover:border-t-[#0066FF] sm:p-7"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-[#04122b]/[0.08] pb-3.5">
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[#475569]">
                      {item.category}
                    </span>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-none border border-[#d6e4fa] bg-[#f4f8ff] text-[#0755b8] transition-colors duration-300 group-hover:border-[#0066FF] group-hover:bg-[#0066FF] group-hover:text-white">
                      <ValueIcon size={18} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                  <div className="pt-4">
                    <h3 className="about-value-title font-serif text-[22px] leading-[1.2] tracking-[-0.015em] text-[#04122b] sm:text-[25px]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl text-[14.5px] leading-[1.68] text-[#475569] sm:text-[15.5px]">
                      {item.quote}
                    </p>
                  </div>
                </motion.article>
              );})}
            </div>

          </div>
        </div>
      </section>

      {/* THE PEOPLE BEHIND MIXON */}
      <TeamCoverflow />

      {/* CLOSING SECTION — Jasper-style split CTA on Mixon blue */}
      <section className="about-split-cta" aria-labelledby="about-split-cta-heading">
        <div className="about-split-cta-rules" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="about-split-cta-frame">
          <div className="about-split-cta-copy">
            <div className="about-split-cta-copy-inner">
              <h2 id="about-split-cta-heading">
                <span className="about-split-cta-lead">Let&apos;s make your next chapter</span>
                <span className="about-split-cta-accent">easier.</span>
              </h2>
              <p>
                Wherever you are in the world, whether you are running a rental portfolio, a guest house, a ticketed event, a shop or a growing company that needs a better digital presence, we would like to hear what you want to improve.
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="about-split-cta-button group"
              >
                <RollingCtaLabel text="Start a conversation" />
              </button>
            </div>
          </div>

          <div className="about-split-cta-photo">
            <img
              src={aboutCtaPhoto}
              alt="Hands typing on a laptop at a desk"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
