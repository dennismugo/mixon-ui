import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  Phone, 
  PhoneCall,
  Mail, 
  MapPin, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { Lead } from '../types';
import { AppLink } from '../components/AppLink';
import { PageId } from '../seo/mixonSeo';

interface ContactProps {
  onLeadCaptured: (lead: Lead) => void;
  setCurrentPage?: (page: PageId) => void;
}

export default function Contact({ onLeadCaptured, setCurrentPage }: ContactProps) {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    country: 'Kenya',
    discussTopic: 'A general enquiry',
    requirement: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onLeadCaptured({
        id: Date.now().toString(),
        name: formData.fullName || 'Website Visitor',
        email: formData.email,
        company: formData.businessName || 'Inquiry',
        productOfInterest: formData.discussTopic || 'General Consultation',
        notes: `Country: ${formData.country} | Phone: ${formData.phone} | Topic: ${formData.discussTopic} | Requirement: ${formData.requirement}`,
        createdAt: new Date().toISOString()
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="mixon-interior-page mixon-contact-page bg-white text-gray-900 pt-28 pb-20 selection:bg-[#0066FF] selection:text-white">
      
      {/* =========================================================================
          HERO BANNER: Radiant Gradient Card with ONLY the Title (Centered)
         ========================================================================= */}
      <section aria-label="contact-hero" className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-10 sm:pb-14 select-none mixon-contact-hero-section">
        <div 
          className="mixon-contact-hero relative w-full max-w-7xl mx-auto rounded-lg sm:rounded-xl overflow-hidden py-14 sm:py-20 lg:py-24 px-6 sm:px-12 text-center shadow-[0_24px_70px_-20px_rgba(79,70,229,0.35)] border border-white/20 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[260px]"
          style={{
            background: `
              radial-gradient(ellipse 65% 55% at 92% 102%, rgba(216, 148, 255, 0.95) 0%, rgba(216, 148, 255, 0.4) 40%, transparent 70%),
              radial-gradient(ellipse 65% 55% at 8% 102%, rgba(168, 146, 255, 0.95) 0%, rgba(168, 146, 255, 0.4) 40%, transparent 70%),
              radial-gradient(ellipse 85% 45% at 50% 105%, rgba(190, 160, 240, 0.85) 0%, rgba(190, 160, 240, 0.3) 45%, transparent 75%),
              linear-gradient(135deg, #1e40af 0%, #2563eb 25%, #4f46e5 55%, #6d28d9 80%, #9333ea 100%)
            `
          }}
        >
          {/* Diffused ambient light sheen */}
          <div 
            aria-hidden="true" 
            className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.4)_0%,transparent_60%)]" 
          />

          <h1 className="relative z-10 hero-title font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold !text-white tracking-[-0.03em] leading-[1.12] max-w-4xl mx-auto text-center [text-wrap:balance]">
            Ready to take the work out of managing tasks?
          </h1>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTACT & REQUIREMENT SECTION: Format matching Image 2
         ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 sm:pb-32">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: Tell us what your business needs & Details */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-8 text-left"
            >
              
              {/* Main Heading & Subtitle matching Image 2 */}
              <div className="space-y-4">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold text-gray-950 tracking-tight leading-[1.15]">
                  Tell us what your business <span className="text-[#0066FF]">needs</span>
                </h2>
                <p className="text-gray-600 font-sans text-sm sm:text-base leading-relaxed font-normal max-w-xl">
                  Whether you are planning a banking solution, connecting systems, improving customer service or developing a business application, start with the requirement. We will work with you to identify the next step.
                </p>
              </div>

              {/* Contact Info Tiles (Email, Phone, Additional Contact, Office) - Premium Redesign */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5 pt-2">
                
                {/* 1. Email Box */}
                <a 
                  href="mailto:info@mixonsoftwares.co.ke" 
                  className="group relative p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)] hover:border-[#0066FF]/60 hover:shadow-[0_18px_36px_-8px_rgba(0,102,255,0.18),0_6px_16px_-4px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[148px]"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0066FF]/[0.04] group-hover:bg-[#0066FF]/[0.12] rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
                    <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0052D4] border border-blue-400/30 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,102,255,0.32)] group-hover:shadow-[0_8px_24px_rgba(0,102,255,0.5),0_0_0_4px_rgba(0,102,255,0.2)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 ease-out overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-[160%] group-hover:before:translate-x-[160%] before:transition-transform before:duration-700 before:ease-in-out">
                      <Mail className="w-5 h-5 text-white stroke-[2.2] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-bold text-slate-500 group-hover:text-[#0066FF] transition-colors">
                        EMAIL
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="space-y-0.5 min-w-0 relative z-10">
                    <p className="font-sans font-bold text-[14px] sm:text-[14.5px] text-slate-900 group-hover:text-[#0066FF] transition-colors truncate tracking-tight">
                      info@mixonsoftwares.co.ke
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 font-normal truncate">
                      contact@mixonsoftwares.co.ke
                    </p>
                  </div>
                </a>

                {/* 2. Primary Phone Box */}
                <a 
                  href="tel:+254713958492" 
                  className="group relative p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)] hover:border-[#0066FF]/60 hover:shadow-[0_18px_36px_-8px_rgba(0,102,255,0.18),0_6px_16px_-4px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[148px]"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0066FF]/[0.04] group-hover:bg-[#0066FF]/[0.12] rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
                    <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0052D4] border border-blue-400/30 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,102,255,0.32)] group-hover:shadow-[0_8px_24px_rgba(0,102,255,0.5),0_0_0_4px_rgba(0,102,255,0.2)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-out overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-[160%] group-hover:before:translate-x-[160%] before:transition-transform before:duration-700 before:ease-in-out">
                      <Phone className="w-5 h-5 text-white stroke-[2.2] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-[16deg]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-bold text-slate-500 group-hover:text-[#0066FF] transition-colors">
                        PHONE
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="space-y-0.5 min-w-0 relative z-10">
                    <p className="font-sans font-bold text-[14.5px] sm:text-[15px] text-slate-900 group-hover:text-[#0066FF] transition-colors tracking-tight">
                      +254 713 958 492
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 font-normal truncate">
                      Direct engineering &amp; sales desk
                    </p>
                  </div>
                </a>

                {/* 3. Additional Contact Phone Box */}
                <a 
                  href="tel:+254741733878" 
                  className="group relative p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)] hover:border-[#0066FF]/60 hover:shadow-[0_18px_36px_-8px_rgba(0,102,255,0.18),0_6px_16px_-4px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[148px]"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0066FF]/[0.04] group-hover:bg-[#0066FF]/[0.12] rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
                    <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0052D4] border border-blue-400/30 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,102,255,0.32)] group-hover:shadow-[0_8px_24px_rgba(0,102,255,0.5),0_0_0_4px_rgba(0,102,255,0.2)] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 ease-out overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-[160%] group-hover:before:translate-x-[160%] before:transition-transform before:duration-700 before:ease-in-out">
                      <PhoneCall className="w-5 h-5 text-white stroke-[2.2] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-[16deg]" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-bold text-slate-500 group-hover:text-[#0066FF] transition-colors">
                        ADDITIONAL CONTACT
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="space-y-0.5 min-w-0 relative z-10">
                    <p className="font-sans font-bold text-[14.5px] sm:text-[15px] text-slate-900 group-hover:text-[#0066FF] transition-colors tracking-tight">
                      +254 741 733 878
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 font-normal truncate">
                      Client operations &amp; support desk
                    </p>
                  </div>
                </a>

                {/* 4. Office Location Box */}
                <a 
                  href="https://maps.google.com/?q=Mihrab+Building,+15th+Floor,+Ring+Road+Kilimani,+Nairobi,+Kenya" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/50 border border-slate-200/90 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)] hover:border-[#0066FF]/60 hover:shadow-[0_18px_36px_-8px_rgba(0,102,255,0.18),0_6px_16px_-4px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[148px]"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0066FF]/[0.04] group-hover:bg-[#0066FF]/[0.12] rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#0066FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center justify-between gap-2 mb-3.5 relative z-10">
                    <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#0052D4] border border-blue-400/30 text-white flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,102,255,0.32)] group-hover:shadow-[0_8px_24px_rgba(0,102,255,0.5),0_0_0_4px_rgba(0,102,255,0.2)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-out overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:-translate-x-[160%] group-hover:before:translate-x-[160%] before:transition-transform before:duration-700 before:ease-in-out">
                      <MapPin className="w-5 h-5 text-white stroke-[2.2] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] font-bold text-slate-500 group-hover:text-[#0066FF] transition-colors">
                        OFFICE LOCATION
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </div>
                  <div className="space-y-0.5 min-w-0 relative z-10">
                    <p className="font-sans font-bold text-[14px] sm:text-[14.5px] text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug">
                      Mihrab Building, 15th Floor
                    </p>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 font-normal truncate">
                      Ring Road Kilimani, Nairobi, Kenya
                    </p>
                  </div>
                </a>

              </div>

            </motion.div>

            {/* RIGHT COLUMN: The Form Card matching Image 2 */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 w-full"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-[0_16px_45px_rgba(0,0,0,0.06)] border border-gray-200/90 select-text">
                
                <div className="text-center mb-8 space-y-2">
                  <h3 className="font-display text-2xl sm:text-[28px] font-bold text-gray-950">
                    Let's discuss the requirement
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                    Tell us what you want to improve and the systems you currently use.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-display text-2xl font-bold text-gray-950">
                      Enquiry Received
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                      Thank you for submitting your requirement. One of our engineers will review it and reply within one business day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          fullName: '',
                          businessName: '',
                          email: '',
                          phone: '',
                          country: 'Kenya',
                          discussTopic: 'A general enquiry',
                          requirement: ''
                        });
                      }}
                      className="mt-3 text-xs font-mono font-semibold text-[#0066FF] hover:underline"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Row 1: Full name & Business/Organisation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-semibold text-gray-700">
                          Full name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-semibold text-gray-700">
                          Business or organisation <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Enter your business or organisation"
                          className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email address & Phone number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-semibold text-gray-700">
                          Email address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Enter your email address"
                          className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-semibold text-gray-700">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter your phone number"
                          className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: Country & What would you like to discuss */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-semibold text-gray-700">
                          Country <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full appearance-none bg-white border border-gray-250 rounded-xl pl-4 pr-10 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all cursor-pointer"
                          >
                            <option value="Kenya">Kenya</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Somalia">Somalia</option>
                            <option value="Australia">Australia</option>
                            <option value="United States">United States</option>
                            <option value="Other">Other</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[2]" />
                        </div>
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="block text-xs font-semibold text-gray-700">
                          What would you like to discuss <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.discussTopic}
                            onChange={(e) => setFormData({ ...formData, discussTopic: e.target.value })}
                            className="w-full appearance-none bg-white border border-gray-250 rounded-xl pl-4 pr-10 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all cursor-pointer truncate"
                          >
                            <option value="A general enquiry">A general enquiry</option>
                            <option value="miRentals Property Platform">miRentals Property Platform</option>
                            <option value="miReserve Booking Engine">miReserve Booking Engine</option>
                            <option value="Event Yetu Ticketing">Event Yetu Ticketing</option>
                            <option value="miPOS Retail POS">miPOS Retail POS</option>
                            <option value="M-Pesa & Card Payments">M-Pesa &amp; Card Payments</option>
                            <option value="Custom Software Engineering">Custom Software Engineering</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 stroke-[2]" />
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Your requirement */}
                    <div className="space-y-1.5 text-left">
                      <label className="block text-xs font-semibold text-gray-700">
                        Your requirement <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                        placeholder="Tell us what you want to improve and the systems involved..."
                        className="w-full bg-white border border-gray-250 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-bold py-4 px-6 rounded-xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-70 mt-2"
                    >
                      <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
                    </button>

                    {/* Footer micro-copy matching Image 2 */}
                    <p className="text-xs text-gray-500 text-center pt-2">
                      Prefer to write first?{' '}
                      <a 
                        href="mailto:info@mixonsoftwares.co.ke" 
                        className="text-[#0066FF] font-medium hover:underline"
                      >
                        Email our team
                      </a>
                      . Read our{' '}
                      {setCurrentPage ? (
                        <AppLink
                          page="about"
                          hash="#security"
                          onNavigate={setCurrentPage}
                          className="text-gray-800 font-medium hover:underline"
                        >
                          Privacy Notice
                        </AppLink>
                      ) : (
                        <a
                          href="/about#security"
                          className="text-gray-800 font-medium hover:underline"
                        >
                          Privacy Notice
                        </a>
                      )}
                      .
                    </p>

                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
