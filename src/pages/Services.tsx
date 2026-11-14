import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Code2, 
  Smartphone, 
  Search, 
  CreditCard, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  Cpu, 
  ChevronRight, 
  Zap, 
  MessageSquare, 
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { ThirtyDayImpactSection } from '../components/ThirtyDayImpactSection';
import ProductServiceHero from '../components/ProductServiceHero';
import RollingButtonText from '../components/RollingButtonText';
import {
  WebServiceDiagram,
  AppServiceDiagram,
  SeoServiceDiagram,
  PaymentsServiceDiagram,
  EcommerceServiceDiagram,
  AiServiceDiagram,
} from '../components/illustrations/ServiceDiagramIllustrations';

interface ServicesProps {
  setCurrentPage: (page: any) => void;
}

export default function Services({ setCurrentPage }: ServicesProps) {
  const reduceMotion = useReducedMotion();

  const services = [
    {
      id: 'web-dev',
      number: '01',
      category: 'Web Architecture',
      title: 'Web Design & Development',
      tagline: 'Fast, conversion-focused websites engineered for trust.',
      description: 'Responsive web platforms that unify your brand, accelerate load times, and turn visitors into qualified enquiries.',
      icon: Code2,
      accentColor: 'from-blue-600 to-indigo-600',
      badge: 'Core Platform',
      whatYouGet: [
        'Sub-second load speeds with technical SEO configured from day one',
        'Custom mobile-first layouts tailored to your brand identity',
        'Intuitive CMS and client dashboards your team can update easily'
      ],
      howWeWork: [
        { step: '01', title: 'Discover', desc: 'Clarify business goals, audience intent, and primary customer actions.' },
        { step: '02', title: 'Design', desc: 'Structure wireframes, interaction fidelity, and design system before coding.' },
        { step: '03', title: 'Build & Test', desc: 'Develop with modern TypeScript & responsive tests across mobile & desktop.' },
        { step: '04', title: 'Launch & Measure', desc: 'Deploy with zero-downtime, monitor analytics, and refine post-launch.' }
      ],
      bestFor: 'Businesses establishing a professional web presence or redesigning an outdated site.',
      ctaText: 'Get a website proposal',
      ctaTarget: 'contact',
      pageId: 'service-web',
      badgeMeta: 'Next.js · React · Web Vitals · CMS',
      metric: '< 1.2s',
      metricLabel: 'average load time · 99.9% uptime'
    },
    {
      id: 'app-dev',
      number: '02',
      category: 'Mobile & USSD',
      title: 'App Development',
      tagline: 'Turn daily operational processes into software people use.',
      description: 'Mobile apps and offline-resilient USSD menus built for Android, iOS, and basic feature phones across Africa.',
      icon: Smartphone,
      accentColor: 'from-indigo-600 to-violet-600',
      badge: 'Native & Hybrid',
      whatYouGet: [
        'Native Android and iOS mobile applications with fluid UX',
        'Interactive USSD menus reachable on any phone without data',
        'Offline-first sync for areas with intermittent mobile coverage'
      ],
      howWeWork: [
        { step: '01', title: 'Define', desc: 'Map user journey bottlenecks, offline requirements, and success metrics.' },
        { step: '02', title: 'Prototype', desc: 'Interactive clickable Figma prototype to test flows before touching code.' },
        { step: '03', title: 'Build & Test', desc: 'Engineer with rigorous automated testing under real-world connectivity.' },
        { step: '04', title: 'Launch & Support', desc: 'Handle App Store/Play Store submissions, telemetry, and ongoing updates.' }
      ],
      bestFor: 'Teams digitising an operational workflow into intuitive mobile software.',
      ctaText: 'Discuss your app idea',
      ctaTarget: 'contact',
      pageId: 'service-app',
      badgeMeta: 'iOS · Android · USSD · Offline-First',
      metric: '100%',
      metricLabel: 'phone reach without mobile data'
    },
    {
      id: 'seo-marketing',
      number: '03',
      category: 'Search & Discovery',
      title: 'SEO & Digital Marketing',
      tagline: 'Be found on Google, ChatGPT, and Gemini.',
      description: 'Answer-engine optimization, technical site speed audits, and digital acquisition campaigns that drive real pipeline revenue.',
      icon: Search,
      accentColor: 'from-emerald-600 to-teal-600',
      badge: 'AEO & GEO Ready',
      whatYouGet: [
        'Answer-Engine & Generative-Engine Optimisation (AEO & GEO)',
        'Technical crawl audits, schema architecture, and speed tuning',
        'High-deliverability Bulk SMS campaigns for instant direct reach'
      ],
      howWeWork: [
        { step: '01', title: 'Audit', desc: 'Analyze current search footprint, technical indexability, and competitor gaps.' },
        { step: '02', title: 'Plan', desc: 'Prioritize highest-impact keywords, schema markups, and content clusters.' },
        { step: '03', title: 'Execute', desc: 'Ship structured data, technical fixes, authoritative content, and campaigns.' },
        { step: '04', title: 'Refine', desc: 'Review monthly conversion dashboards and adapt to search engine algorithms.' }
      ],
      bestFor: 'Companies seeking higher organic search placement and qualified inbound pipeline.',
      ctaText: 'Plan your digital growth',
      ctaTarget: 'contact',
      pageId: 'service-seo',
      badgeMeta: 'Technical SEO · AEO/GEO · Schema · SMS',
      metric: '3.8x',
      metricLabel: 'increase in qualified traffic'
    },
    {
      id: 'payments-integrations',
      number: '04',
      category: 'Fintech & APIs',
      title: 'Payments & Integrations',
      tagline: 'Automated settlement rails with zero discrepancy.',
      description: 'Payment integration connecting M-Pesa Daraja, bank rails, and card checkout directly to your ERP and inventory.',
      icon: CreditCard,
      accentColor: 'from-sky-600 to-blue-700',
      badge: 'Zero-Leakage Rails',
      whatYouGet: [
        'Direct M-Pesa Daraja STK Push, C2B webhooks, and card rails',
        'Automated ledger reconciliation with zero manual discrepancies',
        'Custom REST and GraphQL API bridges linking disparate systems'
      ],
      howWeWork: [
        { step: '01', title: 'System Map', desc: 'Document existing tools, API endpoints, webhook topologies, and data flows.' },
        { step: '02', title: 'Architect', desc: 'Design secure, idempotent connection architecture with failure recovery.' },
        { step: '03', title: 'Sandbox Test', desc: 'Run end-to-end payment simulations with edge cases and latency checks.' },
        { step: '04', title: 'Deploy & Monitor', desc: 'Go live with automated alerting, reconciliation logs, and ongoing support.' }
      ],
      bestFor: 'Businesses handling multi-channel payments, subscriptions, or branch reconciliation.',
      ctaText: 'Discuss an integration',
      ctaTarget: 'contact',
      pageId: 'service-payments',
      badgeMeta: 'M-Pesa Daraja · Stripe · Webhooks · Reconciliation',
      metric: '0',
      metricLabel: 'manual payment discrepancies'
    },
    {
      id: 'ecommerce',
      number: '05',
      category: 'Digital Retail',
      title: 'E-Commerce Development',
      tagline: 'Frictionless storefronts that make buying feel easy.',
      description: 'High-speed online stores with real-time stock sync, localized payment options, and automated order fulfillment.',
      icon: ShoppingBag,
      accentColor: 'from-rose-600 to-orange-600',
      badge: 'High Conversion',
      whatYouGet: [
        'Frictionless checkout flow with localized M-Pesa and card payments',
        'Real-time automated inventory tracking across multiple branches',
        'Automated order status tracking and receipts via SMS & email'
      ],
      howWeWork: [
        { step: '01', title: 'Catalog Audit', desc: 'Review product variants, inventory workflows, and shipping logistics.' },
        { step: '02', title: 'UX Flow', desc: 'Design smooth discovery, cart, checkout, and receipt confirmation journeys.' },
        { step: '03', title: 'Build Store', desc: 'Develop headless or full-stack store with payment gateway verification.' },
        { step: '04', title: 'Optimize', desc: 'Run live checkout audits, speed tuning, and conversion rate optimizations.' }
      ],
      bestFor: 'Retailers, wholesalers, and brands expanding into direct digital sales.',
      ctaText: 'Build your online store',
      ctaTarget: 'contact',
      pageId: 'service-ecommerce',
      badgeMeta: 'Headless · Real-Time Stock · 1-Click Pay · Speed',
      metric: '+34%',
      metricLabel: 'checkout completion lift'
    },
    {
      id: 'ai-automation',
      number: '06',
      category: 'Intelligent Systems',
      title: 'AI & Automation',
      tagline: 'Pragmatic background automation that saves real team hours.',
      description: 'Deterministic workflows connecting WhatsApp, emails, spreadsheets, and databases to eliminate repetitive manual work.',
      icon: Sparkles,
      accentColor: 'from-amber-600 to-orange-600',
      badge: 'Human-in-the-Loop',
      whatYouGet: [
        'Automated WhatsApp and email inquiry processing and routing',
        'Deterministic background sync across spreadsheets and databases',
        'Strict human-in-the-loop safeguards on sensitive business decisions'
      ],
      howWeWork: [
        { step: '01', title: 'Identify', desc: 'Pinpoint exactly where team hours and repetitive data entry get clogged.' },
        { step: '02', title: 'Evaluate', desc: 'Assess ROI feasibility, data security, and decide between rule-based vs AI.' },
        { step: '03', title: 'Pilot', desc: 'Deploy a tightly scoped, assisted pilot with human oversight safeguards.' },
        { step: '04', title: 'Scale', desc: 'Integrate into core operational stack only once reliability is proven.' }
      ],
      bestFor: 'Operations teams seeking to cut manual data entry without buzzwords.',
      ctaText: 'Explore an AI use case',
      ctaTarget: 'contact',
      pageId: 'service-ai',
      badgeMeta: 'Deterministic · Explainable · Safeguards · Time Saved',
      metric: '15+ hrs',
      metricLabel: 'saved weekly per team'
    }
  ];

  return (
    <div className="mixon-interior-page mixon-services-page bg-white text-gray-900 pt-28 pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Sparkles,
          name: "Digital Services",
          tag: "Engineering & Growth"
        }}
        title="Build what you need. Connect what you use. Scale faster."
        subtitle="From custom web platforms and mobile apps to payment rails and intelligent automation, Mixon crafts reliable digital software shaped around your business goals."
        primaryCta={{
          text: "Get a free recommendation",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "Explore our packages",
          onClick: () => setCurrentPage('pricing')
        }}
      />

      {/* =========================================================================
          HUDDLE.WORKS-STYLE CASCADING STACKED CARD DECK (FULL WIDTH, ZERO RADIUS)
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#0066FF] font-semibold">
              ENGINEERING CAPABILITIES
            </span>
            <h2
              className="mt-2.5 text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#04122b] tracking-[-0.03em] leading-[1.12]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Engineered around how your business actually works
            </h2>
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              Six production-tested software engineering pillars built to scale Kenyan enterprises, fintech operations, and customer reach. Scroll to explore or click any service tab to jump directly.
            </p>
          </div>

          {/* Stacked Cards Deck Container */}
          <div className="w-full relative pb-8 sm:pb-12">
          {services.map((service, idx) => (
            <div
              key={service.id}
              id={`service-deck-${service.id}`}
              className="huddle-deck-card w-full rounded-none border border-[#d4e0f0] bg-white group shadow-[0_16px_36px_rgba(4,18,43,0.06)]"
              style={{ '--deck-index': idx } as React.CSSProperties}
            >
              {/* Card Body: Left Column (Concise Typography & Bullets) + Right Column (Vector Diagram) */}
              <div className="w-full p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-white rounded-none">
                {/* Left Column */}
                <div className="lg:col-span-7 text-left space-y-3.5">
                  <div>
                    <h3
                      className="font-ptserif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#04122b] tracking-[-0.025em] leading-[1.14]"
                      style={{ fontFamily: "'PT Serif', serif" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-semibold text-[#0066FF] mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl">
                    {service.description}
                  </p>

                  {/* 3 Concise Deliverables (1-line each) */}
                  <ul className="pt-1 space-y-1.5 text-xs sm:text-[13px] text-slate-700">
                    {service.whatYouGet.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Clean CTA Buttons (Sharp 0px Radius) */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setCurrentPage(service.pageId)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-semibold rounded-none transition-colors cursor-pointer group"
                    >
                      <span>Explore {service.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => setCurrentPage(service.ctaTarget)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#04122b] hover:bg-[#04122b] hover:text-white text-[#04122b] text-xs sm:text-sm font-semibold rounded-none transition-colors cursor-pointer"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Architectural Vector Diagram (Clean, Zero Radius Frame) */}
                <div className="lg:col-span-5 aspect-[16/10] sm:aspect-[4/3] max-h-[270px] rounded-none border border-slate-200 bg-[#f8fbff] overflow-hidden flex items-center justify-center p-2 sm:p-3">
                  {service.id === 'web-dev' && <WebServiceDiagram />}
                  {service.id === 'app-dev' && <AppServiceDiagram />}
                  {service.id === 'seo-marketing' && <SeoServiceDiagram />}
                  {service.id === 'payments-integrations' && <PaymentsServiceDiagram />}
                  {service.id === 'ecommerce' && <EcommerceServiceDiagram />}
                  {service.id === 'ai-automation' && <AiServiceDiagram />}
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS: FROM SETUP TO MEASURABLE IMPACT IN 30 DAYS (AWWWARDS REFERENCE)
         ========================================================================= */}
      <ThirtyDayImpactSection />

      {/* All 6 Services Detailed Architectural Matrix (Matching Navbar Container Width) */}
      <section className="w-full px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-gray-200/80">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-10 sm:mb-12">
            
            {/* Left Column: Heavy two-toned headline */}
            <div className="lg:col-span-7 space-y-3 text-left">
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-[44px] font-black text-gray-950 tracking-[-0.035em] leading-[1.12]">
                Engineered for clarity, <br className="hidden sm:inline" />
                <span className="text-gray-500 font-normal">
                  connection and scale.
                </span>
              </h2>
            </div>

            {/* Right Column: Explanatory paragraph */}
            <div className="lg:col-span-5 text-left flex flex-col justify-end space-y-4">
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                Every capability is planned to integrate cleanly into the tools your team already uses—tested against live customer journeys, Daraja payment webhooks, and production reliability.
              </p>
            </div>
          </div>

          {/* Connected Architectural Matrix: 3-Column Grid with 1px border dividers */}
          <div className="rounded-none border border-gray-200/90 bg-gray-200/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  onClick={() => setCurrentPage(service.pageId)}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.14 }}
                  transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white p-7 sm:p-8 flex flex-col justify-between relative group cursor-pointer transition-colors duration-300 hover:bg-[#F8FAFF] select-none text-left"
                >
                  {/* Subtle top hover line indicator */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-transparent group-hover:bg-[#0066FF] transition-colors duration-300" />

                  <div>
                    {/* Top Bar: Icon Squircle (Left) & Corner Arrow (Right) */}
                    <div className="flex items-center justify-between mb-7">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-800 group-hover:bg-[#0066FF] group-hover:text-white group-hover:border-[#0066FF] group-hover:scale-105 group-hover:shadow-[0_4px_14px_rgba(0,102,255,0.22)] transition-all duration-300">
                        <Icon className="w-5 h-5 stroke-[1.9]" />
                      </div>

                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#0066FF] group-hover:bg-blue-50/80 transition-all duration-200">
                        <ArrowUpRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-sans font-bold text-lg sm:text-[19px] text-slate-950 tracking-tight group-hover:text-[#0066FF] transition-colors duration-200 mb-2.5">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed">
                      {service.description.slice(0, 150)}...
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM PIXEL-MOSAIC PROPOSAL BANNER (ZERO BORDER RADIUS, #F2F6FD)
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 pb-8 sm:pb-10">
        <div
          id="services-proposal-cta"
          className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-none bg-[#f2f6fd] border border-slate-200/80 px-6 py-16 sm:px-12 sm:py-20 lg:py-24 text-center select-none shadow-[0_16px_40px_-20px_rgba(4,18,43,0.08)]"
        >
          {/* Desktop Geometric Edge SVGs */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 360"
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          >
            <rect x="0" y="0" width="56" height="56" fill="#ffffff" />
            <rect x="56" y="0" width="56" height="56" fill="#cfe2ff" />
            <rect x="112" y="0" width="56" height="56" fill="#0066FF" />
            <rect x="0" y="56" width="56" height="56" fill="#cfe2ff" />
            <rect x="56" y="56" width="56" height="56" fill="#04122b" />
            <rect x="0" y="112" width="56" height="56" fill="#0066FF" />

            <rect x="0" y="248" width="56" height="56" fill="#04122b" />
            <rect x="56" y="200" width="56" height="56" fill="#0066FF" />
            <rect x="112" y="248" width="56" height="56" fill="#ffffff" />
            <rect x="224" y="248" width="56" height="56" fill="#04122b" />
            <rect x="0" y="304" width="56" height="56" fill="#cfe2ff" />
            <rect x="168" y="304" width="56" height="56" fill="#0066FF" />
            <rect x="280" y="304" width="56" height="56" fill="#ffffff" />

            <rect x="1144" y="0" width="56" height="56" fill="#ffffff" />
            <rect x="1088" y="0" width="56" height="56" fill="#cfe2ff" />
            <rect x="1032" y="0" width="56" height="56" fill="#04122b" />
            <rect x="1088" y="56" width="56" height="56" fill="#0066FF" />

            <rect x="1144" y="200" width="56" height="56" fill="#04122b" />
            <rect x="1032" y="248" width="56" height="56" fill="#ffffff" />
            <rect x="1088" y="304" width="56" height="56" fill="#0066FF" />
            <rect x="1144" y="304" width="56" height="56" fill="#ffffff" />
          </svg>

          {/* Mobile Geometric Edge SVGs */}
          <svg
            aria-hidden="true"
            viewBox="0 0 360 280"
            preserveAspectRatio="none"
            shapeRendering="crispEdges"
            className="pointer-events-none absolute inset-0 h-full w-full md:hidden"
          >
            <rect x="0" y="0" width="28" height="28" fill="#ffffff" />
            <rect x="28" y="0" width="28" height="28" fill="#0066FF" />
            <rect x="332" y="0" width="28" height="28" fill="#ffffff" />
            <rect x="304" y="0" width="28" height="28" fill="#04122b" />
            <rect x="0" y="252" width="28" height="28" fill="#04122b" />
            <rect x="28" y="252" width="28" height="28" fill="#ffffff" />
            <rect x="332" y="252" width="28" height="28" fill="#ffffff" />
            <rect x="304" y="252" width="28" height="28" fill="#0066FF" />
          </svg>

          <div className="relative z-10 mx-auto max-w-2xl space-y-5">
            <h2
              className="pricing-proposal-heading font-ptserif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#04122b] tracking-[-0.03em] leading-[1.08]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Start with a clear, transparent proposal.
            </h2>
            <p className="mx-auto max-w-xl font-sans text-sm sm:text-[15px] text-[#04122b]/80 font-normal leading-[1.6]">
              Tell us what you want to improve. We will outline the scope, available options, exact deliverables, and timeline without making it complicated.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-none bg-[#0066FF] px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-white transition-colors duration-200 hover:bg-[#0052cc] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Request a proposal" icon={<ArrowRight className="w-4 h-4" />} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('pricing')}
                className="group inline-flex items-center justify-center gap-2 rounded-none border border-[#04122b]/25 bg-white px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-[#04122b] transition-colors duration-200 hover:border-[#0066FF] hover:text-[#0066FF] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Explore our packages" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
