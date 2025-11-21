// components/SubscribeSection.tsx

import { useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here (e.g., send to API)
    console.log("Subscribing email:", email);
  };

  return (
    <section className="bg-[#007BFF] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text */}
          <div className="text-white text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl xl:text-5xl font-bold leading-tight">
              Subscribe Us To
              <br />
              Get More Updates
            </h2>
          </div>

          {/* Right: Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md lg:max-w-lg"
          >
            <div className="relative flex items-center bg-white rounded-full shadow-2xl overflow-hidden h-16 lg:h-20">
              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="w-full px-8 py-4 text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none text-lg"
              />

              {/* Subscribe Button */}
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-[#007BFF] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition whitespace-nowrap text-lg shadow-lg"
              >
                SUBSCRIBE
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}