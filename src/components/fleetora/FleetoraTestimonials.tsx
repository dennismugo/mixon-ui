import React from 'react';
import { motion } from 'motion/react';
import { AnimatedTestimonials, Testimonial } from '@/components/ui/testimonials-with-marquee-utils/animated-testimonials';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../ui/ScrollRevealText';

export const FleetoraTestimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Jennifer Mwangi",
      handle: "Head of Portfolio Operations · Apex Properties",
      description:
        "Mixon transformed our portfolio operations within sixty days. Their automated M-Pesa STK reconciliation, digital lease contracts, and real-time tenant payment ledger completely eliminated our monthly variance.",
      image: "/avatars/avatar1.jpg",
    },
    {
      name: "David Ochieng",
      handle: "Managing Director · Kilifi Coast Collection",
      description:
        "Double-booking across channels used to be our biggest headache during high season. With sub-second calendar locking, our channels are always synchronized and direct bookings have surged dramatically.",
      image: "/avatars/avatar2.jpg",
    },
    {
      name: "Amina Kassim",
      handle: "Chief Commercial Officer · PrimeMart Supermarkets",
      description:
        "Managing stock and cash reconciliation across 8 branch locations was a nightmare of spreadsheets. Mixon connects our bar code scanners and Daraja paybill directly to live inventory, saving 3 hours every single shift.",
      image: "/avatars/avatar3.jpg",
    },
    {
      name: "Sarah Mitchell",
      handle: "Product Designer · Horizon Systems",
      description:
        "The attention to detail is incredible. Every interaction feels polished and intentional. Operators and field teams are always impressed with the clarity and ease of use.",
      image: "/avatars/avatar4.jpg",
    },
    {
      name: "David Chen",
      handle: "Lead Infrastructure Architect · Coastline Fintech",
      description:
        "Best developer and operator stack we've integrated. Clean architecture, high-throughput microservices, sub-second ledger sync, and documentation that actually makes sense.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Maria Santos",
      handle: "Operations Director · Rift Valley Logistics",
      description:
        "Finally found a platform that bridges the gap between digital payments and physical inventory. The automated reconciliations are flawless and the customization is endless.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "James Anderson",
      handle: "Financial Controller · Urban Stays",
      description:
        "Integration was completely seamless. No bloat, zero downtime, and instant payment clearance across active banking and mobile money rails.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    {
      name: "Priya Sharma",
      handle: "VP of Asset Management · Savannah Towers",
      description:
        "The system is thoughtfully crafted for African enterprise workflows. Every component feels cohesive, audit-ready, and resilient under high transaction volume.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white text-gray-950 relative overflow-hidden select-none w-full">
      {/* Header Container - perfectly aligned with Navbar logo and max-w-7xl grid */}
      <div className="w-full px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
          
          {/* Section Header: Centered with text reveal on scroll */}
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
            <ScrollRevealHeading 
              as="h2"
              className="font-sans text-2xl sm:text-3xl lg:text-[40px] font-bold text-gray-950 tracking-[-0.025em] leading-[1.18] max-w-xl mx-auto [text-wrap:balance]"
            >
              Trusted by operators who depend on bulletproof reliability.
            </ScrollRevealHeading>

            <ScrollRevealParagraph className="font-sans text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-xl mx-auto [text-wrap:balance]">
              Real outcomes from commercial property leaders, hospitality directors, and enterprise retailers.
            </ScrollRevealParagraph>
          </div>

        </div>
      </div>

      {/* Marquee Testimonials Grid with Dual Infinite Tracks (Full Width) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px 80px 0px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full"
      >
        <AnimatedTestimonials data={testimonials} duration={48} />
      </motion.div>
    </section>
  );
};
