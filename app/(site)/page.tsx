import Hero from "@/components/Hero";
import LogosStrip from "@/components/LogosStrip";
import Services from "@/components/Services";
import Showcase from "@/components/showcase";
import Numbers from "@/components/Numbers";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function codentPage() {
  return (
    <>
      <Hero />
      <LogosStrip />
      <Services />
      <Showcase />
      <Numbers />
      <Process />
      <Testimonial />
      <FAQ />
      <CTA />
    </>
  );
}