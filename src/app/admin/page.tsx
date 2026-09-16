"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiEdit3,
  FiImage,
  FiMapPin,
  FiPlus,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";
import { Event } from "@/types/event.types";
import { Sermon } from "@/types/sermon.types";

const AdminDashboardPage = () => {
  const router = useRouter();

  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // LOAD DASHBOARD
  // ==========================================
  useEffect(() => {
    const loadDashboard = async () => {
      // Check authentication
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      // Check admin status
      const {
        data: isAdmin,
        error: adminError,
      } = await supabase.rpc("is_admin");

      if (adminError || !isAdmin) {
        await supabase.auth.signOut();

        router.push("/admin/login");
        return;
      }

      // Fetch sermons + events together
      const [sermonsResponse, eventsResponse] =
        await Promise.all([
          supabase
            .from("sermons")
            .select("*")
            .order("sermon_date", {
              ascending: false,
            }),

          supabase
            .from("events")
            .select("*")
            .order("event_date", {
              ascending: true,
            }),
        ]);

      if (sermonsResponse.error) {
        console.error(
          "Unable to fetch sermons:",
          sermonsResponse.error
        );
      }

      if (eventsResponse.error) {
        console.error(
          "Unable to fetch events:",
          eventsResponse.error
        );
      }

      setSermons(sermonsResponse.data ?? []);
      setEvents(eventsResponse.data ?? []);

      setIsLoading(false);
    };

    loadDashboard();
  }, [router]);

  // ==========================================
  // DATE HELPERS
  // ==========================================
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(
      `${event.event_date}T00:00:00`
    );

    return eventDate >= today;
  });

  const pastEvents = events.filter((event) => {
    const eventDate = new Date(
      `${event.event_date}T00:00:00`
    );

    return eventDate < today;
  });

  const recentSermons = sermons.slice(0, 3);
  const nearestEvents = upcomingEvents.slice(0, 3);

  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (date: string) => {
    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // ==========================================
  // FORMAT TIME
  // ==========================================
  const formatTime = (time: string | null) => {
    if (!time) return null;

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

  // ==========================================
  // LOADING
  // ==========================================
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-black/10 border-t-green-700" />

          <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
            Loading Dashboard
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-14">

        {/* ======================================
            INTRO
        ====================================== */}
        <section className="border-b border-black/10 pb-9 lg:pb-12">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-green-700">
                TACSFON LAUTECH
              </p>

              <h1 className="mt-3 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Website
                <span className="block text-green-700">
                  Dashboard.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-black/45">
                Manage sermons, events and other
                content appearing across the
                TACSFON LAUTECH website.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/sermons"
                className="inline-flex items-center gap-2 bg-black px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-green-700"
              >
                <FiPlus />
                Add Sermon
              </Link>

              <Link
                href="/admin/events"
                className="inline-flex items-center gap-2 bg-green-700 px-5 py-3.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-black"
              >
                <FiPlus />
                Add Event
              </Link>
            </div>

          </div>
        </section>

        {/* ======================================
            STATS
        ====================================== */}
        <section className="grid border-b border-black/10 sm:grid-cols-2 xl:grid-cols-4">

          <div className="border-b border-black/10 py-7 sm:border-r sm:px-6 xl:border-b-0 xl:pl-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-black/35">
                  Sermons
                </p>

                <p className="mt-4 text-4xl font-medium tracking-[-0.05em]">
                  {sermons.length
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              <FiBookOpen className="text-lg text-green-700" />
            </div>
          </div>

          <div className="border-b border-black/10 py-7 sm:px-6 xl:border-b-0 xl:border-r">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-black/35">
                  Upcoming Events
                </p>

                <p className="mt-4 text-4xl font-medium tracking-[-0.05em]">
                  {upcomingEvents.length
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              <FiCalendar className="text-lg text-green-700" />
            </div>
          </div>

          <div className="border-b border-black/10 py-7 sm:border-r sm:px-6 xl:border-b-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-black/35">
                  Past Events
                </p>

                <p className="mt-4 text-4xl font-medium tracking-[-0.05em]">
                  {pastEvents.length
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              <FiClock className="text-lg text-black/25" />
            </div>
          </div>

          <div className="py-7 sm:px-6 xl:pr-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-black/35">
                  Total Events
                </p>

                <p className="mt-4 text-4xl font-medium tracking-[-0.05em]">
                  {events.length
                    .toString()
                    .padStart(2, "0")}
                </p>
              </div>

              <FiCalendar className="text-lg text-green-700" />
            </div>
          </div>

        </section>

        {/* ======================================
            MANAGEMENT
        ====================================== */}
        <section className="py-10 lg:py-14">

          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-700">
                Management
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                Manage website content
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-px overflow-hidden bg-black/10 md:grid-cols-2 xl:grid-cols-4">

            <Link
              href="/admin/sermons"
              className="group bg-white p-6 transition-colors hover:bg-black hover:text-white sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
                  <FiBookOpen />
                </div>

                <FiArrowUpRight className="text-black/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </div>

              <h3 className="mt-10 text-xl font-medium tracking-[-0.035em]">
                Sermons
              </h3>

              <p className="mt-2 text-xs leading-6 text-black/40 group-hover:text-white/50">
                Upload audio sermons, flyers and
                manage the sermon archive.
              </p>
            </Link>

            <Link
              href="/admin/events"
              className="group bg-white p-6 transition-colors hover:bg-black hover:text-white sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
                  <FiCalendar />
                </div>

                <FiArrowUpRight className="text-black/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </div>

              <h3 className="mt-10 text-xl font-medium tracking-[-0.035em]">
                Events
              </h3>

              <p className="mt-2 text-xs leading-6 text-black/40 group-hover:text-white/50">
                Publish programmes, dates,
                locations and registration links.
              </p>
            </Link>

            <Link
              href="/admin/editorial"
              className="group bg-white p-6 transition-colors hover:bg-black hover:text-white sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  <FiEdit3 />
                </div>

                <FiArrowUpRight className="text-black/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </div>

              <h3 className="mt-10 text-xl font-medium tracking-[-0.035em]">
                Editorial
              </h3>

              <p className="mt-2 text-xs leading-6 text-black/40 group-hover:text-white/50">
                Manage articles and written
                content from the fellowship.
              </p>

              <span className="mt-5 inline-block text-[8px] font-semibold uppercase tracking-[0.18em] text-black/30 group-hover:text-white/40">
                Coming Next
              </span>
            </Link>

            <Link
              href="/admin/gallery"
              className="group bg-white p-6 transition-colors hover:bg-black hover:text-white sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  <FiImage />
                </div>

                <FiArrowUpRight className="text-black/30 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </div>

              <h3 className="mt-10 text-xl font-medium tracking-[-0.035em]">
                Gallery
              </h3>

              <p className="mt-2 text-xs leading-6 text-black/40 group-hover:text-white/50">
                Manage photographs and visual
                moments from TACSFON.
              </p>

              <span className="mt-5 inline-block text-[8px] font-semibold uppercase tracking-[0.18em] text-black/30 group-hover:text-white/40">
                Coming Next
              </span>
            </Link>

          </div>

        </section>

        {/* ======================================
            RECENT CONTENT
        ====================================== */}
        <section className="grid gap-8 pb-14 xl:grid-cols-2">

          {/* RECENT SERMONS */}
          <div className="bg-white p-6 sm:p-8">

            <div className="flex items-end justify-between gap-4 border-b border-black/10 pb-5">

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-700">
                  Sermons
                </p>

                <h2 className="mt-2 text-xl font-medium tracking-[-0.035em]">
                  Recently uploaded
                </h2>
              </div>

              <Link
                href="/admin/sermons"
                className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/40 transition-colors hover:text-green-700"
              >
                Manage
              </Link>

            </div>

            <div>
              {recentSermons.length === 0 ? (
                <div className="py-14 text-center">
                  <FiBookOpen className="mx-auto text-xl text-black/20" />

                  <p className="mt-3 text-xs text-black/35">
                    No sermons uploaded yet.
                  </p>
                </div>
              ) : (
                recentSermons.map((sermon, index) => (
                  <div
                    key={sermon.id}
                    className={`flex items-center gap-4 py-5 ${
                      index !== recentSermons.length - 1
                        ? "border-b border-black/10"
                        : ""
                    }`}
                  >
                    <div className="h-16 w-14 shrink-0 overflow-hidden bg-black">
                      {sermon.image_url ? (
                        <img
                          src={sermon.image_url}
                          alt={sermon.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/30">
                          <FiBookOpen />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-green-700">
                        {sermon.category}
                      </p>

                      <h3 className="mt-1 truncate text-sm font-medium">
                        {sermon.title}
                      </h3>

                      <p className="mt-1 text-[10px] text-black/35">
                        {formatDate(sermon.sermon_date)}
                      </p>
                    </div>

                    <Link
                      href="/admin/sermons"
                      aria-label="Manage sermons"
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-black/10 transition-colors hover:bg-black hover:text-white"
                    >
                      <FiArrowUpRight />
                    </Link>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* UPCOMING EVENTS */}
          <div className="bg-black p-6 text-white sm:p-8">

            <div className="flex items-end justify-between gap-4 border-b border-white/15 pb-5">

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-400">
                  Calendar
                </p>

                <h2 className="mt-2 text-xl font-medium tracking-[-0.035em]">
                  Coming up
                </h2>
              </div>

              <Link
                href="/admin/events"
                className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/40 transition-colors hover:text-green-400"
              >
                Manage
              </Link>

            </div>

            <div>
              {nearestEvents.length === 0 ? (
                <div className="py-14 text-center">
                  <FiCalendar className="mx-auto text-xl text-white/20" />

                  <p className="mt-3 text-xs text-white/35">
                    No upcoming events.
                  </p>
                </div>
              ) : (
                nearestEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className={`grid grid-cols-[60px_1fr] gap-4 py-5 ${
                      index !== nearestEvents.length - 1
                        ? "border-b border-white/10"
                        : ""
                    }`}
                  >
                    <div>
                      <p className="text-2xl font-medium leading-none tracking-[-0.05em]">
                        {new Date(
                          `${event.event_date}T00:00:00`
                        ).getDate()}
                      </p>

                      <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-green-400">
                        {new Date(
                          `${event.event_date}T00:00:00`
                        ).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-green-400">
                        {event.category}
                      </p>

                      <h3 className="mt-1 text-sm font-medium">
                        {event.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-white/40">

                        {event.start_time && (
                          <span className="flex items-center gap-1">
                            <FiClock />

                            {formatTime(event.start_time)}
                          </span>
                        )}

                        <span className="flex items-center gap-1">
                          <FiMapPin />

                          {event.location}
                        </span>

                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default AdminDashboardPage;