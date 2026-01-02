// components/HowItWorks.tsx
import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Create Your Profile",
      description:
        "Sign up securely and complete your medical history and insurance details. This comprehensive profile is essential for our system to accurately understand your needs and prepare for your visit.",
    },
    {
      number: "2",
      title: "Choose Your Service",
      description:
        "Select the specific consultation you require. Our smart matching system uses your input to instantly pair you with the most qualified and available specialist.",
    },
    {
      number: "3",
      title: "Meet Your Doctor",
      description:
        "Join your doctor for a secure, in-app virtual consultation. Following the visit, you will immediately receive your personalized treatment plan, prescription details, and complete summary for future reference.",
    },
  ];

  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading">
            How our platform works
          </h2>
          <p className="mt-4 text-lg text-paragraph max-w-4xl mx-auto">
            We’ve designed a three-step process to take the stress out of daily
            health management and put control back in your hands.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE — STEPS */}
          <div className="space-y-14">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                {/* Blue Number Circle */}
                <div
                  className="shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl lg:text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform"
                >
                  {step.number}
                </div>

                {/* Step Content */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-paragraph text-base md:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE — DOCTOR IMAGE */}
          <div className="relative flex justify-center">
            <div className="relative p-4 rounded-4xl border border-[#CFE4FF] bg-white">
              {/* Doctor Image */}
              <Image
                src="/images/doctor.png"
                alt="Doctor"
                width={500}
                height={620}
                className="rounded-[28px] object-cover"
                priority
              />
            </div>

            {/* Badge */}
            <div
              className="
                absolute bottom-6 left-1/2 -translate-x-1/2
                md:left-auto md:translate-x-0 md:right-6
                bg-white 
                rounded-full 
                px-4 md:px-6 
                py-2.5 
                shadow-[0_4px_20px_rgba(0,0,0,0.08)]
                border border-[#E6EEF6]
                flex items-center gap-2
              "
            >
              {/* Star Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#007BFF"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848 1.416 8.268L12 19.771l-7.416 4.093L6 15.596 0 9.748l8.332-1.593z" />
              </svg>

              {/* Text */}
              <span className="text-primary font-medium text-sm md:text-base">
                Best Certified Team of Specialists
              </span>
            </div>
          </div>
        </div>

        {/*  Book Consultation Banner */}
        <div className="mt-20 relative overflow-hidden rounded-3xl bg-linear-to-r shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src="/images/Rectangle 18.png" 
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-10 py-12 lg:px-20 lg:py-16 text-white">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Scale Your Care,
                <br />
                Effortlessly.
              </h3>
            </div>

            <a
              href="#book" // change to your booking link/route
              className="inline-flex items-center justify-center px-10 py-5 
                         text-lg md:text-xl font-semibold text-primary bg-white 
                         rounded-full shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:scale-105"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}