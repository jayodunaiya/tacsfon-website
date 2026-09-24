"use client";

import { useRef } from "react";
import Link from "next/link";
import { Sermon } from "@/types/sermon.types";
import { useSermonPlayer } from "@/app/providers/sermon-player-provider";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";


import {
  FiArrowRight,
  FiArrowUpRight,
  FiDownload,
  FiPlay,
  FiPause,
} from "react-icons/fi";


interface LatestSermonHomeProps {
  sermon: Sermon | null;
}

const LatestSermonHome = ({
  sermon,
}: LatestSermonHomeProps) => {
  const sectionRef =
  useRef<HTMLElement>(null);

const {
  currentTrack,
  isPlaying: globalIsPlaying,
  playSermon,
  togglePlay,
} = useSermonPlayer();

const isCurrentSermon =
  currentTrack?.audioUrl ===
  sermon?.audio_url;

const isPlaying =
  isCurrentSermon &&
  globalIsPlaying;

const toggleAudio = async () => {
  if (!sermon?.audio_url) {
    return;
  }

  try {
    if (isCurrentSermon) {
      await togglePlay();
      return;
    }

    await playSermon({
      title: sermon.title,
      audioUrl:
        sermon.audio_url,
    });
  } catch (error) {
    console.error(
      "Unable to play sermon:",
      error
    );
  }
};

const handleDownload = async () => {
  if (!sermon?.audio_url) return;

  try {
    const response = await fetch(
      sermon.audio_url
    );

    if (!response.ok) {
      throw new Error(
        "Unable to download sermon."
      );
    }

    const blob =
      await response.blob();

    const objectUrl =
      URL.createObjectURL(blob);

    const safeTitle =
      sermon.title
        .trim()
        .replace(
          /[^a-zA-Z0-9-_ ]/g,
          ""
        )
        .replace(/\s+/g, "-");

    const extension =
      blob.type.includes("mpeg")
        ? "mp3"
        : blob.type.includes("wav")
          ? "wav"
          : blob.type.includes("ogg")
            ? "ogg"
            : "mp3";

    const link =
      document.createElement("a");

    link.href = objectUrl;

    link.download =
      `TACSFON-LAUTECH-${safeTitle || "Sermon"}.${extension}`;

    document.body.appendChild(
      link
    );

    link.click();
    link.remove();

    URL.revokeObjectURL(
      objectUrl
    );
  } catch (error) {
    console.error(
      "Download failed:",
      error
    );

    window.open(
      sermon.audio_url,
      "_blank",
      "noopener,noreferrer"
    );
  }
};

  if (!sermon) return null;

const sermonDate = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date(`${sermon.sermon_date}T00:00:00`));

