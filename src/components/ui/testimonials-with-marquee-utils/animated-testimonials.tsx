"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  name: string;
  handle: string;
  description: string;
  image?: string;
}

export interface AnimatedTestimonialsProps {
  data: Testimonial[];
  className?: string;
  duration?: number;
}

const INITIALS_TONES = [
  "bg-[#EFF6FF] text-[#0052CC] border-[#BFDBFE]/80",
  "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]/80",
  "bg-[#EEF2FF] text-[#4338CA] border-[#C7D2FE]/80",
  "bg-[#F1F5F9] text-[#083071] border-[#CBD5E1]/80",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getToneClass(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return INITIALS_TONES[hash % INITIALS_TONES.length];
}

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  const initials = getInitials(item.name);
  const toneClass = getToneClass(item.name);

  return (
    <div
      className={cn(
        "group/card relative w-[320px] sm:w-[380px] md:w-[400px] shrink-0",
        "rounded-[8px] p-6 sm:p-7 bg-white",
        "border border-gray-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]",
        "hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.1)] hover:border-gray-300",
        "transition-all duration-300 flex flex-col justify-between"
      )}
    >
      {/* Top author row */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              aria-hidden="true"
              className={cn(
                "w-11 h-11 rounded-full border ring-2 ring-gray-100/80 shadow-2xs shrink-0",
                "flex items-center justify-center font-sans text-[13px] font-semibold tracking-wider select-none",
                toneClass
              )}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <h4 className="font-sans font-bold text-gray-950 text-[15px] tracking-tight truncate">
                {item.name}
              </h4>
              <p className="font-sans text-xs text-gray-500 font-medium truncate">
                {item.handle}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/card:text-[#0066FF] transition-colors shrink-0">
            <Quote className="w-4 h-4 fill-current opacity-75" />
          </div>
        </div>

        {/* Testimonial body */}
        <p className="font-sans text-[13.5px] sm:text-[14px] text-gray-700 font-normal leading-relaxed line-clamp-4">
          “{item.description}”
        </p>
      </div>

      {/* Micro rating stars at bottom */}
      <div className="flex items-center gap-1 pt-4 mt-4 border-t border-gray-100">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
        <span className="text-[11px] font-mono font-medium text-gray-400 ml-1.5">
          Verified
        </span>
      </div>
    </div>
  );
};

export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  data,
  className,
  duration = 45,
}) => {
  if (!data || data.length === 0) return null;

  // Split into two balanced rows
  const mid = Math.ceil(data.length / 2);
  const row1 = data.slice(0, mid);
  const row2 = data.length > 3 ? data.slice(mid) : data;

  // Duplicate cards per track to ensure wide screens are completely covered
  const track1 = row1.length < 6 ? [...row1, ...row1] : row1;
  const track2 = row2.length < 6 ? [...row2, ...row2] : row2;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-4 select-none group/testimonials",
        "[--gap:1.75rem] sm:[--gap:2.25rem]",
        className
      )}
      style={{
        ["--duration" as any]: `${duration}s`,
      }}
    >
      {/* Side gradient mask for ultra-smooth edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Row 1: Leftward scroll with uniform gap across all cards and tracks */}
      <div className="flex overflow-hidden group/marquee gap-[var(--gap)] mb-6 sm:mb-8">
        <div className="flex shrink-0 gap-[var(--gap)] animate-canopy-x group-hover/marquee:[animation-play-state:paused]">
          {track1.map((item, idx) => (
            <TestimonialCard key={`r1-a-${idx}`} item={item} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex shrink-0 gap-[var(--gap)] animate-canopy-x group-hover/marquee:[animation-play-state:paused]"
        >
          {track1.map((item, idx) => (
            <TestimonialCard key={`r1-b-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2: Rightward scroll with uniform gap across all cards and tracks */}
      <div className="flex overflow-hidden group/marquee-reverse gap-[var(--gap)]">
        <div className="flex shrink-0 gap-[var(--gap)] animate-canopy-x-reverse group-hover/marquee-reverse:[animation-play-state:paused]">
          {track2.map((item, idx) => (
            <TestimonialCard key={`r2-a-${idx}`} item={item} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex shrink-0 gap-[var(--gap)] animate-canopy-x-reverse group-hover/marquee-reverse:[animation-play-state:paused]"
        >
          {track2.map((item, idx) => (
            <TestimonialCard key={`r2-b-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
