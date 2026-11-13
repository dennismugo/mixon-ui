import { ShoppingBag, Check } from 'lucide-react';
import PixelMosaicBackdrop from '../PixelMosaicBackdrop';

/**
 * MiPosDashboardIllustration:
 * Displays Mixon blue diagonal pixel-mosaic backdrop with a sharp floating frosted card
 * and clean UI illustrations matching offline-resilient POS ring-ups and stock telemetry.
 */
export default function MiPosDashboardIllustration() {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-none overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 shadow-sm bg-[#eaf2ff] select-none font-sans">
      <PixelMosaicBackdrop seedOffset={3} />

      {/* Floating Frosted Glass Container */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[390px] p-2 sm:p-2.5 bg-white/25 backdrop-blur-md rounded-none shadow-[0_24px_50px_-15px_rgba(15,23,42,0.35)] border border-white/60 ring-4 ring-white/20 transition-transform duration-300 hover:scale-[1.01]">
        
        {/* Pure White Inner Card */}
        <div className="bg-white rounded-none p-5 sm:p-6 shadow-xs border border-black/[0.04] flex flex-col justify-between text-left">
          
          {/* Header Row */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[13px] font-bold text-gray-900 tracking-tight block">
                  Offline sales engine
                </span>
                <span className="text-[10px] text-gray-500">Terminal #02 &bull; Westgate Flagship</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              0ms Lag
            </span>
          </div>

          {/* iOS Toggle Switch Row */}
          <div className="flex items-center justify-between py-2.5 px-3.5 rounded-none bg-gray-50/90 border border-gray-150/80 mb-3.5">
            <span className="text-[11.5px] font-medium text-gray-700">Local SQLite transaction buffer</span>
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
              <span><strong>KES 84,200</strong> ring-ups processed (0 freeze delay)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Split tender: M-Pesa Till 892011 + Cash matched</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-150/80 my-1" />

          {/* Status Checks */}
          <div className="space-y-1.5 my-2.5 text-[10.5px] text-gray-600">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>Inventory count: 98.4% in stock (Auto-PO queued)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              <span>End-of-day drawer variance: KES 0.00</span>
            </div>
          </div>

          {/* Micro Metadata Badges */}
          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
            <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/50">Instant barcode</span>
            <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/50">Split tender</span>
            <span className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">Zero freeze</span>
          </div>

        </div>
      </div>

    </div>
  );
}
