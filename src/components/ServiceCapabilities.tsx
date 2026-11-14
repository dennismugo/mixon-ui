import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity, ArrowLeft, ArrowRight, BarChart3, Bot, Code2, CreditCard,
  Globe2, Layers3, LockKeyhole, Search, ShieldCheck, ShoppingBag,
  Smartphone, Sparkles, Workflow
} from 'lucide-react';
import RollingButtonText from './RollingButtonText';
import SteppedMosaicStrip from './ui/SteppedMosaicStrip';

export type Capability = {
  title: string;
  desc: string;
  tag?: string;
  secondaryTag?: string;
  actionText?: string;
};

export interface ServiceCapabilitiesProps {
  eyebrow: string;
  heading: string;
  description: string;
  items: Capability[];
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  onItemClick?: (item: Capability, index: number) => void;
}

const iconSet = [
  Code2,
  ShieldCheck,
  BarChart3,
  Smartphone,
  Search,
  Workflow,
  CreditCard,
  ShoppingBag,
  Bot,
  Globe2,
  LockKeyhole,
  Layers3,
  Activity,
  Sparkles,
];

const DEFAULT_TAGS = [
  { primary: 'Core', secondary: 'Bespoke' },
  { primary: 'High-Impact', secondary: '<1.2s LCP' },
  { primary: 'Popular', secondary: 'Production' },
  { primary: 'Enterprise', secondary: 'Automated' },
  { primary: 'Verified', secondary: '99.9% SLA' },
  { primary: 'Scale', secondary: 'Real-time' },
];

export function ServiceCapabilities({
  eyebrow,
  heading,
  description,
  items,
  primaryActionText = 'Explore Packages',
  onPrimaryAction,
  onItemClick,
}: ServiceCapabilitiesProps) {
  const reducedMotion = useReducedMotion();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, items]);

  const scrollPrev = () => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('article')?.clientWidth || 360;
    el.scrollBy({ left: -(cardWidth + 20), behavior: 'smooth' });
  };

  const scrollNext = () => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('article')?.clientWidth || 360;
    el.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
  };

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    isDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return;
    const el = sliderRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.35;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
      setIsDragging(true);
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDownRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
      hasMovedRef.current = false;
    }, 50);
  };

  return (
    <>
      <section className="py-20 sm:py-24 lg:py-28 bg-white border-b border-gray-200/80 relative overflow-hidden select-none">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header matching Jasper: Left Eyebrow/Heading + Right Subtitle/Action/Arrows */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end mb-12 sm:mb-16">
            {/* Left Column: Lime Highlighter Eyebrow + Large Serif Heading */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block bg-[#D9E88E] text-[#04122b] font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                {eyebrow}
              </span>

              <h2 className="font-ptserif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#04122b] leading-[1.15] tracking-tight">
                {heading}
              </h2>
            </div>

            {/* Right Column: Description + Action Button + Navigation Arrows */}
            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
                {description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                {/* Primary Action Button */}
                {onPrimaryAction ? (
                  <button
                    type="button"
                    onClick={onPrimaryAction}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none bg-[#04122b] hover:bg-[#0066FF] text-white font-sans font-bold text-sm transition-all shadow-[0_2px_8px_rgba(4,18,43,0.15)] hover:shadow-[0_4px_16px_rgba(0,102,255,0.35)] hover:-translate-y-0.5 cursor-pointer group"
                  >
                    <RollingButtonText
                      text={primaryActionText}
                      icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    />
                  </button>
                ) : (
                  <div />
                )}

                {/* Arrow Navigation Carousel Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={!canScrollPrev}
                    aria-label="Previous capabilities"
                    className="w-11 h-11 flex items-center justify-center border border-slate-300 hover:border-[#04122b] bg-white hover:bg-slate-50 disabled:opacity-25 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:cursor-not-allowed transition-all rounded-none text-[#04122b] cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollNext}
                    disabled={!canScrollNext}
                    aria-label="Next capabilities"
                    className="w-11 h-11 flex items-center justify-center border border-slate-300 hover:border-[#04122b] bg-white hover:bg-slate-50 disabled:opacity-25 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:cursor-not-allowed transition-all rounded-none text-[#04122b] cursor-pointer"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Slider Track matching Image 2 */}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-2 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-14 lg:px-14 select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {items.map((item, index) => {
              const Icon = iconSet[index % iconSet.length];
              const tags = item.tag
                ? { primary: item.tag, secondary: item.secondaryTag }
                : DEFAULT_TAGS[index % DEFAULT_TAGS.length];

              return (
                <motion.article
                  key={`${item.title}-${index}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  onClick={() => {
                    if (!hasMovedRef.current && onItemClick) {
                      onItemClick(item, index);
                    }
                  }}
                  className="w-[305px] sm:w-[345px] lg:w-[380px] shrink-0 snap-start flex flex-col justify-between bg-white border border-slate-200/90 p-7 sm:p-8 rounded-none transition-all duration-300 hover:border-slate-400 hover:shadow-[0_16px_36px_-12px_rgba(4,18,43,0.12)] hover:-translate-y-1 group cursor-pointer"
                >
                  <div>
                    {/* Card Top Row: Icon on Left + Badges on Right */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#edf4ff] text-[#0066FF] border border-[#d6e8ff] rounded-none group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-200">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {tags.primary && (
                          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#D9E88E] text-[#04122b] rounded-none">
                            {tags.primary}
                          </span>
                        )}
                        {tags.secondary && (
                          <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-[#BFE0FF] text-[#04122b] rounded-none">
                            {tags.secondary}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Title in Editorial Serif */}
                    <h3 className="font-ptserif text-xl sm:text-2xl font-bold text-[#04122b] group-hover:text-[#0066FF] transition-colors leading-snug mb-3.5">
                      {item.title}
                    </h3>

                    {/* Card Description */}
                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed font-light mb-6">
                      {item.desc}
                    </p>
                  </div>

                  {/* Card Bottom Link matching Image 2 */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-[#04122b] group-hover:text-[#0066FF] transition-colors">
                      {item.actionText || 'Learn More'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stepped Mosaic Strip Transition Pattern with Interactive Dots below Capabilities (Image 2) */}
      <div className="w-full overflow-hidden select-none bg-white">
        <SteppedMosaicStrip cellSize={22} rows={4} />
      </div>
    </>
  );
}

export default ServiceCapabilities;
