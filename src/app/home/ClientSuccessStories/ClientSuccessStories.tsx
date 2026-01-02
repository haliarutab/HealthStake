// components/ClientSuccessStories.tsx
import Image from "next/image";

export default function ClientSuccessStories() {
  const testimonials = [
    {
      name: "Raul Fernandez",
      date: "February 2023",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco...",
      avatar: "/images/clients/client1.png",
    },
    {
      name: "Carlos Rodriguez",
      date: "March 2023",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco...",
      avatar: "/images/clients/client2.png",
    },
    {
      name: "Martha Alonso",
      date: "April 2023",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco...",
      avatar: "/images/clients/client3.png",
    },
  ];

  return (
    <section className="bg-[#F8FBFF] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-heading">
            Client Success Stories
          </h2>
          <p className="mt-4 text-lg text-paragraph max-w-3xl mx-auto">
            Hear from thousands of users who are simplifying their management and enjoying better health with Health Stake.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                {/* Avatar */}
                <div className="relative w-16 h-16 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                {/* Name & Date */}
                <div>
                  <h4 className="font-bold text-heading text-lg">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-paragraph leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}