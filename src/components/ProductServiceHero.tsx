import React from 'react';
import { motion } from 'motion/react';
import RollingButtonText from './RollingButtonText';
import { ExpandingArrowButton } from './ui/expanding-arrow-button';

export interface ProductServiceHeroProps {
  // Brand badge / mark at top
  badge: {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    tag?: string;
    color?: string;
  };
  // Main title (large bold Bdogrotesk)
  title: string | React.ReactNode;
  // Subtitle / descriptive paragraph
  subtitle: string;
  // Primary CTA (white solid button)
  primaryCta: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  // Secondary CTA (frosted outline button)
  secondaryCta?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  // Optional spotlight element
  spotlight?: React.ReactNode;
}

/**
 * Premium Hero Banner for Mixon Products & Services Pages.
 * Matches the modern Calendly/Linear card aesthetic with radiant cobalt-violet mesh gradient,
 * Bdogrotesk typography, interactive rolling text buttons, and crisp micro-details.
 */
export default function ProductServiceHero({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  spotlight
}: ProductServiceHeroProps) {
  const BadgeIcon = badge.icon;

  return (
    <section 
      aria-label={`${badge.name} hero`} 
      className="product-service-hero w-full px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-8 sm:pb-12 select-none !bg-transparent !border-0"
    >
      {/* Outer Card with Reduced Border-Radius (rounded-xl) & Sleek Compact Height */}
      <div 
        className="hero-card relative w-full max-w-7xl mx-auto rounded-xl overflow-hidden border border-white/25 shadow-[0_16px_50px_-15px_rgba(26,86,219,0.35)]"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 92% 102%, rgba(209, 148, 247, 0.95) 0%, rgba(209, 148, 247, 0.45) 40%, transparent 70%),
            radial-gradient(ellipse 65% 55% at 8% 102%, rgba(198, 146, 238, 0.95) 0%, rgba(198, 146, 238, 0.45) 40%, transparent 70%),
            radial-gradient(ellipse 85% 45% at 50% 105%, rgba(186, 152, 218, 0.85) 0%, rgba(186, 152, 218, 0.3) 45%, transparent 75%),
            linear-gradient(180deg, #2457c5 0%, #295dd0 35%, #3d67be 70%, #686ebc 100%)
          `
        }}
      >
        {/* Subtle glass reflection sheen overlay */}
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.35)_0%,transparent_60%)]" 
        />

        {/* Content Container with Reduced Height (py-10 sm:py-12 lg:py-14) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12 lg:py-14 flex flex-col items-center text-center">
          
          {/* Top Brand Mark (Small & Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="hero-badge inline-flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5"
          >
            <div 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 backdrop-blur-md border border-white/35 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.12)]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
            >
              <div className="hero-badge-icon flex items-center justify-center text-white" style={{ color: '#ffffff', stroke: '#ffffff' }}>
                <BadgeIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] text-white" style={{ color: '#ffffff', stroke: '#ffffff' }} />
              </div>
            </div>
            <span className="font-sans font-normal text-sm sm:text-base tracking-normal !text-white text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
              {badge.name}
            </span>
          </motion.div>

          {/* Headline - Bold Bdogrotesk Display in PURE WHITE */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: 'easeOut' }}
            className="hero-title font-bdogrotesk font-bold text-2xl sm:text-4xl lg:text-[46px] leading-[1.1] tracking-[-0.03em] !text-white text-white text-balance max-w-3xl mx-auto drop-shadow-[0_2px_14px_rgba(0,0,0,0.14)]"
            style={{ color: '#ffffff', fontFamily: "'Bdogrotesk', 'BDO Grotesk', sans-serif" }}
          >
            {title}
          </motion.h1>

          {/* Subtitle in PURE WHITE */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
            className="hero-subtitle font-sans text-sm sm:text-base lg:text-[16px] font-normal leading-[1.5] !text-white text-white text-pretty max-w-2xl mx-auto mt-4 sm:mt-5 drop-shadow-[0_1px_6px_rgba(0,0,0,0.1)]"
            style={{ color: '#ffffff' }}
          >
            {subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 mt-7 sm:mt-8 w-full sm:w-auto"
          >
            {/* Primary action uses the shared expanding, brand-blue arrow interaction. */}
            <ExpandingArrowButton
              size="pill"
              onClick={primaryCta.onClick}
              className="h-11 w-full min-w-0 sm:w-auto sm:min-w-[170px]"
            >
              {primaryCta.text}
            </ExpandingArrowButton>

            {/* Secondary Action Button (Frosted Outline) */}
            {secondaryCta && (
              <button
                type="button"
                onClick={secondaryCta.onClick}
                className="group w-full sm:w-auto bg-white/10 hover:bg-[#0066FF]/25 text-white border border-white/50 hover:border-[#8bbcff] font-sans font-medium text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 text-center"
              >
                <RollingButtonText text={secondaryCta.text} icon={secondaryCta.icon} />
              </button>
            )}
          </motion.div>

          {/* Optional Embedded Spotlight Mockup */}
          {spotlight && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
              className="w-full max-w-4xl mx-auto mt-10 sm:mt-12"
            >
              {spotlight}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
