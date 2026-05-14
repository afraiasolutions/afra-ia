import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  MessageCircle, 
  Layout, 
  Share2, 
  Cpu, 
  ChevronRight, 
  Globe, 
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  ShieldCheck,
  Send,
  Target,
  Search,
  BarChart3,
  Mail,
  Play
} from 'lucide-react';

const translations = {
  en: {
    navHome: "Home",
    navServices: "Services",
    navWhyUs: "Why Us",
    navContact: "Contact",
    heroBadge: "AI-Powered Solutions",
    heroTitle: "Evolve Your Business with",
    heroTitleAccent: "Intelligent Technology",
    heroDesc: "AFRA Business Solutions scales your brand with state-of-the-art landing pages, seamless automations, and data-driven social media management.",
    btnContact: "Contact on WhatsApp",
    btnServices: "Explore Services",
    stat1Title: "150+",
    stat1Desc: "Active Clients",
    stat2Title: "5x",
    stat2Desc: "Average ROI",
    stat3Title: "24/7",
    stat3Desc: "AI Support",
    stat4Title: "98%",
    stat4Desc: "Retention Rate",
    servicesTitle: "Our Solutions",
    servicesDesc: "We provide comprehensive digital solutions tailored to elevate your brand using the latest AI technologies. Choose the path to growth.",
    serv1Title: "Social Media Management",
    serv1Desc: "Our core expertise. We grow your audience and engagement with AI-driven content strategies and community management.",
    serv1Feat1: "AI-Generated Content Plans",
    serv1Feat2: "Community Engagement",
    serv1Feat3: "Performance Analytics",
    serv2Title: "Custom Landing Pages",
    serv2Desc: "High-converting, stunning, and ultra-fast landing pages designed to turn your visitors into loyal clients.",
    serv2Feat1: "Conversion-Optimized Design",
    serv2Feat2: "Ultra-Fast Loading Times",
    serv2Feat3: "Mobile First Approach",
    serv3Title: "Business Automations",
    serv3Desc: "Streamline your workflows. Save time and resources by automating repetitive tasks with intelligent bots.",
    serv3Feat1: "Workflow Automation",
    serv3Feat2: "AI Customer Support Bots",
    serv3Feat3: "CRM Integrations",
    mostImportant: "Core Service",
    whyUsTitle: "Why Choose AFRA?",
    whyUsDesc1: "At AFRA Business Solutions, we believe in the power of technology to transform businesses. We don't just provide services; we partner with you to understand your unique challenges and deliver tailored AI solutions.",
    whyUsDesc2: "Our team of experts combines creative marketing with cutting-edge artificial intelligence to ensure you stay ahead of the competition. Let us handle the complexity while you focus on what you do best: growing your business.",
    impactTitle: "Multiply Your Success",
    impactDesc: "Our clients see an average of 5x Return on Investment within the first 6 months of implementing our AI-driven strategies and automations.",
    contactTitle: "Let's Talk",
    contactDesc: "Ready to scale your business? Send us a message or fill out the form below. Our team is ready to help you evolve.",
    formName: "Full Name",
    formEmail: "Email Address",
    formMessage: "How can we help you?",
    formSubmit: "Send Message",
    footerText: "© 2024 AFRA Business Solutions. All rights reserved.",
    footerLinks: "Privacy Policy | Terms of Service",
    navPricing: "Plans",
    pricingTitle: "Investment Plans",
    pricingDesc: "We focus on real transformations and measurable objectives for your business. Choose the path that fits your goals.",
    pricingIncludes: "Includes:",
    pricingMetrics: "Key Metrics:",
    pricingSuggest: "Suggested Price:",
    upsellsTitle: "🧩 Modular Services (Upsells)",
    upsellsDesc: "Here is where the magic happens. Enhance your strategy with these powerful add-ons."
  },
  es: {
    navHome: "Inicio",
    navServices: "Servicios",
    navWhyUs: "Por Qué Elegirnos",
    navContact: "Contacto",
    heroBadge: "Soluciones con IA",
    heroTitle: "Evoluciona tu negocio con",
    heroTitleAccent: "Tecnología Inteligente",
    heroDesc: "AFRA Business Solutions escala tu marca con landing pages modernas, automatizaciones efectivas y manejo profesional de redes sociales basado en datos.",
    btnContact: "Contactar por WhatsApp",
    btnServices: "Ver Servicios",
    stat1Title: "150+",
    stat1Desc: "Clientes Activos",
    stat2Title: "5x",
    stat2Desc: "Retorno Promedio",
    stat3Title: "24/7",
    stat3Desc: "Soporte IA",
    stat4Title: "98%",
    stat4Desc: "Tasa de Retención",
    servicesTitle: "Nuestras Soluciones",
    servicesDesc: "Proveemos soluciones digitales integrales diseñadas para elevar tu marca usando la última tecnología en IA. Elige el camino hacia el crecimiento.",
    serv1Title: "Manejo de Redes Sociales",
    serv1Desc: "Nuestra especialidad. Hacemos crecer tu audiencia con estrategias de contenido y gestión impulsadas por Inteligencia Artificial.",
    serv1Feat1: "Planes de Contenido con IA",
    serv1Feat2: "Gestión de Comunidad",
    serv1Feat3: "Análisis de Rendimiento",
    serv2Title: "Landing Pages",
    serv2Desc: "Páginas de aterrizaje atractivas, rápidas y de alta conversión diseñadas para transformar visitantes en clientes fieles.",
    serv2Feat1: "Diseño Optimizado para Conversión",
    serv2Feat2: "Carga Ultra Rápida",
    serv2Feat3: "Enfoque Mobile First",
    serv3Title: "Automatizaciones",
    serv3Desc: "Optimiza tus procesos. Ahorra tiempo y dinero automatizando tareas repetitivas con bots y flujos inteligentes.",
    serv3Feat1: "Automatización de Flujos de Trabajo",
    serv3Feat2: "Bots de Atención al Cliente",
    serv3Feat3: "Integración con CRM",
    mostImportant: "Servicio Estrella",
    whyUsTitle: "¿Por Qué Elegir a AFRA?",
    whyUsDesc1: "En AFRA Business Solutions, creemos en el poder de la tecnología para transformar empresas. No solo proveemos servicios; nos asociamos contigo para entender tus desafíos y entregar soluciones de IA a medida.",
    whyUsDesc2: "Nuestro equipo combina marketing creativo con inteligencia artificial de vanguardia para asegurar que te mantengas por delante de la competencia. Déjanos manejar la complejidad mientras tú te enfocas en lo que mejor haces: hacer crecer tu negocio.",
    impactTitle: "Multiplica tu Éxito",
    impactDesc: "Nuestros clientes ven un promedio de 5x de Retorno de Inversión dentro de los primeros 6 meses de implementar nuestras estrategias y automatizaciones con IA.",
    contactTitle: "Hablemos",
    contactDesc: "¿Listo para escalar tu negocio? Envíanos un mensaje o completa el formulario. Nuestro equipo está listo para ayudarte a evolucionar.",
    formName: "Nombre Completo",
    formEmail: "Correo Electrónico",
    formMessage: "¿Cómo podemos ayudarte?",
    formSubmit: "Enviar Mensaje",
    footerText: "© 2024 AFRA Business Solutions. Todos los derechos reservados.",
    footerLinks: "Política de Privacidad | Términos de Servicio",
    navPricing: "Planes",
    pricingTitle: "Planes de Inversión",
    pricingDesc: "Nos enfocamos en transformaciones reales y objetivos medibles para tu negocio. Elige el camino que se adapte a tus metas.",
    pricingIncludes: "Incluye:",
    pricingMetrics: "Métricas:",
    pricingSuggest: "Precio sugerido:",
    upsellsTitle: "🧩 Servicios Modulares (Upsells)",
    upsellsDesc: "Acá está la magia. Potencia tu estrategia con estos módulos adicionales."
  }
};

