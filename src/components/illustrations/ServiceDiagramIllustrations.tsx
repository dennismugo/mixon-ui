import React from 'react';

// Common Graph Paper Grid Background
const GridBackground: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs>
      <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#e8edf5" strokeWidth="1.2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="#ffffff" />
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </>
);

// 1. APP SERVICE ILLUSTRATION: Mobile Smartphone & USSD Telecom Flow
export const AppServiceDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 680 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    shapeRendering="geometricPrecision"
  >
    <GridBackground id="grid-app" />

    {/* Floating accent dots */}
    <circle cx="510" cy="115" r="14" fill="#ff4520" />
    <circle cx="475" cy="85" r="7" fill="#04122b" />
    <circle cx="95" cy="315" r="15" fill="#ff4520" />
    <circle cx="150" cy="265" r="7" fill="#04122b" />
    <circle cx="595" cy="275" r="11" fill="#ff4520" />

    {/* TOP-LEFT: Smartphone Frame with App Card & Gear */}
    {/* Offset navy shadow outline */}
    <rect x="75" y="48" width="135" height="155" rx="12" fill="none" stroke="#04122b" strokeWidth="3" />
    {/* Blue phone body */}
    <rect x="80" y="53" width="135" height="155" rx="12" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    {/* Phone top speaker bar */}
    <rect x="122" y="63" width="50" height="5" rx="2.5" fill="#ffffff" />
    {/* Phone screen UI card */}
    <rect x="94" y="78" width="107" height="115" rx="6" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    <rect x="105" y="90" width="85" height="24" rx="4" fill="#0066FF" />
    {/* App content bars */}
    <rect x="105" y="122" width="38" height="28" rx="3" fill="#e8edf5" />
    <rect x="152" y="122" width="38" height="28" rx="3" fill="#e8edf5" />
    <line x1="105" y1="162" x2="190" y2="162" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="105" y1="174" x2="160" y2="174" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />

    {/* Gear badge on top-left of phone */}
    <g transform="translate(62, 38)">
      <circle cx="16" cy="16" r="14" fill="#0066FF" stroke="#04122b" strokeWidth="3" />
      <circle cx="16" cy="16" r="6" fill="#ffffff" stroke="#04122b" strokeWidth="2" />
      <path d="M16 0v6M16 26v6M0 16h6M26 16h6M5 5l4 4M23 23l4 4M5 27l4-4M23 9l4-4" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Arrow: Phone -> Sync Node */}
    <line x1="215" y1="125" x2="310" y2="125" stroke="#04122b" strokeWidth="3" />
    <polygon points="310,120 322,125 310,130" fill="#04122b" />

    {/* Central Sync Circle Node */}
    <circle cx="370" cy="125" r="38" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    {/* Sync circular arrows inside */}
    <path d="M356 120a14 14 0 0 1 24-5l3-3m-23 18a14 14 0 0 0 24 5l3-3" fill="none" stroke="#0066FF" strokeWidth="3" strokeLinecap="round" />
    <polygon points="383,110 387,117 379,117" fill="#0066FF" />
    <polygon points="357,140 353,133 361,133" fill="#0066FF" />

    {/* Arrow: Sync Node -> USSD Card */}
    <path d="M408 125h35v95" fill="none" stroke="#04122b" strokeWidth="3" />
    <polygon points="438,220 443,232 448,220" fill="#04122b" />

    {/* BOTTOM-RIGHT: USSD Telecom Menu Card */}
    {/* Offset navy shadow outline */}
    <rect x="375" y="235" width="195" height="130" fill="none" stroke="#04122b" strokeWidth="3" />
    {/* Blue USSD card */}
    <rect x="380" y="240" width="195" height="130" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    {/* USSD Menu Dialogue Box */}
    <rect x="395" y="255" width="165" height="100" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    <rect x="405" y="265" width="65" height="14" fill="#04122b" />
    <text x="410" y="276" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">*384# USSD</text>
    <line x1="405" y1="292" x2="545" y2="292" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="405" y1="308" x2="515" y2="308" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="405" y1="324" x2="485" y2="324" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="405" y1="340" x2="530" y2="340" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" />

    {/* Arrow: USSD Card -> Cellular Triangle */}
    <line x1="375" y1="300" x2="285" y2="300" stroke="#04122b" strokeWidth="3" />
    <polygon points="285,295 273,300 285,305" fill="#04122b" />

    {/* BOTTOM-CENTER: Signal Antenna Triangle Node */}
    <polygon points="230,240 185,335 275,335" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    <circle cx="230" cy="275" r="6" fill="#0066FF" />
    <path d="M218 290a16 16 0 0 1 24 0M210 305a28 28 0 0 1 40 0" fill="none" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 2. WEB SERVICE ILLUSTRATION: Browser Card, Cursor CTA, and Layout Nodes
export const WebServiceDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 680 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    shapeRendering="geometricPrecision"
  >
    <GridBackground id="grid-web" />

    {/* Floating accent dots */}
    <circle cx="505" cy="110" r="14" fill="#ff4520" />
    <circle cx="470" cy="80" r="7" fill="#04122b" />
    <circle cx="95" cy="315" r="15" fill="#ff4520" />
    <circle cx="155" cy="265" r="7" fill="#04122b" />
    <circle cx="605" cy="265" r="12" fill="#ff4520" />

    {/* TOP-LEFT: Browser Window Card */}
    {/* Offset navy shadow outline */}
    <rect x="75" y="48" width="145" height="145" fill="none" stroke="#04122b" strokeWidth="3" />
    {/* Blue browser body */}
    <rect x="80" y="53" width="145" height="145" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    {/* Browser Window UI */}
    <rect x="92" y="65" width="121" height="121" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Top Header bar with 3 dots */}
    <line x1="92" y1="83" x2="213" y2="83" stroke="#04122b" strokeWidth="2" />
    <circle cx="102" cy="74" r="2.5" fill="#04122b" />
    <circle cx="110" cy="74" r="2.5" fill="#04122b" />
    <circle cx="118" cy="74" r="2.5" fill="#04122b" />
    {/* Search pill inside browser */}
    <rect x="130" y="70" width="72" height="8" rx="4" fill="#e8edf5" />
    {/* Body content blocks */}
    <rect x="102" y="94" width="48" height="40" fill="#0066FF" />
    <rect x="156" y="94" width="47" height="16" fill="#e8edf5" />
    <rect x="156" y="118" width="47" height="16" fill="#e8edf5" />
    <line x1="102" y1="148" x2="203" y2="148" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="102" y1="162" x2="175" y2="162" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />

    {/* Arrow: Browser -> Global Web Node */}
    <line x1="225" y1="120" x2="310" y2="120" stroke="#04122b" strokeWidth="3" />
    <polygon points="310,115 322,120 310,125" fill="#04122b" />

    {/* Central Circle Node (Globe / Web Protocol) */}
    <circle cx="365" cy="120" r="38" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    <circle cx="365" cy="120" r="26" fill="#eef4ff" stroke="#0066FF" strokeWidth="2" />
    <ellipse cx="365" cy="120" rx="14" ry="26" fill="none" stroke="#0066FF" strokeWidth="1.8" />
    <line x1="339" y1="120" x2="391" y2="120" stroke="#0066FF" strokeWidth="1.8" />

    {/* Arrow: Globe -> CTA Conversion Card */}
    <path d="M403 120h42v95" fill="none" stroke="#04122b" strokeWidth="3" />
    <polygon points="440,215 445,227 450,215" fill="#04122b" />

    {/* BOTTOM-RIGHT: Conversion CTA Card with Pointer Cursor */}
    <rect x="380" y="230" width="195" height="135" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="385" y="235" width="195" height="135" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    {/* Inner Card UI */}
    <rect x="400" y="250" width="165" height="105" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Hero text lines */}
    <line x1="415" y1="270" x2="525" y2="270" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />
    <line x1="415" y1="285" x2="480" y2="285" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />
    
    {/* Clickable Action Button */}
    <rect x="415" y="305" width="95" height="32" fill="#0066FF" stroke="#04122b" strokeWidth="2" />
    <line x1="428" y1="321" x2="475" y2="321" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    <polyline points="485,316 492,321 485,326" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* White Cursor Arrow Clicking the Button */}
    <g transform="translate(485, 312)">
      <polygon points="0,0 18,22 10,22 14,32 8,34 4,24 0,27" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" strokeLinejoin="round" />
    </g>

    {/* Arrow: CTA Card -> Performance Node */}
    <line x1="380" y1="300" x2="290" y2="300" stroke="#04122b" strokeWidth="3" />
    <polygon points="290,295 278,300 290,305" fill="#04122b" />

    {/* BOTTOM-CENTER: Core Web Vitals Triangle */}
    <polygon points="230,240 185,335 275,335" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    {/* Lightning Bolt inside */}
    <polygon points="234,260 220,290 231,290 226,316 244,284 233,284" fill="#0066FF" stroke="#04122b" strokeWidth="1.5" />
  </svg>
);

