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
    <section
      className="
        overflow-hidden bg-white
        px-5 py-16 text-black
        min-[375px]:px-6
        sm:py-20
        md:py-32
        lg:px-10 lg:py-40
      "
    >
      <div className="mx-auto max-w-[1400px]">

        {/* ======================================
            HEADING
        ====================================== */}

        <div
          className="
            grid gap-8
            border-b border-black/10
            pb-9
            min-[375px]:gap-9
            min-[375px]:pb-10
            sm:gap-10 sm:pb-12
            lg:grid-cols-[0.75fr_1.25fr]
            lg:items-end
          "
        >
          <FadeUp>
            <div>
              <p
                className="
                  mb-3
                  text-[9px] font-semibold
                  uppercase tracking-[0.24em]
                  text-green-700
                  min-[375px]:text-[10px]
                  min-[375px]:tracking-[0.28em]
                  sm:mb-4
                "
              >
                Messages
              </p>

              <h2
                className="
                  text-[clamp(2.8rem,13vw,4rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  md:text-6xl
                  lg:text-7xl
                "
              >
                Sermon

                <span className="block text-green-700">
                  Archive.
                </span>
              </h2>
            </div>
          </FadeUp>

          {/* SEARCH */}

          <FadeUp delay={0.05}>
            <div className="w-full lg:ml-auto lg:max-w-[620px]">
              <p
                className="
                  mb-3 max-w-sm
                  text-[11px] leading-5
                  text-black/45
                  min-[375px]:text-xs
                  min-[375px]:leading-6
                "
              >
                Search by sermon title,
                programme or date.
              </p>

              <div className="group relative">
                <FiSearch
                  className="
                    absolute left-4 top-1/2
                    -translate-y-1/2
                    text-base text-black/35
                    transition-colors
                    group-focus-within:text-green-700
                    sm:left-5 sm:text-lg
                  "
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="What are you looking for?"
                  className="
                    w-full
                    border border-black/10
                    bg-[#F7F7F3]
                    py-4 pl-11 pr-12
                    text-[13px] text-black
                    outline-none
                    transition-all duration-300
                    placeholder:text-black/30
                    focus:border-green-700
                    focus:bg-white
                    sm:py-5 sm:pl-14 sm:pr-14
                    sm:text-sm
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={
                      clearSearch
                    }
                    aria-label="Clear search"
                    className="
                      absolute right-3 top-1/2
                      flex h-8 w-8
                      -translate-y-1/2
                      items-center justify-center
                      rounded-full
                      bg-black/5
                      text-black/45
                      transition-colors
                      hover:bg-black
                      hover:text-white
                      sm:right-5
                    "
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

        <div
          className="
            mt-6 flex flex-col gap-5
            border-b border-black/10
            pb-6
            sm:mt-8 sm:gap-7 sm:pb-8
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* CATEGORIES */}

          <div
            className="
              -mx-5 flex gap-2
              overflow-x-auto
              px-5 pb-1
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              min-[375px]:-mx-6
              min-[375px]:px-6
              sm:mx-0
              sm:flex-wrap
              sm:overflow-visible
              sm:px-0
              sm:pb-0
            "
          >
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
                    className={`
                      shrink-0 rounded-full
                      border
                      px-3.5 py-2.5
                      text-[8px] font-semibold
                      uppercase
                      tracking-[0.14em]
                      transition-all
                      duration-300
                      min-[375px]:px-4
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.16em]
                      ${
                        isActive
                          ? "border-green-700 bg-green-700 text-white"
                          : "border-black/10 bg-white text-black/50 hover:border-black hover:text-black"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              }
            )}
          </div>

          {/* RESULT COUNT */}

          <p
            className="
              min-w-0 text-[11px]
              leading-5 text-black/40
              sm:shrink-0 sm:text-xs
            "
          >
            {filteredSermons.length}{" "}
            {filteredSermons.length === 1
              ? "message"
              : "messages"}

            {search && (
              <>
                {" "}
                found for{" "}
                <span className="break-words font-medium text-black">
                  “{search}”
                </span>
              </>
            )}
          </p>
        </div>

        {/* ======================================
            SERMON RESULTS
        ====================================== */}

        <div className="mt-2 sm:mt-4">
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
                    <article
                      className="
                        group
                        border-b border-black/10
                        py-7
                        min-[375px]:py-8
                        md:py-12
                      "
                    >
                      {/*
                        MOBILE:
                        flyer + information side by side.
                        Player underneath.

                        MD+:
                        original archive layout.
                      */}

                      <div
                        className="
                          grid grid-cols-[88px_minmax(0,1fr)]
                          gap-x-4 gap-y-6
                          min-[375px]:grid-cols-[100px_minmax(0,1fr)]
                          min-[375px]:gap-x-5
                          sm:grid-cols-[120px_minmax(0,1fr)]
                          sm:gap-x-6
                          md:grid-cols-[52px_170px_1fr]
                          md:items-start
                          md:gap-7
                          lg:grid-cols-[60px_210px_1fr]
                          lg:gap-10
                        "
                      >
                        {/* NUMBER — desktop/tablet */}

                        <div className="hidden md:block">
                          <p
                            className="
                              pt-1
                              text-[10px]
                              font-semibold
                              tracking-[0.2em]
                              text-green-700
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </p>
                        </div>

                        {/* FLYER */}

                        <div
                          className="
                            overflow-hidden
                            bg-[#F7F7F3]
                          "
                        >
                          {sermon.image_url ? (
                            <img
                              src={
                                sermon.image_url
                              }
                              alt={`${sermon.title} sermon flyer`}
                              loading="lazy"
                              className="
                                aspect-[4/5]
                                w-full
                                object-cover
                                transition-transform
                                duration-700
                                group-hover:scale-[1.03]
                              "
                            />
                          ) : (
                            <div
                              className="
                                relative flex
                                aspect-[4/5]
                                items-end
                                overflow-hidden
                                bg-black
                                p-3
                                text-white
                                min-[375px]:p-3.5
                                md:p-5
                              "
                            >
                              <div
                                className="
                                  absolute
                                  -right-10 -top-10
                                  h-24 w-24
                                  rounded-full
                                  border border-white/10
                                  md:-right-12
                                  md:-top-12
                                  md:h-32
                                  md:w-32
                                "
                              />

                              <div
                                className="
                                  absolute
                                  -right-3 -top-3
                                  h-16 w-16
                                  rounded-full
                                  border
                                  border-green-700/60
                                  md:-right-4
                                  md:-top-4
                                  md:h-20
                                  md:w-20
                                "
                              />

                              <div className="relative z-10">
                                <p
                                  className="
                                    text-[6px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.15em]
                                    text-green-500
                                    md:text-[8px]
                                    md:tracking-[0.2em]
                                  "
                                >
                                  TACSFON
                                </p>

                                <p
                                  className="
                                    mt-1.5
                                    text-[12px]
                                    font-medium
                                    leading-tight
                                    min-[375px]:text-sm
                                    md:mt-2
                                    md:text-lg
                                  "
                                >
                                  The Word
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* SERMON DETAILS */}

                        <div
                          className="
                            flex min-w-0
                            flex-col
                            md:h-full
                          "
                        >
                          {/* MOBILE NUMBER */}

                          <p
                            className="
                              mb-2
                              text-[8px]
                              font-semibold
                              tracking-[0.18em]
                              text-green-700
                              md:hidden
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </p>

                          {/* META */}

                          <div
                            className="
                              flex min-w-0
                              flex-wrap items-center
                              gap-x-2 gap-y-1.5
                              min-[375px]:gap-x-3
                              min-[375px]:gap-y-2
                            "
                          >
                            <span
                              className="
                                break-words
                                text-[7px]
                                font-semibold
                                uppercase
                                tracking-[0.12em]
                                text-green-700
                                min-[375px]:text-[8px]
                                min-[375px]:tracking-[0.15em]
                                sm:text-[9px]
                                sm:tracking-[0.18em]
                              "
                            >
                              {
                                sermon.category
                              }
                            </span>

                            <span
                              className="
                                h-1 w-1
                                shrink-0
                                rounded-full
                                bg-black/20
                              "
                            />

                            <time
                              dateTime={
                                sermon.sermon_date
                              }
                              className="
                                text-[9px]
                                leading-4
                                text-black/40
                                min-[375px]:text-[10px]
                                sm:text-xs
                              "
                            >
                              {formatDate(
                                sermon.sermon_date
                              )}
                            </time>
                          </div>

                          {/* TITLE */}

                          <h3
                            className="
                              mt-2.5
                              max-w-3xl
                              break-words
                              text-[1.15rem]
                              font-medium
                              leading-[1.08]
                              tracking-[-0.035em]
                              text-black
                              min-[375px]:mt-3
                              min-[375px]:text-[1.3rem]
                              sm:text-2xl
                              md:mt-4
                              md:text-3xl
                              lg:text-[2.25rem]
                            "
                          >
                            {
                              sermon.title
                            }
                          </h3>

                          {/*
                            Desktop audio stays inside
                            the details column.
                          */}

                          <div
                            className="
                              mt-7 hidden
                              w-full max-w-3xl
                              min-w-0
                              md:block
                            "
                          >
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

                        {/*
                          MOBILE AUDIO PLAYER

                          Spans both flyer + details columns,
                          preventing the player from being
                          squeezed beside the small flyer.
                        */}

                        <div
                          className="
                            col-span-2
                            min-w-0
                            md:hidden
                          "
                        >
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
              <div
                className="
                  flex min-h-[300px]
                  flex-col items-center
                  justify-center
                  border-b border-black/10
                  px-3 py-14
                  text-center
                  sm:min-h-[380px]
                  sm:px-0 sm:py-20
                "
              >
                <div
                  className="
                    flex h-12 w-12
                    items-center justify-center
                    rounded-full
                    bg-[#F7F7F3]
                    sm:h-14 sm:w-14
                  "
                >
                  <FiSearch className="text-lg text-black/35 sm:text-xl" />
                </div>

                <p
                  className="
                    mt-6
                    text-[9px] font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-green-700
                    sm:mt-7
                    sm:text-[10px]
                    sm:tracking-[0.22em]
                  "
                >
                  No sermons found
                </p>

                <h3
                  className="
                    mt-3
                    text-[1.75rem]
                    font-medium
                    tracking-[-0.04em]
                    min-[375px]:text-3xl
                  "
                >
                  Try another search.
                </h3>

                <p
                  className="
                    mt-3 max-w-sm
                    text-[13px]
                    leading-6
                    text-black/40
                    sm:text-sm
                  "
                >
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
                  className="
                    mt-6
                    border-b border-black
                    pb-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    sm:mt-7
                    sm:text-[10px]
                    sm:tracking-[0.16em]
                  "
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