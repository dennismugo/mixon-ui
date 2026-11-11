import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface NavShowcaseCardProps {
  eyebrow?: string;
  title: string;
  action: string;
  href?: string;
  onClick: () => void;
  variants: any;
  children: React.ReactNode;
  className?: string;
}

/** Shared atmospheric showcase used by the three mega-menu feature cards. */
export function NavShowcaseCard({ eyebrow = 'MIXON DIGITAL', title, action, href, onClick, variants, children, className = '' }: NavShowcaseCardProps) {
  const sharedClass = `group/showcase relative isolate flex min-h-[286px] cursor-pointer flex-col items-center justify-between overflow-hidden rounded-[10px] border border-white/30 bg-[#0755b8] px-5 py-6 text-center shadow-[0_18px_44px_-24px_rgba(0,55,150,0.72)] outline-none transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-white/60 hover:shadow-[0_24px_56px_-24px_rgba(0,80,220,0.8)] focus-visible:ring-2 focus-visible:ring-blue-300 ${className}`;

  const innerContent = (
    <>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(145deg,#52bdff_0%,#0875f5_35%,#315fe8_68%,#073b91_100%)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/showcase:scale-[1.04]" />
      <div className="absolute inset-0 -z-10 opacity-90 transition-opacity duration-500 group-hover/showcase:opacity-100" style={{ background: 'radial-gradient(ellipse at 8% 100%, rgba(95,117,255,.78) 0%, transparent 52%), radial-gradient(ellipse at 82% 18%, rgba(118,211,255,.72) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,.95)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full border border-white/15 transition-transform duration-700 group-hover/showcase:scale-110" />
      <div className="absolute -bottom-28 -left-20 -z-10 h-72 w-72 rounded-full border border-white/15 transition-transform duration-700 group-hover/showcase:scale-110" />

      <div className="relative z-10 space-y-3 text-center">
        <span className="block text-[10px] font-semibold tracking-[0.2em] text-white/80">{eyebrow}</span>
        <h3 className="max-w-full font-serif text-[25px] font-normal leading-[1.12] tracking-[-0.035em] text-white drop-shadow-[0_2px_10px_rgba(0,22,70,.35)] sm:text-[28px]">
          {title}
        </h3>
      </div>

      <div className="relative z-10 flex min-h-[118px] flex-1 items-center justify-center py-3">
        <div className="pointer-events-none absolute h-36 w-36 rounded-full bg-sky-200/30 blur-3xl transition-all duration-500 group-hover/showcase:h-44 group-hover/showcase:w-44 group-hover/showcase:bg-sky-100/40" />
        {children}
      </div>

      <div className="relative z-10 inline-flex min-h-9 items-center gap-2 text-[14px] font-semibold tracking-[-0.01em] text-white sm:text-[15px]">
        <span>{action}</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/showcase:translate-x-1" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70" />
    </>
  );

  if (href) {
    return (
      <motion.a
        variants={variants}
        href={href}
        onClick={(event) => {
          if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
            event.preventDefault();
            onClick();
          }
        }}
        className={sharedClass}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      variants={variants}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
      className={sharedClass}
    >
      {innerContent}
    </motion.div>
  );
}
