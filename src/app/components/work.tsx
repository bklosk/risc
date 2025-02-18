"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Work() {
  const { scrollY } = useScroll();
  // Create an opacity value that fades from fully opaque to transparent between 300 and 350 scroll positions
  const fadeOpacity = useTransform(scrollY, [250, 340, 820, 940], [0, 1, 1, 0]);
  const textyPosition = useTransform(scrollY, [250, 340], [0, -10]);
  const closeSection = useTransform(scrollY, [820, 940], [1, 0]);

  const fi_box = {
    x: useTransform(scrollY, [340, 440], [-100, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };
  const pd_box = {
    y: useTransform(scrollY, [340, 440], [100, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };
  const ds4e_box = {
    y: useTransform(scrollY, [340, 440], [-40, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };
  const tll_box = {
    x: useTransform(scrollY, [340, 440], [180, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };

  return (
    <div className="w-full min-h-[1000px]">
      <motion.h1
        className="text-3xl fixed top-32 w-full font-bold text-[#FC4512] text-center"
        style={{ opacity: fadeOpacity, y: textyPosition }}
      >
        We generate breakthrough solutions to social problems
      </motion.h1>
      <motion.div
        className="fixed top-52 left-1/2 transform -translate-x-1/2 grid lg:w-1/2 md:w-3/4 lg:min-w-[800px] w-[90%] h-[70%] grid-rows-4 grid-cols-5 gap-2"
        style={{ opacity: closeSection }}
      >
        {[
          {
            className:
              "col-span-3 row-span-2 bg-[#1f3e51] text-white flex justify-center items-center hover:drop-shadow-lg z-20",
            style: { x: fi_box.x, opacity: fi_box.opacity },
            src: "/images/work/fi.png",
            alt: "Foster Insights",
            width: "w-3/4",
            height: "h-1/2",
            link: "https://www.fosterinsights.org",
          },
          {
            className:
              "col-span-2 bg-[#f8b49b] text-white flex justify-center items-center z-20",
            style: { y: ds4e_box.y, opacity: ds4e_box.opacity },
            src: "/images/work/ds4e.png",
            alt: "data science 4 everyone",
            width: "w-full",
            height: "h-[120%]",
            link: "https://www.datascience4everyone.org",
          },
          {
            className:
              "col-span-2 row-span-2  bg-[#071535] flex justify-center items-center text-white z-20",
            style: { x: tll_box.x, opacity: tll_box.opacity },
            src: "/images/work/TLL.png",
            alt: "the levitt lab",
            width: "w-3/4",
            height: "h-1/2",
            link: "https://www.projectdonor.org",
          },
          {
            className:
              "col-span-3 bg-[#cd7029] flex justify-center items-center z-20",
            style: {
              y: pd_box.y,
              opacity: pd_box.opacity,
            },
            src: "/images/work/pd_cream.png",
            alt: "TLL",
            width: "w-3/4",
            height: "h-1/2",
            link: "https://www.thelevittlab.org",
          },
        ].map((item, index) => (
          <motion.a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            key={index}
            className={`${item.className} rounded-md`}
            style={item.style}
            animate={{ easing: "easeInOut" }}
          >
            {item.src && (
              <>
                <div
                  className={` relative ${item.width} ${item.height} flex items-center`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    layout="fill"
                    objectFit="contain"
                    className="select-none "
                  />
                </div>
              </>
            )}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
