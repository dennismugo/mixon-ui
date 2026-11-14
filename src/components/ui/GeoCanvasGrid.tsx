import React, { useEffect, useRef } from 'react';

interface GeoCanvasGridProps {
  imageSrc: string;
  alt?: string;
  className?: string;
}

/**
 * GeoCanvasGrid
 * Interactive grid lens effect matching Jasper GEO closing section (jasper.ai/geo).
 * Dynamically tracks cursor position, reveals zoomed micro-tiles with glowing borders
 * and illuminated vertex dots, easing smoothly into an idle state.
 */
export default function GeoCanvasGrid({
  imageSrc,
  alt = 'Interactive visual preview',
  className = '',
}: GeoCanvasGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (min: number, max: number, value: number) => Math.min(max, Math.max(min, value));

    const settings = {
      baseBoxSize: 62,
      minBoxSize: 31,
      referenceWidth: 1440,
      referenceHeight: 900,
      radius: 0.22,
      zoom: 0.34,
      pointerEase: 0.12,
      attack: 0.18,
      release: 0.020,
      exitRelease: 0.055,
      inputHoldMs: 340,
      cellBorder: true,
      cellBorderWidth: 1.25,
      cellBorderColor: '#fff8f2',
      cellBorderShadowColor: 'rgba(0, 6, 61, 0.45)',
      dots: true,
      dotSize: 0.041,
      dotRelease: 0.030,
      dotExitRelease: 0.083,
      dotColor: '#ffffff',
      positionX: 0.5,
      positionY: 0.5,
      dprMax: 1.5,
    };

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      active: false,
    };

    let logicalWidth = 1;
    let logicalHeight = 1;
    let cover = { scale: 1, sx: 0, sy: 0, sw: 1, sh: 1 };
    let boxes: Array<{ x: number; y: number; w: number; h: number; force: number; dotForce: number }> = [];
    let frame = 0;
    let lastInputAt = 0;
    let boxSize = settings.baseBoxSize;
    let isRunning = false;

    const getRootRect = () => {
      const rect = container.getBoundingClientRect();
      return {
        width: Math.max(1, Math.round(rect.width || 1)),
        height: Math.max(1, Math.round(rect.height || 1)),
      };
    };

    const updateCover = () => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const scale = Math.max(logicalWidth / img.naturalWidth, logicalHeight / img.naturalHeight);
      const sourceWidth = logicalWidth / scale;
      const sourceHeight = logicalHeight / scale;

      cover = {
        scale,
        sx: (img.naturalWidth - sourceWidth) * settings.positionX,
        sy: (img.naturalHeight - sourceHeight) * settings.positionY,
        sw: sourceWidth,
        sh: sourceHeight,
      };
    };

    const buildGrid = () => {
      boxes = [];
      for (let y = 0; y < logicalHeight; y += boxSize) {
        for (let x = 0; x < logicalWidth; x += boxSize) {
          boxes.push({
            x,
            y,
            w: Math.min(boxSize, logicalWidth - x),
            h: Math.min(boxSize, logicalHeight - y),
            force: 0,
            dotForce: 0,
          });
        }
      }
    };

    const updateBoxSize = () => {
      const referenceArea = Math.max(1, settings.referenceWidth * settings.referenceHeight);
      const currentArea = Math.max(1, logicalWidth * logicalHeight);
      const scale = Math.sqrt(currentArea / referenceArea);
      const responsiveSize = settings.baseBoxSize * clamp(0.5, 1, scale);
      boxSize = Math.round(clamp(settings.minBoxSize, settings.baseBoxSize, responsiveSize));
    };

    const sizeCanvas = () => {
      const rect = getRootRect();
      const dpr = clamp(1, settings.dprMax, window.devicePixelRatio || 1);

      logicalWidth = rect.width;
      logicalHeight = rect.height;
      canvas.width = Math.round(logicalWidth * dpr);
      canvas.height = Math.round(logicalHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      updateBoxSize();
      updateCover();
      buildGrid();
    };

    const drawBaseImage = () => {
      if (!img.complete || !img.naturalWidth) return;
      ctx.drawImage(
        img,
        cover.sx,
        cover.sy,
        cover.sw,
        cover.sh,
        0,
        0,
        logicalWidth,
        logicalHeight
      );
    };

    const setPointerTarget = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.active = true;
      lastInputAt = Date.now();
      pointer.targetX = clamp(0, logicalWidth, ((event.clientX - rect.left) / rect.width) * logicalWidth);
      pointer.targetY = clamp(0, logicalHeight, ((event.clientY - rect.top) / rect.height) * logicalHeight);
      startLoop();
    };

    const setIdleTarget = () => {
      pointer.active = false;
    };

    const drawTile = (box: (typeof boxes)[0]) => {
      if (box.force < 0.002) return;
      const force = clamp(0, 1, box.force);
      const insetX = (box.w * settings.zoom * force) / 2;
      const insetY = (box.h * settings.zoom * force) / 2;
      const sourceX = cover.sx + (box.x + insetX) / cover.scale;
      const sourceY = cover.sy + (box.y + insetY) / cover.scale;
      const sourceW = Math.max(1, (box.w - insetX * 2) / cover.scale);
      const sourceH = Math.max(1, (box.h - insetY * 2) / cover.scale);

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceW,
        sourceH,
        box.x,
        box.y,
        box.w,
        box.h
      );
    };

    const drawCellBorder = (box: (typeof boxes)[0]) => {
      if (!settings.cellBorder || box.force < 0.018) return;
      const force = clamp(0, 1, box.force);
      const alpha = Math.min(0.58, Math.pow(force, 1.25) * 0.56);
      const inset = settings.cellBorderWidth / 2;
      const x = box.x + inset;
      const y = box.y + inset;
      const width = Math.max(0, box.w - settings.cellBorderWidth);
      const height = Math.max(0, box.h - settings.cellBorderWidth);

      ctx.globalAlpha = alpha * 0.55;
      ctx.strokeStyle = settings.cellBorderShadowColor;
      ctx.lineWidth = settings.cellBorderWidth + 0.85;
      ctx.strokeRect(x, y, width, height);

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = settings.cellBorderColor;
      ctx.lineWidth = settings.cellBorderWidth;
      ctx.strokeRect(x, y, width, height);
    };

    const drawDot = (box: (typeof boxes)[0]) => {
      if (box.dotForce < 0.01) return;
      const dotRadius = Math.max(1.35, boxSize * settings.dotSize * box.dotForce);
      const dotAlpha = Math.min(1, 0.32 + box.dotForce * 0.68);

      ctx.globalAlpha = dotAlpha;
      ctx.fillStyle = settings.dotColor;
      ctx.beginPath();
      ctx.arc(box.x, box.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const updateBoxForces = (radius: number) => {
      const inputActive = pointer.active && Date.now() - lastInputAt < settings.inputHoldMs;
      let maxForce = 0;

      boxes.forEach((box) => {
        const centerX = box.x + box.w / 2;
        const centerY = box.y + box.h / 2;
        const distance = Math.hypot(centerX - pointer.x, centerY - pointer.y);
        const raw = Math.max(0, 1 - distance / radius);
        const targetForce = inputActive ? Math.pow(raw, 1.7) : 0;
        const ease = targetForce > box.force
          ? settings.attack
          : inputActive ? settings.release : settings.exitRelease;
        const dotEase = targetForce > box.dotForce
          ? settings.attack
          : inputActive ? settings.dotRelease : settings.dotExitRelease;

        box.force += (targetForce - box.force) * ease;
        box.dotForce += (targetForce - box.dotForce) * dotEase;

        if (box.force > maxForce) maxForce = box.force;
      });

      return maxForce;
    };

    const render = () => {
      pointer.x += (pointer.targetX - pointer.x) * settings.pointerEase;
      pointer.y += (pointer.targetY - pointer.y) * settings.pointerEase;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      drawBaseImage();

      const maxForce = updateBoxForces(Math.max(logicalWidth, logicalHeight) * settings.radius);
      boxes.forEach(drawTile);
      boxes.forEach(drawCellBorder);

      if (settings.dots) {
        boxes.forEach(drawDot);
        ctx.globalAlpha = 1;
      }

      if (!reduceMotion.matches && (pointer.active || maxForce > 0.001)) {
        frame = window.requestAnimationFrame(render);
      } else {
        isRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(render);
      }
    };

    const init = () => {
      sizeCanvas();
      setIdleTarget();
      pointer.x = pointer.targetX = logicalWidth / 2;
      pointer.y = pointer.targetY = logicalHeight / 2;
      render();
    };

    img.addEventListener('load', init, { once: true });
    img.decoding = 'async';
    img.src = imageSrc;
    if (img.complete && img.naturalWidth) {
      init();
    }

    container.addEventListener('pointermove', setPointerTarget, { passive: true });
    container.addEventListener('pointerleave', setIdleTarget);
    container.addEventListener('pointercancel', setIdleTarget);

    const resizeObserver = new ResizeObserver(() => {
      if (!img.complete || !img.naturalWidth) return;
      sizeCanvas();
      render();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', setPointerTarget);
      container.removeEventListener('pointerleave', setIdleTarget);
      container.removeEventListener('pointercancel', setIdleTarget);
    };
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none cursor-crosshair ${className}`}
      style={{ touchAction: 'pan-y' }}
      aria-label={alt}
    >
      <canvas ref={canvasRef} className="block w-full h-full object-cover" aria-hidden="true" />
      <noscript>
        <img src={imageSrc} alt={alt} className="block w-full h-full object-cover" />
      </noscript>
    </div>
  );
}
