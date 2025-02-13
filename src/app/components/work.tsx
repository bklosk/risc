"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Work() {
  const { scrollY } = useScroll();
  // Create an opacity value that fades from fully opaque to transparent between 300 and 350 scroll positions
  const fadeOpacity = useTransform(scrollY, [290, 340], [0, 1]);
  const textyPosition = useTransform(scrollY, [340, 440], [0, -10]);

  const fi_box = {
    x: useTransform(scrollY, [340, 440], [-100, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };
  const tll_box = {
    x: useTransform(scrollY, [340, 440], [100, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };
  const ds4e_box = {
    x: useTransform(scrollY, [340, 440], [150, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };
  const pd_box = {
    x: useTransform(scrollY, [340, 440], [-180, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };

  return (
    <div className="w-full min-h-screen">
      <motion.h1
        className="text-3xl fixed top-32 w-full font-bold text-[#FC4512] text-center"
        style={{ opacity: fadeOpacity, y: textyPosition }}
      >
        We generate breakthrough solutions to social problems
      </motion.h1>
      <motion.div className="fixed top-52 left-1/2 transform -translate-x-1/2 grid lg:w-1/2 md:w-3/4 w-[90%] h-[70%] grid-rows-4 grid-cols-5 gap-2">
        {[
          {
            className:
              "col-span-3 bg-[#1f3e51] text-white flex justify-center items-center hover:drop-shadow-lg z-20",
            style: { x: fi_box.x, opacity: fi_box.opacity },
            src: "/images/fi.png",
            alt: "Foster Insights",
            width: "w-3/4",
            height: "h-1/2",
          },
          {
            className:
              "col-span-2 bg-[#f8b49b] text-white flex justify-center items-center z-20",
            style: { x: ds4e_box.x, opacity: ds4e_box.opacity },
            src: "/images/ds4e.png",
            alt: "data science 4 everyone",
            width: "w-full",
            height: "h-[120%]",
          },
          {
            className:
              "col-span-2 bg-[#cd7029] flex justify-center items-center text-white z-20",
            style: { x: pd_box.x, opacity: pd_box.opacity },
            src: "/images/pd_cream.png",
            alt: "project donor",
            width: "w-3/4",
            height: "h-1/2",
          },
          {
            className:
              "col-span-3 bg-[#071535] flex justify-center items-center",
            style: { x: tll_box.x, opacity: tll_box.opacity },
            src: "/images/TLL.png",
            alt: "TLL",
            width: "w-3/4",
            height: "h-1/2",
          },
          {
            className: "col-span-3 bg-[#e0e0e0] text-white z-10",
            style: {},
            src: "",
            alt: "",
            width: "",
            height: "",
          },
          {
            className: "col-span-2 bg-[#e0e0e0] text-white z-10",
            style: {},
            src: "",
            alt: "",
            width: "",
            height: "",
          },
          {
            className: "col-span-2 bg-[#e0e0e0] text-white z-10",
            style: {},
            src: "",
            alt: "",
            width: "",
            height: "",
          },
          {
            className: "col-span-3 bg-[#e0e0e0] text-white z-10",
            style: {},
            src: "",
            alt: "",
            width: "",
            height: "",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`${item.className}`}
            style={item.style}
            animate={{ easing: "easeInOut" }}
          >
            {item.src && (
              <>
                <div
                  className={`relative ${item.width} ${item.height} flex items-center`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
