import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaqEntry } from '../seo/mixonSeo';

interface FaqAccordionBoxProps {
  faqs: FaqEntry[];
  idPrefix: string;
  defaultOpenIndex?: number | null;
  className?: string;
}

/**
 * Shared Jasper-inspired Mixon ice-blue zero-radius FAQ accordion.
 * Used across Home, Pricing (2-col split), and full-width Product/Service FAQ sections.
 */
export function FaqAccordionBox({
  faqs,
  idPrefix,
  defaultOpenIndex = 0,
  className = '',
}: FaqAccordionBoxProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(defaultOpenIndex);

  return (
    <div
      data-scroll-no-reveal=""
      className={`faq-jasper-box rounded-none border border-[#c5daf8] bg-[#f3f8ff] divide-y divide-[#c5daf8] text-left ${className}`}
    >
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        const panelId = `${idPrefix}-answer-${idx}`;
        return (
          <div
            key={faq.q}
            className="faq-jasper-row rounded-none bg-[#f3f8ff] transition-colors hover:bg-[#ebf3ff]"
          >
            <h3 data-scroll-no-reveal="" className="m-0">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-5 px-5 py-4 sm:px-6 sm:py-[18px] text-left cursor-pointer group rounded-none"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="faq-jasper-question font-ptserif text-[16.5px] sm:text-[19px] font-normal tracking-[-0.02em] leading-[1.28] text-[#04122b] group-hover:text-[#0755b8] transition-colors">
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
              <p className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6 font-sans text-[13.5px] sm:text-[14px] text-[#04122b]/85 font-normal leading-[1.6] max-w-[78ch]">
                {faq.a}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default FaqAccordionBox;
