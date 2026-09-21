"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

import { Event } from "@/types/event.types";
import Reveal from "@/components/motion/reveal.motion";
import FadeUp from "@/components/motion/fade-up.motion";
import Parallax from "@/components/motion/parallax.motion";

interface FeaturedEventProps {
  event: Event;
}

const FeaturedEvent = ({
  event,
}: FeaturedEventProps) => {
  const eventDate = new Date(
    `${event.event_date}T00:00:00`
  );

  const day = eventDate
    .getDate()
    .toString()
    .padStart(2, "0");

  const month = eventDate
    .toLocaleDateString("en-US", {
      month: "short",
    })
    .toUpperCase();

  const year = eventDate.getFullYear();

  const formattedDate =
    eventDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formatTime = (
    time: string | null
  ) => {
    if (!time) return null;

    const [hours, minutes] =
      time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  return (
    <section className="relative overflow-hidden bg-black text-white">

      {/* ======================================
          DECORATIVE NUMBER
      ====================================== */}

      <motion.div
        animate={{
          y: [0, -18, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute -right-6 top-0 z-0
          hidden select-none
          text-[18rem] font-semibold
          leading-none
          tracking-[-0.1em]
          text-white/[0.025]
          xl:block
        "
      >
        {day}
      </motion.div>

      <div
        className="
          relative z-10
          mx-auto grid
          max-w-[1500px]
          lg:min-h-[720px]
          lg:grid-cols-[0.92fr_1.08fr]
        "
      >

        {/* =================================
            CONTENT
        ================================= */}

        <div
          className="
            flex min-w-0
            flex-col justify-between
            px-5 py-12
            min-[375px]:px-6
            min-[375px]:py-14
            sm:px-8 sm:py-16
            lg:px-12 lg:py-20
            xl:px-16
          "
        >
          <FadeUp>
            <div className="min-w-0">

              {/* LABEL */}

              <div className="flex items-center gap-2.5 min-[375px]:gap-3">
                <span
                  className="
                    h-px w-6 shrink-0
                    bg-green-500
                    min-[375px]:w-8
                  "
                />

                <p
                  className="
                    text-[8px] font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-green-400
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.28em]
                  "
                >
                  Featured Event
                </p>
              </div>

              {/* CATEGORY */}

              <p
                className="
                  mt-6
                  break-words
                  text-[8px] font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-white/40
                  min-[375px]:mt-7
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.18em]
                  sm:mt-8
                  sm:text-[10px]
                  sm:tracking-[0.2em]
                "
              >
                {event.category}
              </p>

              {/* TITLE */}

              <h2
                className="
                  mt-3 max-w-2xl
                  break-words
                  text-[clamp(2.4rem,11vw,3.5rem)]
                  font-medium
                  leading-[0.96]
                  tracking-[-0.05em]
                  min-[375px]:mt-4
                  sm:text-5xl
                  lg:text-6xl
                  lg:leading-[0.95]
                  lg:tracking-[-0.055em]
                  xl:text-7xl
                "
              >
                {event.title}
              </h2>

              {/* DESCRIPTION */}

              {event.description && (
                <p
                  className="
                    mt-5 max-w-xl
                    break-words
                    text-[13px]
                    leading-6
                    text-white/50
                    min-[375px]:mt-6
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                    sm:mt-7
                    sm:text-base
                    sm:leading-8
                  "
                >
                  {event.description}
                </p>
              )}
            </div>
          </FadeUp>

          {/* =================================
              EVENT DETAILS
          ================================= */}

          <FadeUp>
            <div
              className="
                mt-9
                border-t border-white/15
                pt-6
                min-[375px]:mt-10
                min-[375px]:pt-7
                sm:mt-12
                lg:mt-16
              "
            >
              <div
                className="
                  grid grid-cols-2
                  gap-x-4 gap-y-6
                  min-[375px]:gap-x-5
                  sm:grid-cols-2
                  sm:gap-5
                "
              >

                {/* DATE */}

                <div className="col-span-2 flex min-w-0 items-start gap-3 sm:col-span-1">
                  <FiCalendar
                    className="
                      mt-0.5 shrink-0
                      text-sm text-green-400
                      sm:text-base
                    "
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        text-[7px] font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-white/30
                        min-[375px]:text-[8px]
                        min-[375px]:tracking-[0.18em]
                      "
                    >
                      Date
                    </p>

                    <p
                      className="
                        mt-1
                        text-[12px]
                        leading-5
                        text-white/75
                        min-[375px]:text-[13px]
                        sm:text-sm
                      "
                    >
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* TIME */}

                {event.start_time && (
                  <div className="col-span-2 flex min-w-0 items-start gap-3 min-[375px]:col-span-1 sm:col-span-1">
                    <FiClock
                      className="
                        mt-0.5 shrink-0
                        text-sm text-green-400
                        sm:text-base
                      "
                    />

                    <div className="min-w-0">
                      <p
                        className="
                          text-[7px] font-semibold
                          uppercase
                          tracking-[0.15em]
                          text-white/30
                          min-[375px]:text-[8px]
                          min-[375px]:tracking-[0.18em]
                        "
                      >
                        Time
                      </p>

                      <p
                        className="
                          mt-1
                          whitespace-nowrap
                          text-[12px]
                          leading-5
                          text-white/75
                          min-[375px]:text-[13px]
                          sm:text-sm
                        "
                      >
                        {formatTime(
                          event.start_time
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* LOCATION */}

                <div className="col-span-2 flex min-w-0 items-start gap-3">
                  <FiMapPin
                    className="
                      mt-0.5 shrink-0
                      text-sm text-green-400
                      sm:text-base
                    "
                  />

                  <div className="min-w-0">
                    <p
                      className="
                        text-[7px] font-semibold
                        uppercase
                        tracking-[0.15em]
                        text-white/30
                        min-[375px]:text-[8px]
                        min-[375px]:tracking-[0.18em]
                      "
                    >
                      Location
                    </p>

                    <p
                      className="
                        mt-1
                        max-w-xl
                        break-words
                        text-[12px]
                        leading-5
                        text-white/75
                        min-[375px]:text-[13px]
                        min-[375px]:leading-6
                        sm:text-sm
                      "
                    >
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================
                  REGISTRATION
              ================================= */}

              {event.registration_url && (
                <Link
                  href={
                    event.registration_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group mt-7
                    inline-flex
                    max-w-full
                    items-center
                    justify-between
                    gap-4
                    bg-green-700
                    px-5 py-4
                    text-[8px] font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white
                    transition-colors
                    hover:bg-white
                    hover:text-black
                    min-[375px]:gap-5
                    min-[375px]:px-6
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.18em]
                    sm:mt-8
                  "
                >
                  <span>
                    Register for Event
                  </span>

                  <FiArrowUpRight
                    className="
                      shrink-0
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </Link>
              )}
            </div>
          </FadeUp>
        </div>

        {/* =================================
            IMAGE
        ================================= */}

        <Reveal
          className="
            relative
            min-h-[360px]
            overflow-hidden
            min-[375px]:min-h-[400px]
            sm:min-h-[480px]
            lg:min-h-full
          "
        >
          {event.image_url ? (
            <Parallax
              distance={55}
              className="absolute inset-0"
            >
              <img
                src={event.image_url}
                alt={event.title}
                className="
                  absolute inset-0
                  h-[115%] w-full
                  object-cover
                "
              />
            </Parallax>
          ) : (
            <div className="absolute inset-0 bg-[#151515]" />
          )}

          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/55
              via-transparent
              to-transparent
              lg:bg-gradient-to-r
              lg:from-black/20
              lg:to-transparent
            "
          />

          {/* =================================
              DATE BLOCK
          ================================= */}

          <div
            className="
              absolute bottom-0 left-0
              bg-white
              px-5 py-4
              text-black
              min-[375px]:px-6
              min-[375px]:py-5
              sm:px-8
              sm:py-7
            "
          >
            <div
              className="
                flex items-end
                gap-3
                min-[375px]:gap-4
              "
            >
              <p
                className="
                  text-[2.75rem]
                  font-medium
                  leading-none
                  tracking-[-0.07em]
                  min-[375px]:text-5xl
                  sm:text-6xl
                "
              >
                {day}
              </p>

              <div className="pb-0.5 min-[375px]:pb-1">
                <p
                  className="
                    text-[9px] font-semibold
                    uppercase
                    tracking-[0.17em]
                    text-green-700
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.2em]
                  "
                >
                  {month}
                </p>

                <p
                  className="
                    mt-0.5
                    text-[8px]
                    text-black/40
                    min-[375px]:mt-1
                    min-[375px]:text-[9px]
                  "
                >
                  {year}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedEvent;