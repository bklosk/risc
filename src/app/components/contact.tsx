"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Mail, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ContactFormProps {
  imageSrc?: string;
}

const Contact: React.FC<ContactFormProps> = ({
  imageSrc = "/images/contact.jpg",
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // Reference for the container element to detect when it's in view
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const subject = encodeURIComponent("RISC website contact");
      const body = encodeURIComponent(`From: ${email}\n\n${message}`);
      const mailtoUrl = `mailto:centerforrisc@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -75 }}
      animate={{ opacity: isInView ? 1 : 0, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 60,
        damping: 12,
        mass: 1,
      }}
      className="rounded-2xl shadow-lg overflow-hidden max-w-5xl mx-auto bg-white flex flex-col md:flex-row"
      id="contact"
    >
      {/* Left side - Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto relative">
        <Image
          src={imageSrc}
          alt="Reach out to us"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 p-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have an idea we could pursue? Want to partner with us?
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-700 text-sm font-medium mb-2 flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec4d14]"
                placeholder="your@email.com"
                required
                disabled={isPending}
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-700 text-sm font-medium mb-2 flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Message</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ec4d14]"
                rows={5}
                placeholder="How do you want to change the world?"
                required
                disabled={isPending}
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-[#ec4d14] text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              disabled={isPending}
            >
              {isPending ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
