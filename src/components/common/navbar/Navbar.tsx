// components/Navbar.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // lucide icons 
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              LOGO
            </Link>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center space-x-10">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/find-doctors"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Find Doctors
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Contact us
            </Link>
          </div>

          {/* Right side - Register button + For Nurse (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              asChild
              className="bg-primary hover:bg-primaryDark text-white rounded-full px-6"
            >
              <Link href="/register">Register</Link>
            </Button>

            <span className="text-gray-700 font-medium hidden lg:block">
              For Nurse
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slides down */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-4 pb-6 space-y-4">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-600 hover:text-primary font-medium transition-colors rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block px-4 py-3 text-gray-600 hover:text-primary font-medium transition-colors rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/find-doctors"
                className="block px-4 py-3 text-gray-600 hover:text-primary font-medium transition-colors rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find Doctors
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-600 hover:text-primary font-medium transition-colors rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-600 hover:text-primary font-medium transition-colors rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact us
              </Link>

              {/* Mobile CTA Section */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primaryDark text-white rounded-full"
                >
                  <Link href="/register">Register</Link>
                </Button>

                <div className="mt-4 text-center">
                  <span className="text-gray-700 font-medium">For Nurse</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}