import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Download,
  ExternalLink,
  Lock,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Video,
} from 'lucide-react';
import { PageId } from '../seo/mixonSeo';

type DemoStatus = 'confirmed' | 'completed' | 'rescheduled' | 'cancelled';

interface BookedDemoRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  discoverySource: string;
  products: string[];
  services: string[];
  scale: string;
  timeline: string;
  bookingDate: string;
  bookingTime: string;
  timezone: string;
  notes: string;
  status: DemoStatus;
  googleCalendarStatus: 'synced' | 'webhook_sent' | 'not_configured' | 'failed';
  googleCalendarHtmlLink?: string;
  googleMeetLink?: string;
  googleCalendarError?: string;
  createdAt: string;
}

interface TrackerStats {
  total: number;
  confirmed: number;
  completed: number;
  rescheduled: number;
  cancelled: number;
  calendarSynced: number;
}

interface DemoTrackerProps {
  setCurrentPage: (page: PageId) => void;
}

const ADMIN_KEY_STORAGE = 'mixon_demo_tracker_key';

function formatReadableDate(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const STATUS_STYLES: Record<DemoStatus, string> = {
  confirmed: 'bg-blue-50 text-[#0066FF] border-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  rescheduled: 'bg-amber-50 text-amber-800 border-amber-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
};

export default function DemoTracker({ setCurrentPage }: DemoTrackerProps) {
  const [demos, setDemos] = useState<BookedDemoRecord[]>([]);
  const [stats, setStats] = useState<TrackerStats>({
    total: 0,
    confirmed: 0,
    completed: 0,
    rescheduled: 0,
    cancelled: 0,
    calendarSynced: 0,
  });
  const [calendarMode, setCalendarMode] = useState<'service_account' | 'webhook' | 'local'>('local');
  const [calendarConnected, setCalendarConnected] = useState(false);

  const [adminKey, setAdminKey] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_KEY_STORAGE) || '';
    } catch {
      return '';
    }
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [needsAuth, setNeedsAuth] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DemoStatus>('all');
  const [showCalendarGuide, setShowCalendarGuide] = useState(false);

  const loadBookings = useCallback(
    async (keyOverride?: string) => {
      const effectiveKey = keyOverride ?? adminKey;
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/demos', {
          headers: effectiveKey ? { 'x-admin-key': effectiveKey } : {},
        });
        if (res.status === 401) {
          setNeedsAuth(true);
          setLoading(false);
          return;
        }
        if (!res.ok) {
          throw new Error('Could not load demo bookings.');
        }
        const data = await res.json();
        setNeedsAuth(false);
        setDemos(Array.isArray(data.demos) ? data.demos : []);
        if (data.stats) setStats(data.stats);
        if (data.calendarMode) setCalendarMode(data.calendarMode);
        setCalendarConnected(Boolean(data.calendarConnected));
      } catch (err: any) {
        setError(err?.message || 'Unable to load scheduled demos.');
      } finally {
        setLoading(false);
      }
    },
    [adminKey],
  );

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = passcodeInput.trim();
    if (!cleaned) return;
    try {
      sessionStorage.setItem(ADMIN_KEY_STORAGE, cleaned);
    } catch {
      // ignore
    }
    setAdminKey(cleaned);
    loadBookings(cleaned);
  };

  const handleStatusChange = async (id: string, nextStatus: DemoStatus) => {
    try {
      const res = await fetch(`/api/demos/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(adminKey ? { 'x-admin-key': adminKey } : {}),
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!res.ok) throw new Error('Failed to update booking status');
      await loadBookings();
    } catch (err: any) {
      setError(err?.message || 'Failed to update status.');
    }
  };

  const filteredDemos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return demos.filter((d) => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.company.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.products.join(' ').toLowerCase().includes(q) ||
        d.services.join(' ').toLowerCase().includes(q)
      );
    });
  }, [demos, searchQuery, statusFilter]);

  const csvDownloadUrl = adminKey
    ? `/api/demos.csv?key=${encodeURIComponent(adminKey)}`
    : '/api/demos.csv';

  if (needsAuth) {
    return (
      <div className="mixon-interior-page bg-white text-gray-900 pt-28 sm:pt-32 pb-24 px-4">
        <div className="max-w-md mx-auto rounded-none border border-gray-200 bg-white p-7 shadow-lg space-y-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold text-gray-950 tracking-tight">
              Mixon Demo Tracker
            </h1>
            <p className="text-sm text-gray-500">
              Enter your team passcode (`MIXON_ADMIN_KEY`) to view booked demos and export schedules.
            </p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label htmlFor="demo-admin-passcode" className="block text-xs font-semibold text-gray-700 mb-1.5">
                Team Passcode
              </label>
              <input
                id="demo-admin-passcode"
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter MIXON_ADMIN_KEY"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-none bg-[#0066FF] hover:bg-[#0052cc] text-white py-3 text-sm font-semibold transition-colors cursor-pointer"
            >
              Unlock Tracker
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mixon-interior-page bg-white text-gray-900 pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-[#0066FF] font-semibold">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Internal Demo Pipeline</span>
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight">
              Booked Demos Tracker
            </h1>
            <p className="text-sm text-gray-500">
              Track scheduled demos, export to spreadsheets, and import directly into Google Calendar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => loadBookings()}
              className="inline-flex items-center gap-1.5 rounded-none border border-gray-200 bg-white hover:border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <a
              href={csvDownloadUrl}
              className="inline-flex items-center gap-1.5 rounded-none border border-gray-200 bg-white hover:border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>
            <button
              type="button"
              onClick={() => setCurrentPage('book-demo')}
              className="inline-flex items-center gap-1.5 rounded-none bg-[#0066FF] hover:bg-[#0052cc] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              <span>+ Book Demo</span>
            </button>
          </div>
        </div>

        {/* Summary Metrics + Google Calendar Status */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="rounded-none border border-gray-200 bg-slate-50/50 p-4">
            <span className="text-xs text-gray-500">Total Booked</span>
            <p className="font-display text-2xl font-bold text-gray-950 mt-1">{stats.total}</p>
          </div>
          <div className="rounded-none border border-blue-100 bg-blue-50/40 p-4">
            <span className="text-xs text-[#0066FF] font-medium">Confirmed</span>
            <p className="font-display text-2xl font-bold text-gray-950 mt-1">{stats.confirmed}</p>
          </div>
          <div className="rounded-none border border-emerald-100 bg-emerald-50/40 p-4">
            <span className="text-xs text-emerald-700 font-medium">Completed</span>
            <p className="font-display text-2xl font-bold text-gray-950 mt-1">{stats.completed}</p>
          </div>
          <div className="rounded-none border border-gray-200 bg-white p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-gray-500">Google Calendar</span>
              <button
                type="button"
                onClick={() => setShowCalendarGuide((prev) => !prev)}
                className="text-[11px] font-semibold text-[#0066FF] hover:underline cursor-pointer"
              >
                {showCalendarGuide ? 'Hide setup' : 'Setup'}
              </button>
            </div>
            <p className="text-xs font-semibold text-gray-900 mt-1.5">
              {calendarConnected
                ? calendarMode === 'service_account'
                  ? 'API Connected'
                  : 'Webhook Active'
                : 'Manual .ics Import'}
            </p>
          </div>
        </div>

        {showCalendarGuide && (
          <div className="rounded-none border border-blue-200 bg-blue-50/40 p-5 text-xs sm:text-[13px] text-gray-700 space-y-2">
            <p className="font-semibold text-gray-950">
              How to enable 2-way automatic Google Calendar syncing on this server:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Option A (Service Account — 2-way Free/Busy + Auto Meet Links):</strong> Set{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border">GOOGLE_CALENDAR_ID</code>,{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border">GOOGLE_SERVICE_ACCOUNT_EMAIL</code>,
                and <code className="bg-white px-1.5 py-0.5 rounded border">GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY</code>{' '}
                in <code className="bg-white px-1.5 py-0.5 rounded border">.env</code> and share the calendar with the service account email.
              </li>
              <li>
                <strong>Option B (Apps Script Bridge — Any Gmail/Workspace account):</strong> Deploy a Google Apps Script Web App calling{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border">CalendarApp.createEvent(...)</code> and set{' '}
                <code className="bg-white px-1.5 py-0.5 rounded border">GOOGLE_CALENDAR_WEBHOOK_URL</code> in <code className="bg-white px-1.5 py-0.5 rounded border">.env</code>.
              </li>
            </ul>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {(['all', 'confirmed', 'completed', 'rescheduled', 'cancelled'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`rounded-none px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  statusFilter === tab
                    ? 'bg-[#0E1B36] text-white'
                    : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search business, contact, product..."
              aria-label="Search booked demos"
              className="w-full rounded-full border border-gray-200 pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#0066FF]"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-rose-600">
            {error}
          </p>
        )}

        {/* Bookings List */}
        {loading && demos.length === 0 ? (
          <div className="rounded-none border border-gray-200 p-12 text-center text-sm text-gray-400">
            Loading scheduled demos...
          </div>
        ) : filteredDemos.length === 0 ? (
          <div className="rounded-none border border-dashed border-gray-300 p-12 text-center space-y-2">
            <p className="text-sm font-semibold text-gray-900">No demo bookings match this view yet.</p>
            <p className="text-xs text-gray-500">
              Completed submissions on /book-demo appear here automatically and persist across restarts.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDemos.map((demo) => (
              <div
                key={demo.id}
                className="rounded-none border border-gray-200 bg-white p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-gray-300 transition-colors"
              >
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#0066FF] bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {demo.id}
                    </span>
                    <span className="font-display font-bold text-gray-950 text-base">
                      {demo.company}
                    </span>
                    <span
                      className={`text-[11px] font-semibold capitalize px-2.5 py-0.5 rounded-full border ${
                        STATUS_STYLES[demo.status]
                      }`}
                    >
                      {demo.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-gray-900">
                      <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                      {formatReadableDate(demo.bookingDate)} · {demo.bookingTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {demo.name} ({demo.email})
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {demo.phone}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {demo.products.map((p) => (
                      <span
                        key={p}
                        className="rounded-md bg-blue-50/70 border border-blue-200/70 px-2 py-0.5 text-[11px] font-medium text-[#0066FF]"
                      >
                        {p}
                      </span>
                    ))}
                    {demo.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-slate-100 border border-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                      >
                        {s}
                      </span>
                    ))}
                    <span className="text-[11px] text-gray-500 ml-1">
                      Scale: {demo.scale} · Timeline: {demo.timeline} · Found via {demo.discoverySource}
                    </span>
                  </div>

                  {demo.notes && (
                    <p className="text-xs text-gray-500 border-l-2 border-gray-200 pl-2.5 italic">
                      {demo.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {demo.googleMeetLink && (
                    <a
                      href={demo.googleMeetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Google Meet</span>
                    </a>
                  )}
                  {demo.googleCalendarHtmlLink && (
                    <a
                      href={demo.googleCalendarHtmlLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1.5 text-xs font-semibold text-[#0066FF] hover:bg-blue-100"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Calendar Event</span>
                    </a>
                  )}
                  <a
                    href={`/api/demos/${encodeURIComponent(demo.id)}/invite.ics`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white hover:border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>.ics Invite</span>
                  </a>

                  <label className="sr-only" htmlFor={`status-${demo.id}`}>
                    Status for {demo.company}
                  </label>
                  <select
                    id={`status-${demo.id}`}
                    value={demo.status}
                    onChange={(e) => handleStatusChange(demo.id, e.target.value as DemoStatus)}
                    className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0066FF] cursor-pointer"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
