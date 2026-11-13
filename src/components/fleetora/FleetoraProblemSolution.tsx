import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, AlertTriangle, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export const FleetoraProblemSolution: React.FC = () => {
  const challenges = [
    {
      num: '01',
      title: 'Manual Reconciliation & Revenue Leakage',
      desc: 'Paper receipts, unlinked M-Pesa messages, and manual spreadsheet auditing inevitably lead to untracked discrepancies and delayed financial clarity.'
    },
    {
      num: '02',
      title: 'Fragmented Operational Silos',
      desc: 'Disconnected POS hardware, booking channels, and bank accounts force staff into double-entry routines and create chronic blind spots.'
    },
    {
      num: '03',
      title: 'Channel Conflicts & Double Bookings',
      desc: 'Lagging OTA calendar updates cause simultaneous reservations, damaged guest reviews, and high emergency compensation payouts.'
    },
    {
      num: '04',
      title: 'Scalability & Growth Bottlenecks',
      desc: 'Legacy tools require linear headcount growth for every new branch or unit added, strangling operational margins as your company expands.'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#040f24] text-white relative overflow-hidden select-none w-full px-6 sm:px-10 lg:px-14">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#0066FF]/10 blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
        
        {/* Header matching Fleetora label-box (eyebrow pill removed) */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 80px 0px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-sans text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-[-0.03em] leading-[1.14]"
          >
            Our answer is intelligent, technology-driven,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#60A5FA]">
              end-to-end software solutions.
            </span>
          </motion.h2>
        </div>

        {/* Central connecting line 1 */}
        <div className="w-full max-w-xs mx-auto h-12 relative flex items-center justify-center my-4">
          <div className="w-px h-full bg-white/15 border-l border-dashed border-white/30" />
          <motion.div 
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 48, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
          />
        </div>

        {/* Editorial Sub-statement matching Fleetora heading-h4 process-text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center px-4 mb-12"
        >
          <p className="font-sans text-lg sm:text-xl lg:text-2xl text-blue-100/90 font-light leading-relaxed">
            Introducing next-generation software architecture designed for East Africa’s operational landscape. Built to eliminate manual intervention, synchronize data in milliseconds, and protect every shilling.
          </p>
        </motion.div>

        {/* Central connecting line 2 */}
        <div className="w-full max-w-xs mx-auto h-12 relative flex items-center justify-center my-4">
          <div className="w-px h-full bg-white/15 border-l border-dashed border-white/30" />
          <motion.div 
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 48, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute top-0 w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
          />
        </div>

        {/* 4-Item Challenge Grid with Central Telemetry Visual matching Fleetora process-grid-box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center my-12">
          
          {/* Left Column: Challenge 1 & 2 */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-none bg-white/[0.03] border border-white/10 hover:border-red-400/40 transition-colors"
            >
              <div className="font-mono text-sm font-bold text-red-400/90 mb-3">
                [01]
              </div>
              <h4 className="font-sans text-xl font-bold text-white mb-2">
                {challenges[0].title}
              </h4>
              <p className="font-sans text-sm text-blue-100/70 font-light leading-relaxed">
                {challenges[0].desc}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-none bg-white/[0.03] border border-white/10 hover:border-red-400/40 transition-colors"
            >
              <div className="font-mono text-sm font-bold text-red-400/90 mb-3">
                [02]
              </div>
              <h4 className="font-sans text-xl font-bold text-white mb-2">
                {challenges[1].title}
              </h4>
              <p className="font-sans text-sm text-blue-100/70 font-light leading-relaxed">
                {challenges[1].desc}
              </p>
            </motion.div>
          </div>

          {/* Central Telemetry Hub visual matching Fleetora process-image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-none bg-gradient-to-b from-[#083071] to-[#0066FF]/20 border border-[#38BDF8]/30 text-center relative overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[360px]"
          >
            {/* Center pulsing radar */}
            <div className="w-20 h-20 rounded-full bg-[#0066FF]/30 border border-[#38BDF8] flex items-center justify-center mb-6 relative">
              <span className="w-3 h-3 rounded-full bg-[#38BDF8] animate-ping absolute" />
              <Zap className="w-8 h-8 text-[#38BDF8] relative z-10" />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] font-bold mb-2">
              Mixon Unified Engine
            </span>
            <h3 className="font-sans text-2xl font-extrabold text-white mb-3">
              Autonomous Central Core
            </h3>
            <p className="font-sans text-xs sm:text-sm text-blue-100/80 font-light leading-relaxed max-w-xs">
              Direct telemetry stream unifying Property, Hospitality, Retail POS &amp; Ticketing into single-source truth.
            </p>

            <div className="flex items-center gap-2 mt-6 px-3 py-1.5 rounded-full bg-white/10 text-[11px] font-mono text-blue-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-time Active Engine</span>
            </div>
          </motion.div>

          {/* Right Column: Challenge 3 & 4 */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-none bg-white/[0.03] border border-white/10 hover:border-red-400/40 transition-colors"
            >
              <div className="font-mono text-sm font-bold text-red-400/90 mb-3">
                [03]
              </div>
              <h4 className="font-sans text-xl font-bold text-white mb-2">
                {challenges[2].title}
              </h4>
              <p className="font-sans text-sm text-blue-100/70 font-light leading-relaxed">
                {challenges[2].desc}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-none bg-white/[0.03] border border-white/10 hover:border-red-400/40 transition-colors"
            >
              <div className="font-mono text-sm font-bold text-red-400/90 mb-3">
                [04]
              </div>
              <h4 className="font-sans text-xl font-bold text-white mb-2">
                {challenges[3].title}
              </h4>
              <p className="font-sans text-sm text-blue-100/70 font-light leading-relaxed">
                {challenges[3].desc}
              </p>
            </motion.div>
          </div>

        </div>

        {/* Central connecting line 3 */}
        <div className="w-full max-w-xs mx-auto h-12 relative flex items-center justify-center my-4">
          <div className="w-px h-full bg-white/15 border-l border-dashed border-white/30" />
          <motion.div 
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 48, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-0 w-1.5 h-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]"
          />
        </div>

        {/* Bottom CTA / Outcome Box matching Fleetora process-cta-box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center pt-8"
        >
          <h3 className="font-sans text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.2]">
            Complex, fragmented, and inefficient manual workflows are replaced with{' '}
            <span className="text-[#38BDF8]">automated, unified certainty.</span>
          </h3>
        </motion.div>

      </div>
    </section>
  );
};
