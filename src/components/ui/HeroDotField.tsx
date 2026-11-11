import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface HeroDotFieldProps {
  /** Additional classes applied to the SVG element (use Tailwind `text-*` to set dot color via `currentColor`). */
  className?: string;
  /** Render the denser 12px pitch grid (default uses 16px on >= 640px). */
  fine?: boolean;
  /** Enable gentle ambient shimmer transitions on stream dots. */
  lively?: boolean;
  /** Render sweeping corner-to-center quadratic Bézier stream ribbons with travelling pulses. */
  streams?: boolean;
  /** Add lower corner filler curves on narrow viewports (< 640px). */
  fillFootOnPhones?: boolean;
  /** Mix solid dots in with hollow rings (when false, prefers rings/dim). */
  solidDots?: boolean;
}

type DotKind = 'dim' | 'ring' | 'lit';
type CurveTuple = [number, number];
type QuadraticCurve = [CurveTuple, CurveTuple, CurveTuple];

interface DotSpec {
  key: string;
  cx: number;
  cy: number;
  kind: DotKind;
  opacity?: number;
}

interface StreamDotRef {
  key: string;
  progress: number;
}

interface StreamSpec {
  dots: StreamDotRef[];
  lengthPx: number;
}

interface PatternHole {
  left: number;
  top: number;
  right: number;
  bottom: number;
  oval: boolean;
}

interface FieldLayout {
  pitch: number;
  gridOrigin: { x: number; y: number };
  radius: number;
  dots: DotSpec[];
  clearedCells: Set<string>;
  streams: StreamSpec[];
}

const CORNER_CURVES: QuadraticCurve[] = [
  [[-0.04, 0.04], [0.12, 0.08], [0.23, 0.36]],
  [[-0.04, 0.42], [0.08, 0.54], [0.22, 0.62]],
  [[0.04, 1.05], [0.08, 0.82], [0.22, 0.78]],
  [[0.9, -0.05], [0.9, 0.16], [0.78, 0.3]],
  [[1.04, 0.3], [0.9, 0.3], [0.77, 0.46]],
  [[1.04, 0.62], [0.92, 0.7], [0.78, 0.7]],
  [[0.97, 1.05], [0.94, 0.9], [0.8, 0.82]],
];

const PHONE_FOOT_CURVES: QuadraticCurve[] = [
  [[-0.06, 0.74], [0.28, 0.84], [0.46, 1.05]],
  [[1.06, 0.82], [0.72, 0.88], [0.58, 1.05]],
];

const CONTOUR_THRESHOLDS = [0.32, 0.5, 0.68];
const NEXT_KIND: Record<DotKind, DotKind> = { dim: 'ring', ring: 'lit', lit: 'ring' };
const SPARKLE_KINDS: DotKind[] = ['dim', 'lit', 'ring'];
const RADIAL_MASK =
  'radial-gradient(ellipse 42% 48% at 50% 48%, rgb(0 0 0 / 0.2), rgb(0 0 0 / 0.55) 60%, black 100%)';

const DOT_TRANSITION_CLASS =
  '[&>circle]:transition-[fill-opacity,stroke-opacity,opacity] [&>circle]:duration-700 [&>circle]:ease-in-out motion-reduce:[&>circle]:transition-none';

function hash2D(x: number, y: number): number {
  let h = Math.imul(x, 0x165667b1) + Math.imul(y, 0x27d4eb2f) + Math.imul(7, 0x7fffffff);
  h = Math.imul(h ^ (h >>> 13), 0x4bf19f61);
  return ((h ^ (h >>> 16)) >>> 0) / 0x100000000;
}

function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const bottom = hash2D(ix, iy) + (hash2D(ix + 1, iy) - hash2D(ix, iy)) * sx;
  const top = hash2D(ix, iy + 1) + (hash2D(ix + 1, iy + 1) - hash2D(ix, iy + 1)) * sx;
  return bottom + (top - bottom) * sy;
}

function evalQuadratic(
  [p0, p1, p2]: QuadraticCurve,
  t: number,
  width: number,
  height: number
): [number, number] {
  const inv = 1 - t;
  return [
    (inv * inv * p0[0] + 2 * inv * t * p1[0] + t * t * p2[0]) * width,
    (inv * inv * p0[1] + 2 * inv * t * p1[1] + t * t * p2[1]) * height,
  ];
}

