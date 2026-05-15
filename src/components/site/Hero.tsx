import { useI18n } from "@/lib/i18n";
import { useBooking } from "@/lib/booking-context";
import { ArrowRight, Sparkles, TrendingUp, Users, Zap, BarChart3 } from "lucide-react";

export function Hero() {
  const { t } = useI18n();
  const { openBooking } = useBooking();
  return (
    <section id="top" className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg radial-fade -z-10" />
      <div className="glow-orb -z-10" style={{ width: 500, height: 500, background: "var(--neon)", top: -100, left: "20%" }} />
      <div className="glow-orb -z-10" style={{ width: 420, height: 420, background: "var(--gold)", top: 80, right: "12%", opacity: 0.45 }} />
      <div className="glow-orb -z-10" style={{ width: 400, height: 400, background: "oklch(0.5 0.2 240)", bottom: -100, right: "10%", opacity: 0.4 }} />

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
            </span>
            {t.hero.badge}
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
            {t.hero.title1}{" "}
            <span className="gradient-text">{t.hero.title2}</span>{" "}
            {t.hero.title3}
          </h1>

          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={openBooking}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_40px_var(--neon-glow)] hover:shadow-[0_0_60px_var(--neon-glow)] transition-all"
            >
              {t.hero.cta1}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold hover:bg-card transition-all"
            >
              {t.hero.cta2}
            </a>
          </div>

          <div className="mt-8 text-xs text-muted-foreground flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-gradient-to-br from-neon/60 to-neon/20 ring-2 ring-background" />
              ))}
            </div>
            {t.hero.proof}
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="relative mt-20 max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-4 bg-gradient-to-r from-neon/20 via-transparent to-neon/20 rounded-3xl blur-2xl" />
          <div className="relative glass-strong rounded-2xl p-6 gradient-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-neon" />
              </div>
              <div className="text-xs text-muted-foreground">afra.ai / dashboard</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { i: TrendingUp, l: "Reach", v: "+340%" },
                { i: Users, l: "Leads", v: "12.4K" },
                { i: Zap, l: "ROAS", v: "8.4x" },
                { i: BarChart3, l: "CTR", v: "+187%" },
              ].map((m, i) => (
                <div key={i} className="rounded-xl bg-card/50 p-4 border border-border">
                  <m.i className="h-4 w-4 text-neon mb-2" />
                  <div className="text-xs text-muted-foreground">{m.l}</div>
                  <div className="text-xl font-display font-bold">{m.v}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-card/50 p-4 border border-border h-48 relative overflow-hidden">
              <svg viewBox="0 0 400 150" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.80 0.15 80)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.80 0.15 80)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,120 C40,100 80,90 120,70 C160,50 200,80 240,55 C280,30 320,40 360,20 L400,15 L400,150 L0,150 Z" fill="url(#g)" />
                <path d="M0,120 C40,100 80,90 120,70 C160,50 200,80 240,55 C280,30 320,40 360,20 L400,15" fill="none" stroke="oklch(0.80 0.15 80)" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute -left-4 md:-left-12 top-32 hidden md:block animate-float">
            <div className="glass-strong rounded-xl p-3 w-48 gradient-border">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-3 w-3 text-neon" />
                <div className="text-xs font-semibold">AI Workflow</div>
              </div>
              <div className="text-xs text-muted-foreground">3 leads qualified · just now</div>
            </div>
          </div>
          <div className="absolute -right-4 md:-right-12 bottom-12 hidden md:block animate-float" style={{ animationDelay: "1.5s" }}>
            <div className="glass-strong rounded-xl p-3 w-52 gradient-border">
              <div className="text-xs text-muted-foreground">Conversion rate</div>
              <div className="text-lg font-display font-bold text-neon">+127%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
