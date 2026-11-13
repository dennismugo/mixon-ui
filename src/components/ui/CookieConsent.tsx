import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
}

const STORAGE_KEY = 'mixon_cookie_consent_v1';

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,
  functional: true,
};

export const CookieConsent: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const openedByUserRef = useRef(false);

  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        const timer = window.setTimeout(() => {
          openedByUserRef.current = false;
          setIsOpen(true);
        }, 1200);
        return () => window.clearTimeout(timer);
      }
      const parsed = JSON.parse(saved);
      if (parsed) setPreferences(parsed);
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Open settings directly when triggered from Footer "Cookie Preferences"
  useEffect(() => {
    const handleOpenCookies = () => {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      openedByUserRef.current = true;
      setShowPreferences(true);
      setIsOpen(true);
    };
    window.addEventListener('mixon:open-cookies', handleOpenCookies);
    return () => window.removeEventListener('mixon:open-cookies', handleOpenCookies);
  }, []);

  // Sync native non-modal <dialog> state without blocking the page behind it
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    if (!dialog.open) {
      dialog.show();
    }
    if (openedByUserRef.current) {
      const firstControl = dialog.querySelector<HTMLElement>('button');
      firstControl?.focus();
    }
  }, [isOpen, showPreferences]);

  const persistAndClose = (nextPreferences: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
    } catch {
      // Ignore storage quota or private-mode restrictions
    }
    setPreferences(nextPreferences);
    setShowPreferences(false);
    setIsOpen(false);
    if (openedByUserRef.current && previousFocusRef.current?.isConnected) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
    openedByUserRef.current = false;
  };

  const handleAcceptAll = () => {
    persistAndClose({ essential: true, analytics: true, functional: true });
  };

  const handleRejectAll = () => {
    persistAndClose({ essential: true, analytics: false, functional: false });
  };

  const handleSaveCustom = () => {
    persistAndClose({ ...preferences, essential: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleRejectAll();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.dialog
          ref={dialogRef}
          aria-labelledby={showPreferences ? 'cookie-settings-heading' : undefined}
          aria-label={showPreferences ? undefined : 'Cookie consent'}
          onKeyDown={handleKeyDown}
          initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-auto left-3 right-3 sm:right-auto bottom-3 sm:bottom-6 sm:left-6 z-[80] m-0 p-0 border-0 bg-transparent sm:w-[372px] max-w-[calc(100vw-1.5rem)] text-left shadow-none"
        >
          <div className="rounded-none border border-[#213663] bg-[#0E1B36] p-5 sm:p-6 text-white shadow-[0_22px_54px_rgba(4,18,43,0.45)]">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-3 mb-2.5">
              {showPreferences ? (
                <h2
                  id="cookie-settings-heading"
                  className="font-sans text-[15px] font-bold text-white tracking-tight"
                >
                  Cookies Settings
                </h2>
              ) : (
                <span aria-hidden="true" />
              )}

              <button
                type="button"
                onClick={handleRejectAll}
                aria-label="Close cookie notice"
                className="inline-flex h-8 w-8 items-center justify-center rounded-none text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] -mt-1 -mr-1"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {!showPreferences ? (
              <>
                <p className="font-sans text-[13.5px] sm:text-[14px] leading-[1.55] text-slate-100 mb-5">
                  By clicking “Accept All Cookies”, you agree to the storing of cookies on your
                  device to enhance site navigation, analyse site usage, and assist in our
                  marketing efforts.
                </p>

                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="w-full rounded-none bg-white hover:bg-[#EAF2FF] text-[#0E1B36] border border-white font-sans font-bold text-[13.5px] py-2.5 px-4 text-center transition-colors cursor-pointer active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Accept All Cookies
                  </button>

                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="w-full rounded-none bg-white hover:bg-[#EAF2FF] text-[#0E1B36] border border-white font-sans font-bold text-[13.5px] py-2.5 px-4 text-center transition-colors cursor-pointer active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Reject All
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPreferences(true)}
                    className="w-full rounded-none bg-white hover:bg-[#EAF2FF] text-[#0E1B36] border border-white font-sans font-bold text-[13.5px] py-2.5 px-4 text-center transition-colors cursor-pointer active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Cookies Settings
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#04122B]/80 p-3">
                    <div>
                      <div className="font-semibold text-white">Essential Cookies</div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Required for security &amp; core routing
                      </div>
                    </div>
                    <span className="shrink-0 rounded-md border border-[#38BDF8]/30 bg-[#0066FF]/20 px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[#93C5FD]">
                      Always Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#04122B]/80 p-3">
                    <div>
                      <div id="cookie-analytics-label" className="font-semibold text-white">
                        Analytics &amp; Performance
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Measures latency and site usage
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences.analytics}
                      aria-labelledby="cookie-analytics-label"
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full border border-white/25 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                        preferences.analytics ? 'bg-[#0066FF]' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-4 w-4 rounded-full bg-white shadow-xs transition-transform ${
                          preferences.analytics ? 'translate-x-5.5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-[#04122B]/80 p-3">
                    <div>
                      <div id="cookie-functional-label" className="font-semibold text-white">
                        Functional Cookies
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Remembers preferences and workspace region
                      </div>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={preferences.functional}
                      aria-labelledby="cookie-functional-label"
                      onClick={() =>
                        setPreferences((prev) => ({ ...prev, functional: !prev.functional }))
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full border border-white/25 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                        preferences.functional ? 'bg-[#0066FF]' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`block h-4 w-4 rounded-full bg-white shadow-xs transition-transform ${
                          preferences.functional ? 'translate-x-5.5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="w-full rounded-none bg-white hover:bg-[#EAF2FF] text-[#0E1B36] border border-white font-sans font-bold text-[13.5px] py-2.5 px-4 text-center transition-colors cursor-pointer active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Save Preferences
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPreferences(false)}
                    className="w-full rounded-none border border-white/25 bg-transparent hover:bg-white/10 text-white font-sans font-semibold text-[13px] py-2 px-4 text-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
