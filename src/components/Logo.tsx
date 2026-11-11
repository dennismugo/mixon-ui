/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  theme?: 'dark' | 'light';
  iconSize?: number;
}

export default function Logo({
  className = '',
  showText = true,
  theme = 'dark',
  iconSize = 32,
}: LogoProps) {
  // Brand Lime Green: #12ff00
  const limeColor = "#12ff00";
  // Text Color: White for dark sections, deep dark indigo for light sections
  const textColor = theme === 'dark' ? '#FFFFFF' : '#070613';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="mixon-brand-logo">
      {/* Node-and-Line Logomark */}
      <svg
        width={iconSize}
        height={iconSize * 0.8}
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Left Slanted Pillar */}
        <polygon
          points="0 80, 26 80, 52 0, 26 0"
          fill={limeColor}
        />
        {/* Curved Intelligence Bridge / Arch */}
        <path
          d="M 39 40 C 44 20, 58 0, 90 0 L 90 32 L 64 32 C 64 32, 64 22, 54 22 C 48 22, 43 30, 39 40 Z"
          fill={limeColor}
        />
        {/* Floating Product Block (The Node) */}
        <rect
          x="68"
          y="48"
          width="22"
          height="32"
          fill={limeColor}
          rx="1"
        />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <span 
          className="font-display font-bold tracking-tight select-none text-xl md:text-2xl"
          style={{ color: textColor }}
        >
          mixon
        </span>
      )}
    </div>
  );
}
