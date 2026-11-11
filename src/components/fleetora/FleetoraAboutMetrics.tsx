import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../ui/ScrollRevealText';
import { ScrollStaggerContainer, ScrollStaggerCard } from '../ui/ScrollStagger';

const AnimatedStatNumber: React.FC<{
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}> = ({ target, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px 60px 0px' });

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / durationMs, 1);
      // Smooth cubic-out easing
      const ease = 1 - Math.pow(1 - elapsed, 3);
      setVal(target * ease);

      if (elapsed < 1) {
        requestAnimationFrame(tick);
      } else {
        setVal(target);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString()}
      {suffix}
    </span>
  );
};

export const FleetoraAboutMetrics: React.FC = () => {
  const stats = [
    {
      num: 15,
      suffix: '+',
      prefix: '',
      title: 'Markets',
      desc: 'Operating across multiple commercial regions.',
      delay: 0.05
    },
    {
      num: 50,
      suffix: '%',
      prefix: '',
      title: 'Less Manual Work',
      desc: 'Reducing time spent on reconciliation and bookkeeping.',
      delay: 0.12
    },
    {
      num: 188,
      suffix: 'M+',
      prefix: '',
      title: 'Processed',
      desc: 'Monthly transaction volume.',
      delay: 0.19
    },
    {
      num: 3,
      suffix: 'x',
      prefix: '',
      title: 'Faster Settlements',
      desc: 'Helping businesses reconcile and settle payments faster.',
      delay: 0.26
    }
  ];

  return (
    <section id="about-metrics" className="pt-6 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 lg:pb-32 bg-white text-gray-950 relative overflow-hidden select-none w-full px-6 sm:px-10 lg:px-14">
      
      {/* Background structural subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#083071_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
        
        {/* Header Block: Centered with text reveal on scroll */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <ScrollRevealHeading
            as="h2"
            className="font-bdogrotesk text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-950 tracking-[-0.025em] leading-[1.18]"
          >
            Delivering better, faster and smarter operations.
          </ScrollRevealHeading>

          <ScrollRevealParagraph className="font-sans text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            We build intelligent software that automates everyday tasks, improves financial accuracy, reduces revenue losses and helps businesses run smoothly.
          </ScrollRevealParagraph>
        </div>

        {/* 4 Big Metrics Grid: Staggered entrance on scroll */}
        <ScrollStaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pt-2"
          staggerDelay={0.12}
        >
          {stats.map((stat, idx) => (
            <ScrollStaggerCard
              key={idx}
              className="flex flex-col justify-between group pt-2"
              yOffset={28}
              duration={0.65}
            >
              <div>
                {/* Big Animated Number in Mixon Blue */}
                <div className="font-sans text-4xl sm:text-5xl lg:text-[46px] xl:text-[52px] font-extrabold text-[#0066FF] tracking-tight leading-none whitespace-nowrap mb-4">
                  {stat.prefix && (
                    <span className="text-2xl sm:text-3xl lg:text-[32px] text-[#0066FF]/70 font-bold mr-1 align-baseline tracking-normal">
                      {stat.prefix}
                    </span>
                  )}
                  <AnimatedStatNumber 
                    target={stat.num} 
                    suffix={stat.suffix} 
                    duration={1.8}
                  />
                </div>

                {/* Subtitle / Stat Title in PT Serif Semi-Bold */}
                <h3 className="about-metric-title font-ptserif text-base sm:text-[18px] font-semibold text-gray-900 mb-1.5">
                  {stat.title}
                </h3>

                {/* Balanced Description Text */}
                <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </ScrollStaggerCard>
          ))}
        </ScrollStaggerContainer>

      </div>

    </section>
  );
};
