import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Lock,
  Repeat,
  Ticket,
} from 'lucide-react';
import miReserveVillasImg from '../assets/images/mixon_resort_villas_1784147227224.jpg';
import miReserveHostessImg from '../assets/images/mixon_hostess_1784147240664.jpg';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

interface UnifyOperationsSectionProps {
  setCurrentPage: (page: any) => void;
}

interface ClickableSolution {
  id: 'mirentals' | 'mireserve' | 'mipos' | 'eventyetu';
  title: string;
  subtitle: string;
  color: string;
}

const CLICKABLE_SOLUTIONS: ClickableSolution[] = [
  {
    id: 'mirentals',
    title: 'miRentals',
    subtitle: 'Rent & Leases',
    color: '#10B981',
  },
  {
    id: 'mireserve',
    title: 'miReserve',
    subtitle: 'Stays & Channels',
    color: '#0066FF',
  },
  {
    id: 'mipos',
    title: 'miPOS',
    subtitle: 'Retail & Stock',
    color: '#083071',
  },
  {
    id: 'eventyetu',
    title: 'Event Yetu',
    subtitle: 'Tickets & Gates',
    color: '#4F46E5',
  },
];

type Point = [number, number];

/** Computes intersection of two infinite 2D lines defined by segments [p1, p2] and [p3, p4]. */
function intersectLines([p1, p2]: [Point, Point], [p3, p4]: [Point, Point]): Point | null {
  const dx1 = p2[0] - p1[0];
  const dy1 = p2[1] - p1[1];
  const dx2 = p4[0] - p3[0];
  const dy2 = p4[1] - p3[1];
  const denom = dx1 * dy2 - dy1 * dx2;
  if (denom === 0) return null;

  const t = ((p3[0] - p1[0]) * dy2 - (p3[1] - p1[1]) * dx2) / denom;
  return [p1[0] + t * dx1, p1[1] + t * dy1];
}

/** Returns intersections of the radial line `ray` against the 4 viewport stage borders. */
function intersectViewportBorders(ray: [Point, Point], width: number, height: number): Point[] {
  const borders: [Point, Point][] = [
    [[0, 0], [width, 0]],
    [[width, 0], [width, height]],
    [[width, height], [0, height]],
    [[0, height], [0, 0]],
  ];
  return borders.map((edge) => intersectLines(ray, edge)).filter((pt): pt is Point => pt !== null);
}

/** Calculates start (outside viewport edge along radial ray) and center convergence offsets for a floating card. */
function getSnippetOffsets(
  container: HTMLElement,
  stage: HTMLElement,
  mode: 'viewport' | 'center',
): { x: number; y: number } {
  const w = container.offsetWidth;
  const h = container.offsetHeight;
  const left = container.offsetLeft;
  const top = container.offsetTop;
  const stageW = stage.offsetWidth;
  const stageH = stage.offsetHeight;

  // Bias vertical center down (+42px) so converged stack & rays clear the fixed top header cleanly
  const cx = 0.5 * stageW;
  const cy = 0.5 * stageH + 42;

  let x = cx - left - 0.5 * w;
  let y = cy - top - 0.5 * h;

  if (mode === 'viewport') {
    const centerPt: Point = [cx, cy];
    const cardPt: Point = [left + 0.5 * w, top + 0.5 * h];

    const nearest = intersectViewportBorders([centerPt, cardPt], stageW, stageH).reduce<Point>(
      (best, candidate) => {
        if (Math.abs(candidate[0] - left) < Math.abs(best[0] - left)) best[0] = candidate[0];
        if (Math.abs(candidate[1] - top) < Math.abs(best[1] - top)) best[1] = candidate[1];
        return best;
      },
      [99999, 99999],
    );

    x = nearest[0] - left - 0.5 * w;
    y = nearest[1] - top - 0.5 * h;

    // Push card completely outside the exited viewport edge
    if (nearest[0] < cx - 0.5 * w) x -= 0.58 * w;
    else if (nearest[0] > cx + 0.5 * w) x += 0.58 * w;

    if (nearest[1] < cy - 0.5 * h) y -= 0.58 * h;
    else if (nearest[1] > cy + 0.5 * h) y += 0.58 * h;
  }

  return { x, y };
}

