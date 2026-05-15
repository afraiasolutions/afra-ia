import { useI18n } from "@/lib/i18n";
import { useBooking } from "@/lib/booking-context";
import { Calendar, Clock, Video, Shield } from "lucide-react";
import { BookingFlow } from "./BookingFlow";

export function Booking() {
  const { t } = useI18n();
  const { openBooking } = useBooking();

  return (
    <section id="booking" className="relative py-32">
      <div className="glow-orb -z-10" style={{ width: 600, height: 600, background: "var(--gold)", top: "10%", left: "50%", transform: "translateX(-50%)", opacity: 0.18 }} />
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-gold mb-3">{t.booking.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{t.booking.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.booking.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-6 items-stretch">
          {/* Info panel */}
          <div className="glass-strong rounded-3xl p-8 gradient-border space-y-6">
            <div>
              <div className="text-xs text-muted-foreground">{t.booking.callLabel}</div>
              <div className="font-display text-2xl font-bold mt-1">{t.booking.callName}</div>
            </div>

            <ul className="space-y-4">
              {[
                { i: Clock, t: t.booking.duration },
                { i: Video, t: t.booking.format },
                { i: Calendar, t: t.booking.flex },
                { i: Shield, t: t.booking.private },
              ].map((it, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/15 border border-gold/30 text-gold">
                    <it.i className="h-4 w-4" />
                  </span>
                  <span className="text-muted-foreground pt-1.5">{it.t}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-card/50 border border-border p-4 text-xs text-muted-foreground leading-relaxed">
              {t.booking.note}
            </div>

            <button
              type="button"
              onClick={openBooking}
              className="block w-full text-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-background shadow-[0_0_30px_var(--gold-glow)] hover:shadow-[0_0_50px_var(--gold-glow)] transition-all"
            >
              {t.nav.book}
            </button>
          </div>

          {/* Inline slot picker */}
          <div className="relative glass-strong rounded-3xl p-6 md:p-8 gradient-border">
            <BookingFlow />
          </div>
        </div>
      </div>
    </section>
  );
}
