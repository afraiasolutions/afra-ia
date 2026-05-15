import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Pricing } from "@/components/site/Pricing";
import { Results } from "@/components/site/Results";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Booking } from "@/components/site/Booking";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";
import { BookingProvider } from "@/lib/booking-context";
import { BookingDialog } from "@/components/site/BookingDialog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AFRA IA Marketing — AI-Powered Growth Systems" },
      { name: "description", content: "Turn your business into a client acquisition machine with AI. Content, funnels, automation, paid ads and neuro-marketing for ambitious brands." },
      { property: "og:title", content: "AFRA IA Marketing — AI-Powered Growth Systems" },
      { property: "og:description", content: "AI, content, funnels, automation and paid ads to scale your brand faster and smarter." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <BookingProvider>
        <div className="relative">
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Pricing />
            <Results />
            <WhyUs />
            <Testimonials />
            <Booking />
            <FinalCta />
          </main>
          <Footer />
          <BookingDialog />
        </div>
      </BookingProvider>
    </I18nProvider>
  );
}
