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

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["1%", "-2%"]
  );

  return (
    <section
      ref={sectionRef}
      className="
        overflow-hidden bg-white px-5 py-16 text-black
        min-[375px]:px-6
        sm:py-20
        md:py-28
        lg:px-10 lg:py-40
      "
    >
      <div className="mx-auto max-w-[1440px]">

        {/* =========================================================
            MOBILE / SMALL SCREEN VERSION
        ========================================================== */}
        <div className="lg:hidden">
          {/* Section Label */}
          <FadeUp>
            <p
              className="
                flex items-center gap-3
                text-[10px] font-semibold uppercase
                tracking-[0.22em] text-green-700
                sm:text-xs sm:tracking-[0.25em]
              "
            >
              <span className="relative h-px w-7 overflow-hidden bg-green-700 sm:w-8">
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

          {/* Image + Heading */}
            <motion.div
              style={{
                y: contentY,
              }}
              className="
                mt-8 grid
                grid-cols-[1.1fr_0.9fr]
                items-stretch gap-4
                min-[375px]:gap-5
                sm:mt-10 sm:grid-cols-[1.15fr_0.85fr] sm:gap-7
                md:gap-10
              "
            >
              {/* Image */}
              <Reveal className="overflow-hidden">
                <div
                  className="
                    group relative
                    h-[190px]
                    min-[375px]:h-[210px]
                    sm:h-[260px]
                    md:h-[320px]
                  "
                >
                  <motion.img
                    src="/images/church-community.jpg"
                    alt="Church community worshipping together"
                    style={{
                      y: imageY,
                    }}
                    className="
                      absolute -inset-[6%]
                      h-[112%] w-[112%]
                      object-cover
                      transition-transform
                      duration-[1400ms]
                      ease-out
                      group-hover:scale-[1.025]
                    "
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

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
                </div>
              </Reveal>

              {/* Heading */}
              <div className="flex min-w-0 items-center">
                <FadeUp delay={0.1}>
                  <h2
                    className="
                      text-[clamp(1.85rem,8.5vw,3rem)]
                      font-semibold
                      leading-[1]
                      tracking-[-0.045em]
                      sm:text-5xl
                      md:text-6xl
                    "
                  >
                    More than a church.

                    <span className="mt-2 block text-green-700">
                      We&apos;re a family.
                    </span>
                  </h2>
                </FadeUp>
              </div>
            </motion.div>

          {/* Supporting Content */}
          <div
            className="
              mt-7 grid gap-7
              border-t border-black/10 pt-6
              sm:mt-8 sm:pt-7
              md:grid-cols-2 md:gap-8
            "
          >
            <FadeUp delay={0.2}>
              <p className="max-w-md text-sm leading-6 text-black/60 sm:text-base sm:leading-7">
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
                className="w-fit"
              >
                <Link
                  href="/about"
                  className="
                    group inline-flex items-center gap-3
                    text-xs font-semibold uppercase
                    tracking-[0.1em]
                    sm:text-sm sm:tracking-[0.12em]
                  "
                >
                  <span>Discover Our Story</span>

                  <span
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-full border border-black/20
                      transition duration-300
                      group-hover:rotate-[-45deg]
                      group-hover:border-green-700
                      group-hover:bg-green-700
                      group-hover:text-white
                      sm:h-10 sm:w-10
                    "
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </FadeUp>
          </div>
        </div>

        {/* =========================================================
            ORIGINAL LARGE SCREEN VERSION
        ========================================================== */}
        <div className="hidden lg:block">
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
                <h2 className="max-w-4xl text-7xl font-semibold leading-[1.05] tracking-[-0.04em]">
                  More than a church.

                  <span className="block text-green-700">
                    We&apos;re a family.
                  </span>
                </h2>
              </FadeUp>

              <div className="mt-10 grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
                <FadeUp delay={0.2}>
                  <p className="max-w-md text-base leading-7 text-black/60">
                    We are a community of believers passionate about knowing God,
                    growing together, and making His love known in our world.
                  </p>
                </FadeUp>

                <FadeUp
                  delay={0.3}
                  className="flex justify-end"
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

          {/* Original Large Community Image */}
          <Reveal className="mt-24 overflow-hidden">
            <div className="group relative h-[680px] overflow-hidden">
              <motion.img
                src="/images/church-community.jpg"
                alt="Church community worshipping together"
                style={{
                  y: imageY,
                }}
                className="
                  absolute -inset-[6%]
                  h-[112%] w-[112%]
                  object-cover
                  transition-transform
                  duration-[1400ms]
                  ease-out
                  group-hover:scale-[1.025]
                "
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

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

              <div className="absolute bottom-6 right-6 flex items-center gap-3">
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
      </div>
    </section>
  );
};

export default WelcomeHome;