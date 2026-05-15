import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

// Agency working hours (local to AGENCY_TZ): Mon-Fri, 9:00-18:00, 30-min slots
const AGENCY_TZ = "Europe/Madrid";
const SLOT_MINUTES = 30;
const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;
const LOOKAHEAD_DAYS = 14;
const MIN_LEAD_MINUTES = 60;

function gwHeaders() {
  const lovable = process.env.LOVABLE_API_KEY;
  const conn = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!lovable) throw new Error("LOVABLE_API_KEY not configured");
  if (!conn) throw new Error("GOOGLE_CALENDAR_API_KEY not configured");
  return {
    Authorization: `Bearer ${lovable}`,
    "X-Connection-Api-Key": conn,
    "Content-Type": "application/json",
  };
}

// Get the UTC Date that corresponds to a given wall-clock time in AGENCY_TZ.
function zonedToUtc(year: number, month: number, day: number, hour: number, minute: number): Date {
  // Build a UTC guess and adjust by the offset of AGENCY_TZ at that instant.
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute);
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: AGENCY_TZ,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(new Date(utcGuess)).reduce<Record<string, string>>((a, p) => {
    if (p.type !== "literal") a[p.type] = p.value;
    return a;
  }, {});
  const asUtc = Date.UTC(
    +parts.year,
    +parts.month - 1,
    +parts.day,
    +parts.hour,
    +parts.minute,
    +parts.second,
  );
  const offset = asUtc - utcGuess;
  return new Date(utcGuess - offset);
}

function dayOfWeekInTz(d: Date): number {
  const wd = new Intl.DateTimeFormat("en-US", { timeZone: AGENCY_TZ, weekday: "short" }).format(d);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
}

export const getAvailableSlots = createServerFn({ method: "POST" })
  .inputValidator(z.object({}).optional())
  .handler(async () => {
    const now = new Date();
    const earliest = new Date(now.getTime() + MIN_LEAD_MINUTES * 60_000);
    const timeMin = now.toISOString();
    const timeMax = new Date(now.getTime() + LOOKAHEAD_DAYS * 86_400_000).toISOString();

    // Query free/busy on the primary calendar
    const fbRes = await fetch(`${GATEWAY_URL}/freeBusy`, {
      method: "POST",
      headers: gwHeaders(),
      body: JSON.stringify({
        timeMin,
        timeMax,
        timeZone: "UTC",
        items: [{ id: "primary" }],
      }),
    });
    if (!fbRes.ok) {
      const txt = await fbRes.text();
      throw new Error(`freeBusy failed [${fbRes.status}]: ${txt}`);
    }
    const fb = (await fbRes.json()) as {
      calendars: Record<string, { busy: Array<{ start: string; end: string }> }>;
    };
    const busy = (fb.calendars?.primary?.busy ?? []).map((b) => ({
      start: new Date(b.start).getTime(),
      end: new Date(b.end).getTime(),
    }));

    const slots: { startISO: string; endISO: string }[] = [];

    // Walk the next LOOKAHEAD_DAYS calendar days in AGENCY_TZ
    for (let i = 0; i < LOOKAHEAD_DAYS; i++) {
      const probe = new Date(now.getTime() + i * 86_400_000);
      // Get y/m/d in AGENCY_TZ for this probe
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: AGENCY_TZ,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
        .formatToParts(probe)
        .reduce<Record<string, string>>((a, p) => {
          if (p.type !== "literal") a[p.type] = p.value;
          return a;
        }, {});
      const y = +parts.year,
        m = +parts.month,
        d = +parts.day;
      const dayStartUtc = zonedToUtc(y, m, d, WORK_START_HOUR, 0);
      const dow = dayOfWeekInTz(dayStartUtc);
      if (dow === 0 || dow === 6) continue; // weekends off

      for (let mins = 0; mins < (WORK_END_HOUR - WORK_START_HOUR) * 60; mins += SLOT_MINUTES) {
        const start = new Date(zonedToUtc(y, m, d, WORK_START_HOUR, mins).getTime());
        const end = new Date(start.getTime() + SLOT_MINUTES * 60_000);
        if (start < earliest) continue;
        const sMs = start.getTime();
        const eMs = end.getTime();
        const overlaps = busy.some((b) => sMs < b.end && eMs > b.start);
        if (overlaps) continue;
        slots.push({ startISO: start.toISOString(), endISO: end.toISOString() });
      }
    }

    return { slots, agencyTimezone: AGENCY_TZ };
  });

export const bookSlot = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      startISO: z.string().min(20).max(40),
      endISO: z.string().min(20).max(40),
      name: z.string().min(1).max(120),
      email: z.string().email().max(200),
      notes: z.string().max(2000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const start = new Date(data.startISO);
    const end = new Date(data.endISO);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      throw new Error("Invalid slot");
    }
    if (start < new Date(Date.now() + 30 * 60_000)) {
      throw new Error("Slot is too soon");
    }

    // Re-check availability to prevent double-booking
    const fbRes = await fetch(`${GATEWAY_URL}/freeBusy`, {
      method: "POST",
      headers: gwHeaders(),
      body: JSON.stringify({
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        timeZone: "UTC",
        items: [{ id: "primary" }],
      }),
    });
    if (!fbRes.ok) {
      const txt = await fbRes.text();
      throw new Error(`freeBusy failed [${fbRes.status}]: ${txt}`);
    }
    const fb = (await fbRes.json()) as {
      calendars: Record<string, { busy: Array<{ start: string; end: string }> }>;
    };
    if ((fb.calendars?.primary?.busy ?? []).length > 0) {
      throw new Error("Slot is no longer available");
    }

    const requestId = `afra-${start.getTime()}-${Math.random().toString(36).slice(2, 10)}`;
    const event = {
      summary: `Strategy Call · ${data.name} ↔ AFRA IA Marketing`,
      description: [
        "Free strategy call booked from afra-ai-ignition.lovable.app",
        ``,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.notes ? `\nNotes:\n${data.notes}` : "",
      ].join("\n"),
      start: { dateTime: start.toISOString(), timeZone: "UTC" },
      end: { dateTime: end.toISOString(), timeZone: "UTC" },
      attendees: [{ email: data.email, displayName: data.name }],
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: { useDefault: true },
    };

    const evRes = await fetch(
      `${GATEWAY_URL}/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all`,
      { method: "POST", headers: gwHeaders(), body: JSON.stringify(event) },
    );
    if (!evRes.ok) {
      const txt = await evRes.text();
      throw new Error(`event create failed [${evRes.status}]: ${txt}`);
    }
    const created = (await evRes.json()) as {
      id: string;
      htmlLink?: string;
      hangoutLink?: string;
      conferenceData?: { entryPoints?: Array<{ entryPointType: string; uri: string }> };
    };
    const meetLink =
      created.hangoutLink ??
      created.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri ??
      null;

    return {
      eventId: created.id,
      eventLink: created.htmlLink ?? null,
      meetLink,
      startISO: start.toISOString(),
      endISO: end.toISOString(),
    };
  });
