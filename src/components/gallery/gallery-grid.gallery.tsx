"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiMaximize2,
  FiX,
} from "react-icons/fi";

import { GalleryImage } from "@/types/gallery.types";

interface GalleryGridProps {
  images: GalleryImage[];
}

const formatDate = (value: string | null) => {
  if (!value) return null;

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
};

const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(images.map((image) => image.category))
      ),
    ],
    [images]
  );

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return images;
    }

    return images.filter(
      (image) => image.category === activeCategory
    );
  }, [activeCategory, images]);

  const selectedIndex = selectedImage
    ? filteredImages.findIndex(
        (image) => image.id === selectedImage.id
      )
    : -1;

  const showPrevious = () => {
    if (selectedIndex === -1) return;

    const previousIndex =
      selectedIndex === 0
        ? filteredImages.length - 1
        : selectedIndex - 1;

    setSelectedImage(filteredImages[previousIndex]);
  };

  const showNext = () => {
    if (selectedIndex === -1) return;

    const nextIndex =
      selectedIndex === filteredImages.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedImage(filteredImages[nextIndex]);
  };

  useEffect(() => {
    if (!selectedImage) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedImage, selectedIndex]);

  return (
    <>
      <section className="bg-white px-6 py-24 text-black md:py-32 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1400px]">

          {/* HEADING */}

          <div className="grid gap-8 border-b border-black/10 pb-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

            <div>
              <p className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-green-700">
                <span className="h-px w-9 bg-green-700" />
                Collections
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <h2 className="max-w-2xl text-4xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-5xl">
                Life in the
                <span className="text-green-700">
                  {" "}fellowship.
                </span>
              </h2>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                {filteredImages.length}{" "}
                {filteredImages.length === 1
                  ? "Photograph"
                  : "Photographs"}
              </p>

            </div>

          </div>

          {/* FILTERS */}

          <div className="flex gap-2 overflow-x-auto py-7">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedImage(null);
                }}
                className={`shrink-0 px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.17em] transition ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "border border-black/10 text-black/45 hover:border-green-700 hover:text-green-700"
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* PHOTOGRAPHS */}

          <motion.div
            layout
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12"
          >
            <AnimatePresence mode="popLayout">

              {filteredImages.map((image, index) => {
                /*
                 * Repeating editorial rhythm:
                 *
                 * large landscape
                 * portrait
                 * portrait
                 * wide
                 *
                 * Prevents the Gallery from feeling
                 * like a generic card grid.
                 */

                const pattern = index % 6;

                const layoutClass =
                  pattern === 0
                    ? "lg:col-span-7"
                    : pattern === 1
                      ? "lg:col-span-5"
                      : pattern === 2
                        ? "lg:col-span-4"
                        : pattern === 3
                          ? "lg:col-span-8"
                          : pattern === 4
                            ? "lg:col-span-6"
                            : "lg:col-span-6";

                const aspectClass =
                  pattern === 0
                    ? "aspect-[16/10]"
                    : pattern === 1
                      ? "aspect-[4/5] lg:aspect-auto lg:h-full"
                      : pattern === 2
                        ? "aspect-[4/5]"
                        : pattern === 3
                          ? "aspect-[16/9]"
                          : "aspect-[4/3]";

                return (
                  <motion.button
                    layout
                    key={image.id}
                    type="button"
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(
                        index * 0.04,
                        0.24
                      ),
                    }}
                    className={`group relative overflow-hidden bg-black text-left ${layoutClass} ${aspectClass}`}
                  >

                    <img
                      src={image.image_url}
                      alt={
                        image.title ??
                        image.category
                      }
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-70 transition duration-500 group-hover:opacity-100" />

                    {/* META */}

                    <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-5 p-5 sm:p-6">

                      <div>
                        <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-300">
                          {image.category}
                        </p>

                        {image.title && (
                          <h3 className="mt-2 max-w-md text-lg font-medium leading-tight tracking-[-0.025em] text-white sm:text-xl">
                            {image.title}
                          </h3>
                        )}

                        {image.event_date && (
                          <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-white/45">
                            {formatDate(
                              image.event_date
                            )}
                          </p>
                        )}
                      </div>

                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white opacity-0 transition-all duration-300 group-hover:rotate-6 group-hover:border-white/40 group-hover:bg-white group-hover:text-black sm:group-hover:opacity-100">
                        <FiMaximize2 />
                      </span>

                    </div>

                  </motion.button>
                );
              })}

            </AnimatePresence>
          </motion.div>

          {/* EMPTY FILTER */}

          {filteredImages.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center border-t border-black/10 text-center">
              <div>
                <p className="text-2xl font-medium tracking-[-0.03em]">
                  Nothing here yet.
                </p>

                <p className="mt-2 text-sm text-black/40">
                  Photographs from this collection will
                  appear here.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ==========================================
          LIGHTBOX
      ========================================== */}

      <AnimatePresence>

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150] flex flex-col bg-black"
          >

            {/* LIGHTBOX HEADER */}

            <div className="relative z-20 flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5 sm:px-8">

              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-400">
                  {selectedImage.category}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/40">
                  {selectedIndex + 1} /{" "}
                  {filteredImages.length}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedImage(null)
                }
                aria-label="Close gallery viewer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white hover:bg-white hover:text-black"
              >
                <FiX />
              </button>

            </div>

            {/* IMAGE */}

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 py-5 sm:px-20 sm:py-8">

              <motion.img
                key={selectedImage.id}
                src={selectedImage.image_url}
                alt={
                  selectedImage.title ??
                  selectedImage.category
                }
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="max-h-full max-w-full object-contain"
              />

              {/* PREVIOUS */}

              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous photograph"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:left-7"
                >
                  <FiArrowLeft />
                </button>
              )}

              {/* NEXT */}

              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next photograph"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition hover:bg-white hover:text-black sm:right-7"
                >
                  <FiArrowRight />
                </button>
              )}

            </div>

            {/* LIGHTBOX FOOTER */}

            {(selectedImage.title ||
              selectedImage.event_date) && (
              <div className="relative z-20 shrink-0 border-t border-white/10 px-5 py-5 text-white sm:px-8">

                <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 sm:flex-row sm:items-center">

                  {selectedImage.title && (
                    <p className="text-sm font-medium">
                      {selectedImage.title}
                    </p>
                  )}

                  {selectedImage.event_date && (
                    <p className="text-[8px] uppercase tracking-[0.17em] text-white/35">
                      {formatDate(
                        selectedImage.event_date
                      )}
                    </p>
                  )}

                </div>

              </div>
            )}

          </motion.div>
        )}

      </AnimatePresence>
    </>
  );
};

export default GalleryGrid;