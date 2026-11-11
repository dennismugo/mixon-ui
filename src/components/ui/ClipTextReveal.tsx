import React from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface ClipTextRevealProps {
  children?: React.ReactNode;
  text?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  innerClassName?: string;
  delay?: number;
  stagger?: number;
  mode?: 'lines' | 'words';
  once?: boolean;
}

const CLIP_EASE = [0.16, 1, 0.3, 1] as const;

export const ClipTextReveal: React.FC<ClipTextRevealProps> = ({
  children,
  text,
  as: Component = 'div',
  className,
  innerClassName,
  delay = 0,
  stagger = 0.08,
  mode = 'lines',
  once = true,
}) => {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px 100px 0px', amount: 0.01 });
  const shouldReduceMotion = useReducedMotion();
  const [hasRevealed, setHasRevealed] = React.useState(false);

  React.useEffect(() => {
    if (isInView) setHasRevealed(true);
  }, [isInView]);

  React.useEffect(() => {
    const timer = setTimeout(() => setHasRevealed(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const isVisible = isInView || hasRevealed;

  // If text string is provided or children is a plain string
  const rawContent = text ?? (typeof children === 'string' ? children : null);

  if (rawContent) {
    const segments = mode === 'words' 
      ? rawContent.split(/\s+/).filter(Boolean)
      : rawContent.split('\n').filter(Boolean);

    return (
      <Component ref={ref as any} className={cn('select-text', className)}>
        {segments.map((segment, index) => (
          <span 
            key={index} 
            className={cn(
              'overflow-hidden',
              mode === 'words' ? 'inline-block mr-[0.28em]' : 'block'
            )}
          >
            <motion.span
              initial={shouldReduceMotion ? { opacity: 0 } : { y: '115%', rotate: 1.2, opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : (isVisible ? { y: '0%', rotate: 0, opacity: 1 } : { y: '115%', rotate: 1.2, opacity: 0 })}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.75,
                delay: delay + index * stagger,
                ease: CLIP_EASE,
              }}
              className={cn('inline-block will-change-transform', innerClassName)}
            >
              {segment}
            </motion.span>
          </span>
        ))}
      </Component>
    );
  }

  // If complex JSX children are provided, wrap in a clip line container
  return (
    <Component ref={ref as any} className={cn('overflow-hidden select-text', className)}>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { y: '115%', opacity: 0 }}
        animate={shouldReduceMotion ? { opacity: 1 } : (isVisible ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 })}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.75,
          delay,
          ease: CLIP_EASE,
        }}
        className={cn('will-change-transform', innerClassName)}
      >
        {children}
      </motion.div>
    </Component>
  );
};

export default ClipTextReveal;
