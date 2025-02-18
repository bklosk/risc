"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function Team() {
  const { scrollY } = useScroll();

  const team = [
    {
      name: "Ben Klosky",
      position: "Analyst",
      image: "/images/team/Ben.png",
      alt: "Team member Ben",
    },
    {
      name: "Ben Thevatasan",
      position: "Data Scientist",
      image: "/images/team/BenT.jpeg",
      alt: "Team member Ben T",
    },
    {
      name: "Cami Brix",
      position: "Analyst",
      image: "/images/team/Cami.png",
      alt: "Team member Cami",
    },
    {
      name: "Claire Sukumar",
      position: " Senior Analyst",
      image: "/images/team/Claire.png",
      alt: "Team member Claire",
    },
    {
      name: "Daniela Shuman",
      position: "Analyst",
      image: "/images/team/Daniela.png",
      alt: "Team member Daniela",
    },
    {
      name: "Davis Johnstone",
      position: "Analyst",
      image: "/images/team/Davis.png",
      alt: "Team member Davis",
    },
    {
      name: "Devin Haas",
      position: "Analyst",
      image: "/images/team/Devin.jpeg",
      alt: "Team member Devin",
    },
  ];

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
            agencies, international organizations, and private corporations.{" "}
          </p>
          <p className="mb-4">
            Our team holds degrees from the world’s leading universities, and
            our Analysts have trained in the fields of data science, economics,
            political science, applied mathematics, and more.{" "}
          </p>{" "}
          <p>
            After their time at RISC, our alumni have continued their
            distinguished paths, pursuing further education, embarking on
            projects abroad, and taking on roles in tech, academia,
            philanthropy, and beyond.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 z-50">
          {team.map((member, index) => (
            <div key={index + "div"} className="relative">
              <motion.div
                key={index + "divmotion"}
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
                  key={index}
                  src={member.image}
                  alt={`Team member ${index + 1}`}
                  width={150}
                  height={150}
                  className="w-full rounded-lg hover:shadow-xl transition-shadow duration-300 z-50"
                />
              </motion.div>
              <p
                key={index + "p"}
                className="relative w-3/4 mt-4 mb-8 bg-opacity-50 rounded-lg z-40"
              >
                {member.name} <br />
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
