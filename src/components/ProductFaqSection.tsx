import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { FaqEntry } from '../seo/mixonSeo';

interface ProductFaqSectionProps {
  faqs: FaqEntry[];
  idPrefix?: string;
}

/**
 * Accessible, crawler-visible FAQ accordion shared by Mixon flagship product pages.
 * Keeps all Q&A panels mounted in the DOM for search/AI answer engines while animating height cleanly.
 */
export function ProductFaqSection({ faqs, idPrefix = 'product-faq' }: ProductFaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      aria-label="Frequently Asked Questions"
      className="py-24 sm:py-32 bg-white px-6 sm:px-10 lg:px-14 border-t border-gray-150/80"
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-14 sm:mb-18 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-gray-950 tracking-tight">
            Your questions <em className="italic font-display text-gray-950">answered.</em>
          </h2>
        </div>

        <div data-scroll-no-reveal="" className="divide-y divide-gray-200/90 border-t border-b border-gray-200/90">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            const panelId = `${idPrefix}-answer-${idx}`;
            return (
              <div key={faq.q} className="group">
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-6 sm:py-7 flex items-center justify-between gap-6 text-left cursor-pointer transition-colors"
                  >
                    <span className="font-aktiv-faq text-base sm:text-lg font-normal text-gray-950 group-hover:text-[#0066FF] transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-50 text-gray-700 group-hover:text-[#0066FF] flex items-center justify-center shrink-0 transition-all duration-200">
                      <Plus
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-[#0066FF]' : ''
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <motion.div
                  id={panelId}
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  aria-hidden={!isOpen}
                  className="overflow-hidden"
                >
                  <div className="pb-6 sm:pb-7 text-sm sm:text-base text-gray-600 font-light leading-relaxed max-w-3xl pr-6 sm:pr-12">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductFaqSection;
