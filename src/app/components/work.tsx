"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

// Sample data structure for the carousel items
const carouselItems = [
  {
    id: 1,
    title: "Foster Insights",
    description: "Using data to improve child welfare.",
    color: "#1f3e51", // Light blue
    status: "Active",
    carousel: "/images/carousel/fi.jpg",
  },
  {
    id: 2,
    title: "The Levitt Lab",
    description: "Reimagining high school.",
    color: "#071535", // Light green
    carousel: "/images/carousel/TLL.jpeg",
    status: "Active",
  },
  {
    id: 3,
    title: "Project Donor",
    description: "Helping kidney donors reach eligibility.",
    color: "#cd7029", // Light orange
    carousel: "/images/carousel/pd.jpeg",
    status: "Active",
  },
  {
    id: 5,
    title: "Data Science 4 Everyone",
    description: "Modernizing our outdated math curriculum",
    color: "#fffff0", // Light teal
    status: "Graduated",
    carousel: "/images/carousel/ds4e.png",
  },
  {
    id: 4,
    title: "Decision Aid",
    description: "Minimizing unnecessary law enforcement encounters.",
    color: "#000000", // Light purple
    status: "Closed",
    carousel: "/images/carousel/da.png",
  },

  {
    id: 7,
    title: "Canopy",
    description: "Peer mentorship at scale.",
    color: "#d9f99d", // Light blue
    carousel: "/images/carousel/canopy.svg",
    status: "Closed",
  },

  {
    id: 6,
    title: "Community Notes",
    description: "Fighting misinformation on social media",
    color: "#075985", // Light red
    carousel: "/images/carousel/cn.png",
    status: "Graduated",
  },
  {
    id: 9,
    title: "Community Utility",
    description: "Mutual aid for utility bills.",
    color: "#1f3e51", // Light blue
    carousel: "/images/carousel/cu.jpeg",
    status: "Closed",
    link: "https://communityutility.org",
  },
  {
    id: 10,
    title: "Vaccine Lotteries",
    description: "Using behavioral economics to end outbreaks.",
    color: "#1f3e51", // Light blue
    carousel: "/images/carousel/vac.jpg",
    status: "Closed",
  },
  {
    id: 11,
    title: "VR for Social Good",
    description: "1:1 instruction, accessible and available for everyone.",
    color: "#1f3e51", // Light blue
    carousel: "/images/carousel/vr.jpg",
    status: "Closed",
  },
];

export default function WorkCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerCarouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (innerCarouselRef.current && carouselRef.current) {
        const scrollWidth = innerCarouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        const calculatedWidth = Math.max(0, scrollWidth - clientWidth);
        console.log("Carousel width calculated:", {
          scrollWidth,
          clientWidth,
          calculatedWidth,
        });
        setWidth(calculatedWidth);
      }
    };

    // Ensure calculations happen after DOM is fully rendered and images are loaded
    const calculateAfterRender = () => {
      updateWidth();

      // Images might still be loading, so recalculate after a delay
      setTimeout(updateWidth, 500);
      setTimeout(updateWidth, 1500); // Additional check after more time
    };

    calculateAfterRender();

    // Use MutationObserver to detect changes to the DOM
    const observer = new MutationObserver(calculateAfterRender);
    if (carouselRef.current) {
      observer.observe(carouselRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }

    // Use ResizeObserver for more reliable size detection
    const resizeObserver = new ResizeObserver(updateWidth);
    if (carouselRef.current) {
      resizeObserver.observe(carouselRef.current);
    }

    // Also listen for window resize and orientation change
    window.addEventListener("resize", updateWidth);
    window.addEventListener("orientationchange", updateWidth);

    return () => {
      observer.disconnect();
      if (carouselRef.current) resizeObserver.unobserve(carouselRef.current);
      window.removeEventListener("resize", updateWidth);
      window.removeEventListener("orientationchange", updateWidth);
    };
  }, []);

  return (
    <motion.div
      id="work"
      className="w-full overflow-hidden mt-8 py-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0 }}
    >
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-4xl md:text-5xl mx-auto font-albert-sans font-extrabold text-[#FC4512] md:ml-8 mb-4">
          Some of our projects
        </h1>
      </div>

      {/* Carousel container with fallback scrolling */}
      <div ref={carouselRef} className="overflow-hidden mx-4 md:mx-8 pb-4">
        <motion.div
          ref={innerCarouselRef}
          className={`grid grid-rows-1 md:grid-rows-2 grid-flow-col gap-6 w-max mx-auto`}
          drag="x"
          dragConstraints={{ right: 100, left: -width - 100 }}
          dragTransition={{
            bounceStiffness: 300,
            bounceDamping: 30,
          }}
          dragElastic={0.2}
          dragMomentum={true}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {carouselItems.map((item) => (
            <motion.div
              key={item.id}
              className="min-w-[280px] md:min-w-[320px] h-[280px] md:h-[320px] relative flex-shrink-0 rounded-lg overflow-hidden group"
              style={{
                backgroundColor: item.color,
                backgroundImage: item.carousel
                  ? `url(${item.carousel})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Linear gradient overlay from top - shortened height */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.53) 0%, rgba(0,0,0,0.53) 0%, transparent 30%)",
                }}
              />

              {/* Semi-transparent grey overlay that fades in on hover */}
              <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-[1]">
                <div className="flex items-center h-full">
                  <p className="text-white text-xl pl-6 font-albert-sans max-w-[80%]">
                    {item.description}
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 z-20">
                  <h3 className=" text-lg text-white font-['albert_sans'] font-medium">
                    {item.status}
                  </h3>
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 z-20">
                  <ArrowRight className="text-white" size={20} />
                </div>
              </motion.div>

              {/* Title box always visible - higher z-index ensures it's above the overlay */}
              <div className="absolute top-3 left-3 px-3 py-1 z-20">
                <h3 className=" text-2xl text-white font-['albert_sans'] font-medium">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
