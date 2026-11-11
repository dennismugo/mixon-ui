import { QrCode, Check } from 'lucide-react';

/**
 * EventYetuDashboardIllustration:
 * High-craft, award-winning SaaS card matching Image 2 style.
 * Displays blue gradient background with vertical telemetry equalizer bars,
 * a floating frosted card, and clean UI illustrations matching dynamic QR gate ingress and fraud prevention.
 */
export default function EventYetuDashboardIllustration() {
  const equalizerBars = [
    30, 48, 68, 42, 60, 85, 50, 72, 92, 64, 38, 55, 78, 96, 62, 40,
    66, 88, 52, 74, 90, 46, 62, 82, 52, 76, 95, 62, 44, 58, 80, 45,
    35, 58, 74, 50, 68, 90, 56, 78, 94, 60, 42, 64, 82, 98, 66, 48
  ];

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-[22px] sm:rounded-[26px] overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 shadow-sm bg-gradient-to-b from-[#BBD9FD] via-[#6B9DF2] to-[#1C3D68] select-none font-sans">
      
      {/* Radial sky-soft highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.5),transparent_65%)] pointer-events-none" />

      {/* Background Audio / Telemetry Equalizer Bars */}
      <div className="absolute inset-x-6 inset-y-0 flex items-center justify-between pointer-events-none opacity-25">
        {equalizerBars.map((height, idx) => (
          <div
            key={idx}
            className="w-[2px] bg-white rounded-full transition-all duration-500"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      {/* Floating Frosted Glass Container */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[390px] p-2 sm:p-2.5 bg-white/25 backdrop-blur-md rounded-[20px] shadow-[0_24px_50px_-15px_rgba(15,23,42,0.35)] border border-white/60 ring-4 ring-white/20 transition-transform duration-300 hover:scale-[1.01]">
        
        {/* Pure White Inner Card */}
        <div className="bg-white rounded-[16px] p-5 sm:p-6 shadow-xs border border-black/[0.04] flex flex-col justify-between text-left">
          
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shadow-xs">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[13px] font-bold text-gray-900 tracking-tight block">
                  Dynamic QR ingress
                </span>
                <span className="text-[10px] text-gray-500">Nairobi Live Fest Ingress</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              18 Gates Live
            </span>
          </div>

          {/* iOS Toggle Switch Row */}
          <div className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-gray-50/90 border border-gray-150/80 mb-3.5">
            <span className="text-[11.5px] font-medium text-gray-700">AES-256 rotating crypto-tokens</span>
            <div className="w-9 h-5 rounded-full bg-[#0066FF] p-0.5 flex items-center justify-end shadow-inner cursor-default">
              <div className="w-4 h-4 rounded-full bg-white shadow-xs flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-[#0066FF] stroke-[3]" />
              </div>
            </div>
          </div>

          {/* Daily Telemetry Summary */}
          <div className="space-y-1.5 mb-3.5">
            <div className="flex items-center gap-2 text-[11px] text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shrink-0" />
              <span><strong>4,850 of 5,000</strong> passes checked in (97.0%)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Average scanner verification latency: 38ms</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-150/80 my-1" />

          {/* Status Checks */}
          <div className="space-y-1.5 my-2.5 text-[10.5px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>Zero duplicate passes admitted &bull; Anti-fraud active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>Offline local cache synced across turnstiles</span>
            </div>
          </div>

          {/* Micro Metadata Badges */}
          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/50">Sub-50ms</span>
            <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/50">Offline buffer</span>
            <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">Fraud-proof</span>
          </div>

        </div>
      </div>

    </div>
  );
}
