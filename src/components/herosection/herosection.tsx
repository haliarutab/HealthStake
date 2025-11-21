// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">

        {/* GRID: LEFT TEXT + RIGHT IMAGE */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SECTION */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-semibold leading-tight text-heading">
              Your Care Partner in Digital <br />
              <span className="text-primary">Healthcare.</span>
            </h1>

            <p className="mt-6 text-paragraph text-lg max-w-xl">
              Health Stake gives you the independence to set your own terms,
              manage your time without administrative burden, and expand your
              patient reach globally.
            </p>

            <Button
              asChild
              className="mt-8 bg-primary hover:bg-primaryDark text-white rounded-full px-8 py-6 text-lg"
            >
              <Link href="#">Get Started</Link>
            </Button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">

              <Image
                src="/images/hero-section.png"
                alt="Doctors"
                width={530}
                height={530}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>

        {/* STATS  */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <h2 className="text-3xl font-bold text-primary">10,000+</h2>
            <p className="text-muted mt-2 text-sm">
              Successful Consultations
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-primary">2,500+</h2>
            <p className="text-muted mt-2 text-sm">
              Healthcare Professionals
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-primary">98%</h2>
            <p className="text-muted mt-2 text-sm">
              Patient Satisfaction
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-primary">10+</h2>
            <p className="text-muted mt-2 text-sm">
              Years Of Experience
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
