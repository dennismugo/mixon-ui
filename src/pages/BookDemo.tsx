import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  Cpu,
  CreditCard,
  Layers,
  Search,
  Send,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Ticket,
  User,
} from 'lucide-react';
import { Lead } from '../types';
import { PageId } from '../seo/mixonSeo';
import RollingButtonText from '../components/RollingButtonText';

interface BookDemoProps {
  onLeadCaptured: (lead: Lead) => void;
  setCurrentPage: (page: PageId) => void;
  initialProduct?: string;
  initialService?: string;
}

interface DropdownOption {
  value: string;
  label: string;
  subtitle?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface InteractiveDropdownProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  required?: boolean;
}

const DISCOVERY_OPTIONS: DropdownOption[] = [
  {
    value: 'Google Search',
    label: 'Google Search',
    subtitle: 'Found Mixon while searching for software or services',
    icon: Search,
  },
  {
    value: 'AI Assistant (ChatGPT / Perplexity / Gemini)',
    label: 'AI Assistant (ChatGPT / Perplexity / Gemini)',
    subtitle: 'Recommended by an AI search or answer engine',
    icon: Sparkles,
  },
  {
    value: 'Referral / Word of Mouth',
    label: 'Referral / Word of Mouth',
    subtitle: 'Recommended by a partner, colleague, or Mixon client',
    icon: User,
  },
  {
    value: 'Social Media (LinkedIn / X / Instagram)',
    label: 'Social Media (LinkedIn / X / Instagram)',
    subtitle: 'Saw a Mixon showcase or product post online',
    icon: Compass,
  },
  {
    value: 'Shiva Softwares Africa Network',
    label: 'Existing Shiva Softwares Africa Network',
    subtitle: 'Connected through our wider engineering ecosystem',
    icon: Layers,
  },
  {
    value: 'Event / Direct Outreach',
    label: 'Event / Direct Outreach',
    subtitle: 'Met our team directly or at an industry event',
    icon: CalendarIcon,
  },
];

const PRODUCT_OPTIONS: DropdownOption[] = [
  {
    value: 'miRentals',
    label: 'miRentals',
    subtitle: 'Property & rent automation with M-Pesa Paybill/STK reconciliation',
    icon: Building2,
  },
  {
    value: 'miReserve',
    label: 'miReserve',
    subtitle: 'Hospitality channel sync, direct M-Pesa bookings & smart lock access',
    icon: CalendarIcon,
  },
  {
    value: 'Event Yetu',
    label: 'Event Yetu',
    subtitle: 'Anti-screenshot QR ticketing, offline gate scanning & instant payouts',
    icon: Ticket,
  },
  {
    value: 'miPOS',
    label: 'miPOS',
    subtitle: 'Offline-first retail POS, multi-branch stock control & split tenders',
    icon: Cpu,
  },
];

const SERVICE_OPTIONS: DropdownOption[] = [
  {
    value: 'Web Design & Development',
    label: 'Web Design & Development',
    subtitle: 'Sub-second marketing websites, CMS platforms & client portals',
    icon: Code2,
  },
  {
    value: 'Mobile Applications & USSD',
    label: 'Mobile Applications & USSD',
    subtitle: 'Offline-first mobile apps (iOS/Android) & *384* telco USSD flows',
    icon: Smartphone,
  },
  {
    value: 'Payments & M-Pesa Integrations',
    label: 'Payments & M-Pesa Integrations',
    subtitle: 'Idempotent Daraja STK Push, C2B/B2C, Stripe cards & ERP webhooks',
    icon: CreditCard,
  },
  {
    value: 'Search & Discovery (SEO / AEO / GEO)',
    label: 'Search & Discovery (SEO / AEO / GEO)',
    subtitle: 'Technical Google SEO plus ChatGPT, Perplexity & Gemini visibility',
    icon: Search,
  },
  {
    value: 'Modern E-Commerce Storefront',
    label: 'Modern E-Commerce Storefront',
    subtitle: 'Mobile-first store checkout synced with physical branch inventory',
    icon: ShoppingBag,
  },
  {
    value: 'AI & Process Automation',
    label: 'AI & Process Automation',
    subtitle: 'Human-in-the-loop assistants and zero-retention RAG workflows',
    icon: Sparkles,
  },
];

