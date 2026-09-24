"use client";

import { useState } from "react";

import {
  FiDownload,
  FiPause,
  FiPlay,
  FiVolume2,
} from "react-icons/fi";

import { useSermonPlayer } from "@/app/providers/sermon-player-provider";

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

const AudioPlayer = ({
  audioUrl,
  title = "Sermon audio",
}: AudioPlayerProps) => {
  const {
    currentTrack,
    isPlaying: globalIsPlaying,
    currentTime: globalCurrentTime,
    duration: globalDuration,
    hasError,
    playSermon,
    togglePlay,
    seek,
  } = useSermonPlayer();

  const [isDownloading, setIsDownloading] =
    useState(false);

  // ==========================================
  // IS THIS THE ACTIVE SERMON?
  // ==========================================

  const isCurrentSermon =
    currentTrack?.audioUrl === audioUrl;

  const isPlaying =
    isCurrentSermon && globalIsPlaying;

  const currentTime =
    isCurrentSermon
      ? globalCurrentTime
      : 0;

  const duration =
    isCurrentSermon
      ? globalDuration
      : 0;

  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (
    seconds: number
  ) => {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ==========================================
  // PLAY / PAUSE
  // ==========================================

  const handlePlay = async () => {
    try {
      if (isCurrentSermon) {
        await togglePlay();
        return;
      }

      await playSermon({
        title,
        audioUrl,
      });
    } catch (error) {
      console.error(
        "Playback failed:",
        error
      );
    }
  };

  // ==========================================
  // SEEK
  // ==========================================

  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!isCurrentSermon) {
      return;
    }

    seek(
      Number(
        event.target.value
      )
    );
  };

  // ==========================================
  // DOWNLOAD
  // ==========================================

  const handleDownload = async () => {
    if (
      !audioUrl ||
      isDownloading
    ) {
      return;
    }

    try {
      setIsDownloading(true);

      const response =
        await fetch(audioUrl);

      if (!response.ok) {
        throw new Error(
          "Unable to download sermon."
        );
      }

      const blob =
        await response.blob();

      const objectUrl =
        URL.createObjectURL(blob);

      const safeTitle = title
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
        audioUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-w-0 w-full">
      {/*
        IMPORTANT:

        There is intentionally NO <audio>
        element in this component anymore.

        The actual audio element now lives
        inside SermonPlayerProvider.
      */}

      <div
        className="
          min-w-0
          border border-black/10
          bg-[#F7F7F3]
          p-3
          min-[375px]:p-3.5
          sm:p-5
        "
      >
        <div
          className="
            flex min-w-0
            items-center
            gap-3
            min-[375px]:gap-3.5
            sm:gap-5
          "
        >
          {/* PLAY */}

          <button
            type="button"
            onClick={handlePlay}
            aria-label={
              isPlaying
                ? `Pause ${title}`
                : `Play ${title}`
            }
            className="
              flex h-10 w-10
              shrink-0
              items-center justify-center
              rounded-full
              bg-black
              text-white
              transition-colors
              duration-300
              hover:bg-green-700
              min-[375px]:h-11
              min-[375px]:w-11
              sm:h-12
              sm:w-12
            "
          >
            {isPlaying ? (
              <FiPause
                className="
                  text-base
                  sm:text-lg
                "
              />
            ) : (
              <FiPlay
                className="
                  ml-0.5
                  text-base
                  sm:text-lg
                "
              />
            )}
          </button>

          {/* PLAYER INFO */}

          <div className="min-w-0 flex-1">
            <div
              className="
                mb-2.5 flex min-w-0
                items-center
                justify-between
                gap-2
                min-[375px]:mb-3
                min-[375px]:gap-3
                sm:gap-4
              "
            >
              <p
                className="
                  min-w-0 truncate
                  text-[10px]
                  font-medium
                  text-black
                  min-[375px]:text-[11px]
                  sm:text-xs
                "
              >
                {isCurrentSermon &&
                hasError
                  ? "Unable to play audio"
                  : isPlaying
                    ? "Now Playing"
                    : isCurrentSermon
                      ? "Paused"
                      : "Listen"}
              </p>

              <p
                className="
                  shrink-0
                  whitespace-nowrap
                  text-[8px]
                  tabular-nums
                  text-black/40
                  min-[375px]:text-[9px]
                  sm:text-[11px]
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
              onChange={
                handleSeek
              }
              disabled={
                !isCurrentSermon
              }
              aria-label={`${title} playback position`}
              className="
                block h-1.5
                w-full min-w-0
                cursor-pointer
                accent-green-700
                disabled:cursor-default
                disabled:opacity-40
              "
            />
          </div>

          {/* VOLUME INDICATOR */}

          <FiVolume2
            className="
              hidden shrink-0
              text-lg
              text-black/35
              md:block
            "
          />

          {/* DOWNLOAD */}

          <button
            type="button"
            onClick={
              handleDownload
            }
            disabled={
              isDownloading
            }
            aria-label={`Download ${title}`}
            title={`Download ${title}`}
            className="
              group flex
              h-9 w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border border-black/10
              bg-white
              text-black/55
              transition-all
              duration-300
              hover:border-green-700
              hover:bg-green-700
              hover:text-white
              disabled:cursor-wait
              disabled:opacity-50
              min-[375px]:h-10
              min-[375px]:w-10
              sm:h-11
              sm:w-auto
              sm:gap-2
              sm:rounded-full
              sm:px-4
            "
          >
            <FiDownload
              className={`
                shrink-0
                text-sm
                min-[375px]:text-base

                ${
                  isDownloading
                    ? "animate-bounce"
                    : ""
                }
              `}
            />

            <span
              className="
                hidden
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.12em]
                sm:inline
              "
            >
              {isDownloading
                ? "Saving"
                : "Download"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;