"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

import { Event } from "@/types/event.types";
import { getEvents } from "@/lib/events";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const UpcomingEventsHome = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * Stay Connected image parallax.
   */
  const featureImageY = useTransform(
    scrollYProgress,
    [0.35, 1],
    ["-5%", "5%"]
  );

  /*
   * Slight movement on the feature content.
   */
  const featureContentY = useTransform(
    scrollYProgress,
    [0.35, 1],
    ["2%", "-3%"]
  );

  /*
   * Small independent movement for the
   * bottom-right image label.
   */
  const imageLabelY = useTransform(
    scrollYProgress,
    [0.35, 1],
    ["10px", "-12px"]
  );

  // ==========================================
  // LOAD UPCOMING EVENTS FROM SUPABASE
  // ==========================================
  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcoming = data
        .filter((event) => {
          const eventDate = new Date(
            `${event.event_date}T00:00:00`
          );

          return eventDate >= today;
        })
        .sort((a, b) => {
          const firstDate = new Date(
            `${a.event_date}T00:00:00`
          ).getTime();

          const secondDate = new Date(
            `${b.event_date}T00:00:00`
          ).getTime();

          return firstDate - secondDate;
        })
        .slice(0, 4);

      setEvents(upcoming);
      setIsLoading(false);
    };

    loadEvents();
  }, []);

  // ==========================================
  // FORMAT TIME
  // ==========================================
  const formatTime = (time: string | null) => {
    if (!time) return "Time TBA";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#F7F7F3] px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ======================================
            SECTION HEADER
        ====================================== */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">

          <FadeUp>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">

              <span className="relative h-px w-10 overflow-hidden bg-green-700">
                <motion.span
                  animate={{
                    x: ["-120%", "220%"],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-green-300"
                />
              </span>

              What&apos;s Happening

            </p>
          </FadeUp>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <FadeUp delay={0.1}>
              <h2 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">

                There&apos;s always

                <span className="block text-green-700">
                  a place to belong.
                </span>

              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <motion.div
                whileHover={{
                  x: 3,
                }}
                transition={{
                  duration: 0.25,
                }}
              >
                <Link
                  href="/events"
                  className="group mb-2 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-black"
                >
                  View All Events

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                    <FiArrowUpRight />
                  </span>
                </Link>
              </motion.div>
            </FadeUp>

          </div>

        </div>

        {/* ======================================
            EVENTS LIST
        ====================================== */}

        {isLoading ? (
          <div className="border-y border-black/10 py-16">

            <div className="flex items-center gap-4">

              <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/10 border-t-green-700" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/35">
                Loading upcoming events
              </p>

            </div>

          </div>
        ) : events.length === 0 ? (
          <FadeUp>
            <div className="border-y border-black/10 py-16">

              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-700">
                Coming Soon
              </p>

              <h3 className="mt-4 text-3xl font-medium tracking-[-0.04em]">
                The next gathering is on the way.
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-black/45">
                There are no upcoming events published at the
                moment. Check back soon to see what&apos;s
                happening in the family.
              </p>

            </div>
          </FadeUp>
        ) : (
          <Stagger className="border-t border-black/10">

            {events.map((event, index) => {
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

              const weekday = eventDate.toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                }
              );

              return (
                <StaggerItem key={event.id}>

                  <motion.div
                    whileHover={{
                      x: 4,
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    <div className="group relative grid gap-7 border-b border-black/10 py-8 transition-all duration-300 md:grid-cols-[140px_1fr_auto] md:items-center lg:grid-cols-[160px_1fr_260px_60px] lg:py-10">

                      {/* Hover Background */}
                      <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-white transition-transform duration-300 ease-out group-hover:scale-y-100" />

                      {/* ========================
                          DATE
                      ======================== */}
                      <div className="flex items-center gap-4">

                        <span className="text-5xl font-medium leading-none tracking-[-0.06em] text-black transition-all duration-300 group-hover:-translate-y-1 group-hover:text-green-700 md:text-6xl">
                          {day}
                        </span>

                        <div>

                          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-green-700">
                            {month}
                          </p>

                          <p className="mt-1 text-xs text-black/40">
                            {weekday}
                          </p>

                        </div>

                      </div>

                      {/* ========================
                          EVENT INFORMATION
                      ======================== */}
                      <div>

                        <div className="mb-3 flex items-center gap-3">

                          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-700">
                            {event.category}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-black/20" />

                          <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-black/30">
                            Upcoming
                          </span>

                        </div>

                        <h3 className="max-w-2xl text-2xl font-medium tracking-[-0.03em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-800 md:text-3xl lg:text-4xl">
                          {event.title}
                        </h3>

                      </div>

                      {/* ========================
                          TIME & LOCATION
                      ======================== */}
                      <div className="flex flex-col gap-3 text-sm text-black/45 md:col-start-2 lg:col-start-auto">

                        <div className="flex items-center gap-3">

                          <FiClock className="shrink-0 text-green-700" />

                          <span>
                            {formatTime(event.start_time)}
                          </span>

                        </div>

                        <div className="flex items-center gap-3">

                          <FiMapPin className="shrink-0 text-green-700" />

                          <span>
                            {event.location}
                          </span>

                        </div>

                      </div>

                      {/* ========================
                          ARROW
                      ======================== */}
                      <div className="hidden justify-end lg:flex">

                        <Link
                          href="/events"
                          aria-label={`View ${event.title}`}
                          className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white"
                        >
                          <FiArrowRight />
                        </Link>

                      </div>

                      {/* Mobile Event Number */}
                      <span className="absolute right-0 top-8 text-[10px] font-medium tracking-[0.2em] text-black/20 lg:hidden">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>

                  </motion.div>

                </StaggerItem>
              );
            })}

          </Stagger>
        )}

        {/* ======================================
            STAY CONNECTED FEATURE
        ====================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative mt-16 min-h-[600px] overflow-hidden bg-black md:min-h-[680px] lg:min-h-[720px]"
        >

          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">

            <motion.div
              style={{
                y: featureImageY,
              }}
              className="absolute -inset-[6%]"
            >

              <motion.img
                src="/images/church-gathering.jpg"
                alt="Church gathering"
                initial={{
                  scale: 1.08,
                }}
                whileInView={{
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full w-full object-cover object-center transition-transform duration-[1600ms] ease-out group-hover:scale-[1.025]"
              />

            </motion.div>

          </div>

          {/* Main Blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          {/* Bottom Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

          {/* Left Readability */}
          <div className="absolute inset-y-0 left-0 w-full bg-black/20 lg:w-[45%]" />

          {/* Ambient Green */}
          <motion.div
            animate={{
              opacity: [0.01, 0.045, 0.01],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-0 bg-green-700"
          />

          {/* ====================================
              CONTENT
          ==================================== */}
          <motion.div
            style={{
              y: featureContentY,
            }}
            className="relative z-10 flex min-h-[600px] flex-col justify-between px-8 py-10 md:min-h-[680px] md:px-12 md:py-14 lg:min-h-[720px] lg:w-[52%] lg:px-16 lg:py-16"
          >

            <div>

              {/* Icon */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: -10,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                className="mb-10"
              >

                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    borderColor: [
                      "rgba(255,255,255,0.25)",
                      "rgba(34,197,94,0.65)",
                      "rgba(255,255,255,0.25)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border text-green-500 backdrop-blur-sm"
                >
                  <FiCalendar className="text-xl" />
                </motion.div>

              </motion.div>

              {/* Label */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                }}
                className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-500"
              >

                Stay Connected

                <span className="relative h-px w-9 overflow-hidden bg-green-500/40">

                  <motion.span
                    animate={{
                      x: ["-100%", "220%"],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 2.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 left-0 w-1/2 bg-green-400"
                  />

                </span>

              </motion.p>

              {/* Heading */}
              <motion.h3
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 max-w-xl text-5xl font-medium leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5rem]"
              >

                Never miss

                <span className="block text-green-500">
                  what&apos;s next.
                </span>

              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                }}
                className="mt-8 max-w-md text-sm leading-7 text-white/65 md:text-base"
              >
                Stay informed about upcoming services,
                gatherings, programmes and special events
                happening within the church.
              </motion.p>

            </div>

            {/* CTA */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.65,
              }}
              className="mt-16"
            >

              <motion.div
                whileHover={{
                  x: 4,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <Link
                  href="/events"
                  className="group/cta inline-flex w-fit items-center gap-5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Explore Calendar

                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500 text-white transition-all duration-300 group-hover/cta:bg-green-600">
                    <FiArrowRight className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </span>
                </Link>

              </motion.div>

            </motion.div>

          </motion.div>

          {/* ====================================
              IMAGE LABEL
          ==================================== */}
          <motion.div
            style={{
              y: imageLabelY,
            }}
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.8,
            }}
            className="absolute bottom-8 right-8 z-10 hidden items-center gap-4 md:flex lg:bottom-10 lg:right-12"
          >

            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/70">
              Gather · Grow · Belong
            </span>

            <span className="relative h-px w-12 overflow-hidden bg-green-500/40">

              <motion.span
                animate={{
                  x: ["-100%", "220%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 left-0 w-1/2 bg-green-400"
              />

            </span>

          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default UpcomingEventsHome;