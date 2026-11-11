"use client";
// beui.dev/components/motion/expanding-arrow-button

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import {
  forwardRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  EASE_OUT,
  SPRING_LAYOUT,
  SPRING_PRESS,
} from "@/components/ui/expanding-arrow-button-utils/ease";
import { useHoverCapable } from "@/components/ui/expanding-arrow-button-utils/use-hover-capable";
import { cn } from "@/lib/utils";

export interface ExpandingArrowButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  children: ReactNode;
  accentClassName?: string;
  labelClassName?: string;
  size?: "default" | "sm" | "pill" | "lg";
  variant?: "solid-blue" | "dark";
}

const ARROW_OPACITY = [1, 0.78, 0.54, 0.32, 0.16] as const;

function DottedChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="4" cy="4" r="2" fill="currentColor" />
      <circle cx="10" cy="9" r="2" fill="currentColor" />
      <circle cx="16" cy="14" r="2" fill="currentColor" />
      <circle cx="10" cy="19" r="2" fill="currentColor" />
      <circle cx="4" cy="24" r="2" fill="currentColor" />
    </svg>
  );
}

export const ExpandingArrowButton = forwardRef<
  HTMLButtonElement,
  ExpandingArrowButtonProps
>(function ExpandingArrowButton(
  {
    children,
    className,
    accentClassName,
    labelClassName,
    size = "pill",
    variant = "solid-blue",
    disabled,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const active = !disabled && ((canHover && hovered) || focused);
  const expanded = active;
  const layoutTransition = reduce ? { duration: 0 } : SPRING_LAYOUT;

  const isCompact = size === "sm" || size === "pill";
  const isSolidBlue = variant === "solid-blue";

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    setHovered(true);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    setHovered(false);
    onMouseLeave?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    setFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  const restingAccentSize = isCompact ? 32 : 52;

  return (
    <motion.button
      ref={ref}
      type="button"
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      whileTap={reduce || disabled ? undefined : { scale: 0.97 }}
      transition={SPRING_PRESS}
      className={cn(
        "relative inline-flex items-center overflow-hidden select-none transition-all duration-200 cursor-pointer",
        "outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isSolidBlue
          ? "bg-[#0066FF] text-white shadow-[0_4px_20px_rgba(0,102,255,0.30)] focus-visible:ring-[#0066FF]"
          : "bg-[#0066FF] text-white shadow-[0_4px_20px_rgba(0,102,255,0.30)] focus-visible:ring-[#0066FF]",
        isCompact
          ? "h-11 min-w-[145px] rounded-full p-1"
          : "h-16 min-w-72 rounded-[22px] p-1.5",
        className,
      )}
      {...rest}
    >
      <motion.span
        layout="size"
        aria-hidden="true"
        transition={layoutTransition}
        style={{
          width: expanded ? "calc(100% - 12px)" : restingAccentSize,
          borderRadius: 16,
        }}
        className={cn(
          "absolute inset-y-1.5 left-1.5 z-10 overflow-hidden bg-[#0066FF] text-white",
          accentClassName,
        )}
      >
        <motion.span
          animate={{ opacity: expanded ? 0 : 1 }}
          transition={{ duration: reduce ? 0 : 0.1, ease: EASE_OUT }}
          className="absolute inset-0 grid place-items-center"
        >
          <DottedChevron className={cn(isCompact ? "h-5 w-3.5" : "h-7 w-5", "text-white")} />
        </motion.span>

        <span className={cn("absolute inset-0 flex items-center justify-around", isCompact ? "px-2" : "px-3")}>
          {ARROW_OPACITY.map((opacity, index) => (
            <motion.span
              key={opacity}
              animate={{
                opacity: expanded ? 1 : 0,
                transform:
                  expanded && !reduce ? "translateX(0px)" : "translateX(-6px)",
              }}
              transition={{
                duration: reduce ? 0 : 0.18,
                delay: expanded && !reduce ? 0.04 + index * 0.025 : 0,
                ease: EASE_OUT,
              }}
              style={{ color: `rgb(255 255 255 / ${opacity})` }}
              className="inline-grid place-items-center"
            >
              <DottedChevron className={cn(isCompact ? "h-5 w-3.5" : "h-7 w-5")} />
            </motion.span>
          ))}
        </span>
      </motion.span>

      <motion.span
        animate={{
          opacity: expanded ? 0 : 1,
          transform: expanded && !reduce ? "translateX(6px)" : "translateX(0px)",
        }}
        transition={{ duration: reduce ? 0 : 0.12, ease: EASE_OUT }}
        className={cn(
          "relative z-0 whitespace-nowrap font-semibold tracking-tight text-white",
          isCompact ? "ml-[46px] mr-4 text-[13.5px]" : "ml-[76px] mr-5 text-lg tracking-[-0.02em]",
          labelClassName,
        )}
      >
        {children}
      </motion.span>
    </motion.button>
  );
});

export default ExpandingArrowButton;
