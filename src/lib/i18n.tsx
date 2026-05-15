import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

type Dict = typeof en;

const en = {
  nav: { services: "Services", pricing: "Pricing", results: "Results", testimonials: "Testimonials", contact: "Contact", book: "Book a Call" },
  hero: {
    badge: "AI-Powered Marketing Agency",
    title1: "Turn Your Business Into a",
    title2: "Client Acquisition Machine",
    title3: "With AI",
    subtitle: "We combine AI, content creation, funnels, automation, paid ads and neuro-marketing strategies to help brands grow faster and smarter.",
    cta1: "Book a Free Strategy Call",
    cta2: "View Services",
    proof: "Trusted by 200+ brands worldwide",
  },
  services: {
    eyebrow: "Services",
    title: "Everything you need to dominate your market",
    subtitle: "A complete arsenal of AI-powered marketing systems built to convert.",
    cta: "Learn more",
    items: [
      { t: "Short Form Content", d: "Viral-ready videos engineered for reach and retention across TikTok, Reels and Shorts." },
      { t: "AI Video Editing", d: "Cinematic edits powered by AI workflows. Faster delivery, premium results." },
      { t: "Landing Pages", d: "High-converting pages built with neuro-design and rigorous A/B testing." },
      { t: "Meta Ads", d: "Performance campaigns on Facebook and Instagram with surgical targeting." },
      { t: "Google Ads", d: "Search, Display and YouTube campaigns optimized for ROAS." },
      { t: "CRM Systems", d: "Custom CRM setups that turn cold leads into recurring revenue." },
      { t: "AI WhatsApp Automation", d: "24/7 conversational bots that qualify leads and close sales." },
      { t: "Funnels & Lead Gen", d: "End-to-end funnel architecture that scales predictably." },
      { t: "Analytics Dashboards", d: "Real-time dashboards so you always know what's working." },
      { t: "Branding & Social Growth", d: "Magnetic brand systems and audience growth on autopilot." },
      { t: "Email Marketing", d: "Automated sequences that nurture, convert and retain." },
      { t: "AI Voiceovers", d: "Studio-grade AI voices in any language and tone." },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Choose your growth system",
    subtitle: "Transparent pricing. No long-term contracts. Cancel anytime.",
    popular: "Most Popular",
    month: "/month",
    cta: "Get Started",
    plans: [
      { name: "Content Boost", price: "$799", desc: "For brands ready to scale their content presence.", features: ["15 videos / month", "Viral editing", "Captions & hooks", "Stories management", "Monthly analytics report"] },
      { name: "Social Growth", price: "$1,099", desc: "For brands serious about audience and lead generation.", features: ["25 videos / month", "Content strategy", "Community management", "Lead generation system", "Growth analytics dashboard"] },
      { name: "Domination System", price: "$1,399", desc: "Full digital growth machine. End-to-end.", features: ["40 videos / month", "Full funnel system", "Landing page", "CRM setup", "AI automation", "Meta + Google Ads", "Advanced analytics"] },
    ],
  },
  results: {
    eyebrow: "Results",
    title: "Numbers that speak louder than promises",
    subtitle: "Real performance from real client systems.",
    metrics: [
      { v: "+340%", l: "Reach growth" },
      { v: "+187%", l: "Engagement increase" },
      { v: "12,400+", l: "Leads generated" },
      { v: "8.4x", l: "Average ROAS" },
    ],
  },
  why: {
    eyebrow: "Why Choose Us",
    title: "We don't just make content.",
    title2: "We build digital systems that generate clients.",
    items: [
      { t: "AI-Powered Workflows", d: "Production speed multiplied by intelligent automation." },
      { t: "Full Automation", d: "From first touch to closed deal — all on autopilot." },
      { t: "Neuro-Sales Strategies", d: "Persuasion frameworks rooted in cognitive science." },
      { t: "Complete Funnel Systems", d: "Every step engineered to convert." },
      { t: "High-Converting Content", d: "Creative built around data, not opinions." },
      { t: "Data-Driven Decisions", d: "Dashboards that tell you exactly what to do next." },
    ],
  },
  booking: {
    eyebrow: "Book a call",
    title: "Pick a time that works for you",
    subtitle: "30 minutes. Zero pressure. Walk away with a clear growth plan — even if we don't work together.",
    callLabel: "Free strategy call",
    callName: "AI Growth Audit",
    duration: "30 minutes · 1-on-1",
    format: "Google Meet (link sent automatically)",
    flex: "Reschedule or cancel anytime",
    private: "100% confidential — under NDA on request",
    note: "We'll review your funnel, audience and offer, and outline the AI systems most likely to move the needle in the next 90 days.",
    openExternal: "Open in Google Calendar",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Loved by founders and CMOs",
    items: [
      { n: "Daniel Reyes", r: "CEO, Lumen Studio", q: "AFRA rebuilt our funnel and we 6x'd our leads in 90 days. The AI automation alone paid for the entire engagement." },
      { n: "Sofia Marin", r: "CMO, Nova Brands", q: "Premium creative, surgical strategy, real results. They feel less like an agency and more like an in-house growth team." },
      { n: "Marcus Lee", r: "Founder, Apex Wear", q: "Their dashboards changed how we run the business. We finally know which dollar produces which client." },
    ],
  },
  finalCta: {
    title: "Ready to scale your business?",
    subtitle: "Let's build the system that turns your brand into the obvious choice.",
    cta1: "Schedule Free Consultation",
    cta2: "Start Your Growth System",
  },
  footer: {
    tagline: "AI-powered growth systems for ambitious brands.",
    services: "Services",
    company: "Company",
    contact: "Contact",
    quickLinks: "Quick Links",
    rights: "All rights reserved.",
    links: { about: "About", careers: "Careers", blog: "Blog", privacy: "Privacy", terms: "Terms" },
  },
};

const es: Dict = {
  nav: { services: "Servicios", pricing: "Precios", results: "Resultados", testimonials: "Testimonios", contact: "Contacto", book: "Agendar Llamada" },
  hero: {
    badge: "Agencia de Marketing con IA",
    title1: "Convierte Tu Negocio en una",
    title2: "Máquina de Captación de Clientes",
    title3: "Con IA",
    subtitle: "Combinamos IA, creación de contenido, embudos, automatización, ads pagados y neuro-marketing para que tu marca crezca más rápido y de forma más inteligente.",
    cta1: "Agenda una Llamada Gratis",
    cta2: "Ver Servicios",
    proof: "Más de 200 marcas confían en nosotros",
  },
  services: {
    eyebrow: "Servicios",
    title: "Todo lo que necesitas para dominar tu mercado",
    subtitle: "Un arsenal completo de sistemas de marketing con IA diseñados para convertir.",
    cta: "Saber más",
    items: [
      { t: "Contenido Short Form", d: "Videos virales optimizados para alcance y retención en TikTok, Reels y Shorts." },
      { t: "Edición de Video con IA", d: "Ediciones cinematográficas con flujos de IA. Más rápido, calidad premium." },
      { t: "Landing Pages", d: "Páginas de alta conversión con neuro-diseño y testing A/B riguroso." },
      { t: "Meta Ads", d: "Campañas de performance en Facebook e Instagram con segmentación quirúrgica." },
      { t: "Google Ads", d: "Campañas en Search, Display y YouTube optimizadas para ROAS." },
      { t: "Sistemas CRM", d: "CRMs personalizados que convierten leads fríos en ingresos recurrentes." },
      { t: "Automatización WhatsApp IA", d: "Bots conversacionales 24/7 que califican leads y cierran ventas." },
      { t: "Embudos y Lead Gen", d: "Arquitectura de embudos end-to-end que escala de forma predecible." },
      { t: "Dashboards Analíticos", d: "Dashboards en tiempo real para saber siempre qué está funcionando." },
      { t: "Branding y Social", d: "Sistemas de marca magnéticos y crecimiento de audiencia en automático." },
      { t: "Email Marketing", d: "Secuencias automatizadas que nutren, convierten y retienen." },
      { t: "Voces IA", d: "Voces IA de calidad de estudio en cualquier idioma y tono." },
    ],
  },
  pricing: {
    eyebrow: "Precios",
    title: "Elige tu sistema de crecimiento",
    subtitle: "Precios transparentes. Sin contratos largos. Cancela cuando quieras.",
    popular: "Más Popular",
    month: "/mes",
    cta: "Empezar",
    plans: [
      { name: "Content Boost", price: "$799", desc: "Para marcas listas para escalar su presencia de contenido.", features: ["15 videos / mes", "Edición viral", "Captions y hooks", "Gestión de Stories", "Reporte mensual"] },
      { name: "Social Growth", price: "$1,099", desc: "Para marcas serias con su audiencia y generación de leads.", features: ["25 videos / mes", "Estrategia de contenido", "Community management", "Sistema de lead gen", "Dashboard de crecimiento"] },
      { name: "Domination System", price: "$1,399", desc: "Máquina completa de crecimiento digital. End-to-end.", features: ["40 videos / mes", "Sistema de embudo completo", "Landing page", "Setup de CRM", "Automatización IA", "Meta + Google Ads", "Analítica avanzada"] },
    ],
  },
  results: {
    eyebrow: "Resultados",
    title: "Números que hablan más fuerte que las promesas",
    subtitle: "Performance real de sistemas reales de clientes.",
    metrics: [
      { v: "+340%", l: "Crecimiento de alcance" },
      { v: "+187%", l: "Aumento de engagement" },
      { v: "12,400+", l: "Leads generados" },
      { v: "8.4x", l: "ROAS promedio" },
    ],
  },
  why: {
    eyebrow: "Por Qué Elegirnos",
    title: "No solo creamos contenido.",
    title2: "Construimos sistemas digitales que generan clientes.",
    items: [
      { t: "Flujos con IA", d: "Velocidad de producción multiplicada por automatización inteligente." },
      { t: "Automatización Total", d: "Del primer contacto al cierre — todo en automático." },
      { t: "Neuro-Ventas", d: "Frameworks de persuasión basados en ciencia cognitiva." },
      { t: "Embudos Completos", d: "Cada paso diseñado para convertir." },
      { t: "Contenido que Convierte", d: "Creatividad construida sobre datos, no opiniones." },
      { t: "Decisiones Data-Driven", d: "Dashboards que te dicen exactamente qué hacer." },
    ],
  },
  booking: {
    eyebrow: "Agenda una llamada",
    title: "Elige el horario que mejor te quede",
    subtitle: "30 minutos. Cero presión. Te vas con un plan claro de crecimiento — incluso si no trabajamos juntos.",
    callLabel: "Llamada estratégica gratis",
    callName: "Auditoría de Growth con IA",
    duration: "30 minutos · 1 a 1",
    format: "Google Meet (link enviado automáticamente)",
    flex: "Reagenda o cancela cuando quieras",
    private: "100% confidencial — bajo NDA si lo solicitas",
    note: "Revisamos tu embudo, tu audiencia y tu oferta, y trazamos los sistemas de IA con mayor potencial para los próximos 90 días.",
    openExternal: "Abrir en Google Calendar",
  },
  testimonials: {
    eyebrow: "Testimonios",
    title: "Amado por founders y CMOs",
    items: [
      { n: "Daniel Reyes", r: "CEO, Lumen Studio", q: "AFRA reconstruyó nuestro embudo y multiplicamos x6 los leads en 90 días. La automatización IA pagó todo el contrato." },
      { n: "Sofía Marín", r: "CMO, Nova Brands", q: "Creatividad premium, estrategia quirúrgica, resultados reales. Más que una agencia, son nuestro equipo de growth." },
      { n: "Marcus Lee", r: "Founder, Apex Wear", q: "Sus dashboards cambiaron cómo dirigimos el negocio. Por fin sabemos qué dólar produce qué cliente." },
    ],
  },
  finalCta: {
    title: "¿Listo para escalar tu negocio?",
    subtitle: "Construyamos el sistema que convierta tu marca en la opción obvia.",
    cta1: "Agenda Consulta Gratis",
    cta2: "Inicia Tu Sistema de Growth",
  },
  footer: {
    tagline: "Sistemas de growth con IA para marcas ambiciosas.",
    services: "Servicios",
    company: "Empresa",
    contact: "Contacto",
    quickLinks: "Enlaces",
    rights: "Todos los derechos reservados.",
    links: { about: "Nosotros", careers: "Empleo", blog: "Blog", privacy: "Privacidad", terms: "Términos" },
  },
};

const dictionaries = { en, es };

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return <Ctx.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

export const BOOKING_URL = "https://calendar.google.com/calendar/u/0/r";
