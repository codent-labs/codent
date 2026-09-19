import Hero from "@/components/Hero";
import LogosStrip from "@/components/LogosStrip";
import Services from "@/components/Services";
import Showcase from "@/components/showcase";
import Numbers from "@/components/Numbers";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { TextReveal } from "@/components/ui/text-reveal";

export default function codentPage() {
  return (
    <>
      <Hero />
      <TextReveal className="!h-[130vh]">
        We turn fuzzy bets into shipped work that earns its keep.
      </TextReveal>
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