const plansData = {
  en: [
    {
      id: "pack1",
      name: "🟢 PACK 1 — CONTENT BOOST",
      goal: "Ideal for businesses wanting an active digital presence.",
      price: "USD 700",
      includes: [
        "15 monthly videos", "Professional editing", "Viral hooks", "Captions copy", "Social media posting", "5 weekly stories", "Basic monthly report"
      ],
      metrics: [
        "Reach", "Views", "Engagement", "New followers", "Best video of the month"
      ]
    },
    {
      id: "pack2",
      name: "🟡 PACK 2 — SOCIAL GROWTH",
      goal: "Designed to generate inquiries and establish authority.",
      price: "USD 1100",
      includes: [
        "25 monthly videos", "Content strategy", "Trend research", "Monthly calendar", "Basic community management", "Message responses", "10 graphic designs", "Daily stories", "Profile optimization"
      ],
      metrics: [
        "Video retention", "CTR", "Engagement rate", "Leads generated", "Messages received", "Monthly growth"
      ],
      popular: true
    },
    {
      id: "pack3",
      name: "🔴 PACK 3 — DOMINATION SYSTEM",
      goal: "Complete client acquisition system.",
      price: "USD 1800",
      includes: [
        "40 monthly videos", "Premium production", "Full strategy", "Sales funnel", "AI Automations", "CRM", "Landing page", "Meta Ads", "Google Ads", "Email marketing", "Lead tracking", "Analytics dashboard"
      ],
      metrics: [
        "CPL", "CAC", "ROAS", "Conversions", "Sales", "ROI", "Full funnel"
      ]
    }
  ],
  es: [
    {
      id: "pack1",
      name: "🟢 PACK 1 — CONTENT BOOST",
      goal: "Ideal para negocios que quieren presencia y redes activas.",
      price: "Start at USD 700",
      includes: [
        "15 videos mensuales", "Edición profesional", "Hooks virales", "Copies para captions", "Subida a redes", "5 historias semanales", "Reporte básico mensual"
      ],
      metrics: [
        "Alcance", "Visualizaciones", "Engagement", "Seguidores nuevos", "Mejor video del mes"
      ]
    },
    {
      id: "pack2",
      name: "🟡 PACK 2 — SOCIAL GROWTH",
      goal: "Pensado para generar consultas y autoridad.",
      price: "Start at USD 1100",
      includes: [
        "25 videos mensuales", "Estrategia de contenido", "Investigación de tendencias", "Calendario mensual", "Community management básico", "Respuesta de mensajes", "10 diseños gráficos", "Stories diarias", "Optimización del perfil"
      ],
      metrics: [
        "Retención de videos", "CTR", "Engagement rate", "Leads generados", "Mensajes recibidos", "Crecimiento mensual"
      ],
      popular: true
    },
    {
      id: "pack3",
      name: "🔴 PACK 3 — DOMINATION SYSTEM",
      goal: "Sistema completo de adquisición de clientes.",
      price: "Start at USD 1800",
      includes: [
        "40 videos mensuales", "Producción premium", "Estrategia completa", "Funnel de ventas", "IA para automatizaciones", "CRM", "Landing page", "Meta Ads", "Google Ads", "Email marketing", "Seguimiento de leads", "Dashboard analytics"
      ],
      metrics: [
        "CPL", "CAC", "ROAS", "Conversiones", "Ventas", "ROI", "Embudo completo"
      ]
    }
  ]
};

const modularServices = {
  en: [
    { icon: "Layout", name: "Landing Page", desc: "Design + copy + forms, Meta Pixel + Analytics", price: "Consult" },
    { icon: "MessageCircle", name: "WhatsApp AI Automation", desc: "Auto-replies, Lead capture, Follow-ups", price: "Consult" },
    { icon: "Target", name: "Meta Ads Setup", desc: "Campaign setup, Audiences, Pixel, Initial testing", price: "Consult" },
    { icon: "Search", name: "Google Ads Setup", desc: "Search ads, Keywords, Conversion tracking", price: "Consult" },
    { icon: "BarChart3", name: "Dashboard Analytics", desc: "Leads, sales, reach, conversions, campaigns", price: "Consult" },
    { icon: "Users", name: "CRM + Pipeline", desc: "Client tracking system", price: "Consult" },
    { icon: "Mail", name: "Email Marketing", desc: "Automated flows, Lead recovery, Remarketing", price: "Consult" }
  ],
  es: [
    { icon: "Layout", name: "Landing Page", desc: "Diseño + copy + formularios, Pixel Meta + Analytics", price: "Consultar" },
    { icon: "MessageCircle", name: "Automatización WhatsApp IA", desc: "Respuestas automáticas, Captura de leads, Seguimiento", price: "Consultar" },
    { icon: "Target", name: "Meta Ads Setup", desc: "Configuración campañas, Públicos, Pixel, Testing inicial", price: "Consultar" },
    { icon: "Search", name: "Google Ads Setup", desc: "Search ads, Keywords, Conversion tracking", price: "Consultar" },
    { icon: "BarChart3", name: "Dashboard Analytics", desc: "Leads, ventas, alcance, conversiones, campañas", price: "Consultar" },
    { icon: "Users", name: "CRM + Pipeline", desc: "Sistema de seguimiento de clientes", price: "Consultar" },
    { icon: "Mail", name: "Email Marketing", desc: "Flujos automáticos, Recuperación de leads, Remarketing", price: "Consultar" }
  ]
};

