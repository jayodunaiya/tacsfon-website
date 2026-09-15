import Link from "next/link";

import {
  FiArrowRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

import { getYouTubeLiveStream } from "@/lib/youtube-live";

const LivePage = async () => {
  const liveStream = await getYouTubeLiveStream();

  return (
    <main className="min-h-screen bg-black px-6 pb-24 pt-32 text-white lg:px-10">
      <div className="mx-auto max-w-[1400px]">

        {liveStream.isLive ? (
          <>
            {/* Header */}
            <div className="mb-12 max-w-4xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />

                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-green-500">
                  Live Now
                </p>
              </div>

              <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-[6rem]">
                {liveStream.title || "TACSFON Live"}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/55">
                Join us live for worship, prayer and the Word.
              </p>
            </div>

            {/* YouTube Player */}
            <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">

              {/* Live Video */}
              <div className="relative aspect-video overflow-hidden bg-[#111]">
                {liveStream.videoId && (
                  <iframe
                    src={`https://www.youtube.com/embed/${liveStream.videoId}?autoplay=1`}
                    title={liveStream.title || "TACSFON Live"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                )}
              </div>

              {/* Live Chat */}
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

            {/* Mobile Live Chat Button */}
                {liveStream.videoId && (
                  <div className="mt-5 lg:hidden">
                    <a
                      href={`https://www.youtube.com/watch?v=${liveStream.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between border border-white/10 bg-[#111] px-5 py-4 transition-colors duration-300 hover:border-green-500"
                    >
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-500">
                          Live Chat
                        </p>

                        <p className="mt-1 text-sm text-white/70">
                          Join the conversation on YouTube
                        </p>
                      </div>

                      <span className="text-lg text-white transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                )}

            {/* Service Details */}
            <div className="mt-8 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2">

              <div className="flex items-center gap-4">
                <FiClock className="text-green-500" />

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Service Time
                  </p>

                  <p className="mt-1 text-sm text-white/75">
                    Sundays · 9:00 AM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FiMapPin className="text-green-500" />

                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-white/75">
                    TACSFON Family House, New Gen. Area, Under G, Ogbomoso
                  </p>
                </div>
              </div>

            </div>
          </>
        ) : (
          /* Offline State */
          <div className="flex min-h-[70vh] flex-col justify-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-500">
              Live
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
              We&apos;re not live
              <span className="block text-white/35">
                right now.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-white/50">
              Join us during our next service or catch up on previous messages
              from the sermon archive.
            </p>

            <div className="mt-10">
              <Link
                href="/sermons"
                className="group inline-flex items-center gap-4 bg-green-700 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-green-600"
              >
                Watch Previous Sermons

                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  );
};

export default LivePage;