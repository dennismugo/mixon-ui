import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { ScrollRevealHeading } from '../ui/ScrollRevealText';
import RollingButtonText from '../RollingButtonText';

interface FleetoraPartnerBannerProps {
  setCurrentPage?: (page: string) => void;
}

/**
 * Geometric Mosaic Divider Strip inspired by Fleetora divider1.svg
 * Features Mixon signature blues (#0066FF, #083071, #38BDF8), deep navy (#040F24),
 * crisp white (#FFFFFF), and vibrant touches of orange (#FF6B00, #F97316).
 */
const MosaicDividerStrip: React.FC<{ flip?: boolean }> = ({ flip }) => {
  const uniqueId = flip ? 'strip-bottom' : 'strip-top';

  return (
    <div 
      className={`w-full h-7 sm:h-9 lg:h-11 overflow-hidden select-none leading-none block ${
        flip ? 'scale-y-[-1]' : ''
      }`}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 1440 48" 
        className="w-full h-full object-cover block"
        preserveAspectRatio="none"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blue linear gradient */}
          <linearGradient id={`${uniqueId}-blueGrad1`} x1="160" y1="12" x2="320" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#082046" />
            <stop offset="1" stopColor="#0066FF" stopOpacity="0.85" />
          </linearGradient>

          {/* Touch of Orange Gradient 1 */}
          <linearGradient id={`${uniqueId}-orangeGrad1`} x1="320" y1="12" x2="480" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5500" />
            <stop offset="1" stopColor="#FF7A00" />
          </linearGradient>

          {/* Cyan linear gradient */}
          <linearGradient id={`${uniqueId}-cyanGrad1`} x1="640" y1="12" x2="800" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0066FF" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>

          {/* Touch of Orange Gradient 2 */}
          <linearGradient id={`${uniqueId}-orangeGrad2`} x1="960" y1="36" x2="1120" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B00" />
            <stop offset="1" stopColor="#F97316" />
          </linearGradient>

          {/* Navy / Dark linear gradient */}
          <linearGradient id={`${uniqueId}-navyGrad1`} x1="1120" y1="12" x2="1280" y2="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#040F24" />
            <stop offset="1" stopColor="#082046" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* ROW 1 (TOP TIER: y = 0 to 24)                                  */}
        {/* ============================================================== */}
        {/* Col 1 (0..160): Deep Obsidian Navy */}
        <rect x="0" y="0" width="160" height="24" fill="#040F24" />
        
        {/* Col 2 (160..320): Navy to Mixon Blue Gradient */}
        <rect x="160" y="0" width="160" height="24" fill={`url(#${uniqueId}-blueGrad1)`} />
        
        {/* Col 3 (320..480): TOUCH OF ORANGE (Vivid Orange Gradient) */}
        <rect x="320" y="0" width="160" height="24" fill={`url(#${uniqueId}-orangeGrad1)`} />
        
        {/* Col 4 (480..640): Deep Navy */}
        <rect x="480" y="0" width="160" height="24" fill="#051838" />
        
        {/* Col 5 (640..800): Electric Cyan to Royal Blue */}
        <rect x="640" y="0" width="160" height="24" fill={`url(#${uniqueId}-cyanGrad1)`} />
        
        {/* Col 6 (800..960): Deep Obsidian Navy */}
        <rect x="800" y="0" width="160" height="24" fill="#040F24" />
        
        {/* Col 7 (960..1120): Mixon Royal Blue */}
        <rect x="960" y="0" width="160" height="24" fill="#0066FF" />
        
        {/* Col 8 (1120..1280): Navy Gradient */}
        <rect x="1120" y="0" width="160" height="24" fill={`url(#${uniqueId}-navyGrad1)`} />
        
        {/* Col 9 (1280..1440): Electric Cyan */}
        <rect x="1280" y="0" width="160" height="24" fill="#38BDF8" />

        {/* ============================================================== */}
        {/* ROW 2 (BOTTOM TIER: y = 24 to 48)                               */}
        {/* ============================================================== */}
        {/* Col 1 (0..160): Ice White / Soft Cream */}
        <rect x="0" y="24" width="160" height="24" fill="#F0F7FF" />
        
        {/* Col 2 (160..320): Electric Cyan */}
        <rect x="160" y="24" width="160" height="24" fill="#38BDF8" />
        
        {/* Col 3 (320..480): Mixon Royal Blue */}
        <rect x="320" y="24" width="160" height="24" fill="#0066FF" />
        
        {/* Col 4 (480..640): Mid Navy */}
        <rect x="480" y="24" width="160" height="24" fill="#082046" />
        
        {/* Col 5 (640..800): Mixon Royal Blue */}
        <rect x="640" y="24" width="160" height="24" fill="#0066FF" />
        
        {/* Col 6 (800..960): Pure Crisp White */}
        <rect x="800" y="24" width="160" height="24" fill="#FFFFFF" />
        
        {/* Col 7 (960..1120): TOUCH OF ORANGE (Warm Sunset Amber) */}
        <rect x="960" y="24" width="160" height="24" fill={`url(#${uniqueId}-orangeGrad2)`} />
        
        {/* Col 8 (1120..1280): Electric Sky Cyan */}
        <rect x="1120" y="24" width="160" height="24" fill="#38BDF8" />
        
        {/* Col 9 (1280..1440): Ice White / Soft Cream */}
        <rect x="1280" y="24" width="160" height="24" fill="#F0F7FF" />
      </svg>
    </div>
  );
};

export const FleetoraPartnerBanner: React.FC<FleetoraPartnerBannerProps> = ({ setCurrentPage }) => {
  return (
    <div className="relative w-full overflow-hidden select-none bg-[#0066FF]">
      
      {/* Top Geometric Mosaic Strip using Brand Colors + Orange Touch */}
      <MosaicDividerStrip />

      {/* Main Banner Body */}
      <section id="partner-banner" className="py-12 sm:py-16 bg-[#0066FF] text-white relative overflow-hidden w-full px-6 sm:px-10 lg:px-14">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-radial-at-c from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
            
            {/* Heading text */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px 80px 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-mono font-medium mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Enterprise Verified Partner</span>
              </div>
              <ScrollRevealHeading 
                as="h3"
                className="font-bdogrotesk text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[-0.025em] leading-[1.2]"
              >
                ® Recognized as East Africa's Trusted Software &amp; Financial Rails Partner Across Commercial Operations.
              </ScrollRevealHeading>
            </motion.div>

            {/* Action button */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px 80px 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="shrink-0"
            >
              <button
                type="button"
                onClick={() => setCurrentPage ? setCurrentPage('contact') : window.location.assign('#contact')}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gray-950 text-white font-sans text-sm sm:text-[15px] font-bold shadow-lg hover:bg-black hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <RollingButtonText text="Book a demo" />
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center overflow-hidden">
                  <span className="relative inline-flex flex-col h-4 overflow-hidden">
                    <span className="transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full will-change-transform">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                    <span className="absolute top-full left-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full will-change-transform">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </span>
                </span>
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bottom Geometric Mosaic Strip using Brand Colors + Orange Touch */}
      <MosaicDividerStrip flip />

    </div>
  );
};
