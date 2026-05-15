import { useI18n } from "@/lib/i18n";
import { Brain, Workflow, Target, GitBranch, Sparkles, LineChart } from "lucide-react";

const icons = [Brain, Workflow, Target, GitBranch, Sparkles, LineChart];

export function WhyUs() {
  const { t } = useI18n();
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-widest text-neon mb-3">{t.why.eyebrow}</div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
            {t.why.title} <span className="gradient-text">{t.why.title2}</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden">
          {t.why.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="bg-background p-8 hover:bg-card transition-colors group">
                <Icon className="h-6 w-6 text-neon mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-lg font-semibold mb-2">{it.t}</h3>
                <p className="text-sm text-muted-foreground">{it.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
