// src/components/sermons/featured-sermon.sermons.tsx

"use client";

import { Sermon } from "@/types/sermon.types";

import AudioPlayer from "@/components/sermons/audio-player.sermons";
import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";
import Parallax from "@/components/motion/parallax.motion";

interface FeaturedSermonProps {
  sermon: Sermon;
}

const FeaturedSermon = ({
  sermon,
}: FeaturedSermonProps) => {
  const formattedDate = new Date(
    `${sermon.sermon_date}T00:00:00`
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section
      className="
        bg-[#F7F7F3]
        px-5 pb-16 pt-28
        min-[375px]:px-6
        min-[375px]:pb-20
        min-[375px]:pt-32
        sm:pb-24 sm:pt-36
        md:py-32
        lg:px-10 lg:py-40
      "
    >
      <div className="mx-auto max-w-[1400px]">
        <div
          className="
            grid gap-9
            min-[375px]:gap-10
            sm:gap-12
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-center
            lg:gap-14
          "
        >
          {/* ==========================================
              IMAGE
          ========================================== */}

          <Reveal>
            <div
              className="
                relative h-[360px]
                overflow-hidden bg-black
                min-[375px]:h-[400px]
                sm:h-[500px]
                md:h-[620px]
              "
            >
              {sermon.image_url ? (
                <>
                  <Parallax
                    distance={50}
                    className="absolute -inset-y-16 inset-x-0"
                  >
                    <img
                      src={sermon.image_url}
                      alt=""
                      className="h-[calc(100%+128px)] w-full object-cover"
                    />
                  </Parallax>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                </>
              ) : (
                /*
                  Designed fallback for sermons without an image.
                */

                <div
                  className="
                    relative flex h-full w-full
                    items-end overflow-hidden
                    bg-black
                    p-6
                    min-[375px]:p-7
                    sm:p-8
                    md:p-12
                  "
                >
                  {/* Decorative circles */}

                  <div
                    className="
                      absolute -right-24 -top-24
                      h-56 w-56 rounded-full
                      border border-white/10
                      min-[375px]:h-64
                      min-[375px]:w-64
                      sm:-right-20 sm:-top-20
                      sm:h-72 sm:w-72
                    "
                  />

                  <div
                    className="
                      absolute -right-10 -top-10
                      h-36 w-36 rounded-full
                      border border-green-500/20
                      min-[375px]:h-40
                      min-[375px]:w-40
                      sm:-right-6 sm:-top-6
                      sm:h-44 sm:w-44
                    "
                  />

                  <div
                    className="
                      absolute bottom-[-100px] left-[-80px]
                      h-60 w-60 rounded-full
                      border border-white/[0.06]
                      sm:left-[-60px]
                      sm:h-72 sm:w-72
                    "
                  />

                  <div className="relative z-10">
                    <p
                      className="
                        text-[9px] font-semibold
                        uppercase tracking-[0.24em]
                        text-green-500
                        min-[375px]:text-[10px]
                        min-[375px]:tracking-[0.3em]
                      "
                    >
                      TACSFON LAUTECH
                    </p>

                    <p
                      className="
                        mt-3 max-w-md
                        text-[2rem] font-medium
                        leading-[0.95]
                        tracking-[-0.05em]
                        text-white
                        min-[375px]:text-4xl
                        sm:mt-4
                        md:text-5xl
                      "
                    >
                      The Word

                      <span className="block text-white/30">
                        for the journey.
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* ==========================================
              CONTENT
          ========================================== */}

          <div className="min-w-0">
            <FadeUp>
              <div className="flex items-center gap-2.5 min-[375px]:gap-3">
                <span
                  className="
                    h-1.5 w-1.5 shrink-0
                    rounded-full bg-green-700
                    min-[375px]:h-2
                    min-[375px]:w-2
                  "
                />

                <p
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.24em]
                    text-green-700
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.3em]
                  "
                >
                  Featured Sermon
                </p>
              </div>
            </FadeUp>

            {/* TITLE */}

            <FadeUp delay={0.05}>
              <h2
                className="
                  mt-4 max-w-xl
                  break-words
                  text-[clamp(2.6rem,12vw,3.75rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  min-[375px]:mt-5
                  sm:mt-6
                  md:text-6xl
                "
              >
                {sermon.title}
              </h2>
            </FadeUp>

            {/* META */}

            <FadeUp delay={0.1}>
              <div
                className="
                  mt-6 flex flex-wrap
                  items-center gap-x-4 gap-y-2
                  min-[375px]:gap-x-5
                  sm:mt-8 sm:gap-x-6 sm:gap-y-3
                "
              >
                <p
                  className="
                    break-words
                    text-[9px] font-semibold
                    uppercase tracking-[0.15em]
                    text-black/45
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.18em]
                  "
                >
                  {sermon.category}
                </p>

                <span
                  className="
                    h-1 w-1 shrink-0
                    rounded-full bg-black/20
                  "
                />

                <p
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.15em]
                    text-black/45
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.18em]
                  "
                >
                  {formattedDate}
                </p>
              </div>
            </FadeUp>

            {/* ======================================
                AUDIO PLAYER
            ====================================== */}

            <FadeUp delay={0.15}>
              <div
                className="
                  mt-7 min-w-0
                  min-[375px]:mt-8
                  sm:mt-10
                "
              >
                <AudioPlayer
                  audioUrl={sermon.audio_url}
                  title={sermon.title}
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSermon;