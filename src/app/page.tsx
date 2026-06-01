import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ServicesSection } from "@/components/site/ServicesSection";
import { TiersSection } from "@/components/site/TiersSection";
import { DeliverySection } from "@/components/site/DeliverySection";
import { EcosystemSection } from "@/components/site/EcosystemSection";
import { FeedbackSection } from "@/components/site/FeedbackSection";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <TiersSection />
        <DeliverySection />
        <EcosystemSection />
        <FeedbackSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
