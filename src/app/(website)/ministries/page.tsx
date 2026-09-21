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
    <main className="overflow-hidden bg-white">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative min-h-[88svh] overflow-hidden bg-black text-white sm:min-h-[92vh]">

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
          className="
            pointer-events-none
            absolute -right-8 bottom-[-3%]
            hidden select-none
            text-[14rem]
            font-medium
            leading-none
            tracking-[-0.08em]
            text-white/[0.07]
            lg:block
            xl:text-[18rem]
          "
        >
          BELONG
        </motion.span>

        <div
          className="
            relative z-10
            mx-auto flex
            min-h-[88svh]
            max-w-[1400px]
            flex-col
            justify-end
            px-5 pb-8 pt-28
            min-[375px]:px-6
            min-[375px]:pb-10
            min-[375px]:pt-32
            sm:min-h-[92vh]
            sm:pb-12
            md:pb-16
            lg:px-10
            lg:pb-20
          "
        >
          <div
            className="
              grid
              gap-8
              min-[375px]:gap-10
              sm:gap-12
              lg:grid-cols-[1.35fr_0.65fr]
              lg:items-end
            "
          >

            {/* HERO TITLE */}
            <div>
              <FadeUp>
                <p
                  className="
                    flex items-center
                    gap-2.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-green-400
                    min-[375px]:gap-3
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.26em]
                    sm:text-[10px]
                    sm:tracking-[0.3em]
                  "
                >
                  <span
                    className="
                      h-px w-7
                      shrink-0
                      bg-green-400
                      min-[375px]:w-8
                      sm:w-10
                    "
                  />

                  Ministries
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1
                  className="
                    mt-5
                    max-w-5xl
                    text-[clamp(3.25rem,15vw,4.5rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.06em]
                    min-[375px]:mt-6
                    sm:mt-7
                    sm:text-7xl
                    md:text-8xl
                    lg:text-[7rem]
                    lg:leading-[0.88]
                    lg:tracking-[-0.065em]
                    xl:text-[8.5rem]
                  "
                >
                  There is a place

                  <span className="block text-green-400">
                    for you here.
                  </span>
                </h1>
              </FadeUp>
            </div>

            {/* HERO DESCRIPTION */}
            <FadeUp delay={0.25}>
              <div className="max-w-md lg:ml-auto">
                <p
                  className="
                    text-[13px]
                    leading-6
                    text-white/65
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                    md:text-base
                  "
                >
                  We grow through community, serve through our
                  gifts and build together as one family in
                  Christ.
                </p>

                <div
                  className="
                    mt-6
                    flex flex-wrap
                    gap-3
                    min-[375px]:mt-7
                    sm:mt-8
                  "
                >
                  <Link
                    href="/ministries#units"
                    className="
                      group
                      inline-flex
                      max-w-full
                      items-center
                      justify-center
                      gap-3
                      bg-green-700
                      px-5 py-3.5
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-white
                      transition
                      hover:bg-green-600
                      min-[375px]:gap-4
                      min-[375px]:px-6
                      min-[375px]:py-4
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.16em]
                      sm:text-[10px]
                      sm:tracking-[0.18em]
                    "
                  >
                    Explore Ministries

                    <FiArrowDown className="shrink-0 transition-transform duration-300 group-hover:translate-y-1" />
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* BOTTOM META */}
          <div
            className="
              mt-9
              flex items-end
              justify-between
              gap-4
              border-t
              border-white/20
              pt-5
              min-[375px]:mt-10
              min-[375px]:pt-6
              sm:mt-14
            "
          >
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.17em]
                text-white/45
                min-[375px]:text-[8px]
                min-[375px]:tracking-[0.21em]
                sm:text-[9px]
                sm:tracking-[0.25em]
              "
            >
              03 Units · 12 Subgroups
            </p>

            <motion.a
              href="#units"
              aria-label="Scroll to ministries"
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                flex h-9 w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                text-sm
                text-white/60
                transition-colors
                hover:border-white/50
                hover:text-white
                min-[375px]:h-10
                min-[375px]:w-10
              "
            >
              <FiArrowDown />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ==========================================
          INTRO
      ========================================== */}

      <section
        className="
          overflow-hidden
          bg-[#F7F7F3]
          px-5 py-16
          text-black
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-32
          lg:px-10
          lg:py-40
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              grid
              gap-8
              min-[375px]:gap-10
              sm:gap-12
              lg:grid-cols-[0.65fr_1.35fr]
            "
          >
            <FadeUp>
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-green-700
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.26em]
                    sm:text-[10px]
                    sm:tracking-[0.3em]
                  "
                >
                  More Than Attendance
                </p>

                <p
                  className="
                    mt-3
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-black/25
                    min-[375px]:mt-4
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.18em]
                    sm:mt-5
                    sm:text-xs
                    sm:tracking-[0.2em]
                  "
                >
                  Grow · Serve · Belong
                </p>
              </div>
            </FadeUp>

            <div>
              <FadeUp delay={0.1}>
                <h2
                  className="
                    max-w-5xl
                    text-[clamp(2.35rem,10.5vw,3.5rem)]
                    font-medium
                    leading-[1.02]
                    tracking-[-0.045em]
                    sm:text-5xl
                    lg:text-7xl
                    lg:leading-[1.03]
                    lg:tracking-[-0.05em]
                  "
                >
                  Church becomes family when

                  <span className="text-black/25">
                    {" "}
                    everyone has a place to grow,
                    contribute and be known.
                  </span>
                </h2>
              </FadeUp>

              <div
                className="
                  mt-8
                  grid
                  gap-5
                  border-t
                  border-black/10
                  pt-6
                  min-[375px]:mt-10
                  min-[375px]:gap-6
                  min-[375px]:pt-7
                  sm:mt-12
                  sm:gap-8
                  sm:pt-8
                  md:grid-cols-2
                "
              >
                <FadeUp delay={0.2}>
                  <p
                    className="
                      max-w-md
                      text-[13px]
                      leading-6
                      text-black/50
                      min-[375px]:text-sm
                      min-[375px]:leading-7
                    "
                  >
                    TACSFON LAUTECH&apos;s units provide spaces
                    for intentional fellowship, development,
                    care and support within the larger family.
                  </p>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <p
                    className="
                      max-w-md
                      text-[13px]
                      leading-6
                      text-black/50
                      min-[375px]:text-sm
                      min-[375px]:leading-7
                    "
                  >
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

          Mobile carousel behaviour belongs inside
          UnitsMinistries.
      ========================================== */}

      <UnitsMinistries />

      {/* ==========================================
          SUBGROUPS

          Mobile tap-to-preview behaviour belongs
          inside SubgroupsMinistries.
      ========================================== */}

      <SubgroupsMinistries />

      {/* ==========================================
          FINAL CTA
      ========================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-green-700
          px-5 py-16
          text-white
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-32
          lg:px-10
          lg:py-40
        "
      >
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
          className="
            pointer-events-none
            absolute
            bottom-[-5%]
            right-[-2%]
            hidden
            select-none
            text-[14rem]
            font-medium
            leading-none
            tracking-[-0.08em]
            text-white/[0.07]
            lg:block
            xl:text-[18rem]
          "
        >
          FAMILY
        </motion.span>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid
              gap-9
              min-[375px]:gap-10
              sm:gap-12
              lg:grid-cols-[1.3fr_0.7fr]
              lg:items-end
              lg:gap-14
            "
          >
            <FadeUp>
              <div>
                <p
                  className="
                    flex items-center
                    gap-2.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-white/60
                    min-[375px]:gap-3
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.26em]
                    sm:text-[10px]
                    sm:tracking-[0.3em]
                  "
                >
                  <span
                    className="
                      h-px w-7
                      shrink-0
                      bg-white/50
                      min-[375px]:w-8
                      sm:w-10
                    "
                  />

                  Get Involved
                </p>

                <h2
                  className="
                    mt-5
                    max-w-5xl
                    text-[clamp(3rem,14vw,4.25rem)]
                    font-medium
                    leading-[0.92]
                    tracking-[-0.055em]
                    min-[375px]:mt-6
                    sm:mt-8
                    sm:text-6xl
                    md:text-7xl
                    lg:text-[7rem]
                    lg:leading-[0.9]
                  "
                >
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
                <p
                  className="
                    text-[13px]
                    leading-6
                    text-white/65
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                  "
                >
                  You don&apos;t have to figure it out alone.
                  Connect with the family and discover where
                  your gifts can serve.
                </p>

                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  className="
                    mt-6
                    min-[375px]:mt-7
                    sm:mt-8
                  "
                >
                  <Link
                    href="/contact"
                    className="
                      group
                      inline-flex
                      max-w-full
                      items-center
                      justify-center
                      gap-4
                      bg-white
                      px-5 py-3.5
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-black
                      transition-all
                      duration-300
                      hover:bg-black
                      hover:text-white
                      min-[375px]:gap-5
                      min-[375px]:px-6
                      min-[375px]:py-4
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.16em]
                      sm:text-[10px]
                      sm:tracking-[0.18em]
                    "
                  >
                    Get Connected

                    <FiArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MinistriesPage;