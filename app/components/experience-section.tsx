"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, MotionValue } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import SpotlightCard from "@/components/ui/spotlight-card";
import Image from "next/image";

const experiences = [
  {
    id: 5,
    title: "VisualFizz",
    organization: "Full-Stack Developer & DevOps",
    date: "May 2022 – Present",
    logo: "/visualfizz-logo.png",
    color: "amber",
    description: [
      "Design and develop scalable web applications and business platforms using React, Next.js, TypeScript, Node.js, Python, REST APIs, databases, and cloud technologies.",
      "Build AI-powered features, third-party integrations, and workflow automation solutions that improve productivity and streamline business processes.",
      "Handle the full development lifecycle, including architecture, development, testing, deployment, troubleshooting, performance optimization, and ongoing production support.",
    ],
  },
  {
    id: 1,
    title: "Bytes Technolab",
    organization: "AI Full-Stack Developer",
    date: "September 2018 – March 2022",
    logo: "/bytestechnolab-logo.png",
    color: "amber",
    description: [
      "Developed full-stack web applications and scalable business platforms using React, TypeScript, JavaScript, Node.js, Python, REST APIs, databases, and modern application architectures.",
      "Built AI-powered features, workflow automation, third-party integrations, and data-driven solutions to improve business efficiency and reduce manual processes.",
      "Worked closely with clients and development teams throughout the lifecycle, including requirements, development, testing, deployment, troubleshooting, and ongoing improvements.",
    ],
  },
  {
    id: 2,
    title: "Second Crew",
    organization: "Web/App Designer & Developer",
    date: "July 2015 – August 2018",
    logo: "/secondcrew-logo.png",
    color: "purple",
    description: [
      "Designed and developed responsive websites and web applications using JavaScript, HTML5, CSS3, APIs, and modern frontend technologies.",
      "Built mobile-friendly user experiences, integrated external services, and developed application features based on client requirements and business needs.",
      "Collaborated with clients and development teams throughout testing, debugging, deployment, maintenance, and ongoing improvements.",
    ],
  },
];

function ExperienceRow({
  exp,
  index,
  scrollYProgress,
  containerRef,
}: {
  exp: typeof experiences[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Monitor screen size to optimize animations between mobile and desktop layouts
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const checkPosition = useCallback((latestScrollVal: number) => {
    if (dotRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dotRect = dotRef.current.getBoundingClientRect();
      
      // Calculate the viewport Y coordinate of the tip of the scroll line
      const lineTipY = containerRect.top + latestScrollVal * containerRect.height;
      
      // Trigger exactly when the line meets the top of the dot (plus 2px buffer for visual touch)
      const dotTriggerY = dotRect.top + 2;
      
      setReached(lineTipY >= dotTriggerY);
    }
  }, [containerRef]);

  // Check on scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    checkPosition(latest);
  });

  // Check on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      checkPosition(scrollYProgress.get());
    };
    
    // Check initial position after a brief layout tick
    const timer = setTimeout(handleResize, 100);
    
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [checkPosition, scrollYProgress]);

  const borderGlowMap: Record<string, string> = {
    cyan: "hover:border-cyan-500/40",
    purple: "hover:border-purple-500/40",
    amber: "hover:border-amber-500/40",
    emerald: "hover:border-emerald-500/40",
  };

  const glowMap: Record<string, string> = {
    cyan: "shadow-cyan-500/60",
    purple: "shadow-purple-500/60",
    amber: "shadow-amber-500/60",
    emerald: "shadow-emerald-500/60",
  };

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={rowRef}
      className={`flex flex-col md:flex-row gap-8 items-center relative ${
        isLeft ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Timeline Dot with Logo */}
      <div
        ref={dotRef}
        className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-neutral-900 border-4 items-center justify-center z-20 overflow-hidden transition-all duration-500 ease-out ${
          reached
            ? `border-neutral-600 shadow-lg ${glowMap[exp.color] || glowMap.cyan} scale-125`
            : "border-neutral-950 shadow-none scale-100"
        }`}
      >
        <div
          className={`relative w-9 h-9 rounded-full overflow-hidden transition-all duration-500 ease-out ${
            reached
              ? "opacity-100 grayscale-0 scale-100"
              : "opacity-0 grayscale scale-50"
          }`}
        >
          <Image
            src={exp.logo}
            alt="org logo"
            fill
            className="object-cover rounded-full"
            sizes="36px"
          />
        </div>
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block w-1/2"></div>

      {/* Content Card with Scroll-Linked Reveal */}
      <motion.div
        className="w-full md:w-1/2 relative z-10"
        // On desktop, scale and fade with scroll position. On mobile, trigger standard viewport slide-in.
        initial={isDesktop ? false : { opacity: 0, y: 30 }}
        whileInView={isDesktop ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        animate={
          isDesktop
            ? {
                opacity: reached ? 1 : 0.05,
                scale: reached ? 1 : 0.95,
                x: reached ? 0 : isLeft ? -30 : 30,
                filter: reached ? "blur(0px)" : "blur(4px)",
              }
            : {}
        }
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 0.8,
        }}
      >
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <SpotlightCard
            className={`bg-neutral-900/80 border-neutral-800 ${
              borderGlowMap[exp.color] || borderGlowMap.cyan
            } transition-all duration-300 p-6 sm:p-8`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {exp.title}
                  </h3>
                  <p className="text-cyan-400 font-medium mt-1">
                    {exp.organization}
                  </p>
                </div>
                <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-neutral-800 text-gray-400 border border-neutral-700 whitespace-nowrap">
                  {exp.date}
                </span>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 my-2"></div>

              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <span className={`text-${exp.color}-400 mt-0.5`}>▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"]
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-neutral-950 to-black"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <TextReveal text="Professional Experiences" className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600" />
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full animate-glow-line"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
            My professional timeline — internships, leadership roles, and achievements.
          </p>
        </ScrollReveal>

        <div ref={containerRef} className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-0.5 h-full bg-neutral-800/30">
            <motion.div
              style={{ scaleY: scrollYProgress, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-500 to-purple-600 rounded-full"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceRow
                key={exp.id}
                exp={exp}
                index={index}
                scrollYProgress={scrollYProgress}
                containerRef={containerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
