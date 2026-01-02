"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Activity } from "lucide-react"; 
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Branding Icon */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
              <Activity className="w-8 h-8" />
              <span>HealthStake</span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              href="/find-doctors"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Find Doctors
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              About us
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              Contact us
            </Link>
          </div>

          {/* Right side - Register button + For Nurse Link */}
          <div className="hidden md:flex items-center space-x-6">
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-11 transition-all"
            >
              <Link href="/register">Register</Link>
            </Button>

            {/* Modified: Now a functional link redirecting to Login */}
            <Link 
              href="/login" 
              className="text-gray-700 font-semibold hover:text-blue-600 transition-colors"
            >
              For Nurse
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slides down */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-2 pt-4 pb-6 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 font-medium transition-colors rounded-xl hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 font-medium transition-colors rounded-xl hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 font-medium transition-colors rounded-xl hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About us
              </Link>

              {/* Mobile CTA Section */}
              <div className="pt-4 border-t border-gray-100 mt-4 px-4 space-y-4">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6"
                >
                  <Link href="/register">Register</Link>
                </Button>

                <div className="text-center">
                  <Link 
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-700 font-bold hover:text-blue-600"
                  >
                    For Nurse (Login)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}