"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the email submission here
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="border-t mt-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-48 border-gray-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="flex flex-row items-center space-y-4 sm:space-y-0 space-x-8">
            <div className="relative h-16 sm:h-24 w-16 sm:w-24">
              <Image
                src="/images/footer_logo.svg"
                alt="Footer Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 16vw, (max-width: 768px) 24vw, 10vw"
                priority
              />
            </div>

            <div className="relative h-16 sm:h-24 w-32 sm:w-48">
              <Image
                src="/images/uchicago.png"
                alt="Footer Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 32vw, (max-width: 768px) 24vw, 10vw"
                priority
              />
            </div>
          </div>

          {/* Email Subscription Form */}
          <div className="mt-8 md:mt-0 w-full md:w-auto">
            <h3 className="text-sm font-medium mb-4">
              Subscribe to our newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex max-w-md">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-[#EC4D14] focus:border-[#EC4D14] sm:text-sm"
                  placeholder="Your email address"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-[#EC4D14] hover:bg-[#D83A06] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EC4D14]"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-500">
              We&apos;ll never share your email with anyone else.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0 text-center sm:text-left">
            © {new Date().getFullYear()} Center for RISC. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
