import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Layers, 
  ChevronsRight, 
  Workflow, 
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface TimelineStep {
  week: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

export const ThirtyDayImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px 60px 0px' });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const steps: TimelineStep[] = [
    {
      week: '01 week',
      title: 'Connect the data',
      desc: 'Unify CRM, support, product usage, billing, and customer conversations into one account view',
      icon: Layers
    },
    {
      week: '02 week',
      title: 'Calibrate the intelligence',
      desc: 'Tune risk scoring, expansion signals, ARR impact, and account priority logic',
      icon: ChevronsRight
    },
    {
      week: '03 week',
      title: 'Roll out team workflows',
      desc: 'Launch weekly focus lists, risk alerts, and renewal actions across revenue teams',
      icon: Workflow
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-14 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse 90% 70% at 20% 25%, #183C60 0%, #0E2239 35%, #081525 65%, #040913 100%)'
      }}
    >
      {/* Subtle atmospheric ambient glow overlays */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[500px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN: Header, Eyebrow Badge, and Bottom Technical Footnote
             ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left">
            <div>
              {/* Main Display Headline */}
              <motion.h2 
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                className="font-sans text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-bold text-white tracking-[-0.035em] leading-[1.08] text-balance"
              >
                From setup to <br />
                measurable impact <br />
                in 30 days
              </motion.h2>
            </div>

            {/* Bottom Technical Monospace Footnote */}
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="mt-12 lg:mt-auto pt-8 border-t border-white/[0.06] lg:border-t-0"
            >
              <p className="font-mono text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                By day 30 renewals become predictable,
                <br className="hidden sm:inline" />
                {' '}with clear visibility into risk and revenue
              </p>
            </motion.div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: 3 Vertically Stacked Frosted Glass Cards
             ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 justify-center">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isHovered = hoveredIdx === idx;

              return (
                <motion.div
                  key={step.week}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.45, delay: 0.12 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                  className={`group relative rounded-none p-6 sm:p-7 xl:p-8 backdrop-blur-xl transition-all duration-300 text-left border overflow-hidden cursor-default ${
                    isHovered 
                      ? 'bg-white/[0.08] border-white/25 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)]' 
                      : 'bg-white/[0.04] border-white/[0.09] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {/* Subtle specular sheen on top edge */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Top Row: Week Tag (Left) & Micro Icon Squircle (Right) */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="font-mono text-xs sm:text-[13px] text-slate-300/80 font-medium tracking-tight">
                      {step.week}
                    </span>

                    <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-white/90 group-hover:bg-white/15 group-hover:text-white group-hover:scale-105 transition-all duration-200">
                      <Icon className="w-4 h-4 stroke-[2]" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight mb-2.5">
                    {step.title}
                  </h3>

                  {/* Step Monospace / Technical Description */}
                  <p className="font-mono text-xs sm:text-[13px] text-slate-300/80 leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