function cellKey(col: number, row: number): string {
  return `${col}:${row}`;
}

function kindToStyle(kind: DotKind): { fillOpacity: number; strokeOpacity: number } {
  return {
    fillOpacity: kind === 'ring' ? 0 : kind === 'lit' ? 1 : 0.14,
    strokeOpacity: kind === 'ring' ? 0.55 : 0,
  };
}

function applyDotStyle(el: SVGCircleElement | undefined, kind: DotKind) {
  if (!el) return;
  const st = kindToStyle(kind);
  el.style.fillOpacity = String(st.fillOpacity);
  el.style.strokeOpacity = String(st.strokeOpacity);
}

function collectPatternHoles(container: HTMLElement): PatternHole[] {
  const hostRect = container.getBoundingClientRect();
  const holes: PatternHole[] = [];

  for (const el of container.querySelectorAll<HTMLElement>('[data-hero-pattern-hole]')) {
    const mode = el.getAttribute('data-hero-pattern-hole');
    let rects: DOMRect[];
    if (mode === 'text') {
      const range = document.createRange();
      range.selectNodeContents(el);
      rects = Array.from(range.getClientRects());
    } else {
      rects = [el.getBoundingClientRect()];
    }

    for (const r of rects) {
      if (r.width > 0 && r.height > 0) {
        holes.push({
          left: r.left - hostRect.left,
          top: r.top - hostRect.top,
          right: r.right - hostRect.left,
          bottom: r.bottom - hostRect.top,
          oval: mode === 'oval',
        });
      }
    }
  }

  return holes;
}

function insideHole(cx: number, cy: number, margin: number, hole: PatternHole): boolean {
  if (hole.oval) {
    const rx = (hole.right - hole.left) / 2;
    const ry = (hole.bottom - hole.top) / 2;
    return (
      Math.hypot((cx - hole.left - rx) / rx, (cy - hole.top - ry) / ry) +
        (hash2D(Math.round(cx), Math.round(cy)) - 0.5) * 0.3 <
      1
    );
  }
  return (
    cx > hole.left - margin &&
    cx < hole.right + margin &&
    cy > hole.top - margin &&
    cy < hole.bottom + margin
  );
}

