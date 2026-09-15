"use client";

import {
  useEffect,
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
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play sermon:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);
  };

  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audio = audioRef.current;

    if (!audio) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="w-full">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="flex items-center gap-4 border border-black/10 bg-white p-4 sm:gap-5 sm:p-5">
        {/* PLAY BUTTON */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={
            isPlaying
              ? `Pause ${title}`
              : `Play ${title}`
          }
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:bg-green-700"
        >
          {isPlaying ? (
            <FiPause className="text-lg" />
          ) : (
            <FiPlay className="ml-0.5 text-lg" />
          )}
        </button>

        {/* PLAYER CONTENT */}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="truncate text-xs font-medium text-black">
              {isPlaying ? "Now Playing" : "Listen"}
            </p>

            <p className="shrink-0 text-[11px] text-black/40">
              {formatTime(currentTime)}
              {" / "}
              {formatTime(duration)}
            </p>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            aria-label="Sermon playback progress"
            className="h-1.5 w-full cursor-pointer accent-green-700"
          />
        </div>

        <FiVolume2 className="hidden shrink-0 text-lg text-black/35 sm:block" />
      </div>
    </div>
  );
};

export default AudioPlayer;