import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Cpu,
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

    const mm = gsap.matchMedia();

    // ONLY animate the scatter-to-stack timeline on desktop screens (>= 1024px)
    mm.add('(min-width: 1024px)', () => {
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
        { scale: 1.85 },
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

      // Sticky-Stacked Solutions Entrance Scrub
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
    });

    return () => {
      mm.revert();
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
      {/* =========================================================================
          DESKTOP VIEW (>= 1024px): SCATTER-TO-STACK STAGE WITH 5 BALANCED CARDS
         ========================================================================= */}
      <div className="hidden lg:block">
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

            {/* 5 Radial Floating Cards (Balanced Proportions, Zero Drop Shadows, Single-line Buttons) */}
            <ul className="unify-snippets pointer-events-none absolute inset-0 list-none m-0 p-0">
              {/* 1. Top-Left: miReserve Luxury Villas */}
              <li className="unify-slot unify-slot-1">
                <div ref={(el) => { snippetInnerRefs.current[0] = el; }} className="unify-snippet">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('mireserve')}
                    aria-label="Explore miReserve luxury villas"
                    className="pointer-events-auto group relative flex flex-col justify-between w-full h-full rounded-none bg-white p-3 border border-slate-200/90 transition-transform duration-300 hover:scale-[1.03] cursor-pointer text-left shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="inline-flex items-center gap-1.5 min-w-0">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-blue-50 text-[#0066FF]">
                          <Building2 className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[12px] font-semibold tracking-tight text-[#083071] truncate">miReserve</span>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-none border border-blue-200/60">
                        Live
                      </span>
                    </div>
                    <div className="h-20 w-full overflow-hidden border border-slate-100 my-1 bg-slate-50">
                      <img
                        src={miReserveVillasImg}
                        alt="miReserve luxury villas"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <div className="text-[17px] font-bold tracking-tight text-[#04122B] leading-tight whitespace-nowrap">
                        98.4% Occupancy
                      </div>
                      <div className="text-[10px] font-medium text-slate-500 truncate mt-0.5">
                        Villas · Channel sync
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-none bg-[#0066FF] py-1.5 px-3 text-[11px] font-semibold text-white whitespace-nowrap transition-colors group-hover:bg-[#0052cc]">
                      <span>Explore miReserve</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </button>
                </div>
              </li>

              {/* 2. Top-Right: miPOS Retail & Stock */}
              <li className="unify-slot unify-slot-2">
                <div ref={(el) => { snippetInnerRefs.current[1] = el; }} className="unify-snippet">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('mipos')}
                    aria-label="Explore miPOS retail and inventory product"
                    className="pointer-events-auto group relative flex flex-col justify-between w-full h-full rounded-none bg-white p-3 border border-slate-200/90 transition-transform duration-300 hover:scale-[1.03] cursor-pointer text-left shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="inline-flex items-center gap-1.5 min-w-0">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-blue-50 text-[#0066FF]">
                          <Cpu className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[12px] font-semibold tracking-tight text-[#083071] truncate">miPOS</span>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200/60">
                        Synced
                      </span>
                    </div>
                    <div className="my-auto py-2">
                      <div className="text-[20px] font-bold tracking-tight text-[#04122B] leading-tight whitespace-nowrap">
                        KES 84,200
                      </div>
                      <div className="text-[10.5px] font-medium text-slate-500 truncate mt-1">
                        Shift #04 · Zero variance
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Real-time stock reconciliation
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-none bg-[#0066FF] py-1.5 px-3 text-[11px] font-semibold text-white whitespace-nowrap transition-colors group-hover:bg-[#0052cc]">
                      <span>Open miPOS</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </button>
                </div>
              </li>

              {/* 3. Mid-Right: miReserve Concierge & Front Desk */}
              <li className="unify-slot unify-slot-3">
                <div ref={(el) => { snippetInnerRefs.current[2] = el; }} className="unify-snippet">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('mireserve')}
                    aria-label="Explore miReserve guest check-in"
                    className="pointer-events-auto group relative flex flex-col justify-between w-full h-full rounded-none bg-white p-3 border border-slate-200/90 transition-transform duration-300 hover:scale-[1.03] cursor-pointer text-left shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="inline-flex items-center gap-1.5 min-w-0">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-slate-100 text-[#083071]">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[12px] font-semibold tracking-tight text-[#083071] truncate">Concierge</span>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-none border border-slate-200/60">
                        Active
                      </span>
                    </div>
                    <div className="h-20 w-full overflow-hidden border border-slate-100 my-1 bg-slate-50">
                      <img
                        src={miReserveHostessImg}
                        alt="miReserve front desk coordinator"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <div className="text-[17px] font-bold tracking-tight text-[#04122B] leading-tight whitespace-nowrap">
                        0-Wait Check-In
                      </div>
                      <div className="text-[10px] font-medium text-slate-500 truncate mt-0.5">
                        Front desk · Keyless arrivals
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-none bg-[#083071] py-1.5 px-3 text-[11px] font-semibold text-white whitespace-nowrap transition-colors group-hover:bg-[#04122B]">
                      <span>View Workflow</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </button>
                </div>
              </li>

              {/* 4. Bottom-Center: Event Yetu */}
              <li className="unify-slot unify-slot-4">
                <div ref={(el) => { snippetInnerRefs.current[3] = el; }} className="unify-snippet">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('eventyetu')}
                    aria-label="Explore Event Yetu ticketing product"
                    className="pointer-events-auto group relative flex flex-col justify-between w-full h-full rounded-none bg-white p-3 border border-slate-200/90 transition-transform duration-300 hover:scale-[1.03] cursor-pointer text-left shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="inline-flex items-center gap-1.5 min-w-0">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-indigo-50 text-[#4F46E5]">
                          <Ticket className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[12px] font-semibold tracking-tight text-[#1E1B4B] truncate">Event Yetu</span>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-none border border-indigo-200/60">
                        Validated
                      </span>
                    </div>
                    <div className="my-auto py-2">
                      <div className="text-[20px] font-bold tracking-tight text-[#1E1B4B] leading-tight whitespace-nowrap">
                        0.38s Pass
                      </div>
                      <div className="text-[10.5px] font-medium text-slate-500 truncate mt-1">
                        1,420 Tickets · Gate Pass
                      </div>
                      <div className="text-[10px] text-indigo-500 font-mono mt-0.5">
                        High-speed QR clearance
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-none bg-[#4F46E5] py-1.5 px-3 text-[11px] font-semibold text-white whitespace-nowrap transition-colors group-hover:bg-[#4338CA]">
                      <span>Explore Events</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </button>
                </div>
              </li>

              {/* 5. Mid-Left: miRentals */}
              <li className="unify-slot unify-slot-5">
                <div ref={(el) => { snippetInnerRefs.current[4] = el; }} className="unify-snippet">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('mirentals')}
                    aria-label="Explore miRentals rent collection product"
                    className="pointer-events-auto group relative flex flex-col justify-between w-full h-full rounded-none bg-white p-3 border border-slate-200/90 transition-transform duration-300 hover:scale-[1.03] cursor-pointer text-left shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="inline-flex items-center gap-1.5 min-w-0">
                        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-emerald-50 text-[#10B981]">
                          <Repeat className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[12px] font-semibold tracking-tight text-[#065F46] truncate">miRentals</span>
                      </div>
                      <span className="shrink-0 text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-none border border-emerald-200/60">
                        Reconciled
                      </span>
                    </div>
                    <div className="my-auto py-2">
                      <div className="text-[20px] font-bold tracking-tight text-[#04122B] leading-tight whitespace-nowrap">
                        + KES 65,000
                      </div>
                      <div className="text-[10.5px] font-medium text-slate-500 truncate mt-1">
                        Unit 4B · Daraja STK
                      </div>
                      <div className="text-[10px] text-emerald-600 font-mono mt-0.5">
                        Auto-matched lease ledger
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1.5 rounded-none bg-[#10B981] py-1.5 px-3 text-[11px] font-semibold text-white whitespace-nowrap transition-colors group-hover:bg-[#059669]">
                      <span>Open miRentals</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Sticky-Stacked Solutions List */}
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
            <li aria-hidden="true" className="unify-tagline-spacer pointer-events-none w-full" />
          </ul>
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW (< 1024px): FULL WIDTH CARDS WITH BALANCED BUTTONS & SPACING
         ========================================================================= */}
      <div className="block lg:hidden w-full bg-white text-[#14171F] px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-[#0066FF] mb-2 block">
            Unified Ecosystem
          </span>
          <h2
            className="text-3xl sm:text-4xl font-normal text-[#282B33] tracking-[-0.025em] leading-[1.08]"
            style={{ fontFamily: "'PT Serif', serif" }}
          >
            Unify your operations
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Connect retail checkout, property leases, hospitality bookings, and ticketing into one synchronized operational ledger.
          </p>
        </div>

        {/* 5 Full-Width Cards Stack */}
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* 1. miPOS Card */}
          <div className="w-full bg-white border border-slate-200/90 rounded-none p-4 sm:p-5 transition-all duration-200 hover:border-[#0066FF] shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-none bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                  <Cpu className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold tracking-tight text-[#04122B]">miPOS</span>
                <span className="text-[11px] text-slate-500 font-mono">Retail &amp; Stock</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Synced
              </span>
            </div>
            <div className="text-2xl font-extrabold tracking-tight text-[#04122B] leading-tight">
              KES 84,200
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Shift #04 · Zero variance reconciliation
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('mipos')}
              className="mt-3.5 w-full flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white py-2.5 px-4 text-xs font-semibold whitespace-nowrap rounded-none transition-colors cursor-pointer"
            >
              <span>Open miPOS</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 2. Event Yetu Card */}
          <div className="w-full bg-white border border-slate-200/90 rounded-none p-4 sm:p-5 transition-all duration-200 hover:border-[#4F46E5] shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-none bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
                  <Ticket className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold tracking-tight text-[#04122B]">Event Yetu</span>
                <span className="text-[11px] text-slate-500 font-mono">Tickets &amp; Gates</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-none">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Validated
              </span>
            </div>
            <div className="text-2xl font-extrabold tracking-tight text-[#04122B] leading-tight">
              0.38s Pass
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              1,420 Tickets · Gate validation &amp; access
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('eventyetu')}
              className="mt-3.5 w-full flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2.5 px-4 text-xs font-semibold whitespace-nowrap rounded-none transition-colors cursor-pointer"
            >
              <span>Explore Event Yetu</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 3. miRentals Card */}
          <div className="w-full bg-white border border-slate-200/90 rounded-none p-4 sm:p-5 transition-all duration-200 hover:border-[#10B981] shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-none bg-emerald-50 text-[#10B981] flex items-center justify-center shrink-0">
                  <Repeat className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold tracking-tight text-[#04122B]">miRentals</span>
                <span className="text-[11px] text-slate-500 font-mono">Rent &amp; Leases</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Reconciled
              </span>
            </div>
            <div className="text-2xl font-extrabold tracking-tight text-[#04122B] leading-tight">
              + KES 65,000
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Unit 4B · Instant Daraja STK reconciliation
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('mirentals')}
              className="mt-3.5 w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white py-2.5 px-4 text-xs font-semibold whitespace-nowrap rounded-none transition-colors cursor-pointer"
            >
              <span>Open miRentals</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 4. miReserve Luxury Villas Card */}
          <div className="w-full bg-white border border-slate-200/90 rounded-none p-4 sm:p-5 transition-all duration-200 hover:border-[#0066FF] shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-none bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                  <Building2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold tracking-tight text-[#04122B]">miReserve</span>
                <span className="text-[11px] text-slate-500 font-mono">Villas &amp; Stays</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-none">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Live
              </span>
            </div>
            <div className="h-36 w-full overflow-hidden border border-slate-100 my-2.5 bg-slate-50">
              <img
                src={miReserveVillasImg}
                alt="miReserve luxury villas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-2xl font-extrabold tracking-tight text-[#04122B] leading-tight">
              98.4% Occupancy
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Luxury coastal villas · Automated channel sync
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('mireserve')}
              className="mt-3.5 w-full flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white py-2.5 px-4 text-xs font-semibold whitespace-nowrap rounded-none transition-colors cursor-pointer"
            >
              <span>Explore miReserve</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 5. miReserve Concierge Front Desk Card */}
          <div className="w-full bg-white border border-slate-200/90 rounded-none p-4 sm:p-5 transition-all duration-200 hover:border-[#083071] shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-none bg-slate-100 text-[#083071] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-bold tracking-tight text-[#04122B]">miReserve Concierge</span>
                <span className="text-[11px] text-slate-500 font-mono">Front Desk</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-semibold text-slate-700 bg-slate-100 border border-slate-200/60 px-2 py-0.5 rounded-none">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Active
              </span>
            </div>
            <div className="h-36 w-full overflow-hidden border border-slate-100 my-2.5 bg-slate-50">
              <img
                src={miReserveHostessImg}
                alt="miReserve front desk hostess"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-2xl font-extrabold tracking-tight text-[#04122B] leading-tight">
              0-Wait Check-In
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Front desk · Keyless digital arrivals
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('mireserve')}
              className="mt-3.5 w-full flex items-center justify-center gap-2 bg-[#083071] hover:bg-[#04122B] text-white py-2.5 px-4 text-xs font-semibold whitespace-nowrap rounded-none transition-colors cursor-pointer"
            >
              <span>View Guest Workflow</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Solution Navigation Pills */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
          {CLICKABLE_SOLUTIONS.map((sol) => (
            <button
              key={sol.id}
              type="button"
              onClick={() => setCurrentPage(sol.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#04122B] transition-colors cursor-pointer"
            >
              <span style={{ color: sol.color }}>●</span>
              <span>{sol.title}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifyOperationsSection;