function buildFieldLayout(
  container: HTMLElement,
  opts: Required<Omit<HeroDotFieldProps, 'className'>>
): FieldLayout {
  const width = container.clientWidth;
  const height = container.clientHeight;
  const pitch = opts.fine ? 12 : width < 640 ? 12 : 16;
  const holes = collectPatternHoles(container);
  const cols = Math.floor(width / pitch);
  const rows = Math.floor(height / pitch);
  const gridOrigin = {
    x: (width - cols * pitch) / 2,
    y: (height - rows * pitch) / 2,
  };

  // Scale horizontal reach on wide aspect ratios so corners keep generous streams
  const xReach = opts.streams ? Math.min(1, (3.2 * height) / Math.max(1, width)) : 1;
  const widthScale = opts.streams ? Math.min(1, Math.max(0.5, height / 900)) : 1;
  const baseCurves =
    opts.fillFootOnPhones && width < 640
      ? [...CORNER_CURVES, ...PHONE_FOOT_CURVES]
      : CORNER_CURVES;

  const curves = baseCurves.map<QuadraticCurve>((curve) => {
    const headsLeft = curve[2][0] < 0.5;
    return curve.map(([px, py]) => [
      headsLeft ? px * xReach : 1 - (1 - px) * xReach,
      py,
    ]) as QuadraticCurve;
  });

  // Map grid cells near each stream curve when streams mode is enabled
  let streamCellMap: Map<string, { stream: number; progress: number; distance: number }> | null =
    null;
  if (opts.streams) {
    streamCellMap = new Map();
    const maxRibbonCells = Math.max(0.5, 5.5 * widthScale);

    curves.forEach((curve, streamIdx) => {
      for (let step = 0; step <= 120; step++) {
        const progress = step / 120;
        const [px, py] = evalQuadratic(curve, progress, width, height);
        const gx = px - gridOrigin.x;
        const gy = py - gridOrigin.y;
        const bandRadius = (maxRibbonCells + (0.5 - maxRibbonCells) * progress) * pitch;
        const reach = Math.ceil(bandRadius / pitch);
        const cxCell = Math.floor(gx / pitch);
        const cyCell = Math.floor(gy / pitch);

        for (let r = cyCell - reach; r <= cyCell + reach; r++) {
          for (let c = cxCell - reach; c <= cxCell + reach; c++) {
            if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
            const dist = Math.hypot(c * pitch + pitch / 2 - gx, r * pitch + pitch / 2 - gy);
            if (dist > bandRadius) continue;
            const key = cellKey(c, r);
            const prev = streamCellMap!.get(key);
            if (!prev || (prev.stream !== streamIdx && dist < prev.distance) || (prev.stream === streamIdx && dist < prev.distance)) {
              streamCellMap!.set(key, { stream: streamIdx, progress, distance: dist });
            }
          }
        }
      }
    });
  }

  const streamMeta: StreamSpec[] = curves.map((curve) => {
    let lengthPx = 0;
    let prev = evalQuadratic(curve, 0, width, height);
    for (let s = 1; s <= 120; s++) {
      const next = evalQuadratic(curve, s / 120, width, height);
      lengthPx += Math.hypot(next[0] - prev[0], next[1] - prev[1]);
      prev = next;
    }
    return { dots: [], lengthPx: Math.max(1, lengthPx) };
  });

  const litBias = opts.solidDots ? (opts.lively ? 0.09 : 0.07) : 0;
  const dots: DotSpec[] = [];
  const clearedCells = new Set<string>();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = cellKey(c, r);
      const cx = gridOrigin.x + c * pitch + pitch / 2;
      const cy = gridOrigin.y + r * pitch + pitch / 2;

      if (holes.some((h) => insideHole(cx, cy, pitch, h))) {
        clearedCells.add(key);
        continue;
      }

      if (streamCellMap) {
        const hit = streamCellMap.get(key);
        if (!hit || hash2D(c + 71, r + 37) < hit.progress * hit.progress * 0.7) continue;
        const n = hash2D(c + 101, r + 211);
        const kind: DotKind = n < 0.3 ? 'ring' : n > 0.88 ? 'lit' : 'dim';
        streamMeta[hit.stream].dots.push({ key, progress: hit.progress });
        dots.push({
          key,
          cx,
          cy,
          kind,
          opacity: Number((1 - 0.5 * hit.progress).toFixed(3)),
        });
        continue;
      }

      // Contour fallback if streams mode is turned off
      const sx = c / 11;
      const sy = r / 11;
      const nVal = (2 * valueNoise(sx, sy) + valueNoise(2 * sx + 17, 2 * sy + 31)) / 3;
      const bandTol = litBias === 0.09 ? 0.028 : 0.045;
      if (!CONTOUR_THRESHOLDS.some((t) => Math.abs(nVal - t) < bandTol)) continue;

      const kVal = hash2D(c + 101, r + 211);
      const kind: DotKind = kVal < 0.1 ? 'ring' : kVal > 1 - litBias ? 'lit' : 'dim';
      dots.push({ key, cx, cy, kind });
    }
  }

  return {
    pitch,
    gridOrigin,
    radius: 0.32 * pitch,
    dots,
    clearedCells,
    streams: streamCellMap ? streamMeta.filter((s) => s.dots.length > 0) : [],
  };
}

/**
 * Interactive SVG Bézier dot-stream field inspired by Context.dev.
 * Renders responsive dot ribbons curving inward from viewport edges while carving
 * automatic cutouts around `[data-hero-pattern-hole]` UI elements and animating
 * travelling stream pulses, ambient shimmer, and pointer hover sparkles.
 */
