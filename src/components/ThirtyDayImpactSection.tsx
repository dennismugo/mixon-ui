import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Layers, 
  ChevronsRight, 
  Workflow, 
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface TimelineStep {
  week: string;
  title: string;
  desc: string;
  deliverable: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ThirtyDayImpactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px 60px 0px' });

  const steps: TimelineStep[] = [
    {
      week: '01 week',
      title: 'Connect the data',
      desc: 'Unify CRM, support, product usage, billing, and customer conversations into one synchronized account view across your entire stack.',
      deliverable: 'Unified account schema & API webhooks',
      icon: Layers
    },
    {
      week: '02 week',
      title: 'Calibrate the intelligence',
      desc: 'Tune risk scoring, expansion signals, ARR impact, and automated triage logic around your business rules and local payment conditions.',
      deliverable: 'Custom rules engine & scoring model',
      icon: ChevronsRight
    },
    {
      week: '03 week',
      title: 'Roll out team workflows',
      desc: 'Launch weekly focus lists, automated Slack & WhatsApp alerts, and proactive renewal actions across revenue and operations teams.',
      deliverable: 'Live operator dashboards & notifications',
      icon: Workflow
    },
    {
      week: '04 week',
      title: 'Scale & measurable impact',
      desc: 'Verify telemetry dashboards, multi-branch POS settlements, and automated reconciliation with live commercial reporting.',
      deliverable: 'Full production SLA & ROI audit',
      icon: Sparkles
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="thirty-day-impact"
      className="relative w-full py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden select-none text-white"
      style={{
        background: 'linear-gradient(140deg, #0350dd 0%, #0246c6 42%, #033798 78%, #032d7a 100%)',
      }}
    >
      {/* Subtle architectural ambient glow matching Image 2 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          background:
            'radial-gradient(circle at 14% 28%, rgba(56, 189, 248, 0.22) 0%, transparent 46%)',
        }}
      />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: Sticky editorial eyebrow, PT Serif headline & description
              (Stays static in viewport while the cards on the right scroll past)
             ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start text-left">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] font-semibold text-sky-200 block mb-4">
              DELIVERY ROADMAP &amp; EXECUTION
            </span>

            <h2 
              className="font-ptserif font-normal text-white text-3xl sm:text-4xl lg:text-[44px] tracking-[-0.03em] leading-[1.12]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              From setup to <br className="hidden sm:inline" />
              measurable impact <br className="hidden sm:inline" />
              in 30 days
            </h2>

            <p className="mt-5 font-sans text-[15px] sm:text-base text-blue-100/90 font-normal leading-[1.6] max-w-[38ch]">
              By day 30 renewals become predictable, operational handoffs are automated, and your leadership team has clear visibility into risk, performance, and revenue.
            </p>

            <div className="mt-8 pt-6 border-t border-white/15 hidden lg:block">
              <div className="flex items-center gap-3 text-xs font-mono text-sky-200">
                <span className="w-2 h-2 rounded-full bg-[#D9E88E] animate-pulse" />
                <span>Continuous milestone verification &amp; production telemetry</span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Vertically scrolling crisp white cards (Image 2 style)
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.week}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.08 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white border border-white/25 rounded-none p-6 sm:p-7 min-h-[190px] flex flex-col justify-between text-left transition-all duration-200 shadow-[0_18px_38px_-14px_rgba(2,18,58,0.38)] hover:border-sky-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-14px_rgba(2,18,58,0.52)] select-text"
                >
                  <div>
                    {/* Top Row: Square sky-blue icon badge + Week Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-[2px] bg-[#93C5FD]/85 text-[#04122B] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#0066FF] group-hover:text-white">
                        <Icon className="w-4 h-4 stroke-[2]" />
                      </div>

                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-2.5 py-1 rounded-none border border-blue-100">
                        {step.week}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 
                      className="font-ptserif text-[20px] sm:text-[22px] text-[#04122B] tracking-[-0.02em] leading-[1.2] mb-2"
                      style={{ fontFamily: "'PT Serif', serif" }}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="font-sans text-[13.5px] sm:text-[14px] text-[#475569] font-normal leading-[1.55]">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Deliverable Row */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="text-slate-600">{step.deliverable}</span>
                    <span className="text-[#0066FF] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Verified ✓
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
