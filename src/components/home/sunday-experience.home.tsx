"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const SundayExperienceHome = () => {
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
    ["2%", "-3%"]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.85, 1, 1, 0.9]
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-black text-white"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid min-h-[720px] lg:grid-cols-2">

          {/* Image Side */}
          <div className="relative min-h-[480px] overflow-hidden lg:min-h-full">
            <motion.div
              style={{
                y: imageY,
              }}
              className="absolute -inset-[6%]"
            >
              <motion.img
                src="/images/sunday-service.jpg"
                alt="Church congregation during Sunday service"
                animate={{
                  scale: [1.06, 1.085, 1.06],
                  x: ["0%", "-0.5%", "0%"],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-full object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

            {/* Subtle green atmosphere */}
            <motion.div
              animate={{
                opacity: [0.02, 0.07, 0.02],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-0 bg-green-700"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
                delay: 0.45,
              }}
              className="absolute bottom-6 left-6 z-10 md:bottom-10 md:left-10"
            >
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                Worship · Word · Community

                <span className="relative h-px w-10 overflow-hidden bg-white/30">
                  <motion.span
                    animate={{
                      x: ["-100%", "220%"],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-green-400"
                  />
                </span>
              </p>
            </motion.div>
          </div>

          {/* Content */}
          <motion.div
            style={{
              y: contentY,
              opacity: contentOpacity,
            }}
            className="flex items-center px-6 py-20 md:px-12 lg:px-16 lg:py-24"
          >
            <div className="w-full">

              {/* Section label */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-green-500"
              >
                <span className="relative h-px w-8 overflow-hidden bg-green-500">
                  <motion.span
                    animate={{
                      x: ["-120%", "220%"],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-green-200"
                  />
                </span>

                This Sunday
              </motion.p>

              {/* Heading */}
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
              >
                Come as

                <motion.span
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
                    delay: 0.25,
                  }}
                  className="block text-green-500"
                >
                  you are.
                </motion.span>
              </motion.h2>

              {/* Description */}
              <motion.p
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
                  delay: 0.25,
                }}
                className="mt-8 max-w-lg text-base leading-7 text-white/60"
              >
                There&apos;s a place for you here. Join us for a time of
                worship, God&apos;s Word, prayer and genuine community.
              </motion.p>

              {/* Service details */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.4,
                }}
                className="mt-12 border-y border-white/15"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                  }}
                  className="grid grid-cols-[100px_1fr] border-b border-white/15 py-5"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                    When
                  </p>

                  <p className="text-sm font-medium">
                    Sundays · 9:00 AM
                  </p>
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.62,
                  }}
                  className="grid grid-cols-[100px_1fr] py-5"
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                    Where
                  </p>

                  <p className="text-sm font-medium">
                    TACSFON FAMILY HOUSE, <br />
                    New GEN. AREA, Under G, OGBOMOSO
                  </p>
                </motion.div>
              </motion.div>

              {/* CTA */}
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
                  delay: 0.7,
                }}
                className="mt-10 flex flex-wrap gap-3"
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
                    href="/contact"
                    className="block bg-green-700 px-7 py-4 text-sm font-semibold transition-colors duration-300 hover:bg-green-600"
                  >
                    Plan Your Visit
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                >
                  <Link
                    href="/contact"
                    className="group flex items-center gap-3 px-4 py-4 text-sm font-medium text-white/70 transition hover:text-white"
                  >
                    Get Directions

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SundayExperienceHome;