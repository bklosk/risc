"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Landing() {
  // risc paths! storing here for funsies
  /* 
  const paths = [
    "M207,207h76.5v-49.5h-126v126H207V207z",
    "M233.5,368.5H157V419h127v-64h-50.5V368.5z M158,293h125v48.5h-76.5V355H158V293z",
    "M418,234.5V283H293v-48.5h38.2v-28H293V158 h125v48.5h-38.2v28H418z",
    "M292,419h127v-50.5h-76.5v-26H419V292H292V419z",
  ];
  */

  return (
    <div className="w-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 ">
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        className="w-full object-cover px-8 md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, easing: "easeInOut" }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <source src="/images/chicago.mp4" type="video/mp4" />
      </motion.video>
      <div className="lg:pr-20 lg:mt-[50%] md:mt-[35%] md:w-full w-5/6  mt-12 pl-8 pr-6">
        <TypeAnimation
          sequence={[
            2000,
            "We are an innovation lab for social change",
            2000, // Waits 1s
            "We are an innovation lab for risky ideas",
            2000, // Waits 2s
            "We are an innovation lab for a better world",
            2000,
            "We are an innovation lab for radical solutions",
            2000,
            "We are an innovation lab for a brighter future",
            2000,
          ]}
          wrapper="span"
          cursor={false}
          repeat={Infinity}
          className="text-4xl font-extrabold text-[#FC4512]"
        />
        <p className="mt-4 lg:w-3/4 font-medium text-lg">
          Driven by curiosity. Unfettered by orthodoxy. Grounded in the sciences
          of human behavior. We’re investigating bold new ways to tackle the
          world’s biggest problems.
        </p>
      </div>
    </div>
  );
}
