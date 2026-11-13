/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import { Lead } from '../types';
import { PulseStripeBackground } from '../components/ui/pulse-stripe-hero';
import RollingButtonText from '../components/RollingButtonText';
import PreFooterCta from '../components/PreFooterCta';
import { scrollToTarget } from '../utils/smoothScroll';

// Fleetora Design System Components
import { FleetoraLogosMarquee } from '../components/fleetora/FleetoraLogosMarquee';
import { FleetoraAboutMetrics } from '../components/fleetora/FleetoraAboutMetrics';
import { FleetoraPartnerBanner } from '../components/fleetora/FleetoraPartnerBanner';
import { UnifyOperationsSection } from '../components/UnifyOperationsSection';
import { FleetoraServicesStack } from '../components/fleetora/FleetoraServicesStack';
import { FleetoraWorkStepper } from '../components/fleetora/FleetoraWorkStepper';
import { FleetoraIntegrationsStack } from '../components/fleetora/FleetoraIntegrationsStack';
import { FleetoraTestimonials } from '../components/fleetora/FleetoraTestimonials';
import { FleetoraFaq } from '../components/fleetora/FleetoraFaq';

interface HomeProps {
  onLeadCaptured: (lead: Lead) => void;
  setCurrentPage: (page: any) => void;
  leadRefresh: number;
}

