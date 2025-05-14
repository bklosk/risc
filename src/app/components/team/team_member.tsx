"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github } from "lucide-react";

interface TeamMemberProps {
  src: string;
  alt: string;
  name: string;
  role?: string;
  bio?: string;
  width?: number;
  height?: number;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function TeamMember({
  src,
  alt,
  name,
  role = "",
  bio = "",
  width = 160,
  githubUrl,
  linkedinUrl,
}: TeamMemberProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="relative">
        {/* Compact view */}
        <motion.div
          className="flex flex-col items-center"
          style={{
            cursor: "pointer",
            opacity: isExpanded ? 0 : 1,
            pointerEvents: isExpanded ? "none" : "auto",
          }}
          onClick={toggleExpanded}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="overflow-hidden rounded-full"
            style={{
              width: `${width}px`,
              height: `${width}px`, // Using width for height to ensure perfect circle
              position: "relative",
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill={true}
              sizes={`${width}px`}
              className="object-cover"
              priority
            />
          </div>
          <h3 className="text-lg font-medium mt-2 text-center">{name}</h3>
          {role && <p className="text-gray-600 text-center">{role}</p>}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleExpanded}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-8 rounded-lg max-w-2xl w-full m-4 shadow-xl pointer-events-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                }}
                exit={{
                  y: 20,
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: { delay: 0.1 },
                    }}
                  >
                    <div
                      className="overflow-hidden rounded-full"
                      style={{
                        width: `${width}px`,
                        height: `${width}px`, // Using width for height to ensure perfect circle
                        position: "relative",
                      }}
                    >
                      <Image
                        src={src}
                        alt={alt}
                        fill={true}
                        sizes={`${width}px`}
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="flex flex-col justify-center w-full"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: 0.2,
                        duration: 0.3,
                      },
                    }}
                  >
                    <h2 className="text-2xl font-bold text-center">{name}</h2>
                    {role && (
                      <p className="text-gray-600 mb-4 text-center">{role}</p>
                    )}
                    {bio && (
                      <motion.p
                        className="text-gray-800 text-center"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { delay: 0.3 },
                        }}
                      >
                        {bio}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
                <motion.div
                  className="mt-6 flex justify-between"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4 },
                  }}
                >
                  {/* Left side - Close button */}
                  <motion.button
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    onClick={toggleExpanded}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>

                  {/* Right side - Group of action buttons */}
                  <div className="flex gap-3">
                    {linkedinUrl && (
                      <motion.button
                        className="px-4 py-2 bg-[#EC4d14] text-white rounded hover:bg-[rgb(255,110,57)] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          linkedinUrl && window.open(linkedinUrl, "_blank")
                        }
                      >
                        <Linkedin />
                      </motion.button>
                    )}
                    {githubUrl && (
                      <motion.button
                        className="px-4 py-2 bg-[#EC4d14] text-white rounded hover:bg-[rgb(255,110,57)] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(githubUrl, "_blank")}
                      >
                        <Github />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
