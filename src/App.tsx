/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  Home as HomeIcon,
  Ticket,
  Menu,
  X,
  Check,
  ChevronDown,
  Globe,
  Building2,
  Calendar,
  Users,
  FileText,
  Layers,
  Code2,
  Smartphone,
  Search,
  TrendingUp,
  CreditCard,
  ShoppingBag
} from 'lucide-react';

import { Lead } from './types';

// Eager Home for fast initial render; lazy-load secondary routes
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const MiRentals = lazy(() => import('./pages/MiRentals'));
const MiReserve = lazy(() => import('./pages/MiReserve'));
const EventYetu = lazy(() => import('./pages/EventYetu'));
const MiPos = lazy(() => import('./pages/MiPos'));
const Pricing = lazy(() => import('./pages/Pricing'));
const BookDemo = lazy(() => import('./pages/BookDemo'));
const DemoTracker = lazy(() => import('./pages/DemoTracker'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const WebService = lazy(() => import('./pages/services/WebService'));
const AppService = lazy(() => import('./pages/services/AppService'));
const SeoService = lazy(() => import('./pages/services/SeoService'));
const PaymentsService = lazy(() => import('./pages/services/PaymentsService'));
const EcommerceService = lazy(() => import('./pages/services/EcommerceService'));
const AiService = lazy(() => import('./pages/services/AiService'));

import FooterUpper from './components/FooterUpper';
import HalftoneWordmarkFooter from './components/ui/halftone-wordmark-footer';
import mixonLogo from './assets/mixon_logo_mark.png';
import RollingButtonText from './components/RollingButtonText';
import { NavShowcaseCard } from './components/NavShowcaseCard';
import { AntiMetalButton } from './components/ui/anti-metal-button';
import { ExpandingArrowButton } from './components/ui/expanding-arrow-button';
import TextRevealPreloader from './components/ui/TextRevealPreloader';
import CookieConsent from './components/ui/CookieConsent';
import WhatsAppBot from './components/ui/WhatsAppBot';
import { initSmoothScroll, destroySmoothScroll, getLenis } from './utils/smoothScroll';
import { setupPageScrollReveals } from './utils/scrollAnimations';
import { AppLink } from './components/AppLink';
import { SeoHeadManager } from './components/SeoHeadManager';
import { getPageFromPathname, getRoutePath, PageId } from './seo/mixonSeo';

// Modern luxury spring reveal variants for mega dropdowns
const dropdownMenuVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.96,
    rotateX: -6,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 28,
      mass: 0.8,
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.97,
    rotateX: -3,
    filter: 'blur(4px)',
    pointerEvents: 'none' as const,
    transition: {
      duration: 0.14,
      ease: [0.32, 0, 0.67, 0] as any,
    },
  },
};

const dropdownItemVariants = {
  hidden: {
    opacity: 0,
    x: -8,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 30,
    },
  },
};

const dropdownShowcaseVariants = {
  hidden: {
    opacity: 0,
    scale: 0.93,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 360,
      damping: 26,
      delay: 0.04,
    },
  },
};

// Services Data mapping directly to dedicated service pages
const servicesData = [
  {
    id: 'service-web',
    title: 'Web Design & Development',
    tag: 'Next-Gen Web Architecture',
    desc: 'Fast, clean websites built to win customer trust.',
    icon: Code2,
    iconBg: 'bg-blue-50/80 border-blue-150/70 text-[#0066FF]',
    hoverBg: 'group-hover/item:bg-blue-100/70',
  },
  {
    id: 'service-app',
    title: 'App Development & USSD',
    tag: 'Mobile Engineering & USSD',
    desc: 'Simple mobile apps and fast USSD menus for anyone.',
    icon: Smartphone,
    iconBg: 'bg-indigo-50/80 border-indigo-150/70 text-[#4f46e5]',
    hoverBg: 'group-hover/item:bg-indigo-100/70',
  },
  {
    id: 'service-seo',
    title: 'SEO & Digital Marketing',
    tag: 'Search & Generative AEO/GEO',
    desc: 'Help people find you first on Google and AI search.',
    icon: Search,
    iconBg: 'bg-emerald-50/80 border-emerald-150/70 text-[#059669]',
    hoverBg: 'group-hover/item:bg-emerald-100/70',
  },
  {
    id: 'service-payments',
    title: 'Payments & Integrations',
    tag: 'M-Pesa Rails & Custom APIs',
    desc: 'Send M-Pesa, card, and bank payments into your books.',
    icon: CreditCard,
    iconBg: 'bg-sky-50/80 border-sky-150/70 text-[#0284c7]',
    hoverBg: 'group-hover/item:bg-sky-100/70',
  },
  {
    id: 'service-ecommerce',
    title: 'E-Commerce Development',
    tag: 'High-Velocity Commerce',
    desc: 'Online stores with live stock and smooth checkout.',
    icon: ShoppingBag,
    iconBg: 'bg-rose-50/80 border-rose-150/70 text-[#e11d48]',
    hoverBg: 'group-hover/item:bg-rose-100/70',
  },
  {
    id: 'service-ai',
    title: 'AI & Process Automation',
    tag: 'Intelligent Workflows',
    desc: 'Automate busywork with practical AI for your team.',
    icon: Sparkles,
    iconBg: 'bg-amber-50/80 border-amber-150/70 text-[#d97706]',
    hoverBg: 'group-hover/item:bg-amber-100/70',
  },
];