// 3. SEO SERVICE ILLUSTRATION: Search Bar, Growth Chart, and Target Node
export const SeoServiceDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 680 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    shapeRendering="geometricPrecision"
  >
    <GridBackground id="grid-seo" />

    {/* Floating accent dots */}
    <circle cx="515" cy="110" r="14" fill="#ff4520" />
    <circle cx="480" cy="80" r="7" fill="#04122b" />
    <circle cx="95" cy="315" r="15" fill="#ff4520" />
    <circle cx="150" cy="265" r="7" fill="#04122b" />
    <circle cx="600" cy="270" r="11" fill="#ff4520" />

    {/* TOP-LEFT: Search Engine Query Card */}
    <rect x="75" y="48" width="145" height="145" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="80" y="53" width="145" height="145" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="92" y="65" width="121" height="121" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Search Input Bar */}
    <rect x="102" y="78" width="101" height="26" rx="13" fill="#e8edf5" stroke="#04122b" strokeWidth="2" />
    {/* Magnifying Glass */}
    <circle cx="118" cy="91" r="5" stroke="#04122b" strokeWidth="2" fill="none" />
    <line x1="122" y1="95" x2="128" y2="101" stroke="#04122b" strokeWidth="2" strokeLinecap="round" />
    <line x1="135" y1="91" x2="185" y2="91" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" />
    {/* Search Result Snippets */}
    <rect x="102" y="118" width="45" height="8" rx="2" fill="#0066FF" />
    <line x1="102" y1="136" x2="200" y2="136" stroke="#04122b" strokeWidth="2" strokeLinecap="round" />
    <line x1="102" y1="148" x2="185" y2="148" stroke="#04122b" strokeWidth="2" strokeLinecap="round" />
    <line x1="102" y1="160" x2="165" y2="160" stroke="#04122b" strokeWidth="2" strokeLinecap="round" />

    {/* Arrow: Search -> Crawler Node */}
    <line x1="225" y1="120" x2="310" y2="120" stroke="#04122b" strokeWidth="3" />
    <polygon points="310,115 322,120 310,125" fill="#04122b" />

    {/* Central Circle Node (Analytics Compass) */}
    <circle cx="365" cy="120" r="38" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    <polygon points="365,95 373,115 390,120 373,125 365,145 357,125 340,120 357,115" fill="#0066FF" stroke="#04122b" strokeWidth="2" />

    {/* Arrow: Compass -> Growth Chart Card */}
    <path d="M403 120h42v95" fill="none" stroke="#04122b" strokeWidth="3" />
    <polygon points="440,215 445,227 450,215" fill="#04122b" />

    {/* BOTTOM-RIGHT: Growth & Pipeline Chart Card */}
    <rect x="380" y="230" width="195" height="135" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="385" y="235" width="195" height="135" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="400" y="250" width="165" height="105" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Bar Chart Bars */}
    <rect x="418" y="305" width="22" height="35" fill="#e8edf5" stroke="#04122b" strokeWidth="2" />
    <rect x="448" y="285" width="22" height="55" fill="#e8edf5" stroke="#04122b" strokeWidth="2" />
    <rect x="478" y="265" width="22" height="75" fill="#0066FF" stroke="#04122b" strokeWidth="2" />
    <rect x="508" y="245" width="22" height="95" fill="#0066FF" stroke="#04122b" strokeWidth="2" />
    {/* Upward Trend Line */}
    <path d="M425 295 L460 270 L490 250 L525 230" fill="none" stroke="#ff4520" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="525" cy="230" r="4.5" fill="#ff4520" stroke="#04122b" strokeWidth="1.5" />

    {/* Arrow: Chart Card -> Target Triangle */}
    <line x1="380" y1="300" x2="290" y2="300" stroke="#04122b" strokeWidth="3" />
    <polygon points="290,295 278,300 290,305" fill="#04122b" />

    {/* BOTTOM-CENTER: Rank #1 Bullseye Triangle */}
    <polygon points="230,240 185,335 275,335" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    <circle cx="230" cy="290" r="22" fill="#none" stroke="#04122b" strokeWidth="2" />
    <circle cx="230" cy="290" r="14" fill="#none" stroke="#0066FF" strokeWidth="2" />
    <circle cx="230" cy="290" r="6" fill="#0066FF" />
  </svg>
);

