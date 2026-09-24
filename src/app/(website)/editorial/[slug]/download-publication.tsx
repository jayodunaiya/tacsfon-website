"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiCheck,
  FiDownload,
  FiLoader,
} from "react-icons/fi";

type DownloadPublicationProps = {
  slug: string;
  title: string;
};

export default function DownloadPublication({
  slug,
  title,
}: DownloadPublicationProps) {
  const [status, setStatus] = useState<
    "idle" | "downloading" | "success" | "error"
  >("idle");

  const resetTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleDownload = async () => {
    if (status === "downloading") return;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    try {
      setStatus("downloading");

      const response = await fetch(
        `/api/editorials/${encodeURIComponent(slug)}/download`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to generate publication.");
      }

      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const disposition = response.headers.get(
        "content-disposition"
      );

      const filenameMatch = disposition?.match(
        /filename="?([^"]+)"?/i
      );

      const fallbackTitle = title
        .trim()
        .replace(/[^a-zA-Z0-9-_ ]/g, "")
        .replace(/\s+/g, "-");

      const filename =
        filenameMatch?.[1] ||
        `TACSFON-LAUTECH-${fallbackTitle || "Editorial"}.pdf`;

      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;

      document.body.appendChild(link);

      link.click();
      link.remove();

      URL.revokeObjectURL(objectUrl);

      setStatus("success");

      resetTimerRef.current = setTimeout(() => {
        setStatus("idle");
      }, 2200);
    } catch (error) {
      console.error(
        "Publication download failed:",
        error
      );

      setStatus("error");

      resetTimerRef.current = setTimeout(() => {
        setStatus("idle");
      }, 2500);
    }
  };

  const label =
    status === "downloading"
      ? "Preparing publication"
      : status === "success"
        ? "Downloaded"
        : status === "error"
          ? "Try again"
          : "Download publication";

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={status === "downloading"}
      aria-label={`Download ${title}`}
      className="
        group
        mt-5
        flex
        w-full
        items-center
        justify-between
        gap-4
        border-t
        border-black/10
        pt-5
        text-left
        transition-colors
        duration-300
        hover:text-green-700
        disabled:cursor-wait
        disabled:opacity-70

        sm:mt-6
        sm:pt-6
      "
    >
      <div className="min-w-0">
        <span
          className="
            block
            text-[8px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-black/40

            min-[375px]:text-[9px]
            min-[375px]:tracking-[0.2em]
          "
        >
          Download
        </span>

        <span
          className="
            mt-1
            block
            truncate
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.12em]
            text-black
            transition-colors
            duration-300
            group-hover:text-green-700

            min-[375px]:text-[11px]
            sm:text-xs
          "
        >
          {label}
        </span>
      </div>

      <span
        className={`
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          transition-all
          duration-300

          min-[375px]:h-10
          min-[375px]:w-10

          ${
            status === "success"
              ? "border-green-700 bg-green-700 text-white"
              : status === "error"
                ? "border-black/20 bg-black text-white"
                : "border-black/10 bg-white text-black group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white"
          }
        `}
      >
        {status === "downloading" ? (
          <FiLoader className="animate-spin text-sm" />
        ) : status === "success" ? (
          <FiCheck className="text-sm" />
        ) : (
          <FiDownload className="text-sm" />
        )}
      </span>
    </button>
  );
}