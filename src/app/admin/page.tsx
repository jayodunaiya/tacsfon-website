"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FiArrowUpRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiEdit3,
  FiImage,
  FiMail,
  FiMapPin,
  FiPlus,
  FiSettings,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";
import { Event } from "@/types/event.types";
import { Sermon } from "@/types/sermon.types";

/* ==========================================
   TYPES
========================================== */

type EditorialSummary = {
  id: string | number;
  title: string;
  slug?: string | null;
  published_at?: string | null;
  category?: string | null;
};

type ContactMessage = {
  id: string | number;
  created_at?: string | null;
};

/* ==========================================
   PAGE
========================================== */

const AdminDashboardPage = () => {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [editorials, setEditorials] = useState<EditorialSummary[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* ==========================================
     LOAD DASHBOARD DATA
  ========================================== */

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        const [
          sermonsResponse,
          eventsResponse,
          editorialsResponse,
          messagesResponse,
        ] = await Promise.all([
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

          supabase
            .from("editorials")
            .select("*")
            .order("published_at", {
              ascending: false,
            }),

          supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", {
              ascending: false,
            }),
        ]);

        if (!mounted) return;

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

        if (editorialsResponse.error) {
          console.error(
            "Unable to fetch editorials:",
            editorialsResponse.error
          );
        }

        if (messagesResponse.error) {
          console.error(
            "Unable to fetch contact messages:",
            messagesResponse.error
          );
        }

        setSermons(sermonsResponse.data ?? []);
        setEvents(eventsResponse.data ?? []);
        setEditorials(editorialsResponse.data ?? []);
        setMessages(messagesResponse.data ?? []);
      } catch (error) {
        console.error(
          "Unable to load dashboard:",
          error
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  /* ==========================================
     DERIVED DATA
  ========================================== */

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter((event) => {
    if (!event.event_date) return false;

    const eventDate = new Date(
      `${event.event_date}T00:00:00`
    );

    return eventDate >= today;
  });

  const recentSermons = sermons.slice(0, 3);

  const nearestEvents = upcomingEvents.slice(0, 3);

  const recentEditorials = editorials.slice(0, 3);

  /* ==========================================
     FORMATTERS
  ========================================== */

  const formatDate = (date?: string | null) => {
    if (!date) {
      return "Not dated";
    }

    const cleanDate = date.slice(0, 10);

    return new Date(
      `${cleanDate}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time?: string | null) => {
    if (!time) {
      return null;
    }

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

  /* ==========================================
     LOADING
  ========================================== */

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F7F3] px-5">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-green-700" />

          <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-black/35">
            Loading Dashboard
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F3]">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-7 min-[375px]:px-5 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-14">
        {/* ======================================
            HEADER
        ====================================== */}

        <section className="border-b border-black/10 pb-8 lg:pb-11">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-green-600" />

                <p className="text-[8px] font-semibold uppercase tracking-[0.26em] text-green-700 sm:text-[9px]">
                  TACSFON LAUTECH · Admin
                </p>
              </div>

              <h1 className="mt-4 max-w-3xl text-[2.6rem] font-medium leading-[0.92] tracking-[-0.055em] sm:text-5xl lg:text-[3.6rem]">
                Website
                <span className="block text-green-700">
                  Dashboard.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-xs leading-6 text-black/45 sm:text-sm sm:leading-7">
                Manage sermons, events, editorials,
                messages and other content across the
                TACSFON LAUTECH website.
              </p>
            </div>

            {/* QUICK ACTIONS */}

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Link
                href="/admin/sermons"
                className="inline-flex items-center justify-center gap-2 bg-black px-4 py-3.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-green-700 sm:px-5 sm:text-[9px]"
              >
                <FiPlus />

                Sermon
              </Link>

              <Link
                href="/admin/events"
                className="inline-flex items-center justify-center gap-2 bg-green-700 px-4 py-3.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black sm:px-5 sm:text-[9px]"
              >
                <FiPlus />

                Event
              </Link>

              <Link
                href="/admin/editorial"
                className="col-span-2 inline-flex items-center justify-center gap-2 border border-black/15 bg-white px-4 py-3.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-black hover:text-white sm:col-span-1 sm:px-5 sm:text-[9px]"
              >
                <FiPlus />

                Editorial
              </Link>
            </div>
          </div>
        </section>

        {/* ======================================
            STATS
        ====================================== */}

        <section className="grid grid-cols-2 border-b border-black/10 lg:grid-cols-4">
          <Stat
            label="Sermons"
            value={sermons.length}
            icon={<FiBookOpen />}
          />

          <Stat
            label="Upcoming"
            value={upcomingEvents.length}
            icon={<FiCalendar />}
          />

          <Stat
            label="Editorials"
            value={editorials.length}
            icon={<FiEdit3 />}
          />

          <Stat
            label="Messages"
            value={messages.length}
            icon={<FiMail />}
            last
          />
        </section>

        {/* ======================================
            MANAGEMENT
        ====================================== */}

        <section className="py-9 lg:py-12">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-700">
                Management
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                Manage content
              </h2>
            </div>

            <p className="hidden max-w-[300px] text-right text-[10px] leading-5 text-black/35 md:block">
              Everything needed to keep the
              fellowship website current.
            </p>
          </div>

          <div className="mt-6 grid gap-px overflow-hidden bg-black/10 sm:grid-cols-2 xl:grid-cols-3">
            <ManagementCard
              href="/admin/sermons"
              icon={<FiBookOpen />}
              title="Sermons"
              description="Upload sermon audio, artwork and manage the sermon archive."
            />

            <ManagementCard
              href="/admin/events"
              icon={<FiCalendar />}
              title="Events"
              description="Publish programmes, dates, locations and event details."
            />

            <ManagementCard
              href="/admin/editorial"
              icon={<FiEdit3 />}
              title="Editorial"
              description="Publish and manage articles and written content from the fellowship."
            />

            <ManagementCard
              href="/admin/messages"
              icon={<FiMail />}
              title="Messages"
              description="Review messages and enquiries received through the website."
              badge={
                messages.length > 0
                  ? messages.length.toString()
                  : undefined
              }
            />

            <ManagementCard
              href="/admin/gallery"
              icon={<FiImage />}
              title="Gallery"
              description="Manage photographs and visual moments from TACSFON."
            />

            <ManagementCard
              href="/admin/account"
              icon={<FiSettings />}
              title="Account & Security"
              description="Manage the administrator account and update the login password."
            />
          </div>
        </section>

        {/* ======================================
            RECENT CONTENT
        ====================================== */}

        <section className="pb-12">
          <div className="mb-6">
            <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-700">
              Overview
            </p>

            <h2 className="mt-2 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
              Recent activity
            </h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {/* ================================
                SERMONS
            ================================ */}

            <DashboardPanel
              eyebrow="Sermons"
              title="Recently uploaded"
              href="/admin/sermons"
            >
              {recentSermons.length === 0 ? (
                <EmptyState
                  icon={<FiBookOpen />}
                  text="No sermons uploaded yet."
                />
              ) : (
                recentSermons.map((sermon, index) => (
                  <div
                    key={sermon.id}
                    className={`flex items-center gap-3 py-4 ${
                      index !== recentSermons.length - 1
                        ? "border-b border-black/10"
                        : ""
                    }`}
                  >
                    {/* ARTWORK */}

                    <div className="h-14 w-12 shrink-0 overflow-hidden bg-black">
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

                    {/* INFO */}

                    <div className="min-w-0 flex-1">
                      <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-green-700">
                        {sermon.category || "Sermon"}
                      </p>

                      <h3 className="mt-1 truncate text-xs font-medium sm:text-sm">
                        {sermon.title}
                      </h3>

                      <p className="mt-1 text-[9px] text-black/35">
                        {formatDate(
                          sermon.sermon_date
                        )}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </DashboardPanel>

            {/* ================================
                EVENTS
            ================================ */}

            <section className="bg-black p-5 text-white sm:p-7">
              <PanelHeader
                eyebrow="Calendar"
                title="Coming up"
                href="/admin/events"
                dark
              />

              <div>
                {nearestEvents.length === 0 ? (
                  <EmptyState
                    icon={<FiCalendar />}
                    text="No upcoming events."
                    dark
                  />
                ) : (
                  nearestEvents.map((event, index) => {
                    const eventDate = new Date(
                      `${event.event_date}T00:00:00`
                    );

                    return (
                      <div
                        key={event.id}
                        className={`grid grid-cols-[45px_1fr] gap-3 py-4 ${
                          index !== nearestEvents.length - 1
                            ? "border-b border-white/10"
                            : ""
                        }`}
                      >
                        {/* DATE */}

                        <div>
                          <p className="text-xl font-medium leading-none tracking-[-0.05em]">
                            {eventDate.getDate()}
                          </p>

                          <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.16em] text-green-400">
                            {eventDate.toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                              }
                            )}
                          </p>
                        </div>

                        {/* EVENT INFO */}

                        <div className="min-w-0">
                          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-green-400">
                            {event.category || "Event"}
                          </p>

                          <h3 className="mt-1 truncate text-xs font-medium sm:text-sm">
                            {event.title}
                          </h3>

                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-white/40">
                            {event.start_time && (
                              <span className="flex items-center gap-1">
                                <FiClock />

                                {formatTime(
                                  event.start_time
                                )}
                              </span>
                            )}

                            {event.location && (
                              <span className="flex min-w-0 items-center gap-1">
                                <FiMapPin className="shrink-0" />

                                <span className="truncate">
                                  {event.location}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* ================================
                EDITORIAL
            ================================ */}

            <DashboardPanel
              eyebrow="Editorial"
              title="Recently published"
              href="/admin/editorial"
            >
              {recentEditorials.length === 0 ? (
                <EmptyState
                  icon={<FiEdit3 />}
                  text="No editorials published yet."
                />
              ) : (
                recentEditorials.map(
                  (editorial, index) => (
                    <Link
                      key={editorial.id}
                      href="/admin/editorial"
                      className={`group block py-4 ${
                        index !== recentEditorials.length - 1
                          ? "border-b border-black/10"
                          : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-green-700">
                            {editorial.category ||
                              "Editorial"}
                          </p>

                          <h3 className="mt-1 line-clamp-2 text-xs font-medium leading-5 sm:text-sm">
                            {editorial.title}
                          </h3>

                          <p className="mt-1 text-[9px] text-black/35">
                            {formatDate(
                              editorial.published_at
                            )}
                          </p>
                        </div>

                        <FiArrowUpRight className="mt-1 shrink-0 text-black/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-700" />
                      </div>
                    </Link>
                  )
                )
              )}
            </DashboardPanel>
          </div>
        </section>

        {/* ======================================
            BOTTOM SHORTCUT
        ====================================== */}

        <section className="border-t border-black/10 py-8">
          <div className="grid gap-5 bg-green-700 p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Website Administration
              </p>

              <h2 className="mt-2 max-w-xl text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                Keep the website active,
                relevant and up to date.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/messages"
                className="inline-flex items-center gap-2 bg-white px-5 py-3.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-black transition-colors hover:bg-black hover:text-white"
              >
                <FiMail />

                Messages

                <FiArrowUpRight />
              </Link>

              <Link
                href="/admin/account"
                className="inline-flex items-center gap-2 border border-white/25 px-5 py-3.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-black"
              >
                <FiSettings />

                Security
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

/* ==========================================
   STAT CARD
========================================== */

const Stat = ({
  label,
  value,
  icon,
  last = false,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  last?: boolean;
}) => {
  return (
    <div
      className={`
        border-b border-black/10
        px-3 py-6
        odd:border-r
        lg:border-b-0
        lg:px-6
        ${
          last
            ? "lg:border-r-0"
            : "lg:border-r lg:border-black/10"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.19em] text-black/35 sm:text-[8px]">
            {label}
          </p>

          <p className="mt-3 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
            {value.toString().padStart(2, "0")}
          </p>
        </div>

        <div className="text-base text-green-700">
          {icon}
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   MANAGEMENT CARD
========================================== */

const ManagementCard = ({
  href,
  icon,
  title,
  description,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}) => {
  return (
    <Link
      href={href}
      className="group bg-white p-5 transition-colors duration-300 hover:bg-black hover:text-white sm:p-6"
    >
      <div className="flex items-start justify-between">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
            {icon}
          </div>

          {badge && (
            <span className="absolute -right-2 -top-2 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[7px] font-semibold text-white group-hover:bg-green-600">
              {badge}
            </span>
          )}
        </div>

        <FiArrowUpRight className="text-black/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
      </div>

      <h3 className="mt-7 text-lg font-medium tracking-[-0.035em] sm:text-xl">
        {title}
      </h3>

      <p className="mt-2 max-w-[270px] text-[11px] leading-5 text-black/40 transition-colors group-hover:text-white/50 sm:text-xs sm:leading-6">
        {description}
      </p>
    </Link>
  );
};

/* ==========================================
   PANEL HEADER
========================================== */

const PanelHeader = ({
  eyebrow,
  title,
  href,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  href: string;
  dark?: boolean;
}) => {
  return (
    <div
      className={`flex items-end justify-between gap-4 border-b pb-4 ${
        dark
          ? "border-white/15"
          : "border-black/10"
      }`}
    >
      <div>
        <p
          className={`text-[7px] font-semibold uppercase tracking-[0.22em] ${
            dark
              ? "text-green-400"
              : "text-green-700"
          }`}
        >
          {eyebrow}
        </p>

        <h2 className="mt-1.5 text-lg font-medium tracking-[-0.035em]">
          {title}
        </h2>
      </div>

      <Link
        href={href}
        className={`text-[7px] font-semibold uppercase tracking-[0.15em] transition-colors ${
          dark
            ? "text-white/40 hover:text-green-400"
            : "text-black/35 hover:text-green-700"
        }`}
      >
        Manage
      </Link>
    </div>
  );
};

/* ==========================================
   DASHBOARD PANEL
========================================== */

const DashboardPanel = ({
  eyebrow,
  title,
  href,
  children,
}: {
  eyebrow: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="bg-white p-5 sm:p-7">
      <PanelHeader
        eyebrow={eyebrow}
        title={title}
        href={href}
      />

      <div>{children}</div>
    </section>
  );
};

/* ==========================================
   EMPTY STATE
========================================== */

const EmptyState = ({
  icon,
  text,
  dark = false,
}: {
  icon: React.ReactNode;
  text: string;
  dark?: boolean;
}) => {
  return (
    <div className="py-12 text-center">
      <div
        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
          dark
            ? "bg-white/[0.06] text-white/25"
            : "bg-black/[0.04] text-black/20"
        }`}
      >
        {icon}
      </div>

      <p
        className={`mt-3 text-[10px] ${
          dark
            ? "text-white/35"
            : "text-black/35"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default AdminDashboardPage;