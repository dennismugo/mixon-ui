import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import webImg from '../../assets/images/services/service_web.jpg';
import paymentsImg from '../../assets/images/services/service_payments.jpg';

interface FleetoraInsightsProps {
  setCurrentPage?: (page: string) => void;
}

export const FleetoraInsights: React.FC<FleetoraInsightsProps> = ({ setCurrentPage }) => {
  const articles = [
    {
      id: 'daraja-rails',
      category: 'Financial Architecture',
      title: 'Building Zero-Leakage Payment Rails for Fast-Moving African Enterprises',
      desc: 'How automated Daraja STK webhooks, automated ledger reconciliation, and distributed event pipelines eliminate manual bookkeeping errors entirely.',
      author: 'Kevin Mwangi',
      role: 'Lead Systems Architect',
      date: 'Oct 24, 2026',
      readTime: '5 min read',
      image: paymentsImg
    },
    {
      id: 'channel-locking',
      category: 'Hospitality Operations',
      title: 'How Sub-Second Channel Locking Protects Booking Margins Across Peak Seasons',
      desc: 'Actionable strategies used by top Nairobi and coastal villa managers to eradicate double-booking penalties and boost direct web conversions.',
      author: 'Grace Wanjiku',
      role: 'Head of Product Operations',
      date: 'Oct 18, 2026',
      readTime: '4 min read',
      image: webImg
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-white text-gray-950 relative overflow-hidden select-none w-full px-6 sm:px-10 lg:px-14">
      
      <div className="w-full max-w-7xl mx-auto relative z-10 text-left">
        
        {/* Header Block matching Fleetora blog-header-box (eyebrow pill removed) */}
        <div className="max-w-4xl space-y-4 mb-16 sm:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 80px 0px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-sans text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-gray-950 tracking-[-0.03em] leading-[1.12]"
          >
            Insights &amp; Resources
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px 80px 0px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl"
          >
            Stay informed with engineering insights, operational benchmarks, and practical playbooks designed to help businesses optimize revenue and scale resilient operations.
          </motion.p>
        </div>

        {/* 2-Column Articles Grid matching Fleetora blog-collection-item */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {articles.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px 60px 0px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col justify-between"
              onClick={() => setCurrentPage ? setCurrentPage('services') : null}
            >
              <div>
                {/* Image Wrap */}
                <div className="w-full aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 mb-6 relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-gray-950 text-xs font-mono font-bold shadow-xs">
                      {art.category}
                    </span>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-[-0.02em] leading-snug group-hover:text-[#0066FF] transition-colors mb-3">
                  {art.title}
                </h3>

                {/* Subtitle */}
                <p className="font-sans text-sm sm:text-base text-gray-600 font-light leading-relaxed mb-6">
                  {art.desc}
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="font-sans text-sm font-bold text-gray-950">
                    {art.author}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {art.role}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-[#0066FF] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
