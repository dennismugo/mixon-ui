import React from 'react';
import { ArrowRight } from 'lucide-react';
import RollingButtonText from './RollingButtonText';

interface ServiceClosingCtaProps {
  title?: React.ReactNode;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export const ServiceClosingCta: React.FC<ServiceClosingCtaProps> = ({
  title,
  subtitle,
  primaryButtonText = 'Get a proposal',
  secondaryButtonText = 'Explore Packages',
  onPrimaryClick,
  onSecondaryClick,
  className
}) => {
  return (
    <section data-scroll-no-reveal="" className={`service-closing-cta relative isolate m-0 w-full overflow-hidden border-y border-white/15 bg-[#0066FF] ${className || ''}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 560"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        <rect x="64" y="0" width="72" height="72" fill="#07132e" />
        <rect x="136" y="72" width="72" height="72" fill="#D9E88E" />
        <rect x="0" y="72" width="64" height="64" fill="#D9E88E" />
        <rect x="64" y="488" width="72" height="72" fill="#07132e" />
        <rect x="136" y="416" width="72" height="72" fill="#D9E88E" />
        <rect x="0" y="424" width="64" height="64" fill="#D9E88E" />

        <rect x="1064" y="0" width="72" height="72" fill="#D9E88E" />
        <rect x="992" y="72" width="72" height="72" fill="#07132e" />
        <rect x="1136" y="72" width="64" height="64" fill="#D9E88E" />
        <rect x="1064" y="488" width="72" height="72" fill="#D9E88E" />
        <rect x="992" y="416" width="72" height="72" fill="#07132e" />
        <rect x="1136" y="424" width="64" height="64" fill="#D9E88E" />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 360 480"
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        className="pointer-events-none absolute inset-0 h-full w-full md:hidden"
      >
        <rect x="0" y="0" width="32" height="32" fill="#07132e" />
        <rect x="32" y="32" width="32" height="32" fill="#D9E88E" />
        <rect x="328" y="0" width="32" height="32" fill="#D9E88E" />
        <rect x="296" y="32" width="32" height="32" fill="#07132e" />
        <rect x="0" y="448" width="32" height="32" fill="#07132e" />
        <rect x="32" y="416" width="32" height="32" fill="#D9E88E" />
        <rect x="328" y="448" width="32" height="32" fill="#D9E88E" />
        <rect x="296" y="416" width="32" height="32" fill="#07132e" />
      </svg>

      <div
        className="relative z-10 mx-auto flex min-h-[480px] w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[520px] sm:px-12 sm:py-24 lg:min-h-[560px] lg:py-28"
      >
        {/* Centered Editorial Serif Headline */}
        <h2 className="font-ptserif !text-[clamp(2rem,4vw,3.5rem)] font-normal !leading-[1.1] tracking-[-0.025em] text-white max-w-3xl mx-auto text-balance">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-5 mx-auto max-w-[66ch] text-sm font-normal leading-relaxed text-white/90 sm:text-base md:text-[17px]">
            {subtitle}
          </p>
        )}

        {/* Action Buttons with Rolling Text on Hover */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-3.5">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="group inline-flex min-h-14 w-full items-center justify-center bg-[#D9E88E] px-6 py-3.5 text-sm font-semibold text-[#04122b] transition-colors hover:bg-[#cfdf80] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-7 sm:text-[14.5px]"
          >
            <RollingButtonText
              text={primaryButtonText}
              icon={<ArrowRight className="h-4 w-4 text-[#04122b]" />}
            />
          </button>
          
          <button
            type="button"
            onClick={onSecondaryClick}
            className="group inline-flex min-h-14 w-full items-center justify-center bg-[#04122b] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#0b1f45] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-7 sm:text-[14.5px]"
          >
            <RollingButtonText text={secondaryButtonText} />
          </button>
        </div>
      </div>
    </section>
  );
};
