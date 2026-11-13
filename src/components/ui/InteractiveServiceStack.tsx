"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, X, ArrowUpRight } from "lucide-react";

export interface ServiceStackItem {
  id: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  category: string;
  price: string;
  badge?: string;
  description: string;
  features: { text: string; included: boolean }[];
  pageId: string;
  bgHex: string;
  textDark: boolean; // true = dark text, false = white text
  rotation: number;
}

const DEFAULT_SERVICES: ServiceStackItem[] = [
  {
    id: "web-dev",
    number: "SERVICE 01",
    titleLine1: "WEB DESIGN",
    titleLine2: "DEVELOPMENT",
    category: "WEB ARCHITECTURE",
    price: "$1,200",
    description: "Custom residential and commercial web platforms tailored to convert visitors into loyal customers.",
    features: [
      { text: "Design & Pre-Construction", included: true },
      { text: "Project Management", included: true },
      { text: "Site & Construction", included: true },
      { text: "Legacy Server Setup", included: false },
    ],
    pageId: "service-web",
    bgHex: "#bcf846", // Signature Lime from Image 2
    textDark: true,
    rotation: -5,
  },
  {
    id: "app-dev",
    number: "SERVICE 02",
    titleLine1: "MOBILE APPS",
    titleLine2: "USSD SYSTEMS",
    category: "MOBILE & USSD",
    price: "$1,800",
    description: "Large-scale mobile apps and telco USSD solutions built from foundation to launch without data limits.",
    features: [
      { text: "Native iOS & Android", included: true },
      { text: "USSD Telco Menu Trees", included: true },
      { text: "24/7 Security & Offline", included: true },
      { text: "Desktop-Only Lock-in", included: false },
    ],
    pageId: "service-app",
    bgHex: "#d8baf8", // Soft Lilac / Purple from Image 2
    textDark: true,
    rotation: -3,
  },
  {
    id: "seo-marketing",
    number: "SERVICE 03",
    titleLine1: "SEO & DIGITAL",
    titleLine2: "MARKETING",
    category: "SEARCH & DISCOVERY",
    price: "$2,400",
    description: "Authority-driven search and answer-engine presence that commands top Google and AI rankings.",
    features: [
      { text: "Technical SEO & Schema", included: true },
      { text: "AEO / Perplexity Rank", included: true },
      { text: "Bulk SMS High Reach", included: true },
      { text: "Vanity Click Farming", included: false },
    ],
    pageId: "service-seo",
    bgHex: "#761e31", // Deep Wine / Maroon from Image 2
    textDark: false,
    rotation: -1,
  },
  {
    id: "payments-integrations",
    number: "SERVICE 04",
    titleLine1: "PAYMENTS &",
    titleLine2: "INTEGRATION",
    category: "FINTECH & APIS",
    price: "$3,200",
    description: "Comprehensive payment rails and system architecture with zero leakage or manual reconciliation.",
    features: [
      { text: "M-Pesa Daraja STK Push", included: true },
      { text: "Multi-Currency Checkout", included: true },
      { text: "Automated Error Queues", included: true },
      { text: "Manual Recon Spreadsheets", included: false },
    ],
    pageId: "service-payments",
    bgHex: "#e05929", // Vibrant Burnt Orange / Terracotta from Image 2
    textDark: false,
    rotation: 1,
  },
  {
    id: "ecommerce",
    number: "SERVICE 05",
    titleLine1: "E-COMMERCE",
    titleLine2: "STOREFRONTS",
    category: "DIGITAL RETAIL",
    price: "$4,400",
    description: "Streamlined storefronts and multi-channel inventory built for seamless speed and peak checkout conversion.",
    features: [
      { text: "Headless Storefront", included: true },
      { text: "Real-Time Stock Sync", included: true },
      { text: "1-Click M-Pesa Checkout", included: true },
      { text: "Third-Party Slow Plugins", included: false },
    ],
    pageId: "service-ecommerce",
    bgHex: "#18191c", // Matte Carbon / Pitch Black from Image 2
    textDark: false,
    rotation: 3,
  },
  {
    id: "ai-automation",
    number: "SERVICE 06",
    titleLine1: "AI & PROCESS",
    titleLine2: "AUTOMATION",
    category: "INTELLIGENT SYSTEMS",
    price: "$5,999",
    badge: "★ MOST POPULAR",
    description: "Practical intelligent automation and OCR systems built to save 15+ hours weekly per team.",
    features: [
      { text: "Design & Pre-Discovery", included: true },
      { text: "Workflow Automation", included: true },
      { text: "Human-in-the-Loop Safe", included: true },
    ],
    pageId: "service-ai",
    bgHex: "#1e5b45", // Deep Pine / Forest Green from Image 2
    textDark: false,
    rotation: 5,
  },
];

