import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, Calendar as CalendarIcon, Clock, ArrowLeft, CheckCircle2, ExternalLink, Video } from "lucide-react";
import { getAvailableSlots, bookSlot } from "@/lib/booking.functions";
import { useI18n } from "@/lib/i18n";

type Slot = { startISO: string; endISO: string };

function groupByDay(slots: Slot[], tz: string) {
  const groups = new Map<string, { label: string; long: string; slots: Slot[] }>();
  const dayKeyFmt = new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" });
  const labelFmt = new Intl.DateTimeFormat(undefined, { timeZone: tz, weekday: "short", day: "numeric", month: "short" });
  const longFmt = new Intl.DateTimeFormat(undefined, { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" });
  for (const s of slots) {
    const d = new Date(s.startISO);
    const key = dayKeyFmt.format(d);
    if (!groups.has(key)) groups.set(key, { label: labelFmt.format(d), long: longFmt.format(d), slots: [] });
    groups.get(key)!.slots.push(s);
  }
  return Array.from(groups.entries()).map(([k, v]) => ({ key: k, ...v }));
}

export function BookingFlow({ compact = false, onClose }: { compact?: boolean; onClose?: () => void }) {
  const { t } = useI18n();
  const fetchSlots = useServerFn(getAvailableSlots);
  const submitBooking = useServerFn(bookSlot);

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["booking-slots"],
    queryFn: () => fetchSlots({ data: {} }),
    staleTime: 60_000,
  });

  const days = useMemo(() => (data ? groupByDay(data.slots, data.agencyTimezone) : []), [data]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [selected, setSelected] = useState<Slot | null>(null);
  const [step, setStep] = useState<"pick" | "form" | "done">("pick");
  const [form, setForm] = useState({ name: "", email: "", notes: "" });

  // Default to first day with slots
  useEffect(() => {
    if (days.length && !activeKey) setActiveKey(days[0].key);
  }, [days, activeKey]);

  const mutation = useMutation({
    mutationFn: async (payload: { startISO: string; endISO: string; name: string; email: string; notes: string }) => {
      return submitBooking({ data: payload });
    },
    onSuccess: () => setStep("done"),
  });

  const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mb-3 text-gold" />
        <p className="text-sm">Loading available times…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-destructive mb-4">Couldn't load availability.</p>
        <button onClick={() => refetch()} className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-background">
          Retry
        </button>
      </div>
    );
  }
  if (!data || data.slots.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground text-sm">
        No availability in the next 14 days. Please email us — we'll find a time.
      </div>
    );
  }

  if (step === "done" && mutation.data) {
    const start = new Date(mutation.data.startISO);
    return (
      <div className="text-center py-8 px-4">
        <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-gold/15 border border-gold/30 text-gold mb-4">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="font-display text-2xl font-semibold">You're booked!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(start)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">A calendar invite is on its way to {form.email}.</p>
        <div className="mt-6 flex flex-col gap-2 max-w-xs mx-auto">
          {mutation.data.meetLink && (
            <a href={mutation.data.meetLink} target="_blank" rel="noreferrer"
               className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background shadow-[0_0_30px_var(--gold-glow)]">
              <Video className="h-4 w-4" /> Join Google Meet
            </a>
          )}
          {mutation.data.eventLink && (
            <a href={mutation.data.eventLink} target="_blank" rel="noreferrer"
               className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm">
              <ExternalLink className="h-4 w-4" /> View in Google Calendar
            </a>
          )}
          {onClose && (
            <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground mt-2">Close</button>
          )}
        </div>
      </div>
    );
  }

  if (step === "form" && selected) {
    const start = new Date(selected.startISO);
    return (
      <div className="px-1 py-2">
        <button onClick={() => { setStep("pick"); setSelected(null); }}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-3 w-3" /> Back to times
        </button>
        <div className="rounded-2xl border border-border bg-card/50 p-4 mb-5">
          <div className="text-xs uppercase tracking-widest text-gold">{t.booking.callName}</div>
          <div className="mt-1 font-medium">
            {new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" }).format(start)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">30 min · {userTz}</div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({ startISO: selected.startISO, endISO: selected.endISO, ...form });
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-xs text-muted-foreground">Full name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                   className="mt-1 w-full rounded-xl bg-card border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                   className="mt-1 w-full rounded-xl bg-card border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">What would you like to discuss? (optional)</label>
            <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="mt-1 w-full rounded-xl bg-card border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold resize-none" />
          </div>
          {mutation.error && (
            <p className="text-xs text-destructive">{(mutation.error as Error).message}</p>
          )}
          <button type="submit" disabled={mutation.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-background shadow-[0_0_30px_var(--gold-glow)] hover:shadow-[0_0_50px_var(--gold-glow)] disabled:opacity-60 transition-all">
            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {mutation.isPending ? "Booking…" : "Confirm booking"}
          </button>
        </form>
      </div>
    );
  }

  const active = days.find((d) => d.key === activeKey) ?? days[0];

  return (
    <div className={compact ? "" : "grid md:grid-cols-[1fr_1.4fr] gap-5"}>
      <div className={compact ? "mb-4" : ""}>
        <div className="text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
          <CalendarIcon className="h-3.5 w-3.5" /> Pick a date
        </div>
        <div className={compact ? "flex gap-2 overflow-x-auto pb-2 -mx-1 px-1" : "flex md:flex-col gap-2 max-h-[360px] overflow-y-auto pr-1"}>
          {days.map((d) => {
            const isActive = d.key === active.key;
            return (
              <button
                key={d.key}
                onClick={() => setActiveKey(d.key)}
                className={`shrink-0 text-left rounded-xl border px-3 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-gold/15 border-gold text-foreground shadow-[0_0_20px_var(--gold-glow)]"
                    : "bg-card/40 border-border hover:border-gold/50 text-muted-foreground"
                }`}
              >
                <div className="text-xs uppercase tracking-wider">{d.label.split(" ")[0]}</div>
                <div className="font-medium">{d.label.replace(/^\S+\s/, "")}</div>
                <div className="text-[10px] mt-0.5 opacity-70">{d.slots.length} slots</div>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-gold mb-3 flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" /> {active.long} · {userTz}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[360px] overflow-y-auto pr-1">
          {active.slots.map((s) => (
            <button
              key={s.startISO}
              onClick={() => { setSelected(s); setStep("form"); }}
              className="rounded-xl border border-border bg-card/40 px-2 py-2.5 text-sm hover:border-gold hover:bg-gold/10 hover:text-foreground transition-all"
            >
              {timeFmt.format(new Date(s.startISO))}
            </button>
          ))}
        </div>
        {isFetching && (
          <div className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Refreshing…
          </div>
        )}
      </div>
    </div>
  );
}
