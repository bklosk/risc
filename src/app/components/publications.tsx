"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: string;
  url: string;
  color: string;
  image?: string;
}

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
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

  // Fetch publication data from JSON file
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/data/publications.json");
        if (!response.ok) {
          throw new Error("Failed to fetch publications data");
        }
        const data = await response.json();
        setPublications(data);
      } catch (error) {
        console.error("Error loading publications data:", error);
        // Set some example data as fallback
        setPublications([
          {
            id: 1,
            title: "Example Publication Title",
            authors: "Author 1, Author 2, Author 3",
            journal: "Journal of Research",
            year: "2023",
            url: "https://example.com/publication1",
            color: "#1E293B",
            image: "/images/publication-placeholder.jpg",
          },
          // Add more fallback publications if needed
        ]);
      }
    };

    fetchPublications();
  }, []);

  return (
    <motion.div
      id="publications"
      className="w-full py-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: hasScrolled ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-4xl md:text-5xl mx-auto font-albert-sans font-extrabold text-[#FC4512] md:ml-8 mb-4">
          Releases
        </h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mx-4 md:mx-8">
        {publications.map((publication, index) => (
          <motion.div
            key={publication.id}
            className="publication-item min-w-[280px] md:w-[320px] h-[280px] md:h-[320px] relative flex-shrink-0 rounded-lg overflow-hidden group"
            style={{
              backgroundColor: publication.color,
              backgroundImage: publication.image
                ? `url(${publication.image})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.15 * index,
            }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Linear gradient overlay */}
            <div
              className="absolute inset-0 z-[1]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.53) 0%, rgba(0,0,0,0.53) 0%, transparent 30%)",
              }}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center z-[2]">
              <div className="text-white p-4">
                <p className="font-albert-sans text-base">
                  {publication.authors}
                </p>
                <p className="font-albert-sans text-base mt-2">
                  {publication.journal}, {publication.year}
                </p>
                <Link
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center text-[#FC4512] hover:underline"
                >
                  Read publication <ExternalLink size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Title always visible */}
            <div className="absolute top-3 left-3 px-3 py-1 z-20">
              <h3 className="text-2xl text-white font-['albert_sans'] font-medium">
                {publication.title}
              </h3>
            </div>

            {/* Link to publication */}
            <Link
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-[3]"
              aria-label={`Read publication: ${publication.title}`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
