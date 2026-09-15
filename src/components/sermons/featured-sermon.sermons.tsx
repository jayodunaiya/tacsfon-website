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
    <section className="bg-[#F7F7F3] px-6 py-24 md:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

          {/* IMAGE */}
          <Reveal>
            <div className="relative h-[460px] overflow-hidden bg-black md:h-[620px]">
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
                  No sermon image yet.

                  This gives us a proper designed fallback instead
                  of showing a broken/empty image.
                */
                <div className="relative flex h-full w-full items-end overflow-hidden bg-black p-8 md:p-12">

                  <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

                  <div className="absolute -right-6 -top-6 h-44 w-44 rounded-full border border-green-500/20" />

                  <div className="absolute bottom-[-100px] left-[-60px] h-72 w-72 rounded-full border border-white/[0.06]" />

                  <div className="relative z-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-500">
                      TACSFON LAUTECH
                    </p>

                    <p className="mt-4 max-w-md text-4xl font-medium leading-[0.95] tracking-[-0.05em] text-white md:text-5xl">
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

          {/* CONTENT */}
          <div>
            <FadeUp>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-green-700" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                  Featured Sermon
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h2 className="mt-6 max-w-xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
                {sermon.title}
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  {sermon.category}
                </p>

                <span className="hidden h-1 w-1 rounded-full bg-black/20 sm:block" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45">
                  {formattedDate}
                </p>
              </div>
            </FadeUp>

            {/* AUDIO PLAYER */}
            <FadeUp delay={0.15}>
              <div className="mt-10">
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