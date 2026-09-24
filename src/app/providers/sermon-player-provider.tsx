"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type SermonTrack = {
  title: string;
  audioUrl: string;
};

type SermonPlayerContextType = {
  currentTrack: SermonTrack | null;

  isPlaying: boolean;

  currentTime: number;

  duration: number;

  volume: number;

  hasError: boolean;

  playSermon: (
    track: SermonTrack
  ) => Promise<void>;

  togglePlay: () => Promise<void>;

  seek: (
    time: number
  ) => void;

  setVolume: (
    volume: number
  ) => void;

  stop: () => void;
};

const SermonPlayerContext =
  createContext<SermonPlayerContextType | null>(
    null
  );

export function SermonPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef =
    useRef<HTMLAudioElement>(
      null
    );

  const [
    currentTrack,
    setCurrentTrack,
  ] =
    useState<SermonTrack | null>(
      null
    );

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);

  const [
    duration,
    setDuration,
  ] = useState(0);

  const [
    volume,
    setVolumeState,
  ] = useState(1);

  const [
    hasError,
    setHasError,
  ] = useState(false);

  const [
    shouldAutoPlay,
    setShouldAutoPlay,
  ] = useState(false);

  // ==========================================
  // PLAY A SERMON
  // ==========================================

  const playSermon =
    useCallback(
      async (
        track: SermonTrack
      ) => {
        const audio =
          audioRef.current;

        const isSameTrack =
          currentTrack?.audioUrl ===
          track.audioUrl;

        // Same sermon:
        // simply continue/resume it.
        if (
          isSameTrack &&
          audio
        ) {
          try {
            setHasError(false);

            await audio.play();
          } catch (error) {
            console.error(
              "Unable to resume sermon:",
              error
            );

            setHasError(true);
          }

          return;
        }

        // New sermon.
        setHasError(false);

        setCurrentTime(0);

        setDuration(0);

        setShouldAutoPlay(true);

        setCurrentTrack(
          track
        );
      },
      [currentTrack]
    );

  // ==========================================
  // PLAY NEW TRACK AFTER SRC CHANGES
  // ==========================================

  useEffect(() => {
    if (
      !currentTrack ||
      !shouldAutoPlay
    ) {
      return;
    }

    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    const startPlayback =
      async () => {
        try {
          setHasError(false);

          await audio.play();

          setShouldAutoPlay(
            false
          );
        } catch (error) {
          console.error(
            "Unable to start sermon:",
            error
          );

          setHasError(true);

          setShouldAutoPlay(
            false
          );
        }
      };

    void startPlayback();
  }, [
    currentTrack,
    shouldAutoPlay,
  ]);

  // ==========================================
  // PLAY / PAUSE CURRENT SERMON
  // ==========================================

  const togglePlay =
    useCallback(async () => {
      const audio =
        audioRef.current;

      if (
        !audio ||
        !currentTrack
      ) {
        return;
      }

      try {
        setHasError(false);

        if (audio.paused) {
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
    }, [currentTrack]);

  // ==========================================
  // SEEK
  // ==========================================

  const seek =
    useCallback(
      (time: number) => {
        const audio =
          audioRef.current;

        if (!audio) {
          return;
        }

        const safeTime =
          Math.max(
            0,
            Math.min(
              time,
              Number.isFinite(
                audio.duration
              )
                ? audio.duration
                : time
            )
          );

        audio.currentTime =
          safeTime;

        setCurrentTime(
          safeTime
        );
      },
      []
    );

  // ==========================================
  // VOLUME
  // ==========================================

  const setVolume =
    useCallback(
      (
        newVolume: number
      ) => {
        const safeVolume =
          Math.max(
            0,
            Math.min(
              1,
              newVolume
            )
          );

        const audio =
          audioRef.current;

        if (audio) {
          audio.volume =
            safeVolume;
        }

        setVolumeState(
          safeVolume
        );
      },
      []
    );

  // ==========================================
  // STOP
  // ==========================================

  const stop =
    useCallback(() => {
      const audio =
        audioRef.current;

      if (audio) {
        audio.pause();

        audio.currentTime = 0;
      }

      setCurrentTrack(
        null
      );

      setIsPlaying(
        false
      );

      setCurrentTime(
        0
      );

      setDuration(
        0
      );

      setHasError(
        false
      );

      setShouldAutoPlay(
        false
      );
    }, []);

  // ==========================================
  // SYNC VOLUME
  // ==========================================

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume =
      volume;
  }, [volume]);

  return (
    <SermonPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        hasError,

        playSermon,
        togglePlay,
        seek,
        setVolume,
        stop,
      }}
    >
      {children}

      {/* ======================================
          ONE GLOBAL AUDIO ELEMENT
      ====================================== */}

      <audio
        ref={audioRef}
        src={
          currentTrack?.audioUrl
        }
        preload="metadata"
        playsInline

        onPlay={() => {
          setIsPlaying(
            true
          );
        }}

        onPause={() => {
          setIsPlaying(
            false
          );
        }}

        onTimeUpdate={(
          event
        ) => {
          setCurrentTime(
            event.currentTarget
              .currentTime
          );
        }}

        onLoadedMetadata={(
          event
        ) => {
          const newDuration =
            event.currentTarget
              .duration;

          if (
            Number.isFinite(
              newDuration
            )
          ) {
            setDuration(
              newDuration
            );
          }
        }}

        onDurationChange={(
          event
        ) => {
          const newDuration =
            event.currentTarget
              .duration;

          if (
            Number.isFinite(
              newDuration
            )
          ) {
            setDuration(
              newDuration
            );
          }
        }}

        onEnded={() => {
          setIsPlaying(
            false
          );

          setCurrentTime(
            0
          );
        }}

        onCanPlay={() => {
          setHasError(
            false
          );
        }}

        onError={() => {
          setHasError(
            true
          );

          setIsPlaying(
            false
          );
        }}
      />
    </SermonPlayerContext.Provider>
  );
}

export function useSermonPlayer() {
  const context =
    useContext(
      SermonPlayerContext
    );

  if (!context) {
    throw new Error(
      "useSermonPlayer must be used inside SermonPlayerProvider."
    );
  }

  return context;
}