const SCALE_OPTIONS: DropdownOption[] = [
  {
    value: 'Starter (1 – 20 units / 1 location)',
    label: 'Starter scale (1 – 20 units or single location)',
  },
  {
    value: 'Growth (20 – 100 units / 2 – 5 locations)',
    label: 'Growth scale (20 – 100 units or 2 – 5 branches)',
  },
  {
    value: 'Pro / Multi-branch (100 – 500 units)',
    label: 'High-volume (100 – 500 units or multi-branch)',
  },
  {
    value: 'Enterprise (500+ units / Custom SLA)',
    label: 'Enterprise (500+ units / Custom SLA)',
  },
];

const TIMELINE_OPTIONS: DropdownOption[] = [
  { value: 'Immediately (within 2 weeks)', label: 'Immediately (within 2 weeks)' },
  { value: 'This month', label: 'This month (2 – 4 weeks)' },
  { value: 'Next 1 – 3 months', label: 'Next 1 – 3 months' },
  { value: 'Just exploring options', label: 'Just exploring / budgeting for later' },
];

const TIME_SLOTS = [
  { value: '09:00 AM EAT', label: '09:00 AM', period: 'Morning EAT' },
  { value: '10:30 AM EAT', label: '10:30 AM', period: 'Morning EAT' },
  { value: '12:00 PM EAT', label: '12:00 PM', period: 'Midday EAT' },
  { value: '02:00 PM EAT', label: '02:00 PM', period: 'Afternoon EAT' },
  { value: '03:30 PM EAT', label: '03:30 PM', period: 'Afternoon EAT' },
  { value: '05:00 PM EAT', label: '05:00 PM', period: 'Late Afternoon EAT' },
];

interface SelectableCardGridProps {
  name: string;
  legend: string;
  options: DropdownOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  multiple?: boolean;
}

/** Accessible 2-column aligned grid of radio or multi-select option button cards. */
function SelectableCardGrid({
  name,
  legend,
  options,
  selectedValues,
  onToggle,
  multiple = true,
}: SelectableCardGridProps) {
  return (
    <fieldset className="pt-1">
      <legend className="sr-only">{legend}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
        {options.map((opt) => {
          const Icon = opt.icon || Compass;
          const active = selectedValues.includes(opt.value);
          return (
            <label
              key={opt.value}
              className={`h-full flex items-start gap-3.5 rounded-xl border p-4 min-h-[72px] text-left transition-all cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#0066FF] ${
                active
                  ? 'border-[#0066FF] bg-blue-50/55 ring-2 ring-[#0066FF]/15 shadow-xs'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-slate-50/50'
              }`}
            >
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={opt.value}
                checked={active}
                onChange={() => onToggle(opt.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  active ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[13.5px] sm:text-sm font-semibold text-gray-950 leading-snug">
                  {opt.label}
                </span>
                {opt.subtitle && (
                  <span className="block text-xs text-gray-500 leading-relaxed mt-1">
                    {opt.subtitle}
                  </span>
                )}
              </span>
              <span
                aria-hidden="true"
                className={`mt-0.5 w-5 h-5 shrink-0 flex items-center justify-center border transition-colors ${
                  multiple ? 'rounded-md' : 'rounded-full'
                } ${
                  active
                    ? 'border-[#0066FF] bg-[#0066FF] text-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {active && <Check className="w-3 h-3" />}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function InteractiveDropdown({
  id,
  label,
  placeholder,
  value,
  options,
  onChange,
  required,
}: InteractiveDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const selected = options.find((opt) => opt.value === value);
  const SelectedIcon = selected?.icon;

  return (
    <div ref={containerRef} className="relative space-y-2 text-left">
      <label htmlFor={id} className="block text-xs sm:text-[13px] font-semibold text-gray-800">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200 cursor-pointer ${
          open
            ? 'border-[#0066FF] bg-white ring-2 ring-[#0066FF]/15 shadow-sm'
            : 'border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <span className="flex items-center gap-3 min-w-0">
          {SelectedIcon && (
            <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
              <SelectedIcon className="w-4 h-4" />
            </span>
          )}
          <span className="min-w-0">
            <span
              className={`block text-sm font-medium truncate ${
                selected ? 'text-gray-950' : 'text-gray-400'
              }`}
            >
              {selected ? selected.label : placeholder}
            </span>
            {selected?.subtitle && (
              <span className="block text-[11.5px] text-gray-500 truncate mt-0.5">
                {selected.subtitle}
              </span>
            )}
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180 text-[#0066FF]' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.985 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-2 z-40 rounded-2xl border border-gray-200/90 bg-white p-1.5 shadow-[0_20px_50px_-12px_rgba(4,18,43,0.18)] max-h-72 overflow-y-auto overscroll-contain"
            data-lenis-prevent=""
          >
            {options.map((opt) => {
              const Icon = opt.icon;
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 text-[#0066FF]'
                      : 'text-gray-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-start gap-3 min-w-0">
                    {Icon && (
                      <span
                        className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-[#0066FF] text-white' : 'bg-slate-100 text-gray-600'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-semibold leading-snug">
                        {opt.label}
                      </span>
                      {opt.subtitle && (
                        <span className="block text-[11.5px] text-gray-500 font-normal leading-snug mt-0.5">
                          {opt.subtitle}
                        </span>
                      )}
                    </span>
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-[#0066FF] shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getNextBusinessDay(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

function formatDateIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatReadableDate(iso: string): string {
  if (!iso) return 'Not selected';
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BookDemo({
  onLeadCaptured,
  setCurrentPage,
  initialProduct,
  initialService,
}: BookDemoProps) {
  const reduceMotion = useReducedMotion();
  const topCardRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocusStepRef = useRef(false);

  const defaultDate = useMemo(() => getNextBusinessDay(), []);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [stepError, setStepError] = useState('');

  // Form state across all 6 steps
  const [discoverySource, setDiscoverySource] = useState('Google Search');

  const [selectedProducts, setSelectedProducts] = useState<string[]>(() =>
    initialProduct ? [initialProduct] : [],
  );
  const [selectedServices, setSelectedServices] = useState<string[]>(() =>
    initialService ? [initialService] : [],
  );

  const [teamScale, setTeamScale] = useState('Growth (20 – 100 units / 2 – 5 locations)');
  const [timeline, setTimeline] = useState('This month');
  const [workflowNotes, setWorkflowNotes] = useState('');

  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1),
  );
  const [bookingDate, setBookingDate] = useState(() => formatDateIso(defaultDate));
  const [bookingTime, setBookingTime] = useState('10:30 AM EAT');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingDate) return;
    let active = true;
    fetch(`/api/demos/availability?date=${encodeURIComponent(bookingDate)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data || !Array.isArray(data.busySlots)) return;
        const busyForDate = data.busySlots
          .filter((s: { bookingDate: string }) => s.bookingDate === bookingDate)
          .map((s: { bookingTime: string }) => s.bookingTime);
        setBookedTimes(busyForDate);
        setBookingTime((current) => {
          if (!busyForDate.includes(current)) return current;
          const nextOpen = TIME_SLOTS.find((slot) => !busyForDate.includes(slot.value));
          return nextOpen ? nextOpen.value : '';
        });
      })
      .catch(() => {
        if (active) setBookedTimes([]);
      });
    return () => {
      active = false;
    };
  }, [bookingDate, submittedRef]);

  useEffect(() => {
    if (initialProduct) {
      setSelectedProducts((prev) => (prev.includes(initialProduct) ? prev : [initialProduct]));
    }
  }, [initialProduct]);

  useEffect(() => {
    if (initialService) {
      setSelectedServices((prev) => (prev.includes(initialService) ? prev : [initialService]));
    }
  }, [initialService]);

  useEffect(() => {
    if (!shouldFocusStepRef.current) return;
    shouldFocusStepRef.current = false;
    const timer = window.setTimeout(() => {
      stepHeadingRef.current?.focus({ preventScroll: true });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [step]);

  const viewerTimezone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Africa/Nairobi';
    } catch {
      return 'Africa/Nairobi';
    }
  }, []);

  const allChosenProducts = selectedProducts;
  const allChosenServices = selectedServices;

  const scrollCardIntoView = () => {
    window.setTimeout(() => {
      topCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const validateCurrentStep = (): boolean => {
    setStepError('');
    if (step === 1) {
      if (!discoverySource) {
        setStepError('Please choose how you discovered Mixon to continue.');
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (allChosenProducts.length === 0 && allChosenServices.length === 0) {
        setStepError('Please select at least one Mixon product or engineering service to demo.');
        return false;
      }
      return true;
    }
    if (step === 5) {
      if (!bookingDate || !bookingTime) {
        setStepError('Please choose both a date and an available time slot on the calendar.');
        return false;
      }
      if (bookedTimes.includes(bookingTime)) {
        setStepError('That time slot is already booked. Please choose another available time.');
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    shouldFocusStepRef.current = true;
    setDirection(1);
    setStep((s) => Math.min(6, s + 1));
    scrollCardIntoView();
  };

  const handleBack = () => {
    setStepError('');
    shouldFocusStepRef.current = true;
    setDirection(-1);
    setStep((s) => Math.max(1, s - 1));
    scrollCardIntoView();
  };

  const toggleSelection = (
    item: string,
    currentList: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(
      currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item],
    );
  };

  const bookingTopicSummary = useMemo(() => {
    const parts = [...allChosenProducts, ...allChosenServices];
    return parts.length > 0 ? parts.join(' + ') : 'Mixon Platform Walkthrough';
  }, [allChosenProducts, allChosenServices]);

  const buildBookingMessageText = (refCode: string) => {
    const lines = [
      `Hello Mixon Team, I would like to confirm a live demo (${refCode}):`,
      ``,
      `• Name: ${fullName || 'Prospect'}`,
      `• Business / Org: ${company || 'N/A'}`,
      `• Email: ${email || 'N/A'}`,
      `• Phone: ${phone || 'N/A'}`,
      `• Booked Slot: ${formatReadableDate(bookingDate)} at ${bookingTime} (${viewerTimezone})`,
      `• Products: ${allChosenProducts.length ? allChosenProducts.join(', ') : 'None (Services only)'}`,
      `• Services: ${allChosenServices.length ? allChosenServices.join(', ') : 'None (Platform demo only)'}`,
      `• Operational Scale: ${teamScale}`,
      `• Target Timeline: ${timeline}`,
      `• Found Mixon Via: ${discoverySource}`,
    ];
    if (workflowNotes.trim()) {
      lines.push(`• Goals / Notes: ${workflowNotes.trim()}`);
    }
    return lines.join('\n');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepError('');

    if (!fullName.trim() || !company.trim() || !email.trim() || !phone.trim()) {
      setStepError('Please complete your name, business, email, and phone number.');
      const firstEmptyId = !fullName.trim()
        ? 'demo-fullname'
        : !company.trim()
          ? 'demo-company'
          : !email.trim()
            ? 'demo-email'
            : 'demo-phone';
      document.getElementById(firstEmptyId)?.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStepError('Please enter a valid work email address.');
      document.getElementById('demo-email')?.focus();
      return;
    }

    setIsSubmitting(true);
    let finalRefCode = `MXN-${Date.now().toString().slice(-6)}`;
    let invitePath = `/api/demos/${encodeURIComponent(finalRefCode)}/invite.ics`;
    let googleCalendarStatus = 'not_configured';

    // 1. Persist scheduled demo & sync with Google Calendar (when configured on server)
    try {
      const demoRes = await fetch('/api/demos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          company: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          discoverySource,
          products: allChosenProducts,
          services: allChosenServices,
          scale: teamScale,
          timeline,
          bookingDate,
          bookingTime,
          timezone: viewerTimezone,
          notes: workflowNotes.trim(),
        }),
      });
      if (demoRes.status === 409) {
        const conflictData = await demoRes.json().catch(() => ({}));
        setBookedTimes((prev) => (prev.includes(bookingTime) ? prev : [...prev, bookingTime]));
        setStepError(
          conflictData?.error ||
            'That time slot was just booked. Please go Back to pick another available slot.',
        );
        setIsSubmitting(false);
        return;
      }
      if (demoRes.ok) {
        const demoPayload = await demoRes.json();
        if (demoPayload?.demo?.id) {
          finalRefCode = demoPayload.demo.id;
          googleCalendarStatus = demoPayload.demo.googleCalendarStatus || 'not_configured';
        }
        if (demoPayload?.inviteUrl) {
          invitePath = demoPayload.inviteUrl;
        }
      }
    } catch {
      // Static-host fallback: email delivery still completes
    }

    const calendarInviteLink =
      typeof window !== 'undefined' ? `${window.location.origin}${invitePath}` : invitePath;

    // 2. Dispatch direct Email notification to Mixon inbox
    try {
      await fetch('https://formsubmit.co/ajax/ibrahellamixon@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Mixon Demo Booked (${finalRefCode}): ${company.trim()} — ${formatReadableDate(bookingDate)} ${bookingTime}`,
          bookingRef: finalRefCode,
          name: fullName.trim(),
          business: company.trim(),
          email: email.trim(),
          phone: phone.trim(),
          products: allChosenProducts.join(', ') || 'None',
          services: allChosenServices.join(', ') || 'None',
          scale: teamScale,
          timeline,
          discoverySource,
          bookedSlot: `${formatReadableDate(bookingDate)} at ${bookingTime}`,
          calendarInviteLink,
          googleCalendarSync: googleCalendarStatus,
          notes: workflowNotes.trim(),
        }),
      });
    } catch {
      // Server /api/demos still retains full booking record if network blocks third-party webhook
    }

    onLeadCaptured({
      id: finalRefCode,
      name: fullName.trim(),
      email: email.trim(),
      company: company.trim(),
      productOfInterest: bookingTopicSummary,
      notes: buildBookingMessageText(finalRefCode),
      createdAt: new Date().toISOString(),
    });

    setSubmittedRef(finalRefCode);
    setIsSubmitting(false);

    scrollCardIntoView();
  };

  // Monthly calendar cells calculation
  const calendarDays = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cells: {
      key: string;
      dayNum: number | null;
      iso?: string;
      disabled?: boolean;
      isToday?: boolean;
    }[] = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ key: `pad-${i}`, dayNum: null });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      dateObj.setHours(0, 0, 0, 0);
      const iso = formatDateIso(dateObj);
      const isPast = dateObj < today;
      const isSunday = dateObj.getDay() === 0;
      cells.push({
        key: iso,
        dayNum: d,
        iso,
        disabled: isPast || isSunday,
        isToday: dateObj.getTime() === today.getTime(),
      });
    }

    return cells;
  }, [calendarMonth]);

  const monthLabel = calendarMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const canGoPrevMonth = useMemo(() => {
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return calendarMonth > currentMonthStart;
  }, [calendarMonth]);

  const stepVariants = {
    enter: (dir: number) =>
      reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: dir > 0 ? 22 : -22 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: dir > 0 ? -22 : 22 },
  };

  return (
    <div className="mixon-interior-page mixon-demo-page bg-white text-gray-900 pt-28 sm:pt-32 pb-20 sm:pb-24 selection:bg-[#0066FF] selection:text-white">
      {/* ========================================================================= */}
      {/* INTERACTIVE STEP-BY-STEP BOOKING FORM                                     */}
      {/* ========================================================================= */}
      <section ref={topCardRef} data-scroll-no-reveal="" className="w-full px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white shadow-[0_20px_60px_-20px_rgba(4,18,43,0.12)] overflow-visible">
          {submittedRef ? (
            /* ------------------------------------------------------------------- */
            /* CONFIRMATION SCREEN                                                 */
            /* ------------------------------------------------------------------- */
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 10 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-10 lg:p-12 text-center space-y-7"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                Thank you, {fullName}! Your demo is scheduled.
              </h1>

              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-gray-500">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setStep(1);
                    setDirection(-1);
                  }}
                  className="hover:text-[#0066FF] transition-colors cursor-pointer"
                >
                  ← Book another demo
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-gray-950 transition-colors cursor-pointer"
                >
                  Return to Mixon Home →
                </button>
              </div>
            </motion.div>
          ) : (
            /* ------------------------------------------------------------------- */
            /* ACTIVE STEP-BY-STEP BOOKING FORM                                    */
            /* ------------------------------------------------------------------- */
            <form noValidate onSubmit={handleConfirmBooking}>
              {/* Animated Step Viewport */}
              <div className="p-6 sm:p-9 lg:p-10 min-h-[370px] flex flex-col justify-between">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6 text-left"
                  >
                    {/* ================= STEP 1: HOW DID YOU FIND US? ================= */}
                    {step === 1 && (
                      <>
                        <div className="space-y-1.5">
                          <h1
                            ref={stepHeadingRef}
                            tabIndex={-1}
                            className="font-display text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight focus:outline-none"
                          >
                            How did you find Mixon?
                          </h1>
                          <p className="text-sm text-gray-500 font-light">
                            Helps our team prepare relevant local case studies for your demo.
                          </p>
                        </div>

                        <SelectableCardGrid
                          name="discoverySource"
                          legend="How did you find Mixon?"
                          options={DISCOVERY_OPTIONS}
                          selectedValues={discoverySource ? [discoverySource] : []}
                          onToggle={(val) => {
                            setDiscoverySource(val);
                            if (stepError) setStepError('');
                          }}
                          multiple={false}
                        />
                      </>
                    )}

                    {/* ================= STEP 2: MIXON PRODUCTS ======================= */}
                    {step === 2 && (
                      <>
                        <div className="space-y-1.5">
                          <h1
                            ref={stepHeadingRef}
                            tabIndex={-1}
                            className="font-display text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight focus:outline-none"
                          >
                            Which Mixon products would you like to see?
                          </h1>
                          <p className="text-sm text-gray-500 font-light">
                            Select one or more Mixon platforms below, or continue directly to custom services.
                          </p>
                        </div>

                        <SelectableCardGrid
                          name="selectedProducts"
                          legend="Mixon products"
                          options={PRODUCT_OPTIONS}
                          selectedValues={selectedProducts}
                          onToggle={(val) => {
                            toggleSelection(val, selectedProducts, setSelectedProducts);
                            if (stepError) setStepError('');
                          }}
                          multiple
                        />
                      </>
                    )}

                    {/* ================= STEP 3: CUSTOM ENGINEERING SERVICES =========== */}
                    {step === 3 && (
                      <>
                        <div className="space-y-1.5">
                          <h1
                            ref={stepHeadingRef}
                            tabIndex={-1}
                            className="font-display text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight focus:outline-none"
                          >
                            Which engineering services would you like to discuss?
                          </h1>
                          <p className="text-sm text-gray-500 font-light">
                            Choose any custom services to include alongside or instead of our software platforms.
                          </p>
                        </div>

                        <SelectableCardGrid
                          name="selectedServices"
                          legend="Mixon engineering services"
                          options={SERVICE_OPTIONS}
                          selectedValues={selectedServices}
                          onToggle={(val) => {
                            toggleSelection(val, selectedServices, setSelectedServices);
                            if (stepError) setStepError('');
                          }}
                          multiple
                        />
                      </>
                    )}

                    {/* ================= STEP 4: OPERATIONAL SCALE & GOALS =========== */}
                    {step === 4 && (
                      <>
                        <div className="space-y-1.5">
                          <h1
                            ref={stepHeadingRef}
                            tabIndex={-1}
                            className="font-display text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight focus:outline-none"
                          >
                            Tell us about your team scale &amp; rollout timing
                          </h1>
                          <p className="text-sm text-gray-500 font-light">
                            So our engineer demos the right pricing tier, permissions, and M-Pesa setup.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <InteractiveDropdown
                            id="demo-scale-dropdown"
                            label="Operational scale"
                            placeholder="Select your scale"
                            value={teamScale}
                            options={SCALE_OPTIONS}
                            onChange={setTeamScale}
                            required
                          />
                          <InteractiveDropdown
                            id="demo-timeline-dropdown"
                            label="When are you aiming to launch?"
                            placeholder="Select rollout timeline"
                            value={timeline}
                            options={TIMELINE_OPTIONS}
                            onChange={setTimeline}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="demo-workflow-notes"
                            className="block text-xs sm:text-[13px] font-semibold text-gray-800"
                          >
                            What should we focus on during your demo?{' '}
                            <span className="text-gray-400 font-normal">(Optional)</span>
                          </label>
                          <textarea
                            id="demo-workflow-notes"
                            name="workflowNotes"
                            rows={3}
                            value={workflowNotes}
                            onChange={(e) => setWorkflowNotes(e.target.value)}
                            placeholder="e.g., M-Pesa Paybill auto-reconciliation for 80 apartments, migrating from Excel, or Airbnb channel sync..."
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] resize-y"
                          />
                        </div>
                      </>
                    )}

                    {/* ================= STEP 5: INTERACTIVE BOOKING CALENDAR ========= */}
                    {step === 5 && (
                      <>
                        <div className="space-y-1.5">
                          <h1
                            ref={stepHeadingRef}
                            tabIndex={-1}
                            className="font-display text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight focus:outline-none"
                          >
                            Choose a date &amp; time for your live demo
                          </h1>
                          <p className="text-sm text-gray-500 font-light">
                            30-minute guided session · Available Monday–Saturday ({viewerTimezone}).
                          </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                          {/* Monthly Calendar Grid */}
                          <div className="lg:col-span-7 rounded-2xl border border-gray-200 bg-slate-50/40 p-4 sm:p-5">
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-display font-bold text-base text-gray-950">
                                {monthLabel}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  disabled={!canGoPrevMonth}
                                  aria-label="Previous month"
                                  onClick={() =>
                                    setCalendarMonth(
                                      (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1),
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:border-gray-400 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  aria-label="Next month"
                                  onClick={() =>
                                    setCalendarMonth(
                                      (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1),
                                    )
                                  }
                                  className="w-8 h-8 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-700 hover:border-gray-400 cursor-pointer"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-mono text-gray-400 font-semibold mb-2">
                              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                                <span key={d} className="py-1">
                                  {d}
                                </span>
                              ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1.5">
                              {calendarDays.map((cell) => {
                                if (!cell.dayNum || !cell.iso) {
                                  return <div key={cell.key} className="h-10" />;
                                }
                                const isSelected = bookingDate === cell.iso;
                                return (
                                  <button
                                    key={cell.key}
                                    type="button"
                                    disabled={cell.disabled}
                                    aria-pressed={isSelected}
                                    onClick={() => setBookingDate(cell.iso!)}
                                    className={`relative h-10 rounded-xl text-sm font-medium transition-all ${
                                      isSelected
                                        ? 'bg-[#0066FF] text-white font-bold shadow-sm shadow-blue-500/30 cursor-pointer'
                                        : cell.disabled
                                          ? 'text-gray-300 cursor-not-allowed bg-transparent'
                                          : 'bg-white border border-gray-200/80 text-gray-800 hover:border-[#0066FF] hover:text-[#0066FF] cursor-pointer'
                                    }`}
                                  >
                                    {cell.dayNum}
                                    {cell.isToday && !isSelected && (
                                      <span
                                        aria-hidden="true"
                                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0066FF]"
                                      />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Time Slots Column */}
                          <div className="lg:col-span-5 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-800 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-[#0066FF]" />
                                <span>Select Time (EAT / Nairobi)</span>
                              </span>
                              <span className="text-[11px] font-mono text-[#0066FF] font-semibold">
                                {formatReadableDate(bookingDate)}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                              {TIME_SLOTS.map((slot) => {
                                const isBooked = bookedTimes.includes(slot.value);
                                const active = bookingTime === slot.value && !isBooked;
                                return (
                                  <button
                                    key={slot.value}
                                    type="button"
                                    disabled={isBooked}
                                    aria-pressed={active}
                                    onClick={() => {
                                      setBookingTime(slot.value);
                                      if (stepError) setStepError('');
                                    }}
                                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                                      isBooked
                                        ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-70'
                                        : active
                                          ? 'border-[#0066FF] bg-blue-50/70 text-[#0066FF] ring-2 ring-[#0066FF]/15 font-semibold cursor-pointer'
                                          : 'border-gray-200 bg-white text-gray-800 hover:border-gray-300 cursor-pointer'
                                    }`}
                                  >
                                    <span className="text-sm font-mono">{slot.label}</span>
                                    <span className="text-[11px] text-gray-400">
                                      {isBooked ? 'Booked' : slot.period}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ================= STEP 6: CONTACT & SEND CHANNEL ============== */}
                    {step === 6 && (
                      <>
                        <div className="space-y-1.5">
                          <h1
                            ref={stepHeadingRef}
                            tabIndex={-1}
                            className="font-display text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight focus:outline-none"
                          >
                            Where should we send your booking confirmation?
                          </h1>
                          <p className="text-sm text-gray-500 font-light">
                            Enter your details to confirm your demo and send it to Mixon via email.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label htmlFor="demo-fullname" className="block text-xs font-semibold text-gray-700">
                              Full name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              id="demo-fullname"
                              name="fullName"
                              type="text"
                              autoComplete="name"
                              enterKeyHint="next"
                              required
                              aria-invalid={stepError.includes('name, business') && !fullName.trim() ? true : undefined}
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                if (stepError) setStepError('');
                              }}
                              placeholder="Jane Wanjiku"
                              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label htmlFor="demo-company" className="block text-xs font-semibold text-gray-700">
                              Business or organization <span className="text-rose-500">*</span>
                            </label>
                            <input
                              id="demo-company"
                              name="company"
                              type="text"
                              autoComplete="organization"
                              enterKeyHint="next"
                              required
                              aria-invalid={stepError.includes('name, business') && !company.trim() ? true : undefined}
                              value={company}
                              onChange={(e) => {
                                setCompany(e.target.value);
                                if (stepError) setStepError('');
                              }}
                              placeholder="Kilimani Properties Ltd"
                              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label htmlFor="demo-email" className="block text-xs font-semibold text-gray-700">
                              Work email <span className="text-rose-500">*</span>
                            </label>
                            <input
                              id="demo-email"
                              name="email"
                              type="email"
                              inputMode="email"
                              autoComplete="email"
                              autoCapitalize="none"
                              autoCorrect="off"
                              spellCheck={false}
                              enterKeyHint="next"
                              required
                              aria-invalid={
                                (stepError.includes('valid work email') ||
                                  (stepError.includes('name, business') && !email.trim()))
                                  ? true
                                  : undefined
                              }
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (stepError) setStepError('');
                              }}
                              placeholder="name@company.co.ke"
                              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label htmlFor="demo-phone" className="block text-xs font-semibold text-gray-700">
                              Phone number <span className="text-rose-500">*</span>
                            </label>
                            <input
                              id="demo-phone"
                              name="phone"
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              enterKeyHint="done"
                              required
                              aria-invalid={stepError.includes('name, business') && !phone.trim() ? true : undefined}
                              value={phone}
                              onChange={(e) => {
                                setPhone(e.target.value);
                                if (stepError) setStepError('');
                              }}
                              placeholder="+254 7XX XXX XXX"
                              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {stepError && (
                  <p role="alert" className="mt-4 text-xs sm:text-sm font-medium text-rose-600">
                    {stepError}
                  </p>
                )}

                {/* Bottom Step Actions: Back & Next / Confirm */}
                <div
                  className={`mt-8 pt-6 border-t border-gray-100 flex items-center gap-4 ${
                    step > 1 ? 'justify-between' : 'justify-end'
                  }`}
                >
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white hover:border-gray-950 px-5 py-2.5 text-xs sm:text-sm font-semibold text-gray-800 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  )}

                  {step < 6 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="group inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white px-7 py-3 text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                    >
                      <RollingButtonText
                        text="Next step"
                        icon={<ArrowRight className="w-4 h-4" />}
                      />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white px-7 py-3 text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-60"
                    >
                      <span>{isSubmitting ? 'Sending Booking...' : 'Send Booking'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