// 4. PAYMENTS SERVICE ILLUSTRATION: Phone Wallet, Shield Vault, and Ledger
export const PaymentsServiceDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 680 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    shapeRendering="geometricPrecision"
  >
    <GridBackground id="grid-pay" />

    {/* Floating accent dots */}
    <circle cx="510" cy="110" r="14" fill="#ff4520" />
    <circle cx="475" cy="80" r="7" fill="#04122b" />
    <circle cx="95" cy="315" r="15" fill="#ff4520" />
    <circle cx="150" cy="265" r="7" fill="#04122b" />
    <circle cx="600" cy="270" r="11" fill="#ff4520" />

    {/* TOP-LEFT: Payment & Mobile Money Card */}
    <rect x="75" y="48" width="145" height="145" rx="8" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="80" y="53" width="145" height="145" rx="8" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="92" y="65" width="121" height="121" rx="6" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Chip icon */}
    <rect x="105" y="78" width="28" height="22" rx="3" fill="#0066FF" stroke="#04122b" strokeWidth="2" />
    <line x1="119" y1="78" x2="119" y2="100" stroke="#ffffff" strokeWidth="1.5" />
    <line x1="105" y1="89" x2="133" y2="89" stroke="#ffffff" strokeWidth="1.5" />
    {/* Contactless wave */}
    <path d="M150 82a16 16 0 0 1 0 16m8-20a24 24 0 0 1 0 24" fill="none" stroke="#04122b" strokeWidth="2" strokeLinecap="round" />
    {/* Card Number lines */}
    <line x1="105" y1="125" x2="195" y2="125" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />
    <line x1="105" y1="140" x2="165" y2="140" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    {/* M-Pesa / SIM pill badge */}
    <rect x="105" y="155" width="55" height="16" rx="4" fill="#0066FF" />
    <text x="112" y="166" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">M-PESA</text>

    {/* Arrow: Payment Card -> Security Shield Node */}
    <line x1="225" y1="120" x2="310" y2="120" stroke="#04122b" strokeWidth="3" />
    <polygon points="310,115 322,120 310,125" fill="#04122b" />

    {/* Central Circle Node (Security Shield) */}
    <circle cx="365" cy="120" r="38" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    <path d="M365 95 L385 105 v15 c0 15 -20 25 -20 25 s-20 -10 -20 -25 v-15 z" fill="#0066FF" stroke="#04122b" strokeWidth="2.5" />
    <polyline points="358,118 363,123 373,113" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Arrow: Shield -> Settlement Ledger Card */}
    <path d="M403 120h42v95" fill="none" stroke="#04122b" strokeWidth="3" />
    <polygon points="440,215 445,227 450,215" fill="#04122b" />

    {/* BOTTOM-RIGHT: Automated Reconciliation & Ledger Card */}
    <rect x="380" y="230" width="195" height="135" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="385" y="235" width="195" height="135" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="400" y="250" width="165" height="105" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Verified Receipt / Transaction lines */}
    <rect x="415" y="265" width="24" height="24" rx="4" fill="#e8edf5" stroke="#04122b" strokeWidth="2" />
    <polyline points="422,277 426,281 433,273" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="450" y1="272" x2="540" y2="272" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />
    <line x1="450" y1="284" x2="510" y2="284" stroke="#04122b" strokeWidth="2" strokeLinecap="round" />

    <line x1="415" y1="305" x2="540" y2="305" stroke="#e8edf5" strokeWidth="2" />
    <line x1="415" y1="322" x2="520" y2="322" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    <rect x="415" y="333" width="75" height="14" rx="3" fill="#0066FF" />
    <text x="422" y="343" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">99.95% UPTIME</text>

    {/* Arrow: Ledger -> Database Vault */}
    <line x1="380" y1="300" x2="290" y2="300" stroke="#04122b" strokeWidth="3" />
    <polygon points="290,295 278,300 290,305" fill="#04122b" />

    {/* BOTTOM-CENTER: Database Cylinder Node */}
    <g transform="translate(195, 240)">
      <ellipse cx="35" cy="20" rx="35" ry="14" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
      <path d="M0 20v35c0 8 16 14 35 14s35-6 35-14V20" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
      <path d="M0 45c0 8 16 14 35 14s35-6 35-14" fill="none" stroke="#0066FF" strokeWidth="2.5" />
      <path d="M0 65c0 8 16 14 35 14s35-6 35-14" fill="none" stroke="#0066FF" strokeWidth="2.5" />
      <path d="M0 55v35c0 8 16 14 35 14s35-6 35-14V55" fill="#none" stroke="#04122b" strokeWidth="3" />
    </g>
  </svg>
);

