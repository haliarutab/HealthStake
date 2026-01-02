// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Logo & Tagline */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-4xl font-bold text-primary mb-2">LOGO</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link href="#" className="hover:text-primary transition">Getting Started</Link></li>
              <li><Link href="#" className="hover:text-primary transition">FAQS</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Help Articles</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Find a Doctor</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link href="#" className="hover:text-primary transition">Booking appointments</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Online consultations</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Register a Nurse</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Register as Doctor</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><Link href="#" className="hover:text-primary transition">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Refund policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Icons */}
          <div className="flex gap-6">
            <a href="#" aria-label="Facebook">
              <Image priority={false} src="/images/icons/facebook.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="#" aria-label="Instagram">
              <Image priority={false} src="/images/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Image priority={false} src="/images/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </a>
            <a href="#" aria-label="Youtube">
              <Image priority={false} src="/images/icons/youtube.svg" alt="Youtube" width={24} height={24} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            Healthstake 2025 © All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}