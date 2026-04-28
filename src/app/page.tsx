import HeroSection from "@/components/home/HeroSection";
import BrandGrid from "@/components/home/BrandGrid";
import ServicesGrid from "@/components/home/ServicesGrid";
import BodyStyleSection from "@/components/home/BodyStyleSection";
import FeaturedCars from "@/components/home/FeaturedCars";
import StatsCounter from "@/components/home/StatsCounter";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandGrid />
      <ServicesGrid />
      <BodyStyleSection />
      <FeaturedCars />
      <StatsCounter />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
