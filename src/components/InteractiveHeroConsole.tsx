import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Palmtree, 
  Ticket, 
  ShoppingBag, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Search,
  ShieldCheck,
  RefreshCw,
  Clock
} from 'lucide-react';
import { Lead } from '../types';

interface InteractiveHeroConsoleProps {
  onLeadCaptured: (lead: Lead) => void;
}

type TabType = 'rent' | 'stays' | 'events' | 'registers' | 'reconcile';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ElementType;
  placeholder: string;
  defaultInput: string;
  sampleMetric: {
    title: string;
    detail: string;
    tag: string;
    latency: string;
  };
}

const TABS: TabConfig[] = [
  {
    id: 'rent',
    label: 'Rent Collection',
    icon: Building2,
    placeholder: 'Enter work email (e.g. property@kilimanihomes.ke)',
    defaultInput: 'kilimani-unit4b@mixon.ke',
    sampleMetric: {
      title: 'Rent Collected • Unit 4B',
      detail: 'KES 37,000 M-Pesa paybill auto-reconciled',
      tag: 'Zero Delay',
      latency: '2s ago'
    }
  },
  {
    id: 'stays',
    label: 'Guest Stays',
    icon: Palmtree,
    placeholder: 'Enter resort or villa email (e.g. stays@dianivillas.com)',
    defaultInput: 'host@dianivillas.com',
    sampleMetric: {
      title: 'Calendar Synchronized',
      detail: 'Airbnb, Booking.com & Direct channels locked',
      tag: 'No Overbookings',
      latency: '14ms'
    }
  },
  {
    id: 'events',
    label: 'Event Gates',
    icon: Ticket,
    placeholder: 'Enter venue or promoter email (e.g. access@eastafricalive.com)',
    defaultInput: 'tickets@carnivore.ke',
    sampleMetric: {
      title: '1,420 Tickets Scanned Offline',
      detail: 'Tamper-proof cryptographically signed QR entry',
      tag: 'Fraud 0%',
      latency: '180ms'
    }
  },
  {
    id: 'registers',
    label: 'Store Registers',
    icon: ShoppingBag,
    placeholder: 'Enter store or cafe email (e.g. pos@nairobieats.com)',
    defaultInput: 'pos@westlands-branch.com',
    sampleMetric: {
      title: 'Offline Register Synchronized',
      detail: '42 offline cash & card transactions auto-settled',
      tag: 'Self-Healing',
      latency: 'Synced'
    }
  },
  {
    id: 'reconcile',
    label: 'Sovereign Split',
    icon: Zap,
    placeholder: 'Enter treasury email to simulate auto-split disbursement',
    defaultInput: 'finance@hospitalitygroup.com',
    sampleMetric: {
      title: 'Sovereign Split Reconciled',
      detail: 'Owner 85% • Escrow 15% automatically disbursed',
      tag: 'Velocity +38%',
      latency: 'Instant'
    }
  }
];

export default function InteractiveHeroConsole({ onLeadCaptured }: InteractiveHeroConsoleProps) {
  const [activeTab, setActiveTab] = useState<TabType>('rent');
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const currentTabConfig = TABS.find(t => t.id === activeTab) || TABS[0];

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailToSubmit = inputValue.trim() || currentTabConfig.defaultInput;
    
    setIsSimulating(true);
    
    setTimeout(() => {
      const productMap: Record<TabType, Lead['productOfInterest']> = {
        rent: 'mirentals',
        stays: 'mireserve',
        events: 'eventyetu',
        registers: 'mipos',
        reconcile: 'all'
      };

      onLeadCaptured({
        id: `lead-${Date.now()}`,
        name: `${currentTabConfig.label} Operator`,
        email: emailToSubmit.includes('@') ? emailToSubmit : `${emailToSubmit}@mixon-operator.com`,
        company: currentTabConfig.label,
        productOfInterest: productMap[currentTabConfig.id] || 'all',
        notes: `Submitted via Context.dev interactive hero console (${currentTabConfig.label})`,
        createdAt: new Date().toISOString()
      });
      
      setIsSimulating(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 sm:mt-12 relative z-20">
      {/* Frosted Glass Floating Console Bar */}
      <div className="bg-white/90 sm:bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/70 shadow-[0_20px_50px_rgba(2,132,199,0.20),0_2px_15px_rgba(0,0,0,0.05)] p-2 sm:p-4 text-left transition-all">
        
        {/* Navigation Tabs (Replicating Context.dev top pill tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 sm:pb-3 px-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-white text-gray-950 shadow-sm border border-gray-200/60 font-semibold' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#0066FF]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-xl bg-white -z-10 shadow-xs border border-gray-200/60"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Input & Action Console Bar */}
        <form onSubmit={handleSubmit} className="relative mt-1">
          <div className="relative flex items-center bg-[#F3F6F9] hover:bg-[#EEF2F6] focus-within:bg-white rounded-full p-1.5 transition-all border border-gray-200/70 focus-within:border-[#0066FF]/60 focus-within:shadow-[0_0_0_4px_rgba(0,102,255,0.08)]">
            
            {/* Left Search / Action Icon */}
            <div className="pl-3.5 pr-2 text-gray-400 flex items-center">
              <Search className="w-4 h-4 text-gray-400" />
            </div>

            {/* Main Interactive Input */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={currentTabConfig.placeholder}
              className="w-full bg-transparent text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none py-2 pr-3 font-normal"
            />

            {/* Blue Submit Pill Button (matching Context.dev arrow button) */}
            <button
              type="submit"
              disabled={isSimulating}
              className="bg-[#0066FF] hover:bg-[#0052cc] active:scale-95 text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 shadow-[0_4px_12px_rgba(0,102,255,0.35)] cursor-pointer disabled:opacity-50"
              title="Test autonomous execution & reserve spot"
            >
              {isSimulating ? (
                <RefreshCw className="w-4 h-4 text-white animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </form>

        {/* Dynamic Live Proof / Confirmation Bar */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="submitted-state"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-3 p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 flex items-center justify-between text-xs sm:text-sm text-emerald-950 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Simulation Active!</strong> Demo access link generated for {currentTabConfig.label}.
                </span>
              </div>
              <span className="text-[10px] bg-emerald-200/60 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider hidden sm:inline-block">
                Verified Lead
              </span>
            </motion.div>
          ) : (
            <motion.div
              key={`metric-${activeTab}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2.5 px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] sm:text-xs text-gray-500 gap-2 border-t border-gray-150/50 pt-2"
            >
              <div className="flex items-center gap-2 text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">{currentTabConfig.sampleMetric.title}:</span>
                <span className="text-gray-500 hidden sm:inline">{currentTabConfig.sampleMetric.detail}</span>
              </div>
              
              <div className="flex items-center gap-3 shrink-0 ml-auto font-mono text-[10px]">
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                  {currentTabConfig.sampleMetric.tag}
                </span>
                <span className="text-gray-400 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {currentTabConfig.sampleMetric.latency}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
