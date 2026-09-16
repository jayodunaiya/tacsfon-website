"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowRight,
  FiPlus,
} from "react-icons/fi";

import { ministrySubgroups } from "@/data/ministries.data";

import FadeUp from "@/components/motion/fade-up.motion";

const SubgroupsMinistries = () => {
  const [activeId, setActiveId] = useState(
    ministrySubgroups[0]?.id ?? ""
  );

  const activeSubgroup =
    ministrySubgroups.find(
      (subgroup) => subgroup.id === activeId
    ) ?? ministrySubgroups[0];

  if (!activeSubgroup) return null;

  return (
    <section
      id="subgroups"
      className="relative overflow-hidden bg-[#F7F7F3] px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40"
    >

      {/* Decorative Word */}
      <motion.span
        animate={{
          x: ["0%", "-3%", "0%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[-4%] top-12 hidden select-none text-[15rem] font-medium leading-none tracking-[-0.08em] text-black/[0.025] xl:block"
      >
        SERVE
      </motion.span>

      <div className="relative z-10 mx-auto max-w-[1400px]">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

          <FadeUp>
            <div>

              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                <span className="h-px w-10 bg-green-700" />

                Our Subgroups
              </p>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-black/30">
                12 ways to serve
              </p>

            </div>
          </FadeUp>

          <div className="grid gap-8 md:grid-cols-[1fr_300px] md:items-end">

            <FadeUp delay={0.1}>
              <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">
                Your gifts have

                <span className="block text-green-700">
                  somewhere to serve.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="max-w-sm text-sm leading-7 text-black/45">
                From worship and prayer to academics,
                communication and outreach, every subgroup
                contributes to the life of the fellowship.
              </p>
            </FadeUp>

          </div>

        </div>

        {/* =========================================
            DESKTOP
        ========================================= */}
        <div className="hidden grid-cols-[0.82fr_1.18fr] gap-16 lg:grid">

          {/* LEFT LIST */}
          <div className="border-t border-black/10">

            {ministrySubgroups.map((subgroup) => {
              const isActive =
                subgroup.id === activeSubgroup.id;

              return (
                <Link
                  key={subgroup.id}
                  href={`/ministries/${subgroup.id}`}
                  onMouseEnter={() => setActiveId(subgroup.id)}
                  className={`group relative flex items-center gap-5 border-b border-black/10 px-5 py-7 transition-colors duration-300 ${
                    isActive ? "bg-white" : "hover:bg-white/60"
                  }`}
                >

                  {/* Active Background */}
                  <span
                    className={`absolute inset-0 -z-10 origin-left bg-white transition-transform duration-500 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />

                  {/* Number */}
                  <span
                    className={`w-8 text-[9px] font-semibold tracking-[0.2em] transition-colors ${
                      isActive
                        ? "text-green-700"
                        : "text-black/25"
                    }`}
                  >
                    {subgroup.number}
                  </span>

                  {/* Name */}
                  <span
                    className={`flex-1 text-2xl font-medium tracking-[-0.035em] transition-all duration-300 xl:text-3xl ${
                      isActive
                        ? "translate-x-2 text-green-700"
                        : "text-black/70 group-hover:translate-x-1 group-hover:text-black"
                    }`}
                  >
                    {subgroup.name}
                  </span>

                  {/* Arrow */}
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "-rotate-45 border-green-700 bg-green-700 text-white"
                        : "border-black/10 text-black/30"
                    }`}
                  >
                    <FiArrowRight />
                  </span>

                </Link>
              );
            })}

          </div>

          {/* =====================================
              RIGHT PREVIEW
          ===================================== */}
          <div className="sticky top-28 h-fit">

            <AnimatePresence mode="wait">

              <motion.div
                key={activeSubgroup.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >

                {/* IMAGE */}
                <div className="relative h-[560px] overflow-hidden bg-black xl:h-[620px]">

                  <motion.img
                    key={activeSubgroup.image}
                    src={activeSubgroup.image}
                    alt={activeSubgroup.name}
                    initial={{
                      scale: 1.08,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Number */}
                  <motion.span
                    initial={{
                      opacity: 0,
                      x: 30,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.15,
                    }}
                    className="absolute right-7 top-5 text-[7rem] font-medium leading-none tracking-[-0.08em] text-white/15 xl:text-[9rem]"
                  >
                    {activeSubgroup.number}
                  </motion.span>

                  {/* Image Content */}
                  <div className="absolute bottom-7 left-7 right-7">

                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-green-400">
                      TACSFON LAUTECH
                    </p>

                    <p className="mt-3 max-w-lg text-xl font-medium leading-snug text-white">
                      {activeSubgroup.shortDescription}
                    </p>

                  </div>

                </div>

                {/* DESCRIPTION */}
                <div className="grid gap-8 border-x border-b border-black/10 bg-white p-8 xl:grid-cols-[0.65fr_1.35fr] xl:p-10">

                  <div>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                      {activeSubgroup.number} / 12
                    </p>

                    <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em] xl:text-4xl">
                      {activeSubgroup.name}
                    </h3>

                  </div>

                  <div>

                    <p className="text-sm leading-7 text-black/50">
                      {activeSubgroup.description}
                    </p>

                    {/* DEDICATED PAGE LINK */}

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>

        {/* =========================================
            MOBILE / TABLET
        ========================================= */}
        <div className="border-t border-black/10 lg:hidden">

          {ministrySubgroups.map((subgroup) => {
            const isActive =
              subgroup.id === activeId;

            return (
              <div
                key={subgroup.id}
                className="border-b border-black/10"
              >

                {/* Accordion Trigger */}
                <Link
  href={`/ministries/${subgroup.id}`}
  className="group flex w-full items-center gap-4 py-6 text-left"
>

                  <span
                    className={`w-8 text-[9px] font-semibold tracking-[0.2em] ${
                      isActive
                        ? "text-green-700"
                        : "text-black/25"
                    }`}
                  >
                    {subgroup.number}
                  </span>

                  <span
                    className={`flex-1 text-2xl font-medium tracking-[-0.035em] sm:text-3xl ${
                      isActive
                        ? "text-green-700"
                        : "text-black"
                    }`}
                  >
                    {subgroup.name}
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                <FiArrowRight />
                </span>

                </Link>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>

                  {isActive && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="overflow-hidden"
                    >

                      <div className="pb-8">

                        {/* IMAGE */}
                        <div className="relative h-[360px] overflow-hidden bg-black sm:h-[460px]">

                          <motion.img
                            initial={{
                              scale: 1.08,
                            }}
                            animate={{
                              scale: 1,
                            }}
                            transition={{
                              duration: 0.8,
                            }}
                            src={subgroup.image}
                            alt={subgroup.name}
                            className="h-full w-full object-cover"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          <div className="absolute bottom-6 left-6 right-6">

                            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-400">
                              {subgroup.number} / 12
                            </p>

                            <p className="mt-3 text-lg font-medium leading-7 text-white">
                              {subgroup.shortDescription}
                            </p>

                          </div>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="bg-white p-6 sm:p-8">

                          <p className="text-sm leading-7 text-black/50">
                            {subgroup.description}
                          </p>

                          {/* DEDICATED PAGE LINK */}
                          <Link
                            href={`/ministries/${subgroup.id}`}
                            className="group mt-7 inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-black"
                          >
                            Explore {subgroup.name}

                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-black">
                              <FiArrowRight />
                            </span>

                          </Link>

                        </div>

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default SubgroupsMinistries;