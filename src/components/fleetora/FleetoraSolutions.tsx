import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollRevealHeading } from '../ui/ScrollRevealText';
import { ExpandingArrowButton } from '../ui/expanding-arrow-button';
import { 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

interface FleetoraSolutionsProps {
  setCurrentPage?: (page: string) => void;
}

interface SolutionItem {
  id: string;
  tabLabel: string;
  systemBadge: string;
  title: string;
  desc: string;
  pageId: string;
  buttonText: string;
  metric: string;
  metricLabel: string;
  features: string[];
  drawing: {
    gradientClass: string;
    avatarSrc: string;
    avatarAlt: string;
    question: string;
    statusPill1: string;
    statusPill2: string;
    responseBody: string;
    bulletSectionTitle: string;
    bulletItems: string[];
    footerNote: string;
  };
}

const solutionsData: SolutionItem[] = [
  {
    id: 'mirentals',
    tabLabel: '[01] Property & Rentals',
    systemBadge: 'miRentals Platform',
    title: 'Connecting Property Teams With Automated Rent Reconciliation',
    desc: 'miRentals automates M-Pesa STK rent collection, digital tenant lease vaults, and live occupancy yield across multi-unit residential and commercial portfolios.',
    pageId: 'mirentals',
    buttonText: 'Explore miRentals',
    metric: '99.4%',
    metricLabel: 'On-time rent collection',
    features: [
      'Instant M-Pesa Daraja STK auto-matching to lease records',
      'Digital tenant contracts with automated penalty triggers',
      'Live occupancy, arrears, and escrow cashflow dashboards'
    ],
    drawing: {
      gradientClass: 'from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]',
      avatarSrc: '/avatars/avatar1.jpg',
      avatarAlt: 'Sarah Wambui',
      question: "What's the status of Unit 4B rent clearance and M-Pesa receipt verification?",
      statusPill1: '✓ Auto-Reconciled',
      statusPill2: 'Daraja STK Push',
      responseBody: 'Monitor tenant occupancy and settlement regularly. Payment of KES 65,000 auto-matched to Lease #LR-4029 with zero manual variance.',
      bulletSectionTitle: 'Live Settlement Ledger:',
      bulletItems: [
        'Monthly Base Rent: KES 60,000 (Paybill 892300)',
        'Service Charge & Utilities: KES 5,000 (Cleared in 1.8s)',
        'Tenant Outstanding Balance: KES 0.00 (Zero arrears)'
      ],
      footerNote: 'Automated digital receipt SMS and tax invoice emailed to tenant'
    }
  },
  {
    id: 'mireserve',
    tabLabel: '[02] Hospitality & Booking',
    systemBadge: 'miReserve Engine',
    title: 'Connecting Vacation Stays With Sub-Second Calendar Sync',
    desc: 'Sub-second two-way calendar locking across Airbnb, Booking.com, and direct web channels keeps availability perfectly aligned without manual double-entry.',
    pageId: 'mireserve',
    buttonText: 'Explore miReserve',
    metric: '< 14ms',
    metricLabel: 'OTA channel lock latency',
    features: [
      'Instant 2-way iCal and API booking engine synchronization',
      'Automated WhatsApp guest arrival guides and keypad PIN codes',
      'Dynamic seasonal pricing and real-time occupancy rules'
    ],
    drawing: {
      gradientClass: 'from-[#EFF6FF] via-[#DBEAFE] to-[#BAE6FD]',
      avatarSrc: '/avatars/avatar2.jpg',
      avatarAlt: 'David Ochieng',
      question: "New direct guest reservation confirmed for Watamu Beach Villa (Dec 22 – 27). Total KES 140,000.",
      statusPill1: '✓ 14ms Channel Lock',
      statusPill2: 'Multi-OTA Sync',
      responseBody: 'Channel locking triggered automatically. Dates blocked across Airbnb, Booking.com, and Vrbo simultaneously to eliminate double bookings.',
      bulletSectionTitle: 'Channel Synchronization Status:',
      bulletItems: [
        'Airbnb Calendar: Instant Lock Confirmed (12ms)',
        'Booking.com API: Availability Blocked (14ms)',
        'Direct Guest Portal: KES 140,000 Deposit Held in Escrow'
      ],
      footerNote: 'Automated WhatsApp arrival guide and smart lock PIN sent to guest'
    }
  },
  {
    id: 'eventyetu',
    tabLabel: '[03] Event Ticketing',
    systemBadge: 'Event Yetu Rail',
    title: 'Connecting Event Organizers With High-Speed Access Control',
    desc: 'High-speed entrance validation with rapid turnstile barcode scanning, dynamic surge tier pricing, and tamper-proof offline-first ticket verification.',
    pageId: 'eventyetu',
    buttonText: 'Explore Event Yetu',
    metric: '0.38s',
    metricLabel: 'Turnstile gate throughput',
    features: [
      'Dynamic sales velocity tier pricing algorithms',
      'Tamper-proof encrypted QR admission tickets',
      'Zero-downtime offline turnstile gate validation'
    ],
    drawing: {
      gradientClass: 'from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]',
      avatarSrc: '/avatars/avatar4.jpg',
      avatarAlt: 'Kevin Mwangi',
      question: "Scanning Gate 04 Turnstile: VIP Early-Bird All-Access Pass #EY-9921.",
      statusPill1: '✓ Pass Validated (0.38s)',
      statusPill2: 'Anti-Fraud Active',
      responseBody: 'Encrypted cryptographic QR verified. Gate turnstile unlocked instantly with duplicate admission prevention active.',
      bulletSectionTitle: 'Turnstile Gate Telemetry:',
      bulletItems: [
        'Attendee: Kevin Mwangi · VIP Access Granted',
        'Gate Throughput: 2,840 / 3,000 Checked In (94.6%)',
        'Fraud Protection: 0 duplicate scan attempts allowed'
      ],
      footerNote: 'Turnstile validating with offline-first high-speed local cache'
    }
  },
  {
    id: 'mipos',
    tabLabel: '[04] Retail & Inventory',
    systemBadge: 'miPOS Intelligence',
    title: 'Connecting Retail Operations With Real-Time Stock Balance',
    desc: 'Real-time multi-branch stock synchronisation, cash drawer shift balancing, and automated supplier reorder alerts with zero mobile money variance.',
    pageId: 'mipos',
    buttonText: 'Explore miPOS',
    metric: '0.00%',
    metricLabel: 'Reconciliation discrepancy',
    features: [
      'Real-time multi-terminal inventory balancing across branches',
      'Direct Safaricom Daraja STK Push Paybill integration',
      'Automated supplier reorder alerts on low stock thresholds'
    ],
    drawing: {
      gradientClass: 'from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0]',
      avatarSrc: '/avatars/avatar3.jpg',
      avatarAlt: 'Grace Wanjiku',
      question: "Shift #02 closed on Terminal 01 (Westlands). Requesting automated cash & M-Pesa audit.",
      statusPill1: '✓ 0.00% Shift Variance',
      statusPill2: 'Daraja Auto-Audit',
      responseBody: 'Cash drawer reconciled against Safaricom Paybill C2B receipts. 142 shift transactions balanced with zero variance.',
      bulletSectionTitle: 'Terminal Shift Balancing Ledger:',
      bulletItems: [
        'M-Pesa Collections: KES 214,300 (100% matched)',
        'Cash Drawer Balance: KES 70,000 (Count verified)',
        'Inventory Alert: Arabica Beans (3 left → Auto PO dispatched)'
      ],
      footerNote: 'Stock ledger updated and mirrored across 8 branch locations'
    }
  }
];

// Single Card Item in the Stacking Deck
const StackingCardItem: React.FC<{
  item: SolutionItem;
  index: number;
  total: number;
  setCurrentPage?: (page: string) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}> = ({ item, index, setCurrentPage, cardRef }) => {
  return (
    <div
      ref={cardRef}
      id={`solution-card-${item.id}`}
      className={`w-full ${index === 0 ? 'relative' : 'absolute inset-0'}`}
      style={{ zIndex: 10 + index }}
    >
      {/* Unified Card Container: NO border-radius (rounded-none), clean subtle border & top depth shadow */}
      <div className="w-full h-full rounded-none bg-white border border-gray-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px] lg:min-h-[calc(100vh-130px)] lg:max-h-[760px]">
            
            {/* ========================================================= */}
            {/* LEFT SIDE: Editorial Typography & Action CTA (5 cols)     */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 p-7 sm:p-10 lg:p-14 flex flex-col justify-between bg-white text-left space-y-6">
              
              <div className="space-y-4">
                {/* Product Title in Aktiv Grotesk */}
                <h3 
                  data-scroll-no-reveal=""
                  className="text-xl sm:text-2xl lg:text-[26px] font-normal text-gray-950 tracking-[-0.02em] leading-[1.3]"
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-md">
                  {item.desc}
                </p>

                {/* Checklist of capabilities */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Button: Solid Electric Blue Pill with Dotted Chevron */}
              <div className="pt-2 flex items-center justify-start">
                <ExpandingArrowButton
                  size="pill"
                  variant="solid-blue"
                  onClick={() => setCurrentPage ? setCurrentPage(item.pageId) : null}
                  className="h-11 min-w-[172px] text-xs sm:text-[13.5px]"
                >
                  {item.buttonText}
                </ExpandingArrowButton>
              </div>

            </div>

            {/* ========================================================= */}
            {/* RIGHT SIDE: Full-Bleed Pastel Ambient Glow + Bespoke UI  */}
            {/* ========================================================= */}
            <div className={`lg:col-span-7 bg-gradient-to-br ${item.drawing.gradientClass} p-6 sm:p-9 lg:p-11 relative overflow-hidden flex flex-col justify-center`}>
              
              {/* Atmospheric subtle background blur mesh */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-300/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 w-full max-w-lg mx-auto space-y-4">
                
                {/* Top Speech Bubble Card with circular avatar (Image 2 anatomy) */}
                <div className="flex items-start gap-3">
                  <img
                    src={item.drawing.avatarSrc}
                    alt={item.drawing.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-white shrink-0 mt-1"
                  />
                  
                  <div className="relative bg-white rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-lg shadow-black/[0.04] border border-black/[0.04] text-left">
                    {/* Speech bubble pointer arrow */}
                    <div className="absolute -left-1.5 top-4 w-3 h-3 bg-white rotate-45 border-l border-b border-black/[0.04]" />
                    
                    <p className="font-sans text-xs sm:text-[13px] font-semibold text-gray-800 leading-snug">
                      {item.drawing.question}
                    </p>
                  </div>
                </div>

                {/* Bottom Main UI Card (Image 2 style) */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/[0.06] border border-black/[0.05] text-left space-y-4 ml-6 sm:ml-12">
                  
                  {/* Body statement */}
                  <p className="font-sans text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal">
                    {item.drawing.responseBody}
                  </p>

                  {/* Status Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      <span>{item.drawing.statusPill1}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-[#0066FF] border border-blue-200">
                      <Zap className="w-3.5 h-3.5 text-[#0066FF]" />
                      <span>{item.drawing.statusPill2}</span>
                    </span>
                  </div>

                  {/* Section Title & Data Bullets */}
                  <div className="pt-2 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] font-mono font-bold text-gray-900 uppercase tracking-tight">
                      {item.drawing.bulletSectionTitle}
                    </div>

                    <div className="space-y-1.5">
                      {item.drawing.bulletItems.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs font-sans text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-950 shrink-0" />
                          <span className="truncate">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Micro-telemetry status footer */}
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-[10px] font-mono text-gray-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="truncate">{item.drawing.footerNote}</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
  );
};

export const FleetoraSolutions: React.FC<FleetoraSolutionsProps> = ({ setCurrentPage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length < 2 || !containerRef.current) return;

    // Position cards 1, 2, 3 below the deck frame
    for (let i = 1; i < cards.length; i++) {
      gsap.set(cards[i], { yPercent: 100, willChange: 'transform' });
    }

    const ctx = gsap.context(() => {
      // Pinned master deck timeline: cards stack on top of each other at top 96px, then unpin together
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 96px',
          end: '+=2400',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (typeof window !== 'undefined') {
        (window as any).__solutionsST = tl.scrollTrigger;
      }

      // Card 1 (miReserve) slides up and stacks over Card 0 (miRentals)
      tl.to(cards[1], { yPercent: 0, duration: 1, ease: 'power1.inOut' });
      tl.to({}, { duration: 0.25 }); // Pause on Card 1

      // Card 2 (Event Yetu) slides up and stacks over Card 1
      tl.to(cards[2], { yPercent: 0, duration: 1, ease: 'power1.inOut' });
      tl.to({}, { duration: 0.25 }); // Pause on Card 2

      // Card 3 (miPOS) slides up and stacks over Card 2
      tl.to(cards[3], { yPercent: 0, duration: 1, ease: 'power1.inOut' });
      tl.to({}, { duration: 0.5 }); // Pause on Card 3 before unpinning smoothly
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="solutions" 
      className="py-20 sm:py-28 lg:py-32 bg-white text-gray-950 relative select-none w-full px-6 sm:px-10 lg:px-14"
    >
      {/* Background structural subtle pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#083071_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
        
        {/* Top Section Header - Centered with text reveal on scroll */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-20">
          <ScrollRevealHeading
            as="h2"
            className="font-bdogrotesk text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-950 tracking-[-0.025em] leading-[1.18]"
          >
            We simplify operational complexity with scalable solutions.
          </ScrollRevealHeading>
        </div>

        {/* CARDS STACKING ON SCROLL WITH HARDWARE-SMOOTH MOTION (Contiant physics) */}
        <div ref={containerRef} className="relative w-full">
          <div ref={deckRef} className="relative w-full overflow-hidden">
            {solutionsData.map((item, idx) => (
              <StackingCardItem
                key={item.id}
                item={item}
                index={idx}
                total={solutionsData.length}
                setCurrentPage={setCurrentPage}
                cardRef={(el) => { cardRefs.current[idx] = el; }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
