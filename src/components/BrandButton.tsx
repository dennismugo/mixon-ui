import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface BrandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  children?: React.ReactNode;
  variant?: 'black' | 'brand' | 'white';
  gap?: '0' | '1' | '1.5' | '2';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  text,
  children,
  variant = 'black',
  gap = '0',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...rest
}) => {
  // Color configuration: supports sleek black (transitions to Mixon Electric Blue) or Brand theme
  const getColors = () => {
    switch (variant) {
      case 'brand':
        return 'bg-[#0066FF] text-white group-hover:bg-black group-hover:text-white';
      case 'white':
        return 'bg-white text-gray-950 group-hover:bg-[#0066FF] group-hover:text-white border border-gray-200 group-hover:border-[#0066FF]';
      case 'black':
      default:
        return 'bg-black text-white group-hover:bg-[#0066FF] group-hover:text-white';
    }
  };

  const colorClasses = getColors();

  // Gap between the text capsule and the circle capsule (negative margin to ensure they firmly touch)
  const gapClass = gap === '0' ? 'gap-0 -space-x-1' : gap === '1' ? 'gap-1' : gap === '1.5' ? 'gap-1.5' : 'gap-2';

  // Sizing definitions
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const textPadding = isSm
    ? 'px-4 py-2.5 text-xs'
    : isLg
    ? 'px-7 py-4 text-sm sm:text-base'
    : 'px-6 py-3 text-xs sm:text-sm';

  const circleSize = isSm
    ? 'h-9 w-9'
    : isLg
    ? 'h-13 w-13'
    : 'h-11 w-11 sm:h-12 sm:w-12';

  const iconSize = isSm
    ? 'h-3.5 w-3.5'
    : isLg
    ? 'h-5 w-5 sm:h-6 sm:w-6'
    : 'h-4 w-4 sm:h-5 sm:w-5';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group not-disabled:inset-shadow-none inline-flex cursor-pointer items-center justify-start ${gapClass} rounded-full border-none bg-transparent p-0 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent active:scale-[0.98] transition-transform select-none ${className}`}
      {...rest}
    >
      {/* Left text pill */}
      <span
        className={`rounded-full ${textPadding} font-bold duration-500 ease-in-out transition-colors shadow-sm group-hover:shadow-md ${colorClasses}`}
      >
        {text || children}
      </span>

      {/* Right animated icon circle pill with dual sliding ArrowUpRight */}
      <div
        className={`relative flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full ${circleSize} duration-500 ease-in-out transition-colors shadow-sm group-hover:shadow-md ${colorClasses}`}
      >
        {/* Outgoing arrow (slides out to top-right on hover) */}
        <ArrowUpRight
          className={`absolute ${iconSize} transition-all duration-500 ease-in-out group-hover:translate-x-8 group-hover:-translate-y-8`}
        />
        {/* Incoming arrow (slides in from bottom-left on hover) */}
        <ArrowUpRight
          className={`absolute ${iconSize} -translate-x-8 translate-y-8 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0`}
        />
      </div>
    </button>
  );
};

export default BrandButton;
