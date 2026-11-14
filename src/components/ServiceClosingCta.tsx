import React, { useState, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import RollingButtonText from './RollingButtonText';

interface ServiceClosingCtaProps {
  title?: React.ReactNode;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

interface TileDef {
  id: string;
  col: number;
  row: number;
  defaultColor: string;
  defaultOpacity: number;
}

// 4-corner stepped modular mosaic pattern inspired by Jasper AI & Mixon Theme
// Color combination: Pure white, translucent ice-blue, midnight dark blue, Mixon blue. NO GREEN.
const TOP_LEFT_TILES: TileDef[] = [
  { id: 'tl-0-0', col: 0, row: 0, defaultColor: '#ffffff', defaultOpacity: 0.95 },
  { id: 'tl-1-0', col: 1, row: 0, defaultColor: '#04122b', defaultOpacity: 0.9 },
  { id: 'tl-2-0', col: 2, row: 0, defaultColor: '#bfe0ff', defaultOpacity: 0.8 },
  { id: 'tl-3-0', col: 3, row: 0, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'tl-0-1', col: 0, row: 1, defaultColor: '#071f45', defaultOpacity: 0.9 },
  { id: 'tl-1-1', col: 1, row: 1, defaultColor: '#ffffff', defaultOpacity: 0.85 },
  { id: 'tl-2-1', col: 2, row: 1, defaultColor: '#04122b', defaultOpacity: 0.85 },
  { id: 'tl-0-2', col: 0, row: 2, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'tl-1-2', col: 1, row: 2, defaultColor: '#bfe0ff', defaultOpacity: 0.75 },
  { id: 'tl-0-3', col: 0, row: 3, defaultColor: '#ffffff', defaultOpacity: 0.9 },
];

const TOP_RIGHT_TILES: TileDef[] = [
  { id: 'tr-3-0', col: 3, row: 0, defaultColor: '#ffffff', defaultOpacity: 0.95 },
  { id: 'tr-2-0', col: 2, row: 0, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'tr-1-0', col: 1, row: 0, defaultColor: '#04122b', defaultOpacity: 0.9 },
  { id: 'tr-0-0', col: 0, row: 0, defaultColor: '#bfe0ff', defaultOpacity: 0.8 },
  { id: 'tr-3-1', col: 3, row: 1, defaultColor: '#071f45', defaultOpacity: 0.9 },
  { id: 'tr-2-1', col: 2, row: 1, defaultColor: '#ffffff', defaultOpacity: 0.85 },
  { id: 'tr-1-1', col: 1, row: 1, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'tr-3-2', col: 3, row: 2, defaultColor: '#bfe0ff', defaultOpacity: 0.75 },
  { id: 'tr-2-2', col: 2, row: 2, defaultColor: '#04122b', defaultOpacity: 0.85 },
  { id: 'tr-3-3', col: 3, row: 3, defaultColor: '#ffffff', defaultOpacity: 0.9 },
];

const BOTTOM_LEFT_TILES: TileDef[] = [
  { id: 'bl-0-0', col: 0, row: 0, defaultColor: '#ffffff', defaultOpacity: 0.9 },
  { id: 'bl-0-1', col: 0, row: 1, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'bl-1-1', col: 1, row: 1, defaultColor: '#04122b', defaultOpacity: 0.9 },
  { id: 'bl-0-2', col: 0, row: 2, defaultColor: '#071f45', defaultOpacity: 0.9 },
  { id: 'bl-1-2', col: 1, row: 2, defaultColor: '#ffffff', defaultOpacity: 0.85 },
  { id: 'bl-2-2', col: 2, row: 2, defaultColor: '#bfe0ff', defaultOpacity: 0.75 },
  { id: 'bl-0-3', col: 0, row: 3, defaultColor: '#bfe0ff', defaultOpacity: 0.8 },
  { id: 'bl-1-3', col: 1, row: 3, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'bl-2-3', col: 2, row: 3, defaultColor: '#04122b', defaultOpacity: 0.9 },
  { id: 'bl-3-3', col: 3, row: 3, defaultColor: '#ffffff', defaultOpacity: 0.95 },
];

const BOTTOM_RIGHT_TILES: TileDef[] = [
  { id: 'br-3-0', col: 3, row: 0, defaultColor: '#ffffff', defaultOpacity: 0.9 },
  { id: 'br-3-1', col: 3, row: 1, defaultColor: '#04122b', defaultOpacity: 0.9 },
  { id: 'br-2-1', col: 2, row: 1, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'br-3-2', col: 3, row: 2, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'br-2-2', col: 2, row: 2, defaultColor: '#ffffff', defaultOpacity: 0.85 },
  { id: 'br-1-2', col: 1, row: 2, defaultColor: '#bfe0ff', defaultOpacity: 0.75 },
  { id: 'br-3-3', col: 3, row: 3, defaultColor: '#ffffff', defaultOpacity: 0.95 },
  { id: 'br-2-3', col: 2, row: 3, defaultColor: '#04122b', defaultOpacity: 0.9 },
  { id: 'br-1-3', col: 1, row: 3, defaultColor: '#0066FF', defaultOpacity: 0.85 },
  { id: 'br-0-3', col: 0, row: 3, defaultColor: '#bfe0ff', defaultOpacity: 0.8 },
];

interface ModularTileCornerProps {
  tiles: TileDef[];
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const ModularTileCorner: React.FC<ModularTileCornerProps> = ({ tiles, position }) => {
  const [activeTile, setActiveTile] = useState<string | null>(null);

  const posClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0',
  }[position];

  return (
    <div
      className={`hidden sm:grid absolute ${posClasses} pointer-events-auto z-10 grid-cols-4 grid-rows-4 w-[116px] h-[116px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px]`}
      style={{ shapeRendering: 'crispEdges' }}
    >
      {tiles.map((tile) => {
        const isHovered = activeTile === tile.id;
        return (
          <div
            key={tile.id}
            onMouseEnter={() => setActiveTile(tile.id)}
            onMouseLeave={() => setActiveTile(null)}
            className="w-full h-full cursor-pointer transition-all duration-300 ease-out relative group"
            style={{
              gridColumnStart: tile.col + 1,
              gridRowStart: tile.row + 1,
              backgroundColor: isHovered ? '#ffffff' : tile.defaultColor,
              opacity: isHovered ? 1 : tile.defaultOpacity,
              transform: isHovered ? 'scale(1.15)' : 'scale(1)',
              zIndex: isHovered ? 30 : 10,
              boxShadow: isHovered
                ? '0 0 18px rgba(255,255,255,0.9), 0 0 32px rgba(0,102,255,0.7)'
                : 'none',
            }}
          >
            {/* Subtle inner grid outline for architectural precision */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-white/50 transition-colors pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
};

export const ServiceClosingCta: React.FC<ServiceClosingCtaProps> = ({
  title,
  subtitle,
  primaryButtonText = 'Discuss an integration',
  secondaryButtonText = 'View all services',
  onPrimaryClick,
  onSecondaryClick,
  className = '',
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle interactive background aura following cursor
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-scroll-no-reveal=""
      className={`service-closing-cta relative isolate m-0 w-full overflow-hidden border-y border-white/10 select-none ${className}`}
      style={{
        // Deep royal blue & dark navy atmospheric gradient matching Image 2
        background: 'linear-gradient(135deg, #051838 0%, #08295f 38%, #0a387a 72%, #084898 100%)',
      }}
    >
      {/* Delicate Architectural Cartesian Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Dynamic Cursor Light Aura (Smooth Luminescence following pointer) */}
      {mousePos && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '420px',
            height: '420px',
            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)',
          }}
        />
      )}

      {/* Top Ambient Light Depth Gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 102, 255, 0.35) 0%, transparent 68%)',
        }}
      />

      {/* Stepped Modular Mosaic Corner Tiles (Jasper AI & Mixon Theme: White + Dark Blue + Mixon Blue, Smaller Boxes, Interactive) */}
      <ModularTileCorner tiles={TOP_LEFT_TILES} position="top-left" />
      <ModularTileCorner tiles={TOP_RIGHT_TILES} position="top-right" />
      <ModularTileCorner tiles={BOTTOM_LEFT_TILES} position="bottom-left" />
      <ModularTileCorner tiles={BOTTOM_RIGHT_TILES} position="bottom-right" />

      {/* Centered CTA Content */}
      <div className="relative z-20 mx-auto flex min-h-[460px] w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[500px] sm:px-12 sm:py-24 lg:min-h-[540px] lg:py-28">
        {/* Centered Editorial Serif Headline in Pure White */}
        <h2 className="font-ptserif !text-[clamp(2.1rem,4.2vw,3.6rem)] font-normal !leading-[1.14] tracking-[-0.025em] text-white max-w-3xl mx-auto text-balance drop-shadow-[0_2px_12px_rgba(4,18,43,0.4)]">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-5 mx-auto max-w-[66ch] text-base sm:text-lg font-light leading-relaxed text-white/85">
            {subtitle}
          </p>
        )}

        {/* Action Buttons in Mixon Blue & Dark Blue Theme (No Green) */}
        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4">
          {/* Primary Action Button in Mixon Blue matching Image 2 */}
          <button
            type="button"
            onClick={onPrimaryClick}
            className="group inline-flex min-h-14 w-full items-center justify-center bg-[#0066FF] hover:bg-[#0052cc] border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 shadow-[0_4px_16px_rgba(0,102,255,0.4)] hover:shadow-[0_6px_24px_rgba(0,102,255,0.6)] hover:-translate-y-0.5 rounded-none sm:w-auto sm:text-[14.5px] cursor-pointer"
          >
            <RollingButtonText
              text={primaryButtonText}
              icon={<ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />}
            />
          </button>

          {/* Secondary Action Button in Translucent Dark Navy */}
          {secondaryButtonText && (
            <button
              type="button"
              onClick={onSecondaryClick}
              className="group inline-flex min-h-14 w-full items-center justify-center bg-[#04122b]/90 hover:bg-[#04122b] border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 rounded-none sm:w-auto sm:text-[14.5px] cursor-pointer"
            >
              <RollingButtonText text={secondaryButtonText} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceClosingCta;