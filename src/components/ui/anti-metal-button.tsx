"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DoubleChevronProps {
  index: number;
  dotColor?: string;
}

const DoubleChevron: React.FC<DoubleChevronProps> = ({ index, dotColor = "#0f0f0f" }) => {
  const base = index * 0.12;
  const dots = [
    { cx: 2, cy: 2, d: 0 },
    { cx: 5, cy: 5, d: 0.05 },
    { cx: 8, cy: 8, d: 0.1 },
    { cx: 5, cy: 11, d: 0.15 },
    { cx: 2, cy: 14, d: 0.2 },
    { cx: 6, cy: 2, d: 0.05 },
    { cx: 9, cy: 5, d: 0.1 },
    { cx: 12, cy: 8, d: 0.15 },
    { cx: 9, cy: 11, d: 0.2 },
    { cx: 6, cy: 14, d: 0.25 },
  ];

  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 overflow-visible"
    >
      <g fill={dotColor}>
        {dots.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="1"
            className="bd-dot"
            style={{ animationDelay: `${base + p.d}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

export interface AntiMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  accentFrom?: string;
  accentTo?: string;
  dotColor?: string;
}

export const AntiMetalButton = React.forwardRef<HTMLButtonElement, AntiMetalButtonProps>(
  (
    {
      className,
      children,
      label,
      accentFrom = "#0066FF",
      accentTo = "#0052cc",
      dotColor = "#ffffff",
      ...props
    },
    ref
  ) => {
    const content = label ?? children ?? "Book a demo";

    return (
      <button
        ref={ref}
        className={cn(
          "group/btn relative inline-flex h-11 min-w-[148px] items-center justify-end overflow-hidden rounded-full px-5 pl-12 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2 cursor-pointer select-none",
          "bg-[linear-gradient(180deg,#141416_0%,#090A0F_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_4px_16px_rgba(0,0,0,0.28)] border border-white/10",
          className
        )}
        {...props}
      >
        <style>{`
          @keyframes bd-dot-wave {
            0%, 70%, 100% { opacity: 0.25; transform: scale(0.85); }
            35% { opacity: 1; transform: scale(1); }
          }
          .bd-dot {
            transform-box: fill-box;
            transform-origin: center;
            animation: bd-dot-wave 1.4s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .bd-dot { animation: none; opacity: 1; }
          }
        `}</style>

        <span className="relative z-0 text-[14px] font-sans font-medium tracking-tight text-white whitespace-nowrap pr-1 transition-opacity duration-150 group-hover/btn:opacity-90">
          {content}
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-1 left-1 top-1 z-10 flex w-9 items-center justify-start gap-2.5 overflow-hidden rounded-full pl-2.5 pr-2 transition-[width,gap] duration-250 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/btn:w-[calc(100%-0.5rem)]"
          style={{
            background: `linear-gradient(180deg, ${accentFrom} 0%, ${accentTo} 100%)`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.15), 0 2px 6px rgba(0,102,255,0.3)",
          }}
        >
          <DoubleChevron index={0} dotColor={dotColor} />
          <DoubleChevron index={1} dotColor={dotColor} />
          <DoubleChevron index={2} dotColor={dotColor} />
          <DoubleChevron index={3} dotColor={dotColor} />
          <DoubleChevron index={4} dotColor={dotColor} />
        </span>
      </button>
    );
  }
);

AntiMetalButton.displayName = "AntiMetalButton";

export default AntiMetalButton;
