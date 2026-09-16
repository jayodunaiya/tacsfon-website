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

  if (events.length === 0) {
    return (
      <section className="bg-[#F7F7F3] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
            What's Ahead
          </p>

          <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em]">
            Upcoming events.
          </h2>

          <p className="mt-7 max-w-md text-sm leading-7 text-black/45">
            There are no upcoming events at the
            moment. Check back soon for what is
            happening next in the family.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F7F7F3] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

      <div className="mx-auto max-w-[1400px]">

        <FadeUp>
          <div className="grid gap-6 border-b border-black/10 pb-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                What's Ahead
              </p>

              <h2 className="mt-4 text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Upcoming
                <span className="block">
                  gatherings.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-black/45 lg:justify-self-end">
              Make room for fellowship, worship,
              growth and unforgettable moments
              with the family.
            </p>

          </div>
        </FadeUp>


        <Stagger className="mt-4">

          {events.map((event, index) => {
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
                <article className="group grid gap-6 border-b border-black/10 py-8 transition-colors lg:grid-cols-[110px_220px_1fr_auto] lg:items-center lg:gap-8">

                  {/* DATE */}
                  <div>
                    <p className="text-5xl font-medium leading-none tracking-[-0.07em]">
                      {day}
                    </p>

                    <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-green-700">
                      {month}
                    </p>
                  </div>

                  {/* IMAGE */}
                  <div className="overflow-hidden bg-black">
                    {event.image_url ? (
                      <img
                        src={
                          event.image_url
                        }
                        alt={
                          event.title
                        }
                        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] lg:aspect-[4/3]"
                      />
                    ) : (
                      <div className="aspect-[16/10] bg-black/90 lg:aspect-[4/3]" />
                    )}
                  </div>

                  {/* DETAILS */}
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-green-700">
                      {event.category}
                    </p>

                    <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                      {event.title}
                    </h3>

                    {event.description && (
                      <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                        {event.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[10px] text-black/45">

                      <span className="flex items-center gap-1.5">
                        <FiCalendar />

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

                      {event.start_time && (
                        <span className="flex items-center gap-1.5">
                          <FiClock />

                          {formatTime(
                            event.start_time
                          )}
                        </span>
                      )}

                      <span className="flex items-center gap-1.5">
                        <FiMapPin />

                        {event.location}
                      </span>

                    </div>
                  </div>

                  {/* ACTION */}
                  <div>
                    {event.registration_url ? (
                      <Link
                        href={
                          event.registration_url
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Register for ${event.title}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-all duration-300 hover:border-green-700 hover:bg-green-700 hover:text-white"
                      >
                        <FiArrowUpRight />
                      </Link>
                    ) : (
                      <div className="hidden h-12 w-12 items-center justify-center rounded-full border border-black/10 text-black/20 lg:flex">
                        <FiArrowUpRight />
                      </div>
                    )}
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