export const HeroDotField: React.FC<HeroDotFieldProps> = ({
  className = '',
  fine = true,
  lively = true,
  streams = true,
  fillFootOnPhones = true,
  solidDots = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const sparkleGroupRef = useRef<SVGGElement>(null);
  const [layout, setLayout] = useState<FieldLayout | null>(null);

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const container = svg?.parentElement;
    if (!container) return;

    const opts = { fine, lively, streams, fillFootOnPhones, solidDots };
    const measure = () => setLayout(buildFieldLayout(container, opts));
    measure();

    let rafId = 0;
    const scheduleMeasure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measure);
    };

    const ro = new ResizeObserver(scheduleMeasure);
    ro.observe(container);
    for (const el of container.querySelectorAll<HTMLElement>('[data-hero-pattern-hole]')) {
      ro.observe(el);
    }
    void document.fonts?.ready.then(scheduleMeasure);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [fine, lively, streams, fillFootOnPhones, solidDots]);

  useEffect(() => {
    const svg = svgRef.current;
    const container = svg?.parentElement;
    const sparkleLayer = sparkleGroupRef.current;
    if (!svg || !container || !sparkleLayer || !layout) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const circleByKey = new Map<string, SVGCircleElement>();
    for (const circle of svg.querySelectorAll<SVGCircleElement>('circle[data-dot]')) {
      circleByKey.set(circle.dataset.dot ?? '', circle);
    }

    const baseKindByKey = new Map<string, DotKind>(layout.dots.map((d) => [d.key, d.kind]));
    const activeLocks = new Set<string>();
    const activeSparkles = new Set<string>();
    const timers = new Set<number>();

    const setDot = (el: SVGCircleElement | undefined, kind: DotKind) => {
      applyDotStyle(el, solidDots || kind !== 'lit' ? kind : 'ring');
    };

    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };

    const flashDot = (key: string) => {
      const base = baseKindByKey.get(key);
      if (!base || activeLocks.has(key)) return;
      const el = circleByKey.get(key);
      activeLocks.add(key);
      el?.style.setProperty('transition-duration', '150ms');
      setDot(el, NEXT_KIND[base]);
      later(() => {
        activeLocks.delete(key);
        el?.style.removeProperty('transition-duration');
        setDot(el, baseKindByKey.get(key) ?? base);
      }, 1200);
    };

    let inView = true;
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    io.observe(container);

    // 1. Travelling pulse packets along each Bezier corner stream
    const streamRunners = layout.streams.map((stream) => ({
      stream,
      position: 0,
      restUntil: performance.now() + 5000 * Math.random(),
      litKeys: new Set<string>(),
    }));

    const pulseInterval = streamRunners.length
      ? window.setInterval(() => {
          if (document.hidden || !inView) return;
          const now = performance.now();
          for (const runner of streamRunners) {
            if (now < runner.restUntil) continue;
            runner.position += 16 / runner.stream.lengthPx;
            const waveWidth = (1.6 * layout.pitch) / runner.stream.lengthPx;
            const nextLit = new Set<string>();

            if (runner.position <= 1 + waveWidth) {
              for (const d of runner.stream.dots) {
                if (Math.abs(d.progress - runner.position) < waveWidth) {
                  nextLit.add(d.key);
                }
              }
            } else {
              runner.position = -waveWidth;
              runner.restUntil = now + 5000 + 7000 * Math.random();
            }

            for (const key of runner.litKeys) {
              if (nextLit.has(key) || activeLocks.has(key)) continue;
              const el = circleByKey.get(key);
              el?.style.removeProperty('transition-duration');
              applyDotStyle(el, baseKindByKey.get(key) ?? 'dim');
            }
            for (const key of nextLit) {
              if (runner.litKeys.has(key) || activeLocks.has(key)) continue;
              const el = circleByKey.get(key);
              el?.style.setProperty('transition-duration', '120ms');
              applyDotStyle(el, 'lit');
            }
            runner.litKeys = nextLit;
          }
        }, 50)
      : 0;

    // 2. Ambient shimmer across random stream dots
    const dotKeys = Array.from(baseKindByKey.keys());
    const ambientInterval = lively && dotKeys.length
      ? window.setInterval(() => {
          if (document.hidden || !inView) return;
          flashDot(dotKeys[Math.floor(Math.random() * dotKeys.length)]);
        }, 450)
      : 0;

    // 3. Interactive pointer trail & open-space sparkles
    const spawnSparkle = (col: number, row: number) => {
      const originKey = cellKey(col, row);
      if (activeSparkles.has(originKey) || sparkleLayer.childElementCount >= 160) return;
      activeSparkles.add(originKey);
      later(() => activeSparkles.delete(originKey), 1200);

      const candidates: Array<[number, number]> = [];
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nc = col + dx;
          const nr = row + dy;
          const k = cellKey(nc, nr);
          if (
            nc >= 0 &&
            nr >= 0 &&
            !baseKindByKey.has(k) &&
            !layout.clearedCells.has(k) &&
            !activeSparkles.has(k)
          ) {
            candidates.push([nc, nr]);
          }
        }
      }

      for (let i = 0; i < 4 && candidates.length > 0; i++) {
        const idx = Math.floor(Math.random() * candidates.length);
        const [sc, sr] = candidates.splice(idx, 1)[0];
        const sKey = cellKey(sc, sr);
        activeSparkles.add(sKey);

        const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        node.setAttribute('cx', String(layout.gridOrigin.x + sc * layout.pitch + layout.pitch / 2));
        node.setAttribute('cy', String(layout.gridOrigin.y + sr * layout.pitch + layout.pitch / 2));
        node.setAttribute('r', String(Math.max(1, layout.radius - 0.5)));
        node.style.opacity = '0';
        node.style.transitionDuration = '150ms';
        setDot(node, SPARKLE_KINDS[Math.floor(Math.random() * SPARKLE_KINDS.length)]);
        sparkleLayer.appendChild(node);

        requestAnimationFrame(() => {
          node.style.opacity = '1';
        });
        later(() => {
          node.style.removeProperty('transition-duration');
          node.style.opacity = '0';
        }, 1200);
        later(() => {
          node.remove();
          activeSparkles.delete(sKey);
        }, 2400);
      }
    };

    const touchCell = (col: number, row: number) => {
      const k = cellKey(col, row);
      if (layout.clearedCells.has(k)) return;
      if (baseKindByKey.has(k)) {
        flashDot(k);
      } else {
        spawnSparkle(col, row);
      }
    };

    let lastPos: { x: number; y: number } | null = null;
    let cachedRect: DOMRect | null = null;
    const resetRect = () => {
      cachedRect = null;
    };

    const onPointerMove = (evt: PointerEvent) => {
      if (evt.pointerType !== 'mouse') return;
      cachedRect ??= container.getBoundingClientRect();
      const next = {
        x: evt.clientX - cachedRect.left - layout.gridOrigin.x,
        y: evt.clientY - cachedRect.top - layout.gridOrigin.y,
      };
      const prev = lastPos ?? next;
      const steps = Math.max(1, Math.ceil(Math.hypot(next.x - prev.x, next.y - prev.y) / (layout.pitch / 2)));
      let prevKey = '';
      for (let s = 1; s <= steps; s++) {
        const col = Math.floor((prev.x + ((next.x - prev.x) * s) / steps) / layout.pitch);
        const row = Math.floor((prev.y + ((next.y - prev.y) * s) / steps) / layout.pitch);
        const k = cellKey(col, row);
        if (k !== prevKey) {
          prevKey = k;
          touchCell(col, row);
        }
      }
      lastPos = next;
    };

    const onPointerLeave = () => {
      lastPos = null;
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', resetRect, { passive: true });
    window.addEventListener('resize', resetRect, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);

    return () => {
      if (pulseInterval) window.clearInterval(pulseInterval);
      if (ambientInterval) window.clearInterval(ambientInterval);
      io.disconnect();
      for (const t of timers) window.clearTimeout(t);
      container.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', resetRect);
      window.removeEventListener('resize', resetRect);
      container.removeEventListener('pointerleave', onPointerLeave);
      sparkleLayer.replaceChildren();
    };
  }, [layout, lively, solidDots]);

  const r = layout ? Math.max(1, layout.radius - 0.5) : 0;

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      data-dot-field="true"
      className={`pointer-events-none absolute inset-0 size-full text-[#0066FF]/65 ${className}`}
      style={!streams && lively ? { maskImage: RADIAL_MASK, WebkitMaskImage: RADIAL_MASK } : undefined}
    >
      <g fill="currentColor" stroke="currentColor" strokeWidth="1" className={DOT_TRANSITION_CLASS}>
        {layout?.dots.map((d) => (
          <circle
            key={d.key}
            data-dot={d.key}
            cx={d.cx}
            cy={d.cy}
            r={r}
            opacity={d.opacity}
            style={kindToStyle(d.kind)}
          />
        ))}
      </g>
      <g ref={sparkleGroupRef} fill="currentColor" stroke="currentColor" strokeWidth="1" className={DOT_TRANSITION_CLASS} />
    </svg>
  );
};
