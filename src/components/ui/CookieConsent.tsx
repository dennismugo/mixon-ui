import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldCheck, ChevronRight, X, Settings2, Check } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
}

const STORAGE_KEY = 'mixon_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: true,
    functional: true,
  });

  useEffect(() => {
    // Check if consent was already given
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Small delay so page loads smoothly before banner slides in
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(saved);
        if (parsed) setPreferences(parsed);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Listen for custom trigger (e.g. from footer "Cookie Settings" button)
  useEffect(() => {
    const handleOpenCookies = () => {
      setShowPreferences(true);
      setIsOpen(true);
    };
    window.addEventListener('mixon:open-cookies', handleOpenCookies);
    return () => window.removeEventListener('mixon:open-cookies', handleOpenCookies);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = { essential: true, analytics: true, functional: true };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allAccepted));
    } catch {
      // ignore
    }
    setPreferences(allAccepted);
    setIsOpen(false);
  };

  const handleDeclineNonEssential = () => {
    const essentialOnly: CookiePreferences = { essential: true, analytics: false, functional: false };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(essentialOnly));
    } catch {
      // ignore
    }
    setPreferences(essentialOnly);
    setIsOpen(false);
  };

  const handleSaveCustom = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-3 left-3 right-3 sm:right-auto sm:bottom-6 sm:left-6 z-[80] sm:w-[430px] max-w-[calc(100vw-1.5rem)]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/95 p-4 sm:p-6 shadow-[0_20px_50px_rgba(10,25,50,0.18)] backdrop-blur-xl">
            {/* Subtle top brand accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#D9E88E]" />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] shrink-0 shadow-2xs">
                  <Cookie className="w-5 h-5 text-[#0066FF]" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-gray-950 text-base leading-tight">
                    Cookie Preferences
                  </h3>
                  <span className="text-[11px] font-mono font-medium text-[#0066FF] flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Strict Privacy Standard
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDeclineNonEssential}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close cookie banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <p className="font-sans text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-4">
              We use essential cookies to run our platforms securely and optional analytics to understand telemetry and refine software performance. We never sell your data.
            </p>

            {/* Preferences Drawer */}
            <AnimatePresence>
              {showPreferences && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 mb-4 pt-3 border-t border-gray-100 overflow-hidden text-xs"
                >
                  {/* Essential */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-150">
                    <div>
                      <div className="font-semibold text-gray-900">Essential System Cookies</div>
                      <div className="text-[11px] text-gray-500">Core session, CSRF security & telemetry routing</div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200">
                      Required
                    </span>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-150">
                    <div>
                      <div className="font-semibold text-gray-900">Analytics & Performance</div>
                      <div className="text-[11px] text-gray-500">Help us measure latency and page performance</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                        preferences.analytics ? 'bg-[#0066FF]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          preferences.analytics ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Functional */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-150">
                    <div>
                      <div className="font-semibold text-gray-900">Personalized Insights</div>
                      <div className="text-[11px] text-gray-500">Remembers your currency and region preferences</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreferences(prev => ({ ...prev, functional: !prev.functional }))}
                      className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                        preferences.functional ? 'bg-[#0066FF]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                          preferences.functional ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-bold text-xs sm:text-[13px] transition-all shadow-[0_4px_14px_rgba(0,102,255,0.3)] hover:shadow-[0_6px_20px_rgba(0,102,255,0.45)] active:scale-95 cursor-pointer text-center"
                >
                  Accept all cookies
                </button>

                {showPreferences ? (
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="py-2.5 px-3.5 rounded-xl bg-gray-900 hover:bg-black text-white font-sans font-bold text-xs transition-all active:scale-95 cursor-pointer"
                  >
                    Save settings
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="py-2.5 px-3.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-sans font-medium text-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-gray-500" />
                    Customize
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 px-1 pt-1">
                <button
                  type="button"
                  onClick={handleDeclineNonEssential}
                  className="hover:text-gray-900 underline transition-colors cursor-pointer"
                >
                  Reject optional
                </button>
                <span>Read our Privacy Notice</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
