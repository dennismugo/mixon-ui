import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  ArrowUpRight,
  Sliders, 
  HelpCircle, 
  Plus, 
  Minus,
  Sparkles,
  Layers,
  Cpu,
  Zap,
  Activity,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';

import RollingButtonText from '../components/RollingButtonText';
import { PRICING_FAQS } from '../seo/mixonSeo';

interface PricingProps {
  setCurrentPage: (page: any) => void;
}

export default function Pricing({ setCurrentPage }: PricingProps) {
  const reduceMotion = useReducedMotion();
  const [currency, setCurrency] = useState<'KES' | 'USD'>('KES');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [volumeIndex, setVolumeIndex] = useState<number>(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Volume slider tiers for the interactive blueprint card
  const volumeTiers = [
    { label: '1 – 20 units / Single till', plan: 'Starter', desc: 'Up to 500 monthly transactions' },
    { label: '20 – 100 units / 2–5 tills', plan: 'Growth', desc: '500 to 5,000 monthly transactions' },
    { label: '100 – 500 units / Multi-branch', plan: 'Pro', desc: '5,000 to 25,000 monthly transactions' },
    { label: '500+ units / High-velocity enterprise', plan: 'Scale & Custom', desc: 'Unlimited transactions & private cluster' }
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

  const faqs = PRICING_FAQS;

  return (
    <div className="mixon-interior-page mixon-pricing-page bg-white text-gray-900 pt-28 pb-24 selection:bg-[#0066FF] selection:text-white">
      
      {/* =========================================================================
          HEADER: Context.dev Blueprint Header with Schematic Dot Constellations
         ========================================================================= */}
      <section className="relative px-6 sm:px-10 lg:px-14 pt-12 pb-16 sm:pb-20 text-center overflow-hidden">
        {/* Subtle schematic dot matrix graphics in corners matching Context.dev */}
        <div className="absolute top-8 left-8 w-64 h-32 opacity-25 bg-[radial-gradient(#0066FF_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none hidden md:block" />
        <div className="absolute top-8 right-8 w-64 h-32 opacity-25 bg-[radial-gradient(#0066FF_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none hidden md:block" />

        <div className="max-w-4xl mx-auto space-y-4 relative z-10 flex flex-col items-center text-center">
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-gray-950 tracking-[-0.035em] leading-[1.08] text-balance text-center mx-auto max-w-2xl sm:max-w-3xl">
            Straightforward,{' '}
            <span className="text-[#0066FF]">transparent pricing</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-light max-w-xl mx-auto leading-relaxed text-center">
            Fixed-scope website packages &amp; scalable product licenses. No hidden setup fees or surprise renewal costs.
          </p>

          {/* Currency & Billing Cycle Toggle Capsules */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            {/* Billing cycle toggle */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-gray-200/80">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-950 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-950 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <span>Yearly</span>
                <span className="text-[10px] text-[#0066FF] font-bold bg-blue-50 px-1.5 py-0.2 rounded-md">
                  Save 20%
                </span>
              </button>
            </div>

            {/* Currency switcher toggle */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-gray-200/80">
              <button
                type="button"
                onClick={() => setCurrency('KES')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  currency === 'KES'
                    ? 'bg-white text-gray-950 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                KES (KSh)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-white text-gray-950 shadow-xs font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE SIGNATURE CONTEXT.DEV 2-ROW BENTO PRICING TABLE
         ========================================================================= */}
      <section className="px-6 sm:px-10 lg:px-14 pb-20 sm:pb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl mx-auto rounded-xl border border-blue-200/90 bg-white overflow-hidden shadow-[0_12px_40px_rgba(0,102,255,0.05)]"
        >
          
          {/* ---------------------------------------------------------------------
              ROW 1: 4 Equal Columns with 1px hairline dividers
             --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            
            {/* TIER 1: Starter */}
            <div className="p-7 sm:p-8 flex flex-col justify-between text-left relative bg-white">
              <div>
                <h3 className="font-sans font-bold text-lg text-gray-950">Starter</h3>
                <p className="text-xs text-gray-500 font-light mt-1 mb-5 h-9 flex items-start leading-snug">
                  For exploring &amp; early-stage business setups
                </p>

                <div className="h-11 flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                    {formatPrice(25000, 200)}
                  </span>
                  <span className="text-xs font-mono text-gray-400">/mo</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group w-full h-10 py-2 px-4 rounded-lg text-xs font-sans font-semibold border border-gray-300 hover:border-gray-950 text-gray-900 hover:bg-gray-50 transition-all duration-200 cursor-pointer mb-6 flex items-center justify-center active:scale-[0.99]"
                >
                  <RollingButtonText text="Start with Starter" />
                </button>

                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <div className="h-5 flex items-center text-[11px] font-mono text-[#0066FF] font-semibold">
                    Up to 5 custom pages included
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600 font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Mobile-first responsive architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Sub-second load times &amp; SSL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Direct inquiry capture form</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Delivery in 7–10 business days</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TIER 2: Growth */}
            <div className="p-7 sm:p-8 flex flex-col justify-between text-left relative bg-white">
              <div>
                <h3 className="font-sans font-bold text-lg text-gray-950">Growth</h3>
                <p className="text-xs text-gray-500 font-light mt-1 mb-5 h-9 flex items-start leading-snug">
                  For expanding businesses &amp; dynamic publishing
                </p>

                <div className="h-11 flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                    {formatPrice(40500, 325)}
                  </span>
                  <span className="text-xs font-mono text-gray-400">/mo</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group w-full h-10 py-2 px-4 rounded-lg text-xs font-sans font-semibold border border-gray-300 hover:border-gray-950 text-gray-900 hover:bg-gray-50 transition-all duration-200 cursor-pointer mb-6 flex items-center justify-center active:scale-[0.99]"
                >
                  <RollingButtonText text="Choose Growth" />
                </button>

                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <div className="h-5 flex items-center text-[11px] font-mono text-[#0066FF] font-semibold">
                    CMS &amp; Structured Schema included
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600 font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Everything in Starter</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Intuitive Content Management (CMS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>AEO &amp; GEO Answer-Engine schema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>WhatsApp notifications &amp; alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>30 days post-launch SLA support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TIER 3: Pro (ONLY TIER WITH MIXON BLUE SOLID BUTTON & TEXT ROLL) */}
            <div className="p-7 sm:p-8 flex flex-col justify-between text-left relative bg-[#FCFDFF] ring-2 ring-[#0066FF]/20 md:ring-0">
              <div>
                <h3 className="font-sans font-bold text-lg text-gray-950">Pro</h3>
                <p className="text-xs text-gray-500 font-light mt-1 mb-5 h-9 flex items-start leading-snug">
                  For high-concurrency commercial operations
                </p>

                <div className="h-11 flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                    {formatPrice(75500, 600)}
                  </span>
                  <span className="text-xs font-mono text-gray-400">/mo</span>
                </div>

                {/* THE ONLY BUTTON WITH SOLID BLUE BACKGROUND */}
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group w-full h-10 py-2 px-4 rounded-lg text-xs font-sans font-semibold bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/40 hover:ring-blue-500 transition-all duration-200 cursor-pointer mb-6 flex items-center justify-center active:scale-[0.99]"
                >
                  <RollingButtonText text="Start Pro" />
                </button>

                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <div className="h-5 flex items-center text-[11px] font-mono text-[#0066FF] font-semibold">
                    Direct Payment Rails &amp; Portals
                  </div>
                  <ul className="space-y-2 text-xs text-gray-700 font-normal">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Everything in Growth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>M-Pesa Daraja STK Push &amp; Card Rails</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Custom client portals &amp; calculators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Zero-leakage settlement webhooks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Dedicated technical engineer support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TIER 4: Scale */}
            <div className="p-7 sm:p-8 flex flex-col justify-between text-left relative bg-white">
              <div>
                <h3 className="font-sans font-bold text-lg text-gray-950">Scale</h3>
                <p className="text-xs text-gray-500 font-light mt-1 mb-5 h-9 flex items-start leading-snug">
                  For multi-branch &amp; high-volume teams
                </p>

                <div className="h-11 flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                    {formatPrice(145000, 1150)}
                  </span>
                  <span className="text-xs font-mono text-gray-400">/mo</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group w-full h-10 py-2 px-4 rounded-lg text-xs font-sans font-semibold border border-gray-300 hover:border-gray-950 text-gray-900 hover:bg-gray-50 transition-all duration-200 cursor-pointer mb-6 flex items-center justify-center active:scale-[0.99]"
                >
                  <RollingButtonText text="Start Scale" />
                </button>

                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <div className="h-5 flex items-center text-[11px] font-mono text-[#0066FF] font-semibold">
                    Dedicated Concurrency &amp; APIs
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600 font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Custom REST &amp; GraphQL endpoints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Multi-department role permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Hourly automated ledger backups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Dedicated technical account lead</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* ---------------------------------------------------------------------
              ROW 2: BENTO GRID (50% Interactive Volume Widget + 25% Enterprise + 25% Custom)
             --------------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-gray-200 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            
            {/* 50% LEFT: Interactive Volume Recommender (matches Context.dev Page Volume Widget) */}
            <div className="lg:col-span-6 p-7 sm:p-8 flex flex-col justify-between text-left relative bg-slate-50/50 overflow-hidden">
              {/* Dot matrix graphic on the right matching Context.dev */}
              <div className="absolute top-4 right-4 w-40 h-40 opacity-20 bg-[radial-gradient(#0066FF_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0066FF]" />
                  <h4 className="font-sans font-bold text-lg text-gray-950">
                    Which plan fits your operational volume?
                  </h4>
                </div>
                <p className="text-xs text-gray-500 font-light">
                  Select your current activity level to identify the ideal license and infrastructure tier.
                </p>

                {/* Interactive Tier Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {volumeTiers.map((tier, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setVolumeIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        volumeIndex === idx
                          ? 'bg-white border-[#0066FF] ring-2 ring-[#0066FF]/20 shadow-xs'
                          : 'bg-white/70 hover:bg-white border-gray-200 text-gray-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-gray-950">{tier.label}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Recommendation Result */}
              <div className="relative z-10 pt-6 mt-6 border-t border-gray-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 font-semibold block">
                    Recommended Architecture
                  </span>
                  <span className="text-sm font-sans font-bold text-[#0066FF]">
                    {volumeTiers[volumeIndex].plan} Tier
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <RollingButtonText text="Select Plan" icon={<ArrowRight className="w-3.5 h-3.5" />} />
                </button>
              </div>
            </div>

            {/* 25% Enterprise Tier */}
            <div className="lg:col-span-3 p-7 sm:p-8 flex flex-col justify-between text-left relative bg-white">
              <div>
                <h3 className="font-sans font-bold text-lg text-gray-950">Enterprise</h3>
                <p className="text-xs text-gray-500 font-light mt-1 mb-5 h-9 flex items-start leading-snug">
                  Tailored multi-system rollout &amp; private SLA
                </p>

                <div className="h-11 flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                    {formatPrice(250000, 2000)}
                  </span>
                  <span className="text-xs font-mono text-gray-400">/mo</span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group w-full h-10 py-2 px-4 rounded-lg text-xs font-sans font-semibold border border-gray-300 hover:border-gray-950 text-gray-900 hover:bg-gray-50 transition-all duration-200 cursor-pointer mb-6 flex items-center justify-center active:scale-[0.99]"
                >
                  <RollingButtonText text="Start Enterprise" />
                </button>

                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <div className="h-5 flex items-center text-[11px] font-mono text-[#0066FF] font-semibold">
                    Private SLA &amp; Telco Rails
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600 font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Custom telco USSD shortcodes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Dedicated staging &amp; load tests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>99.95% uptime contract SLA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 25% Custom Tier */}
            <div className="lg:col-span-3 p-7 sm:p-8 flex flex-col justify-between text-left relative bg-white">
              <div>
                <h3 className="font-sans font-bold text-lg text-gray-950">Custom</h3>
                <p className="text-xs text-gray-500 font-light mt-1 mb-5 h-9 flex items-start leading-snug">
                  Bespoke platforms &amp; end-to-end engineering
                </p>

                <div className="h-11 flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                    Custom
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group w-full h-10 py-2 px-4 rounded-lg text-xs font-sans font-semibold border border-gray-300 hover:border-gray-950 text-gray-900 hover:bg-gray-50 transition-all duration-200 cursor-pointer mb-6 flex items-center justify-center active:scale-[0.99]"
                >
                  <RollingButtonText text="Talk to Sales" />
                </button>

                <div className="space-y-3 pt-5 border-t border-gray-100">
                  <div className="h-5 flex items-center text-[11px] font-mono text-[#0066FF] font-semibold">
                    100% Bespoke Codebase &amp; IP
                  </div>
                  <ul className="space-y-2 text-xs text-gray-600 font-light">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Full system map &amp; threat model</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Hardware turnstile / POS integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>Dedicated full-stack engineering team</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* ---------------------------------------------------------------------
              BOTTOM TABLE BANNER: Full-width link strip matching Context.dev
             --------------------------------------------------------------------- */}
          <div className="p-4 sm:p-5 bg-blue-50/40 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <span className="text-gray-600 text-center sm:text-left">
              Looking for custom multi-branch licensing or high-volume payment terms?
            </span>
            <button 
              type="button"
              onClick={() => setCurrentPage('contact')} 
              className="text-[#0066FF] font-bold hover:underline inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Talk to an engineer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </motion.div>
      </section>

      {/* =========================================================================
          "One platform. Every capability." TECHNICAL BREAKDOWN TABLE (Context.dev Matrix)
         ========================================================================= */}
      <section className="py-20 sm:py-24 px-6 sm:px-10 lg:px-14 bg-white border-b border-gray-200/80">
        <div className="w-full max-w-7xl mx-auto text-left">
          <div className="max-w-3xl mb-12 space-y-3">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              One platform.{' '}
              <span className="text-[#0066FF]">Every capability.</span>
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Clear specifications and operational thresholds included with each tier.
            </p>
          </div>

          {/* Clean technical comparison table */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-200 font-mono text-gray-500 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4 sm:p-5 font-semibold">Capability</th>
                  <th className="p-4 sm:p-5 font-semibold">Starter</th>
                  <th className="p-4 sm:p-5 font-semibold">Growth</th>
                  <th className="p-4 sm:p-5 font-semibold text-gray-950">Pro</th>
                  <th className="p-4 sm:p-5 font-semibold">Scale &amp; Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-light">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900">Custom Page Hierarchy</td>
                  <td className="p-4 sm:p-5 text-gray-600">Up to 5 Pages</td>
                  <td className="p-4 sm:p-5 text-gray-600">Up to 15 Pages</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Unlimited</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Bespoke Architecture</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900">Mobile Money &amp; M-Pesa Daraja</td>
                  <td className="p-4 sm:p-5 text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-gray-600">C2B Paybill Capture</td>
                  <td className="p-4 sm:p-5 text-[#0066FF] font-semibold">Instant STK Push (&lt;14ms)</td>
                  <td className="p-4 sm:p-5 text-[#0066FF] font-semibold">Direct Gateway Rails</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900">OTA &amp; Room Sync Latency</td>
                  <td className="p-4 sm:p-5 text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-gray-600">Periodic Sync</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Sub-second Channel Lock</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Distributed Redis Lock</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900">Offline-First Turnstile QR Scan</td>
                  <td className="p-4 sm:p-5 text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-gray-400">—</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Local ECDSA Cryptography</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Hardware Gate Integration</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900">Ledger Reconciliation</td>
                  <td className="p-4 sm:p-5 text-gray-600">Manual Export</td>
                  <td className="p-4 sm:p-5 text-gray-600">Daily Automated Match</td>
                  <td className="p-4 sm:p-5 text-[#0066FF] font-semibold">Real-Time Ledger Match</td>
                  <td className="p-4 sm:p-5 text-[#0066FF] font-semibold">Custom ERP Bi-directional</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-gray-900">Engineering SLA &amp; Support</td>
                  <td className="p-4 sm:p-5 text-gray-600">Standard Email</td>
                  <td className="p-4 sm:p-5 text-gray-600">30 Days Post-Launch</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Priority 4hr SLA</td>
                  <td className="p-4 sm:p-5 text-gray-950 font-semibold">Dedicated Lead &amp; 99.95%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FREQUENTLY ASKED QUESTIONS (Context.dev 2-Column Editorial FAQ)
         ========================================================================= */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-14 bg-white border-b border-gray-200/80">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Title, Subtext & Context.dev "Ask anything" Card */}
            <div className="lg:col-span-5 text-left space-y-6">
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-950 tracking-tight leading-[1.12]">
                Frequently asked <br />
                <span className="text-[#0066FF]">questions</span>
              </h2>
              <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm">
                Everything you need to know about scopes, payments, and deployment.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  className="group px-5 py-2.5 rounded-lg text-xs font-sans font-semibold bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-xs hover:shadow-md hover:shadow-blue-500/20 transition-all cursor-pointer inline-flex items-center justify-center active:scale-[0.99]"
                >
                  <RollingButtonText text="Ask a question" />
                </button>
              </div>
            </div>

            {/* Right Column: Accordion Questions */}
            <div data-scroll-no-reveal="" className="lg:col-span-7 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const panelId = `pricing-faq-answer-${idx}`;
                return (
                  <div
                    key={faq.q}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 bg-white"
                  >
                    <h3 className="m-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                      >
                        <span className="font-aktiv-faq font-normal text-gray-950 text-sm sm:text-base">
                          {faq.q}
                        </span>
                        <span className="text-gray-400 shrink-0">
                          {isOpen ? <Minus className="w-4 h-4 text-[#0066FF]" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                    </h3>
                    <motion.div
                      id={panelId}
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      aria-hidden={!isOpen}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 font-light leading-relaxed border-t border-gray-100 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM BLUEPRINT CTA (Matching Context.dev Live Web Context Blueprint Frame)
         ========================================================================= */}
      <section className="px-6 sm:px-10 lg:px-14 pt-12">
        <div className="w-full max-w-7xl mx-auto rounded-xl border border-blue-200/90 bg-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_8px_30px_rgba(0,102,255,0.04)] text-left">
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#0066FF_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

          {/* Technical crosshairs at corners */}
          <div className="absolute top-4 left-4 text-blue-300 font-mono text-xs pointer-events-none">+</div>
          <div className="absolute top-4 right-4 text-blue-300 font-mono text-xs pointer-events-none">+</div>
          <div className="absolute bottom-4 left-4 text-blue-300 font-mono text-xs pointer-events-none">+</div>
          <div className="absolute bottom-4 right-4 text-blue-300 font-mono text-xs pointer-events-none">+</div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <h3 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight leading-tight">
                Start with a clear, transparent proposal.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-light max-w-2xl leading-relaxed">
                Tell us what you want to improve. We will outline the scope, available options, exact deliverables, and timeline without making it complicated.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="group w-full py-3.5 px-6 rounded-lg text-xs font-sans font-bold bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-md hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Request a proposal" icon={<ArrowRight className="w-4 h-4" />} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('services')}
                className="group w-full py-3.5 px-6 rounded-lg text-xs font-sans font-semibold border border-blue-200 text-[#0066FF] hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
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