// 5. ECOMMERCE SERVICE ILLUSTRATION: Product Showcase, Cart, and Checkout
export const EcommerceServiceDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 680 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    shapeRendering="geometricPrecision"
  >
    <GridBackground id="grid-ecom" />

    {/* Floating accent dots */}
    <circle cx="510" cy="110" r="14" fill="#ff4520" />
    <circle cx="475" cy="80" r="7" fill="#04122b" />
    <circle cx="95" cy="315" r="15" fill="#ff4520" />
    <circle cx="150" cy="265" r="7" fill="#04122b" />
    <circle cx="600" cy="270" r="11" fill="#ff4520" />

    {/* TOP-LEFT: Product Showcase Card */}
    <rect x="75" y="48" width="145" height="145" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="80" y="53" width="145" height="145" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="92" y="65" width="121" height="121" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Product Image Placeholder Box */}
    <rect x="105" y="78" width="95" height="60" rx="4" fill="#e8edf5" stroke="#04122b" strokeWidth="2" />
    <polygon points="120,125 145,95 165,115 180,105 195,125" fill="#0066FF" />
    <circle cx="135" cy="92" r="5" fill="#ff4520" />
    {/* Price Tag & Description */}
    <rect x="105" y="148" width="40" height="18" rx="3" fill="#0066FF" />
    <text x="112" y="161" fill="#ffffff" fontSize="9" fontFamily="sans-serif" fontWeight="bold">KES</text>
    <line x1="155" y1="157" x2="195" y2="157" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />

    {/* Arrow: Product -> Cart Node */}
    <line x1="225" y1="120" x2="310" y2="120" stroke="#04122b" strokeWidth="3" />
    <polygon points="310,115 322,120 310,125" fill="#04122b" />

    {/* Central Circle Node (Shopping Cart) */}
    <circle cx="365" cy="120" r="38" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    {/* Shopping cart icon inside */}
    <g transform="translate(345, 105)">
      <path d="M0 5h6l5 18h18l4-14H10" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="27" r="3" fill="#04122b" />
      <circle cx="26" cy="27" r="3" fill="#04122b" />
    </g>

    {/* Arrow: Cart -> Instant Checkout Card */}
    <path d="M403 120h42v95" fill="none" stroke="#04122b" strokeWidth="3" />
    <polygon points="440,215 445,227 450,215" fill="#04122b" />

    {/* BOTTOM-RIGHT: Checkout Funnel Card */}
    <rect x="380" y="230" width="195" height="135" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="385" y="235" width="195" height="135" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="400" y="250" width="165" height="105" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Order Items */}
    <rect x="415" y="265" width="18" height="18" rx="3" fill="#e8edf5" stroke="#04122b" strokeWidth="1.8" />
    <line x1="442" y1="274" x2="520" y2="274" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    
    <rect x="415" y="292" width="18" height="18" rx="3" fill="#e8edf5" stroke="#04122b" strokeWidth="1.8" />
    <line x1="442" y1="301" x2="495" y2="301" stroke="#04122b" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Pay Button with Checkmark */}
    <rect x="415" y="320" width="125" height="24" rx="4" fill="#0066FF" stroke="#04122b" strokeWidth="2" />
    <polyline points="460,332 466,338 476,326" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* Arrow: Checkout -> Fulfillment Triangle */}
    <line x1="380" y1="300" x2="290" y2="300" stroke="#04122b" strokeWidth="3" />
    <polygon points="290,295 278,300 290,305" fill="#04122b" />

    {/* BOTTOM-CENTER: Fast Fulfillment Box Triangle */}
    <polygon points="230,240 185,335 275,335" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    {/* Delivery parcel box */}
    <rect x="215" y="275" width="30" height="28" fill="#e8edf5" stroke="#04122b" strokeWidth="2" />
    <line x1="230" y1="275" x2="230" y2="303" stroke="#0066FF" strokeWidth="2" />
  </svg>
);

