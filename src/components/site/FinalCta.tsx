import { useI18n } from "@/lib/i18n";
import { useBooking } from "@/lib/booking-context";
import { ArrowRight, Calendar } from "lucide-react";

export function FinalCta() {
  const { t } = useI18n();
  const { openBooking } = useBooking();
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative rounded-3xl glass-strong p-12 md:p-20 text-center overflow-hidden gradient-border">
          <div className="glow-orb" style={{ width: 600, height: 600, background: "var(--neon)", top: "-50%", left: "50%", transform: "translateX(-50%)", opacity: 0.25 }} />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight">
              <span className="gradient-text">{t.finalCta.title}</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t.finalCta.subtitle}</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_var(--neon-glow)] hover:shadow-[0_0_60px_var(--neon-glow)] transition-all"
              >
                <Calendar className="h-4 w-4" />
                {t.finalCta.cta1}
              </button>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold hover:bg-card transition-all"
              >
                {t.finalCta.cta2}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
