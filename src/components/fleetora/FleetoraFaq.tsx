import React from 'react';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../ui/ScrollRevealText';
import { ScrollStaggerContainer } from '../ui/ScrollStagger';
import { HOME_FAQS } from '../../seo/mixonSeo';
import { FaqAccordionBox } from '../FaqAccordionBox';

interface FleetoraFaqProps {
  setCurrentPage?: (page: string) => void;
}

export const FleetoraFaq: React.FC<FleetoraFaqProps> = () => {
  const faqs = HOME_FAQS;

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-white text-gray-950 relative overflow-hidden select-none w-full px-6 sm:px-10 lg:px-14"
    >
      <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            <ScrollRevealHeading
              as="h2"
              className="font-bdogrotesk text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#04122b] tracking-[-0.025em] leading-[1.16]"
            >
              Quick answers to common questions.
            </ScrollRevealHeading>

            <ScrollRevealParagraph className="font-sans text-base sm:text-lg text-[#475569] font-normal leading-relaxed max-w-md">
              Have a question about implementation, payment rails, or system capabilities? Our engineering team is here to help.
            </ScrollRevealParagraph>
          </div>

          {/* Right Column: Shared Jasper-style Zero-Radius Mixon Ice-Blue Accordion */}
          <ScrollStaggerContainer className="lg:col-span-7" staggerDelay={0.05}>
            <FaqAccordionBox faqs={faqs} idPrefix="home-faq" />
          </ScrollStaggerContainer>
        </div>
      </div>
    </section>
  );
};
