import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, ArrowUpRight } from 'lucide-react';
import resortBg from '../../assets/images/mixon_resort_villas_1784147227224.jpg';

export const FleetoraResultBanner: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden select-none bg-[#051838] py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-14">
      
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={resortBg} 
          alt="Operational Result" 
          className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125 saturate-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040f24] via-[#051838]/90 to-[#040f24]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Card matching Fleetora result-border-box & result-card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 80px 0px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 sm:p-12 rounded-none bg-gray-950/80 border border-white/15 backdrop-blur-md shadow-2xl text-left space-y-6"
          >
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-[-0.03em] leading-[1.15]">
              An intelligent, zero-leakage enterprise software ecosystem.
            </h2>

            <p className="font-sans text-base sm:text-lg text-blue-100/80 font-light leading-relaxed">
              Revolutionizing daily operations across Kenya and East Africa by unifying rent settlement, inventory synchronisation, and channel bookings into single-source truth.
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs sm:text-sm text-blue-200/90 font-mono">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" />
              <span>Verified across KES 188M+ reconciled monthly volume</span>
            </div>
          </motion.div>

          {/* Right Dual Stats matching Fleetora result-info-wrap & result-detail-div */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px 60px 0px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-none bg-white/[0.06] border border-white/15 backdrop-blur-md hover:bg-white/[0.09] transition-all"
            >
              <div className="font-sans text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
                47%
              </div>
              <div className="font-sans text-lg font-bold text-[#38BDF8] mb-1">
                Cost &amp; Variance Reduction
              </div>
              <p className="font-sans text-xs sm:text-sm text-blue-100/70 font-light leading-relaxed">
                Eliminates unexplained cash discrepancies, manual data entry, and late payment reconciliation friction.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px 60px 0px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-none bg-white/[0.06] border border-white/15 backdrop-blur-md hover:bg-white/[0.09] transition-all"
            >
              <div className="font-sans text-5xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
                3.2x
              </div>
              <div className="font-sans text-lg font-bold text-[#38BDF8] mb-1">
                Operational Velocity Lift
              </div>
              <p className="font-sans text-xs sm:text-sm text-blue-100/70 font-light leading-relaxed">
                Accelerates tenant onboarding, POS shift auditing, and OTA calendar updates to sub-second speeds.
              </p>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
