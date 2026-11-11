import React from 'react';
import { ArrowRight } from 'lucide-react';
import RollingButtonText from './RollingButtonText';
import { motion, useReducedMotion } from 'motion/react';

const grungeBackground = 'https://media.base44.com/images/public/marketing-site-assets/grunge-cover.webp';

interface ServiceClosingCtaProps {
  title?: React.ReactNode;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  bgImageSrc?: string;
  className?: string;
}

export const ServiceClosingCta: React.FC<ServiceClosingCtaProps> = ({
  title,
  subtitle,
  primaryButtonText = 'Get a proposal',
  secondaryButtonText = 'Explore Packages',
  onPrimaryClick,
  onSecondaryClick,
  bgImageSrc,
  className
}) => {
  const reducedMotion = useReducedMotion();
  return (
    <section className={`service-grunge-cta relative w-full overflow-hidden select-none m-0 p-0 border-t border-gray-100 ${className || ''}`}>
      {/* Full-width Image Background stretching edge-to-edge */}
      <img
        src={bgImageSrc || grungeBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Diffused light tint overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/35 pointer-events-none" />

      {/* Centered Content Container */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-12 py-20 sm:py-24 lg:py-28 min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col items-center justify-center text-center"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        
        {/* Centered Editorial Serif Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal text-gray-950 tracking-[-0.02em] leading-[1.12] max-w-3xl mx-auto">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm sm:text-base md:text-[16.5px] text-gray-700/90 max-w-xl mx-auto font-normal leading-relaxed mt-4 sm:mt-5">
            {subtitle}
          </p>
        )}

        {/* Action Buttons with Rolling Text on Hover */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 w-full sm:w-auto">
          <button
            onClick={onPrimaryClick}
            className="group w-full sm:w-auto bg-[#EEF0AF] hover:bg-[#e4e79b] text-gray-950 font-sans font-semibold text-sm sm:text-[14.5px] px-6 sm:px-7 py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <RollingButtonText
              text={primaryButtonText}
              icon={<ArrowRight className="w-3.5 h-3.5 text-gray-800" />}
            />
          </button>
          
          <button
            onClick={onSecondaryClick}
            className="group w-full sm:w-auto bg-white/95 hover:bg-white text-gray-900 font-sans font-medium text-sm sm:text-[14.5px] px-6 sm:px-7 py-3.5 rounded-xl border border-black/10 shadow-xs hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center"
          >
            <RollingButtonText text={secondaryButtonText} />
          </button>
        </div>

      </motion.div>
    </section>
  );
};