function App() {
  const [lang, setLang] = useState('es'); 
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  const openWhatsApp = (e) => {
    if(e) e.preventDefault();
    const message = lang === 'es' ? "Hola, me gustaría obtener más información sobre sus servicios." : "Hello, I would like to get more information about your services.";
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  const iconMap = {
    Layout: <Layout size={24} />,
    MessageCircle: <MessageCircle size={24} />,
    Target: <Target size={24} />,
    Search: <Search size={24} />,
    BarChart3: <BarChart3 size={24} />,
    Users: <Users size={24} />,
    Mail: <Mail size={24} />
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo-container">
            <div style={{ color: 'var(--accent-light)', display: 'flex', alignItems: 'center' }}>
              <img src="/logo.jpeg" alt="AFRA Logo" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <span className="logo-text">AFRA</span>
          </div>
          
          <div className="nav-links">
            <a href="#" className="nav-link">{t.navHome}</a>
            <a href="#services" className="nav-link">{t.navServices}</a>
            <a href="#pricing" className="nav-link">{t.navPricing}</a>
            <a href="#why-us" className="nav-link">{t.navWhyUs}</a>
            <a href="#contact" className="nav-link">{t.navContact}</a>
            <button className="lang-switch" onClick={toggleLanguage}>
              <Globe size={16} />
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-glow"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in">{t.heroBadge}</div>
            <h1 className="animate-fade-in delay-100">
              {t.heroTitle} <br/>
              <span className="text-gradient-primary">{t.heroTitleAccent}</span>
            </h1>
            <p className="animate-fade-in delay-200">
              {t.heroDesc}
            </p>
            <div className="hero-buttons animate-fade-in delay-300">
              <button className="btn btn-whatsapp" onClick={openWhatsApp}>
                <MessageCircle size={20} />
                {t.btnContact}
              </button>
              <a href="#services" className="btn btn-outline">
                {t.btnServices}
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h4>{t.stat1Title}</h4>
              <p>{t.stat1Desc}</p>
            </div>
            <div className="stat-item">
              <h4>{t.stat2Title}</h4>
              <p>{t.stat2Desc}</p>
            </div>
            <div className="stat-item">
              <h4>{t.stat3Title}</h4>
              <p>{t.stat3Desc}</p>
            </div>
            <div className="stat-item">
              <h4>{t.stat4Title}</h4>
              <p>{t.stat4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          {/* Animated Video Section */}
          <div className="video-section animate-fade-in" onClick={() => alert(lang === 'es' ? "Aquí iría el video generado con IA de la persona explicando por qué elegirnos." : "Here goes the AI-generated video of the person explaining why to choose us.")}>
            <img src="/video-thumbnail.png" alt="Video presentation thumbnail" className="video-thumbnail" />
            <div className="video-overlay">
              <div className="play-button">
                <Play size={40} fill="white" style={{ marginLeft: '5px' }} />
              </div>
            </div>
          </div>

          <div className="section-header" style={{ marginTop: '4rem' }}>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesDesc}</p>
          </div>

          <div className="services-grid">
            {/* Core Service: Social Media */}
            <div className="service-card" style={{ border: '1px solid rgba(0, 195, 255, 0.4)' }}>
              <div className="featured-badge">{t.mostImportant}</div>
              <div className="service-card-content">
                <div className="service-icon" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                  <Share2 size={30} />
                </div>
                <h3>{t.serv1Title}</h3>
                <p>{t.serv1Desc}</p>
                <ul className="service-features">
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv1Feat1}</li>
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv1Feat2}</li>
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv1Feat3}</li>
                </ul>
              </div>
            </div>

            {/* Service: Landing Pages */}
            <div className="service-card">
              <div className="service-card-content">
                <div className="service-icon">
                  <Layout size={30} />
                </div>
                <h3>{t.serv2Title}</h3>
                <p>{t.serv2Desc}</p>
                <ul className="service-features">
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv2Feat1}</li>
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv2Feat2}</li>
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv2Feat3}</li>
                </ul>
              </div>
            </div>

            {/* Service: Automations */}
            <div className="service-card">
              <div className="service-card-content">
                <div className="service-icon">
                  <Cpu size={30} />
                </div>
                <h3>{t.serv3Title}</h3>
                <p>{t.serv3Desc}</p>
                <ul className="service-features">
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv3Feat1}</li>
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv3Feat2}</li>
                  <li><CheckCircle2 size={16} color="var(--accent-light)" /> {t.serv3Feat3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>{t.pricingTitle}</h2>
            <p>{t.pricingDesc}</p>
          </div>

          <div className="pricing-grid">
            {plansData[lang].map((plan) => (
              <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Top Choice</div>}
                <h3>{plan.name}</h3>
                <p className="pricing-goal">{plan.goal}</p>
                <div className="pricing-price">
                  <span>{t.pricingSuggest}</span>
                  <h4>{plan.price}</h4>
                </div>
                
                <div className="pricing-details">
                  <div className="pricing-section">
                    <h5>{t.pricingIncludes}</h5>
                    <ul>
                      {plan.includes.map((item, i) => (
                        <li key={i}><CheckCircle2 size={16} className="text-accent" /> {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pricing-section">
                    <h5>{t.pricingMetrics}</h5>
                    <ul>
                      {plan.metrics.map((item, i) => (
                        <li key={i}><TrendingUp size={16} className="text-accent" /> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`} onClick={openWhatsApp} style={{width: '100%', marginTop: '2rem'}}>
                  {t.btnContact}
                </button>
              </div>
            ))}
          </div>

          {/* Upsells */}
          <div className="upsells-container">
            <div className="upsells-header">
              <h3>{t.upsellsTitle}</h3>
              <p>{t.upsellsDesc}</p>
            </div>
            <div className="upsells-grid">
              {modularServices[lang].map((service, idx) => (
                <div key={idx} className="upsell-card">
                  <div className="upsell-icon">
                    {iconMap[service.icon]}
                  </div>
                  <div className="upsell-content">
                    <h4>{service.name}</h4>
                    <p>{service.desc}</p>
                    <span className="upsell-price">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="why-us">
        <div className="container">
          <div className="why-us-content">
            <div className="why-us-text">
              <h2>{t.whyUsTitle}</h2>
              <p>{t.whyUsDesc1}</p>
              <p>{t.whyUsDesc2}</p>
              <br/>
              <button className="btn btn-outline" onClick={openWhatsApp}>
                {t.navContact} <ChevronRight size={18} />
              </button>
            </div>
            <div className="why-us-image">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tech Dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="impact">
        <div className="container">
          <h2>{t.impactTitle}</h2>
          <p>{t.impactDesc}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-container">
            <div className="contact-info">
              <h2>{t.contactTitle}</h2>
              <p>{t.contactDesc}</p>
              <div style={{ marginTop: '3rem' }}>
                <button className="btn btn-whatsapp" onClick={openWhatsApp} style={{ width: '100%', padding: '1.2rem' }}>
                  <MessageCircle size={24} style={{ marginRight: '10px' }} />
                  {t.btnContact}
                </button>
              </div>
            </div>
            <form className="contact-form" onSubmit={openWhatsApp}>
              <div className="form-group">
                <label>{t.formName}</label>
                <input type="text" className="form-control" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>{t.formEmail}</label>
                <input type="email" className="form-control" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>{t.formMessage}</label>
                <textarea className="form-control" placeholder="..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {t.formSubmit} <Send size={18} style={{ marginLeft: '5px' }} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="logo-container" style={{ justifyContent: 'center' }}>
            <img src="/logo.jpeg" alt="AFRA Logo" style={{ height: '30px', width: '30px', borderRadius: '50%', objectFit: 'cover' }} />
            <span className="logo-text">AFRA</span>
          </div>
          <div className="footer-links">
            <a href="#" className="nav-link">{t.navHome}</a>
            <a href="#services" className="nav-link">{t.navServices}</a>
            <a href="#pricing" className="nav-link">{t.navPricing}</a>
            <a href="#why-us" className="nav-link">{t.navWhyUs}</a>
          </div>
          <p style={{ fontSize: '0.85rem' }}>{t.footerText}</p>
          <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>{t.footerLinks}</p>
        </div>
      </footer>
    </>
  );
}

export default App;
