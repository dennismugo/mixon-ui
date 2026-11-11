import React from 'react';

interface RollingButtonTextProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function RollingButtonText({ text, icon, className = '' }: RollingButtonTextProps) {
  return (
    <span className={`inline-flex items-center gap-2 pointer-events-none select-none ${className}`}>
      <span className="relative inline-flex flex-col h-[1.35em] overflow-hidden leading-tight">
        <span className="transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {text}
        </span>
        <span className="absolute top-full left-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {text}
        </span>
      </span>
      {icon && (
        <span className="relative inline-flex flex-col h-[1.35em] overflow-hidden leading-tight">
          <span className="transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
            {icon}
          </span>
          <span className="absolute top-full left-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
            {icon}
          </span>
        </span>
      )}
    </span>
  );
}
