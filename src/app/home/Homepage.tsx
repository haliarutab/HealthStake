"use client";

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/herosection/herosection";
import WhyChooseUs from "@/app/home/whychooseus/whychooseus";
import HowPlatformWorks from "@/app/home/HowPlatformWorks/howplatformworks";
import ClientSuccessStories from "./ClientSuccessStories/ClientSuccessStories";
import SubscribeSection from "./SubscribeSection/SubscribeSection";
import DownloadApp from "./DownloadApp/DownloadApp";
import Footer from "@/components/footer/Footer";
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <HowPlatformWorks />
      <ClientSuccessStories />
      <SubscribeSection />
      <DownloadApp />
      <Footer />
      {/* Add more sections later */}
    </div>
  );
}
