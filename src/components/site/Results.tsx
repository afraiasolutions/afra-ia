import { useI18n } from "@/lib/i18n";
import { TrendingUp } from "lucide-react";

export function Results() {
  const { t } = useI18n();
  const bars = [40, 65, 50, 78, 62, 88, 72, 95];
  return (
    <section id="results" className="relative py-32">
      <div className="glow-orb -z-10" style={{ width: 700, height: 700, background: "var(--neon)", top: "30%", right: "-20%", opacity: 0.12 }} />
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-neon mb-3">{t.results.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{t.results.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.results.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {t.results.metrics.map((m, i) => (
            <div key={i} className="glass rounded-2xl p-6 gradient-border">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">{m.v}</div>
              <div className="text-xs text-muted-foreground mt-2">{m.l}</div>
            </div>
          ))}
        </div>

        <div className="glass-strong rounded-3xl p-6 md:p-10 gradient-border">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="text-xs text-muted-foreground">Performance Overview</div>
              <div className="font-display text-2xl font-bold">Last 90 days</div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-neon/10 border border-neon/30 px-3 py-1.5 text-xs text-neon">
              <TrendingUp className="h-3 w-3" /> +287% YoY
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-64 relative">
              <svg viewBox="0 0 600 240" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.80 0.15 80)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="oklch(0.80 0.15 80)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" y1={60 * i + 30} x2="600" y2={60 * i + 30} stroke="oklch(1 0 0 / 0.05)" />
                ))}
                <path d="M0,200 C60,180 120,150 180,120 C240,90 300,140 360,90 C420,40 480,70 540,30 L600,20 L600,240 L0,240 Z" fill="url(#rg)" />
                <path d="M0,200 C60,180 120,150 180,120 C240,90 300,140 360,90 C420,40 480,70 540,30 L600,20" fill="none" stroke="oklch(0.80 0.15 80)" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground mb-2">Channel mix</div>
              {bars.slice(0, 5).map((w, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{["Meta", "Google", "Organic", "Email", "WhatsApp"][i]}</span>
                    <span className="text-foreground">{w}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-card overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-neon/60 to-neon" style={{ width: `${w}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
