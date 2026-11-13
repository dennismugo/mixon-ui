import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  ArrowUpRight, 
  Activity 
} from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  decimals = 0, 
  prefix = '', 
  suffix = '',
  duration = 1.3 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px 60px 0px' });
  const prevValueRef = useRef(0);

  useEffect(() => {
    if (!isInView) return;

    const start = prevValueRef.current;
    const target = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let animId: number;

    const frame = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      // Exponential out easing for snappy start and gentle settle
      const easeOut = 1 - Math.pow(2, -10 * progress);
      const current = start + (target - start) * easeOut;
      setDisplayValue(current);

      if (progress < 1) {
        animId = requestAnimationFrame(frame);
      } else {
        setDisplayValue(target);
        prevValueRef.current = target;
      }
    };

    animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

interface MetricCard {
  id: string;
  number: number;
  suffix: string;
  label: string;
  desktopHeight: string;
  tabletHeight: string;
  mobileHeight: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  shadowClass: string;
  hasArtwork?: boolean;
}

export const MeasuredOutcomes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px 60px 0px' });

  const cards: MetricCard[] = [
    {
      id: 'experience',
      number: 12,
      suffix: '+',
      label: 'Years of experience',
      desktopHeight: 'lg:h-[260px]',
      tabletHeight: 'sm:h-[240px]',
      mobileHeight: 'min-h-[190px]',
      bgClass: 'bg-[#EDEDF0]',
      textClass: 'text-neutral-950',
      borderClass: 'border border-neutral-300/80 hover:border-neutral-400',
      shadowClass: 'shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]'
    },
    {
      id: 'workflows',
      number: 120,
      suffix: '+',
      label: 'Workflows and automation',
      desktopHeight: 'lg:h-[440px]',
      tabletHeight: 'sm:h-[330px]',
      mobileHeight: 'min-h-[240px]',
      bgClass: 'bg-[#0A0A0A]',
      textClass: 'text-white',
      borderClass: 'border border-white/10 hover:border-white/25',
      shadowClass: 'shadow-[0_25px_50px_-15px_rgba(0,0,0,0.45)] hover:shadow-[0_32px_65px_-12px_rgba(0,0,0,0.6)]'
    },
    {
      id: 'processes',
      number: 1200,
      suffix: '+',
      label: 'Processes optimized',
      desktopHeight: 'lg:h-[320px]',
      tabletHeight: 'sm:h-[250px]',
      mobileHeight: 'min-h-[200px]',
      bgClass: 'bg-gradient-to-br from-[#FF6600] via-[#FF5500] to-[#E64C00]',
      textClass: 'text-white',
      borderClass: 'border border-orange-400/30 hover:border-orange-300/60',
      shadowClass: 'shadow-[0_24px_50px_-15px_rgba(255,90,0,0.38)] hover:shadow-[0_30px_60px_-12px_rgba(255,90,0,0.52)]'
    },
    {
      id: 'teams',
      number: 900,
      suffix: '+',
      label: 'Teams empowered and growing',
      desktopHeight: 'lg:h-[380px]',
      tabletHeight: 'sm:h-[310px]',
      mobileHeight: 'min-h-[230px]',
      bgClass: 'bg-[#07080E]',
      textClass: 'text-white',
      borderClass: 'border border-white/10 hover:border-white/25',
      shadowClass: 'shadow-[0_25px_50px_-15px_rgba(0,0,0,0.45)] hover:shadow-[0_32px_65px_-12px_rgba(0,0,0,0.6)]',
      hasArtwork: true
    }
  ];

  return (
    <div ref={containerRef} className="w-full text-left select-none relative">
      {/* Header section: minimal, smooth, no tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-gray-100">
        <div>
          <h3 className="font-sans text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-gray-950 tracking-[-0.035em] leading-[1.08] text-balance">
            Real results beat big claims.
          </h3>
        </div>

        {/* Right side live status indicator */}
        <div className="flex items-center gap-2.5 bg-white border border-gray-200/80 px-4 py-2 rounded-full text-xs font-mono text-gray-700 self-start md:self-end">
          <Activity className="w-3.5 h-3.5 text-[#0066FF]" />
          <span className="font-semibold text-gray-900">100% Operational Health</span>
        </div>
      </div>

      {/* 4 Bento Skyline Cards with Stepped Heights Aligned to Baseline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:items-end gap-5 xl:gap-6 relative z-10">
        {cards.map((card, idx) => {
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
              className={`group/card relative rounded-none p-6 sm:p-7 xl:p-8 flex flex-col justify-between overflow-hidden select-none transition-all duration-300 ${card.bgClass} ${card.borderClass} ${card.shadowClass} ${card.mobileHeight} ${card.tabletHeight} ${card.desktopHeight}`}
            >
              {/* Optional generative visual artwork on Card 4 */}
              {card.hasArtwork && (
                <div className="absolute inset-y-0 right-0 w-3/4 sm:w-2/3 pointer-events-none overflow-hidden rounded-none">
                  <img
                    src="/explosion.jpg"
                    alt=""
                    className="w-full h-full object-cover object-center mix-blend-screen opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out filter hue-rotate-[200deg] saturate-150"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#07080E] via-[#07080E]/60 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080E]/90 via-transparent to-[#07080E]/30 pointer-events-none" />
                </div>
              )}

              {/* Top Row: Giant Metric Number & Minimal Corner Accent */}
              <div className="relative z-10 flex items-start justify-between">
                <div className={`font-sans font-bold text-5xl sm:text-6xl lg:text-[44px] xl:text-6xl 2xl:text-7xl tracking-[-0.035em] leading-none ${card.textClass}`}>
                  <AnimatedCounter
                    value={card.number}
                    suffix={card.suffix}
                    duration={1.2}
                  />
                </div>

                {/* Corner micro-action arrow that illuminates on hover */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  card.textClass === 'text-white'
                    ? 'text-white/40 group-hover/card:text-white group-hover/card:bg-white/10'
                    : 'text-neutral-400 group-hover/card:text-neutral-900 group-hover/card:bg-black/5'
                }`}>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2] group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>

              {/* Bottom Row: Right-Anchored Label */}
              <div className="relative z-10 mt-auto pt-6 flex justify-end">
                <p className={`text-right text-sm sm:text-[15px] xl:text-base font-medium leading-snug max-w-[155px] ${
                  card.textClass === 'text-white' ? 'text-white/95' : 'text-neutral-900'
                }`}>
                  {card.label}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Footer Telemetry Banner */}
      <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-gray-400 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span>Continuous Telemetry: Monitored live across Mixon production deployments</span>
        </div>
        <div className="text-[11px] text-gray-400">
          Source: Verified tenant ledgers, server logs & POS till reconciliation audits
        </div>
      </div>
    </div>
  );
};
