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
    today.getTime() -
    startOfYear.getTime();

  const oneDay =
    1000 * 60 * 60 * 24;

  const dayOfYear =
    Math.floor(diff / oneDay);

  const scriptureIndex =
    Math.min(
      Math.max(
        dayOfYear - 1,
        0
      ),
      dailyScriptures.length - 1
    );

  const scripture =
    dailyScriptures[
      scriptureIndex
    ];

  const formattedDate =
    today.toLocaleDateString(
      "en-NG",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );

  if (!scripture) {
    return null;
  }

  return (
    <section
      className="
        relative overflow-hidden
        bg-black px-5
        py-12 text-white
        min-[375px]:px-6
        sm:py-14
        md:py-16
        lg:px-10
        lg:py-20
      "
    >
      {/* Ambient green */}
      <motion.div
        animate={{
          opacity: [
            0.02,
            0.055,
            0.02,
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-br
          from-green-700/20
          via-transparent
          to-transparent
        "
      />

      {/* Decorative quote */}
      <div
        className="
          pointer-events-none
          absolute
          -right-4 -top-10
          hidden select-none
          font-serif
          text-[16rem]
          leading-none
          text-white/[0.025]
          lg:block
        "
      >
        ”
      </div>

      <div
        className="
          relative z-10
          mx-auto
          max-w-[1400px]
        "
      >
        {/* TOP */}

        <div
          className="
            flex flex-col
            gap-3
            border-b
            border-white/15
            pb-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              flex items-center
              gap-3
            "
          >
            <span
              className="
                h-px w-8
                bg-green-500
              "
            />

            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-green-500
                sm:text-[10px]
              "
            >
              Scripture for Today
            </p>
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-white/35
              sm:text-[10px]
            "
          >
            {formattedDate}
          </motion.p>
        </div>

        {/* SCRIPTURE */}

        <div
          className="
            grid gap-8
            py-8
            sm:py-10
            md:grid-cols-[1.35fr_0.65fr]
            md:items-end
            md:gap-12
            lg:py-12
          "
        >
          <div>
            <motion.blockquote
              key={
                scripture.day
              }
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.75,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                max-w-5xl
                text-[clamp(1.85rem,7vw,2.6rem)]
                font-medium
                leading-[1.08]
                tracking-[-0.04em]
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[3.7rem]
              "
            >
              “
              {
                scripture.verse
              }
              ”
            </motion.blockquote>

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="
                mt-6
                flex items-center
                gap-3
              "
            >
              <span
                className="
                  h-px w-8
                  bg-green-500
                "
              />

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-green-500
                  sm:text-xs
                "
              >
                {
                  scripture.reference
                }
              </p>
            </motion.div>
          </div>

          {/* Small reflection */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              delay: 0.25,
            }}
            className="
              border-t
              border-white/15
              pt-5
              md:border-l
              md:border-t-0
              md:pl-8
              md:pt-0
            "
          >
            <p
              className="
                mb-2
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-white/30
              "
            >
              Daily Word
            </p>

            <p
              className="
                max-w-sm
                text-xs
                leading-5
                text-white/45
                sm:text-sm
                sm:leading-6
              "
            >
              Take a moment.
              Read it again.
              Carry it with you
              today.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScriptureHome;