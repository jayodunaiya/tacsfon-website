"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  ministryUnits,
  ministrySubgroups,
} from "@/data/ministries.data";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const MinistriesHome = () => {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">

        {/* ==========================================
            SECTION HEADING
        ========================================== */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">

          <FadeUp>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
              <span className="h-px w-10 bg-green-700" />
              Our Ministries
            </p>
          </FadeUp>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <FadeUp delay={0.1}>
              <h2 className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">
                Find where

                <span className="block text-green-700">
                  you belong.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link
                href="/ministries"
                className="group mb-2 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]"
              >
                Explore Ministries

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                  <FiArrowUpRight />
                </span>
              </Link>
            </FadeUp>

          </div>
        </div>

        {/* ==========================================
            INTRODUCTION
        ========================================== */}
        <div className="mb-14 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-2">

          <FadeUp delay={0.15}>
            <p className="max-w-xl text-base leading-7 text-black/55">
              Church is more than attending a service. Our ministries
              create spaces to grow, serve, build relationships and
              become part of something bigger than yourself.
            </p>
          </FadeUp>

          <FadeUp
            delay={0.25}
            className="md:flex md:justify-end"
          >
            <p className="max-w-sm text-sm leading-6 text-black/40">
              From our core units to specialised subgroups,
              there&apos;s a place for every member to serve
              and grow.
            </p>
          </FadeUp>

        </div>

        {/* ==========================================
            UNITS
        ========================================== */}
        <div>

          <FadeUp>
            <div className="mb-6 flex items-center justify-between">

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">
                Units
              </p>

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/25">
                01
              </span>

            </div>
          </FadeUp>

          <Stagger className="grid gap-5 md:grid-cols-3">

            {ministryUnits.map((unit) => (
              <StaggerItem key={unit.id}>

                <motion.div
                  whileHover={{
                    y: -8,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                >

                  <Link
  href={`/ministries/${unit.id}`}
  className="group relative block min-h-[430px] overflow-hidden bg-black md:min-h-[500px]"
>

                    {/* Background Image */}
                    <motion.img
                      src={unit.image}
                      alt={unit.name}
                      initial={{
                        scale: 1.05,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                    />

                    {/* Base Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/5" />

                    {/* Hover Green Overlay */}
                    <div className="absolute inset-0 bg-green-800/0 transition-all duration-500 group-hover:bg-green-800/70" />

                    {/* Top Row */}
                    <div className="absolute left-0 top-0 z-10 flex w-full items-start justify-between p-6 lg:p-8">

                      <span className="text-[10px] font-semibold tracking-[0.2em] text-white/55">
                        {unit.number}
                      </span>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                        <FiArrowRight />
                      </span>

                    </div>

                    {/* Main Content */}
                    <div className="absolute bottom-0 left-0 z-10 w-full p-6 lg:p-8">

                      <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-green-400 transition-colors duration-300 group-hover:text-white/60">
                        Ministry Unit
                      </p>

                      <h3 className="max-w-[280px] text-3xl font-medium leading-[1] tracking-[-0.04em] text-white md:text-4xl">
                        {unit.name}
                      </h3>

                      {/* Description revealed on hover */}
                      <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">

                        <div className="overflow-hidden">

                          <div className="translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                            <div className="mt-6 border-t border-white/25 pt-5">

                              <p className="text-sm leading-6 text-white/75">
                                {unit.tagline}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </Link>

                </motion.div>

              </StaggerItem>
            ))}

          </Stagger>

        </div>

        {/* ==========================================
            SUBGROUPS
        ========================================== */}
        <div className="mt-24 lg:mt-32">

          <FadeUp>
            <div className="mb-8 flex items-end justify-between">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-green-700">
                  Subgroups
                </p>

                <h3 className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  Grow. Serve.

                  <span className="text-black/30">
                    {" "}
                    Build together.
                  </span>
                </h3>

              </div>

              <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-black/25 sm:block">
                02
              </span>

            </div>
          </FadeUp>

          <Stagger className="border-t border-black/10">

              {ministrySubgroups.map((subgroup) => (
  <StaggerItem key={subgroup.id}>
    <Link
      href={`/ministries/${subgroup.id}`}
      className="group relative grid gap-5 border-b border-black/10 py-6 transition-all duration-300 sm:grid-cols-[80px_1fr_auto] sm:items-center lg:py-8"
    >

                    {/* Hover Background */}
                    <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-[#F7F7F3] transition-transform duration-300 ease-out group-hover:scale-x-100" />

                    {/* Number */}
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-black/25 transition-colors duration-300 group-hover:text-green-700">
                      {subgroup.number}
                    </span>

                    {/* Name + Description */}
                    <div>
                      <h4 className="text-2xl font-medium tracking-[-0.03em] transition-all duration-300 group-hover:translate-x-2 group-hover:text-green-700 sm:text-3xl lg:text-4xl">
                        {subgroup.name}
                      </h4>

                      <p className="mt-2 max-w-xl text-xs leading-5 text-black/35 transition-all duration-300 group-hover:translate-x-2 group-hover:text-black/50 sm:text-sm">
                        {subgroup.shortDescription}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white sm:flex">
                      <FiArrowRight />
                    </span>

                  </Link>

                </StaggerItem>
              ))}

            </Stagger>

        </div>

        {/* ==========================================
            CLOSING CTA
        ========================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 overflow-hidden bg-green-700 px-8 py-12 text-white md:px-12 md:py-16 lg:mt-28 lg:px-16"
        >

          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
            >

              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                Get Involved
              </p>

              <h3 className="mt-5 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Your place in the family

                <span className="block text-white/55">
                  is waiting.
                </span>
              </h3>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="lg:flex lg:justify-end"
            >

              <motion.div
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
              >

                <Link
                  href="/ministries"
                  className="group inline-flex items-center gap-4 bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:bg-black hover:text-white"
                >
                  Find Your Ministry

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>

              </motion.div>

            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default MinistriesHome;