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
    <section
      className="
        overflow-hidden bg-white
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
            HEADING
        ====================================== */}

        <FadeUp>
          <div
            className="
              flex flex-col
              gap-4
              border-b border-black/10
              pb-7
              min-[375px]:gap-5
              min-[375px]:pb-8
              sm:flex-row
              sm:items-end
              sm:justify-between
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
                Looking Back
              </p>

              <h2
                className="
                  mt-3
                  text-[clamp(2.5rem,11vw,3.25rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  min-[375px]:mt-4
                  sm:text-5xl
                "
              >
                Past moments.
              </h2>
            </div>

            <p
              className="
                max-w-sm
                text-[13px]
                leading-6
                text-black/40
                min-[375px]:text-sm
                min-[375px]:leading-7
              "
            >
              Moments of fellowship,
              worship and growth we&apos;ve
              shared together.
            </p>
          </div>
        </FadeUp>

        {/* ======================================
            PAST EVENTS GRID
        ====================================== */}

        <Stagger
          className="
            mt-7
            grid grid-cols-2
            gap-x-3 gap-y-8
            min-[375px]:mt-8
            min-[375px]:gap-x-4
            min-[375px]:gap-y-9
            sm:mt-10
            sm:grid-cols-2
            sm:gap-x-5
            sm:gap-y-12
            lg:grid-cols-3
          "
        >
          {events.map((event) => {
            const eventDate =
              new Date(
                `${event.event_date}T00:00:00`
              );

            return (
              <StaggerItem
                key={event.id}
              >
                <article className="group min-w-0">

                  {/* ==================================
                      IMAGE
                  ================================== */}

                  <div className="relative overflow-hidden bg-black">
                    {event.image_url ? (
                      <img
                        src={
                          event.image_url
                        }
                        alt={
                          event.title
                        }
                        loading="lazy"
                        className="
                          aspect-[4/5]
                          w-full
                          object-cover
                          grayscale-[35%]
                          transition-all
                          duration-700
                          group-hover:scale-[1.035]
                          group-hover:grayscale-0
                        "
                      />
                    ) : (
                      <div className="aspect-[4/5] bg-black" />
                    )}

                    <div
                      className="
                        absolute inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-black/5
                        to-transparent
                        sm:from-black/60
                        sm:via-transparent
                      "
                    />

                    {/* EVENT CONTENT */}

                    <div
                      className="
                        absolute
                        bottom-3 left-3 right-3
                        min-[375px]:bottom-4
                        min-[375px]:left-4
                        min-[375px]:right-4
                        sm:bottom-5
                        sm:left-5
                        sm:right-5
                      "
                    >
                      <p
                        className="
                          truncate
                          text-[6px]
                          font-semibold
                          uppercase
                          tracking-[0.13em]
                          text-green-400
                          min-[375px]:text-[7px]
                          min-[375px]:tracking-[0.16em]
                          sm:text-[8px]
                          sm:tracking-[0.2em]
                        "
                      >
                        {event.category}
                      </p>

                      <h3
                        className="
                          mt-1.5
                          line-clamp-3
                          break-words
                          text-[0.95rem]
                          font-medium
                          leading-[1.08]
                          tracking-[-0.03em]
                          text-white
                          min-[375px]:mt-2
                          min-[375px]:text-base
                          sm:text-xl
                          sm:tracking-[-0.035em]
                        "
                      >
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* ==================================
                      DATE + ARCHIVE
                  ================================== */}

                  <div
                    className="
                      mt-3
                      flex min-w-0
                      items-start
                      justify-between
                      gap-2
                      min-[375px]:gap-3
                      sm:mt-4
                      sm:items-center
                      sm:gap-4
                    "
                  >
                    <p
                      className="
                        min-w-0
                        text-[8px]
                        leading-4
                        text-black/40
                        min-[375px]:text-[9px]
                        sm:text-[10px]
                      "
                    >
                      {eventDate.toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <span
                      className="
                        hidden shrink-0
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-black/25
                        min-[375px]:block
                        sm:text-[8px]
                        sm:tracking-[0.17em]
                      "
                    >
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