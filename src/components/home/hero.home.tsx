"use client";

import { useRef } from "react";
import Link from "next/link";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const HeroHome = () => {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "10%"]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-6%"]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0.25]
  );

  return (
    <section
      ref={heroRef}
      className="
        relative flex min-h-[100svh] items-end overflow-hidden bg-black
        sm:min-h-screen
      "
    >
      {/* Background */}
      <motion.div
        style={{
          y: backgroundY,
        }}
        initial={{
          scale: 1.08,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          duration: 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute -inset-[6%]"
      >
        <motion.img
          src="/images/church-hero.jpg"
          alt="Church worship service"
          animate={{
            scale: [1.02, 1.055, 1.02],
            x: ["0%", "-0.7%", "0%"],
            y: ["0%", "-0.5%", "0%"],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Bottom Cinematic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Very subtle animated light layer */}
      <motion.div
        animate={{
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent"
      />

      {/* Content */}
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="
          relative z-10 mx-auto w-full max-w-[1440px]
          px-5 pb-8 pt-28
          min-[375px]:px-6 min-[375px]:pb-10
          sm:pb-12 sm:pt-32
          md:pb-14 md:pt-36
          lg:px-10 lg:pb-20 lg:pt-40
        "
      >
        <div className="max-w-6xl">
          {/* Eyebrow */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mb-4 flex items-center gap-3
              text-[10px] font-semibold uppercase
              tracking-[0.25em] text-white/70
              sm:mb-5 sm:text-[11px] sm:tracking-[0.28em]
              md:mb-6 md:text-xs md:tracking-[0.3em]
            "
          >
            <motion.span
              initial={{
                width: 0,
              }}
              animate={{
                width: 32,
              }}
              transition={{
                duration: 0.8,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative h-px overflow-hidden bg-green-500"
            >
              <motion.span
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 left-0 w-1/2 bg-white/80"
              />
            </motion.span>

            Welcome Home
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 55,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-5xl
              text-[clamp(2.65rem,13vw,4rem)]
              font-semibold leading-[0.9]
              tracking-[-0.055em] text-white
              sm:text-[clamp(3.2rem,11vw,5rem)]
              md:text-[clamp(4.5rem,9vw,6.5rem)]
              lg:text-[clamp(5rem,8vw,8rem)]
              lg:leading-[0.88]
              lg:tracking-[-0.06em]
            "
          >
            <motion.span
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              A PLACE TO
            </motion.span>

            <motion.span
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.48,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block text-green-500"
            >
              KNOW GOD.
            </motion.span>

            <motion.span
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.61,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
            >
              FIND FAMILY.
            </motion.span>
          </motion.h1>

          {/* Motto */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.78,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-5 max-w-xl text-sm font-medium italic
              tracking-[-0.01em] text-white/70
              sm:mt-6 sm:text-base
              md:mt-7 md:text-lg
            "
          >
            “Where love rises and never sets.”
          </motion.p>

          {/* Bottom Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-6 flex flex-col justify-between
              gap-5 border-t border-white/20 pt-5
              sm:mt-8 sm:gap-6 sm:pt-6
              md:mt-10 md:flex-row md:items-end md:gap-8 md:pt-7
            "
          >
            {/* Service Time */}
            <div className="shrink-0">
              <p className="text-xs text-white/50 sm:text-sm">
                Sunday Service
              </p>

              <p className="mt-1 text-base text-white sm:text-lg">
                Sundays · 9:00 AM
              </p>
            </div>

            {/* Buttons */}
            <div className="flex w-full gap-2.5 sm:w-auto sm:gap-3">
              <motion.div
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="min-w-0 flex-1 sm:flex-none"
              >
                <Link
                  href="/contact"
                  className="
                    block whitespace-nowrap bg-green-700
                    px-4 py-3.5 text-center text-xs
                    font-medium text-white
                    transition-colors duration-300
                    hover:bg-green-800
                    min-[375px]:px-5
                    sm:px-7 sm:py-4 sm:text-sm
                  "
                >
                  Plan Your Visit
                </Link>
              </motion.div>

              <motion.div
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="min-w-0 flex-1 sm:flex-none"
              >
                <Link
                  href="/sermons"
                  className="
                    block whitespace-nowrap border border-white/30
                    px-4 py-3.5 text-center text-xs
                    font-medium text-white
                    transition-colors duration-300
                    hover:bg-white hover:text-black
                    min-[375px]:px-5
                    sm:px-7 sm:py-4 sm:text-sm
                  "
                >
                  Watch Sermons
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 1.3,
        }}
        className="absolute bottom-6 right-6 z-10 hidden items-center gap-3 lg:flex lg:right-10"
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
          Scroll
        </span>

        <div className="relative h-10 w-px overflow-hidden bg-white/20">
          <motion.span
            animate={{
              y: [-40, 40],
            }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 h-4 w-px bg-green-500"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroHome;