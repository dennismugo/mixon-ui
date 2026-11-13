import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, ArrowRight, Sliders, ShieldCheck } from 'lucide-react';

import RollingButtonText from '../components/RollingButtonText';
import { FaqAccordionBox } from '../components/FaqAccordionBox';
import PixelMosaicBackdrop from '../components/PixelMosaicBackdrop';
import { PRICING_FAQS } from '../seo/mixonSeo';

interface PricingProps {
  setCurrentPage: (page: any) => void;
}

interface ComparisonRow {
  label: string;
  desc: string;
  values: [string, string, string, string];
}

interface ComparisonCategory {
  title: string;
  tintRowClass: string;
  headerBgClass: string;
  rows: ComparisonRow[];
}

export default function Pricing({ setCurrentPage }: PricingProps) {
  const reduceMotion = useReducedMotion();
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [volumeIndex, setVolumeIndex] = useState<number>(1);

  const volumeTiers = [
    { label: '1 – 20 units / Single till', plan: 'Starter', desc: 'Up to 500 monthly transactions' },
    { label: '20 – 100 units / 2–5 tills', plan: 'Growth', desc: '500 to 5,000 monthly transactions' },
    { label: '100 – 500 units / Multi-branch', plan: 'Pro', desc: '5,000 to 25,000 monthly transactions' },
    { label: '500+ units / High-velocity enterprise', plan: 'Scale & Enterprise', desc: 'Unlimited transactions & private SLA' },
  ];

  const formatPrice = (kesMonthly: number, usdMonthly: number) => {
    const discount = billingCycle === 'yearly' ? 0.8 : 1.0;
    const kes = Math.round(kesMonthly * discount);
    const usd = Math.round(usdMonthly * discount);

    if (currency === 'KES') {
      return `KES ${kes.toLocaleString()}`;
    }
    return `$${usd.toLocaleString()}`;
  };

  const primaryPlans = [
    {
      name: 'Starter',
      tagline: 'For early-stage business sites & single-location teams.',
      kes: 25000,
      usd: 200,
      cta: 'Start with Starter',
      featured: false,
      highlightsTitle: 'Includes:',
      highlights: [
        'Up to 5 custom responsive pages',
        'Sub-second load times & SSL',
        'Direct inquiry capture form',
        '1–20 units or single POS till',
        'Delivery in 7–10 business days',
      ],
    },
    {
      name: 'Growth',
      tagline: 'For expanding businesses & dynamic multi-channel workflows.',
      kes: 40500,
      usd: 325,
      cta: 'Choose Growth',
      featured: false,
      highlightsTitle: 'Everything in Starter, plus:',
      highlights: [
        'Up to 15 pages + intuitive CMS',
        'AEO & GEO Answer-Engine schema',
        'M-Pesa Daraja C2B Paybill capture',
        'WhatsApp alerts & 2–5 POS tills',
        '30 days post-launch SLA support',
      ],
    },
    {
      name: 'Pro',
      tagline: 'For high-concurrency commercial ops & direct payment rails.',
      kes: 75500,
      usd: 600,
      cta: 'Start Pro',
      featured: true,
      highlightsTitle: 'Everything in Growth, plus:',
      highlights: [
        'Instant M-Pesa STK Push (<14ms)',
        'Unlimited pages & custom portals',
        'Zero-leakage settlement webhooks',
        'Visa, Mastercard & sub-second channel lock',
        'Dedicated technical engineer support',
      ],
    },
    {
      name: 'Scale',
      tagline: 'For multi-branch organizations & custom API ecosystems.',
      kes: 145000,
      usd: 1150,
      cta: 'Start Scale',
      featured: false,
      highlightsTitle: 'Everything in Pro, plus:',
      highlights: [
        'Custom REST & GraphQL APIs',
        'Multi-department role permissions',
        'Hardware turnstile & distributed Redis lock',
        'Hourly automated ledger backups',
        'Dedicated technical account lead',
      ],
    },
  ];

  const comparisonCategories: ComparisonCategory[] = [
    {
      title: 'Core Platforms & Websites',
      headerBgClass: 'bg-[#f4f8ff]',
      tintRowClass: 'bg-[#edf4ff]',
      rows: [
        {
          label: 'Custom Page Hierarchy',
          desc: 'Structured responsive web architecture included at launch',
          values: ['Up to 5 Pages', 'Up to 15 Pages', 'Unlimited', 'Bespoke Portal'],
        },
        {
          label: 'Content Management (CMS)',
          desc: 'Publish updates, team pages, and listings without developer tickets',
          values: ['—', 'Included', 'Included', 'Multi-Workspace'],
        },
        {
          label: 'AEO & GEO Answer-Engine Schema',
          desc: 'Structured markup for Google & AI answer engines',
          values: ['—', 'Included', 'Included', 'Custom Schema'],
        },
        {
          label: 'Delivery Window',
          desc: 'Typical production turnaround for initial deployment',
          values: ['7–10 days', '10–14 days', '2–3 weeks', 'Dedicated Sprint'],
        },
      ],
    },
    {
      title: 'M-Pesa, Card & Payment Rails',
      headerBgClass: 'bg-[#f2fbff]',
      tintRowClass: 'bg-[#e6f6ff]',
      rows: [
        {
          label: 'Mobile Money & M-Pesa Daraja',
          desc: 'Direct collection and real-time settlement verification',
          values: ['—', 'C2B Paybill Capture', 'Instant STK (<14ms)', 'Direct Gateway Rails'],
        },
        {
          label: 'Card & Bank Settlement Rails',
          desc: 'Accept Visa, Mastercard, Pesapal, or direct bank transfers',
          values: ['—', 'Optional Add-on', 'Included', 'Custom Gateway + USSD'],
        },
        {
          label: 'Ledger Reconciliation',
          desc: 'Match incoming collections to invoices, bookings, and shifts automatically',
          values: ['Manual Export', 'Daily Automated Match', 'Real-Time Match', 'Bi-directional ERP'],
        },
      ],
    },
    {
      title: 'Mixon Suite Capabilities',
      headerBgClass: 'bg-[#f4f6ff]',
      tintRowClass: 'bg-[#ebeffe]',
      rows: [
        {
          label: 'miRentals / miPOS Asset Scale',
          desc: 'Units, properties, or multi-branch point-of-sale counters supported',
          values: ['1–20 units / 1 till', '20–100 units / 2–5 tills', '100–500 units / Multi', '500+ units / Unlimited'],
        },
        {
          label: 'miReserve OTA & Room Lock',
          desc: 'Synchronize direct reservations and avoid double-bookings',
          values: ['—', 'Periodic Sync', 'Sub-second Lock', 'Distributed Redis Lock'],
        },
        {
          label: 'Event Yetu Offline-First Gate QR',
          desc: 'Verify passes instantaneously even in low-connectivity venues',
          values: ['—', 'Standard Check-in', 'Local ECDSA Crypto', 'Hardware Gate Sync'],
        },
        {
          label: 'Custom Endpoints & Webhooks',
          desc: 'Sync inventory and ledgers with your existing ERP',
          values: ['—', 'Standard Webhooks', 'REST + Webhooks', 'Custom REST & GraphQL'],
        },
      ],
    },
    {
      title: 'Security, Support & SLAs',
      headerBgClass: 'bg-[#f0fdf9]',
      tintRowClass: 'bg-[#e4f9f2]',
      rows: [
        {
          label: 'Source Code & IP Ownership',
          desc: 'Full ownership of bespoke builds and data assets',
          values: ['✓', '✓', '✓', '100% Bespoke IP'],
        },
        {
          label: 'Encrypted Backups',
          desc: 'Redundant automated database and ledger snapshots',
          values: ['Weekly', 'Daily', 'Every 6 Hours', 'Hourly Automated'],
        },
        {
          label: 'Engineering SLA & Support',
          desc: 'Direct access to Nairobi engineering support',
          values: ['Standard Email', '30 Days Post-Launch', 'Priority 4hr SLA', 'Dedicated Lead · 99.95%'],
        },
      ],
    },
  ];

  const billingFaqs = PRICING_FAQS.slice(0, 3);
  const deploymentFaqs = PRICING_FAQS.slice(3);

  const infoCards = [
    {
      seedOffset: 8,
      title: 'Explore Products',
      desc: 'Compare miRentals, miReserve, Event Yetu, and miPOS workflows side by side.',
      page: 'products',
    },
    {
      seedOffset: 9,
      title: 'Engineering Services',
      desc: 'Custom websites, mobile/USSD apps, payment rails, and AI integrations.',
      page: 'services',
    },
    {
      seedOffset: 10,
      title: 'Book a Live Demo',
      desc: 'Schedule a 30-minute walkthrough tailored to your operational volume.',
      page: 'book-demo',
    },
  ];

  return (
    <div className="mixon-interior-page mixon-pricing-page bg-white text-[#04122b] pt-24 pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* =========================================================================
          BAND 1: JASPER-STYLE ARCHITECTURAL GRID HERO + PLAN CARDS
         ========================================================================= */}
      <section className="relative border-b border-[#dbe7fb] bg-white px-5 sm:px-8 lg:px-12 pt-14 sm:pt-18 pb-16 sm:pb-20">
        <div className="mx-auto max-w-[1260px]">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <h1
              className="hero-title font-ptserif text-4xl sm:text-5xl lg:text-[60px] font-normal text-[#04122b] tracking-[-0.03em] leading-[1.04]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Get software built for serious Kenyan business
            </h1>
            <p className="font-sans text-[14.5px] sm:text-[16px] text-[#334155] max-w-xl mx-auto leading-relaxed">
              Fixed-scope website packages &amp; scalable product licenses. Clear billing in KES or USD with zero surprise setup fees.
            </p>

            {/* Square 0px Billing & Currency Toggles */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center border border-[#c5daf8] bg-white p-1 rounded-none">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-none text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-[#0066FF] text-white'
                      : 'text-[#475569] hover:text-[#04122b]'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-none text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                    billingCycle === 'yearly'
                      ? 'bg-[#0066FF] text-white'
                      : 'text-[#475569] hover:text-[#04122b]'
                  }`}
                >
                  <span>Yearly</span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-none ${
                      billingCycle === 'yearly'
                        ? 'bg-white text-[#0066FF]'
                        : 'bg-[#e8f1ff] text-[#0066FF]'
                    }`}
                  >
                    Save 20%
                  </span>
                </button>
              </div>

              <div className="inline-flex items-center border border-[#c5daf8] bg-white p-1 rounded-none">
                <button
                  type="button"
                  onClick={() => setCurrency('KES')}
                  className={`px-3.5 py-2 rounded-none text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    currency === 'KES'
                      ? 'bg-[#0066FF] text-white'
                      : 'text-[#475569] hover:text-[#04122b]'
                  }`}
                >
                  KES (KSh)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-3.5 py-2 rounded-none text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-[#0066FF] text-white'
                      : 'text-[#475569] hover:text-[#04122b]'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>
          </div>

          {/* 4 Main Pricing Cards (Jasper Clean White Sharp-Corner Cards) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch"
          >
            {primaryPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-none bg-white p-6 sm:p-7 flex flex-col justify-between text-left transition-shadow duration-200 ${
                  plan.featured
                    ? 'border-2 border-[#0066FF] shadow-[0_18px_42px_-14px_rgba(0,102,255,0.2)]'
                    : 'border border-[#c5daf8] shadow-[0_6px_22px_-12px_rgba(4,18,43,0.08)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#04122b]/15">
                    <h2
                      className="whitespace-nowrap font-ptserif text-2xl font-normal text-[#04122b] tracking-tight"
                      style={{ fontFamily: "'PT Serif', serif" }}
                    >
                      {plan.name}
                    </h2>
                    <div className="shrink-0 whitespace-nowrap text-right">
                      <span className="font-sans text-[17px] font-bold text-[#04122b] tracking-tight">
                        {formatPrice(plan.kes, plan.usd)}
                      </span>
                      <span className="ml-0.5 text-[10px] font-mono text-slate-500">/mo</span>
                    </div>
                  </div>

                  <p className="pricing-plan-tagline mt-4 min-h-[78px] text-xs sm:text-[13px] text-[#475569] leading-relaxed">
                    {plan.tagline}
                  </p>

                  <button
                    type="button"
                    onClick={() => setCurrentPage('contact')}
                    className={`mt-4 w-full py-2.5 px-4 rounded-none text-xs font-sans font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                      plan.featured
                        ? 'bg-[#0066FF] hover:bg-[#0052cc] text-white border border-[#0066FF]'
                        : 'bg-white hover:bg-[#f4f8ff] text-[#04122b] border border-[#04122b]/25 hover:border-[#0066FF]'
                    }`}
                  >
                    <RollingButtonText text={plan.cta} />
                  </button>

                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                    <p className="pricing-plan-highlights-title font-mono uppercase tracking-[0.06em] font-semibold text-[#0066FF]">
                      {plan.highlightsTitle}
                    </p>
                    <ul className="space-y-2 text-xs text-[#334155]">
                      {plan.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Compact Volume Recommender + Enterprise / Custom Strip */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 border border-[#c5daf8] bg-white rounded-none divide-y lg:divide-y-0 lg:divide-x divide-[#dbe7fb]">
            {/* Left: Interactive Volume Selector */}
            <div className="lg:col-span-6 p-6 sm:p-7 flex flex-col justify-between text-left bg-[#f9fbff]">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0066FF]" />
                  <h3 className="font-sans font-bold text-base text-[#04122b]">
                    Which plan fits your operational volume?
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {volumeTiers.map((tier, idx) => (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setVolumeIndex(idx)}
                      className={`p-3 rounded-none border text-left transition-colors cursor-pointer ${
                        volumeIndex === idx
                          ? 'bg-white border-[#0066FF] text-[#04122b]'
                          : 'bg-white/75 hover:bg-white border-[#dbe7fb] text-[#475569]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#04122b]">{tier.label}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#dbe7fb] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">
                    Recommended Plan
                  </span>
                  <span className="text-sm font-bold text-[#0066FF]">
                    {volumeTiers[volumeIndex].plan}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-semibold bg-[#04122b] hover:bg-[#0066FF] text-white transition-colors cursor-pointer"
                >
                  <RollingButtonText text="Select Plan" icon={<ArrowRight className="w-3.5 h-3.5" />} />
                </button>
              </div>
            </div>

            {/* Enterprise Column */}
            <div className="lg:col-span-3 p-6 sm:p-7 flex flex-col justify-between text-left bg-white">
              <div>
                <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-slate-200">
                  <h3 className="font-ptserif text-xl text-[#04122b]" style={{ fontFamily: "'PT Serif', serif" }}>
                    Enterprise
                  </h3>
                  <span className="font-sans text-sm font-bold text-[#04122b]">
                    {formatPrice(250000, 2000)}/mo
                  </span>
                </div>
                <p className="text-xs text-[#475569] mt-3 mb-4">
                  Tailored multi-system rollout, private SLA &amp; dedicated telco rails.
                </p>
                <ul className="space-y-1.5 text-xs text-[#334155] mb-5">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                    <span>Custom telco USSD shortcodes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                    <span>99.95% uptime contract SLA</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="w-full py-2.5 px-4 rounded-none text-xs font-semibold border border-[#04122b]/25 hover:border-[#0066FF] text-[#04122b] hover:bg-[#f4f8ff] transition-colors cursor-pointer"
              >
                <RollingButtonText text="Start Enterprise" />
              </button>
            </div>

            {/* Custom Column */}
            <div className="lg:col-span-3 p-6 sm:p-7 flex flex-col justify-between text-left bg-white">
              <div>
                <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-slate-200">
                  <h3 className="font-ptserif text-xl text-[#04122b]" style={{ fontFamily: "'PT Serif', serif" }}>
                    Custom
                  </h3>
                  <span className="font-mono text-xs font-bold text-[#0066FF]">Bespoke</span>
                </div>
                <p className="text-xs text-[#475569] mt-3 mb-4">
                  100% bespoke codebase, ERP integrations &amp; dedicated engineers.
                </p>
                <ul className="space-y-1.5 text-xs text-[#334155] mb-5">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                    <span>Hardware turnstile / POS links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                    <span>100% client source IP transfer</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="w-full py-2.5 px-4 rounded-none text-xs font-semibold border border-[#04122b]/25 hover:border-[#0066FF] text-[#04122b] hover:bg-[#f4f8ff] transition-colors cursor-pointer"
              >
                <RollingButtonText text="Talk to Sales" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BAND 2: JASPER-STYLE CATEGORIZED COLOR-TINTED COMPARISON MATRIX
         ========================================================================= */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 bg-white">
        <div className="mx-auto max-w-[1260px]">
          <div className="overflow-x-auto border border-[#dbe7fb] rounded-none">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#dbe7fb] bg-white">
                  <th className="w-[34%] p-5 sm:p-6 align-bottom">
                    <span className="text-[11px] font-mono uppercase tracking-[0.12em] font-semibold text-[#0066FF]">
                      Plan Comparison
                    </span>
                    <p className="mt-1 font-ptserif text-2xl font-normal text-[#04122b]" style={{ fontFamily: "'PT Serif', serif" }}>
                      Compare capabilities
                    </p>
                  </th>
                  {primaryPlans.map((plan) => (
                    <th key={plan.name} className="w-[16.5%] p-4 sm:p-5 text-center border-l border-[#e6eefc] align-bottom">
                      <div className="font-ptserif text-lg font-normal text-[#04122b]" style={{ fontFamily: "'PT Serif', serif" }}>
                        {plan.name}
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentPage('contact')}
                        className={`mt-2.5 w-full py-2 px-3 rounded-none text-[11.5px] font-semibold transition-colors cursor-pointer ${
                          plan.featured
                            ? 'bg-[#0066FF] hover:bg-[#0052cc] text-white'
                            : 'bg-white hover:bg-[#f4f8ff] text-[#04122b] border border-[#04122b]/20'
                        }`}
                      >
                        {plan.featured ? 'Start Pro' : 'Get started'}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonCategories.map((category) => (
                  <React.Fragment key={category.title}>
                    <tr className={`border-t border-b border-[#dbe7fb] ${category.headerBgClass}`}>
                      <td colSpan={5} className="px-5 sm:px-6 py-4">
                        <h3
                          className="font-ptserif text-lg sm:text-xl font-normal text-[#04122b]"
                          style={{ fontFamily: "'PT Serif', serif" }}
                        >
                          {category.title}
                        </h3>
                      </td>
                    </tr>

                    {category.rows.map((row, rowIdx) => (
                      <tr
                        key={row.label}
                        className={`border-b border-[#e6eefc] ${
                          rowIdx % 2 === 1 ? category.tintRowClass : 'bg-white'
                        }`}
                      >
                        <td className="px-5 sm:px-6 py-3.5 align-middle">
                          <div className="text-[13px] font-semibold text-[#04122b]">{row.label}</div>
                          <div className="text-[11.5px] text-[#475569] mt-0.5">{row.desc}</div>
                        </td>
                        {row.values.map((val, colIdx) => (
                          <td
                            key={colIdx}
                            className="px-4 py-3.5 text-center border-l border-[#e6eefc] text-xs font-medium text-[#04122b] align-middle"
                          >
                            {val === '✓' ? (
                              <Check className="w-4 h-4 text-[#0066FF] mx-auto" />
                            ) : val === '—' ? (
                              <span className="text-slate-400">—</span>
                            ) : (
                              <span>{val}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BAND 3: MOSAIC-FRAMED ENTERPRISE SECURITY HIGHLIGHT (Jasper Style)
         ========================================================================= */}
      <section className="px-5 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        <div className="relative mx-auto max-w-[1260px] overflow-hidden border border-[#c5daf8] bg-[#e8f1ff] py-10 sm:py-14 px-5 sm:px-10 rounded-none">
          <PixelMosaicBackdrop seedOffset={7} />
          <div className="relative z-10 mx-auto max-w-2xl bg-white border border-[#c5daf8] p-8 sm:p-11 text-center rounded-none shadow-[0_18px_45px_-18px_rgba(4,18,43,0.18)]">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.12em] font-semibold text-[#0066FF]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bank-Grade Financial &amp; Cloud Posture
            </span>
            <h2
              className="mt-3 font-ptserif text-2xl sm:text-4xl font-normal text-[#04122b] tracking-[-0.025em] leading-[1.1]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Enterprise-grade security, zero-leakage settlements
            </h2>
            <p className="mt-3.5 text-xs sm:text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
              Every deployment is architected with encrypted webhook validation, atomic ledger locks, and clean source ownership.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="inline-flex items-center gap-2 rounded-none bg-[#04122b] hover:bg-[#0066FF] px-5 py-2.5 text-xs font-sans font-semibold text-white transition-colors cursor-pointer"
              >
                <RollingButtonText text="Talk to an engineer" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BAND 4: GROUPED STICKY CATEGORY FAQs (Jasper Pricing Style + Mixon Ice-Blue)
         ========================================================================= */}
      <section className="py-14 sm:py-20 px-5 sm:px-8 lg:px-12 bg-white border-t border-b border-[#e6eefc]">
        <div className="mx-auto max-w-[1260px] space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4 text-left lg:sticky lg:top-28 space-y-3">
              <h2
                className="font-ptserif text-2xl sm:text-3xl font-normal text-[#04122b] tracking-[-0.02em] leading-[1.15]"
                style={{ fontFamily: "'PT Serif', serif" }}
              >
                Getting started &amp; billing
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xs">
                Straight answers on fixed-scope builds, subscriptions, and scaling volume.
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordionBox faqs={billingFaqs} idPrefix="pricing-faq-billing" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-10 border-t border-[#e6eefc]">
            <div className="lg:col-span-4 text-left lg:sticky lg:top-28 space-y-3">
              <h2
                className="font-ptserif text-2xl sm:text-3xl font-normal text-[#04122b] tracking-[-0.02em] leading-[1.15]"
                style={{ fontFamily: "'PT Serif', serif" }}
              >
                Payments, SLAs &amp; ownership
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-xs">
                How Mixon connects M-Pesa/card rails, ships code, and protects your IP.
              </p>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordionBox faqs={deploymentFaqs} idPrefix="pricing-faq-deployment" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BAND 5: "Have more questions?" 3 MOSAIC ACTION CARDS
         ========================================================================= */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 bg-white">
        <div className="mx-auto max-w-[1260px]">
          <h2
            className="font-ptserif text-3xl sm:text-4xl font-normal text-[#04122b] text-center tracking-[-0.025em]"
            style={{ fontFamily: "'PT Serif', serif" }}
          >
            Have more questions?
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {infoCards.map((card) => (
              <button
                key={card.title}
                type="button"
                onClick={() => setCurrentPage(card.page)}
                className="group rounded-none border border-[#c5daf8] bg-white text-left overflow-hidden hover:border-[#0066FF] transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-28 w-full overflow-hidden border-b border-[#dbe7fb]">
                  <PixelMosaicBackdrop seedOffset={card.seedOffset} />
                </div>
                <div className="p-5 sm:p-6 flex items-end justify-between gap-4">
                  <div>
                    <h3
                      className="font-ptserif text-xl font-normal text-[#04122b] group-hover:text-[#0066FF] transition-colors"
                      style={{ fontFamily: "'PT Serif', serif" }}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#475569] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 text-[#04122b] group-hover:text-[#0066FF] group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BAND 6: BOTTOM JASPER-INSPIRED PIXEL-MOSAIC CTA (Zero Border-Radius)
         ========================================================================= */}
      <section className="px-5 sm:px-8 lg:px-12 pt-4">
        <div
          id="pricing-proposal-cta"
          className="relative w-full max-w-[1260px] mx-auto overflow-hidden rounded-none bg-[#e8f1ff] px-6 py-20 sm:px-12 sm:py-24 lg:py-28 text-center"
        >
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
              className="pricing-proposal-heading font-ptserif text-3xl sm:text-4xl lg:text-[48px] font-normal text-[#04122b] tracking-[-0.03em] leading-[1.06]"
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
                className="group inline-flex items-center justify-center gap-2 rounded-none bg-[#04122b] px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-white transition-colors duration-200 hover:bg-[#0066FF] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Request a proposal" icon={<ArrowRight className="w-4 h-4" />} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('services')}
                className="group inline-flex items-center justify-center gap-2 rounded-none border border-[#04122b]/25 bg-white px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-[#04122b] transition-colors duration-200 hover:border-[#0066FF] hover:text-[#0066FF] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Explore all services" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
