import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Sliders, Check } from 'lucide-react';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../ui/ScrollRevealText';
import { ScrollStaggerContainer, ScrollStaggerCard } from '../ui/ScrollStagger';
import PixelMosaicBackdrop from '../PixelMosaicBackdrop';

interface FleetoraWorkStepperProps {
  setCurrentPage?: (page: string) => void;
}

export const FleetoraWorkStepper: React.FC<FleetoraWorkStepperProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 0.7', 'end 0.65'] });
  const progressScale1 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const progressScale2 = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const steps = [
    {
      count: '01',
      title: 'Listen and shape',
      desc: 'We learn how your work runs today. We look for the manual steps, scattered records and payments that don’t line up, then explain your options in plain language. You see the scope and the trade-offs before anything is built.'
    },
    {
      count: '02',
      title: 'Build and connect',
      desc: 'We design for the people who will use it, and link the systems and payment methods you already rely on. Your team gets simple screens that are easy to pick up, with no long manual.'
    },
    {
      count: '03',
      title: 'Launch and improve',
      desc: 'We go live, then stay close. Records are matched automatically, issues are flagged early, and we keep measuring and refining so the value keeps growing.'
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 sm:py-32 bg-white text-gray-950 relative overflow-hidden select-none w-full px-6 sm:px-10 lg:px-14">
      <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
        
        {/* Section Header: Centered with text reveal on scroll */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <ScrollRevealHeading 
            as="h2"
            className="font-sans text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-950 tracking-[-0.025em] leading-[1.18]"
          >
            From a conversation to a working solution.
          </ScrollRevealHeading>

          <ScrollRevealParagraph className="font-sans text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            We start with the real problem, not the technology. Then we build, connect and look after the solution, so your team spends less time chasing updates and more time running the business.
          </ScrollRevealParagraph>
        </div>

        {/* Progress Tracker: Balanced & centered above each card */}
        <div aria-hidden="true" className="relative mb-8 hidden md:block w-full">
          <div className="grid grid-cols-3 gap-8 lg:gap-9 relative items-center">
            
            {/* Step 01 Node */}
            <div className="relative flex justify-center items-center">
              {/* Track line from Step 01 to Step 02 */}
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 h-px w-[calc(100%+2rem)] lg:w-[calc(100%+2.25rem)] bg-[#d9e4f2]" />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-y-1/2 h-px w-[calc(100%+2rem)] lg:w-[calc(100%+2.25rem)] origin-left bg-gradient-to-r from-[#38bdf8] via-[#0066ff] to-[#0052d4]"
                style={{ scaleX: reduceMotion ? 1 : progressScale1 }}
              />
              <span className="relative z-10 h-2.5 w-2.5 rounded-full border-2 border-[#0066ff] bg-white ring-4 ring-white shadow-xs" />
            </div>

            {/* Step 02 Node */}
            <div className="relative flex justify-center items-center">
              {/* Track line from Step 02 to Step 03 */}
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 h-px w-[calc(100%+2rem)] lg:w-[calc(100%+2.25rem)] bg-[#d9e4f2]" />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-y-1/2 h-px w-[calc(100%+2rem)] lg:w-[calc(100%+2.25rem)] origin-left bg-gradient-to-r from-[#0052d4] via-[#0066ff] to-[#00e599]"
                style={{ scaleX: reduceMotion ? 1 : progressScale2 }}
              />
              <span className="relative z-10 h-2.5 w-2.5 rounded-full border-2 border-[#0066ff] bg-white ring-4 ring-white shadow-xs" />
            </div>

            {/* Step 03 Node */}
            <div className="relative flex justify-center items-center">
              <span className="relative z-10 h-2.5 w-2.5 rounded-full border-2 border-[#0066ff] bg-white ring-4 ring-white shadow-xs" />
            </div>

          </div>
        </div>

        {/* 3 Cards Responsive Grid: Staggered entrance on scroll */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-9" staggerDelay={0.15}>
          
          {/* CARD 1: Discover & Architect */}
          <ScrollStaggerCard className="group flex flex-col" yOffset={32} duration={0.65}>
            {/* Top Visual Mosaic Box */}
            <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden flex items-center justify-center p-4 sm:p-5 shadow-sm bg-[#eaf2ff]">
              <PixelMosaicBackdrop seedOffset={0} />

              {/* Floating Frosted Card */}
              <div className="relative z-10 w-full max-w-[275px] sm:max-w-[290px] p-1.5 bg-white/25 backdrop-blur-md rounded-none shadow-[0_20px_40px_-15px_rgba(15,23,42,0.35)] border border-white/50 ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="bg-white rounded-none p-4 sm:p-4.5 shadow-xs border border-black/[0.04] min-h-[162px] flex flex-col justify-between">
                  
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                        <Sliders className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[12px] font-bold text-gray-900 tracking-tight">Auto-match payments</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>

                  {/* Toggle Switch Row */}
                  <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50/90 border border-gray-150/80 mb-2">
                    <span className="text-[11px] font-medium text-gray-700">Mobile money connected</span>
                    <div className="w-9 h-5 rounded-full bg-[#0066FF] p-0.5 flex items-center justify-end shadow-inner cursor-default">
                      <div className="w-4 h-4 rounded-full bg-white shadow-xs flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-[#0066FF] stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  {/* Micro Metadata Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/50">Instant</span>
                    <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/50">Accurate</span>
                    <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 border border-gray-200/60">Audit-ready</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Content */}
            <div className="mt-5 text-left">
              <h3 className="stepper-step-title font-ptserif text-[19px] sm:text-[21px] font-normal text-gray-950 tracking-[-0.015em] leading-snug">
                {steps[0].count}. {steps[0].title}
              </h3>
              <p className="font-sans text-sm sm:text-[14.5px] text-gray-600 font-normal leading-relaxed mt-2">
                {steps[0].desc}
              </p>
            </div>
          </ScrollStaggerCard>

          {/* CARD 2: Build & Integrate */}
          <ScrollStaggerCard className="group flex flex-col" yOffset={32} duration={0.65}>
            {/* Top Visual Mosaic Box */}
            <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden flex items-center justify-center p-4 sm:p-5 shadow-sm bg-[#eaf2ff]">
              <PixelMosaicBackdrop seedOffset={1} />

              {/* Floating Dual Video/Operator Mockup Card */}
              <div className="relative z-10 w-full max-w-[275px] sm:max-w-[290px] p-1.5 bg-white/25 backdrop-blur-md rounded-none shadow-[0_20px_40px_-15px_rgba(15,23,42,0.35)] border border-white/50 ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="bg-white rounded-none p-3 shadow-xs border border-black/[0.04] relative min-h-[162px] flex items-center justify-center">
                  
                  {/* Dual Video Tiles Side by Side */}
                  <div className="grid grid-cols-2 gap-2 w-full">
                    
                    {/* Operator 1 */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 shadow-xs ring-1 ring-black/5">
                      <img 
                        src="/avatars/avatar1.jpg" 
                        alt="Sarah M." 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[8.5px] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Sarah M.
                      </div>
                    </div>

                    {/* Operator 2 */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-900 shadow-xs ring-1 ring-black/5">
                      <img 
                        src="/avatars/avatar2.jpg" 
                        alt="David K." 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[8.5px] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        David K.
                      </div>
                    </div>

                  </div>

                  {/* Overlaid Floating Audio / Sync Pill Badge */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-blue-100 flex items-center gap-2 whitespace-nowrap z-20">
                    <div className="flex items-center gap-0.5 h-3">
                      <span className="w-0.5 h-2.5 bg-[#0066FF] rounded-full animate-pulse" />
                      <span className="w-0.5 h-3 bg-[#0066FF] rounded-full animate-pulse delay-75" />
                      <span className="w-0.5 h-1.5 bg-[#0066FF] rounded-full animate-pulse delay-150" />
                      <span className="w-0.5 h-3.5 bg-[#0066FF] rounded-full animate-pulse delay-100" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-900 tracking-tight">Live monitoring</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Content */}
            <div className="mt-5 text-left">
              <h3 className="stepper-step-title font-ptserif text-[19px] sm:text-[21px] font-normal text-gray-950 tracking-[-0.015em] leading-snug">
                {steps[1].count}. {steps[1].title}
              </h3>
              <p className="font-sans text-sm sm:text-[14.5px] text-gray-600 font-normal leading-relaxed mt-2">
                {steps[1].desc}
              </p>
            </div>
          </ScrollStaggerCard>

          {/* CARD 3: Deploy & Optimize */}
          <ScrollStaggerCard className="group flex flex-col" yOffset={32} duration={0.65}>
            {/* Top Visual Mosaic Box */}
            <div className="relative w-full aspect-[4/3] rounded-none overflow-hidden flex items-center justify-center p-4 sm:p-5 shadow-sm bg-[#eaf2ff]">
              <PixelMosaicBackdrop seedOffset={2} />

              {/* Floating Audit / Recap Mockup Card */}
              <div className="relative z-10 w-full max-w-[275px] sm:max-w-[290px] p-1.5 bg-white/25 backdrop-blur-md rounded-none shadow-[0_20px_40px_-15px_rgba(15,23,42,0.35)] border border-white/50 ring-4 ring-white/20 transition-transform duration-300 group-hover:scale-[1.02]">
                <div className="bg-white rounded-none p-4 sm:p-4.5 shadow-xs border border-black/[0.04] min-h-[162px] flex flex-col justify-between">
                  
                  {/* Top Recap Header with Accent Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-3.5 rounded-full bg-indigo-600" />
                      <span className="text-[12px] font-bold text-gray-900 tracking-tight">Daily summary</span>
                    </div>
                    <span className="text-[9.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      All matched
                    </span>
                  </div>

                  {/* Summary Bullets */}
                  <div className="space-y-1 mb-2 text-[10px] text-gray-600">
                    <p className="flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                      <span className="truncate">2,840 rent payments checked</span>
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                      <span className="truncate">No mismatches across connected channels</span>
                    </p>
                  </div>

                  {/* Checklist Action Items */}
                  <div className="pt-2 border-t border-gray-150/70 space-y-1.5">
                    <div className="flex items-center gap-2 text-[9.5px] font-medium text-gray-700">
                      <div className="w-3.5 h-3.5 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="truncate">Tomorrow’s reconciliation is ready (23:59)</span>
                    </div>
                    <div className="flex items-center gap-2 text-[9.5px] font-medium text-gray-700">
                      <div className="w-3.5 h-3.5 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="truncate">Uptime: 99.95%</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Content */}
            <div className="mt-5 text-left">
              <h3 className="stepper-step-title font-ptserif text-[19px] sm:text-[21px] font-normal text-gray-950 tracking-[-0.015em] leading-snug">
                {steps[2].count}. {steps[2].title}
              </h3>
              <p className="font-sans text-sm sm:text-[14.5px] text-gray-600 font-normal leading-relaxed mt-2">
                {steps[2].desc}
              </p>
            </div>
          </ScrollStaggerCard>

        </ScrollStaggerContainer>

      </div>
    </section>
  );
};