export default function App() {
  // Helper to parse page from URL
  const getPageFromPath = (): PageId => {
    if (typeof window === 'undefined') return 'home';
    const matched = getPageFromPathname(window.location.pathname);
    if (matched) return matched;
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    if (path === 'service-web') return 'service-web';
    if (path === 'service-app') return 'service-app';
    if (path === 'service-seo') return 'service-seo';
    if (path === 'service-payments') return 'service-payments';
    if (path === 'service-ecommerce') return 'service-ecommerce';
    if (path === 'service-ai') return 'service-ai';
    if (path === 'mi-rentals' || path === 'rentals') return 'mirentals';
    if (path === 'mi-reserve' || path === 'reserve') return 'mireserve';
    if (path === 'event-yetu' || path === 'events') return 'eventyetu';
    if (path === 'mi-pos' || path === 'pos') return 'mipos';
    if (path === 'demo' || path === 'book-a-demo') return 'book-demo';
    return 'home';
  };

  const getInitialDemoPreset = () => {
    if (typeof window === 'undefined') return {};
    const params = new URLSearchParams(window.location.search);
    return {
      product: params.get('product') || undefined,
      service: params.get('service') || undefined,
    };
  };

  const [currentPage, setCurrentPageState] = useState<PageId>(() => getPageFromPath());
  const [demoPreset, setDemoPreset] = useState<{ product?: string; service?: string }>(() =>
    getInitialDemoPreset(),
  );

  const setCurrentPage = (
    page: PageId,
    options?: { product?: string; service?: string },
  ) => {
    setCurrentPageState(page);
    if (page === 'book-demo' && (options?.product || options?.service)) {
      setDemoPreset({ product: options.product, service: options.service });
    } else if (page !== 'book-demo') {
      setDemoPreset({});
    }
    const basePath = getRoutePath(page);
    const search =
      page === 'book-demo' && options?.product
        ? `?product=${encodeURIComponent(options.product)}`
        : '';
    const targetUrl = `${basePath}${search}`;

    if (`${window.location.pathname}${window.location.search}` !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
  };

  const handleAnchorNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    handler: () => void,
  ) => {
    if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      handler();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPageState(getPageFromPath());
      setDemoPreset(getInitialDemoPreset());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [scrolled, setScrolled] = useState(false);
  const [leadRefresh, setLeadRefresh] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Unified Desktop Dropdown Hover State Controller (Zero conflict, instant cross-nav switching)
  type ActiveDropdown = 'products' | 'services' | null;
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openDropdown = (menu: 'products' | 'services') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const closeDropdownWithDelay = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const cancelClose = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const closeDropdownImmediately = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(null);
  };

  const handleSelectProduct = (page: typeof currentPage) => {
    closeDropdownImmediately();
    setCurrentPage(page);
  };

  const handleSelectService = (page: typeof currentPage = 'contact') => {
    closeDropdownImmediately();
    setCurrentPage(page);
  };

  // Lead capture feedback notification
  const [showNotification, setShowNotification] = useState(false);
  const [recentLeadName, setRecentLeadName] = useState('');

  // Newsletter state and handler
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    
    setNewsletterSuccess(true);
    const emailToSubmit = newsletterEmail;
    setNewsletterEmail('');

    try {
      await fetch('https://formsubmit.co/ajax/ibrahellamixon@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Mixon.ai Newsletter Subscriber`,
          email: emailToSubmit
        }),
      });
    } catch (err) {
      console.error("Newsletter email submit error:", err);
    }

    setTimeout(() => {
      setNewsletterSuccess(false);
    }, 5000);
  };

  // Initialize Lenis smooth scrolling (synced with GSAP ticker & ScrollTrigger)
  useEffect(() => {
    initSmoothScroll();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  useEffect(() => {
    let lastScrolled = window.scrollY > 15;
    const handleScroll = () => {
      const isPast = window.scrollY > 15;
      if (isPast !== lastScrolled) {
        lastScrolled = isPast;
        setScrolled(isPast);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
    setMobileMenuOpen(false);
  }, [currentPage]);

  // Rebuild scroll triggers whenever the active page changes (supports lazy-loaded routes)
  useEffect(() => {
    let cleanupReveals: () => void = () => {};
    let setupTimer = 0;
    let observer: MutationObserver | null = null;
    let mountedPage: HTMLElement | null = null;

    const attach = () => {
      const page = document.querySelector<HTMLElement>(
        'main .mixon-home-page, main .mixon-interior-page'
      );
      if (!page || page === mountedPage) return false;
      mountedPage = page;
      observer?.disconnect();
      observer = null;
      setupTimer = window.setTimeout(() => {
        cleanupReveals = setupPageScrollReveals(page, currentPage);
      }, 240);
      return true;
    };

    if (!attach()) {
      const mainEl = document.querySelector('main') || document.body;
      observer = new MutationObserver(() => {
        attach();
      });
      observer.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(setupTimer);
      cleanupReveals();
    };
  }, [currentPage]);

  const handleLeadCaptured = (newLead: Lead) => {
    setRecentLeadName(newLead.name);
    setShowNotification(true);
    setLeadRefresh((prev) => prev + 1);
    setTimeout(() => setShowNotification(false), 8000);
  };

  const renderActivePage = () => {
    const pageContent = (() => {
      switch (currentPage) {
        case 'home':
          return <Home onLeadCaptured={handleLeadCaptured} setCurrentPage={setCurrentPage} leadRefresh={leadRefresh} />;
        case 'about':
          return <About setCurrentPage={setCurrentPage} />;
        case 'mirentals':
          return <MiRentals setCurrentPage={setCurrentPage} />;
        case 'mireserve':
          return <MiReserve setCurrentPage={setCurrentPage} />;
        case 'eventyetu':
          return <EventYetu setCurrentPage={setCurrentPage} />;
        case 'mipos':
          return <MiPos setCurrentPage={setCurrentPage} />;
        case 'services':
          return <Services setCurrentPage={setCurrentPage} />;
        case 'service-web':
          return <WebService setCurrentPage={setCurrentPage} />;
        case 'service-app':
          return <AppService setCurrentPage={setCurrentPage} />;
        case 'service-seo':
          return <SeoService setCurrentPage={setCurrentPage} />;
        case 'service-payments':
          return <PaymentsService setCurrentPage={setCurrentPage} />;
        case 'service-ecommerce':
          return <EcommerceService setCurrentPage={setCurrentPage} />;
        case 'service-ai':
          return <AiService setCurrentPage={setCurrentPage} />;
        case 'pricing':
          return <Pricing setCurrentPage={setCurrentPage} />;
        case 'book-demo':
          return (
            <BookDemo
              onLeadCaptured={handleLeadCaptured}
              setCurrentPage={setCurrentPage}
              initialProduct={demoPreset.product}
              initialService={demoPreset.service}
            />
          );
        case 'demo-tracker':
          return <DemoTracker setCurrentPage={setCurrentPage} />;
        case 'contact':
          return <Contact onLeadCaptured={handleLeadCaptured} setCurrentPage={setCurrentPage} />;
        default:
          return <Home onLeadCaptured={handleLeadCaptured} setCurrentPage={setCurrentPage} leadRefresh={leadRefresh} />;
      }
    })();

    return currentPage === 'home' ? (
      pageContent
    ) : (
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        {pageContent}
      </Suspense>
    );
  };

  const productDropdown = [
    { id: 'mirentals', label: 'miRentals — AI Rentals' },
    { id: 'mireserve', label: 'miReserve — AI Stays' },
    { id: 'eventyetu', label: 'Event Yetu — AI Ticketing' },
    { id: 'mipos', label: 'miPos — AI Retail & POS' }
  ];

  return (
    <div className="min-h-screen text-gray-800 relative bg-[#0E1B36] select-none overflow-x-clip">
      <SeoHeadManager currentPage={currentPage} />
      {/* Framer-inspired Rapid Word Flip Text Reveal Preloader */}
      <TextRevealPreloader />
      
      {/* Fixed Full-Width Edge-to-Edge Header (Smooth border & shadow on scroll) */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 select-none transition-all duration-300 ease-in-out border-b ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-gray-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]' 
            : 'bg-white/90 backdrop-blur-md border-transparent shadow-none'
        }`}
      >
        
        {/* Top Announcement Bar */}
        <div 
          onClick={() => setCurrentPage('about')} 
          className="w-full bg-gradient-to-r from-[#0066FF] via-[#093173] to-[#04122B] text-white text-center text-[11px] sm:text-[13px] font-medium tracking-tight py-1.5 sm:py-2 px-3 sm:px-4 flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-110 select-none shadow-xs"
        >
          <span className="leading-snug">Introducing Mixon: Intelligent software that makes business easier to run</span>
          <span className="font-bold shrink-0">→</span>
        </div>

        {/* Full-Width Navigation Bar */}
        <div className="w-full px-6 sm:px-10 lg:px-14 py-3 sm:py-3.5">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Mixon Brand Logo */}
          <AppLink
            page="home"
            onNavigate={setCurrentPage}
            onMouseEnter={closeDropdownImmediately}
            aria-label="Mixon Home"
            className="cursor-pointer flex items-center group py-0.5"
          >
            <img 
              src={mixonLogo} 
              alt="Mixon" 
              className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </AppLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 nav-md text-gray-700" aria-label="Main Navigation">
            
            {/* Hoverable Products dropdown */}
            <div 
              className="relative py-1.5"
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={closeDropdownWithDelay}
            >
              <button 
                type="button"
                onClick={() => {
                  if (activeDropdown === 'products') {
                    closeDropdownImmediately();
                  } else {
                    openDropdown('products');
                  }
                }}
                className={`hover:text-black focus:outline-none focus-visible:text-[#0066FF] transition-colors cursor-pointer flex items-center gap-1 nav-md ${activeDropdown === 'products' ? 'text-[#0066FF] font-medium' : 'text-gray-700'}`}
                aria-expanded={activeDropdown === 'products'}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180 text-[#0066FF]' : ''}`} />
              </button>
              
              {/* Modern Spring & 3D Blur-Dissolve Dropdown Reveal */}
              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-[45%] pt-8 w-[780px] z-50 pointer-events-auto [perspective:1000px]"
                    onMouseEnter={cancelClose}
                    onMouseLeave={closeDropdownWithDelay}
                  >
                    <motion.div 
                      variants={dropdownMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ transformOrigin: 'top center' }}
                      className="bg-white border border-gray-200 rounded-none p-5 grid grid-cols-12 gap-5 shadow-[0_24px_60px_-12px_rgba(0,102,255,0.16),0_12px_24px_-8px_rgba(0,0,0,0.08)] pointer-events-auto text-left"
                    >
                      {/* Left Column (Items stack with cascading reveal) */}
                      <div className="col-span-7 flex flex-col justify-between space-y-1 pr-1">
                        {/* Item 1: Mixon for Rentals */}
                        <motion.a
                          variants={dropdownItemVariants}
                          href={getRoutePath('mirentals')}
                          onClick={(e) => handleAnchorNavigate(e, () => handleSelectProduct('mirentals'))}
                          className="w-full text-left p-3 rounded-none hover:bg-slate-50/90 transition-all duration-200 flex items-start gap-3.5 group/item cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-none bg-blue-50/80 border border-blue-150/70 flex items-center justify-center shrink-0 text-[#0066FF] shadow-3xs group-hover/item:scale-108 group-hover/item:-rotate-2 group-hover/item:bg-blue-100/70 transition-all duration-300">
                            <Building2 className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="block text-sm font-semibold text-gray-900 leading-tight group-hover/item:text-[#0066FF] transition-colors">
                              Mixon for Rentals
                            </span>
                            <p className="caption-sm text-gray-500 font-normal leading-relaxed">
                              Audit tenant agreements, automate lease payments, and sync M-Pesa ledgers in real time.
                            </p>
                          </div>
                        </motion.a>

                        {/* Item 2: Mixon for Hospitality */}
                        <motion.a
                          variants={dropdownItemVariants}
                          href={getRoutePath('mireserve')}
                          onClick={(e) => handleAnchorNavigate(e, () => handleSelectProduct('mireserve'))}
                          className="w-full text-left p-3 rounded-none hover:bg-slate-50/90 transition-all duration-200 flex items-start gap-3.5 group/item cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-none bg-sky-50/80 border border-sky-150/70 flex items-center justify-center shrink-0 text-[#0284c7] shadow-3xs group-hover/item:scale-108 group-hover/item:-rotate-2 group-hover/item:bg-sky-100/70 transition-all duration-300">
                            <Calendar className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="block text-sm font-semibold text-gray-900 leading-tight group-hover/item:text-[#0066FF] transition-colors">
                              Mixon for Hospitality
                            </span>
                            <p className="caption-sm text-gray-500 font-normal leading-relaxed">
                              Enforce 3PL stay contracts, lock dual calendars, and recover penalty credits owed to you.
                            </p>
                          </div>
                        </motion.a>

                        {/* Item 3: Mixon for Events & Gates */}
                        <motion.a
                          variants={dropdownItemVariants}
                          href={getRoutePath('eventyetu')}
                          onClick={(e) => handleAnchorNavigate(e, () => handleSelectProduct('eventyetu'))}
                          className="w-full text-left p-3 rounded-none hover:bg-slate-50/90 transition-all duration-200 flex items-start gap-3.5 group/item cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-none bg-indigo-50/80 border border-indigo-150/70 flex items-center justify-center shrink-0 text-[#4f46e5] shadow-3xs group-hover/item:scale-108 group-hover/item:-rotate-2 group-hover/item:bg-indigo-100/70 transition-all duration-300">
                            <Ticket className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="block text-sm font-semibold text-gray-900 leading-tight group-hover/item:text-[#0066FF] transition-colors">
                              Mixon for Events &amp; Gates
                            </span>
                            <p className="caption-sm text-gray-500 font-normal leading-relaxed">
                              Issue dynamic encrypted QR passes, prevent duplicate gate entries, and claim instant settlements.
                            </p>
                          </div>
                        </motion.a>

                        {/* Item 4: Mixon for Retail POS */}
                        <motion.a
                          variants={dropdownItemVariants}
                          href={getRoutePath('mipos')}
                          onClick={(e) => handleAnchorNavigate(e, () => handleSelectProduct('mipos'))}
                          className="w-full text-left p-3 rounded-none hover:bg-slate-50/90 transition-all duration-200 flex items-start gap-3.5 group/item cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-none bg-emerald-50/80 border border-emerald-150/70 flex items-center justify-center shrink-0 text-[#059669] shadow-3xs group-hover/item:scale-108 group-hover/item:-rotate-2 group-hover/item:bg-emerald-100/70 transition-all duration-300">
                            <Cpu className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <div className="space-y-0.5">
                            <span className="block text-sm font-semibold text-gray-900 leading-tight group-hover/item:text-[#0066FF] transition-colors">
                              Mixon for Retail POS
                            </span>
                            <p className="caption-sm text-gray-500 font-normal leading-relaxed">
                              Offline edge registers with automatic sync, inventory alerts, and instant daily audits.
                            </p>
                          </div>
                        </motion.a>
                      </div>

                      <NavShowcaseCard
                        variants={dropdownShowcaseVariants}
                        eyebrow="Mixon Studio"
                        title="Inside the studio behind Mixon"
                        description="Four focused platforms built in Nairobi for teams running rentals, stays, tickets, and retail stores."
                        action="Learn More"
                        href={getRoutePath('about')}
                        onClick={() => handleSelectProduct('about')}
                        className="col-span-5"
                      />

                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Hoverable Services dropdown */}
            <div 
              className="relative py-1.5"
              onMouseEnter={() => openDropdown('services')}
              onMouseLeave={closeDropdownWithDelay}
            >
              <AppLink
                page="services"
                onNavigate={(p) => handleSelectService(p)}
                className={`hover:text-black focus:outline-none focus-visible:text-[#0066FF] transition-colors cursor-pointer flex items-center gap-1 nav-md ${activeDropdown === 'services' || currentPage === 'services' ? 'text-[#0066FF] font-medium' : 'text-gray-700'}`}
                aria-expanded={activeDropdown === 'services'}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180 text-[#0066FF]' : ''}`} />
              </AppLink>

              {/* Modern Spring & 3D Blur-Dissolve Dropdown Reveal */}
              <AnimatePresence>
                {activeDropdown === 'services' && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-[32%] pt-8 w-[960px] z-50 pointer-events-auto [perspective:1000px]"
                    onMouseEnter={cancelClose}
                    onMouseLeave={closeDropdownWithDelay}
                  >
                    <motion.div 
                      variants={dropdownMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ transformOrigin: 'top center' }}
                      className="bg-white border border-gray-200 rounded-none px-3.5 py-6 grid grid-cols-12 gap-3.5 items-stretch shadow-[0_24px_60px_-12px_rgba(0,102,255,0.16),0_12px_24px_-8px_rgba(0,0,0,0.08)] pointer-events-auto text-left"
                    >
                      {/* Left Column: 6 Services in a Balanced, Compact 2-Column Grid */}
                      <div className="col-span-8 grid grid-cols-2 gap-x-2 gap-y-1 content-start items-start pr-1">
                        {servicesData.map((service) => {
                          const IconComp = service.icon;
                          const servicePage = service.id as PageId;
                          return (
                            <motion.a
                              key={service.id}
                              variants={dropdownItemVariants}
                              href={getRoutePath(servicePage)}
                              onClick={(e) => handleAnchorNavigate(e, () => handleSelectService(servicePage))}
                              className="w-full text-left px-2 py-1.5 rounded-none hover:bg-slate-50 transition-all duration-200 flex items-start gap-2.5 group/item cursor-pointer border border-transparent hover:border-slate-200/70"
                            >
                              <div className={`mt-0.5 w-8 h-8 rounded-none border flex items-center justify-center shrink-0 shadow-3xs group-hover/item:scale-108 group-hover/item:-rotate-2 transition-all duration-300 ${service.iconBg} ${service.hoverBg}`}>
                                <IconComp className="w-4 h-4 stroke-[2.2]" />
                              </div>
                              <div className="min-w-0 space-y-0.5">
                                <span className="block text-[13px] font-semibold text-gray-900 leading-tight group-hover/item:text-[#0066FF] transition-colors">
                                  {service.title}
                                </span>
                                <p className="!text-[11px] font-normal leading-[1.35] text-gray-500">
                                  {service.desc}
                                </p>
                              </div>
                            </motion.a>
                          );
                        })}
                      </div>

                      <NavShowcaseCard
                        variants={dropdownShowcaseVariants}
                        eyebrow="Mixon Bespoke Labs"
                        title="Custom systems built around your work"
                        description="Partner directly with our engineering team to design and ship tailored platforms, APIs, and M-Pesa automation."
                        action="Brief our team"
                        href={getRoutePath('services')}
                        onClick={() => handleSelectService('services')}
                        className="col-span-4"
                        compact
                      />

                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Pricing Link */}
            <AppLink
              page="pricing"
              onMouseEnter={closeDropdownImmediately}
              onNavigate={setCurrentPage}
              aria-current={currentPage === 'pricing' ? 'page' : undefined}
              className={`hover:text-black focus:outline-none focus-visible:text-[#0066FF] transition-colors cursor-pointer nav-md ${currentPage === 'pricing' ? 'text-[#0066FF] font-medium' : 'text-gray-700'}`}
            >
              Pricing
            </AppLink>

            <AppLink
              page="about"
              onMouseEnter={closeDropdownImmediately}
              onNavigate={setCurrentPage}
              aria-current={currentPage === 'about' ? 'page' : undefined}
              className={`hover:text-black focus:outline-none focus-visible:text-[#0066FF] transition-colors cursor-pointer nav-md ${currentPage === 'about' ? 'text-[#0066FF] font-medium' : 'text-gray-700'}`}
            >
              About
            </AppLink>

          </nav>

          {/* Right Header Actions */}
          <div 
            className="hidden lg:flex items-center gap-3 shrink-0"
            onMouseEnter={closeDropdownImmediately}
          >
            <AppLink
              page="contact"
              onNavigate={setCurrentPage}
              className="group h-10 min-w-[145px] rounded-none border-2 border-[#222] bg-white px-4 text-[13.5px] font-semibold tracking-tight text-[#222] transition-colors hover:bg-neutral-50 cursor-pointer inline-flex items-center justify-center"
            >
              <RollingButtonText text="Talk to us" className="justify-center" />
            </AppLink>

            {/* Book a demo primary CTA with ExpandingArrowButton animated interaction */}
            <ExpandingArrowButton
              size="pill"
              onClick={() => setCurrentPage('book-demo')}
              className="h-10 min-w-[145px]"
            >
              Book a demo
            </ExpandingArrowButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden text-gray-900 hover:text-mixon-blue transition-colors cursor-pointer w-9 h-9 flex items-center justify-center rounded-none hover:bg-slate-100"
            aria-label="Toggle mobile navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer as a beautiful matching floating card */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            data-lenis-prevent=""
            className="fixed top-[5.5rem] left-4 right-4 max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain bg-white border border-gray-150 rounded-none p-6 flex flex-col space-y-5 text-left nav-sm text-gray-650 shadow-2xl z-50 lg:hidden"
          >
            <div>
              <span className="block label-md text-gray-400 uppercase mb-2 font-semibold">Our Products</span>
              <div className="grid grid-cols-1 gap-2 pl-2 border-l border-gray-100">
                {productDropdown.map((p) => (
                  <AppLink
                    key={p.id}
                    page={p.id as PageId}
                    onNavigate={(page) => {
                      setCurrentPage(page);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-1.5 nav-sm text-gray-700 hover:text-black transition-colors cursor-pointer block"
                  >
                    {p.label}
                  </AppLink>
                ))}
              </div>
            </div>

            <div>
              <span className="block label-md text-gray-400 uppercase mb-2 font-semibold">Our Services</span>
              <div className="grid grid-cols-1 gap-2 pl-2 border-l border-gray-100">
                {servicesData.map((s) => (
                  <AppLink
                    key={s.id}
                    page={s.id as PageId}
                    onNavigate={(page) => {
                      setCurrentPage(page);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-1 nav-sm text-gray-700 hover:text-[#0066FF] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{s.title}</span>
                    <span className="caption-sm text-gray-400 hidden sm:inline">{s.tag}</span>
                  </AppLink>
                ))}
              </div>
            </div>

            <AppLink
              page="about"
              onNavigate={(page) => { setCurrentPage(page); setMobileMenuOpen(false); }}
              className={`py-2 text-left nav-sm hover:text-black focus:outline-none focus-visible:text-[#0066FF] transition-colors border-t border-gray-50 cursor-pointer block ${currentPage === 'about' ? 'text-[#0066FF] font-semibold' : ''}`}
            >
              About
            </AppLink>

            <AppLink
              page="pricing"
              onNavigate={(page) => { setCurrentPage(page); setMobileMenuOpen(false); }}
              className={`py-2 text-left font-medium hover:text-black focus:outline-none focus-visible:text-[#0066FF] transition-colors border-t border-gray-50 cursor-pointer block ${currentPage === 'pricing' ? 'text-[#0066FF] font-semibold' : ''}`}
            >
              Pricing
            </AppLink>

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <AppLink
                page="contact"
                onNavigate={(page) => { setMobileMenuOpen(false); setCurrentPage(page); }}
                className="group h-11 w-full rounded-none border-2 border-[#222] bg-white px-4 text-sm font-semibold tracking-tight text-[#222] transition-colors hover:bg-neutral-50 cursor-pointer inline-flex items-center justify-center"
              >
                <RollingButtonText text="Talk to us" className="justify-center" />
              </AppLink>
              <ExpandingArrowButton
                size="pill"
                onClick={() => { setCurrentPage('book-demo'); setMobileMenuOpen(false); }}
                className="h-11 w-full min-w-0"
              >
                Book a demo
              </ExpandingArrowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Briefing Notification pop-up */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-white border border-mixon-blue/30 p-4 rounded-xl shadow-2xl max-w-sm flex items-start gap-3 text-left"
          >
            <div className="p-2 rounded-lg bg-mixon-cotton text-mixon-blue shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h6 className="font-display font-bold text-gray-900 text-xs tracking-tight">Lead Queue Updated</h6>
              <p className="text-gray-600 text-[11px] leading-relaxed mt-0.5">
                <strong>{recentLeadName}</strong>&apos;s business brief has successfully written into our active queue. Observe in the Sales CRM Stream.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDER ACTIVE PAGE COMPONENT */}
      <main className="relative z-10 min-h-[70vh] bg-white overflow-x-clip">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* UPPER FOOTER (FULL BRAND, NAVIGATION, CONTACT & LEGAL) */}
      <footer className="relative z-10 bg-[#0E1B36] text-slate-300 w-full overflow-hidden px-6 sm:px-10 lg:px-14 border-t border-slate-800/80">
        <FooterUpper
          setCurrentPage={setCurrentPage}
        />
      </footer>

      {/* REVEAL-FROM-BENEATH HALFTONE WORDMARK LOWER FOOTER */}
      <div 
        className="relative h-[260px] sm:h-[310px] lg:h-[360px] w-full bg-[#0E1B36] overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative h-full lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:h-[360px] w-full z-0 pointer-events-auto bg-[#0E1B36]">
          <HalftoneWordmarkFooter
            wordmark="mixon"
            backToTop={false}
            height="100%"
            preset="night"
            palette={{
              background: "#0E1B36",
              ink: "#cbd5e1",
              warm: "#0066FF"
            }}
            dotGap={6}
            radius={95}
            crop={0.14}
            grain={0.45}
            interactive={true}
            fontFamily='"DM Sans", "Inter", sans-serif'
            fontWeight={900}
          >
            <div className="h-0" />
          </HalftoneWordmarkFooter>
        </div>
      </div>

      {/* Modern Cookie Consent Banner & Drawer */}
      <CookieConsent />

      {/* Floating Interactive WhatsApp Assistant (+254 741 733 878) */}
      <WhatsAppBot />
    </div>
  );
}
