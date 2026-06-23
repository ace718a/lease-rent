import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesShowcase from "./components/ServicesShowcase";
import WhyMoapick from "./components/WhyMoapick";
import ServiceCTA from "./components/ServiceCTA";
import InfoNewsPreview from "./components/InfoNewsPreview";
import FAQ from "./components/FAQ";
import CTABand from "./components/CTABand";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen bg-background-50 text-foreground-900 font-body">
      <Header />
      <main>
        <Hero />
        <ServicesShowcase />
        <WhyMoapick />
        <ServiceCTA />
        <InfoNewsPreview />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
