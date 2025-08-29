"use client";

import Link from "next/link";
import {
  ChatBubbleOvalLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Logo / Brand */}
          <div className="text-white text-2xl font-bold">
            MyBrand
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/services" className="hover:text-white transition">
              Services
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>

          {/* Contact / Social Icons */}
          <div className="flex gap-4">
            <Link href="mailto:info@mybrand.com" className="hover:text-white transition">
              <EnvelopeIcon className="w-6 h-6" />
            </Link>
            <Link href="tel:+1234567890" className="hover:text-white transition">
              <PhoneIcon className="w-6 h-6" />
            </Link>
            <Link href="https://mybrand.com" target="_blank" className="hover:text-white transition">
              <GlobeAltIcon className="w-6 h-6" />
            </Link>
            <Link href="/chat" className="hover:text-white transition">
              <ChatBubbleOvalLeftIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
