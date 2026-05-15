import { useI18n } from "@/lib/i18n";
import { Quote } from "lucide-react";

export function Testimonials() {
  const { t } = useI18n();
  return (
    <section id="testimonials" className="relative py-32">
      <div className="glow-orb -z-10" style={{ width: 500, height: 500, background: "var(--neon)", bottom: 0, left: "30%", opacity: 0.12 }} />
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-neon mb-3">{t.testimonials.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{t.testimonials.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.testimonials.items.map((it, i) => (
            <div key={i} className="relative glass-strong rounded-2xl p-8 gradient-border hover:-translate-y-1 transition-all">
              <Quote className="h-6 w-6 text-neon mb-4 opacity-60" />
              <p className="text-sm leading-relaxed text-foreground/90">"{it.q}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-neon to-neon/30 grid place-items-center font-display font-bold text-primary-foreground">
                  {it.n.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{it.n}</div>
                  <div className="text-xs text-muted-foreground">{it.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
