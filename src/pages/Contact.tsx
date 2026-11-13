import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  CheckCircle2,
  ChevronDown,
  Phone,
  PhoneCall,
  Mail,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { Lead } from '../types';
import { AppLink } from '../components/AppLink';
import { PageId } from '../seo/mixonSeo';

interface ContactProps {
  onLeadCaptured: (lead: Lead) => void;
  setCurrentPage?: (page: PageId) => void;
}

const CONTACT_VALUE_POINTS = [
  'Connect M-Pesa, bank settlements, and multi-branch POS workflows',
  'Automate property rentals, hospitality bookings, and event ticketing in one system',
  'Launch custom web applications and integrations built around your operations',
];

export default function Contact({ onLeadCaptured, setCurrentPage }: ContactProps) {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    country: 'Kenya',
    discussTopic: 'A general enquiry',
    requirement: '',
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
        createdAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="mixon-interior-page mixon-contact-page bg-white text-[#04122b] pt-28 sm:pt-36 pb-20 sm:pb-28 selection:bg-[#0066FF] selection:text-white">
      <section aria-label="Contact Mixon" className="w-full px-5 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-[1220px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN: Jasper Demo-Inspired Editorial Pitch & Direct Contacts */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 text-left pt-1"
            >
              <h1
                className="hero-title font-ptserif text-[2.65rem] sm:text-[3.5rem] lg:text-[4rem] font-normal text-[#04122b] tracking-[-0.03em] leading-[1.03] max-w-[540px]"
                style={{ fontFamily: "'PT Serif', serif" }}
              >
                Ready to take the work out of managing tasks?
              </h1>

              <p className="mt-6 font-sans text-[15.5px] sm:text-[17px] leading-[1.6] text-[#1e293b] max-w-[520px]">
                Mixon brings together dedicated Kenyan software engineers, operational visibility, and purpose-built business platforms.
              </p>

              <div className="mt-7 max-w-[520px]">
                <p className="font-sans text-[14.5px] sm:text-[15.5px] font-semibold text-[#04122b]">
                  Reach out to see how Mixon can help you:
                </p>
                <ul className="mt-3 space-y-2.5 text-[14.5px] sm:text-[15.5px] leading-[1.52] text-[#1e293b]">
                  {CONTACT_VALUE_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span
                        className="mt-[0.52em] h-1.5 w-1.5 shrink-0 bg-[#04122b]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Kenyan Desk Channels */}
              <div className="mt-10 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-[540px]">
                <a
                  href="mailto:info@mixonsoftwares.co.ke"
                  className="mixon-contact-tile group flex flex-col justify-between p-4 rounded-none bg-[#f8fbff] border border-[#d6e4fa] hover:border-[#0066FF] hover:bg-white transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.12em] font-semibold text-[#0755b8]">
                      <Mail className="w-3.5 h-3.5 text-[#0066FF]" aria-hidden="true" />
                      Email
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                  </div>
                  <p className="font-sans text-[13.5px] font-semibold text-[#04122b] group-hover:text-[#0066FF] truncate">
                    info@mixonsoftwares.co.ke
                  </p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 truncate">
                    contact@mixonsoftwares.co.ke
                  </p>
                </a>

                <a
                  href="tel:+254713958492"
                  className="mixon-contact-tile group flex flex-col justify-between p-4 rounded-none bg-[#f8fbff] border border-[#d6e4fa] hover:border-[#0066FF] hover:bg-white transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.12em] font-semibold text-[#0755b8]">
                      <Phone className="w-3.5 h-3.5 text-[#0066FF]" aria-hidden="true" />
                      Phone Desk
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                  </div>
                  <p className="font-sans text-[13.5px] font-semibold text-[#04122b] group-hover:text-[#0066FF]">
                    +254 713 958 492
                  </p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 truncate">
                    Direct engineering &amp; sales desk
                  </p>
                </a>

                <a
                  href="tel:+254741733878"
                  className="mixon-contact-tile group flex flex-col justify-between p-4 rounded-none bg-[#f8fbff] border border-[#d6e4fa] hover:border-[#0066FF] hover:bg-white transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.12em] font-semibold text-[#0755b8]">
                      <PhoneCall className="w-3.5 h-3.5 text-[#0066FF]" aria-hidden="true" />
                      Operations
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                  </div>
                  <p className="font-sans text-[13.5px] font-semibold text-[#04122b] group-hover:text-[#0066FF]">
                    +254 741 733 878
                  </p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 truncate">
                    Client operations &amp; support desk
                  </p>
                </a>

                <a
                  href="https://maps.google.com/?q=Mihrab+Building,+15th+Floor,+Ring+Road+Kilimani,+Nairobi,+Kenya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mixon-contact-tile group flex flex-col justify-between p-4 rounded-none bg-[#f8fbff] border border-[#d6e4fa] hover:border-[#0066FF] hover:bg-white transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.12em] font-semibold text-[#0755b8]">
                      <MapPin className="w-3.5 h-3.5 text-[#0066FF]" aria-hidden="true" />
                      Nairobi Office
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066FF] transition-colors" />
                  </div>
                  <p className="font-sans text-[13.5px] font-semibold text-[#04122b] group-hover:text-[#0066FF] truncate">
                    Mihrab Building, 15th Floor
                  </p>
                  <p className="text-[11.5px] text-slate-500 mt-0.5 truncate">
                    Ring Road Kilimani, Nairobi, Kenya
                  </p>
                </a>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Jasper Demo-Style Tinted Soft Ice-Blue Form Box (0px Radius) */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 w-full"
            >
              <div className="mixon-contact-form-panel bg-[#EAF1FF] border border-[#C5DAF8] rounded-none p-7 sm:p-10 select-text">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4 bg-white border border-[#C5DAF8] p-8 rounded-none"
                  >
                    <div className="w-12 h-12 rounded-none bg-[#eaf1ff] text-[#0066FF] mx-auto flex items-center justify-center border border-[#c5daf8]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h2
                      className="font-ptserif text-2xl sm:text-3xl font-normal text-[#04122b]"
                      style={{ fontFamily: "'PT Serif', serif" }}
                    >
                      Enquiry Received
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
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
                          requirement: '',
                        });
                      }}
                      className="mt-3 inline-flex items-center justify-center rounded-none bg-[#04122b] px-5 py-2.5 text-xs font-sans font-semibold text-white hover:bg-[#0066FF] transition-colors cursor-pointer"
                    >
                      Submit another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Address + Helper Caption matching Jasper Demo */}
                    <div className="space-y-1 text-left">
                      <label className="block font-sans text-[13px] font-semibold text-[#04122b]">
                        Business Email <span className="text-[#0066FF]">*</span>
                      </label>
                      <p className="text-[11.5px] text-[#475569] pb-1">
                        Please use your email to be connected directly with our engineering team
                      </p>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your work email"
                        className="w-full bg-white border border-[#C5DAF8] rounded-none px-3.5 py-2.5 text-sm text-[#04122b] placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] transition-colors"
                      />
                    </div>

                    {/* Row: Full name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 text-left">
                        <label className="block font-sans text-[13px] font-semibold text-[#04122b]">
                          Full Name <span className="text-[#0066FF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Enter your full name"
                          className="w-full bg-white border border-[#C5DAF8] rounded-none px-3.5 py-2.5 text-sm text-[#04122b] placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="block font-sans text-[13px] font-semibold text-[#04122b]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Enter your phone number"
                          className="w-full bg-white border border-[#C5DAF8] rounded-none px-3.5 py-2.5 text-sm text-[#04122b] placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row: Company Name & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1 text-left">
                        <label className="block font-sans text-[13px] font-semibold text-[#04122b]">
                          Company Name <span className="text-[#0066FF]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="Enter your company's name"
                          className="w-full bg-white border border-[#C5DAF8] rounded-none px-3.5 py-2.5 text-sm text-[#04122b] placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] transition-colors"
                        />
                      </div>

                      <div className="space-y-1 text-left">
                        <label className="block font-sans text-[13px] font-semibold text-[#04122b]">
                          Country <span className="text-[#0066FF]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full appearance-none bg-white border border-[#C5DAF8] rounded-none pl-3.5 pr-9 py-2.5 text-sm text-[#04122b] focus:outline-none focus:border-[#0066FF] transition-colors cursor-pointer"
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
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[2]" />
                        </div>
                      </div>
                    </div>

                    {/* What would you like to discuss */}
                    <div className="space-y-1 text-left">
                      <label className="block font-sans text-[13px] font-semibold text-[#04122b]">
                        What are you most interested in using Mixon for? <span className="text-[#0066FF]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.discussTopic}
                          onChange={(e) => setFormData({ ...formData, discussTopic: e.target.value })}
                          className="w-full appearance-none bg-white border border-[#C5DAF8] rounded-none pl-3.5 pr-9 py-2.5 text-sm text-[#04122b] focus:outline-none focus:border-[#0066FF] transition-colors cursor-pointer truncate"
                        >
                          <option value="A general enquiry">A general enquiry</option>
                          <option value="miRentals Property Platform">miRentals Property Platform</option>
                          <option value="miReserve Booking Engine">miReserve Booking Engine</option>
                          <option value="Event Yetu Ticketing">Event Yetu Ticketing</option>
                          <option value="miPOS Retail POS">miPOS Retail POS</option>
                          <option value="M-Pesa & Card Payments">M-Pesa &amp; Card Payments</option>
                          <option value="Custom Software Engineering">Custom Software Engineering</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[2]" />
                      </div>
                    </div>

                    {/* Requirement details */}
                    <div className="space-y-1 text-left">
                      <label className="block font-sans text-[13px] font-semibold text-[#04122b]">
                        Your requirement <span className="text-[#0066FF]">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={formData.requirement}
                        onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                        placeholder="Tell us what you want to improve and the systems involved..."
                        className="w-full bg-white border border-[#C5DAF8] rounded-none px-3.5 py-2.5 text-sm text-[#04122b] placeholder:text-slate-400 focus:outline-none focus:border-[#0066FF] transition-colors resize-y"
                      />
                    </div>

                    {/* Legal / Privacy Micro-Copy */}
                    <p className="text-[11.5px] text-[#475569] text-center pt-1 leading-relaxed">
                      By submitting this form, you agree to Mixon’s{' '}
                      {setCurrentPage ? (
                        <AppLink
                          page="about"
                          hash="#security"
                          onNavigate={setCurrentPage}
                          className="text-[#04122b] underline font-medium hover:text-[#0066FF]"
                        >
                          Privacy Notice
                        </AppLink>
                      ) : (
                        <a
                          href="/about#security"
                          className="text-[#04122b] underline font-medium hover:text-[#0066FF]"
                        >
                          Privacy Notice
                        </a>
                      )}{' '}
                      and direct response from our team.
                    </p>

                    {/* Submit CTA Button (Sharp 0px Radius) */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-none bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-semibold py-3.5 px-6 text-sm transition-colors cursor-pointer flex items-center justify-center disabled:opacity-70"
                    >
                      <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
                    </button>
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
