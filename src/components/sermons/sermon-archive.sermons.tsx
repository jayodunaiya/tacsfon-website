// src/components/sermons/sermon-archive.sermons.tsx

"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

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

  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(sermons.map((sermon) => sermon.category))
    );

    return ["All", ...uniqueCategories];
  }, [sermons]);

  const filteredSermons = useMemo(() => {
    return sermons.filter((sermon) => {
      const matchesCategory =
        activeCategory === "All" ||
        sermon.category === activeCategory;

      const matchesSearch = sermon.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [sermons, activeCategory, search]);

  const formatDate = (date: string) => {
    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="px-6 py-24 md:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">

        {/* HEADING */}
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <FadeUp>
            <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
              Sermon Archive
            </h2>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FiSearch className="text-black/45" />
              </div>
              <input
                type="text"
                placeholder="Search sermons..."
                className="bg-white/10 py-3 px-4 placeholder:text-black/45 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </FadeUp>
        </div>

        {/* FILTERS */}
        <div className="mt-12">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* SERMONS */}
        <Stagger>
          {filteredSermons.map((sermon) => (
            <StaggerItem key={sermon.id}>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={sermon.image_url || "/default-image.jpg"}
                    alt=""
                    className="h-[180px] w-[180px] rounded-lg object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-medium leading-tight text-white">
                    {sermon.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {formatDate(sermon.sermon_date)}
                  </p>
                  <AudioPlayer
                    audioUrl={sermon.audio_url}
                    title={sermon.title}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

      </div>
    </section>
  );
};

export default SermonArchive;