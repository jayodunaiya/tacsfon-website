"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowDownRight,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

import { ministryUnits } from "@/data/ministries.data";

import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const UnitsMinistries = () => {
  return (
    <section
      id="units"
      className="
        relative overflow-hidden
        bg-white
        py-16
        text-black
        min-[375px]:py-20
        sm:py-24
        md:py-32
        lg:px-10
        lg:py-40
      "
    >
      <div className="mx-auto max-w-[1400px]">

        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            mb-9
            grid gap-7
            px-5
            min-[375px]:mb-10
            min-[375px]:gap-8
            min-[375px]:px-6
            sm:mb-12
            sm:px-8
            md:mb-14
            lg:mb-16
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end
            lg:px-0
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
                  text-green-700
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
                    bg-green-700
                    min-[375px]:w-8
                    sm:w-10
                  "
                />

                Our Units
              </p>

              <p
                className="
                  mt-3
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-black/30
                  min-[375px]:mt-4
                  min-[375px]:text-[10px]
                  min-[375px]:tracking-[0.18em]
                  sm:mt-5
                  sm:text-xs
                  sm:tracking-[0.2em]
                "
              >
                03 communities
              </p>
            </div>
          </FadeUp>

          <div
            className="
              grid gap-5
              min-[375px]:gap-6
              sm:gap-8
              md:grid-cols-[1fr_300px]
              md:items-end
            "
          >
            <FadeUp delay={0.1}>
              <h2
                className="
                  max-w-3xl
                  text-[clamp(2.6rem,12vw,3.75rem)]
                  font-medium
                  leading-[0.94]
                  tracking-[-0.05em]
                  sm:text-6xl
                  lg:text-[5.5rem]
                  lg:leading-[0.92]
                  lg:tracking-[-0.055em]
                "
              >
                Growing together.

                <span className="block text-green-700">
                  Caring for one another.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p
                className="
                  max-w-sm
                  text-[13px]
                  leading-6
                  text-black/45
                  min-[375px]:text-sm
                  min-[375px]:leading-7
                "
              >
                Our units create intentional spaces for fellowship,
                spiritual development, support and meaningful
                relationships within the family.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* =========================================
            MOBILE / TABLET CAROUSEL
        ========================================= */}

        <div className="lg:hidden">

          {/* SWIPE HINT */}
          <FadeUp>
            <div
              className="
                mb-4
                flex items-center
                justify-between
                gap-4
                px-5
                min-[375px]:mb-5
                min-[375px]:px-6
                sm:px-8
              "
            >
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-black/30
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.2em]
                "
              >
                Swipe to explore
              </p>

              <div className="flex items-center gap-2 text-black/30">
                <FiArrowLeft className="text-xs" />

                <span className="h-px w-5 bg-black/20" />

                <FiArrowRight className="text-xs" />
              </div>
            </div>
          </FadeUp>

          {/* CAROUSEL */}
          <Stagger
            className="
              flex
              snap-x snap-mandatory
              gap-3
              overflow-x-auto
              overscroll-x-contain
              px-5
              pb-4
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              min-[375px]:gap-4
              min-[375px]:px-6
              sm:px-8
            "
          >
            {ministryUnits.map((unit) => (
              <StaggerItem
                key={unit.id}
                className="
                  w-[84%]
                  min-w-[84%]
                  snap-start
                  min-[375px]:w-[86%]
                  min-[375px]:min-w-[86%]
                  sm:w-[65%]
                  sm:min-w-[65%]
                  md:w-[52%]
                  md:min-w-[52%]
                "
              >
                <Link
                  href={`/ministries/${unit.id}`}
                  className="
                    group
                    relative
                    block
                    h-[500px]
                    overflow-hidden
                    bg-black
                    min-[375px]:h-[530px]
                    sm:h-[570px]
                    md:h-[600px]
                  "
                >
                  {/* IMAGE */}
                  <Reveal className="absolute inset-0">
                    <motion.img
                      src={unit.image}
                      alt={unit.name}
                      initial={{
                        scale: 1.08,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1.3,
                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                      className="
                        absolute inset-0
                        h-full w-full
                        object-cover
                      "
                    />
                  </Reveal>

                  {/* OVERLAYS */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />

                  <div className="absolute inset-0 bg-green-950/10" />

                  {/* NUMBER + ARROW */}
                  <div
                    className="
                      absolute
                      left-0 top-0
                      z-10
                      flex w-full
                      items-start
                      justify-between
                      p-5
                      min-[375px]:p-6
                      sm:p-7
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        font-semibold
                        tracking-[0.22em]
                        text-white/60
                        min-[375px]:text-[10px]
                        min-[375px]:tracking-[0.25em]
                      "
                    >
                      {unit.number}
                    </span>

                    <span
                      className="
                        flex h-10 w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/10
                        text-white
                        backdrop-blur-sm
                        min-[375px]:h-11
                        min-[375px]:w-11
                      "
                    >
                      <FiArrowDownRight />
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div
                    className="
                      absolute
                      bottom-0 left-0
                      z-10
                      w-full
                      p-5
                      min-[375px]:p-6
                      sm:p-7
                    "
                  >
                    <p
                      className="
                        mb-3
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-green-400
                        min-[375px]:text-[8px]
                        min-[375px]:tracking-[0.24em]
                        sm:mb-4
                        sm:text-[9px]
                        sm:tracking-[0.28em]
                      "
                    >
                      Ministry Unit
                    </p>

                    <h3
                      className="
                        max-w-sm
                        text-[2rem]
                        font-medium
                        leading-[0.95]
                        tracking-[-0.045em]
                        text-white
                        min-[375px]:text-[2.25rem]
                        sm:text-4xl
                      "
                    >
                      {unit.name}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[12px]
                        font-medium
                        leading-5
                        text-white/60
                        min-[375px]:mt-4
                        min-[375px]:text-[13px]
                        sm:text-sm
                      "
                    >
                      {unit.tagline}
                    </p>

                    {/* DESCRIPTION ALWAYS VISIBLE
                        ON TOUCH DEVICES */}
                    <div
                      className="
                        mt-5
                        border-t
                        border-white/20
                        pt-4
                        min-[375px]:mt-6
                        min-[375px]:pt-5
                      "
                    >
                      <p
                        className="
                          max-w-md
                          text-[12px]
                          leading-5
                          text-white/65
                          min-[375px]:text-[13px]
                          min-[375px]:leading-6
                          sm:text-sm
                          sm:leading-7
                        "
                      >
                        {unit.description}
                      </p>

                      <div
                        className="
                          mt-5
                          flex items-center
                          gap-3
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.17em]
                          text-white
                          min-[375px]:text-[9px]
                        "
                      >
                        Explore Unit

                        <FiArrowRight />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {/* MOBILE INDICATOR */}
          <div
            className="
              mt-2
              flex items-center
              gap-1.5
              px-5
              min-[375px]:px-6
              sm:px-8
            "
          >
            {ministryUnits.map((unit, index) => (
              <span
                key={unit.id}
                className={
                  index === 0
                    ? "h-1 w-7 rounded-full bg-green-700"
                    : "h-1 w-3 rounded-full bg-black/15"
                }
              />
            ))}
          </div>
        </div>

        {/* =========================================
            DESKTOP UNITS
            ORIGINAL LAYOUT
        ========================================= */}

        <Stagger className="hidden gap-px bg-black/10 lg:grid lg:grid-cols-3">
          {ministryUnits.map((unit) => (
            <StaggerItem key={unit.id}>
              <Link
                href={`/ministries/${unit.id}`}
                className="group relative block min-h-[620px] overflow-hidden bg-black"
              >
                {/* IMAGE */}
                <Reveal className="absolute inset-0">
                  <motion.img
                    src={unit.image}
                    alt={unit.name}
                    initial={{
                      scale: 1.08,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.3,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </Reveal>

                {/* OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5" />

                <div className="absolute inset-0 bg-green-900/0 transition-colors duration-700 group-hover:bg-green-900/35" />

                {/* NUMBER */}
                <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between p-7 lg:p-8">
                  <span className="text-[10px] font-semibold tracking-[0.25em] text-white/60">
                    {unit.number}
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-500 group-hover:-rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    <FiArrowDownRight />
                  </span>
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 z-10 w-full p-7 lg:p-8">
                  <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.28em] text-green-400">
                    Ministry Unit
                  </p>

                  <h3 className="max-w-sm text-4xl font-medium leading-[0.95] tracking-[-0.045em] text-white lg:text-5xl">
                    {unit.name}
                  </h3>

                  <p className="mt-5 text-sm font-medium text-white/55">
                    {unit.tagline}
                  </p>

                  <div className="grid grid-rows-[0fr] transition-all duration-700 group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="translate-y-5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="mt-7 border-t border-white/20 pt-6">
                          <p className="max-w-md text-sm leading-7 text-white/70">
                            {unit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default UnitsMinistries;