export default function Home({ onLeadCaptured, setCurrentPage, leadRefresh }: HomeProps) {
  const [titleRevealed, setTitleRevealed] = useState(false);

  return (
    <div className="relative mixon-home-page selection:bg-[#0066FF] selection:text-white">
      
      {/* 1. HERO SECTION WITH VERTICAL DARK BLUE / LIGHT BLUE MOVING STRIPES */}
      <section 
        id="home-hero"
        className="relative bg-[#04122B] overflow-hidden min-h-[100svh] sm:min-h-[104svh] flex flex-col justify-center items-center pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 text-center select-none w-full px-5 sm:px-10 lg:px-14"
      >
        {/* Vertical darkish-blue & light-blue pulsing stripes on sides with calm center */}
        <PulseStripeBackground palette="mixon" stripes={16} layoutVariant="sides" durationSec={11} />

        {/* Centered Main Content Container matching Navbar max-w-7xl (pointer-events-none lets stripes glow on hover) */}
        <div className="w-full max-w-7xl mx-auto relative z-20 flex flex-col items-center text-center pointer-events-none">
          
          {/* Eyebrow Social Proof Rating Pill */}
          <div className="pointer-events-auto inline-flex max-w-full flex-nowrap items-center gap-1.5 sm:gap-3 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 shadow-xs mb-6 sm:mb-8 backdrop-blur-md hover:border-sky-300/45 transition-colors">
            {/* 4 Avatars Stack */}
            <div className="flex -space-x-2 shrink-0 items-center">
              <img 
                src="/avatars/avatar1.jpg" 
                alt="Property Manager" 
                width={28}
                height={28}
                decoding="async"
                loading="eager"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white/90 shadow-xs ring-1 ring-black/10" 
              />
              <img 
                src="/avatars/avatar2.jpg" 
                alt="Tech Founder" 
                width={28}
                height={28}
                decoding="async"
                loading="eager"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white/90 shadow-xs ring-1 ring-black/10" 
              />
              <img 
                src="/avatars/avatar3.jpg" 
                alt="Operations Director" 
                width={28}
                height={28}
                decoding="async"
                loading="eager"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white/90 shadow-xs ring-1 ring-black/10" 
              />
              <img 
                src="/avatars/avatar4.jpg" 
                alt="Workspace Lead" 
                width={28}
                height={28}
                decoding="async"
                loading="eager"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border-2 border-white/90 shadow-xs ring-1 ring-black/10" 
              />
            </div>

            {/* Rating text */}
            <span className="whitespace-nowrap text-[11px] sm:text-[13px] text-blue-100 font-medium tracking-tight">
              <strong className="text-white font-bold">4.9</strong> from 2,400+ properties &amp; teams
            </span>
          </div>

          {/* Main Headline with Crisp Immediate Clip Line Reveal */}
          <h1 className="w-full text-[clamp(1.55rem,6.5vw,84px)] font-normal tracking-[-0.035em] leading-[1.06] text-white font-display text-center relative max-w-5xl mx-auto [text-shadow:0_2px_24px_rgba(4,15,36,0.45)]">
            <span className="block overflow-hidden">
              <motion.span 
                initial={{ y: '24%', opacity: 1 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className={`block w-full whitespace-normal text-center sm:whitespace-nowrap ${titleRevealed ? '' : 'will-change-transform'}`}
              >
                Less time managing tasks.
              </motion.span>
            </span>
            <span className={`block mt-1 pt-3 sm:pt-4 -mt-2 sm:-mt-3 transition-[overflow] ${titleRevealed ? 'overflow-visible' : 'overflow-hidden'}`}>
              <motion.span 
                initial={{ y: '24%', opacity: 1 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.42, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => setTitleRevealed(true)}
                className={`block w-full whitespace-normal text-center sm:whitespace-nowrap ${titleRevealed ? '' : 'will-change-transform'}`}
              >
                More time{' '}
                <span className="italic font-display text-[#38BDF8] tracking-normal relative inline-block [text-shadow:0_0_24px_rgba(56,189,248,0.35)]">
                  to grow.
                  {/* Decorative cursor ring */}
                  <span 
                    className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#38BDF8]/80 bg-[#38BDF8]/15 flex items-center justify-center pointer-events-none animate-pulse"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  </span>
                </span>
              </motion.span>
            </span>
          </h1>

          {/* Subheader Description */}
          <p 
            className="text-blue-100/85 font-sans font-normal text-sm sm:text-base md:text-[17px] leading-relaxed max-w-3xl mx-auto mt-4 sm:mt-5 text-center"
          >
            <span className="sm:block">From rent collection and bookings to ticket sales and stock control, Mixon helps you </span>
            <span className="sm:block">simplify everyday work, reduce manual follow-ups and serve your customers better.</span>
          </p>

          {/* Primary Action Buttons with Text Roll Animation */}
          <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('solutions');
                if (el) {
                  scrollToTarget('#solutions', { offset: -90, duration: 1.25 });
                } else {
                  setCurrentPage('services');
                }
              }}
              className="group w-full sm:w-auto h-12 px-7 rounded-none bg-[#0066FF] hover:bg-[#1a75ff] text-white border border-sky-300/35 text-sm sm:text-[15px] font-medium transition-all duration-200 shadow-[0_8px_30px_rgba(0,102,255,0.45)] hover:shadow-[0_10px_36px_rgba(56,189,248,0.5)] hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <RollingButtonText 
                text="Explore our solutions" 
                icon={<ArrowRight className="w-4 h-4 text-white/90 group-hover:text-white" />} 
              />
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('contact')}
              className="group w-full sm:w-auto h-12 px-7 rounded-none bg-white hover:bg-white text-gray-950 border border-white/80 text-sm sm:text-[15px] font-medium transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-lg hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center"
            >
              <RollingButtonText 
                text="Talk to our team" 
                icon={<ArrowRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-950" />} 
              />
            </button>
          </div>

        </div>

      </section>

      {/* 2. FLEETORA CLIENT LOGOS MARQUEE (NO BORDER TOP/BOTTOM, FULL NATURAL COLOR) */}
      <FleetoraLogosMarquee />

      {/* 3. FLEETORA ABOUT OUR PLATFORM & OPERATIONAL METRICS (DARK NAVY #083071) */}
      <FleetoraAboutMetrics />

      {/* 4. FLEETORA RECOGNIZED PARTNER BANNER (ELECTRIC BLUE ACCENT RIBBON) */}
      <FleetoraPartnerBanner setCurrentPage={setCurrentPage} />

      {/* 4B. UNIFY OPERATIONS SCROLL-CONVERGING MIRESERVE & SOLUTIONS SHOWCASE */}
      <UnifyOperationsSection setCurrentPage={setCurrentPage} />

      {/* 5. OUR SERVICES - CARDS STACKING ON SCROLL (NEXGO DESIGN WITH GSAP) */}
      <FleetoraServicesStack setCurrentPage={setCurrentPage} />

      {/* 6. FLEETORA HOW WE WORK PROGRESS STEPPER (DARK NAVY #051838) */}
      <FleetoraWorkStepper setCurrentPage={setCurrentPage} />

      {/* 6B. PLAYS WITH YOUR STACK / COMPOSIO INTEGRATIONS ECOSYSTEM */}
      <FleetoraIntegrationsStack setCurrentPage={setCurrentPage} />

      {/* 7. FLEETORA OPERATOR TESTIMONIALS & SOCIAL PROOF BENTO */}
      <FleetoraTestimonials />

      {/* 8. FLEETORA QUICK ANSWERS FAQ ACCORDION */}
      <FleetoraFaq setCurrentPage={setCurrentPage} />

      {/* 12. PREFOOTER CTA (UNTOUCHED) */}
      <PreFooterCta setCurrentPage={setCurrentPage} />

    </div>
  );
}
