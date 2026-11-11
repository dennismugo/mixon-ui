import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, ClipboardList, RefreshCw, ShieldCheck, Zap, FileText, TrendingUp, Activity } from 'lucide-react';

import happyBlackLadyLaptop from '../assets/images/happy_black_lady_laptop.jpg';
import mixonResortVillas from '../assets/images/mixon_resort_villas_1784147227224.jpg';
import mixonHostess from '../assets/images/mixon_hostess_1784147240664.jpg';
import mixonBlackProfessional from '../assets/images/mixon_black_professional_laptop_1784145091457.jpg';

interface SlideData {
  id: number;
  image: string;
  alt: string;
  pill1: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  };
  pill2: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  };
}

const slides: SlideData[] = [
  {
    id: 1,
    image: happyBlackLadyLaptop,
    alt: "Happy Black businesswoman managing hospitality with laptop",
    pill1: {
      title: "Collaboration",
      subtitle: "Collab with others for content creation",
      icon: <Users className="w-5 h-5 text-gray-700" />,
    },
    pill2: {
      title: "Project",
      subtitle: "Create projects to hire talents",
      icon: <ClipboardList className="w-5 h-5 text-gray-700" />,
    },
  },
  {
    id: 2,
    image: mixonResortVillas,
    alt: "Luxury resort villas with automated management",
    pill1: {
      title: "Calendar Sync",
      subtitle: "Airbnb & Booking.com locked in 14ms",
      icon: <RefreshCw className="w-5 h-5 text-[#093173]" />,
    },
    pill2: {
      title: "Conflict Resolver",
      subtitle: "0 double bookings detected",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    },
  },
  {
    id: 3,
    image: mixonHostess,
    alt: "Hospitality manager coordinating guest check-in",
    pill1: {
      title: "Instant Settlement",
      subtitle: "KES 37,000 M-Pesa paybill reconciled",
      icon: <Zap className="w-5 h-5 text-amber-600" />,
    },
    pill2: {
      title: "Sovereign Split",
      subtitle: "Owner 85% • Escrow 15% auto-disbursed",
      icon: <FileText className="w-5 h-5 text-[#093173]" />,
    },
  },
  {
    id: 4,
    image: mixonBlackProfessional,
    alt: "Professional entrepreneur analyzing property metrics",
    pill1: {
      title: "Dynamic Pricing",
      subtitle: "KES 18,500/night (+42% demand surge)",
      icon: <TrendingUp className="w-5 h-5 text-[#093173]" />,
    },
    pill2: {
      title: "Multi-Unit Node",
      subtitle: "14 properties monitored in real time",
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
    },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = slides[current];

  return (
    <div 
      className="w-full flex flex-col items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Image Slider Card */}
      <div className="relative w-full aspect-[4/3.7] sm:aspect-[4/3.4] lg:aspect-[4/3.5] max-h-[560px] rounded-[32px] sm:rounded-[42px] overflow-hidden bg-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/5">
        
        {/* Animated Background Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={activeSlide.image}
              alt={activeSlide.alt}
              className="w-full h-full object-cover object-[center_28%]"
            />
            {/* Subtle bottom gradient to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Overlaid Pill Cards on Bottom-Left */}
        <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-20 flex flex-col gap-2.5 max-w-[85%] sm:max-w-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`pills-${activeSlide.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col gap-2.5"
            >
              {/* Pill 1 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 px-4 sm:px-5 shadow-lg shadow-black/8 border border-black/5 flex items-center justify-between gap-4">
                <div className="text-left">
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-950 leading-tight">
                    {activeSlide.pill1.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-normal leading-snug mt-0.5">
                    {activeSlide.pill1.subtitle}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  {activeSlide.pill1.icon}
                </div>
              </div>

              {/* Pill 2 */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 px-4 sm:px-5 shadow-lg shadow-black/8 border border-black/5 flex items-center justify-between gap-4">
                <div className="text-left">
                  <h4 className="text-xs sm:text-[13px] font-bold text-gray-950 leading-tight">
                    {activeSlide.pill2.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-normal leading-snug mt-0.5">
                    {activeSlide.pill2.subtitle}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                  {activeSlide.pill2.icon}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Pagination Bullets Centered Below the Card */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-1">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === current
                ? 'w-6 h-2 bg-gray-800'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
