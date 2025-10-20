"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import team from "../../../../public/data/team.json";
import TeamMember from "./team_member";

export default function Team() {
  // Sort team members: regular team members first (sorted by last name),
  // then entrepreneurs in residence (also sorted by last name)
  const sortedTeam = [...team].sort((a, b) => {
    const isEIRA = a.position
      .toLowerCase()
      .includes("entrepreneur in residence");
    const isEIRB = b.position
      .toLowerCase()
      .includes("entrepreneur in residence");

    // If one is EIR and the other isn't, sort accordingly
    if (isEIRA && !isEIRB) return 1; // a is EIR, so it comes after
    if (!isEIRA && isEIRB) return -1; // b is EIR, so it comes after

    // Otherwise, sort by last name
    const lastNameA = a.name.split(" ").pop() || "";
    const lastNameB = b.name.split(" ").pop() || "";
    return lastNameA.localeCompare(lastNameB);
  });

  const founders = [
    {
      name: "Steve Levitt",
      position: "Co-Founder, Faculty Director",
      image: "/images/team/Steve.jpeg",
      bio: "Scrolls on Instagram just for the ads. He really loves them for some reason.",
    },
    {
      name: "Jeffrey Severts",
      position: "Co-Founder, Executive Director",
      image: "/images/team/Jeff.png",
      bio: "Probably a super-taster. Can somehow tell the difference between diet coke, coke zero, and diet pepsi.",
      linkedinUrl: "https://www.linkedin.com/in/jeffrey-severts-27b433",
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:mr-20 snap-section"
    >
      <motion.div
        ref={introRef}
        className="prose font-albert-sans"
        initial="hidden"
        animate={introInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <h1 className="text-6xl max-w-[400px] lg:mx-auto font-extrabold text-[#FC4512] mb-8">
          Who we are
        </h1>
        <p className="mb-4 text-lg font-bold max-w-[400px] lg:mx-auto">
          Our mission is to generate breakthrough solutions to the world&apos;s
          hardest problems.
        </p>
        <p className="mb-4 text-lg max-w-[400px] lg:mx-auto">
          The Center for RISC is the brainchild of Steven Levitt, professor of
          economics at the University of Chicago and co-author of Freakonomics.
          We are not an academic group or research lab. Instead, we investigate
          today&apos;s social issues by combining unconventional perspectives
          with empirical data, generating radical solutions with real-world
          relevance. We then test and scale those solutions through a mix of
          partnerships with academics, nonprofits, government agencies,
          international organizations, and private corporations.
        </p>
        <p className="mb-4 text-lg max-w-[400px] lg:mx-auto">
          Our team holds degrees from the world’s leading universities, and our
          Analysts have trained in the fields of data science, economics,
          political science, applied mathematics, and more.
        </p>
        <p className=" text-lg max-w-[400px] lg:mx-auto">
          After their time at RISC, our alumni have continued their
          distinguished paths, pursuing further education, embarking on projects
          abroad, and taking on roles in tech, academia, philanthropy, and
          beyond.
        </p>
      </motion.div>
      <div className="team font-albert-sans">
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
                linkedinUrl={member.linkedinUrl}
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
          className="flex flex-wrap gap-8 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-8"
          initial="hidden"
          animate={teamGridInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          {sortedTeam.map((member, index) => (
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
                githubUrl={member.githubUrl}
                linkedinUrl={member.linkedinUrl}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
