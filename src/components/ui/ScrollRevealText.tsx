import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrollRevealHeadingProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/** Responsive, line-based heading reveal that plays only as the text scrolls into view. */
export const ScrollRevealHeading: React.FC<ScrollRevealHeadingProps> = ({
  children,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.075,
  once = true,
}) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element || !children.trim()) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let split: SplitText | undefined;
    const context = gsap.context(() => {
      split = SplitText.create(element, {
        type: 'lines',
        linesClass: 'mixon-split-line',
        mask: 'lines',
        autoSplit: true,
        aria: 'auto',
        onSplit: (self) => gsap.fromTo(self.lines,
          { yPercent: reducedMotion ? 0 : 118, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: reducedMotion ? 0.3 : 0.78,
            delay,
            stagger: reducedMotion ? 0.02 : stagger,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
              once,
              invalidateOnRefresh: true,
            },
          },
        ),
      });
    }, element);

    return () => {
      split?.revert();
      context.revert();
    };
  }, [children, delay, stagger, once]);

  const Element = Tag as React.ElementType;
  return <Element ref={ref} data-scroll-no-reveal="" className={className}>{children}</Element>;
};

interface ScrollRevealParagraphProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/** Fade-up supporting copy on entry with a simple ScrollTrigger. */
export const ScrollRevealParagraph: React.FC<ScrollRevealParagraphProps> = ({
  children,
  className = '',
  delay = 0.08,
  duration = 0.62,
  once = true,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      gsap.fromTo(element,
        { autoAlpha: 0, y: reducedMotion ? 0 : 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: reducedMotion ? 0.3 : duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            once,
            invalidateOnRefresh: true,
          },
        },
      );
    }, element);
    return () => context.revert();
  }, [children, delay, duration, once]);

  return <p ref={ref} data-scroll-no-reveal="" className={className}>{children}</p>;
};

interface ScrollRevealEyebrowProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

/** Small eyebrow fade-up tied to its own viewport trigger. */
export const ScrollRevealEyebrow: React.FC<ScrollRevealEyebrowProps> = ({
  children,
  className = '',
  delay = 0,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      gsap.fromTo(element,
        { autoAlpha: 0, y: reducedMotion ? 0 : 8, scale: reducedMotion ? 1 : 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0.28 : 0.48,
          delay,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 92%', once, invalidateOnRefresh: true },
        },
      );
    }, element);
    return () => context.revert();
  }, [children, delay, once]);

  return <div ref={ref} data-scroll-no-reveal="" className={className}>{children}</div>;
};
