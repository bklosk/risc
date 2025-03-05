"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import team from "../../../../public/data/team.json";
import TeamMember from "./team_member";

export default function Team() {
  const founders = [
    {
      name: "Jeffrey Severts",
      position: "Co-Founder, Executive Director",
      image: "/images/team/Jeff.png",
      bio: "Like Professor X, but for regular people (who just happen to be like mutants).",
      linkedinUrl: "https://linkedin.com/in/ben-thevathasan",
      githubUrl: "https://github.com/benthevathasan",
    },
    {
      name: "Steve Levitt",
      position: "Co-Founder, Faculty Director",
      image: "/images/team/Steve.jpeg",
      bio: "Does not take his hand off of a hot stove, has never known pain in his life.",
      linkedinUrl: "https://linkedin.com/in/noah-duncan",
      githubUrl: "https://github.com/noahduncan",
    },
  ];

  // Create refs for each section
  const introRef = useRef(null);
  const founderRef = useRef(null);
  const teamTitleRef = useRef(null);
  const teamGridRef = useRef(null);

  // Check if each section is in view
  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const founderInView = useInView(founderRef, { once: true, margin: "-100px" });
  const teamTitleInView = useInView(teamTitleRef, {
    once: true,
    margin: "-100px",
  });
  const teamGridInView = useInView(teamGridRef, {
    once: true,
    margin: "-100px",
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { delay: 0, duration: 1.5 } },
  };

  return (
    <motion.div
      id="team"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 mr-20"
    >
      <motion.div
        ref={introRef}
        className="prose"
        initial="hidden"
        animate={introInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <h1 className="text-6xl max-w-[400px] mx-auto font-extrabold text-[#FC4512] mb-8">
          Who we are
        </h1>
        <p className="mb-4 text-lg font-bold max-w-[400px] mx-auto">
          Our mission is to generate breakthrough problems to the world&apos;s
          hardest problems.
        </p>
        <p className="mb-4 text-lg max-w-[400px] mx-auto">
          The Center for RISC is the brainchild of Steven Levitt, professor of
          economics at the University of Chicago and co-author of Freakonomics.
          We are not an academic group or research lab. Instead, we investigate
          today&apos;s social issues by combining unconventional perspectives
          with empirical data, generating radical solutions with real-world
          relevance. We then test and scale those solutions through a mix of
          partnerships with academics, nonprofits, government agencies,
          international organizations, and private corporations.
        </p>
        <p className="mb-4 text-lg max-w-[400px] mx-auto">
          Our team holds degrees from the world’s leading universities, and our
          Analysts have trained in the fields of data science, economics,
          political science, applied mathematics, and more.
        </p>
        <p className=" text-lg max-w-[400px] mx-auto">
          After their time at RISC, our alumni have continued their
          distinguished paths, pursuing further education, embarking on projects
          abroad, and taking on roles in tech, academia, philanthropy, and
          beyond.
        </p>
      </motion.div>
      <div className="team">
        <motion.div
          ref={founderRef}
          className="text-6xl font-extrabold text-[#FC4512] text-left mb-8"
          initial="hidden"
          animate={founderInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Founded by
        </motion.div>
        <motion.div
          className="flex flex-row gap-8 mb-8"
          initial="hidden"
          animate={founderInView ? "visible" : "hidden"}
          ref={founderRef}
          variants={fadeInUp}
        >
          {founders.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                  },
                }),
              }}
              custom={index}
            >
              <TeamMember
                src={member.image}
                alt={`Image of ${member.name}`}
                name={member.name}
                role={member.position}
                bio={member.bio}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          ref={teamTitleRef}
          className="text-6xl font-extrabold text-[#FC4512] text-left mb-8"
          initial="hidden"
          animate={teamTitleInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          Our Team
        </motion.div>
        <motion.div
          ref={teamGridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={teamGridInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                  },
                }),
              }}
              custom={index}
            >
              <TeamMember
                src={member.image}
                alt={`Image of ${member.name}`}
                name={member.name}
                role={member.position}
                bio={member.bio}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