const sermonImage =
  sermon.image_url || "/images/sermon.jpg";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", "5%"]
  );

  const wordY = useTransform(
    scrollYProgress,
    [0, 1],
    ["8%", "-12%"]
  );

  const floatingCardY = useTransform(
    scrollYProgress,
    [0, 1],
    ["3%", "-6%"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white text-black"
    >
      
      {/* Decorative Background Text */}
      <motion.div
        style={{
          y: wordY,
        }}
        initial={{
          opacity: 0,
          x: 80,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute right-[-40px] top-20 hidden select-none xl:block"
      >
        <motion.span
          animate={{
            x: [0, -12, 0],
            rotate: [0, -0.5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="block text-[12rem] font-semibold leading-none tracking-[-0.08em] text-black/[0.025]"
        >
          WORD
        </motion.span>
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 md:py-32 lg:px-10 lg:py-40">

        {/* Intro */}
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">

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
              amount: 0.4,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="inline-flex items-center gap-3">
              <motion.span
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: 40,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                }}
                className="h-px bg-green-700"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                Latest Message
              </span>

              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.25,
                }}
                className="rounded-full border border-green-700/20 bg-green-50 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-green-700"
              >
                New
              </motion.span>
            </div>
          </motion.div>

          {/* Heading + CTA */}
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
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
                amount: 0.3,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] sm:text-6xl lg:text-[5.7rem]"
            >
              A message

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
                  duration: 0.65,
                  delay: 0.2,
                }}
                className="block text-black/35"
              >
                worth sitting
              </motion.span>

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
                  duration: 0.65,
                  delay: 0.3,
                }}
                className="block text-green-700"
              >
                with.
              </motion.span>
            </motion.h2>

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.65,
                delay: 0.35,
              }}
            >
              <Link
                href="/sermons"
                className="group mb-2 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-black/60 transition hover:text-black"
              >
                Browse Messages

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                  <FiArrowUpRight />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Main Feature */}
        <motion.article
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
            amount: 0.15,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          <div className="group relative block h-[540px] overflow-hidden rounded-[2px] bg-black md:h-[700px] lg:h-[790px]">

            {/* Main Image */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                style={{
                  y: imageY,
                }}
                className="absolute -inset-[6%]"
              >
                <motion.img
                  src={sermonImage}
                  alt={sermon.title}
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
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.035]"
                />
              </motion.div>
            </div>

            {/* Cinematic Overlays */}
            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/10" />

            {/* Very subtle ambient green atmosphere */}
            <motion.div
              animate={{
                opacity: [0.01, 0.045, 0.01],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-0 bg-green-700"
            />

            {/* Top Left */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
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
                delay: 0.3,
              }}
              className="absolute left-6 top-6 z-10 md:left-10 md:top-10"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/55">
                {sermon.featured
                  ? "Featured Sermon"
                  : "Latest Sermon"}
              </p>
            </motion.div>

            {/* Episode Number */}
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
              className="absolute right-6 top-5 z-10 md:right-10 md:top-8"
            >
              <span className="text-[5rem] font-light leading-none tracking-[-0.08em] text-white/15 md:text-[8rem]">
                01
              </span>
            </motion.div>

            {/* Play Button */}
              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">

                <motion.button
                  type="button"
                  onClick={toggleAudio}
                  initial={{
                    opacity: 0,
                    scale: 0.75,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-colors duration-300 hover:bg-green-700 hover:text-white md:h-24 md:w-24"
                  aria-label={
                    isPlaying
                      ? "Pause sermon"
                      : "Play sermon"
                  }
                >

                  {/* Pulse 1 */}
                  {!isPlaying && (
                    <motion.span
                      animate={{
                        scale: [1, 1.45],
                        opacity: [0.45, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="pointer-events-none absolute inset-0 rounded-full border border-white/40"
                    />
                  )}

                  {/* Pulse 2 */}
                  {!isPlaying && (
                    <motion.span
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0.2, 0],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: 0.5,
                        ease: "easeOut",
                      }}
                      className="pointer-events-none absolute inset-0 rounded-full border border-green-400/30"
                    />
                  )}

                  {isPlaying ? (
                    <FiPause className="relative z-10 text-xl md:text-2xl" />
                  ) : (
                    <FiPlay className="relative z-10 ml-1 text-xl md:text-2xl" />
                  )}

                </motion.button>

              </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 z-10 w-full p-6 md:p-10 lg:p-14">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
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
                  delay: 0.45,
                }}
                className="max-w-5xl"
              >
                <div className="mb-5 flex flex-wrap items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">
                  <span className="text-green-400">
                    {sermon.category}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-white/30" />

                  <span>{sermonDate}</span>
                </div>

                <h3 className="max-w-4xl text-4xl font-medium leading-[0.92] tracking-[-0.05em] sm:text-5xl md:text-6xl lg:text-[5rem]">
                  {sermon.title}
                </h3>

                <div className="mt-8 flex flex-col justify-between gap-8 border-t border-white/15 pt-6 md:flex-row md:items-end">
                  <p className="max-w-xl text-sm leading-6 text-white/55 md:text-base md:leading-7">
                    Listen to the latest message and continue growing
                    through God&apos;s Word.
                  </p>

                  <div
                      className="
                        flex flex-wrap
                        items-center
                        gap-x-6 gap-y-4
                        sm:gap-x-8
                      "
                    >
                      {/* LISTEN */}

                      <button
                        type="button"
                        onClick={toggleAudio}
                        className="
                          group/listen
                          flex shrink-0
                          items-center
                          gap-3
                          sm:gap-4
                        "
                      >
                        <span
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-white
                            sm:text-xs
                            sm:tracking-[0.14em]
                          "
                        >
                          {isPlaying
                            ? "Pause Message"
                            : "Listen Now"}
                        </span>

                        <span
                          className="
                            flex h-10 w-10
                            items-center
                            justify-center
                            rounded-full
                            border border-white/20
                            text-white
                            transition-all
                            duration-300
                            group-hover/listen:border-green-500
                            group-hover/listen:bg-green-700
                            sm:h-12 sm:w-12
                          "
                        >
                          {isPlaying ? (
                            <FiPause />
                          ) : (
                            <FiPlay className="ml-0.5" />
                          )}
                        </span>
                      </button>

                      {/* DOWNLOAD */}

                      <button
                        type="button"
                        onClick={handleDownload}
                        className="
                          group/download
                          flex shrink-0
                          items-center
                          gap-2.5
                          text-white/65
                          transition-colors
                          duration-300
                          hover:text-white
                          sm:gap-3
                        "
                      >
                        <span
                          className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-full
                            border border-white/15
                            transition-all
                            duration-300
                            group-hover/download:border-green-500
                            group-hover/download:bg-green-700
                            sm:h-10 sm:w-10
                          "
                        >
                          <FiDownload
                            className="
                              text-sm
                              sm:text-base
                            "
                          />
                        </span>

                        <span
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            sm:text-[10px]
                            sm:tracking-[0.14em]
                          "
                        >
                          Download
                        </span>
                      </button>
                    </div>

                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Archive Card */}
          <motion.div
            style={{
              y: floatingCardY,
            }}
            initial={{
              opacity: 0,
              x: 45,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative -mt-6 ml-auto w-[92%] border border-black/10 bg-[#F7F7F3] px-6 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:-mt-10 md:w-[70%] md:px-8 lg:w-[52%]"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                  Continue Growing
                </p>

                <p className="mt-2 text-sm leading-6 text-black/50">
                  Missed previous services? Explore more messages from the
                  archive.
                </p>
              </div>

              <Link
                href="/sermons"
                className="group flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-black"
              >
                Sermon Archive

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
};

export default LatestSermonHome;