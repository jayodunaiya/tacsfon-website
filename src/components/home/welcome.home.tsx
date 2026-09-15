"use client";

import { useRef } from "react";
import Link from "next/link";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";

const WelcomeHome = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * Gives the large community image a slow vertical drift
   * as the user scrolls through the section.
   */
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"]
  );

  /*
   * Slight movement for the heading area.
   * Much smaller than the image movement.
   */
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", "-2%"]
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-white px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Top Content */}
        <motion.div
          style={{
            y: contentY,
          }}
          className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          {/* Section Label */}
          <FadeUp>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-green-700">
              <span className="relative h-px w-8 overflow-hidden bg-green-700">
                {/* Continuous subtle shimmer */}
                <motion.span
                  animate={{
                    x: ["-120%", "220%"],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-green-300"
                />
              </span>

              Who We Are
            </p>
          </FadeUp>

          {/* Main Content */}
          <div>
            <FadeUp delay={0.1}>
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                More than a church.

                <span className="block text-green-700">
                  We&apos;re a family.
                </span>
              </h2>
            </FadeUp>

            <div className="mt-10 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-2">
              <FadeUp delay={0.2}>
                <p className="max-w-md text-base leading-7 text-black/60">
                  We are a community of believers passionate about knowing God,
                  growing together, and making His love known in our world.
                </p>
              </FadeUp>

              <FadeUp
                delay={0.3}
                className="md:flex md:justify-end"
              >
                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em]"
                  >
                    Discover Our Story

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 transition duration-300 group-hover:rotate-[-45deg] group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                      →
                    </span>
                  </Link>
                </motion.div>
              </FadeUp>
            </div>
          </div>
        </motion.div>

        {/* Community Image */}
        <Reveal className="mt-16 overflow-hidden lg:mt-24">
          <div className="group relative h-[420px] overflow-hidden md:h-[550px] lg:h-[680px]">
            <motion.img
              src="/images/church-community.jpg"
              alt="Church community worshipping together"
              style={{
                y: imageY,
              }}
              className="absolute -inset-[6%] h-[112%] w-[112%] object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
            />

            {/* Soft image depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

            {/* Very subtle green atmosphere */}
            <motion.div
              animate={{
                opacity: [0.02, 0.07, 0.02],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-0 bg-green-700"
            />

            {/* Small living detail */}
            <div className="absolute bottom-6 right-6 hidden items-center gap-3 md:flex">
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Community
              </span>

              <div className="relative h-px w-10 overflow-hidden bg-white/30">
                <motion.span
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-green-400"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WelcomeHome;