"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t mt-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-48 border-gray-200 bg-white py-12 snap-section">
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
