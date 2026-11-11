import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

const REVEAL_EASE = 'power3.out';
const REVEAL_START = 'top 82%';

export interface StaggerOptions {
  yOffset?: number;
  duration?: number;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

function revealHeading(heading: HTMLElement, reducedMotion: boolean, splits: SplitText[]) {
  if (
    heading.closest('[data-scroll-no-reveal]') ||
    heading.querySelector('[style*="transform"]') ||
    heading.style.transform ||
    heading.classList.contains('mixon-reveal-heading')
  ) return;

  const split = SplitText.create(heading, {
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
        duration: reducedMotion ? 0.2 : 0.82,
        stagger: reducedMotion ? 0.015 : 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: heading,
          start: REVEAL_START,
          once: true,
          invalidateOnRefresh: true,
        },
      },
    ),
  });
  splits.push(split);
}

function revealParagraph(paragraph: HTMLElement, reducedMotion: boolean) {
  if (
    paragraph.closest('.grid, [data-scroll-stagger-item], article, button, [data-scroll-no-reveal]') ||
    paragraph.style.transform ||
    paragraph.closest('[class*="rounded"][class*="border"]')
  ) return;

  gsap.fromTo(paragraph,
    { autoAlpha: 0, y: reducedMotion ? 0 : 28 },
    {
      autoAlpha: 1,
      y: 0,
      duration: reducedMotion ? 0.2 : 0.72,
      ease: REVEAL_EASE,
      scrollTrigger: {
        trigger: paragraph,
        start: 'top 86%',
        once: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

function revealGrid(grid: HTMLElement, reducedMotion: boolean) {
  const cards = Array.from(grid.children).filter((child): child is HTMLElement => {
    if (!(child instanceof HTMLElement) || child.hasAttribute('data-scroll-stagger-item')) return false;
    if (child.getAttribute('aria-hidden') === 'true' || child.classList.contains('hidden')) return false;
    // Only skip a card whose own transform belongs to a separate animation.
    // A moving icon or preview inside it must not disable the card's stagger.
    return !child.style.transform;
  });
  if (cards.length < 2) return;

  gsap.fromTo(cards,
    { autoAlpha: 0, y: reducedMotion ? 0 : 36, scale: reducedMotion ? 1 : 0.98 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: reducedMotion ? 0.2 : 0.78,
      stagger: { each: reducedMotion ? 0.02 : 0.14, from: 'start' },
      ease: REVEAL_EASE,
      scrollTrigger: {
        trigger: grid,
        start: REVEAL_START,
        once: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

export function setupStaggerReveal(
  container: HTMLElement,
  elements: HTMLElement[],
  { yOffset = 34, duration = 0.78, delay = 0.04, staggerDelay = 0.14, once = true }: StaggerOptions = {},
) {
  if (!elements.length) return () => undefined;

  const context = gsap.context(() => {
    gsap.set(elements, { autoAlpha: 0, y: yOffset, scale: 0.985, willChange: 'transform, opacity' });
    gsap.to(elements, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      stagger: { each: staggerDelay, from: 'start' },
      ease: REVEAL_EASE,
      clearProps: 'willChange',
      scrollTrigger: {
        trigger: container,
        start: REVEAL_START,
        once,
        invalidateOnRefresh: true,
      },
    });
  }, container);

  return () => context.revert();
}

export function setupPageScrollReveals(page: HTMLElement, pageType: string) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const splits: SplitText[] = [];
  const context = gsap.context(() => {
    const sections = Array.from(page.querySelectorAll<HTMLElement>('section'));
    const contentSections = pageType === 'home'
      ? sections.slice(1).filter((section) => section.getAttribute('aria-label') !== 'Pre-footer call to action')
      : sections;

    contentSections.forEach((section) => {
      if (section.hasAttribute('data-scroll-no-reveal')) return;
      section.querySelectorAll<HTMLElement>('h1, h2, h3, .mixon-clip-reveal').forEach((heading) => revealHeading(heading, reducedMotion, splits));
      section.querySelectorAll<HTMLElement>('p').forEach((paragraph) => revealParagraph(paragraph, reducedMotion));
      // One shared trigger per card grid creates a reliable, readable cascade.
      section.querySelectorAll<HTMLElement>('.grid, [data-scroll-stagger]').forEach((grid) => revealGrid(grid, reducedMotion));

      const media = section.querySelectorAll<HTMLElement>(
        '.group[class*="aspect-"][class*="overflow-hidden"], .mixon-product-spotlight, .mixon-service-spotlight',
      );
      media.forEach((visual) => {
        gsap.from(visual, {
          autoAlpha: 0,
          y: reducedMotion ? 0 : 30,
          duration: reducedMotion ? 0.2 : 0.78,
          ease: REVEAL_EASE,
          scrollTrigger: {
            trigger: visual,
            start: REVEAL_START,
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    // A few long-form pages (including case studies) use div-based content
    // blocks instead of semantic sections. Reveal their loose content too.
    page.querySelectorAll<HTMLElement>('h1, h2, h3, .mixon-clip-reveal').forEach((heading) => {
      if (!heading.closest('section')) revealHeading(heading, reducedMotion, splits);
    });
    page.querySelectorAll<HTMLElement>('p').forEach((paragraph) => {
      if (!paragraph.closest('section')) revealParagraph(paragraph, reducedMotion);
    });
    page.querySelectorAll<HTMLElement>('.grid, [data-scroll-stagger]').forEach((grid) => {
      if (!grid.closest('section')) revealGrid(grid, reducedMotion);
    });
  }, page);

  let disposed = false;
  let refreshTimer = window.setTimeout(() => {
    if (!disposed) ScrollTrigger.refresh();
  }, 180);
  void document.fonts?.ready.then(() => {
    if (disposed) return;
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      if (!disposed) ScrollTrigger.refresh();
    }, 60);
  });

  return () => {
    disposed = true;
    window.clearTimeout(refreshTimer);
    splits.forEach((split) => split.revert());
    context.revert();
  };
}
