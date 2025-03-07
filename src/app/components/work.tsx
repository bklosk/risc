"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
// import Image from "next/image";

// Sample data structure for the carousel items
const carouselItems = [
  {
    id: 1,
    title: "Foster Insights",
    description: "Using data to improve child welfare.",
    color: "#1f3e51", // Light blue
    status: "Active",
    carousel: "/images/carousel/fi.webp",
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
    id: 4,
    title: "Decision Aid",
    description: "Minimizing unnecessary law enforcement encounters.",
    color: "#000000", // Light purple
    status: "Closed",
    carousel: "/images/carousel/da.png",
  },
  {
    id: 5,
    title: "Data Science 4 Everyone",
    description: "Modernizing our outdated math curriculum",
    color: "#fffff0", // Light teal
    status: "Graduated",
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
    id: 7,
    title: "Canopy",
    description: "Peer mentorship at scale.",
    color: "#d9f99d", // Light blue
    carousel: "/images/carousel/canopy.svg",
    status: "Closed",
  },
  {
    id: 8,
    title: "Blueprint",
    description: "Online math tutoring for everyone.",
    color: "#1f3e51", // Light blue
    carousel: "/images/carousel/blueprint.png",
    status: "Closed",
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
    <div id="work" className="w-full overflow-hidden mt-8 py-8">
      <h1 className="text-5xl mx-auto font-albert-sans font-extrabold text-[#FC4512] ml-8 mb-8">
        Some of our projects
      </h1>
      <motion.div
        ref={carouselRef}
        className="cursor-grab overflow-hidden ml-8 mr-8"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="grid grid-rows-2 grid-flow-col gap-6 w-max mx-auto"
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
              <motion.div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-[15]">
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
      </motion.div>
    </div>
  );
}
