"use client";

import { Event } from "@/types/event.types";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

interface PastEventsProps {
  events: Event[];
}

const PastEvents = ({
  events,
}: PastEventsProps) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">

      <div className="mx-auto max-w-[1400px]">

        <FadeUp>
          <div className="flex flex-col gap-5 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                Looking Back
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
                Past moments.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-black/40">
              Moments of fellowship,
              worship and growth we've
              shared together.
            </p>

          </div>
        </FadeUp>


        <Stagger className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">

          {events.map((event) => {
            const eventDate =
              new Date(
                `${event.event_date}T00:00:00`
              );

            return (
              <StaggerItem
                key={event.id}
              >
                <article className="group">

                  <div className="relative overflow-hidden bg-black">

                    {event.image_url ? (
                      <img
                        src={
                          event.image_url
                        }
                        alt={
                          event.title
                        }
                        className="aspect-[4/5] w-full object-cover grayscale-[35%] transition-all duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="aspect-[4/5] bg-black" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5">

                      <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-green-400">
                        {event.category}
                      </p>

                      <h3 className="mt-2 text-xl font-medium tracking-[-0.035em] text-white">
                        {event.title}
                      </h3>

                    </div>

                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">

                    <p className="text-[10px] text-black/40">
                      {eventDate.toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-black/25">
                      Archive
                    </span>

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

export default PastEvents;