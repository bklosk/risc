"use client";

import { useState, useEffect } from "react"; // added useEffect
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import TextTransition from "react-text-transition";

export default function Work() {
  const { scrollY } = useScroll();
  const fadeOpacity = useTransform(scrollY, [250, 340, 820, 940], [0, 1, 1, 0]);
  const textyPosition = useTransform(scrollY, [250, 340], [0, -10]);
  const closeSection = useTransform(scrollY, [820, 940], [1, 0]);

  // State for header text
  const defaultHeader = "We generate breakthrough solutions to social problems";
  const [headerText, setHeaderText] = useState(defaultHeader);

  // Track if work items should be clickable based on scroll
  const [clickable, setClickable] = useState(false);
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest: number) => {
      // Adjust threshold as needed (here using 1000px as an example threshold)
      setClickable(latest < 1000 && latest > 440);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Define box animations
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
  const cn_box = {
    x: useTransform(scrollY, [340, 440], [-180, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };
  const da_box = {
    y: useTransform(scrollY, [340, 440], [180, 0]),
    opacity: useTransform(scrollY, [340, 440], [0, 1]),
  };

  // Refactored event handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = ((rect.height / 2 - y) / (rect.height / 2)) * 2;
    const tiltY = ((rect.width / 2 - x) / (rect.width / 2)) * -2;
    e.currentTarget.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  // Modified to also reset headerText
  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transition = "transform ease";
    e.currentTarget.style.transform =
      "perspective(500px) rotateX(0deg) rotateY(0deg)";
  };

  // Consolidate work items into an array
  const workItems = [
    {
      id: "fi",
      className:
        "col-span-3 row-span-2 bg-[#1f3e51] text-white flex justify-center items-center hover:drop-shadow-lg z-20 rounded-md",
      dynamicStyle: fi_box,
      src: "/images/work/fi.png",
      alt: "Using data to improve child welfare",
      width: "w-3/4",
      height: "h-1/2",
      link: "https://www.fosterinsights.org",
    },
    {
      id: "ds4e",
      className:
        "col-span-2 bg-[#f8b49b] text-white flex justify-center items-center z-20 rounded-md",
      dynamicStyle: ds4e_box,
      src: "/images/work/ds4e.png",
      alt: "Modernizing our outdated math curriculum",
      width: "w-full",
      height: "h-[120%]",
      link: "https://www.datascience4everyone.org",
    },
    {
      id: "tll",
      className:
        "col-span-2 row-span-2 bg-[#071535] flex justify-center items-center text-white z-20 rounded-md",
      dynamicStyle: tll_box,
      src: "/images/work/TLL.png",
      alt: "Reimagining school from the ground up",
      width: "w-3/4",
      height: "h-1/2",
      link: "https://www.thelevittlab.org",
    },
    {
      id: "pd",
      className:
        "col-span-3 bg-[#cd7029] flex justify-center items-center z-20 rounded-md",
      dynamicStyle: pd_box,
      src: "/images/work/PD_cream.png",
      alt: "Helping kidney donors become eligible to donate",
      width: "w-3/4",
      height: "h-1/2",
      link: "https://www.projectdonor.org",
    },
    {
      id: "cn",
      className:
        "col-span-2 bg-blue-900 flex justify-center items-center pb-4 z-20 rounded-md",
      dynamicStyle: cn_box,
      src: "/images/work/cn.png",
      alt: "Flagging misinformation at scale",
      width: "w-[150%]",
      height: "h-[150%]",
      link: "https://asteriskmag.com/issues/08/the-making-of-community-notes",
    },
    {
      id: "da",
      className:
        "col-span-3 bg-slate-600 flex justify-center items-center z-20 rounded-md",
      dynamicStyle: da_box,
      src: "/images/work/da.png",
      alt: "Minimizing unnecessary law enforcement encounters",
      width: "w-[200%]",
      height: "h-[200%]",
      link: "https://demo.emdecisionaid.com",
    },
  ];

  return (
    <div className="w-full min-h-[1000px]">
      <motion.div
        className="text-3xl fixed top-32 w-full font-bold text-[#FC4512] text-center"
        style={{ opacity: fadeOpacity, y: textyPosition }}
      >
        <TextTransition className="w-full flex justify-center items-center">
          {headerText}
        </TextTransition>
      </motion.div>
      <motion.div
        className="fixed top-52 left-1/2 transform -translate-x-1/2 grid lg:w-1/2 md:w-3/4 lg:min-w-[800px] w-[90%] h-[70%] grid-rows-4 grid-cols-5 gap-2"
        // Disable pointer events when scrolled past threshold
        style={{
          opacity: closeSection,
          pointerEvents: clickable ? "auto" : "none",
        }}
      >
        {workItems.map(
          ({ id, className, dynamicStyle, src, alt, width, height, link }) => (
            <motion.a
              key={id}
              href={link}
              target="_blank"
              rel="noreferrer"
              className={className}
              style={{ ...dynamicStyle, perspective: 500 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setHeaderText(alt)}
              onMouseLeave={handleMouseLeave}
              animate={{}}
            >
              {src && (
                <div
                  className={`relative ${width} ${height} flex items-center`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    sizes={"auto"}
                    fill
                    style={{ objectFit: "contain" }}
                    className="select-none"
                  />
                </div>
              )}
            </motion.a>
          )
        )}
      </motion.div>
    </div>
  );
}
