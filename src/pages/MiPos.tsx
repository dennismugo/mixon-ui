import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Zap, 
  TrendingUp, 
  CreditCard, 
  Warehouse,
  Plus,
  PackageSearch,
  AlertTriangle,
  Calculator,
  Truck,
  HeartHandshake,
  ChevronRight,
  List,
  History,
  ListChecks,
  Play
} from 'lucide-react';
import BrandButton from '../components/BrandButton';
import { ExpandingArrowButton } from '../components/ui/expanding-arrow-button';
import ProductServiceHero from '../components/ProductServiceHero';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ui/ScrollRevealText';
import ProductPhotoPanel from '../components/ProductPhotoPanel';
import ProductFaqSection from '../components/ProductFaqSection';
import { MIPOS_FAQS } from '../seo/mixonSeo';
import productPhoto from '../assets/images/illustrations/mipos-illustration.jpg';

interface MiPosProps {
  setCurrentPage: (page: any) => void;
}

export default function MiPos({ setCurrentPage }: MiPosProps) {
  const reduceMotion = useReducedMotion();

  const capabilities = [
    {
      title: "Plan stock with more confidence using demand telemetry",
      category: "Inventory Intelligence",
      tag: "Demand Planning",
      icon: PackageSearch,
      iconBg: "bg-amber-500 text-white",
      desc: "Use available sales and demand information to support replenishment decisions before shelves run dry.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 215, 170, 0.45) 0%, transparent 65%)",
      actionText: "View inventory planning"
    },
    {
      title: "Watch stock levels with real-time threshold notifications",
      category: "Threshold Alerts",
      tag: "Stock Guard",
      icon: AlertTriangle,
      iconBg: "bg-blue-600 text-white",
      desc: "Identify items approaching low levels where alerts are enabled, cutting out of stock moments on high-margin goods.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(191, 219, 254, 0.55) 0%, transparent 65%)",
      actionText: "Inspect alert rules"
    },
    {
      title: "Review register variances and reconcile drawer cash",
      category: "Cash & Terminal Audit",
      tag: "Variance Detection",
      icon: Calculator,
      iconBg: "bg-emerald-500 text-white",
      desc: "Compare recorded terminal activity with expected cash and digital payment totals to detect shrinkage quickly.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(167, 243, 208, 0.45) 0%, transparent 65%)",
      actionText: "See register reconciliation"
    },
    {
      title: "Check payment status across M-Pesa, cards, and cash",
      category: "Payment Rails",
      tag: "Omnichannel Settlement",
      icon: CreditCard,
      iconBg: "bg-cyan-500 text-white",
      desc: "Review supported payment and settlement records across mobile money (M-Pesa), cards, and cash where configured.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(165, 243, 252, 0.45) 0%, transparent 65%)",
      actionText: "Explore payment integrations"
    },
    {
      title: "Organise restocking and track purchase order receipts",
      category: "Supply Chain",
      tag: "Supplier Workflows",
      icon: Truck,
      iconBg: "bg-violet-600 text-white",
      desc: "Use purchase-order workflows to make replenishment deliberate, tracked, and synchronized with suppliers.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(221, 214, 254, 0.45) 0%, transparent 65%)",
      actionText: "How PO workflow works"
    },
    {
      title: "Cultivate customer loyalty with paperless digital receipts",
      category: "Customer Retention",
      tag: "Loyalty & Receipts",
      icon: HeartHandshake,
      iconBg: "bg-rose-500 text-white",
      desc: "Capture shopper phone numbers at checkout, deliver SMS and WhatsApp receipts, and reward top-tier customers automatically.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 205, 211, 0.45) 0%, transparent 65%)",
      actionText: "Review loyalty system"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Setup catalog & registers",
      desc: "Set up your products, stock counts, and counter terminals across single or multiple shop locations."
    },
    {
      step: "02",
      title: "Sell & capture velocity",
      desc: "Sell smoothly, and let automated sales and stock records build a clear real-time picture of what is moving."
    },
    {
      step: "03",
      title: "Audit & restock",
      desc: "Review daily register variances, check payment settlements, and plan purchase orders from the same place."
    }
  ];

  return (
    <div className="mixon-interior-page mixon-product-page mixon-pos-page bg-white text-gray-900 pt-28 pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Warehouse,
          name: "miPOS",
          tag: "Retail Operations"
        }}
        title="Know what is selling. Keep stock and sales in check."
        subtitle="miPOS helps merchants process counter transactions fast, track stock levels across locations, and keep cash and mobile money balances perfectly aligned."
        primaryCta={{
          text: "Book a miPOS demo",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "View pricing",
          onClick: () => setCurrentPage('pricing')
        }}
      />

      {/* THE STORY - REDESIGNED MATCHING IMAGE 1 WITH BRAND THEME COLORS */}
      <section className="py-20 sm:py-28 bg-white px-6 sm:px-10 lg:px-14 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Section Tag, Display Headline, and Feature List with Dividers */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-[#0066FF] font-bold block">
                THE REALITY OF RETAIL
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-gray-950 tracking-tight leading-[1.15]">
                Cut the busywork around your registers
              </h2>

              <div className="border-t border-gray-200/80 pt-6 mt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <List className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Automate end-of-day register reconciliation
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  From cash drawers to mobile money tills, reconcile every register instantly with zero manual arithmetic. M-Pesa statements balance directly against sales tickets with real-time discrepancy alerts.
                </p>
              </div>

              <div className="border-t border-gray-200/80 pt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <History className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Spot low stock and margin leaks before you run dry
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  Demand telemetry alerts store teams when fast-moving items reach replenishment thresholds, stopping stockouts before shelves empty and saving hours of manual inventory audits.
                </p>
              </div>

              <div className="border-t border-gray-200/80" />
            </div>

            <div className="lg:col-span-6 w-full">
              <ProductPhotoPanel
                variant="mi-pos"
                alt="A retail operator working at a laptop"
              />
            </div>

          </div>
        </div>
      </section>

      {/* WHAT IT HELPS YOU DO (Redesigned matching Reference Style 2) */}
      <section className="product-capabilities-surface py-20 sm:py-24 border-b border-gray-200/80 px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#0066FF] font-bold block">
              CAPABILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-gray-950 tracking-tight leading-tight">
              What it helps you do
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto font-light">
              Actionable inventory signals and transparent register accounting in one view.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {capabilities.map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative bg-white rounded-xl p-8 sm:p-9 shadow-[0_10px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
                  style={{
                    background: `
                      ${cap.ambientGradient},
                      linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)
                    `
                  }}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-xl ${cap.iconBg} flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-105`}>
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="font-sans font-bold text-gray-950 text-sm tracking-tight leading-snug">
                        {cap.category}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl sm:text-[22px] text-gray-950 leading-[1.25] tracking-tight">
                      {cap.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] text-gray-600 leading-relaxed font-light">
                      &ldquo;{cap.desc}&rdquo;
                    </p>
                  </div>

                  <div className="pt-6 flex items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentPage('contact')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-900 group-hover:text-[#0066FF] transition-colors cursor-pointer"
                    >
                      <span>{cap.actionText}</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <HowItWorksSection eyebrow="EXECUTION" heading="How it works" description='Three clean steps from inventory intake to balanced cash registers.' steps={steps} />

      {/* THE OUTCOME — Vessa-style dither-field CTA */}
      <section className="dither-cta-section py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="dither-cta-plate">
          <h2 className="font-display">
            Make stock decisions with more confidence, and spend less time reconciling the day.
          </h2>
          <div className="dither-cta-desc">
            See how miPOS fits your current store setup and what a practical rollout could look like across your checkout terminals.
          </div>
          <ExpandingArrowButton size="pill" onClick={() => setCurrentPage('contact')} className="mx-auto h-11 min-w-[190px]">
            Book a miPOS demo
          </ExpandingArrowButton>
        </div>
      </section>

      {/* COMMON QUESTIONS (FAQ) */}
      <ProductFaqSection faqs={MIPOS_FAQS} idPrefix="mipos-faq" />
    </div>
  );
}
