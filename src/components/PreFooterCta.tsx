/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import mixonStudioCtaImg from '../assets/images/mixon-studio-cta.jpg';
import { ScrollRevealHeading, ScrollRevealParagraph } from './ui/ScrollRevealText';

interface PreFooterCtaProps {
  setCurrentPage?: (page: any) => void;
  className?: string;
  variant?: 'blue' | 'blue-gradient' | 'electric' | 'spark';
}

const SEAM_CELL = 24;
const SEAM_ROWS = 22;
const SEAM_COLS = 9;

// Stepped square white pixel-mosaic seam along the left edge of the photo (zero circles).
function buildDiagonalPixelSeam() {
  const squares: Array<{ x: number; y: number }> = [];
  for (let row = 0; row < SEAM_ROWS; row += 1) {
    // Slopes gently from top-left toward mid-bottom just like an architectural mosaic cut
    const baseSpan = Math.max(0, Math.round(5.4 - row * 0.24));
    for (let col = 0; col < SEAM_COLS; col += 1) {
      const hash = (row * 17 + col * 31 + row * col * 11) % 10;
      const inSolidEdge = col < baseSpan;
      const inScatteredEdge = col === baseSpan && hash >= 3;
      const inStrayPixel =
        (col === baseSpan + 1 && hash >= 7) ||
        (col === baseSpan + 2 && hash === 9 && row > 2 && row < SEAM_ROWS - 3);

      if (inSolidEdge || inScatteredEdge || inStrayPixel) {
        squares.push({ x: col * SEAM_CELL, y: row * SEAM_CELL });
      }
    }
  }
  return squares;
}

const SEAM_PIXELS = buildDiagonalPixelSeam();

export default function PreFooterCta({
  setCurrentPage,
  className = '',
}: PreFooterCtaProps) {
  const handleStartConversation = () => {
    if (setCurrentPage) {
      setCurrentPage('contact');
    } else {
      window.location.href = '#contact';
    }
  };

  const handleBookDemo = () => {
    if (setCurrentPage) setCurrentPage('book-demo');
    else window.location.assign('/book-demo');
  };

  const reassurancePoints = [
    '7-day trial or guided walk-through',
    'Response within 1 business day',
    'Zero sales pressure',
    'Tailored to your exact workflow',
  ];

  return (
    <section
      id="pre-footer-cta"
      aria-label="Pre-footer call to action"
      className={`relative w-full overflow-hidden border-t border-[#04122b]/10 bg-white select-none ${className}`}
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN: Crisp White Editorial Copy Block (No Circles) */}
        <div className="relative z-10 flex flex-col justify-center bg-white px-6 py-16 sm:px-10 sm:py-20 lg:col-span-5 lg:py-24 lg:pl-14 lg:pr-8">
          <div className="max-w-[440px]">
            <ScrollRevealHeading
              as="h2"
              className="prefooter-jasper-heading font-ptserif text-[#04122b]"
            >
              What is taking too much time in your business?
            </ScrollRevealHeading>

            <ScrollRevealParagraph className="mt-5 font-sans text-[14.5px] font-normal leading-[1.58] text-[#1e293b] sm:text-[15.5px]">
              Tell us what you want to improve. We will help you explore the right product, service or next step, without making it complicated.
            </ScrollRevealParagraph>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleStartConversation}
                className="inline-flex cursor-pointer items-center gap-2 rounded-none bg-[#0066FF] px-6 py-3.5 text-[13.5px] font-semibold tracking-[-0.01em] text-white transition-colors duration-200 hover:bg-[#0052cc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
              >
                <span>Start the conversation</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleBookDemo}
                className="inline-flex cursor-pointer items-center gap-2 rounded-none border border-[#04122b]/15 bg-[#f4f8ff] px-5 py-3.5 text-[13.5px] font-semibold tracking-[-0.01em] text-[#04122b] transition-colors duration-200 hover:border-[#0066FF]/40 hover:bg-[#eaf2ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
              >
                <span>Book a demo</span>
              </button>
            </div>

            <ul
              role="list"
              className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-normal leading-[1.45] text-[#475569]"
            >
              {reassurancePoints.map((point, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 bg-[#0066FF]" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: Studio Photo with Stepped White Square Pixel-Mosaic Edge (No Circles) */}
        <div className="relative min-h-[300px] overflow-hidden bg-[#eaf2ff] sm:min-h-[380px] lg:col-span-7 lg:min-h-[510px]">
          <img
            src={mixonStudioCtaImg}
            alt="Mixon product and design team collaborating on operational software workflows"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />

          {/* Desktop left stepped pixel-mosaic cutout */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${SEAM_COLS * SEAM_CELL} ${SEAM_ROWS * SEAM_CELL}`}
            preserveAspectRatio="xMinYMin slice"
            className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-[220px] lg:block"
          >
            {SEAM_PIXELS.map((sq, idx) => (
              <rect
                key={idx}
                x={sq.x}
                y={sq.y}
                width={SEAM_CELL}
                height={SEAM_CELL}
                fill="#ffffff"
              />
            ))}
          </svg>

          {/* Mobile top stepped white square seam */}
          <svg
            aria-hidden="true"
            viewBox="0 0 384 64"
            preserveAspectRatio="xMinYMin slice"
            className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full lg:hidden"
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((col) => (
              <React.Fragment key={col}>
                <rect x={col * 24} y={0} width={24} height={24} fill="#ffffff" />
                {(col * 7) % 3 !== 0 && (
                  <rect x={col * 24} y={24} width={24} height={24} fill="#ffffff" />
                )}
              </React.Fragment>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
