import React from 'react';
import { ScrollFadeIn } from './ui/ScrollFadeIn';
import RollingButtonText from './RollingButtonText';
import { SteppedPixelMotif, MotifPalette } from './ui/SteppedPixelMotif';
import { ArrowRight } from 'lucide-react';

export interface ServicePhilosophySectionProps {
  eyebrow: string;
  eyebrowColorClass?: string;
  heading: string;
  introText: string;
  statement: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  rowHeight?: number;
  imageSrc?: string;
  imageAlt?: string;
  motifPalette?: MotifPalette;
  badgeTitle?: string;
  badgeSubtitle?: string;
  reverseLayout?: boolean;
}

export const ServicePhilosophySection: React.FC<ServicePhilosophySectionProps> = ({
  eyebrow,
  eyebrowColorClass = 'text-[#0066FF]',
  heading,
  introText,
  statement,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryClick,
  onSecondaryClick,
  imageSrc,
  imageAlt = 'Mixon engineering team collaborating on laptop',
  motifPalette = 'lime',
  reverseLayout = false,
}) => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 border-b border-gray-200/80 bg-white relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
            reverseLayout ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Left Column: Copy & Action Button */}
          <div
            className={`space-y-6 lg:col-span-6 text-left ${
              reverseLayout ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <ScrollFadeIn className="space-y-5">
              <span
                className={`text-xs font-mono uppercase tracking-widest font-bold block ${eyebrowColorClass}`}
              >
                {eyebrow}
              </span>

              <h2 className="font-ptserif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#04122b] leading-[1.18] tracking-tight">
                {heading}
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-light">
                {introText}
              </p>

              {/* High-impact highlight callout in Mixon theme */}
              <div className="border-l-2 border-[#0066FF] pl-4 sm:pl-5 py-1 bg-slate-50/70">
                <p className="text-[#04122b] text-base sm:text-lg font-medium leading-relaxed">
                  {statement}
                </p>
              </div>

              {/* Action Button: single clean primary CTA with sharp 0px corners */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onPrimaryClick}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-bold text-sm transition-all shadow-[0_2px_8px_rgba(0,102,255,0.25)] hover:shadow-[0_4px_16px_rgba(0,102,255,0.4)] hover:-translate-y-0.5 cursor-pointer group"
                >
                  <RollingButtonText
                    text={primaryButtonText}
                    icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  />
                </button>
                {secondaryButtonText && onSecondaryClick && (
                  <button
                    type="button"
                    onClick={onSecondaryClick}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-none border border-slate-300 hover:border-[#04122b] bg-white hover:bg-slate-50 text-slate-800 hover:text-[#04122b] font-sans font-semibold text-sm transition-all cursor-pointer group"
                  >
                    <RollingButtonText text={secondaryButtonText} />
                  </button>
                )}
              </div>
            </ScrollFadeIn>
          </div>

          {/* Right Column: Ultra-realistic Photography + Stepped Pixel Motif (Clean, No Overlay Badge) */}
          <div
            className={`relative lg:col-span-6 ${
              reverseLayout ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <ScrollFadeIn delay={0.15}>
              <div className="relative group max-w-2xl mx-auto lg:max-w-none">
                {/* Stepped Pixel Motif blooming out from top-left */}
                <div className="absolute -top-7 -left-7 sm:-top-9 sm:-left-9 z-0 pointer-events-none group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-500 ease-out">
                  <SteppedPixelMotif palette={motifPalette} cellSize={18} />
                </div>

                {/* Picture Frame with sharp 0px edges and subtle architectural border */}
                <div className="relative z-10 bg-white p-2 sm:p-2.5 border border-slate-200/90 shadow-[0_22px_50px_-15px_rgba(4,18,43,0.14),0_1px_3px_rgba(0,0,0,0.05)] rounded-none">
                  <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-slate-100">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                        Image placeholder
                      </div>
                    )}
                    {/* Subtle bottom glass gradient for depth */}
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#04122b]/25 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePhilosophySection;
