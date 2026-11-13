import React from 'react';
import { ArrowUpRight, Instagram, Facebook, Linkedin } from 'lucide-react';
import mixonLogoWhite from '../assets/mixon_logo_white.png';
import { AppLink } from './AppLink';
import { PageId } from '../seo/mixonSeo';

interface FooterUpperProps {
  setCurrentPage: (page: PageId) => void;
  setShowCookieConsent?: (show: boolean) => void;
  setShowCookieCustomize?: (show: boolean) => void;
}

export default function FooterUpper({
  setCurrentPage,
  setShowCookieConsent,
  setShowCookieCustomize,
}: FooterUpperProps) {
  const handleNav = (page: PageId, hash?: string) => {
    setCurrentPage(page);
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto pt-14 sm:pt-16 lg:pt-20 pb-5 sm:pb-6 lg:pb-7 text-left font-sans select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* =================================================================== */}
        {/* LEFT COLUMN: BRAND, TAGLINE, CTA & CREDIBILITY NOTE                 */}
        {/* =================================================================== */}
        <div className="lg:col-span-3 xl:col-span-3 space-y-6 sm:space-y-7">
          {/* Brand Logo */}
          <div className="flex items-center">
            <AppLink page="home" onNavigate={(p) => handleNav(p)} className="inline-flex items-center">
              <img 
                src={mixonLogoWhite} 
                alt="Mixon" 
                className="h-7 sm:h-8 w-auto object-contain cursor-pointer transition-opacity hover:opacity-90"
              />
            </AppLink>
          </div>

          {/* Mission Tagline */}
          <h3 className="text-white text-lg sm:text-[21px] font-sans font-medium tracking-tight leading-snug max-w-[270px]">
            Software for the business you&apos;re building.
          </h3>

          {/* "Start a conversation" Pill Button */}
          <div>
            <AppLink
              page="contact"
              onNavigate={(p) => handleNav(p)}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-white/20 hover:border-white/40 bg-white/[0.04] hover:bg-white/[0.08] text-white text-[13px] font-medium tracking-tight transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </AppLink>
          </div>

          {/* Experience Subtext */}
          <p className="text-slate-400 text-xs sm:text-[13px] font-sans font-light leading-relaxed max-w-[280px]">
            Mixon builds on the experience of Shiva Softwares Africa.
          </p>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMNS: 5 COLUMN REAL WEBSITE CONTENT GRID                   */}
        {/* =================================================================== */}
        <div className="lg:col-span-9 xl:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 sm:gap-6 lg:gap-8">
          
          {/* Column 1: Products (Real Mixon Platform Products) */}
          <div className="space-y-4">
            <h4 className="text-white text-[13.5px] sm:text-[14px] font-sans font-semibold tracking-normal">
              Products
            </h4>
            <ul className="space-y-3 text-[13px] font-sans font-normal text-slate-300/85">
              <li>
                <AppLink 
                  page="mirentals"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  miRentals — Rentals
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="mireserve"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  miReserve — Stays
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="eventyetu"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Event Yetu — Ticketing
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="mipos"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  miPos — Retail POS
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="pricing"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Pricing &amp; Plans
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Column 2: Services (Real Mixon Dedicated Services) */}
          <div className="space-y-4">
            <h4 className="text-white text-[13.5px] sm:text-[14px] font-sans font-semibold tracking-normal">
              Services
            </h4>
            <ul className="space-y-3 text-[13px] font-sans font-normal text-slate-300/85">
              <li>
                <AppLink 
                  page="service-web"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Web Design &amp; Dev
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="service-app"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  App Development &amp; USSD
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="service-payments"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Payments &amp; Integrations
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="service-ai"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  AI &amp; Automation
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="service-ecommerce"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  E-Commerce Stores
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="service-seo"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  SEO &amp; Growth
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions (Real Industry Use Cases) */}
          <div className="space-y-4">
            <h4 className="text-white text-[13.5px] sm:text-[14px] font-sans font-semibold tracking-normal">
              Solutions
            </h4>
            <ul className="space-y-3 text-[13px] font-sans font-normal text-slate-300/85">
              <li>
                <AppLink 
                  page="mirentals"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Property &amp; Real Estate
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="mireserve"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Boutique Hotels &amp; Stays
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="eventyetu"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Gate Access &amp; Events
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="mipos"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Retailers &amp; Wholesalers
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="service-payments"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  M-Pesa Auto-Settlement
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="services"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block text-[#38bdf8] hover:text-white"
                >
                  All Solutions Directory →
                </AppLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Company (Real Mixon Company Pages & Legal) */}
          <div className="space-y-4">
            <h4 className="text-white text-[13.5px] sm:text-[14px] font-sans font-semibold tracking-normal">
              Company
            </h4>
            <ul className="space-y-3 text-[13px] font-sans font-normal text-slate-300/85">
              <li>
                <AppLink 
                  page="about"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  About Mixon
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="services"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  How We Work
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="home"
                  hash="#faq"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Frequently Asked Questions
                </AppLink>
              </li>
              <li>
                <AppLink 
                  page="book-demo"
                  onNavigate={(p) => handleNav(p)} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Book a Demo
                </AppLink>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  AI Reference (llms.txt)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Let's talk (Real Mixon Contacts & Social Channels) */}
          <div className="space-y-4">
            <h4 className="text-white text-[13.5px] sm:text-[14px] font-sans font-semibold tracking-normal">
              Let&apos;s talk
            </h4>
            <ul className="space-y-2.5 text-[13px] font-sans font-normal text-slate-300/85">
              <li>
                <a 
                  href="mailto:info@mixonsoftwares.co.ke" 
                  className="hover:text-white transition-colors cursor-pointer block"
                >
                  info@mixonsoftwares.co.ke
                </a>
              </li>
              <li className="pt-0.5">
                <a 
                  href="tel:+254713958492" 
                  className="hover:text-white transition-colors cursor-pointer block font-mono text-[12.5px] tracking-tight"
                >
                  +254 713 958 492
                </a>
              </li>
              <li>
                <a 
                  href="tel:+254741733878" 
                  className="hover:text-white transition-colors cursor-pointer block font-mono text-[12.5px] tracking-tight"
                >
                  +254 741 733 878
                </a>
              </li>

              {/* Social Channels matching reference styling */}
              <li className="pt-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-slate-300/90"
                >
                  <Instagram className="w-3.5 h-3.5 shrink-0" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-slate-300/90"
                >
                  <Facebook className="w-3.5 h-3.5 shrink-0" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-slate-300/90"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>X</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-slate-300/90"
                >
                  <Linkedin className="w-3.5 h-3.5 shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* =================================================================== */}
      {/* SUB-BAR: DIVIDER LINE, COPYRIGHT, PRIVACY NOTICE & CREDITS          */}
      {/* =================================================================== */}
      <div className="mt-12 sm:mt-14 pt-6 sm:pt-7 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-400 gap-4">
        <p className="text-slate-400/90 text-xs font-normal">
          Copyright 2026 Mixon. All rights reserved.
        </p>
        <div className="flex items-center gap-6 sm:gap-8 text-xs font-normal">
          <AppLink
            page="about"
            hash="#security"
            onNavigate={(p) => handleNav(p)}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Notice
          </AppLink>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('mixon:open-cookies'))}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cookie Preferences
          </button>
        </div>
      </div>

    </div>
  );
}
