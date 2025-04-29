"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  status: string;
  color: string;
  carousel?: string;
  link?: string;
}

export default function WorkCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const innerCarouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const itemRefs = useRef<Map<number, DOMRect>>(new Map());
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);

  // Track scroll position
  const [hasScrolled, setHasScrolled] = useState(false);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHasScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch carousel data from JSON file
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await fetch("/data/carousel.json");
        if (!response.ok) {
          throw new Error("Failed to fetch carousel data");
        }
        const data = await response.json();
        setCarouselItems(data);
      } catch (error) {
        console.error("Error loading carousel data:", error);
      }
    };

    fetchCarouselData();
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (innerCarouselRef.current && carouselRef.current) {
        const scrollWidth = innerCarouselRef.current.scrollWidth;
        const clientWidth = carouselRef.current.clientWidth;
        const calculatedWidth = Math.max(0, scrollWidth - clientWidth);
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

  // Create a reusable function to update item positions
  const updateItemPositions = useCallback(() => {
    if (!innerCarouselRef.current) return;

    const items = innerCarouselRef.current.querySelectorAll(".carousel-item");
    items.forEach((item) => {
      const id = Number(item.getAttribute("data-id"));
      const rect = item.getBoundingClientRect();
      itemRefs.current.set(id, rect);
    });
  }, []);

  // Track cursor position to determine which item is being hovered
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) return; // Don't update hover state while dragging

      // First make sure positions are up to date
      updateItemPositions();

      // Check if cursor is over any carousel item
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Find the item the cursor is currently over
      let foundHoveredItem = false;
      itemRefs.current.forEach((rect, id) => {
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          setHoveredItemId(id);
          foundHoveredItem = true;
        }
      });

      // Clear hover state if not over any item
      if (!foundHoveredItem) {
        setHoveredItemId(null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", updateItemPositions);
    window.addEventListener("resize", updateItemPositions);

    // Initialize positions
    updateItemPositions();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", updateItemPositions);
      window.removeEventListener("resize", updateItemPositions);
    };
  }, [isDragging, updateItemPositions]);

  return (
    <motion.div
      id="work"
      className="w-full overflow-hidden md:mt-8 py-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: hasScrolled ? 1 : 0 }}
      transition={{ duration: 0.5 }}
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
          onDrag={() => {
            // Update positions periodically during drag to keep them accurate
            requestAnimationFrame(updateItemPositions);
          }}
          onDragEnd={() => {
            setIsDragging(false);
            // Update item positions immediately after dragging ends
            updateItemPositions();
            // And once more after animation completes
            setTimeout(updateItemPositions, 100);
          }}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {carouselItems.map((item, index) => (
            <motion.div
              key={item.id}
              data-id={item.id}
              className="carousel-item min-w-[280px] md:min-w-[320px] h-[280px] md:h-[320px] relative flex-shrink-0 rounded-lg overflow-hidden group"
              style={{
                backgroundColor: item.color,
                backgroundImage: item.carousel
                  ? `url(${item.carousel})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                pointerEvents: "none", // Allow drag events to pass through to parent
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 3 + 0.15 * index, // Start after parent animation + staggered delay
              }}
              whileHover={{ scale: 1 }}
              ref={(el) => {
                if (el) {
                  const rect = el.getBoundingClientRect();
                  itemRefs.current.set(item.id, rect);
                }
              }}
            >
              {/* Linear gradient overlay from top - shortened height */}
              <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.53) 0%, rgba(0,0,0,0.53) 0%, transparent 30%)",
                }}
              />

              {/* Semi-transparent grey overlay that shows based on hover state */}
              <motion.div
                className="absolute inset-0 bg-black pointer-events-none z-[1]"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredItemId === item.id ? 1 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center h-full">
                  <p className="text-white text-xl pl-6 font-albert-sans max-w-[80%]">
                    {item.description}
                  </p>
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 z-20">
                  <h3 className="text-lg text-white font-['albert_sans'] font-medium">
                    {item.status}
                  </h3>
                </div>
                {item.link && (
                  <div
                    className="absolute bottom-3 right-3 px-3 py-1 z-20"
                    style={{ pointerEvents: "auto" }}
                  >
                    <Link
                      href={item.link}
                      className="block p-1 hover:scale-110 transition-transform"
                    >
                      <ArrowRight className="text-white" size={20} />
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Title box always visible - higher z-index ensures it's above the overlay */}
              <div className="absolute top-3 left-3 px-3 py-1 z-20 pointer-events-none">
                <h3 className="text-2xl text-white font-['albert_sans'] font-medium">
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
