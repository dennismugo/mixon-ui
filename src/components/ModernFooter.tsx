import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Github, 
  ShieldCheck, 
  Check, 
  Radio, 
  ExternalLink,
  Sparkles,
  Lock
} from 'lucide-react';
import RollingButtonText from './RollingButtonText';
import HeroWaterBackground from './HeroWaterBackground';
import mixonLogoWhite from '../assets/mixon_logo_white.png';

interface ModernFooterProps {
  setCurrentPage: (page: any) => void;
  setShowCookieConsent: (show: boolean) => void;
  setShowCookieCustomize: (show: boolean) => void;
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  newsletterSuccess: boolean;
  handleNewsletterSubmit: (e: React.FormEvent) => Promise<void>;
}

// Intersection Crosshair Dot Component for Blueprint Aesthetic
const CrosshairDot = ({ className = '' }: { className?: string }) => (
  <div className={`absolute flex items-center justify-center pointer-events-none select-none z-20 ${className}`}>
    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
    <span className="absolute font-mono text-[9px] text-white/40 -top-3.5 left-2 select-none pointer-events-none hidden sm:inline">
      +
    </span>
  </div>
);

export default function ModernFooter({
  setCurrentPage,
  setShowCookieConsent,
  setShowCookieCustomize,
  newsletterEmail,
  setNewsletterEmail,
  newsletterSuccess,
  handleNewsletterSubmit
}: ModernFooterProps) {
  const [wordmarkHovered, setWordmarkHovered] = useState(false);

  return (
    <footer className="w-full bg-[#050608] text-zinc-400 select-none relative overflow-hidden font-sans border-t border-zinc-900">

      {/* ========================================================================= */}
      {/* 1. PRE-FOOTER CALL TO ACTION BANNER (CONTEXT.DEV BLUEPRINT WATER STYLE) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden border-b border-dashed border-zinc-800 bg-[#07132e]">
        
        {/* Animated Caustics & Water Ripples Background */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden opacity-90">
          <div 
            className="absolute inset-0 bg-cover bg-bottom opacity-40 mix-blend-screen"
            style={{ backgroundImage: 'url(/hero-water-still.webp)' }}
          />
          <HeroWaterBackground />
          {/* Deep Sapphire Atmospheric Vignette Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(7,19,46,0.3) 0%, rgba(5,6,8,0.85) 85%, #050608 100%)'
            }}
          />
        </div>

        {/* Outer Blueprint Container with Dashed Grid Frame & Crosshair Markers */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 z-10">
          
          {/* Blueprint Inner Bounding Box */}
          <div className="relative border border-dashed border-white/25 rounded-none p-8 sm:p-14 lg:p-16 text-center backdrop-blur-xs bg-black/20">
            
            {/* 4 Corner Crosshairs */}
            <CrosshairDot className="-top-1 -left-1" />
            <CrosshairDot className="-top-1 -right-1" />
            <CrosshairDot className="-bottom-1 -left-1" />
            <CrosshairDot className="-bottom-1 -right-1" />

            {/* Midpoint Grid Indicators */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/70 rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-white/70 rounded-full" />

            {/* Centered Main Headline matching Image 1 layout */}
            <h2 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
              <span>Ship an enterprise that actually </span>
              <br className="hidden sm:inline" />
              <span className="font-serif italic text-cyan-300 font-light drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]">
                runs sovereign.
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="mt-5 text-sm sm:text-base lg:text-[17px] text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
              Autonomous infrastructure for rental leases, BnB stays, gate passes, and retail ledgers. Zero upfront hardware cost, live in 10 minutes.
            </p>

            {/* Dual Pill CTA Buttons matching Reference Design */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary White Button */}
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="group relative inline-flex items-center justify-center h-12 px-8 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-sm font-semibold tracking-tight transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.35)] hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <RollingButtonText text="Get API Access" />
              </button>

              {/* Secondary Frosted Pill Button */}
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="group relative inline-flex items-center justify-center h-12 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-medium tracking-tight backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <RollingButtonText text="Book a call" />
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN FOOTER CONTENT WITH PRECISION BLUEPRINT GRID GUIDELINES */}
      {/* ========================================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 z-10">

        {/* Blueprint Framing Lines (Vertical Guideline overlay) */}
        <div className="absolute inset-y-0 left-4 sm:left-6 lg:left-8 w-px border-l border-dashed border-zinc-800/60 pointer-events-none" />
        <div className="absolute inset-y-0 right-4 sm:right-6 lg:right-8 w-px border-r border-dashed border-zinc-800/60 pointer-events-none" />

        {/* UPPER ROW: BRAND / ACCREDITATION ON LEFT + COMPLIANCE & STATUS ON RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12 border-b border-dashed border-zinc-800 relative">
          
          <CrosshairDot className="-bottom-1 -left-1" />
          <CrosshairDot className="-bottom-1 -right-1" />

          {/* Left Brand Area */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Accreditation Badge matching Image 1 ("Backed by Y Combinator" style) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800/90 shadow-xs">
              <div className="w-5 h-5 rounded-sm bg-[#FF6600] flex items-center justify-center text-white font-mono font-black text-xs">
                Y
              </div>
              <span className="text-[11px] font-sans font-semibold text-zinc-200 tracking-tight">
                Backed by <strong>Y Combinator</strong> &amp; Sovereign Tech Fund
              </span>
            </div>

            {/* Mission / Tagline */}
            <div className="space-y-1">
              <h4 className="text-white text-base sm:text-lg font-semibold tracking-tight">
                Autonomous data infrastructure for modern commerce.
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-lg">
                Automate rent, stays, event gates, and store ledgers. Get real-time audits and instant reconciliation.
              </p>
            </div>

            {/* Social Media Link Pills */}
            <div className="flex items-center gap-2 pt-1">
              <a 
                href="mailto:ibrahellamixon@gmail.com" 
                aria-label="Email Mixon"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Compliance & System Status Badge Area matching Image 1 */}
          <div className="lg:col-span-5 flex flex-col lg:items-end justify-between space-y-4">
            
            {/* Circular SOC 2 Type II Compliance Seal Badge */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full border border-dashed border-zinc-700 bg-zinc-950 flex flex-col items-center justify-center text-center shadow-inner group cursor-default">
                <span className="text-[6px] font-mono tracking-widest text-zinc-500 uppercase leading-none">COMPLIANT</span>
                <span className="text-[10px] font-mono font-bold text-white tracking-wider leading-tight">SOC 2</span>
                <span className="text-[6px] font-mono text-zinc-400 leading-none">TYPE II</span>
                <div className="absolute inset-0 rounded-full border border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
              </div>
              <div className="text-left lg:text-right space-y-0.5">
                <div className="flex items-center gap-1.5 lg:justify-end text-xs font-semibold text-zinc-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>SOC 2 Type II certified</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono">
                  Continuous cryptographic audit logs
                </p>
              </div>
            </div>

            {/* Live Operational Status Pill matching Image 1 */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-zinc-200">All systems operational</span>
              <span className="text-[10px] text-zinc-500 font-normal">● 14ms latency</span>
            </div>

          </div>

        </div>

        {/* NAVIGATION LINKS GRID (4 COLUMNS EXACTLY LIKE CONTEXT.DEV REFERENCE) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-left pt-12 pb-14 border-b border-dashed border-zinc-800 relative">
          
          <CrosshairDot className="-bottom-1 -left-1" />
          <CrosshairDot className="-bottom-1 -right-1" />

          {/* Column 1: Product */}
          <div className="space-y-3.5">
            <h5 className="font-mono text-xs font-bold text-white tracking-widest uppercase">
              Product
            </h5>
            <ul className="space-y-2 text-xs font-normal">
              <li>
                <button 
                  onClick={() => setCurrentPage('mirentals')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Mixon for Rentals
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('mireserve')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Mixon for Hospitality
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('eventyetu')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Mixon for Events &amp; Gates
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('mipos')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Mixon for Retail POS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('pricing')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Pricing &amp; Plans
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div className="space-y-3.5">
            <h5 className="font-mono text-xs font-bold text-white tracking-widest uppercase">
              Developers
            </h5>
            <ul className="space-y-2 text-xs font-normal">
              <li>
                <a href="#api" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Documentation &amp; SDKs
                </a>
              </li>
              <li>
                <a href="#playground" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  M-Pesa Ledger Playground
                </a>
              </li>
              <li>
                <a href="#mcp" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  MCP Server &amp; Connectors
                </a>
              </li>
              <li>
                <a href="#cli" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Mixon CLI &amp; Edge Daemon
                </a>
              </li>
              <li>
                <a href="#changelog" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Changelog &amp; Releases
                </a>
              </li>
              <li>
                <span className="text-zinc-600 select-none">
                  Hardware Nodes (Alpha)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3.5">
            <h5 className="font-mono text-xs font-bold text-white tracking-widest uppercase">
              Resources
            </h5>
            <ul className="space-y-2 text-xs font-normal">
              <li>
                <button 
                  onClick={() => setCurrentPage('about')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Autonomous Architecture
                </button>
              </li>
              <li>
                <a href="#security" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Trust &amp; Security Whitepaper
                </a>
              </li>
              <li>
                <a href="#benchmarks" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  HTTP Error Codes &amp; SLAs
                </a>
              </li>
              <li>
                <a href="#startups" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Startups &amp; Grants Program
                </a>
              </li>
              <li>
                <a href="#glossary" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Property Tech Glossary
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-3.5">
            <h5 className="font-mono text-xs font-bold text-white tracking-widest uppercase">
              Company
            </h5>
            <ul className="space-y-2 text-xs font-normal">
              <li>
                <button 
                  onClick={() => setCurrentPage('about')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  About Mixon
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('about')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Executive Leadership
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('contact')} 
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Brief Our Engineers
                </button>
              </li>
              <li>
                <a href="#careers" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Careers &amp; Node Operations
                </a>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setShowCookieConsent(true);
                    setShowCookieCustomize(true);
                  }}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-left hover:translate-x-0.5 inline-block"
                >
                  Cookie Preferences
                </button>
              </li>
              <li>
                <a href="#brand" className="text-zinc-400 hover:text-white transition-colors cursor-pointer hover:translate-x-0.5 inline-block">
                  Request Brand Assets
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* NEWSLETTER ROW (MODERN MINIMALIST ARCHITECTURAL INPUT) */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-dashed border-zinc-800 text-left">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block">
              Subscribe to platform releases
            </span>
            <p className="text-xs text-zinc-400">
              Get weekly updates on edge firmware, ledger sync algorithms, and security advisories.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full max-w-md">
              <input 
                type="email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="developer@company.com" 
                className="bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-cyan-400/80 rounded-none px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none transition-all duration-200 w-full sm:w-72"
                required
              />
              <button 
                type="submit" 
                className="bg-white hover:bg-zinc-200 text-zinc-950 font-sans font-semibold px-4 py-2.5 rounded-none text-xs transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-1.5 active:scale-98"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <AnimatePresence>
              {newsletterSuccess && (
                <motion.p 
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-emerald-400 font-mono text-[10px] tracking-wider uppercase font-bold mt-2"
                >
                  ✓ Subscribed successfully. Check your inbox.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* COPYRIGHT & LEGAL ROW EXACTLY LIKE CONTEXT.DEV REFERENCE */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 text-[11px] font-mono tracking-wider text-zinc-400 gap-4">
          <div>
            <span>© {new Date().getFullYear()} Mixon.ai. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-300">
            <span>Built with</span>
            <span className="text-cyan-400">💙</span>
            <span>in Nairobi &amp; San Francisco</span>
          </div>

          <div className="flex items-center gap-5 text-zinc-400">
            <button 
              onClick={() => {
                setShowCookieConsent(true);
                setShowCookieCustomize(false);
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
            <span>•</span>
            <button 
              onClick={() => setCurrentPage('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              DPA
            </button>
            <span>•</span>
            <button 
              onClick={() => setCurrentPage('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <span>•</span>
            <a href="#security" className="hover:text-white transition-colors cursor-pointer">
              Security
            </a>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MONUMENTAL ARCHITECTURAL WORDMARK (DASHED BLUEPRINT OUTLINE + SOLID .AI) */}
      {/* ========================================================================= */}
      <div 
        className="w-full relative overflow-hidden select-none border-t border-zinc-900 bg-gradient-to-b from-[#050608] to-[#020204] py-8 sm:py-12 flex items-center justify-center cursor-default group"
        onMouseEnter={() => setWordmarkHovered(true)}
        onMouseLeave={() => setWordmarkHovered(false)}
      >
        
        {/* Subtle grid mesh backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Luminous blue ambient glow behind the wordmark that blooms on hover */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(0, 102, 255, 0.45) 0%, rgba(56, 189, 248, 0.15) 40%, transparent 70%)'
          }}
        />

        {/* Large SVG Rendering for the Monumental Wordmark */}
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex items-baseline justify-between overflow-hidden">
          
          <svg 
            viewBox="0 0 1200 240" 
            className="w-full h-auto overflow-visible select-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="solidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>
            </defs>

            {/* Corner registration brackets around the wordmark for blueprint feeling */}
            <path d="M 10 30 L 10 10 L 30 10" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
            <path d="M 1190 30 L 1190 10 L 1170 10" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
            <path d="M 10 210 L 10 230 L 30 230" stroke="#3f3f46" strokeWidth="1.5" fill="none" />
            <path d="M 1190 210 L 1190 230 L 1170 230" stroke="#3f3f46" strokeWidth="1.5" fill="none" />

            {/* "mixon" in Precision Blueprint Dashed Outline */}
            <text
              x="30"
              y="180"
              fontFamily="var(--font-display, 'Cabinet Grotesk', system-ui, sans-serif)"
              fontSize="210"
              fontWeight="900"
              letterSpacing="-0.04em"
              fill="none"
              stroke={wordmarkHovered ? '#38bdf8' : '#52525b'}
              strokeWidth="2.5"
              strokeDasharray="10 8"
              strokeDashoffset={wordmarkHovered ? '24' : '0'}
              className="transition-all duration-700 ease-out"
              style={{
                filter: wordmarkHovered ? 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.6))' : 'none'
              }}
            >
              mixon
            </text>

            {/* Solid Luminous White ".ai" with Cyan geometric accent emblem */}
            <text
              x="760"
              y="180"
              fontFamily="var(--font-serif, 'Playfair Display', Georgia, serif)"
              fontSize="210"
              fontStyle="italic"
              fontWeight="400"
              letterSpacing="-0.03em"
              fill="url(#solidGradient)"
              className="drop-shadow-[0_8px_30px_rgba(255,255,255,0.4)]"
            >
              .ai
            </text>

            {/* Mixon Geometric Floating Emblem Accent hovering right above the dot of the "i" */}
            <g transform="translate(1040, 20) scale(0.65)" className="animate-pulse">
              <polygon 
                points="30,5 55,50 5,50" 
                fill="url(#neonCyan)"
                className="filter drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]"
              />
            </g>
          </svg>

        </div>

      </div>

    </footer>
  );
}
