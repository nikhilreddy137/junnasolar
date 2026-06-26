import Hero from "@/components/Hero";
import SolutionsSection from "@/components/SolutionsSection";
import QuoteFormMultiStep from "@/components/QuoteFormMultiStep";
import Testimonials from "@/components/Testimonials";
import PlansSection from "@/components/PlansSection";
import TrustTiles from "@/components/TrustTiles";
import ProductsSection from "@/components/ProductsSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import FAQ from "@/components/FAQ";
import { useSEO } from "@/lib/seo";

export default function Home() {
  useSEO({
    title: "Junna Solar — Rooftop Solar for Homes, Businesses & Societies",
    description:
      "Junna Solar offers end-to-end rooftop solar EPC services in Hyderabad and across India. Free survey, PM Surya Ghar subsidy guidance, installation and AMC.",
    path: "/",
  });
  return (
    <>
      <Hero />
      <SolutionsSection />
      <QuoteFormMultiStep />
      <Testimonials />
      <PlansSection />
      <TrustTiles />
      <ProductsSection />
      <ProcessTimeline />
      <FAQ />
    </>
  );
}
