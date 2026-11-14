import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  HelpCircle,
  ArrowRight,
  Layers,
  CreditCard,
  Code2,
  Sparkles,
  Smartphone,
  Building2,
  CheckCircle2,
  X
} from 'lucide-react';
import { FaqAccordionBox } from '../components/FaqAccordionBox';
import RollingButtonText from '../components/RollingButtonText';
import {
  FaqEntry,
  HOME_FAQS,
  PRICING_FAQS,
  WEB_SERVICE_FAQS,
  APP_SERVICE_FAQS,
  PAYMENTS_SERVICE_FAQS,
  AI_SERVICE_FAQS,
  SEO_SERVICE_FAQS,
  ECOMMERCE_SERVICE_FAQS,
  MIRENTALS_FAQS,
  MIRESERVE_FAQS,
  EVENTYETU_FAQS,
  MIPOS_FAQS,
} from '../seo/mixonSeo';

interface FaqsProps {
  setCurrentPage: (page: string) => void;
}

interface FaqCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  faqs: FaqEntry[];
}

export default function Faqs({ setCurrentPage }: FaqsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: FaqCategory[] = useMemo(() => [
    {
      id: 'general',
      label: 'General & Company',
      icon: HelpCircle,
      description: 'Foundational questions about Mixon, our Nairobi engineering team, and operational philosophy.',
      faqs: HOME_FAQS,
    },
    {
      id: 'pricing',
      label: 'Pricing & Delivery',
      icon: CreditCard,
      description: 'Transparent pricing tiers, contract terms, SLA tiers, and 30-day milestone rollout guarantees.',
      faqs: PRICING_FAQS,
    },
    {
      id: 'web-app',
      label: 'Web & Mobile Apps',
      icon: Code2,
      description: 'Custom React & Next.js platforms, native iOS/Android development, offline SQLite sync, and USSD menus.',
      faqs: [...WEB_SERVICE_FAQS, ...APP_SERVICE_FAQS],
    },
    {
      id: 'payments',
      label: 'M-Pesa & Fintech',
      icon: Layers,
      description: 'Safaricom Daraja STK Push, Paybill/Till automation, multi-currency card rails, and ledger reconciliation.',
      faqs: PAYMENTS_SERVICE_FAQS,
    },
    {
      id: 'ai-automation',
      label: 'AI & Automations',
      icon: Sparkles,
      description: 'Practical document parsing (OCR), WhatsApp/Slack customer operations, and automated bookkeeping bots.',
      faqs: AI_SERVICE_FAQS,
    },
    {
      id: 'seo-ecommerce',
      label: 'SEO & Commerce',
      icon: Smartphone,
      description: 'Core Web Vitals tuning, programmatic answer-engine optimization, and headless digital storefronts.',
      faqs: [...SEO_SERVICE_FAQS, ...ECOMMERCE_SERVICE_FAQS],
    },
    {
      id: 'platforms',
      label: 'Platforms',
      icon: Building2,
      description: 'Proprietary enterprise systems: miRentals, miReserve, Event Yetu, and miPOS multi-branch retail.',
      faqs: [...MIRENTALS_FAQS, ...MIRESERVE_FAQS, ...EVENTYETU_FAQS, ...MIPOS_FAQS],
    },
  ], []);

  // Compute all unique FAQs for universal search
  const allFaqs: FaqEntry[] = useMemo(() => {
    const map = new Map<string, FaqEntry>();
    categories.forEach((cat) => {
      cat.faqs.forEach((item) => {
        if (!map.has(item.q)) {
          map.set(item.q, item);
        }
      });
    });
    return Array.from(map.values());
  }, [categories]);

  // Filtered results based on search query or active category
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      return allFaqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q)
      );
    }
    if (selectedCategory === 'all') {
      return allFaqs;
    }
    const current = categories.find((c) => c.id === selectedCategory);
    return current ? current.faqs : allFaqs;
  }, [searchQuery, selectedCategory, allFaqs, categories]);

  return (
    <div className="mixon-interior-page mixon-faqs-page bg-white text-[#04122b] pt-24 sm:pt-28 selection:bg-[#0066FF] selection:text-white">
      {/* =========================================================================
          HERO BANNER: EDITORIAL FAQ DIRECTORY HEADER
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 pt-10 sm:pt-14 pb-12 sm:pb-16 bg-[#f2f6fd] border-b border-slate-200/80">
        <div className="w-full max-w-7xl mx-auto text-left">
          <div className="max-w-3xl space-y-4">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.16em] text-[#0066FF] font-semibold">
              KNOWLEDGE BASE &amp; FREQUENTLY ASKED QUESTIONS
            </span>
            <h1
              className="text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#04122b] tracking-[-0.035em] leading-[1.08]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Everything you need to know about Mixon.
            </h1>
            <p className="font-sans text-[15px] sm:text-base text-slate-600 font-normal leading-[1.65]">
              Find clear, direct answers about our software engineering practices, Safaricom Daraja integrations, delivery milestones, pricing models, and operational software systems.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="mt-8 max-w-2xl relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any question, e.g. M-Pesa STK push, pricing, USSD, SLA..."
                className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-none bg-white border border-[#c5daf8] text-sm sm:text-[15px] text-[#04122b] placeholder-slate-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all shadow-[0_4px_16px_rgba(4,18,43,0.04)]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-2 text-xs font-mono text-slate-500">
                Found {filteredFaqs.length} {filteredFaqs.length === 1 ? 'result' : 'results'} for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY FILTER TABS & FAQS CONTENT DIRECTORY
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto">
          {/* Horizontal Category Filter Pills */}
          {!searchQuery && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 sm:mb-12 border-b border-slate-200 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`shrink-0 px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#04122b] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-[#04122b]'
                }`}
              >
                All Questions ({allFaqs.length})
              </button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#04122b] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-[#04122b]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 stroke-[2]" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* FAQ Accordion List */}
          {filteredFaqs.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <FaqAccordionBox faqs={filteredFaqs} idPrefix="page-faq" className="w-full" />
            </div>
          ) : (
            <div className="py-16 text-center max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 rounded-none bg-blue-50 text-[#0066FF] flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="font-ptserif text-2xl font-normal text-[#04122b]">
                No questions found
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We couldn&apos;t find an answer matching &ldquo;{searchQuery}&rdquo;. Reach out to our engineering team directly and we will answer your question right away.
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-[#04122b] hover:bg-[#0066FF] text-white font-sans text-xs font-semibold rounded-none transition-colors cursor-pointer"
              >
                <span>Ask our team directly →</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          BOTTOM PIXEL-MOSAIC CTA BANNER (Zero Border Radius, #F2F6FD)
         ========================================================================= */}
      <section className="w-full px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 pb-8 sm:pb-10">
        <div
          id="faqs-proposal-cta"
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

          {/* Mobile Geometric Edge SVGs (Removed on mobile per user instruction) */}

          <div className="relative z-10 mx-auto max-w-2xl space-y-5">
            <h2
              className="pricing-proposal-heading font-ptserif text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#04122b] tracking-[-0.03em] leading-[1.08]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              Have a specific question not covered here?
            </h2>
            <p className="mx-auto max-w-xl font-sans text-sm sm:text-[15px] text-[#04122b]/80 font-normal leading-[1.6]">
              Our engineering team in Kilimani, Nairobi is always available to review your technical requirements, API parameters, or contract scope.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-none bg-[#0066FF] px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-white transition-colors duration-200 hover:bg-[#0052cc] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="Speak with an engineer" icon={<ArrowRight className="w-4 h-4" />} />
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('pricing')}
                className="group inline-flex items-center justify-center gap-2 rounded-none border border-[#04122b]/25 bg-white px-6 py-3.5 text-xs sm:text-[13px] font-sans font-semibold text-[#04122b] transition-colors duration-200 hover:border-[#0066FF] hover:text-[#0066FF] cursor-pointer active:scale-[0.99]"
              >
                <RollingButtonText text="View pricing packages" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
