"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

import { aboutBeliefs } from "@/data/about.data";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const MOBILE_VISIBLE_COUNT = 3;

const BeliefRow = ({
  belief,
  index,
}: {
  belief: (typeof aboutBeliefs)[number];
  index: number;
}) => {
  return (
    <div
      className="
        grid gap-4
        border-b border-black/10
        py-6
        min-[375px]:py-7
        sm:grid-cols-[50px_1fr]
        sm:gap-x-5 sm:gap-y-3
        sm:py-8
        md:grid-cols-[90px_0.8fr_1.2fr]
        md:items-start
        md:gap-5
        md:py-10
      "
    >
      {/* Number */}
      <p
        className="
          text-[9px] font-semibold
          tracking-[0.18em]
          text-green-700
          min-[375px]:text-[10px]
          min-[375px]:tracking-[0.2em]
        "
      >
        {String(index + 1).padStart(2, "0")}
      </p>

      {/* Title */}
      <h3
        className="
          max-w-md
          text-[1.45rem] font-medium
          leading-[1.05]
          tracking-[-0.035em]
          min-[375px]:text-2xl
          md:text-3xl
        "
      >
        {belief.title}
      </h3>

      {/* Description */}
      <p
        className="
          max-w-xl
          text-[13px] leading-6
          text-black/50
          min-[375px]:text-sm
          min-[375px]:leading-7
          sm:col-start-2
          md:col-start-auto
        "
      >
        {belief.description}
      </p>
    </div>
  );
};

const BeliefsAbout = () => {
  const [showAll, setShowAll] = useState(false);

  const firstBeliefs = aboutBeliefs.slice(0, MOBILE_VISIBLE_COUNT);
  const remainingBeliefs = aboutBeliefs.slice(MOBILE_VISIBLE_COUNT);

  return (
    <section
      className="
        px-5 py-16
        min-[375px]:px-6
        sm:py-20
        md:py-32
        lg:px-10 lg:py-40
      "
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          className="
            grid gap-7
            min-[375px]:gap-8
            sm:gap-10
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end
          "
        >
          <FadeUp>
            <div>
              <p
                className="
                  flex items-center gap-3
                  text-[9px] font-semibold
                  uppercase tracking-[0.24em]
                  text-green-700
                  min-[375px]:text-[10px]
                  min-[375px]:tracking-[0.3em]
                "
              >
                <span className="h-px w-8 bg-green-700 sm:w-10" />

                What We Believe & Teach
              </p>
            </div>
          </FadeUp>

          <div>
            <FadeUp>
              <h2
                className="
                  max-w-5xl
                  text-[clamp(2.65rem,11.5vw,4rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  md:text-7xl
                "
              >
                Rooted in truth.

                <span className="block text-black/30">
                  Lived out in everyday life.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p
                className="
                  mt-6 max-w-2xl
                  text-sm leading-7
                  text-black/55
                  sm:mt-8
                  md:text-base
                "
              >
                Our teaching is centred on Scripture and focused on helping
                believers know God, grow in Christ and live faithfully in every
                area of life.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ==========================================
            MOBILE BELIEFS
            First 3 initially
        ========================================== */}

        <div className="mt-12 border-t border-black/10 md:hidden">
          {firstBeliefs.map((belief, index) => (
            <BeliefRow
              key={belief.id}
              belief={belief}
              index={index}
            />
          ))}

          {/* Remaining beliefs */}

          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                key="remaining-beliefs"
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
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                {remainingBeliefs.map((belief, index) => (
                  <BeliefRow
                    key={belief.id}
                    belief={belief}
                    index={index + MOBILE_VISIBLE_COUNT}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* See more / less */}

          {remainingBeliefs.length > 0 && (
            <div className="flex justify-center pt-7">
              <button
                type="button"
                onClick={() => setShowAll((current) => !current)}
                aria-expanded={showAll}
                className="
                  group flex items-center gap-3
                  border-b border-black/20
                  pb-2
                  text-[10px] font-semibold
                  uppercase tracking-[0.16em]
                  text-black
                  transition-colors duration-300
                  hover:border-green-700
                  hover:text-green-700
                "
              >
                {showAll ? "Show Less" : "See All Beliefs"}

                <FiChevronDown
                  className={`
                    text-sm
                    transition-transform duration-300
                    ${showAll ? "rotate-180" : ""}
                  `}
                />
              </button>
            </div>
          )}
        </div>

        {/* ==========================================
            TABLET + DESKTOP
            Show everything normally
        ========================================== */}

        <Stagger className="mt-20 hidden border-t border-black/10 md:block">
          {aboutBeliefs.map((belief, index) => (
            <StaggerItem key={belief.id}>
              <BeliefRow
                belief={belief}
                index={index}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default BeliefsAbout;