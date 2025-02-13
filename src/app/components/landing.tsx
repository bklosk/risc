"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Landing() {
  const { scrollY } = useScroll();
  // Create an opacity value that fades from fully opaque to transparent between 100 and 300 scroll positions
  const fadeOpacity = useTransform(scrollY, [100, 275], [1, 0]);

  return (
    <motion.div
      style={{ opacity: fadeOpacity }} // fade out as it moves out of view
      className="w-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 "
    >
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="w-full object-cover px-8 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, easing: "easeInOut" }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <source src="/images/chicago.mp4" type="video/mp4" />
      </motion.video>
      <motion.div className="lg:pr-20 lg:mt-[50%] md:mt-[35%] w-5/6  mt-12 pl-8 pr-6">
        <TypeAnimation
          sequence={[
            1600,
            "We are an innovation lab for social change",
            2000, // Waits 1s
            "We are an innovation lab for risky ideas",
            2000, // Waits 2s
            "We are an innovation lab for a better world",
            2000,
            "We are an innovation lab for radical solutions",
            2000,
            "We are an innovation lab for a sustainable future",
            2000,
          ]}
          wrapper="span"
          speed={55}
          cursor={false}
          repeat={Infinity}
          className="text-4xl font-extrabold text-[#FC4512]"
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
