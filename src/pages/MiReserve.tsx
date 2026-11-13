import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Hotel, 
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
  Plus,
  ShieldAlert,
  UserCheck,
  Key,
  Activity,
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
import { MIRESERVE_FAQS } from '../seo/mixonSeo';
import productPhoto from '../assets/images/illustrations/mireserve-illustration.jpg';

interface MiReserveProps {
  setCurrentPage: (page: any, options?: { product?: string; service?: string }) => void;
}

export default function MiReserve({ setCurrentPage }: MiReserveProps) {
  const reduceMotion = useReducedMotion();

  const capabilities = [
    {
      title: "Keep booking information aligned across all channels",
      category: "Multi-Channel Sync",
      tag: "iCal & API Integration",
      icon: Calendar,
      iconBg: "bg-blue-600 text-white",
      desc: "Synchronise reservation data across supported connected channels to ensure one unified calendar.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(191, 219, 254, 0.55) 0%, transparent 65%)",
      actionText: "Explore sync engine"
    },
    {
      title: "Reduce double-booking risk with instantaneous hold rails",
      category: "Availability Guard",
      tag: "Collision Prevention",
      icon: ShieldAlert,
      iconBg: "bg-amber-500 text-white",
      desc: "Make availability updates easier to coordinate across Airbnb, Booking.com and direct channels as reservations change.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 215, 170, 0.45) 0%, transparent 65%)",
      actionText: "See channel guard"
    },
    {
      title: "Organise guest verification and pre-arrival screening",
      category: "Guest Vetting",
      tag: "Security & ID Verification",
      icon: UserCheck,
      iconBg: "bg-emerald-500 text-white",
      desc: "Support guest-check steps and identity verification workflows in line with your operating policy.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(167, 243, 208, 0.45) 0%, transparent 65%)",
      actionText: "Review check-in steps"
    },
    {
      title: "Improve check-in readiness and arrival coordination",
      category: "Front Desk Operations",
      tag: "Readiness Tracking",
      icon: Key,
      iconBg: "bg-cyan-500 text-white",
      desc: "Give front desk and hospitality staff a clearer view of reservation and verification status before arrival.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(165, 243, 252, 0.45) 0%, transparent 65%)",
      actionText: "Explore front desk view"
    },
    {
      title: "Monitor key signals, channel latency, and RevPAR",
      category: "Hospitality Telemetry",
      tag: "Performance Signals",
      icon: Activity,
      iconBg: "bg-violet-600 text-white",
      desc: "Review sync health, channel latency indicators and booking performance where available in one place.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(221, 214, 254, 0.45) 0%, transparent 65%)",
      actionText: "View telemetry dashboard"
    },
    {
      title: "Streamline housekeeping dispatch and room turnover",
      category: "Housekeeping Sync",
      tag: "Turnaround Operations",
      icon: Sparkles,
      iconBg: "bg-rose-500 text-white",
      desc: "Automatically alert cleaning teams upon guest checkout and verify room cleanliness before releasing keys to new arrivals.",
      ambientGradient: "radial-gradient(ellipse at 85% 95%, rgba(254, 205, 211, 0.45) 0%, transparent 65%)",
      actionText: "See turnover workflow"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Connect booking channels",
      desc: "Link your supported online travel agencies and direct reservation calendars."
    },
    {
      step: "02",
      title: "Automatic alignment",
      desc: "Reservations and room availability stay aligned in real time as bookings come in and change."
    },
    {
      step: "03",
      title: "Smooth guest arrival",
      desc: "Your team sees verification and check-in status at a glance, ready for every arriving guest."
    }
  ];

  return (
    <div className="mixon-interior-page mixon-product-page mixon-reserve-page bg-white text-gray-900 pt-28 pb-0 selection:bg-[#0066FF] selection:text-white">
      {/* Calendly/Linear Inspired Radiant Gradient Hero Section */}
      <ProductServiceHero
        badge={{
          icon: Calendar,
          name: "miReserve",
          tag: "Hospitality"
        }}
        title="Keep bookings in sync. Give guests a smoother stay."
        subtitle="miReserve helps accommodation teams coordinate reservations across supported channels, organize guest verification, and make check-ins effortless."
        primaryCta={{
          text: "Book a miReserve demo",
          onClick: () => setCurrentPage('book-demo', { product: 'miReserve' })
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
                THE REALITY OF BOOKINGS
              </span>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-bold text-gray-950 tracking-tight leading-[1.15]">
                Cut the busywork around your bookings
              </h2>

              <div className="border-t border-gray-200/80 pt-6 mt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <List className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Automate multi-channel locks and stay summaries
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  From Airbnb to direct reservations, every booking updates with instant two-way calendar sync, automated ID vetting, and scheduled check-in pins &mdash; so duplicate bookings never happen.
                </p>
              </div>

              <div className="border-t border-gray-200/80 pt-6">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <History className="w-5 h-5 text-gray-950 shrink-0" strokeWidth={2} />
                  <h3 className="font-sans font-bold text-gray-950 text-base sm:text-lg tracking-tight">
                    Give guests a smoother stay effortlessly
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  Turnover tasks, keyless PIN dispatch, and WhatsApp arrival guides trigger automatically upon confirmation, leaving front desks and villa owners completely in control.
                </p>
              </div>

              <div className="border-t border-gray-200/80" />
            </div>

            <div className="lg:col-span-6 w-full">
              <ProductPhotoPanel
                variant="mi-reserve"
                alt="A modern resort villa and pool"
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
              Keep every room, suite, and villa synchronized without manual calendar checks.
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
      <HowItWorksSection eyebrow="EXECUTION" heading="How it works" description='Three clean steps from disjointed calendars to unified hospitality telemetry.' steps={steps} />

      <ProductClosingCta
        title="Fewer booking surprises for your team. A smoother arrival for your guests."
        description="See how miReserve fits your current process and what a practical rollout could look like across your channels."
        buttonLabel="Book a miReserve demo"
        onClick={() => setCurrentPage('book-demo', { product: 'miReserve' })}
        seedOffset={13}
      />

      {/* COMMON QUESTIONS (FAQ) */}
      <ProductFaqSection faqs={MIRESERVE_FAQS} idPrefix="mireserve-faq" compactBottomSpacing />
    </div>
  );
}
