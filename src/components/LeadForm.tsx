/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle, HelpCircle, ArrowRightLeft } from 'lucide-react';
import { Lead } from '../types';

interface LeadFormProps {
  defaultProduct?: 'all' | 'mirentals' | 'mireserve' | 'eventyetu' | 'mipos';
  className?: string;
  onSuccess?: (lead: Lead) => void;
  ctaText?: string;
}

export default function LeadForm({
  defaultProduct = 'all',
  className = '',
  onSuccess,
  ctaText = 'Book an AI Architecture Session'
}: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    productOfInterest: defaultProduct,
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProgressiveFields, setShowProgressiveFields] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setError('Please fill in all core fields (Name, Email, and Company).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Submit to FormSubmit AJAX endpoint for direct email delivery
      const emailPromise = fetch('https://formsubmit.co/ajax/ibrahellamixon@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Lead captured: ${formData.name} (${formData.company})`,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          product_interest: formData.productOfInterest,
          notes: formData.notes || 'No extra notes provided.'
        }),
      });

      // 2. Submit to local leads store to keep live dashboards/telemetry functional
      const localPromise = fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const [emailResponse, localResponse] = await Promise.all([
        emailPromise.catch(err => {
          console.warn("FormSubmit delivery failed but proceeding with local logging:", err);
          return null;
        }),
        localPromise
      ]);

      const data = await localResponse.json();

      if (localResponse.ok && data.success) {
        setSubmitSuccess(true);
        if (onSuccess) {
          onSuccess(data.lead);
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Unable to submit lead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-50 border border-gray-200 p-8 rounded-none text-center space-y-6 shadow-sm relative overflow-hidden"
        id="lead-form-success"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-mixon-blue" />
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-mixon-cotton text-mixon-blue border border-mixon-light-blue">
            <CheckCircle className="w-10 h-10" />
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-display text-2xl font-bold text-gray-950 tracking-tight">Intelligence Initialized</h4>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Hujambo, <strong>{formData.name}</strong>. We've received your request for <strong>{formData.company}</strong>. Our Nairobi-based engineering team will reach out within 2 hours.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6 text-left max-w-sm mx-auto space-y-3">
          <div className="flex items-start gap-3 text-xs text-gray-600">
            <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center font-bold text-mixon-blue shrink-0">1</div>
            <div>
              <span className="font-medium text-gray-950 block">Strategy Briefing</span>
              We'll prepare custom performance reports for {formData.company}.
            </div>
          </div>
          <div className="flex items-start gap-3 text-xs text-gray-600">
            <div className="h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center font-bold text-mixon-blue shrink-0">2</div>
            <div>
              <span className="font-medium text-gray-950 block">Live Architecture Sandbox</span>
              You'll explore the engine running customized automation logic live.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitSuccess(false);
            setFormData({
              name: '',
              email: '',
              company: '',
              productOfInterest: defaultProduct,
              notes: '',
            });
            setShowProgressiveFields(false);
          }}
          className="text-xs text-mixon-blue hover:text-mixon-blue/80 underline font-mono tracking-wider uppercase cursor-pointer font-bold"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 p-6 md:p-8 rounded-none shadow-sm relative overflow-hidden ${className}`} id="mixon-lead-capture-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-mixon-blue/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="space-y-2 mb-6 text-left">
        <h4 className="font-display text-xl md:text-2xl font-bold text-gray-950 tracking-tight">Deploy Mixon Intelligence</h4>
        <p className="text-gray-500 text-xs font-light">
          Take the first step towards replacing guesswork with automated intelligence.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-mono">
            Error: {error}
          </div>
        )}

        {/* Low Friction Front-of-Funnel Fields */}
        <div className="space-y-1">
          <label htmlFor="name" className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Your Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Jane Otieno"
            className="w-full bg-slate-50 border border-gray-200 hover:border-gray-350 focus:border-mixon-blue focus:ring-1 focus:ring-mixon-blue text-gray-900 rounded-lg px-4 py-3 text-sm transition-all outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Business Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., jane@company.com"
            className="w-full bg-slate-50 border border-gray-200 hover:border-gray-350 focus:border-mixon-blue focus:ring-1 focus:ring-mixon-blue text-gray-900 rounded-lg px-4 py-3 text-sm transition-all outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="company" className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Company Name *</label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g., Lake View Suites"
            className="w-full bg-slate-50 border border-gray-200 hover:border-gray-350 focus:border-mixon-blue focus:ring-1 focus:ring-mixon-blue text-gray-900 rounded-lg px-4 py-3 text-sm transition-all outline-none"
          />
        </div>

        {/* Progressive Profiling Trigger */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowProgressiveFields(!showProgressiveFields)}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 font-mono transition-colors select-none cursor-pointer"
          >
            <div className={`p-1 rounded-md bg-slate-100 border border-gray-250 transition-transform ${showProgressiveFields ? 'rotate-90' : ''}`}>
              <ArrowRight className="w-3 h-3 text-gray-600" />
            </div>
            <span>{showProgressiveFields ? 'Hide additional context' : 'Add custom requirements (Optional)'}</span>
          </button>
        </div>

        {/* Progressive Profiling Drawer */}
        <AnimatePresence>
          {showProgressiveFields && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-4"
            >
              <div className="space-y-1 pt-2 border-t border-gray-150">
                <label htmlFor="productOfInterest" className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Product Segment</label>
                <select
                  id="productOfInterest"
                  name="productOfInterest"
                  value={formData.productOfInterest}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-gray-200 hover:border-gray-300 focus:border-mixon-blue text-gray-900 rounded-lg px-4 py-3 text-sm transition-all outline-none cursor-pointer"
                >
                  <option value="all">Enterprise Suite (All Products)</option>
                  <option value="mirentals">miRentals — AI Property Rentals</option>
                  <option value="mireserve">miReserve — AI Stays & BnB</option>
                  <option value="eventyetu">Event Yetu — AI Event Ticketing</option>
                  <option value="mipos">miPos — AI Point of Sale & Retail</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="notes" className="block text-xs font-mono text-gray-400 uppercase tracking-wider">Tell us about your manual hurdles</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g., We spend 10+ hours a week reconciling M-Pesa statements for rent manually..."
                  className="w-full bg-slate-50 border border-gray-200 hover:border-gray-300 focus:border-mixon-blue focus:ring-1 focus:ring-mixon-blue text-gray-900 rounded-lg px-4 py-3 text-sm transition-all outline-none resize-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead Capture Action Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white font-display font-bold py-3.5 px-6 rounded-none text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all cursor-pointer shadow-sm"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2 font-mono">
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Verifying Connection...</span>
            </div>
          ) : (
            <>
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>

        <p className="text-[10px] text-gray-500 font-mono text-center">
          By submitting, you agree to connect with a Mixon certified AI Solutions Engineer. GDPR / Kenya Data Protection Act compliant.
        </p>
      </form>
    </div>
  );
}
