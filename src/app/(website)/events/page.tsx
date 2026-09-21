"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Event } from "@/types/event.types";
import { getEvents } from "@/lib/events";

import FeaturedEvent from "@/components/events/featured-event.events";
import UpcomingEvents from "@/components/events/upcoming-events.events";
import PastEvents from "@/components/events/past-events.events";

import FadeUp from "@/components/motion/fade-up.motion";

const EventsPage = () => {
  const [events, setEvents] =
    useState<Event[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data =
        await getEvents();

      setEvents(data);
      setIsLoading(false);
    };

    loadEvents();
  }, []);

  const {
    featuredEvent,
    upcomingEvents,
    pastEvents,
  } = useMemo(() => {
    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const upcoming =
      events.filter((event) => {
        const eventDate =
          new Date(
            `${event.event_date}T00:00:00`
          );

        return eventDate >= today;
      });

    const past =
      events
        .filter((event) => {
          const eventDate =
            new Date(
              `${event.event_date}T00:00:00`
            );

          return eventDate < today;
        })
        .sort(
          (a, b) =>
            new Date(
              `${b.event_date}T00:00:00`
            ).getTime() -
            new Date(
              `${a.event_date}T00:00:00`
            ).getTime()
        );

    /*
     * Priority:
     *
     * 1. Featured upcoming event
     * 2. Nearest upcoming event
     *
     * We don't want an old featured event
     * sitting at the top of the page.
     */
    const featured =
      upcoming.find(
        (event) =>
          event.featured
      ) ??
      upcoming[0] ??
      null;

    /*
     * Don't repeat the featured event
     * immediately under itself.
     */
    const remainingUpcoming =
      featured
        ? upcoming.filter(
            (event) =>
              event.id !==
              featured.id
          )
        : upcoming;

    return {
      featuredEvent:
        featured,

      upcomingEvents:
        remainingUpcoming,

      pastEvents: past,
    };
  }, [events]);

  // ==========================================
  // LOADING
  // ==========================================

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-green-700" />

          <p
            className="
              mt-5
              text-[8px] font-semibold
              uppercase
              tracking-[0.2em]
              text-black/35
              min-[375px]:text-[9px]
              min-[375px]:tracking-[0.25em]
            "
          >
            Loading Events
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-white">

      {/* ======================================
          HERO
      ====================================== */}

      <section
        className="
          relative overflow-hidden
          bg-white
          px-5 pb-14 pt-28
          min-[375px]:px-6
          min-[375px]:pb-16
          min-[375px]:pt-32
          sm:px-8 sm:pb-20 sm:pt-32
          lg:px-12 lg:pb-24 lg:pt-36
        "
      >
        {/* Floating decorative word */}

        <motion.p
          animate={{
            x: [0, 18, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute -right-10 top-20
            hidden select-none
            text-[11rem] font-semibold
            leading-none
            tracking-[-0.09em]
            text-black/[0.025]
            lg:block
            xl:text-[15rem]
          "
        >
          GATHER
        </motion.p>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <FadeUp>
            <div
              className="
                grid gap-8
                min-[375px]:gap-9
                sm:gap-10
                lg:grid-cols-[1fr_0.55fr]
                lg:items-end
              "
            >
              <div>
                <div className="flex items-center gap-2.5 min-[375px]:gap-3">
                  <span
                    className="
                      h-px w-6
                      shrink-0
                      bg-green-700
                      min-[375px]:w-8
                    "
                  />

                  <p
                    className="
                      text-[8px] font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-green-700
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.28em]
                    "
                  >
                    Events
                  </p>
                </div>

                <h1
                  className="
                    mt-6 max-w-4xl
                    text-[clamp(3rem,14.5vw,4.5rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.06em]
                    min-[375px]:mt-7
                    sm:text-6xl
                    md:text-7xl
                    lg:text-[6.5rem]
                    lg:leading-[0.88]
                    lg:tracking-[-0.065em]
                    xl:text-[7.5rem]
                  "
                >
                  There&apos;s always

                  <span className="block text-green-700">
                    room for you.
                  </span>
                </h1>
              </div>

              <div className="lg:pb-2">
                <p
                  className="
                    max-w-md
                    text-[13px]
                    leading-6
                    text-black/45
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                    sm:text-base
                    sm:leading-8
                  "
                >
                  From worship gatherings to
                  fellowship, outreach and
                  special programmes — discover
                  what&apos;s happening in the
                  TACSFON family.
                </p>

                <div
                  className="
                    mt-5 flex
                    items-center gap-3
                    min-[375px]:mt-6
                    min-[375px]:gap-4
                    sm:mt-7
                  "
                >
                  <div
                    className="
                      h-px w-9
                      shrink-0
                      bg-black/15
                      min-[375px]:w-12
                    "
                  />

                  <p
                    className="
                      text-[7px] font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-black/30
                      min-[375px]:text-[8px]
                      min-[375px]:tracking-[0.22em]
                    "
                  >
                    TACSFON LAUTECH
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ======================================
          FEATURED
      ====================================== */}

      {featuredEvent && (
        <FeaturedEvent
          event={featuredEvent}
        />
      )}

      {/* ======================================
          NO UPCOMING EVENTS AT ALL
      ====================================== */}

      {!featuredEvent &&
        upcomingEvents.length ===
          0 && (
          <section
            className="
              bg-black
              px-5 py-16
              text-white
              min-[375px]:px-6
              min-[375px]:py-20
              sm:px-8
              lg:px-12
              lg:py-28
            "
          >
            <div className="mx-auto max-w-[1400px]">
              <FadeUp>
                <p
                  className="
                    text-[8px] font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-green-400
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.25em]
                  "
                >
                  Coming Soon
                </p>

                <h2
                  className="
                    mt-4 max-w-3xl
                    text-[clamp(2.4rem,11vw,3.5rem)]
                    font-medium
                    leading-[0.95]
                    tracking-[-0.05em]
                    min-[375px]:mt-5
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  The next gathering
                  will be worth
                  waiting for.
                </h2>

                <p
                  className="
                    mt-5 max-w-md
                    text-[13px]
                    leading-6
                    text-white/45
                    min-[375px]:mt-6
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                  "
                >
                  There are no upcoming
                  events published at the
                  moment. Check back soon.
                </p>
              </FadeUp>
            </div>
          </section>
        )}

      {/* ======================================
          UPCOMING
      ====================================== */}

      {(featuredEvent ||
        upcomingEvents.length >
          0) && (
        <UpcomingEvents
          events={
            upcomingEvents
          }
        />
      )}

      {/* ======================================
          PAST EVENTS
      ====================================== */}

      <PastEvents
        events={pastEvents}
      />

      {/* ======================================
          FINAL CTA
      ====================================== */}

      <section
        className="
          relative overflow-hidden
          bg-green-700
          px-5 py-16
          text-white
          min-[375px]:px-6
          min-[375px]:py-20
          sm:px-8
          lg:px-12
          lg:py-28
        "
      >
        <motion.div
          animate={{
            y: [0, -16, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            -bottom-4 -right-5
            select-none
            text-[6rem]
            font-semibold
            leading-none
            tracking-[-0.08em]
            text-white/[0.05]
            min-[375px]:text-[7rem]
            sm:-bottom-10
            sm:right-0
            sm:text-[13rem]
            lg:text-[18rem]
          "
        >
          FAMILY
        </motion.div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <FadeUp>
            <p
              className="
                text-[8px] font-semibold
                uppercase
                tracking-[0.22em]
                text-white/60
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.28em]
              "
            >
              More Than An Event
            </p>

            <h2
              className="
                mt-5 max-w-4xl
                text-[clamp(2.4rem,11vw,3.5rem)]
                font-medium
                leading-[0.94]
                tracking-[-0.05em]
                min-[375px]:mt-6
                sm:text-5xl
                lg:text-7xl
                lg:leading-[0.92]
                lg:tracking-[-0.055em]
              "
            >
              Come for the gathering.

              <span className="block text-white/55">
                Stay for the family.
              </span>
            </h2>

            <p
              className="
                mt-5 max-w-lg
                text-[13px]
                leading-6
                text-white/65
                min-[375px]:mt-6
                min-[375px]:text-sm
                min-[375px]:leading-7
                sm:mt-7
                sm:text-base
                sm:leading-8
              "
            >
              There&apos;s a place for you
              here. Join us as we grow,
              worship and experience
              Christ together.
            </p>
          </FadeUp>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;