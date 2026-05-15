import { useI18n } from "@/lib/i18n";
import {
  Video, Wand2, LayoutTemplate, Megaphone, Search, Database,
  MessageCircle, Filter, BarChart3, Rocket, Mail, Mic, ArrowUpRight,
} from "lucide-react";

const icons = [Video, Wand2, LayoutTemplate, Megaphone, Search, Database, MessageCircle, Filter, BarChart3, Rocket, Mail, Mic];

export function Services() {
  const { t } = useI18n();
  return (
    <section id="services" className="relative py-32">
      <div className="glow-orb -z-10" style={{ width: 500, height: 500, background: "var(--gold)", top: "25%", right: "-8%", opacity: 0.18 }} />
      <div className="glow-orb -z-10" style={{ width: 400, height: 400, background: "var(--neon)", top: "10%", left: "-10%", opacity: 0.12 }} />
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-widest text-gold mb-3">{t.services.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{t.services.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.services.subtitle}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.services.items.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="group relative rounded-2xl glass p-6 gradient-border hover:bg-card transition-all duration-500 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold/15 border border-gold/30 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all shadow-[0_0_15px_var(--gold-glow)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-gold group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
