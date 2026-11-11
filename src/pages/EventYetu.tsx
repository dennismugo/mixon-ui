import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Ticket, 
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
  Users,
  Plus,
  TrendingUp,
  BarChart3,
  QrCode,
  ShieldAlert,
  CreditCard,
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
import { EVENTYETU_FAQS } from '../seo/mixonSeo';
import productPhoto from '../assets/images/illustrations/eventyetu-illustration.jpg';

interface EventYetuProps {
  setCurrentPage: (page: any) => void;
}

export default function EventYetu({ setCurrentPage }: EventYetuProps) {
  const reduceMotion = useReducedMotion();

  const capabilities = [
    {
      title: "Respond to demand with flexible tiered ticket rules",
      category: "Dynamic Pricing",
      tag: "Tier Automation",
      icon: TrendingUp,
      iconBg: "bg-amber-500 text-white",
      desc: "Configure pricing rules around sales pace and ticket tiers, where enabled, to capture optimal event revenue.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 215, 170, 0.45) 0%, transparent 65%)",
      actionText: "Explore ticketing tiers"
    },
    {
      title: "Track ticket velocity and marketing conversions in real-time",
      category: "Sales Analytics",
      tag: "Velocity Telemetry",
      icon: BarChart3,
      iconBg: "bg-blue-600 text-white",
      desc: "See how quickly different ticket categories are selling with real-time sales telemetry and demand indicators.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(191, 219, 254, 0.55) 0%, transparent 65%)",
      actionText: "View sales telemetry"
    },
    {
      title: "Validate tickets at entry with rapid offline scanners",
      category: "Gate Validation",
      tag: "Sub-Second Scanning",
      icon: QrCode,
      iconBg: "bg-emerald-500 text-white",
      desc: "Check barcodes instantly against valid-ticket records to keep gate scanning rapid and dependable.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(167, 243, 208, 0.45) 0%, transparent 65%)",
      actionText: "See scanner workflow"
    },
    {
      title: "Flag duplicate scans and fraudulent re-entries instantly",
      category: "Anti-Fraud Rails",
      tag: "Duplicate Detection",
      icon: ShieldAlert,
      iconBg: "bg-rose-500 text-white",
      desc: "Identify tickets already scanned or otherwise invalid, where supported, preventing counterfeit entries.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 205, 211, 0.45) 0%, transparent 65%)",
      actionText: "Review fraud protection"
    },
    {
      title: "Help entry run smoothly with synchronized multi-gate flows",
      category: "Crowd Flow",
      tag: "Entry Management",
      icon: Users,
      iconBg: "bg-cyan-500 text-white",
      desc: "Give gate teams a consistent, intuitive mobile scanner process for checking tickets without creating long lines.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(165, 243, 252, 0.45) 0%, transparent 65%)",
      actionText: "Explore multi-gate flow"
    },
    {
      title: "Automate promoter payouts and instant ticket settlements",
      category: "Revenue Settlement",
      tag: "Direct Payouts",
      icon: CreditCard,
      iconBg: "bg-violet-600 text-white",
      desc: "Disburse ticket proceeds and automated split commissions directly to organizer M-Pesa accounts and commercial bank rails.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(221, 214, 254, 0.45) 0%, transparent 65%)",
      actionText: "View payout architecture"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Configure event & tiers",
      desc: "Create your event, define ticket tiers (Early Bird, VIP, Regular), and set your sales pricing rules."
    },
    {
      step: "02",
      title: "Monitor sales pace",
      desc: "Watch real-time sales velocity curves and respond as demand changes leading up to the event."
    },
    {
      step: "03",
      title: "Gate validation",
      desc: "On the day, scan tickets at the gate rapidly and spot invalid or repeated entries with zero guesswork."
    }
  ];

  return (
    <div className="mixon-interior-page mixon-product-page mixon-event-page bg-white text-gray-900 pt-28 pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Ticket,
          name: "Event Yetu",
          tag: "Ticketing & Entry"
        }}
        title="Sell tickets smarter. Keep every gate moving fast."
        subtitle="Event Yetu gives promoters, venues, and festival teams the tools to sell tickets, handle high-speed QR gate entry, and monitor live attendance."
        primaryCta={{
          text: "Request an Event Yetu demo",
          onClick: () => setCurrentPage('contact')
        }}
        secondaryCta={{
          text: "View ticketing rates",
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
                THE REALITY OF TICKETING
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-gray-950 tracking-tight leading-[1.15]">
                Cut the busywork around your events
              </h2>

              <div className="border-t border-gray-200/80 pt-6 mt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <List className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Automate validation and gate telemetry
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  From tier release rules to gate queues, every pass scans with sub-second encrypted QR verification and anti-fraud duplicate detection &mdash; so lines keep moving fast.
                </p>
              </div>

              <div className="border-t border-gray-200/80 pt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <History className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Track sales velocity and settlements live
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  Gate attendance velocity, ticket tier momentum, and instant automated promoter settlements sit in one live view throughout the entire event lifecycle.
                </p>
              </div>

              <div className="border-t border-gray-200/80" />
            </div>

            <div className="lg:col-span-6 w-full">
              <ProductPhotoPanel
                variant="event-yetu"
                alt="An event host welcoming guests"
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
              Responsive tier rules during sales, dependable fraud prevention at the door.
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
      <HowItWorksSection eyebrow="EXECUTION" heading="How it works" description='Three clean steps from ticketing launch to seamless turnstile entry.' steps={steps} />

      {/* THE OUTCOME — Vessa-style dither-field CTA */}
      <section className="dither-cta-section py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="dither-cta-plate">
          <h2 className="font-display">
            Ticket sales that stay responsive, and entry checks that stay straightforward.
          </h2>
          <div className="dither-cta-desc">
            See how Event Yetu fits your current event process and what a practical rollout could look like for your upcoming date.
          </div>
          <ExpandingArrowButton size="pill" onClick={() => setCurrentPage('contact')} className="mx-auto h-11 min-w-[210px]">
            Request an Event Yetu demo
          </ExpandingArrowButton>
        </div>
      </section>

      {/* COMMON QUESTIONS (FAQ) */}
      <ProductFaqSection faqs={EVENTYETU_FAQS} idPrefix="eventyetu-faq" />
    </div>
  );
}
