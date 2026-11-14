import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Compass, 
  Code2, 
  Users, 
  Rocket,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface TimelineStep {
  week: string;
  milestone: string;
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
      week: '01 WEEK',
      milestone: 'Milestone 01',
      title: 'Map workflows & connect core systems',
      desc: 'We sit down with your operational leads to map how your business actually runs. We audit your databases, spreadsheets, payment rails, and customer touchpoints to establish a clean technical architecture from day one.',
      deliverable: 'Architecture blueprint, data schema & API integrations',
      icon: Compass
    },
    {
      week: '02 WEEK',
      milestone: 'Milestone 02',
      title: 'Build custom interfaces & business logic',
      desc: 'Our engineering team develops your custom user interfaces, backend APIs, and transactional logic—configuring automated M-Pesa Daraja STK pushes, role-based access, and real-time database synchronisation.',
      deliverable: 'Interactive prototypes, core backend & payment sandbox',
      icon: Code2
    },
    {
      week: '03 WEEK',
      milestone: 'Milestone 03',
      title: 'Test with your team & refine real tasks',
      desc: 'We place the platform directly in the hands of your staff to run actual daily operations. We refine mobile tap targets, USSD menu response times, receipt printing, and staff permissions based on hands-on team feedback.',
      deliverable: 'Staff training sessions, edge-case resolution & pilot trial',
      icon: Users
    },
    {
      week: '04 WEEK',
      milestone: 'Milestone 04',
      title: 'Production launch & live telemetry',
      desc: 'We roll the system out live to your customers with automated end-of-day reconciliation, automated database backups, and real-time uptime monitoring so your leadership team has full visibility and zero operational downtime.',
      deliverable: 'Production go-live, automated reporting & dedicated SLA support',
      icon: Rocket
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="thirty-day-impact"
      className="relative w-full py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-14 select-none text-white"
      style={{
        background: 'linear-gradient(140deg, #0350dd 0%, #0246c6 42%, #033798 78%, #032d7a 100%)',
      }}
    >
      {/* Background glow contained within an absolute wrapper so the section itself has NO overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 14% 28%, rgba(56, 189, 248, 0.22) 0%, transparent 46%)',
          }}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* =========================================================================
              LEFT COLUMN: FIXED / STICKY WHILE CARDS SCROLL ON THE RIGHT
             ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start text-left">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] font-semibold text-sky-200 block mb-4">
              HOW WE DELIVER IN 30 DAYS
            </span>

            <h2 
              className="font-ptserif font-normal text-white text-3xl sm:text-4xl lg:text-[44px] tracking-[-0.03em] leading-[1.12]"
              style={{ fontFamily: "'PT Serif', serif" }}
            >
              From initial setup <br className="hidden sm:inline" />
              to measurable results <br className="hidden sm:inline" />
              in 30 days.
            </h2>

            <p className="mt-5 font-sans text-[15px] sm:text-base text-blue-100/90 font-normal leading-[1.65] max-w-[38ch]">
              We don’t spend months in theoretical workshops. Within four weeks, we audit your workflow, build and connect your core systems, test against live transactions, and hand over a platform your team actually loves using.
            </p>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: SCROLLABLE WORKFLOW CARDS (CARDS SCROLL PAST FIXED LEFT)
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.week}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, delay: 0.08 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group bg-white border border-white/25 rounded-none p-6 sm:p-8 min-h-[200px] flex flex-col justify-between text-left transition-all duration-200 shadow-[0_18px_38px_-14px_rgba(2,18,58,0.38)] hover:border-sky-200 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-14px_rgba(2,18,58,0.52)] select-text"
                >
                  <div>
                    {/* Top Row: Square sky-blue icon badge + Week Pill */}
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
                      className="font-ptserif text-[20px] sm:text-[22px] text-[#04122B] tracking-[-0.02em] leading-[1.25] mb-2.5"
                      style={{ fontFamily: "'PT Serif', serif" }}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description in Natural Language */}
                    <p className="font-sans text-[13.5px] sm:text-[14px] text-[#475569] font-normal leading-[1.6]">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Deliverable Row */}
                  <div className="mt-6 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-600 font-medium">{step.deliverable}</span>
                    <span className="text-[#0066FF] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      {step.milestone} ✓
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
