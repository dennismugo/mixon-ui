import crypto from "crypto";
import fs from "fs";
import path from "path";

export type DemoStatus = "confirmed" | "completed" | "rescheduled" | "cancelled";

export type GoogleCalendarSyncStatus =
  | "synced"
  | "webhook_sent"
  | "not_configured"
  | "failed";

export interface DemoBookingInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  discoverySource?: string;
  products?: string[];
  services?: string[];
  scale?: string;
  timeline?: string;
  bookingDate: string;
  bookingTime: string;
  timezone?: string;
  notes?: string;
}

export interface DemoBooking extends DemoBookingInput {
  id: string;
  products: string[];
  services: string[];
  discoverySource: string;
  scale: string;
  timeline: string;
  timezone: string;
  notes: string;
  status: DemoStatus;
  googleCalendarStatus: GoogleCalendarSyncStatus;
  googleCalendarEventId?: string;
  googleCalendarHtmlLink?: string;
  googleMeetLink?: string;
  googleCalendarError?: string;
  createdAt: string;
  updatedAt: string;
}

export const DEMO_SLOT_TIMES = [
  "09:00 AM EAT",
  "10:30 AM EAT",
  "12:00 PM EAT",
  "02:00 PM EAT",
  "03:30 PM EAT",
  "05:00 PM EAT",
];

const DEMO_DURATION_MINUTES = 30;

function getStorePath(): string {
  if (process.env.MIXON_DEMOS_FILE?.trim()) {
    return path.resolve(process.env.MIXON_DEMOS_FILE.trim());
  }
  return path.join(process.cwd(), "data", "demos.json");
}

function readDemoStore(): DemoBooking[] {
  const filePath = getStorePath();
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDemoStore(demos: DemoBooking[]): void {
  const filePath = getStorePath();
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(demos, null, 2), "utf8");
  fs.renameSync(tempPath, filePath);
}

/** Parse YYYY-MM-DD + "HH:MM AM/PM EAT" into UTC timestamps and EAT RFC3339 offsets. */
export function parseEatSlotWindow(bookingDate: string, bookingTime: string) {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec((bookingDate || "").trim());
  if (!dateMatch) {
    throw new Error("Invalid bookingDate format. Expected YYYY-MM-DD.");
  }
  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);

  const slotMatch = /^(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec((bookingTime || "").trim());
  let hour24 = slotMatch ? Number(slotMatch[1]) : 9;
  const minute = slotMatch ? Number(slotMatch[2]) : 0;
  if (slotMatch) {
    const meridian = slotMatch[3].toUpperCase();
    if (meridian === "PM" && hour24 !== 12) hour24 += 12;
    if (meridian === "AM" && hour24 === 12) hour24 = 0;
  }

  // East Africa Time (Africa/Nairobi) is UTC+03:00 year-round.
  const startUtc = new Date(Date.UTC(year, month - 1, day, hour24 - 3, minute, 0));
  const endUtc = new Date(startUtc.getTime() + DEMO_DURATION_MINUTES * 60_000);

  const pad = (n: number) => String(n).padStart(2, "0");
  const startEatDate = new Date(startUtc.getTime() + 3 * 3_600_000);
  const endEatDate = new Date(endUtc.getTime() + 3 * 3_600_000);

  const toEatIso = (dt: Date) =>
    `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}T${pad(
      dt.getUTCHours(),
    )}:${pad(dt.getUTCMinutes())}:00+03:00`;

  return {
    startUtc,
    endUtc,
    startEatIso: toEatIso(startEatDate),
    endEatIso: toEatIso(endEatDate),
  };
}

export function getGoogleCalendarConfig() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID?.trim() || "";
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() || "";
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "")
    .replace(/\\n/g, "\n")
    .trim();
  const webhookUrl = process.env.GOOGLE_CALENDAR_WEBHOOK_URL?.trim() || "";

  const hasServiceAccount = Boolean(calendarId && serviceEmail && privateKey);
  const hasWebhook = Boolean(webhookUrl);
  const mode: "service_account" | "webhook" | "local" = hasServiceAccount
    ? "service_account"
    : hasWebhook
      ? "webhook"
      : "local";

  return {
    calendarId,
    serviceEmail,
    privateKey,
    webhookUrl,
    hasServiceAccount,
    hasWebhook,
    connected: hasServiceAccount || hasWebhook,
    mode,
  };
}

