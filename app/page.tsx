import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogosStrip from "@/components/LogosStrip";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Numbers from "@/components/Numbers";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function codentPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <LogosStrip />
        <Services />
        <Showcase />
        <Numbers />
        <Process />
        <Testimonial />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
