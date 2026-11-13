import React from 'react';
import { ScrollFadeIn } from './ui/ScrollFadeIn';
import { DitheredStripeBand } from './ui/DitheredStripeBand';
import RollingButtonText from './RollingButtonText';
import { ArrowRight } from 'lucide-react';

export interface ServicePhilosophySectionProps {
  eyebrow: string;
  eyebrowColorClass?: string;
  heading: string;
  introText: string;
  statement: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
  rowHeight?: number;
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
  rowHeight = 20,
}) => {
  return (
    <section className="pt-20 pb-20 sm:pb-28 border-b border-gray-200/80 bg-white relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 text-center">
        <ScrollFadeIn className="mx-auto max-w-4xl space-y-6 text-center">
          <span className={`text-xs font-mono uppercase tracking-widest font-bold block ${eyebrowColorClass}`}>
            {eyebrow}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-950">
            {heading}
          </h2>
          <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-light max-w-3xl mx-auto">
            <p>{introText}</p>
          </div>
        </ScrollFadeIn>
      </div>

      {/* Tovnia-inspired Interactive Stage with Full-Width Dither Wave Stripe */}
      <div className="relative mt-12 sm:mt-16 w-full">
        {/* Full-bleed edge-to-edge dither stripe wave */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-[38%] pointer-events-none select-none z-0">
          <DitheredStripeBand rowHeight={rowHeight} />
        </div>

        {/* Elevated foreground card matching Image 1 & Image 2 */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10">
          <div className="px-8 py-12 sm:px-12 sm:py-16 min-h-[268px] sm:min-h-[296px] flex flex-col justify-center rounded-none bg-white border border-slate-200/90 shadow-[0_22px_50px_-14px_rgba(10,27,56,0.13),0_1px_3px_rgba(0,0,0,0.05)] text-center space-y-7">
            <p className="text-gray-900 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              {statement}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onPrimaryClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#D9E88E] hover:bg-[#cfdf80] text-gray-950 font-sans font-bold text-sm transition-all shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(217,232,142,0.4)] hover:-translate-y-0.5 cursor-pointer group"
              >
                <RollingButtonText
                  text={primaryButtonText}
                  icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                />
              </button>
              <button
                type="button"
                onClick={onSecondaryClick}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-sans font-semibold text-sm transition-all cursor-pointer group"
              >
                <RollingButtonText text={secondaryButtonText} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicePhilosophySection;
