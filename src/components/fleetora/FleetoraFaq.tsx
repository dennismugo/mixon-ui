import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../ui/ScrollRevealText';
import { ScrollStaggerContainer } from '../ui/ScrollStagger';
import { HOME_FAQS } from '../../seo/mixonSeo';

interface FleetoraFaqProps {
  setCurrentPage?: (page: string) => void;
}

export const FleetoraFaq: React.FC<FleetoraFaqProps> = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
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

          {/* Right Column: Jasper-style Zero-Radius Mixon Ice-Blue Boxed Accordion */}
          <ScrollStaggerContainer
            className="faq-jasper-box lg:col-span-7 rounded-none border border-[#c5daf8] bg-[#f3f8ff] divide-y divide-[#c5daf8]"
            staggerDelay={0.05}
          >
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              const panelId = `home-faq-answer-${idx}`;
              return (
                <div key={idx} className="faq-jasper-row rounded-none bg-[#f3f8ff] transition-colors hover:bg-[#ebf3ff]">
                  <h3 data-scroll-no-reveal="" className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between gap-5 px-5 py-5 sm:px-7 sm:py-6 text-left cursor-pointer group rounded-none"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="faq-jasper-question font-ptserif text-[19px] sm:text-[22px] font-normal tracking-[-0.02em] leading-[1.24] text-[#04122b] group-hover:text-[#0755b8] transition-colors">
                        {faq.q}
                      </span>

                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-none border transition-colors ${
                          isOpen
                            ? 'border-[#0755b8]/65 bg-white text-[#0755b8]'
                            : 'border-[#0755b8]/35 bg-transparent text-[#0755b8] group-hover:border-[#0066FF] group-hover:text-[#0066FF]'
                        }`}
                        aria-hidden="true"
                      >
                        {isOpen ? (
                          <ChevronUp className="h-3.5 w-3.5 stroke-[2]" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 stroke-[2]" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <motion.div
                    id={panelId}
                    data-scroll-no-reveal=""
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.28, ease: 'easeInOut' }}
                    aria-hidden={!isOpen}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-6 pt-0 sm:px-7 sm:pb-7 font-sans text-[14px] sm:text-[15px] text-[#04122b]/85 font-normal leading-[1.64] max-w-[64ch]">
                      {faq.a}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </ScrollStaggerContainer>
        </div>
      </div>
    </section>
  );
};