export const UnifyOperationsSection: React.FC<UnifyOperationsSectionProps> = ({ setCurrentPage }) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const snippetInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const taglineInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    const title = titleRef.current;
    const snippets = snippetInnerRefs.current.filter(Boolean) as HTMLDivElement[];
    const taglines = taglineInnerRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!root || !track || !stage || !title || !snippets.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(snippets, { opacity: 1, clearProps: 'transform' });
      gsap.set(title, { scale: 1, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Sticky Stage Scatter-to-Stack Timeline (200vh track)
      const tl = gsap.timeline({
        paused: true,
        ease: 'none',
        defaults: { duration: 1, ease: 'none' },
        scrollTrigger: {
          trigger: track,
          scrub: true,
          start: () => `top-=${window.innerHeight * 0.1} top`,
          end: () => `bottom+=${window.innerHeight * 0.45} bottom`,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        title,
        { scale: () => (window.innerWidth > 768 ? 1.85 : 1.05) },
        { duration: 2, scale: 0.3 },
        0,
      );
      tl.to(title, { duration: 0.14, opacity: 0 }, 1.52);

      snippets.forEach((el) => {
        const container = el.parentElement;
        if (!container) return;

        tl.set(el, { opacity: 1 }, 0);
        tl.fromTo(
          el,
          {
            x: () => getSnippetOffsets(container, stage, 'viewport').x,
            y: () => getSnippetOffsets(container, stage, 'viewport').y,
          },
          {
            duration: 1.85,
            ease: 'power1.inOut',
            x: () => getSnippetOffsets(container, stage, 'center').x,
            y: () => getSnippetOffsets(container, stage, 'center').y,
          },
          0,
        );
        tl.set(container, { xPercent: 0, yPercent: 0 }, 0);
      });

      // 2. Clickable Sticky-Stacked Solutions Entrance Scrub
      taglines.forEach((el) => {
        if (!el.parentElement) return;
        gsap.from(el, {
          ease: 'none',
          opacity: 0.35,
          yPercent: 95,
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 72%',
            end: 'bottom bottom',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, rootRef);

    let rafId = 0;
    let lastWidth = window.innerWidth;
    const handleRefresh = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener('resize', handleRefresh);

    return () => {
      window.removeEventListener('resize', handleRefresh);
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="solutions"
      ref={rootRef}
      data-scroll-no-reveal=""
      aria-label="Unify your operations across Mixon solutions"
      className="unify-operations relative bg-white text-[#14171F] w-full select-none"
    >
      {/* PART 1: STICKY STAGE WITH FLYING MIRESERVE IMAGES & CLICKABLE PRODUCT CARDS */}
      <div ref={trackRef} className="unify-stage-track relative">
        <div ref={stageRef} className="unify-sticky-slot sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Centered Scaling Headline */}
          <div className="pointer-events-none h-full w-full flex flex-col items-center justify-center text-center px-6 pt-14 overflow-hidden">
            <h2
              ref={titleRef}
              className="unify-headline relative font-display font-normal tracking-[-0.025em] leading-[1.04] text-[#282B33] will-change-transform"
            >
              Unify your
              <br />
              operations
            </h2>
          </div>

          {/* 5 Radial Floating Cards (miReserve Imagery + Clickable Product Widgets) */}
          <ul className="unify-snippets pointer-events-none absolute inset-0 list-none m-0 p-0">
            {/* 1. Top-Left Image: miReserve Resort Villa Stays */}
            <li className="unify-slot unify-slot-1">
              <div ref={(el) => { snippetInnerRefs.current[0] = el; }} className="unify-snippet">
                <button
                  type="button"
                  onClick={() => setCurrentPage('mireserve')}
                  aria-label="Explore miReserve hospitality stays"
                  className="pointer-events-auto group relative block w-full overflow-hidden rounded-none shadow-[0_20px_48px_rgba(4,18,43,0.18)] ring-1 ring-black/10 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] cursor-pointer text-left"
                >
                  <div className="aspect-[6/5] w-full overflow-hidden bg-slate-100">
                    <img
                      src={miReserveVillasImg}
                      alt="miReserve luxury coastal villas and hospitality stays"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </button>
              </div>
            </li>

            {/* 2. Top-Right Product UI Card: miPOS Retail & Stock */}
            <li className="unify-slot unify-slot-2">
              <div ref={(el) => { snippetInnerRefs.current[1] = el; }} className="unify-snippet">
                <button
                  type="button"
                  onClick={() => setCurrentPage('mipos')}
                  aria-label="Explore miPOS retail and inventory product"
                  className="pointer-events-auto group relative block w-full rounded-none bg-[#0066FF] p-2.5 sm:p-3.5 text-white shadow-[0_22px_50px_rgba(0,102,255,0.28)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04122B] cursor-pointer text-left"
                >
                  <div className="rounded-none bg-white p-2.5 sm:p-3.5 text-[#04122B]">
                    <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
                      <div className="inline-flex items-center gap-1.5 min-w-0">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0066FF] text-white">
                          <Cpu className="h-3 w-3" />
                        </span>
                        <span className="text-[11px] font-semibold tracking-tight text-[#083071] truncate">miPOS</span>
                      </div>
                      <span className="hidden sm:inline-block shrink-0 text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        Synced
                      </span>
                    </div>
                    <div className="text-[15px] sm:text-xl font-bold tracking-tight text-[#04122B] leading-tight whitespace-nowrap">
                      KES 84,200
                    </div>
                    <div className="mt-1 text-[10px] sm:text-[10.5px] font-medium text-slate-500 truncate">
                      Shift #04 · Zero variance
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-2.5 flex items-center justify-center gap-1 rounded-[6px] bg-white py-1 sm:py-1.5 px-2.5 sm:px-3 text-[10.5px] sm:text-[11px] font-semibold text-[#04122B] transition-colors group-hover:bg-blue-50">
                    <span>Open miPOS</span>
                    <ArrowUpRight className="h-3 w-3 text-[#0066FF]" />
                  </div>
                </button>
              </div>
            </li>

            {/* 3. Mid-Right Image: miReserve Concierge & Guest Check-In */}
            <li className="unify-slot unify-slot-3">
              <div ref={(el) => { snippetInnerRefs.current[2] = el; }} className="unify-snippet">
                <button
                  type="button"
                  onClick={() => setCurrentPage('mireserve')}
                  aria-label="Explore miReserve guest check-in and front desk workflow"
                  className="pointer-events-auto group relative block w-full overflow-hidden rounded-none shadow-[0_22px_50px_rgba(4,18,43,0.18)] ring-1 ring-black/10 transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] cursor-pointer text-left"
                >
                  <div className="aspect-[1/1] w-full overflow-hidden bg-slate-100">
                    <img
                      src={miReserveHostessImg}
                      alt="miReserve hospitality hostess coordinating guest check-in"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </button>
              </div>
            </li>

            {/* 4. Bottom-Center Front Card (z-5): Event Yetu Product Card */}
            <li className="unify-slot unify-slot-4">
              <div ref={(el) => { snippetInnerRefs.current[3] = el; }} className="unify-snippet">
                <button
                  type="button"
                  onClick={() => setCurrentPage('eventyetu')}
                  aria-label="Explore Event Yetu ticketing product"
                  className="pointer-events-auto group relative block w-full rounded-none bg-[#EEF2FF] p-3 sm:p-3.5 text-[#1E1B4B] shadow-[0_24px_56px_rgba(4,18,43,0.18)] border border-[#C7D2FE] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4F46E5] cursor-pointer text-center"
                >
                  <div className="rounded-none bg-white/90 px-3 py-4 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shadow-sm mb-2">
                      <Ticket className="h-5 w-5" />
                    </div>
                    <div className="text-[12.5px] sm:text-[13px] font-bold text-[#1E1B4B] leading-tight">
                      Event Yetu
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-indigo-600/80">
                      <Lock className="h-2.5 w-2.5" />
                      <span>0.38s Gate Pass</span>
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-center gap-1 rounded-[6px] bg-white py-1.5 px-3 text-[11px] font-semibold text-[#1E1B4B] shadow-xs transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    <span>Explore Events</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </button>
              </div>
            </li>

            {/* 5. Mid-Left Product UI Card: miRentals Settlement */}
            <li className="unify-slot unify-slot-5">
              <div ref={(el) => { snippetInnerRefs.current[4] = el; }} className="unify-snippet">
                <button
                  type="button"
                  onClick={() => setCurrentPage('mirentals')}
                  aria-label="Explore miRentals rent collection product"
                  className="pointer-events-auto group relative flex flex-col justify-between w-full min-h-[124px] sm:min-h-[192px] rounded-none bg-[#10B981] p-2.5 sm:p-4 text-white shadow-[0_22px_50px_rgba(16,185,129,0.28)] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04122B] cursor-pointer text-left"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-semibold text-white/95 mb-1.5 sm:mb-2">
                      <Repeat className="h-3 sm:h-3.5 w-3 sm:w-3.5" />
                      <span>miRentals</span>
                    </div>
                    <div className="text-[14px] sm:text-[17px] font-bold tracking-tight leading-snug text-white whitespace-nowrap">
                      + KES 65,000
                    </div>
                    <div className="text-[11px] sm:text-[13px] font-medium text-white/85 mt-0.5 truncate">
                      Unit 4B • Daraja STK
                    </div>
                  </div>
                  <div className="mt-2.5 sm:mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[10.5px] font-semibold text-white backdrop-blur-xs">
                      <CheckCircle2 className="h-2.5 sm:h-3 w-2.5 sm:w-3" />
                      <span>Reconciled</span>
                    </span>
                    <ArrowUpRight className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* PART 2: BELOW CLICKABLE STICKY-STACKED SOLUTIONS */}
      <div className="relative">
        <ul
          className="unify-taglines flex flex-col items-center list-none m-0 p-0"
          style={{ '--items': CLICKABLE_SOLUTIONS.length } as React.CSSProperties}
        >
          {CLICKABLE_SOLUTIONS.map((sol, idx) => (
              <li
                key={sol.id}
                className="pointer-events-none w-full flex items-start justify-center px-4"
                style={{ '--color': sol.color, '--index': idx } as React.CSSProperties}
              >
                <div
                  ref={(el) => { taglineInnerRefs.current[idx] = el; }}
                  className="pointer-events-auto flex items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentPage(sol.id)}
                    aria-label={`Open ${sol.title} — ${sol.subtitle} solution page`}
                    className="group inline-flex items-center justify-center gap-3 sm:gap-4 rounded-2xl px-4 py-1.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0066FF] cursor-pointer"
                  >
                    <span
                      className="unify-tagline-title font-sans font-semibold tracking-[-0.035em] leading-none whitespace-nowrap"
                      style={{ color: sol.color }}
                    >
                      {sol.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border shrink-0 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:shadow-md"
                      style={{
                        borderColor: `${sol.color}38`,
                        backgroundColor: `${sol.color}12`,
                        color: sol.color,
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-full scale-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
                        style={{ backgroundColor: sol.color }}
                      />
                      <ArrowUpRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5 group-hover:-translate-y-5 group-hover:opacity-0" />
                      <ArrowUpRight className="absolute z-10 w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2] text-white -translate-x-5 translate-y-5 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    </span>
                  </button>
                </div>
              </li>
          ))}
          {/* Hold buffer so stacked solutions linger briefly in view before scrolling to next section */}
          <li aria-hidden="true" className="unify-tagline-spacer pointer-events-none w-full" />
        </ul>
      </div>
    </section>
  );
};

export default UnifyOperationsSection;