// 6. AI SERVICE ILLUSTRATION: Prompt Card, AI Sparkle Star & Knowledge Base
export const AiServiceDiagram: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 680 430"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full select-none ${className}`}
    shapeRendering="geometricPrecision"
  >
    <GridBackground id="grid-ai" />

    {/* Floating accent dots */}
    <circle cx="515" cy="110" r="14" fill="#ff4520" />
    <circle cx="480" cy="80" r="7" fill="#04122b" />
    <circle cx="95" cy="315" r="15" fill="#ff4520" />
    <circle cx="150" cy="265" r="7" fill="#04122b" />
    <circle cx="600" cy="270" r="11" fill="#ff4520" />

    {/* TOP-LEFT: Prompt & Context Card (Matching Jasper Card 1) */}
    <rect x="75" y="48" width="145" height="145" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="80" y="53" width="145" height="145" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="92" y="65" width="121" height="121" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* User Avatar Silhouette inside */}
    <circle cx="152" cy="100" r="18" fill="#0066FF" stroke="#04122b" strokeWidth="2.5" />
    <path d="M125 150 c0 -18 12 -25 27 -25 s27 7 27 25 z" fill="#0066FF" stroke="#04122b" strokeWidth="2.5" />

    {/* Gear Badge on Top-Left */}
    <g transform="translate(64, 38)">
      <circle cx="16" cy="16" r="14" fill="#0066FF" stroke="#04122b" strokeWidth="3" />
      <circle cx="16" cy="16" r="6" fill="#ffffff" stroke="#04122b" strokeWidth="2" />
      <path d="M16 0v6M16 26v6M0 16h6M26 16h6M5 5l4 4M23 23l4 4M5 27l4-4M23 9l4-4" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Arrow: Prompt Card -> AI Sparkle Star */}
    <line x1="225" y1="120" x2="300" y2="120" stroke="#04122b" strokeWidth="3" />
    <polygon points="300,115 312,120 300,125" fill="#04122b" />

    {/* CENTRAL NODE: 4-Pointed AI Sparkle Star with Orbital Loops (Matching Jasper Card 2!) */}
    <g transform="translate(365, 120)">
      {/* 3 Elliptical Orbital Loops */}
      <ellipse cx="0" cy="0" rx="55" ry="24" transform="rotate(-25)" fill="none" stroke="#04122b" strokeWidth="2.2" />
      <ellipse cx="0" cy="0" rx="55" ry="24" transform="rotate(35)" fill="none" stroke="#04122b" strokeWidth="2.2" />
      <ellipse cx="0" cy="0" rx="52" ry="22" transform="rotate(85)" fill="none" stroke="#04122b" strokeWidth="2.2" />
      
      {/* 4-Pointed Star */}
      <path
        d="M0 -34 Q0 0 34 0 Q0 0 0 34 Q0 0 -34 0 Q0 0 0 -34 Z"
        fill="#0066FF"
        stroke="#04122b"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Inner White Star */}
      <path
        d="M0 -15 Q0 0 15 0 Q0 0 0 15 Q0 0 -15 0 Q0 0 0 -15 Z"
        fill="#ffffff"
        stroke="#04122b"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </g>

    {/* Arrow: Sparkle -> Structured Output Card */}
    <path d="M425 120h25v95" fill="none" stroke="#04122b" strokeWidth="3" />
    <polygon points="445,215 450,227 455,215" fill="#04122b" />

    {/* BOTTOM-RIGHT: Structured Output Document Card (Matching Jasper Card 1 checklist!) */}
    <rect x="380" y="230" width="195" height="135" fill="none" stroke="#04122b" strokeWidth="3" />
    <rect x="385" y="235" width="195" height="135" fill="#0066FF" stroke="#0066FF" strokeWidth="1" />
    
    <rect x="400" y="250" width="165" height="105" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    {/* Checkbox 1 */}
    <rect x="415" y="265" width="22" height="22" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    <polyline points="419,276 424,281 432,271" fill="none" stroke="#0066FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="448" y1="276" x2="540" y2="276" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />

    {/* Checkbox 2 */}
    <rect x="415" y="298" width="22" height="22" fill="#ffffff" stroke="#04122b" strokeWidth="2.5" />
    <line x1="448" y1="309" x2="520" y2="309" stroke="#04122b" strokeWidth="3" strokeLinecap="round" />

    {/* Text line 3 */}
    <line x1="448" y1="330" x2="495" y2="330" stroke="#0066FF" strokeWidth="3" strokeLinecap="round" />

    {/* Arrow: Output Card -> Knowledge Triangle */}
    <line x1="380" y1="300" x2="290" y2="300" stroke="#04122b" strokeWidth="3" />
    <polygon points="290,295 278,300 290,305" fill="#04122b" />

    {/* BOTTOM-CENTER: Grounded Knowledge Triangle */}
    <polygon points="230,240 185,335 275,335" fill="#ffffff" stroke="#04122b" strokeWidth="3" />
    <circle cx="230" cy="285" r="14" fill="#none" stroke="#04122b" strokeWidth="2" />
    <polyline points="225,285 229,289 237,281" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
