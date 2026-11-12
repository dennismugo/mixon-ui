import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface NavShowcaseCardProps {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  href?: string;
  onClick: () => void;
  variants: any;
  className?: string;
}

const CELL = 16;
const COLS = 24;
const ROWS = 24;

// Deterministic pixel-mosaic palette blending ice blue to Mixon cobalt along the perimeter.
const MOSAIC_PALETTE = [
  'transparent',
  '#f2f7ff',
  '#dceaff',
  '#b8d4ff',
  '#7cb2ff',
  '#2c7df7',
  '#0066FF',
  '#0755b8',
];

function buildPerimeterPixels() {
  const cells: Array<{ x: number; y: number; fill: string }> = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const edgeDistX = Math.min(col, COLS - 1 - col);
      const edgeDistY = Math.min(row, ROWS - 1 - row);
      const isLeftBand = col <= 2;
      const isRightBand = col >= COLS - 3;
      const isBottomBand = row >= ROWS - 3;
      const isTopAccent = row <= 1;

      if (!isLeftBand && !isRightBand && !isBottomBand && !isTopAccent) continue;

      const hash = ((row * 37 + col * 19 + row * col * 7) % 100) / 100;
      const verticalWeight = row / (ROWS - 1);
      let level = 0;

      if (isRightBand) {
        const rightEdgeFocus = col === COLS - 1 ? 0.5 : col === COLS - 2 ? 0.35 : 0.16;
        const midFocus = 1 - Math.abs(verticalWeight - 0.56) * 1.45;
        const score = Math.max(0, midFocus) + rightEdgeFocus + hash * 0.28;
        if (score > 1.25) level = 7;
        else if (score > 1.05) level = 6;
        else if (score > 0.85) level = 5;
        else if (score > 0.65) level = 4;
        else if (score > 0.48) level = 3;
        else if (score > 0.3) level = 2;
        else level = 1;
      } else if (isLeftBand) {
        const leftEdgeFocus = col === 0 ? 0.48 : col === 1 ? 0.3 : 0.14;
        const lowerFocus = Math.max(0, 1 - Math.abs(verticalWeight - 0.72) * 1.65);
        const score = lowerFocus + leftEdgeFocus + hash * 0.25;
        if (score > 1.24) level = 7;
        else if (score > 1.04) level = 6;
        else if (score > 0.86) level = 5;
        else if (score > 0.66) level = 4;
        else if (score > 0.45) level = 3;
        else if (score > 0.26) level = 2;
        else if (verticalWeight > 0.22) level = 1;
      } else if (isBottomBand) {
        const bottomBias = (row - (ROWS - 3)) * 0.22;
        const score = bottomBias + (1 - edgeDistX * 0.08) + hash * 0.3;
        if (score > 1.25) level = 5;
        else if (score > 0.98) level = 4;
        else if (score > 0.72) level = 3;
        else if (score > 0.45) level = 2;
        else level = 1;
      } else if (isTopAccent && hash > 0.55) {
        level = hash > 0.84 ? 2 : 1;
      }

      if (level > 0) {
        cells.push({
          x: col * CELL,
          y: row * CELL,
          fill: MOSAIC_PALETTE[level],
        });
      }
    }
  }
  return cells;
}

const PERIMETER_CELLS = buildPerimeterPixels();

/** Editorial pixel-mosaic showcase card used in navigation mega-menus. */
export function NavShowcaseCard({
  eyebrow,
  title,
  description,
  action,
  href,
  onClick,
  variants,
  className = '',
}: NavShowcaseCardProps) {
  const sharedClass = `nav-showcase-card group/showcase relative isolate flex h-full min-h-[292px] cursor-pointer flex-col overflow-hidden rounded-none border border-[#dbe6f7] bg-[#f8fbff] p-[18px] text-left outline-none transition-[border-color,transform,box-shadow] duration-300 hover:border-[#b9d2fa] hover:shadow-[0_14px_34px_-16px_rgba(0,102,255,0.22)] focus-visible:ring-2 focus-visible:ring-[#0066FF] ${className}`;

  const innerContent = (
    <>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      >
        <defs>
          <pattern id="navMosaicGrid" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
            <path
              d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
              fill="none"
              stroke="rgba(7, 85, 184, 0.065)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#f9fbff" />
        {PERIMETER_CELLS.map((cell, idx) => (
          <rect
            key={idx}
            x={cell.x}
            y={cell.y}
            width={CELL}
            height={CELL}
            fill={cell.fill}
          />
        ))}
        <rect width="100%" height="100%" fill="url(#navMosaicGrid)" />
      </svg>

      <div className="relative z-10 flex flex-1 flex-col justify-between rounded-none bg-white px-5 py-5 sm:px-6 sm:py-6">
        <div className="space-y-3">
          <span className="inline-block w-fit rounded-none bg-[#0066FF] px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em] text-white">
            {eyebrow}
          </span>
          <h3 className="nav-showcase-title font-ptserif text-[#04122b]">
            {title}
          </h3>
          <p className="text-[13px] leading-[1.52] text-[#04122b]/85 sm:text-[13.5px]">
            {description}
          </p>
        </div>

        <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-none bg-[#edf4ff] px-3.5 py-2 text-[13px] font-semibold text-[#0755b8] transition-colors duration-200 group-hover/showcase:bg-[#dceaff] group-hover/showcase:text-[#04122b]">
          <span>{action}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/showcase:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <motion.a
        variants={variants}
        href={href}
        onClick={(event) => {
          if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
            event.preventDefault();
            onClick();
          }
        }}
        className={sharedClass}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      variants={variants}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      className={sharedClass}
    >
      {innerContent}
    </motion.div>
  );
}
