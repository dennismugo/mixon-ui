import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
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

interface ServicesProps {
  setCurrentPage: (page: any) => void;
}

export default function Services({ setCurrentPage }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);
  const reduceMotion = useReducedMotion();

  const services = [
    {
      id: 'web-dev',
      number: '01',
      category: 'Web Architecture',
      title: 'Web Design & Development',
      tagline: 'A website that helps people understand you, and act.',
      description: 'Your website is often the first conversation a customer has with your business. It should answer the right question quickly: what do you do, is it for me, and what do I do next? We design and develop responsive websites that bring your brand, content and business goals together. Modern, fast, accessible and built to be found.',
      icon: Code2,
      accentColor: 'from-blue-600 to-indigo-600',
      badge: 'Core Platform',
      whatYouGet: [
        'Custom, mobile-first design that reflects your brand and typography',
        'Performance, sub-second load times and enterprise-grade security built in',
        'Clear page structure and conversion-tested calls to action that guide visitors',
        'Intuitive content management system your team can update with confidence',
        'Semantic HTML and technical SEO foundations configured from day one',
        'Web applications, secure client portals, and interactive dashboards when you need more than a brochure'
      ],
      howWeWork: [
        { step: '01', title: 'Discover', desc: 'Clarify business goals, audience intent, and primary customer actions.' },
        { step: '02', title: 'Design', desc: 'Structure wireframes, interaction fidelity, and design system before coding.' },
        { step: '03', title: 'Build & Test', desc: 'Develop with modern TypeScript & responsive tests across mobile & desktop.' },
        { step: '04', title: 'Launch & Measure', desc: 'Deploy with zero-downtime, monitor analytics, and refine post-launch.' }
      ],
      bestFor: 'Businesses anywhere establishing a professional presence, redesigning an outdated site, or needing a scalable content-managed web platform.',
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
      tagline: 'Turn a process or an idea into something people use every day.',
      description: 'Some of the best business ideas are really processes that have not yet become products. We help you define the requirements, map the user journey and build an application around the tasks people need to complete. Where it makes sense, we also build for the reach of USSD, so customers can use your service on any phone, without needing data.',
      icon: Smartphone,
      accentColor: 'from-indigo-600 to-violet-600',
      badge: 'Native & Hybrid',
      whatYouGet: [
        'High-performance Android and iOS native & cross-platform applications',
        'USSD solutions with telco shortcode registration and interactive menu trees',
        'Clear user journeys, accessible components, and thoughtful tactile micro-interactions',
        'Encrypted back-end architecture, real-time analytics, and automated updates',
        'Offline-first synchronization for areas with intermittent mobile network coverage',
        'AI-assisted workflows where there is a genuine, explainable business use case'
      ],
      howWeWork: [
        { step: '01', title: 'Define', desc: 'Map user journey bottlenecks, offline requirements, and success metrics.' },
        { step: '02', title: 'Prototype', desc: 'Interactive clickable Figma prototype to test flows before touching code.' },
        { step: '03', title: 'Build & Test', desc: 'Engineer with rigorous automated testing under real-world connectivity.' },
        { step: '04', title: 'Launch & Support', desc: 'Handle App Store/Play Store submissions, telemetry, and ongoing updates.' }
      ],
      bestFor: 'Founders, service businesses, logistics teams, and established enterprises ready to digitise an operational process into mobile software.',
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
      tagline: 'Be found. Then be chosen.',
      description: 'People do not only search on Google any more. They ask AI assistants for recommendations, and those assistants pick businesses that are clear, trustworthy and well described. We support search visibility and digital campaigns with clear messaging, useful content and a focus on meaningful conversions, so the right audience finds you and has a reason to act.',
      icon: Search,
      accentColor: 'from-emerald-600 to-teal-600',
      badge: 'AEO & GEO Ready',
      whatYouGet: [
        'Comprehensive technical SEO audits, site speed tuning, and on-page crawl optimizations',
        'Answer-Engine & Generative-Engine Optimisation (AEO & GEO) for ChatGPT, Perplexity & Gemini discovery',
        'Authoritative content architecture that directly answers high-intent customer queries',
        'Structured digital acquisition campaign planning across Google Search, Meta & LinkedIn',
        'High-deliverability Bulk SMS campaigns for instant direct reach and customer updates',
        'Transparent, plain-English conversion reporting focusing on real pipeline revenue'
      ],
      howWeWork: [
        { step: '01', title: 'Audit', desc: 'Analyze current search footprint, technical indexability, and competitor gaps.' },
        { step: '02', title: 'Plan', desc: 'Prioritize highest-impact keywords, schema markups, and content clusters.' },
        { step: '03', title: 'Execute', desc: 'Ship structured data, technical fixes, authoritative content, and campaigns.' },
        { step: '04', title: 'Refine', desc: 'Review monthly conversion dashboards and adapt to search engine algorithms.' }
      ],
      bestFor: 'Businesses that want more qualified customer enquiries, higher organic search placement, and sustainable organic pipeline.',
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
      tagline: 'Close the gaps between your tools.',
      description: 'Payment journeys and connected systems are where many businesses quietly lose time. A customer pays, but the order does not update. A system holds data another one needs. Someone retypes it. We assess the right integration approach and plan for transaction status, exceptions and reconciliation, so payments and systems work together, including the awkward moments when something fails.',
      icon: CreditCard,
      accentColor: 'from-sky-600 to-blue-700',
      badge: 'Zero-Leakage Rails',
      whatYouGet: [
        'Direct payment integration for mobile money (M-Pesa Daraja STK Push & C2B), cards, PayPal, bank rails',
        'Multi-currency checkout with transparent FX rates and instant digital confirmation receipts',
        'Custom REST and GraphQL API integrations linking your CRM, ERP, and internal databases',
        'Direct Telco Bulk SMS gateway integration with automated transaction triggers',
        'Automated idempotent error-handling, background webhooks, retry queues, and settlement reconciliation',
        'Complete audit trails and encrypted telemetry for every shilling, dollar, or euro moved'
      ],
      howWeWork: [
        { step: '01', title: 'System Map', desc: 'Document existing tools, API endpoints, webhook topologies, and data flows.' },
        { step: '02', title: 'Architect', desc: 'Design secure, idempotent connection architecture with failure recovery.' },
        { step: '03', title: 'Sandbox Test', desc: 'Run end-to-end payment simulations with edge cases and latency checks.' },
        { step: '04', title: 'Deploy & Monitor', desc: 'Go live with automated alerting, reconciliation logs, and ongoing support.' }
      ],
      bestFor: 'Businesses taking payments online in one market or many, managing recurring subscriptions, or running disparate systems that must talk to each other.',
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
      tagline: 'An online store that makes buying feel easy.',
      description: 'A good online store feels like a good shop assistant. It helps people find what they came for, answers their questions and makes paying painless. We shape the shopping experience around your catalogue, customers and operations, from product pages to checkout, so shoppers choose with confidence and buy with less friction.',
      icon: ShoppingBag,
      accentColor: 'from-rose-600 to-orange-600',
      badge: 'High Conversion',
      whatYouGet: [
        'Bespoke storefront design tailored specifically to your visual brand and product catalog',
        'Frictionless checkout experience with localized payment options and guest checkout modes',
        'Real-time automated inventory tracking, low-stock warnings, and multi-location sync',
        'Lightning-fast faceted search, intelligent filtering, and related product recommendations',
        'Mobile-optimized cart recovery workflows and order status tracking via SMS & email',
        'Staff-friendly backend for bulk product uploads, discount promotions, and tax management'
      ],
      howWeWork: [
        { step: '01', title: 'Catalog Audit', desc: 'Review product variants, inventory workflows, and shipping logistics.' },
        { step: '02', title: 'UX Flow', desc: 'Design smooth discovery, cart, checkout, and receipt confirmation journeys.' },
        { step: '03', title: 'Build Store', desc: 'Develop headless or full-stack store with payment gateway verification.' },
        { step: '04', title: 'Optimize', desc: 'Run live checkout audits, speed tuning, and conversion rate optimizations.' }
      ],
      bestFor: 'Retailers, boutique brands, wholesalers, and physical shops expanding into modern direct-to-consumer or B2B online sales.',
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
      tagline: 'Find the work worth automating.',
      description: 'Not every task needs AI. Some just need a better process. Our approach starts with finding repetitive tasks and information bottlenecks that are genuinely worth improving. We help define a practical use case, understand the risks and scope an AI or automation solution where the capability is available, being open about what is automated, what is assisted and what still needs a human.',
      icon: Sparkles,
      accentColor: 'from-amber-600 to-orange-600',
      badge: 'Human-in-the-Loop',
      whatYouGet: [
        'Pragmatic Opportunity Discovery Workshop to identify high-ROI repetitive tasks',
        'Transparent scoping of data privacy, accuracy thresholds, and business failure modes',
        'Deterministic workflow automation linking email, spreadsheets, WhatsApp, and databases',
        'Custom domain-trained assistants that draft responses and extract data for human approval',
        'Clear human-in-the-loop safeguards ensuring critical financial or customer decisions remain in your hands',
        'Ongoing evaluation metrics tracking actual hours saved and error reduction rates'
      ],
      howWeWork: [
        { step: '01', title: 'Identify', desc: 'Pinpoint exactly where team hours and repetitive data entry get clogged.' },
        { step: '02', title: 'Evaluate', desc: 'Assess ROI feasibility, data security, and decide between rule-based vs AI.' },
        { step: '03', title: 'Pilot', desc: 'Deploy a tightly scoped, assisted pilot with human oversight safeguards.' },
        { step: '04', title: 'Scale', desc: 'Integrate into core operational stack only once reliability is proven.' }
      ],
      bestFor: 'Forward-thinking teams curious about AI who want a grounded, reliable starting point that delivers tangible time savings without buzzwords.',
      ctaText: 'Explore an AI use case',
      ctaTarget: 'contact',
      pageId: 'service-ai',
      badgeMeta: 'Deterministic · Explainable · Safeguards · Time Saved',
      metric: '15+ hrs',
      metricLabel: 'saved weekly per team'
    }
  ];

  const currentService = services[selectedServiceIndex];

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

      {/* Interactive Service Explorer (Freehand-inspired Interactive Master Panel) */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-950">
            Engineered around how your business actually works
          </h2>
        </div>

        {/* Tab Selector Pill Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isSelected = selectedServiceIndex === idx;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-white border-[#0066FF] shadow-[0_8px_24px_rgba(0,102,255,0.12)] ring-1 ring-[#0066FF]' 
                    : 'bg-white/70 hover:bg-white border-gray-200/80 text-gray-600 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-[#0066FF]' : 'text-gray-400'}`}>
                    {service.number}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#0066FF] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">{service.category}</span>
                  <span className={`text-xs font-bold leading-tight line-clamp-1 ${isSelected ? 'text-gray-950' : 'text-gray-700'}`}>
                    {service.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Inspection Card (Context.dev Blueprint + Avenir Styling) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Service Header Banner */}
            <div className="p-8 sm:p-10 border-b border-gray-100 bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                {currentService.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3 max-w-4xl">
                {currentService.description}
              </p>
            </div>

            {/* Service Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {/* Left Column: What You Get */}
              <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                    SPECIFICATIONS &amp; DELIVERABLES
                  </span>
                  <span className="text-[11px] font-mono text-[#0066FF]">What you get</span>
                </div>

                <div className="space-y-3.5">
                  {currentService.whatYouGet.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: How We Work & Direct Action */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-slate-50/30">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-gray-400 font-bold">
                      EXECUTION FRAMEWORK
                    </span>
                    <span className="text-[11px] font-mono text-gray-500">4-Step Delivery</span>
                  </div>

                  <div className="space-y-3">
                    {currentService.howWeWork.map((step) => (
                      <div key={step.step} className="p-3.5 rounded-xl bg-white border border-gray-200/90 shadow-2xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                            {step.step}
                          </span>
                          <span className="text-xs font-bold text-gray-900">{step.title}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed pl-6">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-200 mt-8 space-y-3">
                  <button
                    onClick={() => setCurrentPage(currentService.pageId)}
                    className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-[0_4px_16px_rgba(0,102,255,0.25)] flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>View Dedicated {currentService.title} Page</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentService.ctaTarget)}
                    className="w-full bg-gray-950 hover:bg-black text-white font-sans font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>{currentService.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-[11px] font-mono text-gray-400">
                    Transparent scoping · Nairobi HQ &amp; Global Remote
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =========================================================================
          HOW IT WORKS: FROM SETUP TO MEASURABLE IMPACT IN 30 DAYS (AWWWARDS REFERENCE)
         ========================================================================= */}
      <ThirtyDayImpactSection />

      {/* All 6 Services Detailed Architectural Matrix (Matching Reference Design & Container Width) */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-20 sm:py-24 border-t border-gray-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 sm:mb-14">
          
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
        <div className="rounded-3xl border border-gray-200/90 bg-gray-200/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
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
      </section>

      {/* Integration Verification Disclaimer Strip */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8">
        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-block text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
              A NOTE ON INTEGRATIONS &amp; APIS
            </span>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              Integrations depend on the target systems, available APIs and provider permissions. We assess your exact technical requirements up front before confirming any specific connection.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="shrink-0 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Request API Assessment →
          </button>
        </div>
      </section>

      {/* Final Closing Action Block (Section 11) */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-12">
        <div className="bg-gray-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight whitespace-normal sm:whitespace-nowrap">
              What is taking too much time in your business?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Tell us what you want to improve. We will help you explore the right product, service or next step, without making it complicated.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full sm:w-auto bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-bold py-3.5 px-8 rounded-full text-sm transition-all shadow-lg cursor-pointer"
              >
                Tell us what you need
              </button>
              <button
                onClick={() => setCurrentPage('pricing')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-sans font-semibold py-3.5 px-8 rounded-full text-sm transition-all border border-white/20 cursor-pointer"
              >
                View Website Packages
              </button>
            </div>
            <p className="text-[11px] font-mono text-gray-400 pt-2">
              We reply within one business day · Remote or on-site in Nairobi
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
