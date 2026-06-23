import { useLocation } from "react-router-dom";
export default function NotFound() {
  const location = useLocation();
<br>
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="absolute bottom-0 text-9xl md:text-[12rem] font-black text-gray-50 select-none pointer-events-none z-0">
        404
      </h1>
      <div className="relative z-10">
        <h1 className="text-xl md:text-2xl font-semibold mt-6">This page has not been generated</h1>
        <p className="mt-2 text-base text-gray-400 font-mono">{location.pathname}</p>
        <p className="mt-4 text-lg md:text-xl text-gray-500">Tell me more about this page, so I can generate it</p>
      </div>
    </div>
  );
}
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
