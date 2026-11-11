import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

/**
 * Initializes the global Lenis smooth scrolling instance and synchronizes
 * it with GSAP's ScrollTrigger and ticker for 60/120fps fluid scrolling.
 */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Prevent mobile browser URL-bar height changes from triggering ScrollTrigger jumps mid-swipe
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Don't re-initialize if already active
  if (lenisInstance) return lenisInstance;

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Let mobile/coarse touch devices use native OS 60/120Hz touch inertia without JS interception
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (prefersReducedMotion || isTouchDevice) {
    return null;
  }

  try {
    lenisInstance = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.0,
      wheelMultiplier: 1.05,
      infinite: false,
      autoRaf: false, // We drive RAF through GSAP ticker for frame-perfect ScrollTrigger sync
    });

    // Notify GSAP ScrollTrigger whenever Lenis updates scroll
    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Drive Lenis inside GSAP ticker
    tickerFn = (time: number) => {
      lenisInstance?.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(500, 33);

    // Expose on window for easy access by anchor links and devtools
    (window as any).__lenis = lenisInstance;

    return lenisInstance;
  } catch (err) {
    console.warn('[SmoothScroll] Failed to initialize Lenis:', err);
    return null;
  }
}

/**
 * Returns the active Lenis instance, if initialized.
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Smoothly scrolls to a target (element, selector, or Y position in pixels).
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? -80,
      duration: options?.duration ?? 1.2,
      immediate: options?.immediate ?? false,
    });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options?.immediate ? 'instant' : 'smooth' });
    } else {
      const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
      if (el) {
        el.scrollIntoView({ behavior: options?.immediate ? 'instant' : 'smooth' });
      }
    }
  }
}

/**
 * Cleans up and destroys the Lenis instance and GSAP ticker listener.
 */
export function destroySmoothScroll() {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (typeof window !== 'undefined') {
    delete (window as any).__lenis;
  }
}
