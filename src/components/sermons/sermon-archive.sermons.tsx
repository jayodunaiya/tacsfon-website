"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  FiSearch,
  FiX,
} from "react-icons/fi";

import { Sermon } from "@/types/sermon.types";

import AudioPlayer from "@/components/sermons/audio-player.sermons";
import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

interface SermonArchiveProps {
  sermons: Sermon[];
}

const SermonArchive = ({
  sermons,
}: SermonArchiveProps) => {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  // ==========================================
  // CATEGORIES
  // ==========================================
  const categories = useMemo(() => {
    const uniqueCategories =
      Array.from(
        new Set(
          sermons
            .map(
              (sermon) =>
                sermon.category
            )
            .filter(Boolean)
        )
      );

    return [
      "All",
      ...uniqueCategories,
    ];
  }, [sermons]);


  // ==========================================
  // FORMAT DATE
  // ==========================================
  const formatDate = (
    date: string
  ) => {
    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );
  };


  // ==========================================
  // SEARCH + FILTER
  // ==========================================
  const filteredSermons =
    useMemo(() => {
      const searchTerm =
        search
          .trim()
          .toLowerCase();

      return sermons.filter(
        (sermon) => {
          const matchesCategory =
            activeCategory === "All" ||
            sermon.category ===
              activeCategory;

          if (!matchesCategory) {
            return false;
          }

          if (!searchTerm) {
            return true;
          }

          const formattedDate =
            formatDate(
              sermon.sermon_date
            ).toLowerCase();

          const searchableContent = [
            sermon.title,
            sermon.category,
            sermon.sermon_date,
            formattedDate,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchableContent.includes(
            searchTerm
          );
        }
      );
    }, [
      sermons,
      activeCategory,
      search,
    ]);


  const clearSearch = () => {
    setSearch("");
  };


  return (
    <section className="bg-white px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40">

      <div className="mx-auto max-w-[1400px]">

        {/* ======================================
            HEADING
        ====================================== */}
        <div className="grid gap-10 border-b border-black/10 pb-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">

          <FadeUp>
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-green-700">
                Messages
              </p>

              <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl lg:text-7xl">
                Sermon
                <span className="block text-green-700">
                  Archive.
                </span>
              </h2>
            </div>
          </FadeUp>


          {/* SEARCH */}
          <FadeUp delay={0.05}>
            <div className="lg:ml-auto lg:w-full lg:max-w-[620px]">

              <p className="mb-3 text-xs leading-6 text-black/45">
                Search by sermon title,
                programme or date.
              </p>

              <div className="group relative">

                <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-lg text-black/35 transition-colors group-focus-within:text-green-700" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="What are you looking for?"
                  className="w-full border border-black/10 bg-[#F7F7F3] py-5 pl-14 pr-14 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/30 focus:border-green-700 focus:bg-white"
                />

                {search && (
                  <button
                    type="button"
                    onClick={
                      clearSearch
                    }
                    aria-label="Clear search"
                    className="absolute right-5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/5 text-black/45 transition-colors hover:bg-black hover:text-white"
                  >
                    <FiX />
                  </button>
                )}

              </div>

            </div>
          </FadeUp>

        </div>


        {/* ======================================
            FILTERS + RESULT COUNT
        ====================================== */}
        <div className="mt-8 flex flex-col gap-7 border-b border-black/10 pb-8 lg:flex-row lg:items-center lg:justify-between">

          {/* CATEGORIES */}
          <div className="flex flex-wrap gap-2">

            {categories.map(
              (category) => {
                const isActive =
                  activeCategory ===
                  category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category
                      )
                    }
                    className={`rounded-full border px-4 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                      isActive
                        ? "border-green-700 bg-green-700 text-white"
                        : "border-black/10 bg-white text-black/50 hover:border-black hover:text-black"
                    }`}
                  >
                    {category}
                  </button>
                );
              }
            )}

          </div>


          {/* RESULT COUNT */}
          <p className="shrink-0 text-xs text-black/40">
            {filteredSermons.length}{" "}
            {filteredSermons.length === 1
              ? "message"
              : "messages"}
            {search && (
              <>
                {" "}
                found for{" "}
                <span className="font-medium text-black">
                  “{search}”
                </span>
              </>
            )}
          </p>

        </div>


        {/* ======================================
            SERMON RESULTS
        ====================================== */}
        <div className="mt-4">

          {filteredSermons.length >
          0 ? (
            <Stagger
              key={`${activeCategory}-${search}`}
            >
              {filteredSermons.map(
                (
                  sermon,
                  index
                ) => (
                  <StaggerItem
                    key={
                      sermon.id
                    }
                  >
                    <article className="group border-b border-black/10 py-10 md:py-12">

                      <div className="grid gap-7 md:grid-cols-[52px_170px_1fr] md:items-start lg:grid-cols-[60px_210px_1fr] lg:gap-10">

                        {/* NUMBER */}
                        <div className="hidden md:block">
                          <p className="pt-1 text-[10px] font-semibold tracking-[0.2em] text-green-700">
                            {String(
                              index +
                                1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </p>
                        </div>


                        {/* FLYER */}
                        <div className="overflow-hidden bg-[#F7F7F3]">

                          {sermon.image_url ? (
                            <img
                              src={
                                sermon.image_url
                              }
                              alt={`${sermon.title} sermon flyer`}
                              loading="lazy"
                              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-black p-5 text-white">

                              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full border border-white/10" />

                              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full border border-green-700/60" />

                              <div className="relative z-10">
                                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-green-500">
                                  TACSFON
                                </p>

                                <p className="mt-2 text-lg font-medium leading-tight">
                                  The Word
                                </p>
                              </div>

                            </div>
                          )}

                        </div>


                        {/* SERMON DETAILS */}
                        <div className="flex h-full min-w-0 flex-col">

                          {/* META */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">

                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-green-700">
                              {
                                sermon.category
                              }
                            </span>

                            <span className="h-1 w-1 rounded-full bg-black/20" />

                            <time
                              dateTime={
                                sermon.sermon_date
                              }
                              className="text-xs text-black/40"
                            >
                              {formatDate(
                                sermon.sermon_date
                              )}
                            </time>

                          </div>


                          {/* TITLE */}
                          <h3 className="mt-4 max-w-3xl text-2xl font-medium leading-[1.1] tracking-[-0.035em] text-black sm:text-3xl lg:text-[2.25rem]">
                            {
                              sermon.title
                            }
                          </h3>


                          {/* AUDIO PLAYER */}
                          <div className="mt-7 w-full max-w-3xl">
                            <AudioPlayer
                              audioUrl={
                                sermon.audio_url
                              }
                              title={
                                sermon.title
                              }
                            />
                          </div>

                        </div>

                      </div>

                    </article>
                  </StaggerItem>
                )
              )}
            </Stagger>
          ) : (
            /* ==================================
               NO SEARCH RESULTS
            ================================== */
            <FadeUp>
              <div className="flex min-h-[380px] flex-col items-center justify-center border-b border-black/10 py-20 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F7F3]">
                  <FiSearch className="text-xl text-black/35" />
                </div>

                <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-green-700">
                  No sermons found
                </p>

                <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em]">
                  Try another search.
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-black/40">
                  We couldn&apos;t find
                  a sermon matching your
                  search or selected
                  category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory(
                      "All"
                    );
                  }}
                  className="mt-7 border-b border-black pb-1 text-[10px] font-semibold uppercase tracking-[0.16em]"
                >
                  View all sermons
                </button>

              </div>
            </FadeUp>
          )}

        </div>

      </div>

    </section>
  );
};

export default SermonArchive;