import React from 'react';

export interface DitherBandConfig {
  a: string;
  b: string;
  mix?: boolean;
}

export interface DitheredStripeBandProps {
  rowHeight?: number;
  className?: string;
  bands?: DitherBandConfig[];
}

/**
 * Mixon brand palette with button 3 lime green accent:
 * - White / Soft surface (#FFFFFF)
 * - Light ice blue (#D6E8F7)
 * - Vibrant sky blue (#38BDF8)
 * - Mixon electric blue (#0066FF)
 * - Deep Mixon navy (#0A1B38)
 * - Button 3 lime/citron green (#D9E88E)
 */
export const MIXON_STRIPE_BANDS: DitherBandConfig[] = [
  { a: '#ffffff', b: '#d6e8f7', mix: true },   // Row 1: dither white -> light ice blue
  { a: '#d6e8f7', b: '#d6e8f7', mix: false },  // Row 2: solid light ice blue
  { a: '#d6e8f7', b: '#38bdf8', mix: true },   // Row 3: dither light ice blue -> sky blue
  { a: '#38bdf8', b: '#38bdf8', mix: false },  // Row 4: solid sky blue
  { a: '#38bdf8', b: '#0066ff', mix: true },   // Row 5: dither sky blue -> electric mixon blue
  { a: '#0066ff', b: '#0066ff', mix: false },  // Row 6: solid electric mixon blue (#0066FF)
  { a: '#0066ff', b: '#0a1b38', mix: true },   // Row 7: dither electric blue -> dark navy
  { a: '#0a1b38', b: '#0a1b38', mix: false },  // Row 8: solid dark navy (#0A1B38)
  { a: '#0a1b38', b: '#d9e88e', mix: true },   // Row 9: dither dark navy -> button 3 lime green
  { a: '#d9e88e', b: '#d9e88e', mix: false },  // Row 10: solid button 3 lime green (#D9E88E)
  { a: '#d9e88e', b: '#ffffff', mix: true },   // Row 11: dither lime green -> white
];

export const DitheredStripeBand: React.FC<DitheredStripeBandProps> = ({
  rowHeight = 18,
  className = '',
  bands = MIXON_STRIPE_BANDS,
}) => {
  const boxSize = Math.max(4, Math.round(rowHeight / 2));

  return (
    <div
      aria-hidden="true"
      className={`w-full grid select-none pointer-events-none ${className}`}
      style={{
        width: '100%',
      }}
    >
      {bands.map((band, idx) => {
        const isMix = Boolean(band.mix);
        const style: React.CSSProperties = {
          height: `${rowHeight}px`,
          display: 'block',
          width: '100%',
          backgroundColor: isMix ? undefined : band.a,
          backgroundImage: isMix
            ? `repeating-conic-gradient(${band.b} 0 25%, ${band.a} 0 50%)`
            : undefined,
          backgroundSize: isMix ? `${boxSize}px ${boxSize}px` : undefined,
          backgroundRepeat: isMix ? 'repeat' : undefined,
        };

        return <i key={idx} style={style} />;
      })}
    </div>
  );
};

export default DitheredStripeBand;