interface InteractiveServiceStackProps {
  services?: ServiceStackItem[];
  setCurrentPage?: (page: string) => void;
  className?: string;
}

export const InteractiveServiceStack: React.FC<InteractiveServiceStackProps> = ({
  services = DEFAULT_SERVICES,
  setCurrentPage,
  className = "",
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number>(0);

  const total = services.length;

  return (
    <div className={`w-full select-none ${className}`}>
      {/* =========================================================================
          DESKTOP VIEW (lg+): Interactive Fanned Stack Cards matching Image 2 & Framer
         ========================================================================= */}
      <div className="hidden lg:flex justify-center items-center relative py-12 px-2 overflow-visible min-h-[600px]">
        <div className="relative flex items-center justify-center max-w-full">
          {services.map((service, index) => {
            const isHovered = hoveredIdx === index;
            const hasHover = hoveredIdx !== null;
            
            // Sibling spread physics matching Sherwin's InteractiveStackCard
            let shiftX = 0;
            if (hasHover) {
              if (index < hoveredIdx) {
                // Sibling to the left pushes left
                shiftX = -36 - (hoveredIdx - index) * 6;
              } else if (index > hoveredIdx) {
                // Sibling to the right pushes right to reveal hovered card
                shiftX = 46 + (index - hoveredIdx) * 6;
              }
            }

            // Negative horizontal overlap for the fanned deck
            const overlapMargin = index === 0 ? "ml-0" : "-ml-14 xl:-ml-18";

            // Layering: default stack 10..15; hovered pops to 50
            const zIndex = isHovered ? 50 : 10 + index;

            const textPrimary = service.textDark ? "text-gray-950" : "text-white";
            const textSecondary = service.textDark ? "text-gray-800" : "text-white/85";
            const textMuted = service.textDark ? "text-gray-700" : "text-white/70";
            const borderColor = service.textDark ? "border-black/10" : "border-white/15";
            const buttonBg = service.textDark 
              ? "bg-gray-950 text-white hover:bg-black" 
              : "bg-white text-gray-950 hover:bg-white/90";

            return (
              <motion.div
                key={service.id}
                className={`relative shrink-0 w-[245px] xl:w-[265px] h-[490px] xl:h-[510px] rounded-none p-6 xl:p-7 flex flex-col justify-between cursor-pointer border shadow-lg ${overlapMargin}`}
                style={{
                  backgroundColor: service.bgHex,
                  borderColor: borderColor,
                  zIndex: zIndex,
                  transformOrigin: "bottom center",
                }}
                initial={false}
                animate={{
                  y: isHovered ? -34 : 0,
                  x: shiftX,
                  rotate: isHovered ? 0 : service.rotation,
                  scale: isHovered ? 1.04 : 1.0,
                  boxShadow: isHovered 
                    ? "0 30px 60px -15px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.2) inset" 
                    : "0 10px 25px -5px rgba(0,0,0,0.18)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 28,
                  mass: 0.8,
                }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setCurrentPage?.(service.pageId)}
                tabIndex={0}
                onFocus={() => setHoveredIdx(index)}
                onBlur={() => setHoveredIdx(null)}
                role="button"
                aria-label={`${service.number} - ${service.titleLine1} ${service.titleLine2}`}
              >
                {/* Subtle Inner Highlight Border */}
                <div 
                  className="absolute inset-0 rounded-none pointer-events-none"
                  style={{
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(0, 0, 0, 0.15)",
                  }}
                />

                {/* ================= TOP SECTION ================= */}
                <div className="space-y-3.5">
                  {/* Eyebrow Number & Optional Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono tracking-wider uppercase font-semibold ${textMuted}`}>
                      {service.number}
                    </span>

                    {service.badge && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold tracking-tight bg-white text-gray-950 shadow-xs uppercase">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Big Bold Condensed Title matching Image 2 */}
                  <div className="space-y-0.5 pt-0.5">
                    <h3 className={`text-[21px] xl:text-[23px] font-black tracking-[-0.03em] leading-[1.05] uppercase ${textPrimary}`}>
                      {service.titleLine1}
                    </h3>
                    <h3 className={`text-[21px] xl:text-[23px] font-black tracking-[-0.03em] leading-[1.05] uppercase ${textPrimary}`}>
                      {service.titleLine2}
                    </h3>
                  </div>

                  {/* Price Tag with STARTING FROM */}
                  <div className="pt-1.5">
                    <span className={`block text-[10px] font-mono tracking-widest uppercase font-semibold opacity-70 ${textMuted}`}>
                      STARTING FROM
                    </span>
                    <span className={`text-2xl xl:text-[26px] font-extrabold tracking-tight ${textPrimary}`}>
                      {service.price}
                    </span>
                  </div>

                  {/* Bullet Checklist with ✓ and ✕ */}
                  <ul className="space-y-2 pt-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {feat.included ? (
                          <Check className={`w-3.5 h-3.5 shrink-0 stroke-[2.5] ${service.textDark ? "text-gray-950" : "text-white"}`} />
                        ) : (
                          <X className={`w-3.5 h-3.5 shrink-0 stroke-[2] opacity-50 ${service.textDark ? "text-gray-600" : "text-white/60"}`} />
                        )}
                        <span className={`text-[11.5px] xl:text-[12px] font-medium leading-tight ${feat.included ? textSecondary : textMuted}`}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ================= BOTTOM SECTION ================= */}
                <div className="space-y-3.5 pt-3.5 border-t border-black/10 dark:border-white/10">
                  {/* Brief Narrative Description */}
                  <p className={`text-[11px] xl:text-[11.5px] leading-relaxed line-clamp-3 font-normal ${textSecondary}`}>
                    {service.description}
                  </p>

                  {/* CTA Button & Index Pagination */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentPage?.(service.pageId);
                      }}
                      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-none text-[10.5px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${buttonBg}`}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <span className={`text-[11px] font-mono font-semibold tracking-wider ${textMuted}`}>
                      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          TABLET & MOBILE VIEW (< lg): Responsive Horizontal Snap Carousel / Stack
         ========================================================================= */}
      <div className="lg:hidden px-4 py-6">
        {/* Horizontal scroll container with snap */}
        <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory no-scrollbar px-2">
          {services.map((service, index) => {
            const textPrimary = service.textDark ? "text-gray-950" : "text-white";
            const textSecondary = service.textDark ? "text-gray-800" : "text-white/80";
            const textMuted = service.textDark ? "text-gray-700" : "text-white/70";
            const buttonBg = service.textDark 
              ? "bg-gray-950 text-white" 
              : "bg-white text-gray-950";

            return (
              <div
                key={service.id}
                onClick={() => {
                  setMobileActiveIdx(index);
                  setCurrentPage?.(service.pageId);
                }}
                className="shrink-0 w-[280px] sm:w-[310px] h-[490px] rounded-none p-6 flex flex-col justify-between snap-center shadow-lg cursor-pointer"
                style={{ backgroundColor: service.bgHex }}
              >
                {/* Top Section */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono tracking-wider uppercase font-semibold ${textMuted}`}>
                      {service.number}
                    </span>
                    {service.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white text-gray-950 shadow-xs uppercase">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h3 className={`text-2xl font-black tracking-tight leading-tight uppercase ${textPrimary}`}>
                      {service.titleLine1}
                    </h3>
                    <h3 className={`text-2xl font-black tracking-tight leading-tight uppercase ${textPrimary}`}>
                      {service.titleLine2}
                    </h3>
                  </div>

                  <div className="pt-1">
                    <span className={`block text-[10px] font-mono tracking-widest uppercase font-semibold opacity-70 ${textMuted}`}>
                      STARTING FROM
                    </span>
                    <span className={`text-2xl font-extrabold tracking-tight ${textPrimary}`}>
                      {service.price}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        {feat.included ? (
                          <Check className={`w-3.5 h-3.5 shrink-0 stroke-[2.5] ${service.textDark ? "text-gray-950" : "text-white"}`} />
                        ) : (
                          <X className={`w-3.5 h-3.5 shrink-0 stroke-[2] opacity-50 ${service.textDark ? "text-gray-600" : "text-white/60"}`} />
                        )}
                        <span className={`text-xs font-medium ${feat.included ? textSecondary : textMuted}`}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Section */}
                <div className="space-y-3 pt-4 border-t border-black/10 dark:border-white/10">
                  <p className={`text-xs leading-relaxed ${textSecondary}`}>
                    {service.description}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider shadow-xs ${buttonBg}`}
                    >
                      <span>LEARN MORE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <span className={`text-xs font-mono font-semibold ${textMuted}`}>
                      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Indicator Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-2">
          {services.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                mobileActiveIdx === i ? "w-6 bg-[#0066FF]" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveServiceStack;
