/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Shield, Terminal, ArrowRight, Layers, Sparkles, HelpCircle } from 'lucide-react';
import { ProductType, SimulationResult } from '../types';

const PRESETS: Record<ProductType, { label: string; text: string }[]> = {
  mirentals: [
    {
      label: "Missed Rent & local reminder",
      text: "Tenant in Kilimani Block B missed their 50,000 KES rent on the 5th. Grace period active."
    },
    {
      label: "Automate late grace period extension",
      text: "Tenant requested a 2-day late payment extension due to bank delay. High trust tenant score."
    }
  ],
  mireserve: [
    {
      label: "Early check-in & welcome greeting",
      text: "Guest arriving at Westlands Penthouse at 11 AM (Standard check-in: 2 PM). Housekeeping is finished."
    },
    {
      label: "Weekend pricing speed optimization",
      text: "Weekend occupancy for Coastal stay is 85%. Traffic is surging by +20% over trailing 2 hours."
    }
  ],
  eventyetu: [
    {
      label: "Dynamic ticket velocity spike",
      text: "Concert tickets at Alchemist Nairobi are selling at 8 tickets/min. Occupancy reached 90%."
    },
    {
      label: "Flag suspicious ticket duplicate",
      text: "Ticket scanner scanned VIP ticket #8942 twice within 3 minutes at different gate entry lines."
    }
  ],
  mipos: [
    {
      label: "Predictive low-stock alert",
      text: "Store sales velocity for Designer Shirts is extremely high. Current stock is 5 units (Standard safety threshold: 15). Supplier delivery takes 48 hours."
    },
    {
      label: "Register cash drawer audit",
      text: "Register #2 closed shift with 45,000 KES cash. System recorded transactions sum 46,200 KES. Discrepancy detected: -1,200 KES."
    }
  ]
};

