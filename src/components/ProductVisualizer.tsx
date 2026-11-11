/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Home, Ticket, Cpu, ShoppingBag, Smile } from 'lucide-react';

export default function ProductVisualizer() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div 
      className="relative w-full h-full min-h-[500px] lg:min-h-0 lg:h-full max-w-[520px] mx-auto bg-gradient-to-br from-[#093173] to-[#06204c] border border-white/15 rounded-3xl p-8 flex items-center justify-center shadow-2xl overflow-hidden" 
      id="mixon-engine-schematic"
    >
      {/* Creative background grids & tech accents */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60" />
      
      {/* Decorative ambient background glows */}
      <div className="absolute w-48 h-48 bg-mixon-light-blue/10 rounded-full blur-3xl top-1/4 left-1/4 pointer-events-none animate-pulse" />
      <div className="absolute w-40 h-40 bg-mixon-cotton/5 rounded-full blur-3xl bottom-1/4 right-1/4 pointer-events-none" />

      {/* Dynamic orbital elliptical path lines */}
      <div className="absolute inset-6 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute inset-28 rounded-full border border-mixon-light-blue/5 pointer-events-none" />

      {/* Pulsing connection lines schema */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Animated flow line from center to miRentals (Top) */}
        <line x1="50" y1="50" x2="50" y2="20" stroke="#93C2FF" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="50" cy="20" r="1.5" fill="#93C2FF" className={hoveredNode === 'mirentals' ? 'animate-ping' : ''}>
          <animate attributeName="cy" from="50" to="20" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Animated flow line from center to miReserve (Left) */}
        <line x1="50" y1="50" x2="20" y2="50" stroke="#93C2FF" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="20" cy="50" r="1.5" fill="#93C2FF" className={hoveredNode === 'mireserve' ? 'animate-ping' : ''}>
          <animate attributeName="cx" from="50" to="20" dur="2.2s" repeatCount="indefinite" />
        </circle>

        {/* Animated flow line from center to Event Yetu (Right) */}
        <line x1="50" y1="50" x2="80" y2="50" stroke="#93C2FF" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="80" cy="50" r="1.5" fill="#93C2FF" className={hoveredNode === 'eventyetu' ? 'animate-ping' : ''}>
          <animate attributeName="cx" from="50" to="80" dur="2.2s" repeatCount="indefinite" />
        </circle>

        {/* Animated flow line from center to miPos (Bottom) */}
        <line x1="50" y1="50" x2="50" y2="80" stroke="#93C2FF" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="50" cy="80" r="1.5" fill="#93C2FF" className={hoveredNode === 'mipos' ? 'animate-ping' : ''}>
          <animate attributeName="cy" from="50" to="80" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Central Mixon AI core node */}
      <motion.div
      	id="central-mixon-core"
        whileHover={{ scale: 1.08 }}
        onHoverStart={() => setHoveredNode('core')}
        onHoverEnd={() => setHoveredNode(null)}
        className="z-10 w-24 h-24 rounded-full bg-[#06204c] border-2 border-mixon-light-blue p-1.5 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(147,194,255,0.25)] transition-all cursor-crosshair select-none"
      >
        <Cpu className="w-6 h-6 text-mixon-light-blue animate-pulse" />
        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mt-1.5">Mixon AI</span>
        <span className="text-[7px] font-mono text-mixon-light-blue uppercase tracking-widest font-semibold mt-0.5">Core v2.5</span>
      </motion.div>

      {/* miRentals Node (Top Centered) */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHoveredNode('mirentals')}
        onHoverEnd={() => setHoveredNode(null)}
        className={`absolute top-[6%] left-1/2 -translate-x-1/2 z-10 px-3.5 py-2 rounded-2xl border flex items-center gap-3 cursor-pointer select-none transition-all duration-300 ${
          hoveredNode === 'mirentals'
            ? 'bg-[#093173] border-mixon-light-blue text-mixon-light-blue shadow-lg shadow-mixon-light-blue/10'
            : 'bg-[#06204c] border-white/10 text-white'
        }`}
      >
        <div className="p-1.5 rounded-lg bg-black/30 text-mixon-light-blue">
          <Building2 className="w-4 h-4" />
        </div>
        <div className="text-left leading-none">
          <span className="block text-xs font-display font-bold tracking-tight">miRentals</span>
          <span className="text-[8px] font-mono uppercase tracking-wider text-mixon-cotton/60 mt-0.5 block">Rent AI Model</span>
        </div>
      </motion.div>

      {/* miReserve Node (Left) */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHoveredNode('mireserve')}
        onHoverEnd={() => setHoveredNode(null)}
        className={`absolute top-1/2 -translate-y-1/2 left-[4%] z-10 px-3.5 py-2 rounded-2xl border flex items-center gap-3 cursor-pointer select-none transition-all duration-300 ${
          hoveredNode === 'mireserve'
            ? 'bg-[#093173] border-mixon-light-blue text-mixon-light-blue shadow-lg shadow-mixon-light-blue/10'
            : 'bg-[#06204c] border-white/10 text-white'
        }`}
      >
        <div className="p-1.5 rounded-lg bg-black/30 text-mixon-light-blue">
          <Smile className="w-4 h-4" />
        </div>
        <div className="text-left leading-none">
          <span className="block text-xs font-display font-bold tracking-tight">miReserve</span>
          <span className="text-[8px] font-mono uppercase tracking-wider text-mixon-cotton/60 mt-0.5 block">Stays AI Model</span>
        </div>
      </motion.div>

      {/* Event Yetu Node (Right) */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHoveredNode('eventyetu')}
        onHoverEnd={() => setHoveredNode(null)}
        className={`absolute top-1/2 -translate-y-1/2 right-[4%] z-10 px-3.5 py-2 rounded-2xl border flex items-center gap-3 cursor-pointer select-none transition-all duration-300 ${
          hoveredNode === 'eventyetu'
            ? 'bg-[#093173] border-mixon-light-blue text-mixon-light-blue shadow-lg shadow-mixon-light-blue/10'
            : 'bg-[#06204c] border-white/10 text-white'
        }`}
      >
        <div className="p-1.5 rounded-lg bg-black/30 text-mixon-light-blue">
          <Ticket className="w-4 h-4" />
        </div>
        <div className="text-left leading-none">
          <span className="block text-xs font-display font-bold tracking-tight">Event Yetu</span>
          <span className="text-[8px] font-mono uppercase tracking-wider text-mixon-cotton/60 mt-0.5 block">Tickets AI</span>
        </div>
      </motion.div>

      {/* miPos Node (Bottom Centered) */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setHoveredNode('mipos')}
        onHoverEnd={() => setHoveredNode(null)}
        className={`absolute bottom-[6%] left-1/2 -translate-x-1/2 z-10 px-3.5 py-2 rounded-2xl border flex items-center gap-3 cursor-pointer select-none transition-all duration-300 ${
          hoveredNode === 'mipos'
            ? 'bg-[#093173] border-mixon-light-blue text-mixon-light-blue shadow-lg shadow-mixon-light-blue/10'
            : 'bg-[#06204c] border-white/10 text-white'
        }`}
      >
        <div className="p-1.5 rounded-lg bg-black/30 text-mixon-light-blue">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div className="text-left leading-none">
          <span className="block text-xs font-display font-bold tracking-tight">miPos</span>
          <span className="text-[8px] font-mono uppercase tracking-wider text-mixon-cotton/60 mt-0.5 block">Retail AI Model</span>
        </div>
      </motion.div>
    </div>
  );
}
