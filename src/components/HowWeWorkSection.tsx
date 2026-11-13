import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Headphones, 
  Compass, 
  Workflow, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import happyLadyImg from '../assets/images/happy_black_lady_laptop.jpg';

interface HowWeWorkSectionProps {
  setCurrentPage?: (page: string) => void;
}

export const HowWeWorkSection: React.FC<HowWeWorkSectionProps> = ({ setCurrentPage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const isHoveredRef = useRef(false);

  const STEP_DURATION = 5000; // 5 seconds per step

  const steps = [
    {
      num: '01',
      title: 'Listen',
      phase: 'Audit & Discovery',
      desc: 'We learn the real problem before we recommend anything.',
      icon: Headphones,
      badgeText: 'Friction Audit',
      liveCard: {
        title: 'Phase 01: Operational Friction Audit',
        detail: 'Deep-dive operational diagnostic across your physical locations to eliminate manual Excel & SMS reconciliation bottlenecks.',
        pill: '3.5 hrs saved / day',
        pillBg: 'bg-blue-50 text-[#0066FF] border-blue-200'
      }
    },
    {
      num: '02',
      title: 'Shape',
      phase: 'Architecture & Scope',
      desc: 'We explain the options, scope and trade-offs in plain language.',
      icon: Compass,
      badgeText: 'Fixed Milestones',
      liveCard: {
        title: 'Phase 02: Fixed-Scope Architecture Blueprint',
        detail: 'Plain-language specifications, guaranteed milestone delivery dates, and zero hidden cloud subscription costs.',
        pill: 'Fixed Scope & SLA',
        pillBg: 'bg-sky-50 text-sky-600 border-sky-200'
      }
    },
    {
      num: '03',
      title: 'Build and connect',
      phase: 'Engineering & Rails',
      desc: 'We design for the people who will use it, and link the systems you already rely on.',
      icon: Workflow,
      badgeText: 'Direct Rails',
      liveCard: {
        title: 'Phase 03: Direct Telco & Hardware Rail Integration',
        detail: 'Sub-14ms M-Pesa STK push, offline SQLite turnstiles, and bi-directional ERP ledger synchronization.',
        pill: '<14ms Latency',
        pillBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      }
    },
    {
      num: '04',
      title: 'Improve',
      phase: 'Lifetime SLA Support',
      desc: 'After launch we support, measure and refine, so the value keeps growing.',
      icon: Sparkles,
      badgeText: 'Continuous ROI',
      liveCard: {
        title: 'Phase 04: Private Engineering SLA & Lifetime Optimization',
        detail: 'Direct WhatsApp & Slack engineering escalation, 99.99% guaranteed uptime, and continuous feature evolution.',
        pill: '99.99% Sovereign Uptime',
        pillBg: 'bg-purple-50 text-purple-700 border-purple-200'
      }
    }
  ];

  // Auto-advance timer with smooth progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const increment = (intervalTime / STEP_DURATION) * 100;

    const timer = setInterval(() => {
      if (isHoveredRef.current) return;

      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr + 1) % steps.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, activeStep]);

  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    setProgress(0);
  };

  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section 
      id="how-we-work" 
      className="py-24 sm:py-32 bg-white border-b border-gray-200/80 px-6 sm:px-10 lg:px-14 relative overflow-hidden text-left font-sans select-none"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="w-full max-w-7xl mx-auto relative z-10">
        
        {/* =========================================================================
            1. SECTION HEADER: Two-column split layout matching reference
           ========================================================================= */}
        <div className="mb-14 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-3">
              {/* Optional Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200/70 text-[#0066FF] font-mono text-[11px] font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                <span>The Mixon Delivery Framework</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-5xl lg:text-[46px] font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12]">
                From a conversation <br className="hidden sm:inline" />
                <span className="text-gray-400 font-normal">to a working solution.</span>
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end pt-1 space-y-4">
              <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">
                Setup is collaborative, clear, and measured. We learn your real operational challenges before recommending technology, shape the solution in plain language, connect your existing tools, and support your team as you scale.
              </p>

              {setCurrentPage && (
                <div>
                  <button
                    type="button"
                    onClick={() => setCurrentPage('contact')}
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] hover:text-[#0052cc] transition-colors cursor-pointer"
                  >
                    <span>Start a consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. 4-STEP INTERACTIVE PROGRESS TRACK (Refined & Elevated)
           ========================================================================= */}
        <div className="mb-14 sm:mb-18">
          
          {/* 4 Steps Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div 
                  key={step.num}
                  onClick={() => handleSelectStep(idx)}
                  className="flex flex-col group cursor-pointer text-left transition-all duration-200"
                >
                  {/* Step Number: 01, 02, 03, 04 */}
                  <div className="flex items-baseline justify-between mb-3">
                    <span 
                      className={`font-mono text-3xl sm:text-[34px] font-extrabold tracking-tight transition-colors duration-300 ${
                        isActive 
                          ? 'text-[#0066FF]' 
                          : isPast 
                            ? 'text-gray-900' 
                            : 'text-gray-300 group-hover:text-gray-400'
                      }`}
                    >
                      {step.num}
                    </span>

                    <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                      {step.badgeText}
                    </span>
                  </div>

                  {/* Horizontal Rail Track with Node Beacon */}
                  <div className="relative h-6 flex items-center mb-4">
                    {/* Background connecting rail */}
                    <div className="w-full h-[2px] bg-gray-200/80 rounded-full overflow-hidden relative">
                      {/* Active glowing fill bar */}
                      {isActive && (
                        <motion.div 
                          className="h-full bg-[#0066FF]"
                          style={{ width: `${progress}%` }}
                          transition={{ ease: 'linear' }}
                        />
                      )}
                      {isPast && (
                        <div className="w-full h-full bg-[#0066FF]" />
                      )}
                    </div>

                    {/* Node Dot circle centered on the rail line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
                      <div 
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#0066FF] ring-4 ring-blue-500/25 shadow-[0_0_12px_rgba(0,102,255,0.6)] scale-125' 
                            : isPast 
                              ? 'bg-[#0066FF] ring-2 ring-blue-400/20' 
                              : 'bg-white border-2 border-gray-300 group-hover:border-gray-400'
                        }`} 
                      />
                    </div>
                  </div>

                  {/* Icon & Title Heading */}
                  <div className="flex items-center gap-3 mb-2">
                    {/* Squircle Icon badge */}
                    <div 
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive 
                          ? 'border-[#0066FF] bg-blue-50/80 text-[#0066FF] shadow-xs' 
                          : isPast 
                            ? 'border-gray-200 bg-gray-50 text-gray-700' 
                            : 'border-gray-200/80 bg-gray-50/50 text-gray-400 group-hover:border-gray-300 group-hover:text-gray-600'
                      }`}
                    >
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>

                    <h3 
                      className={`font-sans text-base sm:text-[17px] font-bold tracking-tight transition-colors duration-300 ${
                        isActive 
                          ? 'text-[#0066FF]' 
                          : 'text-gray-950 group-hover:text-[#0066FF]'
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {/* Description Text */}
                  <p className="text-xs sm:text-[13px] text-gray-500 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            3. WIDE CINEMATIC PHOTOGRAPHIC BANNER WITH DYNAMIC CONTEXT CARD
           ========================================================================= */}
        <div className="rounded-none overflow-hidden border border-gray-200/90 shadow-[0_16px_50px_rgba(0,0,0,0.07)] relative group aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] min-h-[320px] sm:min-h-[400px] bg-neutral-900 select-none">
          
          {/* Photographic Background */}
          <img 
            src={happyLadyImg} 
            alt="Mixon collaborative team operations and real software delivery" 
            className="w-full h-full object-cover object-[center_35%] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
          />
          
          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

          {/* Top-Left Live Status Pill */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white font-mono text-xs shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wide">Live Delivery · Sovereign Operations</span>
          </div>

          {/* Bottom Dynamic Context Card: Automatically updates with the active step */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.num}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-none shadow-xl border border-white/80 text-left space-y-2"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 text-[#0066FF] flex items-center justify-center shrink-0">
                      <CurrentIcon className="w-3.5 h-3.5 stroke-[2]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-gray-950 uppercase tracking-wider">
                      {currentStep.liveCard.title}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border shrink-0 ${currentStep.liveCard.pillBg}`}>
                    {currentStep.liveCard.pill}
                  </span>
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed pl-9">
                  {currentStep.liveCard.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom-Right Step Dots */}
          <div className="absolute bottom-5 right-6 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {steps.map((st, idx) => (
              <button
                key={st.num}
                type="button"
                onClick={() => handleSelectStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeStep === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Jump to step ${st.num}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default HowWeWorkSection;
