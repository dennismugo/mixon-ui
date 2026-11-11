import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface KeycapData {
  letter: string;
  src: string;
  alt: string;
  isGreen: boolean;
  baseRotate: number;
  baseTop: number;
  scrollDeltaY: [number, number]; // [startOffset, endOffset]
  scrollDeltaRot: [number, number];
}

const KEYCAPS: KeycapData[] = [
  {
    letter: 'M',
    src: '/images/keycaps/key_m.png',
    alt: 'M Keycap (Mixon Electric Blue)',
    isGreen: false,
    baseRotate: -8,
    baseTop: -14,
    scrollDeltaY: [-16, 12],
    scrollDeltaRot: [-6, 8],
  },
  {
    letter: 'I',
    src: '/images/keycaps/key_i.png',
    alt: 'I Keycap (Mixon Sky Blue)',
    isGreen: false,
    baseRotate: -19,
    baseTop: -8,
    scrollDeltaY: [-10, 16],
    scrollDeltaRot: [-12, 10],
  },
  {
    letter: 'X',
    src: '/images/keycaps/key_x.png',
    alt: 'X Keycap (Mixon Sky Blue)',
    isGreen: false,
    baseRotate: 3,
    baseTop: 6,
    scrollDeltaY: [8, -14],
    scrollDeltaRot: [6, -8],
  },
  {
    letter: 'O',
    src: '/images/keycaps/key_o.png',
    alt: 'O Keycap (Mixon Sky Blue)',
    isGreen: false,
    baseRotate: -14,
    baseTop: -18,
    scrollDeltaY: [-14, 18],
    scrollDeltaRot: [-8, 12],
  },
  {
    letter: 'N',
    src: '/images/keycaps/key_n.png',
    alt: 'N Keycap (Mixon Sky Blue)',
    isGreen: false,
    baseRotate: 13,
    baseTop: 2,
    scrollDeltaY: [4, -16],
    scrollDeltaRot: [10, -6],
  },
];

interface MixonKeycapsProps {
  className?: string;
}

export const MixonKeycaps: React.FC<MixonKeycapsProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking linked to the container entering and exiting viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth scroll progress to eliminate stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.8,
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-2xl mx-auto my-7 sm:my-9 flex items-center justify-center select-none ${className}`}
    >
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 md:gap-5 px-3 py-2">
        {KEYCAPS.map((key, index) => {
          return (
            <SingleKeycap
              key={key.letter}
              keyData={key}
              index={index}
              smoothProgress={smoothProgress}
            />
          );
        })}
      </div>
    </div>
  );
};

interface SingleKeycapProps {
  keyData: KeycapData;
  index: number;
  smoothProgress: any;
}

const SingleKeycap: React.FC<SingleKeycapProps> = ({
  keyData,
  index,
  smoothProgress,
}) => {
  // Parallax shifts driven by scroll
  const scrollY = useTransform(smoothProgress, [0, 1], keyData.scrollDeltaY);
  const scrollRot = useTransform(smoothProgress, [0, 1], keyData.scrollDeltaRot);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -50,
        scale: 0.65,
        rotate: keyData.baseRotate - 16,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotate: keyData.baseRotate,
      }}
      transition={{
        type: 'spring',
        stiffness: 140,
        damping: 13,
        mass: 0.9,
        delay: 0.18 + index * 0.08,
      }}
      style={{
        top: keyData.baseTop,
        position: 'relative',
      }}
      className="relative flex-1 max-w-[62px] sm:max-w-[78px] md:max-w-[88px] lg:max-w-[94px] cursor-pointer group"
    >
      {/* Scroll animation wrapper */}
      <motion.div
        style={{
          y: scrollY,
          rotate: scrollRot,
        }}
        whileHover={{
          y: -10,
          scale: 1.08,
          rotate: keyData.baseRotate + (index % 2 === 0 ? 4 : -4),
          transition: { type: 'spring', stiffness: 350, damping: 15 },
        }}
        whileTap={{
          y: 6,
          scale: 0.92,
          transition: { duration: 0.08 },
        }}
        className="w-full transition-shadow duration-200"
      >
        <img
          src={keyData.src}
          alt={keyData.alt}
          draggable={false}
          className="w-full h-auto object-contain block drop-shadow-[0_12px_18px_rgba(16,32,58,0.13)] group-hover:drop-shadow-[0_18px_24px_rgba(16,32,58,0.22)] transition-[filter] duration-200"
        />
      </motion.div>
    </motion.div>
  );
};

export default MixonKeycaps;
