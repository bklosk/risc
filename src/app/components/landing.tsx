"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { useState, useEffect, useMemo } from "react";

export default function Landing() {
  const { scrollY } = useScroll();
  // Create an opacity value that fades from fully opaque to transparent between 100 and 300 scroll positions
  const fadeOpacity = useTransform(scrollY, [100, 275], [1, 0]);
  const fadeY = useTransform(scrollY, [100, 275], [0, -100]);

  const videoFiles = useMemo(
    () => ["/images/chicago.mp4", "/images/boats.mp4", "/images/riverwalk.mp4"],
    []
  );

  const [randomVideo, setRandomVideo] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoFiles.length);
    setRandomVideo(videoFiles[randomIndex]);
  }, [videoFiles]);

  if (!randomVideo) return <p> </p>;

  return (
    <motion.div
      style={{ opacity: fadeOpacity, y: fadeY }} // fade out as it moves out of view
      className="w-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 "
      id="intro"
    >
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="w-full object-cover px-8 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <source src={randomVideo} type="video/mp4" />
      </motion.video>
      <motion.div className="lg:pr-20 lg:mt-[50%] md:mt-[35%] w-5/6  mt-12 pl-8 pr-6">
        <TypeAnimation
          sequence={[1600, "We are an innovation lab for social change"]}
          wrapper="span"
          speed={55}
          cursor={false}
          repeat={Infinity}
          className="text-4xl font-albert-sans font-extrabold text-[#FC4512]"
        />
        <motion.p
          className="mt-4 lg:w-3/4 font-medium text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 4 }}
        >
          Driven by curiosity. Unfettered by orthodoxy. Grounded in the sciences
          of human behavior. We’re investigating bold new ways to tackle the
          world’s biggest problems.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
