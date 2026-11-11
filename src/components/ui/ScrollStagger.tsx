import React, { useLayoutEffect, useRef } from 'react';
import { setupStaggerReveal } from '../../utils/scrollAnimations';

interface ScrollStaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

/** A GSAP/ScrollTrigger cascade for child cards entering the viewport. */
export const ScrollStaggerContainer: React.FC<ScrollStaggerContainerProps> = ({
  children,
  className = '',
  delay = 0.05,
  staggerDelay = 0.1,
  once = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const cards: HTMLElement[] = Array.from(
      container.querySelectorAll('[data-scroll-stagger-item]') as NodeListOf<HTMLElement>,
    );
    const firstCard = cards[0];
    return setupStaggerReveal(container, cards, {
      delay: reducedMotion ? 0 : delay,
      staggerDelay: reducedMotion ? Math.min(staggerDelay, 0.035) : staggerDelay,
      once,
      yOffset: reducedMotion ? 0 : Number(firstCard?.dataset.scrollYOffset ?? 28),
      duration: reducedMotion ? 0.32 : Number(firstCard?.dataset.scrollDuration ?? 0.6),
    });
  }, [delay, staggerDelay, once]);

  return <div ref={containerRef} className={className}>{children}</div>;
};

interface ScrollStaggerCardProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  onClick?: () => void;
  as?: 'div' | 'article' | 'li';
}

/** Mark a card for its parent container's shared, scroll-triggered GSAP tween. */
export const ScrollStaggerCard: React.FC<ScrollStaggerCardProps> = ({
  children,
  className = '',
  yOffset = 28,
  duration = 0.6,
  onClick,
  as: Tag = 'div',
}) => (
  <Tag
    className={className}
    onClick={onClick}
    data-scroll-stagger-item=""
    data-scroll-y-offset={yOffset}
    data-scroll-duration={duration}
  >
    {children}
  </Tag>
);
