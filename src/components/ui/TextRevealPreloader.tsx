import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealPreloaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

/**
 * Fullscreen NeoLeaf-inspired Mixon Preloader.
 * Masks a DPR-scaled 2D canvas liquid wave inside the crisp `mixon` wordmark over Mixon's darkish blue surface,
 * animates from 0% to 100% loading progress, then zooms through the solidified logo into the page.
 */
export const TextRevealPreloader: React.FC<TextRevealPreloaderProps> = ({
  onComplete,
  forceShow = true,
}) => {
  const [isMounted, setIsMounted] = useState(() =>
    typeof window !== 'undefined' ? Boolean(forceShow) : false
  );

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoMaskRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressWrapRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const overlayEl = overlayRef.current;
    const logoEl = logoMaskRef.current;
    const canvasEl = canvasRef.current;
    const progressEl = progressWrapRef.current;
    const counterEl = counterRef.current;
    if (!overlayEl || !logoEl || !canvasEl || !progressEl || !counterEl) return;

    const rootEl = document.documentElement;
    const prevOverflowY = rootEl.style.overflowY;
    rootEl.style.overflowY = 'hidden';
    window.scrollTo(0, 0);

    const finish = () => {
      try {
        sessionStorage.setItem('mixon_preloaded', 'true');
      } catch {
        // ignore storage restrictions
      }
      if (prevOverflowY) {
        rootEl.style.overflowY = prevOverflowY;
      } else {
        rootEl.style.removeProperty('overflow-y');
      }
      setIsMounted(false);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      onCompleteRef.current?.();
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const safetyTimer = window.setTimeout(finish, 6000);

    const isDesktop = window.innerWidth >= 1024;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const waveAmp = isDesktop ? 42 : 22;
    const width = Math.max(1, canvasEl.offsetWidth);
    const height = Math.max(1, canvasEl.offsetHeight + 1.75 * waveAmp);
    let phase = 0;

    canvasEl.width = Math.round(width * dpr);
    canvasEl.height = Math.round(height * dpr);
    canvasEl.style.width = `${width}px`;
    canvasEl.style.height = `${height}px`;

    const ctx2d = canvasEl.getContext('2d');
    ctx2d?.scale(dpr, dpr);

    const drawWave = (emptyFraction: number) => {
      if (!ctx2d) return;
      ctx2d.clearRect(0, 0, width, height);
      ctx2d.beginPath();
      ctx2d.fillStyle = '#ffffff';
      ctx2d.moveTo(0, height);

      const samples = Math.ceil(width / 3) + 1;
      for (let i = 0; i <= samples; i++) {
        const x = Math.min(width, i * 3);
        const y =
          height * emptyFraction -
          Math.sin(0.02 * i + phase) *
            Math.sin(0.01 * i + phase) *
            Math.sin(0.05 * i + phase) *
            waveAmp;
        ctx2d.lineTo(x, y);
      }

      ctx2d.lineTo(width, height);
      ctx2d.lineTo(0, height);
      ctx2d.closePath();
      ctx2d.fill();
      phase += 0.03;
    };

    // Lock counter width to "100" so digits increment cleanly without jitter
    counterEl.innerText = '100';
    gsap.set(counterEl, { width: counterEl.offsetWidth });
    counterEl.innerText = reduceMotion ? '100' : '0';

    if (reduceMotion) {
      drawWave(0);
    } else {
      drawWave(1);
    }

    const tl = gsap.timeline({
      delay: reduceMotion ? 0.25 : 0.25,
      onComplete: finish,
    });

    if (reduceMotion) {
      tl.to(overlayEl, { opacity: 0, duration: 0.3, ease: 'none' });
    } else {
      const state = { value: 0 };
      const zoomScale = (window.innerWidth / Math.max(1, logoEl.offsetWidth)) * (isDesktop ? 2 : 1.5);

      tl.to(state, {
        value: 100,
        duration: 2.1,
        ease: 'none',
        onUpdate: () => {
          counterEl.innerText = String(Math.round(state.value));
          drawWave(1 - state.value / 100);
        },
      })
        .to(progressEl, { opacity: 0, duration: 0.22, ease: 'none' })
        .to(logoEl, { backgroundColor: '#ffffff', duration: 0.08, ease: 'none' })
        .to(
          logoEl,
          {
            duration: 0.85,
            ease: 'power2.in',
            opacity: 0,
            scale: zoomScale,
            transformOrigin: 'center center',
          },
          '<80%'
        )
        .to(overlayEl, { opacity: 0, duration: 0.45, ease: 'none' }, '<45%');
    }

    return () => {
      window.clearTimeout(safetyTimer);
      tl.kill();
      canvasEl.removeAttribute('style');
      if (prevOverflowY) {
        rootEl.style.overflowY = prevOverflowY;
      } else {
        rootEl.style.removeProperty('overflow-y');
      }
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading Mixon"
      className="fixed inset-0 z-[99999] flex select-none items-center justify-center overflow-hidden bg-[#04122B] text-white"
      style={{
        background:
          'radial-gradient(ellipse 75% 65% at 50% 45%, rgba(0, 102, 255, 0.16) 0%, rgba(4, 18, 43, 0) 72%), #04122B',
        touchAction: 'none',
        willChange: 'opacity',
      }}
    >
      <div className="relative w-full max-w-[82%] md:max-w-[70%] lg:max-w-[740px] xl:max-w-[920px]">
        {/* Mixon wordmark stencil mask */}
        <div
          ref={logoMaskRef}
          className="relative aspect-[1964/394] w-full bg-white/20"
          style={{
            maskImage: 'url(/mixon_logo_white.png)',
            WebkitMaskImage: 'url(/mixon_logo_white.png)',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            willChange: 'transform, opacity, background-color',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <canvas ref={canvasRef} className="size-full" />
          </div>
        </div>

        {/* Fixed-width loading percentage readout */}
        <div
          ref={progressWrapRef}
          className="absolute right-0 top-full mt-2.5 flex items-baseline font-mono text-xs sm:text-sm font-medium tracking-wide text-blue-100/90"
        >
          <span className="mr-1.5">loading...</span>
          <span ref={counterRef} className="inline-block text-right tabular-nums text-white">
            0
          </span>
          <span className="text-white">%</span>
        </div>
      </div>

      <span className="sr-only">Loading Mixon</span>
    </div>
  );
};

export default TextRevealPreloader;
