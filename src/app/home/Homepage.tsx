"use client";

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/herosection/herosection";
import WhyChooseUs from "@/components/whychooseus/whychooseus";
import HowPlatformWorks from "@/components/HowPlatformWorks/howplatformworks";
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <HowPlatformWorks />
      {/* Add more sections later */}
    </div>
  );
}
