"use client";

import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import team from "../../../public/data/team.json";

export default function Team() {
  const { scrollY } = useScroll();

  // Add state to trigger animation upon scrolling past 1000px
  const [animateTeam, setAnimateTeam] = useState(false);
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 1000) {
        setAnimateTeam(true);
        unsubscribe();
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Define variants for sequential fade-in; delay based on index
  const variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <motion.div className="z-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <div className="prose">
          <p className="mb-4 text-lg max-w-[400px] mx-auto">
            The Center for RISC is the brainchild of Steven Levitt, professor of
            economics at the University of Chicago and co-author of
            Freakonomics. We are not an academic group or research lab. Instead,
            we investigate today’s social issues by combining unconventional
            perspectives with empirical data, generating radical solutions with
            real-world relevance. We then test and scale those solutions through
            a mix of partnerships with academics, nonprofits, government
            agencies, international organizations, and private corporations.
          </p>
          <p className="mb-4 text-lg max-w-[400px] mx-auto">
            Our team holds degrees from the world’s leading universities, and
            our Analysts have trained in the fields of data science, economics,
            political science, applied mathematics, and more.
          </p>
          <p className=" text-lg max-w-[400px] mx-auto">
            After their time at RISC, our alumni have continued their
            distinguished paths, pursuing further education, embarking on
            projects abroad, and taking on roles in tech, academia,
            philanthropy, and beyond.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 max-w-[650px] z-50">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="relative z-50"
              initial="hidden"
              animate={animateTeam ? "visible" : "hidden"}
              custom={index}
              variants={variants}
            >
              <motion.div
                style={{ perspective: 500 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const tiltX = ((centerY - y) / centerY) * 10;
                  const tiltY = ((centerX - x) / centerX) * -10;
                  e.currentTarget.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "perspective(500px) rotateX(0deg) rotateY(0deg)";
                }}
              >
                <Image
                  src={member.image}
                  alt={`Team member ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-[150px] h-[150px] object-cover rounded-lg cursor-pointer hover:border-[#FC4512] hover:border-2 border-0 transition-all hover:shadow-xl duration-300"
                />
              </motion.div>
              <p className="relative font-extrabold w-fit mt-2 mb-4 bg-opacity-50 rounded-sm">
                {member.name} <br />
                <span className="text-sm font-light">{member.position}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
