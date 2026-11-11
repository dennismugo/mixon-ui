import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';

interface WordProps {
  key?: React.Key;
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isBold?: boolean;
}

function Word({ word, progress, range, isBold = false }: WordProps) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <span className="relative inline-block mr-2 sm:mr-2.5 lg:mr-3">
      <motion.span 
        style={{ opacity }} 
        className={`transition-colors text-inherit ${isBold ? 'font-bold text-gray-950' : 'text-gray-950'}`}
      >
        {word}
      </motion.span>
    </span>
  );
}

interface MissionScrollRevealProps {
  className?: string;
}

export default function MissionScrollReveal({ className = "" }: MissionScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.50"]
  });

  const paragraph1Words = [
    "Mixon", "began", "in", "Nairobi", "with", "a", "simple", "frustration,", "one", "that",
    "turned", "out", "to", "be", "shared", "far", "beyond", "Kenya:", "capable,", "hard-working",
    "businesses", "were", "being", "held", "back", "by", "technology", "that", "was", "clumsy,",
    "disconnected", "or", "built", "for", "someone", "else.", "A", "website", "that", "did",
    "not", "convert.", "A", "payment", "that", "took", "too", "many", "steps.", "A", "system",
    "that", "could", "not", "talk", "to", "the", "one", "next", "to", "it."
  ];

  const paragraph2Words = [
    { text: "So", bold: false },
    { text: "we", bold: false },
    { text: "started", bold: false },
    { text: "building", bold: false },
    { text: "the", bold: false },
    { text: "opposite.", bold: false },
    { text: "First", bold: false },
    { text: "websites,", bold: false },
    { text: "apps", bold: false },
    { text: "and", bold: false },
    { text: "integrations", bold: false },
    { text: "that", bold: false },
    { text: "were", bold: false },
    { text: "clear", bold: false },
    { text: "and", bold: false },
    { text: "dependable.", bold: false },
    { text: "Then,", bold: false },
    { text: "as", bold: false },
    { text: "we", bold: false },
    { text: "listened", bold: false },
    { text: "to", bold: false },
    { text: "more", bold: false },
    { text: "businesses,", bold: false },
    { text: "we", bold: false },
    { text: "noticed", bold: false },
    { text: "the", bold: false },
    { text: "same", bold: false },
    { text: "everyday", bold: false },
    { text: "challenges", bold: false },
    { text: "again", bold: false },
    { text: "and", bold: false },
    { text: "again", bold: false },
    { text: "in", bold: false },
    { text: "rentals,", bold: false },
    { text: "hospitality,", bold: false },
    { text: "events", bold: false },
    { text: "and", bold: false },
    { text: "retail.", bold: false },
    { text: "Those", bold: false },
    { text: "became", bold: false },
    { text: "our", bold: false },
    { text: "products:", bold: false },
    { text: "miRentals,", bold: true },
    { text: "miReserve,", bold: true },
    { text: "Event", bold: true },
    { text: "Yetu", bold: true },
    { text: "and", bold: false },
    { text: "miPOS.", bold: true }
  ];

  const totalTokens = paragraph1Words.length + paragraph2Words.length;

  return (
    <div ref={containerRef} className={className}>
      <div
        className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-normal leading-[1.4] sm:leading-[1.42] tracking-[-0.02em] text-gray-950 select-text space-y-7 sm:space-y-9"
        style={{ fontFamily: 'AktivGrotesk, "Aktiv Grotesk", system-ui, sans-serif' }}
      >
        <div role="paragraph" className="[text-wrap:pretty]">
          {paragraph1Words.map((word, i) => {
            const start = i / totalTokens;
            const end = Math.min(1, start + (1.2 / totalTokens));
            return (
              <Word 
                key={`p1-${i}`} 
                word={word} 
                progress={scrollYProgress} 
                range={[start, end]} 
                isBold={false}
              />
            );
          })}
        </div>

        <div role="paragraph" className="[text-wrap:pretty]">
          {paragraph2Words.map((item, j) => {
            const tokenIndex = paragraph1Words.length + j;
            const start = tokenIndex / totalTokens;
            const end = Math.min(1, start + (1.2 / totalTokens));
            return (
              <Word 
                key={`p2-${j}`} 
                word={item.text} 
                progress={scrollYProgress} 
                range={[start, end]} 
                isBold={item.bold}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
