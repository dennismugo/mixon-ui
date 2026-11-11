import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
}

/** A quiet, once-only entrance for content blocks as they enter the viewport. */
export function ScrollFadeIn({ children, className = '', delay = 0, direction = 'up' }: ScrollFadeInProps) {
  const reducedMotion = useReducedMotion();
  const offset = direction === 'left' ? -18 : direction === 'right' ? 18 : 22;

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: direction === 'up' ? offset : 0, x: direction === 'up' ? 0 : offset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -48px 0px' }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
