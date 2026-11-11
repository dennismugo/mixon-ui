/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import mixonHostess from '../assets/images/mixon_hostess_1784147240664.jpg';
import { ExpandingArrowButton } from './ui/expanding-arrow-button';
import { ScrollRevealHeading, ScrollRevealParagraph } from './ui/ScrollRevealText';

interface PreFooterCtaProps {
  setCurrentPage?: (page: any) => void;
  className?: string;
  variant?: 'blue' | 'blue-gradient' | 'electric' | 'spark';
}

export default function PreFooterCta({
  setCurrentPage,
  className = '',
  variant = 'blue',
}: PreFooterCtaProps) {
  const isSpark = variant === 'spark';

  // Solid blue background (#034fda) - clean, flat, without gradient
  const bannerBgStyle: React.CSSProperties = isSpark
    ? { backgroundColor: '#C9F27A' }
    : { backgroundColor: '#034fda' };

  const headingColor = isSpark ? 'text-[#1C1B19]' : 'text-white';
  const subtitleColor = isSpark ? 'text-[#175236]' : 'text-[#E0EFFF]';
  const bulletTextColor = isSpark ? 'text-[#175236]' : 'text-[#D0E5FF]';
  const bulletSquareBg = isSpark ? 'bg-[#357551]' : 'bg-white';
  const ditherColorHex = isSpark ? '#C9F27A' : '#ffffff';

  const handleStartConversation = () => {
    if (setCurrentPage) {
      setCurrentPage('contact');
    } else {
      window.location.href = '#contact';
    }
  };

  const handleBookDemo = () => {
    if (setCurrentPage) setCurrentPage('contact');
    else window.location.assign('/contact');
  };

  const reassurancePoints = [
    '7-day trial or guided walk-through',
    'Response within 1 business day',
    'Zero sales pressure',
    'Tailored to your exact workflow'
  ];

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* MAIN BANNER CONTAINER (SOLID BLUE, NO GRADIENT) */}
      <section 
        aria-label="Pre-footer call to action"
        style={bannerBgStyle}
        className="relative w-full transition-all duration-300 overflow-hidden px-0"
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-20 lg:pt-26 lg:pb-24 flex flex-col items-center text-center">
          
          {/* Main Headline - Single-line on desktop to preserve visual hierarchy */}
          <ScrollRevealHeading 
            as="h2"
            className={`font-sans font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-[1.06] tracking-[-1px] sm:tracking-[-1.2px] whitespace-normal sm:whitespace-nowrap ${headingColor}`}
          >
            What is taking too much time in your business?
          </ScrollRevealHeading>

          {/* Subtitle - Crisp, Balanced Copy */}
          <ScrollRevealParagraph className={`font-sans text-[15px] sm:text-[17px] font-normal leading-[1.48] max-w-[560px] text-pretty mt-5 ${subtitleColor}`}>
            Tell us what you want to improve. We will help you explore the right product, service or next step, without making it complicated.
          </ScrollRevealParagraph>

          {/* Ferndesk-Style Precision Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-6 sm:pt-7 w-full sm:w-auto">
            {/* Shared expanding-arrow interaction keeps the main contact actions consistent. */}
            <ExpandingArrowButton
              size="pill"
              variant="solid-blue"
              onClick={handleStartConversation}
              className="h-11 w-full min-w-0 sm:w-auto sm:min-w-[190px]"
            >
              Start the conversation
            </ExpandingArrowButton>

            {/* Button 2: Book a demo with ExpandingArrowButton animated interaction */}
            <ExpandingArrowButton
              size="pill"
              onClick={handleBookDemo}
              className="h-11 min-w-[155px]"
            >
              Book a demo
            </ExpandingArrowButton>
          </div>

          {/* Micro-Reassurance List with 8x8 Solid Square Bullets */}
          <ul className={`flex flex-wrap justify-center gap-x-6 gap-y-2 pt-6 sm:pt-7 text-[13px] font-normal leading-[1.4] ${bulletTextColor}`}>
            {reassurancePoints.map((point, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className={`w-2 h-2 shrink-0 ${bulletSquareBg}`} aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

        </div>
        </div>

        {/* FERNDESK CRISP DITHER SEAM (NO FADING, FULL PIXEL PATTERN) */}
        <div 
          aria-hidden="true" 
          className="relative flex-none h-[40px] w-full overflow-hidden mt-6"
          style={{
            // @ts-ignore
            '--dither-color': ditherColorHex,
          }}
        >
          <div className="absolute inset-0 bg-[image:repeating-conic-gradient(var(--dither-color)_0_25%,transparent_0_50%)] bg-[size:8px_8px] bg-[position:0_0]" />
          <div className="absolute inset-0 opacity-60 top-1/2 bg-[image:repeating-conic-gradient(var(--dither-color)_0_25%,transparent_0_50%)] bg-[size:16px_16px] bg-[position:4px_0]" />
        </div>
      </section>
    </div>
  );
}
