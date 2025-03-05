"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Sample data structure for the carousel items
const carouselItems = [
  {
    id: 1,
    title: "Foster Insights",
    description: "Improving child welfare with data science",
    image: "/images/work/fi.png",
    color: "#1f3e51", // Light blue
  },
  {
    id: 2,
    title: "The Levitt Lab",
    description: "Daring to reimagine high school",
    image: "/images/work/TLL.png",
    color: "#071535", // Light green
  },
  {
    id: 3,
    title: "Project Donor",
    description: "Helping kidney donors reach eligibility",
    image: "/images/work/pd_cream.png",
    color: "#cd7029", // Light orange
  },
  {
    id: 4,
    title: "Decision Aid",
    description: "Minimizing unnecessary law enforcement encounters",
    image: "/images/work/da.png",
    color: "#000000", // Light purple
  },
  {
    id: 5,
    title: "Data Science 4 Everyone",
    description: "Modernizing our outdated math curriculum",
    image: "/images/work/ds4e.png",
    color: "#fffff0", // Light teal
  },
  {
    id: 6,
    title: "Community Notes",
    description: "Fighting misinformation on social media",
    image: "/images/work/cn.png",
    color: "#075985", // Light red
  },
];

const WorkCarousel = () => {
  // Track the currently hovered card at the parent level
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  // Reference for the carousel container
  const containerRef = useRef<HTMLDivElement>(null);
  const mainControls = useAnimation();

  // Add scroll-based animation
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [240, 275], [0, -100], { clamp: true });

  // Start animation after a 4-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      mainControls.start("visible");
    }, 4500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [mainControls]);

  return (
    <div className="py-16 mt-20 px-4 overflow-visible">
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={mainControls}
        style={{ y }}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }}
        className="max-w-7xl mx-auto"
      >
        {/* Background rounded box */}
        <motion.div className="bg-gray-100 rounded-3xl p-8 md:p-12 relative z-0">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#ec4d14] mb-8 text-center">
            What we do
          </h2>

          {/* Carousel container with hidden scrollbar */}
          <div
            className="flex overflow-x-auto overflow-y-visible pb-8 pt-12 px-4 space-x-6"
            style={{
              scrollbarWidth: "none" /* Firefox */,
              msOverflowStyle: "none" /* IE and Edge */,
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Hide webkit scrollbar */}
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {carouselItems.map((item) => (
              <CarouselCard
                key={item.id}
                item={item}
                isHovered={hoveredCardId === item.id}
                onHover={(isHovering) => {
                  setHoveredCardId(isHovering ? item.id : null);
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface CarouselItemProps {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface CarouselCardProps {
  item: CarouselItemProps;
  isHovered: boolean;
  onHover: (isHovering: boolean) => void;
}

const CarouselCard = ({ item, isHovered, onHover }: CarouselCardProps) => {
  // Set a specific expanded height for smooth animation instead of "auto"
  const expandedHeight = "280px"; // Adjust based on your content
  const collapsedHeight = "220px";

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        zIndex: 10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => onHover(true)}
      onHoverEnd={() => onHover(false)}
      className="flex-shrink-0 w-72 bg-white rounded-xl shadow-lg relative z-10 overflow-visible"
      style={{ marginTop: "20px" }}
      animate={{
        height: isHovered ? expandedHeight : collapsedHeight,
        transition: { duration: 0.35, ease: "easeInOut" },
      }}
      id="work"
    >
      {/* Offset image with drop shadow - now with visible top overflow */}
      <div className="relative left-1/2 transform -translate-x-1/2 w-[85%] h-48 -mt-10">
        <motion.div
          className="w-full h-full relative rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden"
          animate={{
            y: isHovered ? -8 : 0,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
            delay: isHovered ? 0 : 0.1,
          }}
          style={{ backgroundColor: item.color || "#ffffff" }}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain p-2 rounded-lg"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </motion.div>
      </div>

      {/* Title always visible below image */}
      <div className="px-5 pt-6">
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
      </div>

      {/* Description that appears only when this specific card is hovered */}
      <motion.div
        className="px-5 pb-5"
        variants={{
          hidden: {
            height: 0,
            opacity: 0,
            marginTop: -8,
          },
          visible: {
            height: "auto",
            opacity: 1,
            marginTop: -4,
          },
        }}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}
        transition={{
          height: { duration: 0.35, ease: "easeOut" },
          opacity: { duration: 0.25, delay: isHovered ? 0.1 : 0 },
        }}
      >
        <p className="text-gray-600">{item.description}</p>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{
            duration: 0.25,
            delay: isHovered ? 0.15 : 0,
            ease: "easeOut",
          }}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WorkCarousel;
