"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
} from "react-icons/fi";

import UnitsMinistries from "@/components/ministries/units.ministries";
import SubgroupsMinistries from "@/components/ministries/subgroups.ministries";

import FadeUp from "@/components/motion/fade-up.motion";

const MinistriesPage = () => {
  return (
    <>
      {/* ==========================================
          HERO
      ========================================== */}
      <section className="relative min-h-[92vh] overflow-hidden bg-black text-white">

        {/* BACKGROUND */}
        <motion.img
          initial={{
            scale: 1.08,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          src="/images/ministries/ministries-hero.jpg"
          alt="TACSFON LAUTECH family"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* GIANT BACKGROUND WORD */}
        <motion.span
          initial={{
            opacity: 0,
            x: 80,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1.4,
            delay: 0.5,
          }}
          className="pointer-events-none absolute -right-8 bottom-[-3%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.07] lg:block xl:text-[18rem]"
        >
          BELONG
        </motion.span>

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-32 md:pb-16 lg:px-10 lg:pb-20">

          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">

            <div>

              <FadeUp>
                <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-400">
                  <span className="h-px w-10 bg-green-400" />
                  Ministries
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="mt-7 max-w-5xl text-6xl font-medium leading-[0.88] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem]">
                  There is a place

                  <span className="block text-green-400">
                    for you here.
                  </span>
                </h1>
              </FadeUp>

            </div>

            <FadeUp delay={0.25}>

              <div className="max-w-md lg:ml-auto">

                <p className="text-sm leading-7 text-white/65 md:text-base">
                  We grow through community, serve through our
                  gifts and build together as one family in
                  Christ.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <a
                    href="#units"
                    className="group inline-flex items-center gap-4 bg-green-700 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-green-600"
                  >
                    Explore Ministries

                    <FiArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
                  </a>

                </div>

              </div>

            </FadeUp>

          </div>

          {/* BOTTOM META */}
          <div className="mt-14 flex items-end justify-between border-t border-white/20 pt-6">

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
              03 Units · 12 Subgroups
            </p>

            <motion.div
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60"
            >
              <FiArrowDown />
            </motion.div>

          </div>

        </div>

      </section>

      {/* ==========================================
          INTRO
      ========================================== */}
      <section className="overflow-hidden bg-[#F7F7F3] px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">

            <FadeUp>
              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                  More Than Attendance
                </p>

                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-black/25">
                  Grow · Serve · Belong
                </p>

              </div>
            </FadeUp>

            <div>

              <FadeUp delay={0.1}>
                <h2 className="max-w-5xl text-4xl font-medium leading-[1.03] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                  Church becomes family when

                  <span className="text-black/25">
                    {" "}
                    everyone has a place to grow,
                    contribute and be known.
                  </span>
                </h2>
              </FadeUp>

              <div className="mt-12 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-2">

                <FadeUp delay={0.2}>
                  <p className="max-w-md text-sm leading-7 text-black/50">
                    TACSFON LAUTECH&apos;s units provide spaces
                    for intentional fellowship, development,
                    care and support within the larger family.
                  </p>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <p className="max-w-md text-sm leading-7 text-black/50">
                    Our subgroups give members practical
                    opportunities to serve God and others
                    through their gifts, interests and
                    abilities.
                  </p>
                </FadeUp>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          UNITS
      ========================================== */}
      <UnitsMinistries />

      {/* ==========================================
          SUBGROUPS
      ========================================== */}
      <SubgroupsMinistries />

      {/* ==========================================
          FINAL CTA
      ========================================== */}
      <section className="relative overflow-hidden bg-green-700 px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

        {/* DECORATIVE WORD */}
        <motion.span
          animate={{
            x: ["0%", "-2%", "0%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute bottom-[-5%] right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.07] lg:block xl:text-[18rem]"
        >
          FAMILY
        </motion.span>

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

            <FadeUp>

              <div>

                <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                  <span className="h-px w-10 bg-white/50" />
                  Get Involved
                </p>

                <h2 className="mt-8 max-w-5xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[7rem]">
                  Find where

                  <span className="block text-white/45">
                    you belong.
                  </span>
                </h2>

              </div>

            </FadeUp>

            <FadeUp
              delay={0.2}
              className="lg:flex lg:justify-end"
            >

              <div className="max-w-sm">

                <p className="text-sm leading-7 text-white/65">
                  You don&apos;t have to figure it out alone.
                  Connect with the family and discover where
                  your gifts can serve.
                </p>

                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  className="mt-8"
                >
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-5 bg-white px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-black hover:text-white"
                  >
                    Get Connected

                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>

              </div>

            </FadeUp>

          </div>

        </div>

      </section>

    </>
  );
};

export default MinistriesPage;