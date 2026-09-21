import Link from "next/link";

import {
  FiArrowRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live",
  description:
    "Watch TACSFON LAUTECH services and fellowship programmes live.",
};

import { getYouTubeLiveStream } from "@/lib/youtube-live";

const LivePage = async () => {
  const liveStream = await getYouTubeLiveStream();

  return (
    <main
      className="
        min-h-screen
        bg-black
        px-5 pb-16 pt-28
        text-white
        min-[375px]:px-6
        min-[375px]:pb-20
        min-[375px]:pt-32
        md:pb-24
        lg:px-10
      "
    >
      <div className="mx-auto max-w-[1400px]">
        {liveStream.isLive ? (
          <>
            {/* ==========================================
                LIVE HEADER
            ========================================== */}

            <div
              className="
                mb-8
                max-w-4xl
                min-[375px]:mb-10
                sm:mb-12
              "
            >
              <div
                className="
                  mb-4
                  flex items-center
                  gap-2.5
                  min-[375px]:mb-5
                  min-[375px]:gap-3
                  sm:mb-6
                "
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0 min-[375px]:h-3 min-[375px]:w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />

                  <span className="relative inline-flex h-full w-full rounded-full bg-green-500" />
                </span>

                <p
                  className="
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-green-500
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.26em]
                    sm:text-[10px]
                    sm:tracking-[0.3em]
                  "
                >
                  Live Now
                </p>
              </div>

              <h1
                className="
                  max-w-4xl
                  break-words
                  text-[clamp(2.75rem,13vw,4.25rem)]
                  font-medium
                  leading-[0.96]
                  tracking-[-0.05em]
                  md:text-7xl
                  lg:text-[6rem]
                  lg:leading-[0.95]
                "
              >
                {liveStream.title || "TACSFON Live"}
              </h1>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-[13px]
                  leading-6
                  text-white/55
                  min-[375px]:mt-5
                  min-[375px]:text-sm
                  min-[375px]:leading-7
                  sm:mt-6
                  sm:text-base
                "
              >
                Join us live for worship, prayer and the
                Word.
              </p>
            </div>

            {/* ==========================================
                YOUTUBE PLAYER + CHAT
            ========================================== */}

            <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
              {/* LIVE VIDEO */}

              <div
                className="
                  relative
                  aspect-video
                  w-full
                  overflow-hidden
                  bg-[#111]
                "
              >
                {liveStream.videoId && (
                  <iframe
                    src={`https://www.youtube.com/embed/${liveStream.videoId}?autoplay=1`}
                    title={
                      liveStream.title ||
                      "TACSFON Live"
                    }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                )}
              </div>

              {/* DESKTOP LIVE CHAT */}

              <div className="hidden min-h-[500px] overflow-hidden border border-white/10 bg-[#111] lg:block">
                {liveStream.videoId && (
                  <iframe
                    src={`https://www.youtube.com/live_chat?v=${liveStream.videoId}&embed_domain=${process.env.NEXT_PUBLIC_SITE_DOMAIN}`}
                    title="TACSFON Live Chat"
                    className="h-full min-h-[500px] w-full"
                  />
                )}
              </div>
            </div>

            {/* ==========================================
                MOBILE / TABLET LIVE CHAT
            ========================================== */}

            {liveStream.videoId && (
              <div className="mt-3 min-[375px]:mt-4 sm:mt-5 lg:hidden">
                <a
                  href={`https://www.youtube.com/watch?v=${liveStream.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex items-center
                    justify-between
                    gap-4
                    border border-white/10
                    bg-[#111]
                    px-4 py-3.5
                    transition-colors
                    duration-300
                    hover:border-green-500
                    min-[375px]:px-5
                    min-[375px]:py-4
                  "
                >
                  <div className="min-w-0">
                    <p
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.2em]
                        text-green-500
                        min-[375px]:text-[9px]
                        min-[375px]:tracking-[0.25em]
                      "
                    >
                      Live Chat
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        leading-5
                        text-white/70
                        min-[375px]:text-sm
                      "
                    >
                      Join the conversation on YouTube
                    </p>
                  </div>

                  <span
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border border-white/10
                      text-sm
                      text-white
                      transition-all
                      duration-300
                      group-hover:border-green-500
                      group-hover:text-green-500
                      min-[375px]:h-10
                      min-[375px]:w-10
                    "
                  >
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            )}

            {/* ==========================================
                SERVICE DETAILS
            ========================================== */}

            <div
              className="
                mt-6
                grid
                gap-5
                border-t border-white/10
                pt-6
                min-[375px]:mt-7
                min-[375px]:gap-6
                min-[375px]:pt-7
                sm:mt-8
                sm:pt-8
                md:grid-cols-2
              "
            >
              {/* TIME */}

              <div className="flex items-start gap-3.5 min-[375px]:gap-4">
                <span
                  className="
                    flex h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border border-white/10
                    text-sm
                    text-green-500
                    min-[375px]:h-10
                    min-[375px]:w-10
                  "
                >
                  <FiClock />
                </span>

                <div className="pt-0.5">
                  <p
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-white/30
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.2em]
                    "
                  >
                    Service Time
                  </p>

                  <p className="mt-1 text-[13px] text-white/75 min-[375px]:text-sm">
                    Sundays · 9:00 AM
                  </p>
                </div>
              </div>

              {/* LOCATION */}

              <div className="flex items-start gap-3.5 min-[375px]:gap-4">
                <span
                  className="
                    flex h-9 w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border border-white/10
                    text-sm
                    text-green-500
                    min-[375px]:h-10
                    min-[375px]:w-10
                  "
                >
                  <FiMapPin />
                </span>

                <div className="min-w-0 pt-0.5">
                  <p
                    className="
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-white/30
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.2em]
                    "
                  >
                    Location
                  </p>

                  <p
                    className="
                      mt-1
                      max-w-md
                      break-words
                      text-[13px]
                      leading-5
                      text-white/75
                      min-[375px]:text-sm
                      min-[375px]:leading-6
                    "
                  >
                    TACSFON Family House, New Gen. Area,
                    Under G, Ogbomoso
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ==========================================
              OFFLINE STATE
          ========================================== */

          <div
            className="
              flex
              min-h-[calc(100svh-7rem)]
              flex-col
              justify-center
              py-10
              min-[375px]:min-h-[calc(100svh-8rem)]
              md:min-h-[70vh]
              md:py-0
            "
          >
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-green-500
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.26em]
                sm:text-[10px]
                sm:tracking-[0.3em]
              "
            >
              Live
            </p>

            <h1
              className="
                mt-5
                max-w-4xl
                text-[clamp(3.1rem,15vw,4.5rem)]
                font-medium
                leading-[0.93]
                tracking-[-0.05em]
                min-[375px]:mt-6
                md:text-7xl
                md:leading-[0.95]
              "
            >
              We&apos;re not live

              <span className="block text-white/35">
                right now.
              </span>
            </h1>

            <p
              className="
                mt-5
                max-w-xl
                text-[13px]
                leading-6
                text-white/50
                min-[375px]:mt-6
                min-[375px]:text-sm
                min-[375px]:leading-7
                sm:mt-8
                sm:text-base
              "
            >
              Join us during our next service or catch up
              on previous messages from the sermon archive.
            </p>

            <div className="mt-7 min-[375px]:mt-8 sm:mt-10">
              <Link
                href="/sermons"
                className="
                  group
                  inline-flex
                  items-center
                  justify-between
                  gap-4
                  bg-green-700
                  px-5 py-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  text-white
                  transition-colors
                  hover:bg-green-600
                  min-[375px]:px-6
                  min-[375px]:text-[10px]
                  min-[375px]:tracking-[0.15em]
                  sm:px-7
                  sm:text-xs
                  sm:tracking-[0.16em]
                "
              >
                Watch Previous Sermons

                <FiArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* NEXT SERVICE */}

            <div
              className="
                mt-10
                flex items-center
                gap-3.5
                border-t border-white/10
                pt-6
                min-[375px]:mt-12
                min-[375px]:gap-4
                min-[375px]:pt-7
                sm:mt-14
              "
            >
              <span
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border border-white/10
                  text-sm
                  text-green-500
                  min-[375px]:h-10
                  min-[375px]:w-10
                "
              >
                <FiClock />
              </span>

              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.16em]
                    text-white/30
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.2em]
                  "
                >
                  Next Sunday Service
                </p>

                <p className="mt-1 text-[13px] text-white/70 min-[375px]:text-sm">
                  Sunday · 9:00 AM
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default LivePage;