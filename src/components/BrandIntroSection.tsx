import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import clientAmana from '../assets/images/clients/amana.webp';
import clientCaritas from '../assets/images/clients/caritas.webp';
import clientEbesa from '../assets/images/clients/ebesa.webp';
import clientGib from '../assets/images/clients/gib.webp';
import clientIbs from '../assets/images/clients/ibs.webp';
import clientIdman from '../assets/images/clients/idman.webp';
import clientKush from '../assets/images/clients/kush.webp';
import clientOpportunity from '../assets/images/clients/opportunity.webp';

interface BrandIntroSectionProps {
  setCurrentPage?: (page: string) => void;
}

// High-performance numeric counter with smooth easing matching NexGo GSAP counter
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

export const BrandIntroSection: React.FC<BrandIntroSectionProps> = ({ setCurrentPage }) => {
  const clientLogos = [
    { name: 'Amana Bank', src: clientAmana },
    { name: 'Caritas Microfinance Bank', src: clientCaritas },
    { name: 'eBesa', src: clientEbesa },
    { name: 'GIB Bank', src: clientGib },
    { name: 'IBS Bank', src: clientIbs },
    { name: 'IDMAN Community Bank', src: clientIdman },
    { name: 'Kush Bank', src: clientKush },
    { name: 'Opportunity Bank', src: clientOpportunity },
  ];

  const stats = [
    {
      id: 'clients',
      value: (
        <span className="flex items-baseline font-display">
          <AnimatedStatNumber target={2000} />
          <span className="ml-0.5">+</span>
        </span>
      ),
      detail: 'Over two thousand satisfied clients have trusted us'
    },
    {
      id: 'response',
      value: (
        <span className="flex items-baseline font-display">
          <AnimatedStatNumber target={32} />
          <span>-Min</span>
        </span>
      ),
      detail: 'We pride ourselves on offering rapid 32-minute response'
    },
    {
      id: 'reconciliation',
      value: (
        <span className="flex items-baseline font-display">
          <AnimatedStatNumber target={95} />
          <span>%</span>
        </span>
      ),
      detail: 'An outstanding 95% success rate reflects our dedication'
    },
    {
      id: 'availability',
      value: (
        <span className="flex items-baseline font-display">
          <span>24/7</span>
        </span>
      ),
      detail: 'Our team remains available to provide nonstop support'
    }
  ];

  return (
    <section 
      id="mixon-intro" 
      className="py-16 sm:py-24 lg:py-28 bg-white border-b border-gray-200/80 overflow-hidden relative text-left select-none"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* =========================================================================
            PART A: Top Eyebrow Badge (Matching NexGo: "Treated over [5000] Patients last week")
           ========================================================================= */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-500 font-medium tracking-tight">
            <span>Trusted by over</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-950 text-white font-mono font-bold text-[11px] sm:text-xs shadow-2xs">
              2000+
            </span>
            <span>clients &amp; operators worldwide</span>
          </div>
        </div>

        {/* =========================================================================
            PART B: Client Logos Marquee (Full Natural Color, Infinite Drift Loop)
           ========================================================================= */}
        <div className="w-full overflow-hidden py-6 sm:py-8 border-y border-gray-150/80 mb-16 sm:mb-24 relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max items-center animate-[mixon-logo-drift_35s_linear_infinite] hover:[animation-play-state:paused]">
            {[0, 1, 2].map((copyIdx) => (
              <div key={copyIdx} className="flex items-center gap-12 sm:gap-16 lg:gap-20 px-6 sm:px-10">
                {clientLogos.map((client) => (
                  <div 
                    key={client.name + copyIdx} 
                    className="flex items-center justify-center h-10 sm:h-12 w-auto shrink-0 group/logo"
                  >
                    <img 
                      src={client.src} 
                      alt={client.name} 
                      loading="lazy"
                      className="h-7 sm:h-9 w-auto max-w-[150px] sm:max-w-[170px] object-contain transition-transform duration-300 group-hover/logo:scale-105 filter-none opacity-100" 
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            PART C: Middle Editorial Statement & CTA (Faithful to NexGo med-a layout)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 sm:mb-28">
          {/* Left Column: Negative space / clean editorial breathing room matching Image 2 */}
          <div className="hidden lg:block lg:col-span-4" />

          {/* Right Column: Large Editorial Paragraph & Dark Pill Button */}
          <div className="lg:col-span-8 flex flex-col items-start space-y-6 sm:space-y-8">
            <p className="font-sans text-2xl sm:text-3xl md:text-[32px] lg:text-[34px] font-normal text-gray-950 leading-[1.38] tracking-[-0.02em]">
              Mixon is an autonomous business platform that automates everyday operations—from rent collection and property reconciliation to retail point-of-sale and cryptographic access control. The platform is designed to connect your existing tools and run the work behind your business 24 hours a day, 7 days a week.
            </p>

            <div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('solutions');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else if (setCurrentPage) {
                    setCurrentPage('services');
                  }
                }}
                className="px-8 py-3.5 rounded-full bg-gray-950 hover:bg-[#0066FF] text-white text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2.5 group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART D: 4 Stats Grid with Hairlines (Matching NexGo about-a-number-grid)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pt-6">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-start text-left group">
              {/* Stat Big Serif / Display Number (matching NexGo secondary font) */}
              <div className="text-gray-950 text-5xl sm:text-6xl md:text-[68px] font-display font-normal tracking-tight leading-none transition-colors duration-200 group-hover:text-[#0066FF]">
                {stat.value}
              </div>

              {/* Horizontal Hairline Divider (Matching NexGo about-a-number-line) */}
              <div className="w-full h-px bg-gray-200/90 my-3.5 sm:my-4 transition-colors duration-200 group-hover:bg-[#0066FF]/40" />

              {/* Stat Description */}
              <p className="text-xs sm:text-[13px] text-gray-500 font-normal leading-relaxed max-w-[260px]">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
