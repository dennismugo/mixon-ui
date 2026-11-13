import React from 'react';
import { motion } from 'motion/react';
import RollingButtonText from './RollingButtonText';
import heroHorizonBg from '../assets/mixon-hero-horizon.webp';

export interface ProductServiceHeroProps {
  badge: {
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    tag?: string;
    color?: string;
  };
  title: string | React.ReactNode;
  subtitle: string;
  primaryCta: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  spotlight?: React.ReactNode;
}

/**
 * Full-bleed monochrome Mixon cobalt-horizon hero for Products & Services pages.
 * Uses the Mixon blue particle-wave horizon artwork paired with a PT Serif
 * white headline, concise centered subtitle, and sharp CTA controls.
 */
export default function ProductServiceHero({
  badge,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  spotlight,
}: ProductServiceHeroProps) {
  return (
    <section
      aria-label={`${badge.name} hero`}
      className="product-service-hero relative flex min-h-[110vh] w-full items-center overflow-hidden rounded-none bg-[#03122b] select-none"
    >
      {/* Full-bleed Mixon blue particle-wave horizon artwork */}
      <img
        src={heroHorizonBg}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Atmospheric midnight-navy top vignette keeping PT Serif headline crisp */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(3, 18, 43, 0.92) 0%, rgba(4, 24, 62, 0.56) 28%, rgba(6, 36, 92, 0.16) 56%, rgba(3, 18, 43, 0.08) 100%)',
        }}
      />

      {/* Main Content Centered Above the Particle Wave Horizon */}
      <div className="hero-card relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center rounded-none px-6 pt-16 pb-36 text-center sm:px-10 sm:pt-20 sm:pb-44 lg:px-12 lg:pt-24 lg:pb-52">
        {/* Editorial PT Serif Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06, ease: 'easeOut' }}
          style={{ fontFamily: "'PT Serif', Georgia, serif" }}
          className="hero-title mx-auto max-w-3xl font-ptserif text-[34px] font-normal leading-[1.06] tracking-[-0.03em] text-white text-balance sm:text-[48px] lg:text-[56px]"
        >
          {title}
        </motion.h1>

        {/* Concise Centered Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: 'easeOut' }}
          className="hero-subtitle mx-auto mt-4 max-w-[54ch] font-sans text-[13.5px] font-normal leading-[1.55] text-white/88 text-pretty sm:mt-5 sm:text-[15px]"
        >
          {subtitle}
        </motion.p>

        {/* Centered Sharp CTA Buttons with Hover Text Roll */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: 'easeOut' }}
          className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:w-auto sm:flex-row"
        >
          <button
            type="button"
            onClick={primaryCta.onClick}
            className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-none bg-white px-6 py-3 text-[13px] font-sans font-semibold tracking-[-0.01em] text-[#04122b] shadow-[0_8px_24px_rgba(3,18,43,0.35)] transition-colors duration-200 hover:bg-[#e6f0ff] active:scale-[0.99] sm:w-auto"
          >
            <RollingButtonText text={primaryCta.text} icon={primaryCta.icon} />
          </button>

          {secondaryCta && (
            <button
              type="button"
              onClick={secondaryCta.onClick}
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-none border border-white/35 bg-white/10 px-6 py-3 text-[13px] font-sans font-medium tracking-[-0.01em] text-white backdrop-blur-xs transition-colors duration-200 hover:border-white/70 hover:bg-white/20 active:scale-[0.99] sm:w-auto"
            >
              <RollingButtonText text={secondaryCta.text} icon={secondaryCta.icon} />
            </button>
          )}
        </motion.div>

        {spotlight && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28, ease: 'easeOut' }}
            className="mx-auto mt-10 w-full max-w-4xl sm:mt-12"
          >
            {spotlight}
          </motion.div>
        )}
      </div>
    </section>
  );
}
