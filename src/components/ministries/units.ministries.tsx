"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";

import { ministryUnits } from "@/data/ministries.data";

import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const UnitsMinistries = () => {
  return (
    <section
      id="units"
      className="relative overflow-hidden bg-white px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

          <FadeUp>
            <div>
              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                <span className="h-px w-10 bg-green-700" />
                Our Units
              </p>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-black/30">
                03 communities
              </p>
            </div>
          </FadeUp>

          <div className="grid gap-8 md:grid-cols-[1fr_300px] md:items-end">

            <FadeUp delay={0.1}>
              <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">
                Growing together.

                <span className="block text-green-700">
                  Caring for one another.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="max-w-sm text-sm leading-7 text-black/45">
                Our units create intentional spaces for fellowship,
                spiritual development, support and meaningful
                relationships within the family.
              </p>
            </FadeUp>

          </div>
        </div>

        {/* =========================================
            UNITS
        ========================================= */}
        <Stagger className="grid gap-px bg-black/10 lg:grid-cols-3">

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
                      ease: [0.22, 1, 0.36, 1],
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