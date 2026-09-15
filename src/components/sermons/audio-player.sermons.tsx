"use client";

import {
  useRef,
  useState,
} from "react";

import {
  FiPause,
  FiPlay,
  FiVolume2,
} from "react-icons/fi";

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

const AudioPlayer = ({
  audioUrl,
  title = "Sermon audio",
}: AudioPlayerProps) => {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [hasError, setHasError] =
    useState(false);

  // ==========================================
  // FORMAT TIME
  // ==========================================
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

    const remainingSeconds =
      Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ==========================================
  // PLAY / PAUSE
  // ==========================================
  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        setHasError(false);

        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error(
        "Playback failed:",
        error
      );

      setHasError(true);
    }
  };

  // ==========================================
  // METADATA
  // ==========================================
  const handleLoadedMetadata =
    () => {
      const audio =
        audioRef.current;

      if (!audio) return;

      if (
        Number.isFinite(
          audio.duration
        )
      ) {
        setDuration(
          audio.duration
        );
      }
    };

  // ==========================================
  // TIME
  // ==========================================
  const handleTimeUpdate =
    () => {
      const audio =
        audioRef.current;

      if (!audio) return;

      setCurrentTime(
        audio.currentTime
      );

      if (
        Number.isFinite(
          audio.duration
        )
      ) {
        setDuration(
          audio.duration
        );
      }
    };

  // ==========================================
  // SEEK
  // ==========================================
  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audio =
      audioRef.current;

    if (!audio) return;

    const newTime = Number(
      event.target.value
    );

    audio.currentTime =
      newTime;

    setCurrentTime(newTime);
  };

  return (
    <div className="w-full">

      {/* ACTUAL BROWSER AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        playsInline
        onPlay={() =>
          setIsPlaying(true)
        }
        onPause={() =>
          setIsPlaying(false)
        }
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
        onLoadedMetadata={
          handleLoadedMetadata
        }
        onDurationChange={
          handleLoadedMetadata
        }
        onTimeUpdate={
          handleTimeUpdate
        }
        onCanPlay={() =>
          setHasError(false)
        }
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
      />

      <div className="border border-black/10 bg-[#F7F7F3] p-4 sm:p-5">

        <div className="flex items-center gap-4 sm:gap-5">

          {/* PLAY */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={
              isPlaying
                ? `Pause ${title}`
                : `Play ${title}`
            }
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 hover:bg-green-700"
          >
            {isPlaying ? (
              <FiPause className="text-lg" />
            ) : (
              <FiPlay className="ml-0.5 text-lg" />
            )}
          </button>

          {/* PLAYER INFO */}
          <div className="min-w-0 flex-1">

            <div className="mb-3 flex items-center justify-between gap-4">

              <p className="truncate text-xs font-medium text-black">
                {hasError
                  ? "Unable to play audio"
                  : isPlaying
                    ? "Now Playing"
                    : "Listen"}
              </p>

              <p className="shrink-0 text-[10px] text-black/40 sm:text-[11px]">
                {formatTime(
                  currentTime
                )}
                {" / "}
                {formatTime(
                  duration
                )}
              </p>

            </div>

            {/* PROGRESS */}
            <input
              type="range"
              min={0}
              max={
                duration > 0
                  ? duration
                  : 0
              }
              step={0.1}
              value={
                Math.min(
                  currentTime,
                  duration || 0
                )
              }
              onChange={
                handleSeek
              }
              aria-label={`${title} playback position`}
              className="h-1.5 w-full cursor-pointer accent-green-700"
            />

          </div>

          <FiVolume2 className="hidden shrink-0 text-lg text-black/35 sm:block" />

        </div>

      </div>

    </div>
  );
};

export default AudioPlayer;