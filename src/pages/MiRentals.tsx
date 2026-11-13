import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Sparkles,
  Coins,
  FileCheck,
  Check,
  Plus,
  SlidersHorizontal,
  BellRing,
  CreditCard,
  ChevronRight,
  List,
  History,
  ListChecks,
  Play
} from 'lucide-react';
import BrandButton from '../components/BrandButton';
import ProductClosingCta from '../components/ProductClosingCta';
import ProductServiceHero from '../components/ProductServiceHero';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ui/ScrollRevealText';
import ProductPhotoPanel from '../components/ProductPhotoPanel';
import ProductFaqSection from '../components/ProductFaqSection';
import { MIRENTALS_FAQS } from '../seo/mixonSeo';
import productPhoto from '../assets/images/illustrations/mirentals-illustration.jpg';

interface MiRentalsProps {
  setCurrentPage: (page: any, options?: { product?: string; service?: string }) => void;
}

export default function MiRentals({ setCurrentPage }: MiRentalsProps) {
  const reduceMotion = useReducedMotion();

  const capabilities = [
    {
      title: "See rental performance across every property",
      category: "Rental Performance",
      tag: "Portfolio Analytics",
      icon: TrendingUp,
      iconBg: "bg-amber-500 text-white",
      desc: "Review occupancy and yield information to understand how your portfolio is doing across all properties.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 215, 170, 0.45) 0%, transparent 65%)",
      actionText: "View analytics workflow"
    },
    {
      title: "Track what needs attention before rent falls overdue",
      category: "Payment Tracking",
      tag: "Arrears Telemetry",
      icon: Clock,
      iconBg: "bg-[#0066FF] text-white",
      desc: "Keep rental status and collection activity easier to review with instant visual indicators for overdue rent.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(191, 219, 254, 0.55) 0%, transparent 65%)",
      actionText: "Explore tracking system"
    },
    {
      title: "Support pricing decisions with market demand signals",
      category: "Pricing Strategy",
      tag: "Yield Optimization",
      icon: SlidersHorizontal,
      iconBg: "bg-emerald-500 text-white",
      desc: "Use available demand signals to inform unit pricing, where this feature is enabled, while keeping you in full control.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(167, 243, 208, 0.45) 0%, transparent 65%)",
      actionText: "Review pricing tools"
    },
    {
      title: "Organise tenant checks with verified documentation",
      category: "Tenant Onboarding",
      tag: "Compliance & Checks",
      icon: ShieldCheck,
      iconBg: "bg-cyan-500 text-white",
      desc: "Support tenant verification through approved workflows and verified documentation records.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(165, 243, 252, 0.45) 0%, transparent 65%)",
      actionText: "See verification flow"
    },
    {
      title: "Reduce repeat follow-ups with scheduled reminders",
      category: "Smart Follow-ups",
      tag: "Automated Messaging",
      icon: BellRing,
      iconBg: "bg-violet-600 text-white",
      desc: "Automate routine collection reminders and payment receipts where configured to save hours of administrative chasing.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(221, 214, 254, 0.45) 0%, transparent 65%)",
      actionText: "How reminders work"
    },
    {
      title: "Instant M-Pesa reconciliation directly to unit ledgers",
      category: "Telco Integration",
      tag: "M-Pesa Automation",
      icon: CreditCard,
      iconBg: "bg-rose-500 text-white",
      desc: "Match tenant mobile money paybill transactions directly to tenancy accounts in seconds, eliminating manual payment statement matching.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 205, 211, 0.45) 0%, transparent 65%)",
      actionText: "Inspect payment rails"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Onboard properties & tenants",
      desc: "Add your properties and units, and bring in your existing tenant and rent records cleanly."
    },
    {
      step: "02",
      title: "Monitor occupancy & rent",
      desc: "See occupancy and rent status at a glance, with clear attention flags for what is due."
    },
    {
      step: "03",
      title: "Act & refine decisions",
      desc: "Organise follow-ups, review performance trends, and refine property management decisions over time."
    }
  ];

  return (
    <div className="mixon-interior-page mixon-product-page mixon-rentals-page bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Building2,
          name: "miRentals",
          tag: "Property Ops"
        }}
        title="Know what is occupied. Make rent collection effortless."
        subtitle="miRentals helps rental teams move beyond manual tenant tracking. Bring rental records, occupancy metrics, and collection workflows into one crystal-clear operational view."
        primaryCta={{
          text: "Book a miRentals demo",
          onClick: () => setCurrentPage('book-demo', { product: 'miRentals' })
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
                THE REALITY OF RENTALS
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-gray-950 tracking-tight leading-[1.15]">
                Cut the busywork around your rentals
              </h2>

              <div className="border-t border-gray-200/80 pt-6 mt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <List className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Automate summaries and action items
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  From rent collection alerts to vacancy reviews, every property updates with real-time occupancy telemetry, clear action items, and automated M-Pesa reconciliation &mdash; so nothing falls through the cracks.
                </p>
              </div>

              <div className="border-t border-gray-200/80 pt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <History className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Answer what needs attention in seconds
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  Occupancy, payment status, and lease turnovers sit in one clearer view. When you open your dashboard in the morning, your most important operational questions are answered immediately.
                </p>
              </div>

              <div className="border-t border-gray-200/80" />
            </div>

            <div className="lg:col-span-6 w-full">
              <ProductPhotoPanel
                variant="mi-rentals"
                alt="Riverside Heights Apartments"
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
              Built around everyday rental workflows rather than unnecessary administrative complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {capabilities.map((cap, idx) => {
              const IconComponent = cap.icon;
              return (
                <div 
                  key={idx} 
                  className="group relative bg-white rounded-none p-8 sm:p-9 shadow-[0_10px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
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
      <HowItWorksSection eyebrow="EXECUTION" heading="How it works" description='Three clean steps from manual spreadsheets to an organized, living portfolio dashboard.' steps={steps} />

      <ProductClosingCta
        title="Spend less time chasing updates and more time managing your properties."
        description="See how miRentals fits your current process and what a practical rollout could look like for your units."
        buttonLabel="Book a miRentals demo"
        onClick={() => setCurrentPage('book-demo', { product: 'miRentals' })}
        seedOffset={11}
      />

      {/* COMMON QUESTIONS (FAQ) */}
      <ProductFaqSection faqs={MIRENTALS_FAQS} idPrefix="mirentals-faq" compactBottomSpacing />
    </div>
  );
}
