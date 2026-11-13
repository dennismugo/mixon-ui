import React from 'react';
import { ArrowRight } from 'lucide-react';
import PixelMosaicBackdrop from './PixelMosaicBackdrop';
import RollingButtonText from './RollingButtonText';

interface ProductClosingCtaProps {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  seedOffset: number;
}

export default function ProductClosingCta({
  title,
  description,
  buttonLabel,
  onClick,
  seedOffset,
}: ProductClosingCtaProps) {
  return (
    <section className="relative isolate w-full overflow-hidden border-y border-[#c5daf8] bg-[#e8f1ff] px-3 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-[88px]">
      <PixelMosaicBackdrop seedOffset={seedOffset} />
      <div className="relative z-10 mx-auto w-full max-w-[1056px] border border-[#c5daf8] bg-white px-6 py-10 text-center shadow-[0_18px_45px_-18px_rgba(4,18,43,0.18)] sm:px-10 sm:py-14 lg:px-20 lg:py-16">
        <h2
          className="mx-auto max-w-[24ch] font-ptserif !text-[clamp(2rem,3.8vw,3rem)] font-normal !leading-[1.1] tracking-[-0.025em] text-[#17243a] text-balance"
          style={{ fontFamily: "'PT Serif', Georgia, serif" }}
        >
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-[66ch] text-[16px] leading-[1.6] text-[#475569] sm:text-[18px]">
          {description}
        </p>
        <button
          type="button"
          onClick={onClick}
          className="group mt-8 inline-flex min-h-14 items-center justify-center gap-3 bg-[#0066FF] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#0052cc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0066FF] sm:px-8"
        >
          <RollingButtonText text={buttonLabel} />
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
