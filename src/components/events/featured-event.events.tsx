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
      {/* Decorative number */}
      <motion.div
        animate={{
          y: [0, -18, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-6 top-0 z-0 hidden select-none text-[18rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.025] xl:block"
      >
        {day}
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-[1500px] lg:min-h-[720px] lg:grid-cols-[0.92fr_1.08fr]">

        {/* =================================
            CONTENT
        ================================= */}
        <div className="flex flex-col justify-between px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16">

          <FadeUp>
            <div>
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-green-500" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-green-400">
                  Featured Event
                </p>
              </div>

              <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                {event.category}
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-5xl lg:text-6xl xl:text-7xl">
                {event.title}
              </h2>

              {event.description && (
                <p className="mt-7 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                  {event.description}
                </p>
              )}
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mt-12 border-t border-white/15 pt-7 lg:mt-16">

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="flex items-start gap-3">
                  <FiCalendar className="mt-0.5 text-green-400" />

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">
                      Date
                    </p>

                    <p className="mt-1 text-sm text-white/75">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {event.start_time && (
                  <div className="flex items-start gap-3">
                    <FiClock className="mt-0.5 text-green-400" />

                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">
                        Time
                      </p>

                      <p className="mt-1 text-sm text-white/75">
                        {formatTime(
                          event.start_time
                        )}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 sm:col-span-2">
                  <FiMapPin className="mt-0.5 shrink-0 text-green-400" />

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30">
                      Location
                    </p>

                    <p className="mt-1 text-sm leading-6 text-white/75">
                      {event.location}
                    </p>
                  </div>
                </div>

              </div>

              {event.registration_url && (
                <Link
                  href={
                    event.registration_url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-5 bg-green-700 px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                >
                  Register for Event

                  <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              )}

            </div>
          </FadeUp>

        </div>

        {/* =================================
            IMAGE
        ================================= */}
        <Reveal className="relative min-h-[480px] overflow-hidden lg:min-h-full">

          {event.image_url ? (
            <Parallax
              distance={55}
              className="absolute inset-0"
            >
              <img
                src={event.image_url}
                alt={event.title}
                className="absolute inset-0 h-[115%] w-full object-cover"
              />
            </Parallax>
          ) : (
            <div className="absolute inset-0 bg-[#151515]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/20 lg:to-transparent" />

          {/* Date block */}
          <div className="absolute bottom-0 left-0 bg-white px-6 py-5 text-black sm:px-8 sm:py-7">

            <div className="flex items-end gap-4">
              <p className="text-5xl font-medium leading-none tracking-[-0.07em] sm:text-6xl">
                {day}
              </p>

              <div className="pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-green-700">
                  {month}
                </p>

                <p className="mt-1 text-[9px] text-black/40">
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