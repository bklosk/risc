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
    carousel: "/images/carousel/fi.png",
  },
  {
    id: 2,
    title: "The Levitt Lab",
    description: "Daring to reimagine high school",
    image: "/images/work/TLL.png",
    color: "#071535", // Light green
    // carousel: "/images/carousel/TLL.png",
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

export default function WorkCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const offsetWidth = carouselRef.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="w-full overflow-hidden py-8">
      <motion.div
        ref={carouselRef}
        className="cursor-grab overflow-hidden"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="grid grid-rows-2 grid-flow-col gap-6 w-max"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.1}
        >
          {carouselItems.map((item) => (
            <motion.div
              key={item.id}
              className="min-w-[320px] h-[320px] relative flex-shrink-0 rounded-lg overflow-hidden group"
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
              <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-[15]" />

              {/* Title box always visible - higher z-index ensures it's above the overlay */}
              <div className="absolute top-3 left-3 px-3 py-1 z-20">
                <h3 className=" text-2xl text-white font-['albert_sans'] font-medium">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