export default function Sandbox() {
  const [activeProduct, setActiveProduct] = useState<ProductType>('mirentals');
  const [customScenario, setCustomScenario] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  // Set default scenario when product changes
  useEffect(() => {
    setCustomScenario(PRESETS[activeProduct][0].text);
    setResult(null);
    setActiveStepIndex(-1);
  }, [activeProduct]);

  // Handle preset selection
  const handleSelectPreset = (text: string) => {
    setCustomScenario(text);
  };

  const handleSimulate = async () => {
    setIsLoading(true);
    setResult(null);
    setActiveStepIndex(-1);

    try {
      const response = await fetch('/api/gemini/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: activeProduct,
          scenario: customScenario
        })
      });

      if (!response.ok) {
        throw new Error('Simulation failed');
      }

      const data = await response.json();
      setResult(data);

      // Animate steps one by one
      for (let i = 0; i < (data.steps?.length || 3); i++) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setActiveStepIndex(i);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-none overflow-hidden shadow-xl relative" id="mixon-interactive-sandbox">
      {/* Visual background details */}
      <div className="absolute top-0 left-0 w-full h-1 bg-mixon-blue" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-mixon-blue/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      {/* Console Header Bar */}
      <div className="bg-slate-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-blue-400" />
          </div>
          <span className="text-xs font-mono text-gray-500">mixon_engine_sandbox_v2.5.sh</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-mixon-blue animate-pulse" />
          <span className="text-[10px] font-mono text-mixon-blue uppercase tracking-wider font-semibold">Ready for payload</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Control Column */}
        <div className="lg:col-span-5 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 space-y-6 text-left">
          <div className="space-y-2">
            <h4 className="font-display text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-mixon-blue" />
              <span>1. Choose Product Model</span>
            </h4>
            <p className="text-gray-600 text-xs font-light">
              Mixon runs modular automation models tailored specifically to vertical operations.
            </p>
          </div>

          {/* Product Segment Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="tablist">
            {(['mirentals', 'mireserve', 'eventyetu', 'mipos'] as ProductType[]).map((prod) => (
              <button
                key={prod}
                role="tab"
                aria-selected={activeProduct === prod}
                onClick={() => setActiveProduct(prod)}
                className={`py-2.5 px-2 rounded-none font-mono text-[10px] uppercase tracking-wider text-center border font-semibold transition-all cursor-pointer truncate ${
                  activeProduct === prod
                    ? 'bg-mixon-cotton border-mixon-blue text-mixon-blue'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-gray-950 hover:border-gray-300'
                }`}
              >
                {prod === 'mirentals'
                  ? 'miRentals'
                  : prod === 'mireserve'
                  ? 'miReserve'
                  : prod === 'eventyetu'
                  ? 'EventYetu'
                  : 'miPos'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="font-display text-sm font-semibold text-gray-900 tracking-tight">
                2. Select Scenario Preset
              </h4>
              <p className="text-gray-500 text-[11px] font-light">
                Quick-load dynamic hurdles representing standard manual workload leaks.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PRESETS[activeProduct].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(preset.text)}
                  className={`text-xs px-3 py-2 rounded-none border text-left transition-all max-w-full truncate cursor-pointer ${
                    customScenario === preset.text
                      ? 'bg-slate-100 border-gray-400 text-gray-900 font-semibold'
                      : 'bg-slate-50 border-gray-200 text-gray-600 hover:text-gray-950 hover:border-gray-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="scenario-input" className="block font-display text-sm font-semibold text-gray-900 tracking-tight">
              3. Customize Payload / Instructions
            </label>
            <textarea
              id="scenario-input"
              value={customScenario}
              onChange={(e) => setCustomScenario(e.target.value)}
              placeholder="e.g. Type any custom event details here to process them live..."
              rows={4}
              className="w-full bg-slate-50 border border-gray-200 hover:border-gray-350 focus:border-mixon-blue text-gray-900 rounded-lg p-4 text-xs font-sans outline-none resize-none transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSimulate}
            disabled={isLoading || !customScenario.trim()}
            className="w-full bg-black text-white font-display font-bold py-3.5 px-6 rounded-none text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Simulate AI Engine Pipeline</span>
          </motion.button>
        </div>

        {/* Right Execution Terminal Column */}
        <div className="lg:col-span-7 bg-zinc-950 p-6 md:p-8 flex flex-col justify-between min-h-[420px] rounded-none">
          <div className="text-left">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-mixon-light-blue" />
                <span>Execution Core Output</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Nairobi, KE [UTC+3]</span>
            </div>

            {/* Waiting/Empty State */}
            {!isLoading && !result && (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500">
                  <Play className="w-8 h-8 opacity-40 text-zinc-400" />
                </div>
                <div className="space-y-1">
                  <p className="font-display font-semibold text-zinc-300 text-sm">System Idle</p>
                  <p className="text-zinc-500 text-xs max-w-xs">
                    Choose a product scenario on the left and click simulate to deploy automation.
                  </p>
                </div>
              </div>
            )}

            {/* Loading Sandbox State */}
            {isLoading && !result && (
              <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-mixon-blue/20 border-t-mixon-light-blue animate-spin" />
                  <Sparkles className="w-5 h-5 text-mixon-light-blue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-mixon-light-blue text-xs tracking-widest uppercase">Initializing Agent Connection...</p>
                  <p className="text-zinc-500 text-[10px] font-mono">
                    contacting gemini-2.5-flash server-side node
                  </p>
                </div>
              </div>
            )}

            {/* Simulation Results Display */}
            {result && (
              <div className="space-y-6">
                {/* Meta details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-zinc-900/50 border border-zinc-850 p-2.5 rounded-lg">
                    <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Trigger Class</span>
                    <span className="font-mono text-[10px] text-zinc-200 block mt-0.5 truncate font-bold text-amber-500">
                      {result.trigger}
                    </span>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-850 p-2.5 rounded-lg">
                    <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Deploy Model</span>
                    <span className="font-mono text-[10px] text-zinc-200 block mt-0.5 truncate font-bold">
                      {result.model}
                    </span>
                  </div>
                  <div className="bg-zinc-900/50 border border-zinc-850 p-2.5 rounded-lg col-span-2 sm:col-span-1">
                    <span className="block text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Gateway Status</span>
                    <span className="font-mono text-[10px] text-mixon-light-blue block mt-0.5 truncate font-semibold uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-mixon-light-blue animate-pulse" />
                      SECURE_ONLINE
                    </span>
                  </div>
                </div>

                {/* Automation Steps list */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                    Automated Event Pipeline:
                  </h5>
                  <div className="space-y-2">
                    {result.steps.map((step, idx) => {
                      const isLoaded = idx <= activeStepIndex;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: isLoaded ? 1 : 0.2, x: isLoaded ? 0 : -10 }}
                          transition={{ duration: 0.3 }}
                          className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-mono border ${
                            idx === activeStepIndex
                              ? 'bg-mixon-blue/20 border-mixon-blue/30 text-mixon-light-blue'
                              : isLoaded
                              ? 'bg-zinc-900 border-zinc-850 text-zinc-300'
                              : 'bg-transparent border-transparent text-zinc-600'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            idx === activeStepIndex
                              ? 'bg-mixon-light-blue text-black'
                              : isLoaded
                              ? 'bg-zinc-800 text-mixon-light-blue'
                              : 'bg-zinc-900 text-zinc-600'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="truncate">{step}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Final Decision JSON */}
                <AnimatePresence>
                  {activeStepIndex === result.steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2 border-t border-zinc-900 pt-4"
                    >
                      <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-mixon-light-blue" />
                        <span>Automation Decisions & Notifications Payload:</span>
                      </h5>
                      <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-lg overflow-x-auto max-h-[160px] overflow-y-auto font-mono text-xs text-mixon-light-blue space-y-2">
                        <pre className="text-left text-[11px] leading-relaxed text-zinc-200">
                          {JSON.stringify(result.output, null, 2)}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="border-t border-zinc-900 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-zinc-500 text-left">
            <span>Powered by Mixon Intelligence Framework v2.5</span>
            <div className="flex items-center gap-1">
              <span>Model Confidence:</span>
              <span className="text-mixon-light-blue">99.4% precision-certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
