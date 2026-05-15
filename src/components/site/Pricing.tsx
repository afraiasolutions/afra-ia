import { useI18n } from "@/lib/i18n";
import { useBooking } from "@/lib/booking-context";
import { Check } from "lucide-react";

export function Pricing() {
  const { t } = useI18n();
  const { openBooking } = useBooking();
  return (
    <section id="pricing" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-neon mb-3">{t.pricing.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{t.pricing.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.pricing.subtitle}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {t.pricing.plans.map((p, i) => {
            const popular = i === 1;
            return (
              <div
                key={i}
                className={`relative rounded-3xl p-8 transition-all hover:-translate-y-1 ${
                  popular
                    ? "glass-strong neon-border scale-[1.02]"
                    : "glass gradient-border"
                }`}
              >
                {popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon px-3 py-1 text-xs font-semibold text-primary-foreground shadow-[0_0_30px_var(--neon-glow)]">
                    {t.pricing.popular}
                  </div>
                )}
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground min-h-[3rem]">{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{p.price}</span>
                  <span className="text-muted-foreground text-sm">{t.pricing.month}</span>
                </div>
                <button
                  type="button"
                  onClick={openBooking}
                  className={`mt-6 block w-full text-center rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    popular
                      ? "bg-neon text-primary-foreground shadow-[0_0_30px_var(--neon-glow)] hover:shadow-[0_0_50px_var(--neon-glow)]"
                      : "bg-card hover:bg-secondary border border-border"
                  }`}
                >
                  {t.pricing.cta}
                </button>
                <ul className="mt-8 space-y-3">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon/15 text-neon">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
