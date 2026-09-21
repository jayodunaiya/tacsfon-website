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
  /*
   * Desktop preview:
   * Keep the first subgroup selected by default so the
   * right-hand preview is never empty.
   */
  const [activeId, setActiveId] = useState(
    ministrySubgroups[0]?.id ?? ""
  );

  /*
   * Mobile/tablet accordion:
   * Separate state means mobile can begin with every
   * subgroup collapsed without affecting desktop.
   */
  const [mobileActiveId, setMobileActiveId] =
    useState<string | null>(null);

  const activeSubgroup =
    ministrySubgroups.find(
      (subgroup) => subgroup.id === activeId
    ) ?? ministrySubgroups[0];

  if (!activeSubgroup) return null;

  const toggleMobileSubgroup = (id: string) => {
    setMobileActiveId((current) =>
      current === id ? null : id
    );
  };

  return (
    <section
      id="subgroups"
      className="
        relative overflow-hidden
        bg-[#F7F7F3]
        px-5 py-16
        text-black
        min-[375px]:px-6
        min-[375px]:py-20
        sm:px-8
        sm:py-24
        md:py-32
        lg:px-10
        lg:py-40
      "
    >
      {/* =========================================
          DECORATIVE WORD
      ========================================= */}

      <motion.span
        animate={{
          x: ["0%", "-3%", "0%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute right-[-4%] top-12
          hidden select-none
          text-[15rem]
          font-medium
          leading-none
          tracking-[-0.08em]
          text-black/[0.025]
          xl:block
        "
      >
        SERVE
      </motion.span>

      <div className="relative z-10 mx-auto max-w-[1400px]">

        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className="
            mb-9
            grid gap-7
            min-[375px]:mb-10
            min-[375px]:gap-8
            sm:mb-12
            sm:gap-10
            md:mb-14
            lg:mb-16
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end
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

                Our Subgroups
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
                12 ways to serve
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
                Your gifts have

                <span className="block text-green-700">
                  somewhere to serve.
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

          {/* =====================================
              LEFT LIST
          ===================================== */}

          <div className="border-t border-black/10">
            {ministrySubgroups.map((subgroup) => {
              const isActive =
                subgroup.id === activeSubgroup.id;

              return (
                <Link
                  key={subgroup.id}
                  href={`/ministries/${subgroup.id}`}
                  onMouseEnter={() =>
                    setActiveId(subgroup.id)
                  }
                  className={`
                    group relative
                    flex items-center
                    gap-5
                    border-b border-black/10
                    px-5 py-7
                    transition-colors
                    duration-300
                    ${
                      isActive
                        ? "bg-white"
                        : "hover:bg-white/60"
                    }
                  `}
                >
                  {/* ACTIVE BACKGROUND */}
                  <span
                    className={`
                      absolute inset-0
                      -z-10
                      origin-left
                      bg-white
                      transition-transform
                      duration-500
                      ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  />

                  {/* NUMBER */}
                  <span
                    className={`
                      w-8
                      text-[9px]
                      font-semibold
                      tracking-[0.2em]
                      transition-colors
                      ${
                        isActive
                          ? "text-green-700"
                          : "text-black/25"
                      }
                    `}
                  >
                    {subgroup.number}
                  </span>

                  {/* NAME */}
                  <span
                    className={`
                      flex-1
                      text-2xl
                      font-medium
                      tracking-[-0.035em]
                      transition-all
                      duration-300
                      xl:text-3xl
                      ${
                        isActive
                          ? "translate-x-2 text-green-700"
                          : "text-black/70 group-hover:translate-x-1 group-hover:text-black"
                      }
                    `}
                  >
                    {subgroup.name}
                  </span>

                  {/* ARROW */}
                  <span
                    className={`
                      flex h-9 w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "-rotate-45 border-green-700 bg-green-700 text-white"
                          : "border-black/10 text-black/30"
                      }
                    `}
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

                  {/* NUMBER */}
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
                    className="
                      absolute
                      right-7 top-5
                      text-[7rem]
                      font-medium
                      leading-none
                      tracking-[-0.08em]
                      text-white/15
                      xl:text-[9rem]
                    "
                  >
                    {activeSubgroup.number}
                  </motion.span>

                  {/* IMAGE CONTENT */}
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
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =========================================
            MOBILE / TABLET
        ========================================= */}

        <div className="lg:hidden">

          {/* MOBILE INSTRUCTION */}
          <FadeUp>
            <div className="mb-4 flex items-center justify-between gap-4 border-y border-black/10 py-4">
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-black/35
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.2em]
                "
              >
                Tap a subgroup to preview
              </p>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 text-black/35">
                <FiPlus className="text-xs" />
              </span>
            </div>
          </FadeUp>

          <div className="border-t border-black/10">
            {ministrySubgroups.map((subgroup) => {
              const isActive =
                mobileActiveId === subgroup.id;

              const panelId =
                `subgroup-panel-${subgroup.id}`;

              return (
                <div
                  key={subgroup.id}
                  className="border-b border-black/10"
                >
                  {/* =================================
                      ACCORDION TRIGGER
                  ================================= */}

                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() =>
                      toggleMobileSubgroup(subgroup.id)
                    }
                    className="
                      group
                      flex w-full
                      items-center
                      gap-3
                      py-5
                      text-left
                      min-[375px]:gap-4
                      min-[375px]:py-6
                    "
                  >
                    {/* NUMBER */}
                    <span
                      className={`
                        w-7 shrink-0
                        text-[8px]
                        font-semibold
                        tracking-[0.18em]
                        transition-colors
                        duration-300
                        min-[375px]:w-8
                        min-[375px]:text-[9px]
                        min-[375px]:tracking-[0.2em]
                        ${
                          isActive
                            ? "text-green-700"
                            : "text-black/25"
                        }
                      `}
                    >
                      {subgroup.number}
                    </span>

                    {/* NAME */}
                    <span
                      className={`
                        min-w-0 flex-1
                        break-words
                        text-[1.35rem]
                        font-medium
                        leading-tight
                        tracking-[-0.035em]
                        transition-colors
                        duration-300
                        min-[375px]:text-2xl
                        sm:text-3xl
                        ${
                          isActive
                            ? "text-green-700"
                            : "text-black"
                        }
                      `}
                    >
                      {subgroup.name}
                    </span>

                    {/* PLUS */}
                    <motion.span
                      animate={{
                        rotate: isActive ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`
                        flex h-9 w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        transition-colors
                        duration-300
                        min-[375px]:h-10
                        min-[375px]:w-10
                        ${
                          isActive
                            ? "border-green-700 bg-green-700 text-white"
                            : "border-black/10 bg-transparent text-black/45"
                        }
                      `}
                    >
                      <FiPlus />
                    </motion.span>
                  </button>

                  {/* =================================
                      PREVIEW
                  ================================= */}

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={panelId}
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
                        <div className="pb-6 min-[375px]:pb-8">

                          {/* ==========================
                              IMAGE
                          ========================== */}

                          <div
                            className="
                              relative
                              h-[320px]
                              overflow-hidden
                              bg-black
                              min-[375px]:h-[360px]
                              sm:h-[460px]
                              md:h-[520px]
                            "
                          >
                            <motion.img
                              initial={{
                                scale: 1.08,
                              }}
                              animate={{
                                scale: 1,
                              }}
                              transition={{
                                duration: 0.8,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              }}
                              src={subgroup.image}
                              alt={subgroup.name}
                              className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                            {/* LARGE NUMBER */}
                            <span
                              className="
                                pointer-events-none
                                absolute
                                right-4 top-3
                                text-[4.5rem]
                                font-medium
                                leading-none
                                tracking-[-0.08em]
                                text-white/15
                                min-[375px]:right-5
                                min-[375px]:top-4
                                min-[375px]:text-[5.5rem]
                                sm:text-[7rem]
                              "
                            >
                              {subgroup.number}
                            </span>

                            {/* IMAGE CONTENT */}
                            <div
                              className="
                                absolute
                                bottom-5 left-5 right-5
                                min-[375px]:bottom-6
                                min-[375px]:left-6
                                min-[375px]:right-6
                                sm:bottom-7
                                sm:left-7
                                sm:right-7
                              "
                            >
                              <p
                                className="
                                  text-[7px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.2em]
                                  text-green-400
                                  min-[375px]:text-[8px]
                                  min-[375px]:tracking-[0.23em]
                                  sm:text-[9px]
                                  sm:tracking-[0.25em]
                                "
                              >
                                {subgroup.number} / 12
                              </p>

                              <p
                                className="
                                  mt-2.5
                                  max-w-xl
                                  text-base
                                  font-medium
                                  leading-6
                                  text-white
                                  min-[375px]:mt-3
                                  min-[375px]:text-lg
                                  min-[375px]:leading-7
                                  sm:text-xl
                                "
                              >
                                {subgroup.shortDescription}
                              </p>
                            </div>
                          </div>

                          {/* ==========================
                              DESCRIPTION
                          ========================== */}

                          <div
                            className="
                              border-x
                              border-b
                              border-black/10
                              bg-white
                              p-5
                              min-[375px]:p-6
                              sm:p-8
                            "
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p
                                  className="
                                    text-[7px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-green-700
                                    min-[375px]:text-[8px]
                                    sm:text-[9px]
                                  "
                                >
                                  Ministry Subgroup
                                </p>

                                <h3
                                  className="
                                    mt-2
                                    text-2xl
                                    font-medium
                                    tracking-[-0.04em]
                                    min-[375px]:text-[1.75rem]
                                    sm:text-3xl
                                  "
                                >
                                  {subgroup.name}
                                </h3>
                              </div>
                            </div>

                            <p
                              className="
                                mt-5
                                text-[13px]
                                leading-6
                                text-black/50
                                min-[375px]:text-sm
                                min-[375px]:leading-7
                              "
                            >
                              {subgroup.description}
                            </p>

                            {/* ==========================
                                DEDICATED PAGE LINK
                            ========================== */}

                            <Link
                              href={`/ministries/${subgroup.id}`}
                              className="
                                group
                                mt-6
                                inline-flex
                                max-w-full
                                items-center
                                gap-3
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[0.14em]
                                text-black
                                min-[375px]:mt-7
                                min-[375px]:gap-4
                                min-[375px]:text-[9px]
                                min-[375px]:tracking-[0.16em]
                                sm:text-[10px]
                                sm:tracking-[0.18em]
                              "
                            >
                              <span className="break-words">
                                Explore {subgroup.name}
                              </span>

                              <span
                                className="
                                  flex h-9 w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-green-700
                                  text-white
                                  transition-all
                                  duration-300
                                  group-hover:-rotate-45
                                  group-hover:bg-black
                                "
                              >
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
      </div>
    </section>
  );
};

export default SubgroupsMinistries;