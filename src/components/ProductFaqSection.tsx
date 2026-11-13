import React from 'react';
import { FaqEntry } from '../seo/mixonSeo';
import { FaqAccordionBox } from './FaqAccordionBox';

interface ProductFaqSectionProps {
  faqs: FaqEntry[];
  idPrefix?: string;
  compactBottomSpacing?: boolean;
}

/**
 * Accessible, crawler-visible full-width FAQ accordion shared by Mixon product and service pages.
 * Maintains the Mixon ice-blue zero-radius homepage FAQ aesthetic across the full max-w-7xl width.
 */
export function ProductFaqSection({
  faqs,
  idPrefix = 'product-faq',
  compactBottomSpacing = false,
}: ProductFaqSectionProps) {
  return (
    <section
      aria-label="Frequently Asked Questions"
      className={`pt-24 bg-white px-6 sm:px-10 lg:px-14 border-t border-gray-150/80 select-none ${
        compactBottomSpacing ? 'pb-12 sm:pt-32 sm:pb-14' : 'pb-24 sm:pb-32'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-14 space-y-3">
          <h2 className="font-ptserif text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#04122b] tracking-[-0.025em] leading-[1.12]">
            Your questions answered.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#475569] font-normal max-w-2xl mx-auto leading-relaxed">
            Clear, practical answers on rollout, payment rails, security, and ongoing support.
          </p>
        </div>

        <FaqAccordionBox faqs={faqs} idPrefix={idPrefix} className="w-full" />
      </div>
    </section>
  );
}

export default ProductFaqSection;
