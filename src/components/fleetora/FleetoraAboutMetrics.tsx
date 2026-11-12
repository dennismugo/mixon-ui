import React, { useRef, useEffect, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../ui/ScrollRevealText';
import { ScrollStaggerContainer, ScrollStaggerCard } from '../ui/ScrollStagger';

interface OperationalMetric {
  num: number;
  suffix: string;
  title: string;
  desc: string;
}

const OPERATIONAL_METRICS: OperationalMetric[] = [
  {
    num: 15,
    suffix: '+',
    title: 'Active Markets',
    desc: 'Cross-border & regional operators',
  },
  {
    num: 50,
    suffix: '%',
    title: 'Less Manual Work',
    desc: 'Automated reconciliation & ledgers',
  },
  {
    num: 188,
    suffix: 'M+',
    title: 'KES Monthly Volume',
    desc: 'Reconciled across M-Pesa & card rails',
  },
  {
    num: 3,
    suffix: 'x',
    title: 'Faster Settlements',
    desc: 'Instant Paybill, STK & payout matching',
  },
];

const AnimatedStatNumber: React.FC<{
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}> = ({ target, decimals = 0, prefix = '', suffix = '', duration = 1.6 }) => {
  const reduceMotion = useReducedMotion();
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px 60px 0px' });

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setVal(target);
      return;
    }

    const start = performance.now();
    const durationMs = duration * 1000;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / durationMs, 1);
      const ease = 1 - Math.pow(1 - elapsed, 3);
      setVal(target * ease);

      if (elapsed < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setVal(target);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration, reduceMotion]);

  const rendered = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();

  return (
    <span ref={ref} className="tabular-nums inline-flex items-baseline">
      {prefix && <span className="about-metric-unit mr-1">{prefix}</span>}
      <span>{rendered}</span>
      {suffix && <span className="about-metric-unit">{suffix}</span>}
    </span>
  );
};

/** Homepage operational proof band using an ice-tinted split narrative and 2x2 hairline matrix. */
export const FleetoraAboutMetrics: React.FC = () => {
  return (
    <section
      id="about-metrics"
      data-scroll-no-reveal=""
      aria-label="Operational impact metrics"
      className="py-12 sm:py-16 lg:py-20 bg-white text-gray-950 relative w-full px-6 sm:px-10 lg:px-14"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="about-metrics-frame">
          {/* Left Narrative Proof Column */}
          <div className="about-metrics-narrative text-left">
            <ScrollRevealHeading
              as="h2"
              className="about-metrics-heading font-ptserif text-[#04122b]"
            >
              Delivering better, faster and smarter operations.
            </ScrollRevealHeading>

            <ScrollRevealParagraph className="font-sans text-[15px] sm:text-base text-[#334155] font-normal leading-relaxed max-w-[52ch]">
              We build intelligent software that turns scattered rent ledgers, M-Pesa Paybill reconciliation, guest bookings, and branch inventory into one governed system—cutting manual work, preventing revenue leaks, and accelerating settlements.
            </ScrollRevealParagraph>
          </div>

          {/* Right 2x2 Hairline Metric Matrix (wrapped for container-query responsiveness) */}
          <div className="about-metrics-matrix-wrap">
            <ScrollStaggerContainer className="about-metrics-matrix" staggerDelay={0.08}>
              {OPERATIONAL_METRICS.map((stat) => (
                <div key={stat.title} className="about-metric-cell group text-left">
                  <ScrollStaggerCard
                    className="h-full flex flex-col justify-between gap-8"
                    yOffset={14}
                    duration={0.5}
                  >
                    <div className="about-metric-number whitespace-nowrap">
                      <AnimatedStatNumber target={stat.num} suffix={stat.suffix} duration={1.1} />
                    </div>

                    <div className="space-y-1">
                      <h3 className="about-metric-title">{stat.title}</h3>
                      <p className="text-[13px] text-[#596579] font-normal leading-snug">
                        {stat.desc}
                      </p>
                    </div>
                  </ScrollStaggerCard>
                </div>
              ))}
            </ScrollStaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
