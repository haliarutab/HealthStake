// components/DownloadApp.tsx
import Image from "next/image";

export default function DownloadApp() {
  return (
    <section className="bg-[#F8FBFF] py-10 lg:py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + Buttons */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-heading mb-6">
              Download the app
            </h2>
            <p className="text-lg text-paragraph max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Get Health Stake on your phone for instant scheduling, secure consultations, 
              and access to your records anytime, anywhere.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap sm:flex-row gap-6 justify-center lg:justify-start mt-10">
              <a
                href="#"
                className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition shadow-lg"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.5 2.45-2.1 4.15-2.08 1.33.03 2.59.91 3.42.91.84 0 2.4-.88 3.95-.76 1.65.12 3.4 1.08 4.32 2.69c-3.74 2.27-2.93 7.28-.91 9.28.64.8 1.4 1.65 2.4 2.27z"/>
                  <path d="M14.44 4.44c-.7-.84-1.68-1.33-2.72-1.33-.1 1.48.44 2.96 1.24 3.95.76.94 2.08 1.6 3.3 1.55-.14-1.72-.74-3.42-1.82-4.17z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-xl font-semibold">App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition shadow-lg"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.61 2.61c-.92.93-1.9 3.64-.8 6.44l7.82 13.5c.66 1.14 2.28.98 2.76-.2l1.92-6.8 6.8-1.92c1.18-.48 1.34-2.1.2-2.76L8.05 3.41c-2.8-1.1-5.51-.12-6.44.8z"/>
                  <path d="M16.5 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#00D95F"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-xl font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Floating Phones */}
          <div className="relative h-[250px] sm:h-[400px] lg:h-[650px]">

            <Image
              src="/images/download.png"
              alt="Health Stake App on phones"
              fill
              className="object-contain object-center drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}