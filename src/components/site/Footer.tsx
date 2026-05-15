import { useI18n } from "@/lib/i18n";
import { Instagram, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import logo from "@/assets/afra-logo.png";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer id="contact" className="relative border-t border-border pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 font-display font-bold">
              <img src={logo} alt="AFRA IA Marketing" className="h-11 w-11 rounded-full ring-1 ring-neon/40 shadow-[0_0_24px_var(--neon-glow)]" />
              <span className="text-lg">AFRA<span className="text-neon"> IA</span> MARKETING</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Linkedin, Youtube].map((I, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-neon hover:text-primary-foreground transition-all">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-4">{t.footer.quickLinks}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-foreground">{t.nav.services}</a></li>
              <li><a href="#pricing" className="hover:text-foreground">{t.nav.pricing}</a></li>
              <li><a href="#results" className="hover:text-foreground">{t.nav.results}</a></li>
              <li><a href="#testimonials" className="hover:text-foreground">{t.nav.testimonials}</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold mb-4">{t.footer.contact}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-3 w-3" /> hello@afra.ai</li>
              <li>+1 (555) 010 — 2026</li>
              <li>Miami · Madrid · CDMX</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} AFRA IA Marketing. {t.footer.rights}</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">{t.footer.links.privacy}</a>
            <a href="#" className="hover:text-foreground">{t.footer.links.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
