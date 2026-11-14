import React, { useEffect, useRef } from 'react';

export interface SteppedMosaicStripProps {
  className?: string;
  cellSize?: number;
  rows?: number;
  colors?: string[];
  blockLength?: number;
  shiftPerRow?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

/**
 * SteppedMosaicStrip
 * 4-row stepped diagonal pixel-mosaic strip matching Jasper & Mixon signature theme.
 * Does NOT scroll on hover.
 * Instead, the mosaic dots/cells interactively respond to pointer motion and clicks:
 * - Dynamic illumination and scale of central dots as the cursor sweeps across
 * - Soft radiant glow on cells under the pointer with organic decay
 * - Click/tap ripple wave cascading through the dots
 */
export default function SteppedMosaicStrip({
  className = '',
  cellSize = 22,
  rows = 4,
  colors = ['#0a2e68', '#38bdf8', '#0066ff', '#d9e88e', '#d6e8f7'],
  blockLength = 11,
  shiftPerRow = 5,
}: SteppedMosaicStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rgbColors = colors.map(hexToRgb);
    const totalCells = colors.length * blockLength;
    const height = rows * cellSize;

    let width = container.clientWidth || 1200;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cols = Math.ceil(width / cellSize) + 2;

    // Intensity buffer for every (r, c) cell in the grid
    let intensities = new Float32Array(rows * cols);
    let ripples: Ripple[] = [];

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let animationFrameId: number | null = null;
    let isLoopRunning = false;

    const resize = () => {
      width = container.clientWidth || 1200;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cols = Math.ceil(width / cellSize) + 2;
      intensities = new Float32Array(rows * cols);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      draw();
    };

    const draw = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      let hasActiveEnergy = pointer.active || ripples.length > 0;
      const influenceRadius = cellSize * 2.8;

      // Update ripples
      if (ripples.length > 0) {
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.radius += 5.5;
          rip.strength *= 0.94;
          if (rip.radius > rip.maxRadius || rip.strength < 0.02) {
            ripples.splice(i, 1);
          }
        }
      }

      for (let r = 0; r < rows; r++) {
        const y = r * cellSize;
        const cy = y + cellSize / 2;

        for (let c = 0; c < cols; c++) {
          const x = c * cellSize;
          const cx = x + cellSize / 2;
          const idx = r * cols + c;

          // Color calculation matching Image 2 stepped pattern
          const eff = (c - r * shiftPerRow + totalCells * 20) % totalCells;
          const colorIdx = Math.floor(eff / blockLength) % colors.length;
          const baseRgb = rgbColors[colorIdx];

          // Target intensity based on pointer proximity
          let target = 0;
          if (pointer.active) {
            const dx = pointer.x - cx;
            const dy = pointer.y - cy;
            const dist = Math.hypot(dx, dy);
            if (dist < influenceRadius) {
              target = Math.pow(1 - dist / influenceRadius, 1.8);
            }
          }

          // Check ripple influence
          for (let ripIdx = 0; ripIdx < ripples.length; ripIdx++) {
            const rip = ripples[ripIdx];
            const dx = rip.x - cx;
            const dy = rip.y - cy;
            const dist = Math.hypot(dx, dy);
            const diff = Math.abs(dist - rip.radius);
            if (diff < cellSize * 1.5) {
              const ripFactor = (1 - diff / (cellSize * 1.5)) * rip.strength;
              if (ripFactor > target) target = ripFactor;
            }
          }

          // Smooth attack and release
          let current = intensities[idx];
          if (target > current) {
            current += (target - current) * 0.35;
          } else {
            current *= 0.91;
          }

          if (current < 0.004) {
            current = 0;
          } else {
            hasActiveEnergy = true;
          }
          intensities[idx] = current;

          // Compute cell fill color blended with luminous white/highlight
          const blendWhite = current * 0.45;
          const red = Math.round(baseRgb[0] + (255 - baseRgb[0]) * blendWhite);
          const green = Math.round(baseRgb[1] + (255 - baseRgb[1]) * blendWhite);
          const blue = Math.round(baseRgb[2] + (255 - baseRgb[2]) * blendWhite);

          // 1. Draw tile rectangle
          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          ctx.fillRect(x, y, cellSize, cellSize);

          // 2. Tile grid border
          const borderAlpha = 0.42 + current * 0.48;
          ctx.strokeStyle = `rgba(255, 255, 255, ${borderAlpha})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);

          // 3. Central Interactive Dot
          // Base dot at rest (1.4px) scaling up to 4.2px with radiant halo on interaction
          const dotRadius = 1.35 + current * 2.85;
          const dotAlpha = 0.38 + current * 0.62;

          // Glowing aura when illuminated
          if (current > 0.18) {
            ctx.fillStyle = `rgba(217, 232, 142, ${(current - 0.18) * 0.4})`;
            ctx.beginPath();
            ctx.arc(cx, cy, dotRadius * 1.9, 0, Math.PI * 2);
            ctx.fill();
          }

          // Core dot
          ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      if (hasActiveEnergy) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        isLoopRunning = false;
        animationFrameId = null;
      }
    };

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      startLoop();
    };

    const handlePointerEnter = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      startLoop();
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      startLoop();
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(width * 0.6, 400),
        strength: 1.0,
      });
      startLoop();
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    resize();

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerdown', handlePointerDown);
      resizeObserver.disconnect();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [cellSize, rows, colors, blockLength, shiftPerRow]);

  const height = rows * cellSize;

  return (
    <div
      ref={containerRef}
      className={`stepped-mosaic-interactive relative w-full overflow-hidden select-none cursor-crosshair ${className}`}
      style={{ height: `${height}px` }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
