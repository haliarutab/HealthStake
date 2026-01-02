// components/WhyChooseUs.tsx
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WhyChooseUs() {
  const features = [
    {
      title: "AI-Powered Personalization",
      description:
        "Our engine learns your unique body response, delivering predictive glucose insights, custom meal recommendations, and automated medication reminders based on your real-time data and daily habits.",
      link: "#",
    },
    {
      title: "Built by Specialists, For You",
      description:
        "Developed in partnership with certified endocrinologists and dietitians, our clinical resources and educational content are always up-to-date and validated for accurate, safe management.",
      link: "#",
    },
    {
      title: "Integrated Care, Simplified",
      description:
        "Seamlessly connect your doctor, pharmacy, and continuous glucose monitor (CGM). Manage appointments, share reports securely, and reorder prescriptions without ever leaving the app.",
      link: "#",
    },
  ];

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Top curved background */}
      <div className="absolute inset-x-0 top-0 h-16 bg-white rounded-b-[48px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        {/* Header */}
        <div className="text-center text-white mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            We provide the secure, intuitive ecosystem you need to break free from administrative complexity,
            efficiently connect with a wider patient base, and confidently scale your professional impact.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-heading mb-4">
                {feature.title}
              </h3>
              <p className="text-paragraph text-base lg:text-lg leading-relaxed mb-8">
                {feature.description}
              </p>

              <Link
                href={feature.link}
                className="inline-flex items-center text-primary font-semibold text-lg group-hover:text-primaryDark transition-colors"
              >
                Read More
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom curved edge */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-white rounded-t-[48px]"></div>


      
    </section>
  );
}