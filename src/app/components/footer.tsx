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
    <footer className="border-t mt-20 mx-48 border-gray-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            <div className="relative h-10 w-24">
              {/* Replace with your first logo */}
              <div className="bg-gray-200 h-10 w-24 flex items-center justify-center text-sm text-gray-500">
                Logo 1
              </div>
              {/* Uncomment when you have your logo */}
            </div>

            <div className="relative h-10 w-24">
              {/* Replace with your second logo */}
              <div className="bg-gray-200 h-10 w-24 flex items-center justify-center text-sm text-gray-500">
                Logo 2
              </div>
              {/* Uncomment when you have your logo */}
            </div>
          </div>

          {/* Email Subscription Form */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-medium mb-4">
              Subscribe to our newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex">
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
              We'll never share your email with anyone else.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
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
