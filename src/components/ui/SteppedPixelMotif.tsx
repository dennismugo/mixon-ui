import React from 'react';

export type MotifPalette = 'lime' | 'blue' | 'sky' | 'multi';

export interface SteppedPixelMotifProps {
  className?: string;
  palette?: MotifPalette;
  cellSize?: number;
  flipX?: boolean;
}

// 12 columns by 10 rows stepped pixel matrix representing the Jasper-style pixel cloud
// Values 0=empty, 1..5 map to palette indices
const MATRIX: number[][] = [
  [0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 1, 2, 2, 3, 2, 1, 0, 0],
  [0, 0, 1, 1, 2, 3, 3, 4, 3, 2, 1, 0],
  [0, 1, 1, 2, 3, 3, 4, 4, 3, 2, 1, 1],
  [1, 1, 2, 3, 4, 4, 5, 4, 3, 2, 2, 0],
  [1, 2, 2, 3, 4, 5, 5, 4, 3, 2, 0, 0],
  [0, 1, 2, 3, 3, 4, 4, 3, 2, 0, 0, 0],
  [0, 0, 1, 2, 2, 3, 3, 2, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
];

const PALETTES: Record<MotifPalette, string[]> = {
  // Chartreuse Lime theme with Mixon Blue accents
  lime: [
    '#eaf5b8', // 1: very light lime
    '#D9E88E', // 2: core Mixon lime
    '#cfdf7e', // 3: deep lime
    '#BFE0FF', // 4: pastel ice blue accent
    '#0066FF', // 5: electric Mixon blue pop
  ],
  // Pure Mixon Blue & Navy theme
  blue: [
    '#dceeff', // 1: light ice
    '#BFE0FF', // 2: pastel blue
    '#70b8ff', // 3: sky tint
    '#0066FF', // 4: Mixon blue
    '#093173', // 5: deep navy
  ],
  // Sky & Cyan theme
  sky: [
    '#e0f2fe', // 1
    '#bae6fd', // 2
    '#7dd3fc', // 3
    '#38bdf8', // 4
    '#0066FF', // 5
  ],
  // Multi-color Mixon brand harmony (matching SteppedMosaicStrip & values)
  multi: [
    '#d6e8f7', // 1
    '#BFE0FF', // 2
    '#38bdf8', // 3
    '#D9E88E', // 4
    '#0066FF', // 5
  ],
};

export const SteppedPixelMotif: React.FC<SteppedPixelMotifProps> = ({
  className = '',
  palette = 'lime',
  cellSize = 16,
  flipX = false,
}) => {
  const colors = PALETTES[palette] || PALETTES.lime;
  const numRows = MATRIX.length;
  const numCols = MATRIX[0].length;
  const width = numCols * cellSize;
  const height = numRows * cellSize;

  return (
    <div
      className={`pointer-events-none select-none transition-transform duration-700 ease-out ${className}`}
      style={{
        width,
        height,
        transform: flipX ? 'scaleX(-1)' : undefined,
      }}
      aria-hidden="true"
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
      >
        {MATRIX.map((row, rIdx) =>
          row.map((val, cIdx) => {
            if (val === 0) return null;
            const color = colors[val - 1] || colors[0];
            const x = cIdx * cellSize;
            const y = rIdx * cellSize;
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                fill={color}
                stroke="#ffffff"
                strokeWidth={1}
                shapeRendering="crispEdges"
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

export default SteppedPixelMotif;
