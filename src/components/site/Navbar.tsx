import { useEffect, useState } from "react";
import { useI18n, type Lang } from "@/lib/i18n";
import { useBooking } from "@/lib/booking-context";
import logo from "@/assets/afra-logo.png";

export function Navbar() {
  const { t, lang, setLang } = useI18n();
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#results", label: t.nav.results },
    { href: "#testimonials", label: t.nav.testimonials },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-strong" : ""}`}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display font-bold tracking-tight"
          >
            <img
              src={logo}
              alt="AFRA IA Marketing"
              className="h-10 w-10 rounded-full ring-1 ring-neon/40 shadow-[0_0_20px_var(--neon-glow)]"
            />
            <span className="text-base sm:text-lg">
              AFRA<span className="text-neon"> IA</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center rounded-full border border-border p-0.5 text-xs">
              {(["en", "es"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full uppercase font-medium transition-all ${lang === l ? "bg-neon text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={openBooking}
              className="rounded-full bg-neon px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_30px_var(--neon-glow)]"
            >
              {t.nav.book}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
