"use client";

import { motion } from "framer-motion";

import { dailyScriptures } from "@/data/scriptures.data";

const ScriptureHome = () => {
  const today = new Date();

  const startOfYear = new Date(
    today.getFullYear(),
    0,
    0
  );

  const diff =
    today.getTime() - startOfYear.getTime();

  const oneDay =
    1000 * 60 * 60 * 24;

  const dayOfYear = Math.floor(
    diff / oneDay
  );

  const scriptureIndex = Math.min(
    Math.max(dayOfYear - 1, 0),
    364
  );

  const scripture =
    dailyScriptures[scriptureIndex];

  const formattedDate =
    today.toLocaleDateString("en-NG", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  return (
    <section
      className="
        relative overflow-hidden bg-black
        px-5 py-16 text-white
        min-[375px]:px-6
        sm:py-20
        md:py-28
        lg:px-10 lg:py-44
      "
    >
      {/* Large Decorative Scripture Mark */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none absolute
          -right-6 top-0 hidden
          select-none text-[18rem]
          font-serif leading-none
          text-white/[0.025]
          lg:block
        "
      >
        ”
      </motion.div>

      {/* Subtle Green Atmosphere */}
      <motion.div
        animate={{
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-br
          from-green-700/20
          via-transparent
          to-transparent
        "
      />

      <div className="relative z-10 mx-auto max-w-[1400px]">

        {/* ==========================================
            TOP
        ========================================== */}
        <div
          className="
            grid gap-5
            border-b border-white/15
            pb-6
            sm:gap-6 sm:pb-8
            md:gap-8 md:pb-10
            lg:grid-cols-[0.7fr_1.3fr]
            lg:items-end lg:gap-12
          "
        >
          {/* Label */}
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
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p
              className="
                flex items-center gap-3
                text-[9px] font-semibold
                uppercase tracking-[0.24em]
                text-green-500
                min-[375px]:text-[10px]
                min-[375px]:tracking-[0.3em]
              "
            >
              <span
                className="
                  relative h-px w-8
                  shrink-0 overflow-hidden
                  bg-green-500/50
                  min-[375px]:w-10
                "
              >
                <motion.span
                  animate={{
                    x: ["-120%", "220%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute inset-y-0 left-0
                    w-1/2 bg-green-400
                  "
                />
              </span>

              Scripture for Today
            </p>
          </motion.div>

          {/* Date */}
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
              duration: 0.7,
              delay: 0.1,
            }}
            className="lg:text-right"
          >
            <p
              className="
                text-[9px] font-medium
                uppercase tracking-[0.18em]
                text-white/35
                min-[375px]:text-[10px]
                min-[375px]:tracking-[0.25em]
              "
            >
              {formattedDate}
            </p>
          </motion.div>
        </div>

        {/* ==========================================
            SCRIPTURE
        ========================================== */}
        <div
          className="
            py-10
            min-[375px]:py-12
            sm:py-14
            md:py-20
            lg:py-28
          "
        >
          <motion.blockquote
            key={scripture.day}
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
              amount: 0.35,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-6xl
              break-words
              text-[clamp(2rem,9.5vw,3rem)]
              font-medium
              leading-[1.06]
              tracking-[-0.045em]
              text-white
              sm:text-5xl
              md:text-6xl
              lg:text-[5.8rem]
              lg:leading-[1.05]
            "
          >
            “{scripture.verse}”
          </motion.blockquote>

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
              delay: 0.25,
            }}
            className="
              mt-7 flex items-center gap-3
              min-[375px]:mt-8
              sm:mt-10 sm:gap-4
            "
          >
            <span
              className="
                h-px w-8 shrink-0
                bg-green-500
                sm:w-10
              "
            />

            <p
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.16em]
                text-green-500
                min-[375px]:text-xs
                min-[375px]:tracking-[0.2em]
              "
            >
              {scripture.reference}
            </p>
          </motion.div>
        </div>

        {/* ==========================================
            BOTTOM DETAIL
        ========================================== */}
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
            delay: 0.3,
          }}
          className="
            flex flex-col justify-between
            gap-5 border-t border-white/15
            pt-6
            sm:pt-8
            md:flex-row md:items-center
          "
        >
          <p
            className="
              max-w-md
              text-xs leading-5
              text-white/40
              min-[375px]:text-sm
              min-[375px]:leading-6
            "
          >
            Take a moment. Read it again. Carry it with you today.
          </p>

          <div className="flex items-center gap-3">
            <span
              className="
                text-[8px] font-semibold
                uppercase tracking-[0.2em]
                text-white/30
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.25em]
              "
            >
              Daily Word
            </span>

            <span
              className="
                relative h-px w-10
                overflow-hidden bg-white/15
                min-[375px]:w-12
              "
            >
              <motion.span
                animate={{
                  x: ["-100%", "220%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="
                  absolute inset-y-0 left-0
                  w-1/2 bg-green-500
                "
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScriptureHome;