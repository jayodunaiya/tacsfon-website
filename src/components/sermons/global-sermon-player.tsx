"use client";

import { useState } from "react";

import {
  FiDownload,
  FiPause,
  FiPlay,
  FiVolume2,
  FiX,
} from "react-icons/fi";

import { useSermonPlayer } from "@/app/providers/sermon-player-provider";

const formatTime = (
  seconds: number
) => {
  if (
    !Number.isFinite(seconds)
  ) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const remaining =
    Math.floor(seconds % 60);

  return `${minutes}:${remaining
    .toString()
    .padStart(2, "0")}`;
};

export default function GlobalSermonPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    stop,
  } = useSermonPlayer();

  const [
    isDownloading,
    setIsDownloading,
  ] = useState(false);

  if (!currentTrack) {
    return null;
  }

  const handleDownload =
    async () => {
      if (isDownloading) {
        return;
      }

      try {
        setIsDownloading(true);

        const response =
          await fetch(
            currentTrack.audioUrl
          );

        if (!response.ok) {
          throw new Error(
            "Unable to download sermon."
          );
        }

        const blob =
          await response.blob();

        const objectUrl =
          URL.createObjectURL(
            blob
          );

        const safeTitle =
          currentTrack.title
            .trim()
            .replace(
              /[^a-zA-Z0-9-_ ]/g,
              ""
            )
            .replace(
              /\s+/g,
              "-"
            );

        const extension =
          blob.type.includes(
            "wav"
          )
            ? "wav"
            : blob.type.includes(
                  "ogg"
                )
              ? "ogg"
              : "mp3";

        const link =
          document.createElement(
            "a"
          );

        link.href =
          objectUrl;

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
          currentTrack.audioUrl,
          "_blank",
          "noopener,noreferrer"
        );
      } finally {
        setIsDownloading(false);
      }
    };

  return (
    <div
      className="
        fixed
        bottom-3
        left-3
        right-3
        z-[100]
        mx-auto
        max-w-[900px]

        sm:bottom-5
        sm:left-5
        sm:right-5
      "
    >
      <div
        className="
          overflow-hidden
          border
          border-black/10
          bg-[#F7F7F3]/95
          shadow-[0_18px_60px_rgba(0,0,0,0.18)]
          backdrop-blur-xl
        "
      >
        {/* TOP ACCENT */}

        <div className="h-[2px] bg-green-700" />

        <div
          className="
            flex
            items-center
            gap-3
            px-3
            py-3

            min-[375px]:gap-4
            min-[375px]:px-4

            sm:px-5
            sm:py-4
          "
        >
          {/* PLAY */}

          <button
            type="button"
            onClick={togglePlay}
            aria-label={
              isPlaying
                ? "Pause sermon"
                : "Play sermon"
            }
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              transition-colors
              hover:bg-green-700

              sm:h-11
              sm:w-11
            "
          >
            {isPlaying ? (
              <FiPause />
            ) : (
              <FiPlay className="ml-0.5" />
            )}
          </button>

          {/* MAIN */}

          <div className="min-w-0 flex-1">
            <div
              className="
                mb-2
                flex
                min-w-0
                items-end
                justify-between
                gap-3
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    mb-0.5
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-green-700

                    sm:text-[8px]
                  "
                >
                  Now playing
                </p>

                <p
                  className="
                    truncate
                    text-[10px]
                    font-semibold
                    text-black

                    min-[375px]:text-[11px]
                    sm:text-xs
                  "
                >
                  {currentTrack.title}
                </p>
              </div>

              <p
                className="
                  hidden
                  shrink-0
                  text-[9px]
                  tabular-nums
                  text-black/45

                  min-[375px]:block
                  sm:text-[10px]
                "
              >
                {formatTime(
                  currentTime
                )}
                {" / "}
                {formatTime(
                  duration
                )}
              </p>
            </div>

            <input
              type="range"
              min={0}
              max={
                duration > 0
                  ? duration
                  : 0
              }
              step={0.1}
              value={Math.min(
                currentTime,
                duration || 0
              )}
              onChange={(
                event
              ) =>
                seek(
                  Number(
                    event.target
                      .value
                  )
                )
              }
              aria-label="Sermon playback position"
              className="
                block
                h-1.5
                w-full
                cursor-pointer
                accent-green-700
              "
            />
          </div>

          {/* VOLUME — DESKTOP */}

          <div
            className="
              hidden
              items-center
              gap-2
              lg:flex
            "
          >
            <FiVolume2 className="text-black/40" />

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(
                event
              ) =>
                setVolume(
                  Number(
                    event.target
                      .value
                  )
                )
              }
              aria-label="Volume"
              className="
                h-1
                w-16
                cursor-pointer
                accent-green-700
              "
            />
          </div>

          {/* DOWNLOAD */}

          <button
            type="button"
            onClick={
              handleDownload
            }
            disabled={
              isDownloading
            }
            aria-label="Download sermon"
            className="
              hidden
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-black/10
              bg-white
              text-black/55
              transition-all
              hover:border-green-700
              hover:bg-green-700
              hover:text-white
              disabled:opacity-50

              sm:flex
            "
          >
            <FiDownload
              className={
                isDownloading
                  ? "animate-bounce"
                  : ""
              }
            />
          </button>

          {/* CLOSE */}

          <button
            type="button"
            onClick={stop}
            aria-label="Stop sermon and close player"
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-black/40
              transition-colors
              hover:bg-black/5
              hover:text-black

              sm:h-9
              sm:w-9
            "
          >
            <FiX />
          </button>
        </div>

        {/* MOBILE TIME */}

        <div
          className="
            flex
            items-center
            justify-between
            border-t
            border-black/[0.06]
            px-4
            py-1.5

            min-[375px]:hidden
          "
        >
          <span className="text-[8px] text-black/40">
            {formatTime(
              currentTime
            )}
          </span>

          <span className="text-[8px] text-black/40">
            {formatTime(
              duration
            )}
          </span>
        </div>
      </div>
    </div>
  );
}