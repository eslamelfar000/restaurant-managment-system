import { FeaturesSection } from "@/modules/Main/FeaturesSection";
import { HeroSection } from "@/modules/Main/HeroSection";
import { PricingSection } from "@/modules/Main/PricingSection";
import { CTASection } from "@/modules/Main/CTASection";
import { LandingFooter } from "@/components/landing/footer/LandingFooter";
import { motion } from "framer-motion";

const FloatingBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 blur-[160px] rounded-full"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[160px] rounded-full"
      />
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="flex flex-col relative overflow-hidden bg-background">
      <FloatingBlobs />
      <div className="relative z-10 flex flex-col">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
};

export default LandingPage;
