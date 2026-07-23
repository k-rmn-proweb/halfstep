import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Process />
      <Testimonials />
    </>
  );
}
