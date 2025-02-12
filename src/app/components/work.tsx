"use client";
import { motion } from "framer-motion";

export default function Work() {
  return (
    <div className="w-full min-h-screen p-8 mt-12">
      <motion.h1
        className="text-5xl font-bold text-[#FC4512] mb-4 text-right"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        What We Do
      </motion.h1>
    </div>
  );
}
