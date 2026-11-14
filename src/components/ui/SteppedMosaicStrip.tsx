import React, { useId, useState } from 'react';

interface SteppedMosaicStripProps {
  className?: string;
  cellSize?: number;
  rows?: number;
  colors?: string[];
  blockLength?: number;
  shiftPerRow?: number;
  autoPlayOnHover?: boolean;
}

/**
 * SteppedMosaicStrip
 * 4-row stepped diagonal pixel-mosaic strip matching Jasper's signature grid transition,
 * using the vibrant Mixon theme palette (navy, sky, mixon blue, chartreuse lime).
 * Animates with a smooth horizontal conveyor shift and radiant glow on hover.
 */
export default function SteppedMosaicStrip({
  className = '',
  cellSize = 22,
  rows = 4,
  colors = ['#0a2e68', '#38bdf8', '#0066ff', '#d9e88e', '#d6e8f7'],
  blockLength = 11,
  shiftPerRow = 5,
  autoPlayOnHover = true,
}: SteppedMosaicStripProps) {
  const rawId = useId();
  const safeId = `mosaic_${rawId.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
  const totalCells = colors.length * blockLength;
  const patternWidth = totalCells * cellSize;
  const patternHeight = rows * cellSize;

  // We render 3 full cycles of rects so translation shifts seamlessly across screens up to 4k
  const cycles = 3;
  const totalCols = totalCells * cycles;

  const rects: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const y = r * cellSize;
    for (let c = 0; c < totalCols; c++) {
      const x = c * cellSize;
      const eff = (c - r * shiftPerRow + totalCells * 20) % totalCells;
      const colorIdx = Math.floor(eff / blockLength) % colors.length;
      const color = colors[colorIdx];
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={x}
          y={y}
          width={cellSize}
          height={cellSize}
          fill={color}
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1"
        />
      );
    }
  }

  return (
    <div
      className={`stepped-mosaic-container relative w-full overflow-hidden select-none cursor-pointer transition-all duration-300 hover:brightness-110 ${className}`}
      style={{ height: `${patternHeight}px` }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes ${safeId}_slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${patternWidth}px);
          }
        }
        .stepped-mosaic-container:hover .${safeId}_track {
          animation: ${safeId}_slide 7s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .stepped-mosaic-container:hover .${safeId}_track {
            animation: none;
          }
        }
      `}</style>
      <svg
        width="100%"
        height={patternHeight}
        className="block w-full overflow-visible"
        style={{ height: `${patternHeight}px` }}
      >
        <g className={`${safeId}_track will-change-transform`}>
          {rects}
        </g>
      </svg>
    </div>
  );
}
