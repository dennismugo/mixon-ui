/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, FileText, Calendar, ChevronRight, Activity, Globe, RefreshCw } from 'lucide-react';
import { Lead } from '../types';

interface LeadTrackerProps {
  refreshTrigger?: number;
}

export default function LeadTracker({ refreshTrigger = 0 }: LeadTrackerProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/leads');
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve briefings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [refreshTrigger]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 relative overflow-hidden" id="lead-tracker-dashboard">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative text-left">
            <span className="w-2 h-2 rounded-full bg-mixon-blue absolute top-0 right-0 animate-ping" />
            <Activity className="w-5 h-5 text-mixon-blue" />
          </div>
          <div className="text-left">
            <h5 className="font-display font-bold text-gray-950 text-sm tracking-tight">Active Briefing Stream</h5>
            <p className="text-gray-400 text-[10px] font-mono uppercase tracking-wider">Live CRM Database Connection</p>
          </div>
        </div>
        <button
          onClick={fetchLeads}
          disabled={isLoading}
          aria-label="Refresh briefs"
          className="p-1.5 rounded-lg hover:bg-slate-100 text-gray-400 hover:text-gray-950 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {error ? (
        <p className="text-xs font-mono text-red-500 text-center py-4">{error}</p>
      ) : leads.length === 0 ? (
        <p className="text-xs font-mono text-gray-400 text-center py-4">No active briefings captured.</p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {leads.slice(0, 4).map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-50 hover:bg-slate-100/80 border border-gray-200 p-3.5 rounded-xl flex items-start justify-between gap-3 transition-all text-xs text-left"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-gray-950 tracking-tight truncate">
                      {lead.company}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider font-semibold border ${
                      lead.productOfInterest === 'mirentals'
                        ? 'bg-mixon-cotton text-mixon-blue border-mixon-light-blue'
                        : lead.productOfInterest === 'mireserve'
                        ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                        : lead.productOfInterest === 'eventyetu'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : lead.productOfInterest === 'mipos'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {lead.productOfInterest === 'mirentals'
                        ? 'miRentals'
                        : lead.productOfInterest === 'mireserve'
                        ? 'miReserve'
                        : lead.productOfInterest === 'eventyetu'
                        ? 'Event Yetu'
                        : lead.productOfInterest === 'mipos'
                        ? 'miPos'
                        : 'Enterprise Suite'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-[11px] truncate flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400 shrink-0" />
                    <span>Contact: {lead.name} ({lead.email})</span>
                  </p>

                  {lead.notes && (
                    <p className="text-gray-500 text-[10px] leading-relaxed italic border-l border-gray-200 pl-2 mt-1 truncate">
                      &ldquo;{lead.notes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[9px] font-mono text-gray-400 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" />
                    {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-[8px] font-mono text-mixon-blue font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-mixon-cotton border border-mixon-light-blue rounded">
                    Queued
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {leads.length > 4 && (
            <p className="text-[10px] font-mono text-gray-400 text-center mt-2">
              Showing {Math.min(4, leads.length)} of {leads.length} captured lead briefings.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
