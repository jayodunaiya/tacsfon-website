"use client";

import Link from "next/link";
import {
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

import { Event } from "@/types/event.types";
import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents = ({
  events,
}: UpcomingEventsProps) => {
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

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (events.length === 0) {
    return (
      <section
        className="
          bg-[#F7F7F3]
          px-5 py-16
          min-[375px]:px-6
          min-[375px]:py-20
          sm:px-8
          lg:px-12
          lg:py-28
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <p
            className="
              text-[8px] font-semibold
              uppercase
              tracking-[0.2em]
              text-green-700
              min-[375px]:text-[9px]
              min-[375px]:tracking-[0.25em]
            "
          >
            What&apos;s Ahead
          </p>

          <h2
            className="
              mt-3
              text-[clamp(2.3rem,11vw,3rem)]
              font-medium
              leading-[0.95]
              tracking-[-0.05em]
              min-[375px]:mt-4
            "
          >
            Upcoming events.
          </h2>

          <p
            className="
              mt-5 max-w-md
              text-[13px]
              leading-6
              text-black/45
              min-[375px]:mt-6
              min-[375px]:text-sm
              min-[375px]:leading-7
              sm:mt-7
            "
          >
            There are no upcoming events at the
            moment. Check back soon for what is
            happening next in the family.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        bg-[#F7F7F3]
        px-5 py-16
        min-[375px]:px-6
        min-[375px]:py-20
        sm:px-8
        lg:px-12
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ======================================
            SECTION HEADING
        ====================================== */}

        <FadeUp>
          <div
            className="
              grid gap-5
              border-b border-black/10
              pb-7
              min-[375px]:gap-6
              min-[375px]:pb-8
              lg:grid-cols-[1fr_0.7fr]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  text-[8px] font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-green-700
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.25em]
                "
              >
                What&apos;s Ahead
              </p>

              <h2
                className="
                  mt-3
                  text-[clamp(2.5rem,11vw,3.5rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  min-[375px]:mt-4
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Upcoming

                <span className="block">
                  gatherings.
                </span>
              </h2>
            </div>

            <p
              className="
                max-w-md
                text-[13px]
                leading-6
                text-black/45
                min-[375px]:text-sm
                min-[375px]:leading-7
                lg:justify-self-end
              "
            >
              Make room for fellowship, worship,
              growth and unforgettable moments
              with the family.
            </p>
          </div>
        </FadeUp>

        {/* ======================================
            EVENTS
        ====================================== */}

        <Stagger className="mt-2 sm:mt-4">
          {events.map((event) => {
            const eventDate =
              new Date(
                `${event.event_date}T00:00:00`
              );

            const day =
              eventDate
                .getDate()
                .toString()
                .padStart(2, "0");

            const month =
              eventDate
                .toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                  }
                )
                .toUpperCase();

            return (
              <StaggerItem
                key={event.id}
              >
                <article
                  className="
                    group
                    border-b border-black/10
                    py-7
                    min-[375px]:py-8
                    lg:grid
                    lg:grid-cols-[110px_220px_1fr_auto]
                    lg:items-center
                    lg:gap-8
                  "
                >
                  {/* ==================================
                      MOBILE/TABLET TOP
                  ================================== */}

                  <div
                    className="
                      grid
                      grid-cols-[72px_minmax(0,1fr)]
                      items-stretch
                      gap-4
                      min-[375px]:grid-cols-[82px_minmax(0,1fr)]
                      min-[375px]:gap-5
                      sm:grid-cols-[100px_minmax(0,1fr)]
                      sm:gap-6
                      lg:contents
                    "
                  >
                    {/* DATE */}

                    <div
                      className="
                        flex flex-col
                        justify-between
                        border-l-2
                        border-green-700
                        py-1 pl-3
                        min-[375px]:pl-4
                        lg:block
                        lg:border-l-0
                        lg:py-0
                        lg:pl-0
                      "
                    >
                      <p
                        className="
                          text-[2.4rem]
                          font-medium
                          leading-none
                          tracking-[-0.07em]
                          min-[375px]:text-[2.75rem]
                          sm:text-5xl
                        "
                      >
                        {day}
                      </p>

                      <p
                        className="
                          mt-2
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-green-700
                          min-[375px]:text-[9px]
                          min-[375px]:tracking-[0.2em]
                        "
                      >
                        {month}
                      </p>
                    </div>

                    {/* IMAGE */}

                    <div className="min-w-0 overflow-hidden bg-black">
                      {event.image_url ? (
                        <img
                          src={
                            event.image_url
                          }
                          alt={
                            event.title
                          }
                          className="
                            aspect-[16/9]
                            h-full w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-[1.04]
                            lg:aspect-[4/3]
                            lg:h-auto
                          "
                        />
                      ) : (
                        <div
                          className="
                            aspect-[16/9]
                            h-full w-full
                            bg-black/90
                            lg:aspect-[4/3]
                            lg:h-auto
                          "
                        />
                      )}
                    </div>

                    {/* ==================================
                        DETAILS
                    ================================== */}

                    <div
                      className="
                        col-span-2
                        min-w-0
                        pt-1
                        lg:col-span-1
                        lg:pt-0
                      "
                    >
                      <p
                        className="
                          break-words
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.16em]
                          text-green-700
                          min-[375px]:tracking-[0.2em]
                        "
                      >
                        {event.category}
                      </p>

                      <h3
                        className="
                          mt-2
                          max-w-3xl
                          break-words
                          text-[1.6rem]
                          font-medium
                          leading-[1.05]
                          tracking-[-0.04em]
                          min-[375px]:text-[1.75rem]
                          sm:text-3xl
                        "
                      >
                        {event.title}
                      </h3>

                      {event.description && (
                        <p
                          className="
                            mt-3
                            max-w-xl
                            text-[13px]
                            leading-6
                            text-black/45
                            min-[375px]:text-sm
                          "
                        >
                          {event.description}
                        </p>
                      )}

                      {/* META */}

                      <div
                        className="
                          mt-4
                          flex min-w-0
                          flex-wrap
                          gap-x-4 gap-y-2.5
                          text-[9px]
                          leading-5
                          text-black/45
                          min-[375px]:gap-x-5
                          min-[375px]:text-[10px]
                        "
                      >
                        <span className="flex items-center gap-1.5">
                          <FiCalendar className="shrink-0" />

                          <span>
                            {eventDate.toLocaleDateString(
                              "en-US",
                              {
                                month:
                                  "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </span>

                        {event.start_time && (
                          <span className="flex items-center gap-1.5">
                            <FiClock className="shrink-0" />

                            <span className="whitespace-nowrap">
                              {formatTime(
                                event.start_time
                              )}
                            </span>
                          </span>
                        )}

                        <span
                          className="
                            flex min-w-0
                            items-start
                            gap-1.5
                            basis-full
                            sm:basis-auto
                          "
                        >
                          <FiMapPin className="mt-0.5 shrink-0" />

                          <span className="break-words">
                            {event.location}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* ==================================
                        ACTION
                    ================================== */}

                    <div
                      className="
                        col-span-2
                        mt-1
                        lg:col-span-1
                        lg:mt-0
                      "
                    >
                      {event.registration_url ? (
                        <>
                          {/* MOBILE/TABLET ACTION */}

                          <Link
                            href={
                              event.registration_url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Register for ${event.title}`}
                            className="
                              group/link
                              inline-flex
                              items-center gap-3
                              border-b
                              border-black/20
                              pb-1.5
                              text-[8px]
                              font-semibold
                              uppercase
                              tracking-[0.16em]
                              text-black
                              transition-colors
                              hover:border-green-700
                              hover:text-green-700
                              min-[375px]:text-[9px]
                              lg:hidden
                            "
                          >
                            Register for Event

                            <FiArrowUpRight
                              className="
                                transition-transform
                                duration-300
                                group-hover/link:translate-x-1
                                group-hover/link:-translate-y-1
                              "
                            />
                          </Link>

                          {/* DESKTOP ACTION */}

                          <Link
                            href={
                              event.registration_url
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Register for ${event.title}`}
                            className="
                              hidden h-12 w-12
                              items-center
                              justify-center
                              rounded-full
                              border border-black/15
                              transition-all
                              duration-300
                              hover:border-green-700
                              hover:bg-green-700
                              hover:text-white
                              lg:flex
                            "
                          >
                            <FiArrowUpRight />
                          </Link>
                        </>
                      ) : (
                        <div
                          className="
                            hidden h-12 w-12
                            items-center
                            justify-center
                            rounded-full
                            border border-black/10
                            text-black/20
                            lg:flex
                          "
                        >
                          <FiArrowUpRight />
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default UpcomingEvents;