function base64UrlEncode(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getGoogleAccessToken(
  serviceEmail: string,
  privateKey: string,
): Promise<string> {
  const nowSec = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      iss: serviceEmail,
      scope: "https://www.googleapis.com/auth/calendar",
      aud: "https://oauth2.googleapis.com/token",
      exp: nowSec + 3600,
      iat: nowSec,
    }),
  );
  const unsignedJwt = `${header}.${payload}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedJwt);
  const signature = base64UrlEncode(signer.sign(privateKey));
  const assertion = `${unsignedJwt}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }).toString(),
  });
  const tokenJson = (await tokenRes.json()) as { access_token?: string; error_description?: string };
  if (!tokenRes.ok || !tokenJson.access_token) {
    throw new Error(tokenJson.error_description || "Failed to mint Google Calendar OAuth token");
  }
  return tokenJson.access_token;
}

async function syncBookingToGoogleCalendar(
  booking: DemoBooking,
): Promise<{
  status: GoogleCalendarSyncStatus;
  eventId?: string;
  htmlLink?: string;
  meetLink?: string;
  error?: string;
}> {
  const cfg = getGoogleCalendarConfig();
  if (!cfg.connected) {
    return { status: "not_configured" };
  }

  const { startEatIso, endEatIso } = parseEatSlotWindow(
    booking.bookingDate,
    booking.bookingTime,
  );
  const topicList = [...booking.products, ...booking.services].join(", ") || "Platform Demo";
  const description = [
    `Mixon Demo Reference: ${booking.id}`,
    `Prospect: ${booking.name} (${booking.company})`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Products: ${booking.products.join(", ") || "None"}`,
    `Services: ${booking.services.join(", ") || "None"}`,
    `Scale: ${booking.scale}`,
    `Timeline: ${booking.timeline}`,
    `Found via: ${booking.discoverySource}`,
    booking.notes ? `Goals / Notes: ${booking.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (cfg.hasServiceAccount) {
    try {
      const accessToken = await getGoogleAccessToken(cfg.serviceEmail, cfg.privateKey);
      const endpointBase = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        cfg.calendarId,
      )}/events`;

      const baseBody = {
        summary: `Mixon Demo — ${booking.company} (${topicList})`,
        description,
        start: { dateTime: startEatIso, timeZone: "Africa/Nairobi" },
        end: { dateTime: endEatIso, timeZone: "Africa/Nairobi" },
        attendees: [{ email: booking.email, displayName: booking.name }],
      };

      // Try creating event with a Google Meet conference link first; fall back cleanly if not permitted.
      let res = await fetch(`${endpointBase}?conferenceDataVersion=1&sendUpdates=all`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...baseBody,
          conferenceData: {
            createRequest: {
              requestId: booking.id,
              conferenceSolutionKey: { type: "hangoutsMeet" },
            },
          },
        }),
      });

      if (res.status === 400) {
        res = await fetch(endpointBase, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(baseBody),
        });
      }

      const data = (await res.json()) as {
        id?: string;
        htmlLink?: string;
        hangoutLink?: string;
        error?: { message?: string };
      };
      if (!res.ok || !data.id) {
        return {
          status: "failed",
          error: data.error?.message || `Google Calendar API HTTP ${res.status}`,
        };
      }
      return {
        status: "synced",
        eventId: data.id,
        htmlLink: data.htmlLink,
        meetLink: data.hangoutLink,
      };
    } catch (err: any) {
      return {
        status: "failed",
        error: err?.message || "Google Calendar sync failed",
      };
    }
  }

  try {
    const webhookRes = await fetch(cfg.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...booking,
        summary: `Mixon Demo — ${booking.company} (${topicList})`,
        description,
        startIso: startEatIso,
        endIso: endEatIso,
      }),
    });
    if (!webhookRes.ok) {
      return { status: "failed", error: `Webhook returned HTTP ${webhookRes.status}` };
    }
    let payload: { eventId?: string; htmlLink?: string; meetLink?: string } = {};
    try {
      payload = (await webhookRes.json()) as typeof payload;
    } catch {
      // Plain text OK from Apps Script is fine
    }
    return {
      status: "webhook_sent",
      eventId: payload.eventId,
      htmlLink: payload.htmlLink,
      meetLink: payload.meetLink,
    };
  } catch (err: any) {
    return { status: "failed", error: err?.message || "Webhook sync failed" };
  }
}

export async function queryDemoAvailability(date?: string) {
  const cfg = getGoogleCalendarConfig();
  const activeDemos = readDemoStore().filter((d) => d.status !== "cancelled");
  const busySlots: { bookingDate: string; bookingTime: string }[] = [];
  const seen = new Set<string>();

  const pushBusy = (bookingDate: string, bookingTime: string) => {
    const key = `${bookingDate}|${bookingTime}`;
    if (!seen.has(key)) {
      seen.add(key);
      busySlots.push({ bookingDate, bookingTime });
    }
  };

  for (const demo of activeDemos) {
    if (!date || demo.bookingDate === date) {
      pushBusy(demo.bookingDate, demo.bookingTime);
    }
  }

  // Merge Google Calendar FreeBusy conflicts when Service Account is connected for the requested date.
  if (date && cfg.hasServiceAccount && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    try {
      const accessToken = await getGoogleAccessToken(cfg.serviceEmail, cfg.privateKey);
      const fbRes = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timeMin: `${date}T00:00:00+03:00`,
          timeMax: `${date}T23:59:59+03:00`,
          timeZone: "Africa/Nairobi",
          items: [{ id: cfg.calendarId }],
        }),
      });
      if (fbRes.ok) {
        const fbJson = (await fbRes.json()) as {
          calendars?: Record<string, { busy?: { start: string; end: string }[] }>;
        };
        const busyRanges = fbJson.calendars?.[cfg.calendarId]?.busy || [];
        for (const slot of DEMO_SLOT_TIMES) {
          const { startUtc, endUtc } = parseEatSlotWindow(date, slot);
          const overlaps = busyRanges.some((range) => {
            const rStart = Date.parse(range.start);
            const rEnd = Date.parse(range.end);
            return startUtc.getTime() < rEnd && endUtc.getTime() > rStart;
          });
          if (overlaps) pushBusy(date, slot);
        }
      }
    } catch {
      // Keep local availability working if Google FreeBusy request fails
    }
  }

  return {
    date: date || null,
    busySlots,
    calendarConnected: cfg.connected,
    calendarMode: cfg.mode,
  };
}

export class SlotConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SlotConflictError";
  }
}

export async function createDemoBooking(input: DemoBookingInput): Promise<DemoBooking> {
  // Validate date & time format early
  parseEatSlotWindow(input.bookingDate, input.bookingTime);

  const existing = readDemoStore();
  const conflict = existing.some(
    (d) =>
      d.status !== "cancelled" &&
      d.bookingDate === input.bookingDate &&
      d.bookingTime === input.bookingTime,
  );
  if (conflict) {
    throw new SlotConflictError(
      `The ${input.bookingTime} slot on ${input.bookingDate} was just booked. Please select another time.`,
    );
  }

  const nowIso = new Date().toISOString();
  const baseBooking: DemoBooking = {
    id: `MXN-${Date.now().toString().slice(-6)}`,
    name: input.name.trim(),
    company: input.company.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    discoverySource: (input.discoverySource || "Website").trim(),
    products: Array.isArray(input.products) ? input.products : [],
    services: Array.isArray(input.services) ? input.services : [],
    scale: (input.scale || "Not specified").trim(),
    timeline: (input.timeline || "Not specified").trim(),
    bookingDate: input.bookingDate.trim(),
    bookingTime: input.bookingTime.trim(),
    timezone: (input.timezone || "Africa/Nairobi").trim(),
    notes: (input.notes || "").trim(),
    status: "confirmed",
    googleCalendarStatus: "not_configured",
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  const syncResult = await syncBookingToGoogleCalendar(baseBooking);
  baseBooking.googleCalendarStatus = syncResult.status;
  if (syncResult.eventId) baseBooking.googleCalendarEventId = syncResult.eventId;
  if (syncResult.htmlLink) baseBooking.googleCalendarHtmlLink = syncResult.htmlLink;
  if (syncResult.meetLink) baseBooking.googleMeetLink = syncResult.meetLink;
  if (syncResult.error) baseBooking.googleCalendarError = syncResult.error;

  existing.unshift(baseBooking);
  writeDemoStore(existing);
  return baseBooking;
}

export function listDemoBookings() {
  const demos = readDemoStore().sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const cfg = getGoogleCalendarConfig();
  return {
    demos,
    stats: {
      total: demos.length,
      confirmed: demos.filter((d) => d.status === "confirmed").length,
      completed: demos.filter((d) => d.status === "completed").length,
      rescheduled: demos.filter((d) => d.status === "rescheduled").length,
      cancelled: demos.filter((d) => d.status === "cancelled").length,
      calendarSynced: demos.filter(
        (d) => d.googleCalendarStatus === "synced" || d.googleCalendarStatus === "webhook_sent",
      ).length,
    },
    calendarConnected: cfg.connected,
    calendarMode: cfg.mode,
  };
}

export function updateDemoBookingStatus(id: string, status: DemoStatus): DemoBooking | null {
  const demos = readDemoStore();
  const idx = demos.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  demos[idx] = {
    ...demos[idx],
    status,
    updatedAt: new Date().toISOString(),
  };
  writeDemoStore(demos);
  return demos[idx];
}

export function getDemoBookingById(id: string): DemoBooking | null {
  return readDemoStore().find((d) => d.id === id) || null;
}

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatIcsUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

/** Generate RFC 5545 .ics calendar file compatible with Google Calendar, Outlook, and Apple Calendar. */
export function buildDemoIcs(booking: DemoBooking): string {
  const { startUtc, endUtc } = parseEatSlotWindow(
    booking.bookingDate,
    booking.bookingTime,
  );
  const topics = [...booking.products, ...booking.services].join(", ") || "Platform Demo";
  const description = [
    `Ref: ${booking.id}`,
    `Prospect: ${booking.name} (${booking.company})`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Products: ${booking.products.join(", ") || "None"}`,
    `Services: ${booking.services.join(", ") || "None"}`,
    `Scale: ${booking.scale}`,
    `Timeline: ${booking.timeline}`,
    `Discovery: ${booking.discoverySource}`,
    booking.notes ? `Notes: ${booking.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mixon Softwares//Demo Scheduler//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${booking.id}@mixonsoftwares.co.ke`,
    `DTSTAMP:${formatIcsUtc(new Date())}`,
    `DTSTART:${formatIcsUtc(startUtc)}`,
    `DTEND:${formatIcsUtc(endUtc)}`,
    `SUMMARY:${escapeIcs(`Mixon Demo — ${booking.company} (${topics})`)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    "LOCATION:Google Meet / Online (Mixon Nairobi HQ)",
    "ORGANIZER;CN=Mixon Softwares:mailto:info@mixonsoftwares.co.ke",
    `ATTENDEE;CN=${escapeIcs(booking.name)};RSVP=TRUE:mailto:${booking.email}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function buildDemosCsv(demos: DemoBooking[]): string {
  const esc = (val: unknown) => {
    const s = String(val ?? "").replace(/\r?\n/g, " ");
    return /[",]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const headers = [
    "Ref",
    "Status",
    "BookingDate",
    "BookingTime",
    "Timezone",
    "Name",
    "Company",
    "Email",
    "Phone",
    "Products",
    "Services",
    "Scale",
    "Timeline",
    "DiscoverySource",
    "GoogleCalendarSync",
    "Notes",
    "CreatedAt",
  ];
  const rows = demos.map((d) =>
    [
      d.id,
      d.status,
      d.bookingDate,
      d.bookingTime,
      d.timezone,
      d.name,
      d.company,
      d.email,
      d.phone,
      d.products.join(" | "),
      d.services.join(" | "),
      d.scale,
      d.timeline,
      d.discoverySource,
      d.googleCalendarStatus,
      d.notes,
      d.createdAt,
    ]
      .map(esc)
      .join(","),
  );
  return [headers.join(","), ...rows].join("\n");
}
