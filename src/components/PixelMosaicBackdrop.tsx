import React, { useId, useMemo } from 'react';

interface PixelMosaicBackdropProps {
  seedOffset?: number;
  className?: string;
}

const CELL = 7;
const COLS = 56;
const ROWS = 44;

// Mixon Blue monochrome pixel-mosaic ramp matching the diagonal woven tile pattern.
const MIXON_BLUE_RAMP = [
  '#f7fbff', // diagonal luminous white crest
  '#e3f0ff', // pale ice mist
  '#c2ddff', // soft sky tile
  '#8fc1ff', // medium sky azure
  '#4d9bff', // vivid Mixon light cobalt
  '#0066FF', // core Mixon brand blue
] as const;

function buildDiagonalPixels(seedOffset: number) {
  const cells: Array<{ x: number; y: number; fill: string }> = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const u = col / (COLS - 1);
      const v = row / (ROWS - 1);
      // Diagonal shimmer band running top-left toward bottom-right
      const dist = Math.abs(v - u * 0.85 - 0.08);
      const jitter =
        (((row * 31 + col * 47 + seedOffset * 19 + row * col * 11) % 100) / 100 - 0.5) * 0.25;
      const intensity = Math.max(0, Math.min(1, dist * 1.68 + jitter));

      let idx = 0;
      if (intensity > 0.82) idx = 5;
      else if (intensity > 0.65) idx = 4;
      else if (intensity > 0.48) idx = 3;
      else if (intensity > 0.31) idx = 2;
      else if (intensity > 0.15) idx = 1;
      else idx = 0;

      cells.push({
        x: col * CELL,
        y: row * CELL,
        fill: MIXON_BLUE_RAMP[idx],
      });
    }
  }
  return cells;
}

/**
 * Mixon blue diagonal square pixel-mosaic backdrop with crisp grid hairlines.
 * Used across workflow steppers and product dashboard preview cards.
 */
export default function PixelMosaicBackdrop({
  seedOffset = 0,
  className = '',
}: PixelMosaicBackdropProps) {
  const uid = useId().replace(/:/g, '');
  const cells = useMemo(() => buildDiagonalPixels(seedOffset), [seedOffset]);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pixel-mosaic-backdrop pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={`mosaicGrid-${uid}`} width={CELL} height={CELL} patternUnits="userSpaceOnUse">
          <path
            d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
            fill="none"
            stroke="rgba(0, 102, 255, 0.24)"
            strokeWidth="0.45"
          />
        </pattern>
      </defs>
      {cells.map((cell, idx) => (
        <rect
          key={idx}
          x={cell.x}
          y={cell.y}
          width={CELL}
          height={CELL}
          fill={cell.fill}
        />
      ))}
      <rect width="100%" height="100%" fill={`url(#mosaicGrid-${uid})`} />
    </svg>
  );
}
