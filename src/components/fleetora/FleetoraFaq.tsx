import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, Mail } from 'lucide-react';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../ui/ScrollRevealText';
import { ScrollStaggerContainer, ScrollStaggerCard } from '../ui/ScrollStagger';
import { HOME_FAQS } from '../../seo/mixonSeo';

interface FleetoraFaqProps {
  setCurrentPage?: (page: string) => void;
}

export const FleetoraFaq: React.FC<FleetoraFaqProps> = ({ setCurrentPage }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = HOME_FAQS;

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white text-gray-950 relative overflow-hidden select-none w-full px-6 sm:px-10 lg:px-14">
      
      <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column matching Fleetora faq-detail-div with text reveal on scroll */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollRevealHeading 
              as="h2"
              className="font-bdogrotesk text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-950 tracking-[-0.025em] leading-[1.18]"
            >
              Quick answers to common questions.
            </ScrollRevealHeading>

            <ScrollRevealParagraph className="font-sans text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Have a question about implementation, payment rails, or system capabilities? Our engineering team is here to help.
            </ScrollRevealParagraph>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 60px 0px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-3"
            >
              <div className="text-xs font-mono uppercase tracking-wider text-gray-400 font-semibold">
                Direct Technical Advisory
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <a 
                    href="mailto:info@mixonsoftwares.co.ke" 
                    className="font-sans text-sm sm:text-base font-bold text-gray-950 hover:text-[#0066FF] transition-colors break-all sm:break-normal"
                  >
                    info@mixonsoftwares.co.ke
                  </a>
                  <p className="text-xs text-gray-500 font-light">
                    Direct reply within 2 business hours
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: FAQ items with staggered scroll entrance */}
          <ScrollStaggerContainer className="lg:col-span-7 divide-y divide-gray-200" staggerDelay={0.06}>
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              const panelId = `home-faq-answer-${idx}`;
              return (
                <ScrollStaggerCard key={idx} className="py-6 first:pt-0 last:pb-0" yOffset={18}>
                  <h3 data-scroll-no-reveal="" className="m-0">
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="w-full flex items-start justify-between gap-6 text-left cursor-pointer group"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="font-aktiv-faq text-lg sm:text-xl font-normal text-gray-900 group-hover:text-[#0066FF] transition-colors leading-snug">
                        {faq.q}
                      </span>

                      <div className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-[#0066FF] text-white border-transparent' : 'bg-white text-gray-700 group-hover:border-gray-400'
                      }`}>
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </h3>

                  <motion.div
                    id={panelId}
                    data-scroll-no-reveal=""
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.32, ease: 'easeInOut' }}
                    aria-hidden={!isOpen}
                    className="overflow-hidden"
                  >
                    <p className="pt-3 font-sans text-sm sm:text-base text-gray-600 font-light leading-relaxed max-w-2xl">
                      {faq.a}
                    </p>
                  </motion.div>
                </ScrollStaggerCard>
              );
            })}
          </ScrollStaggerContainer>

        </div>

      </div>
    </section>
  );
};
