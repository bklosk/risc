"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Tracker() {
  // Track the active section
  const [activeSection, setActiveSection] = useState("intro");

  // Define sections and their corresponding IDs
  const sections = [
    { id: "intro", label: "Intro" },
    { id: "work", label: "Work" },
    { id: "team", label: "Team" },
    { id: "contact", label: "Contact" },
  ];

  // Effect to track scrolling and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Lower threshold to detect intro section

      // Special case for top of page / intro section
      if (scrollPosition < 200) {
        setActiveSection("intro");
        return;
      }

      // Find which section is currently in view
      let foundActive = false;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            foundActive = true;
            break;
          }
        }
      }

      // If no section is found active and we're at the top, set intro active
      if (!foundActive && window.scrollY === 0) {
        setActiveSection("intro");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Make sure to check the initial position when component mounts
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to the selected section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="fixed right-4 top-1/4 transform -translate-y-1/2 h-[500px] w-[40px] flex flex-col justify-center items-center z-50"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="h-full flex flex-col justify-between items-center relative">
        {/* Vertical line connecting the bullets */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-gray-300"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            className="relative z-10 cursor-pointer group"
            onClick={() => scrollToSection(section.id)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
          >
            {/* Bullet point */}
            <motion.div
              className={`w-4 h-4 rounded-full border-2 border-solid border-gray-400 flex items-center justify-center`}
              animate={{
                scale: activeSection === section.id ? 1.3 : 1,
                borderColor:
                  activeSection === section.id ? "#FC4512" : "#9CA3AF",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{
                  backgroundColor:
                    activeSection === section.id ? "#FC4512" : "transparent",
                }}
              />
            </motion.div>

            {/* Section label */}
            <motion.div
              className="absolute right-8 top-0 transform -translate-y-1/4 whitespace-nowrap opacity-0 group-hover:opacity-100"
              initial={{ x: 10, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-sm font-medium py-1 px-2 bg-white/80 rounded shadow-sm">
                {section.label}
              </span>
            </motion.div>

            {/* Active indicator */}
            {activeSection === section.id && (
              <motion.div
                className="absolute right-8 top-0 transform -translate-y-1/4 whitespace-nowrap"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-medium text-[#FC4512]">
                  {section.label}
                </span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
