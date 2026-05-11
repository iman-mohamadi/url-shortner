import { HeroSection } from "@/components/hero";
import { FeatureSection } from "@/components/feature-section";
import { PricingSection } from "@/components/pricing-section";
import { CallToAction } from "@/components/cta";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeatureSection />
      <PricingSection />
      <CallToAction />
    </div>
  );
}
