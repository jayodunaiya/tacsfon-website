"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
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

const GalleryGrid = ({
  images,
}: GalleryGridProps) => {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(
          images.map((image) => image.category)
        )
      ),
    ],
    [images]
  );

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return images;
    }

    return images.filter(
      (image) =>
        image.category === activeCategory
    );
  }, [activeCategory, images]);

  const selectedIndex = selectedImage
    ? filteredImages.findIndex(
        (image) =>
          image.id === selectedImage.id
      )
    : -1;

  const showPrevious = () => {
    if (selectedIndex === -1) return;

    const previousIndex =
      selectedIndex === 0
        ? filteredImages.length - 1
        : selectedIndex - 1;

    setSelectedImage(
      filteredImages[previousIndex]
    );
  };

  const showNext = () => {
    if (selectedIndex === -1) return;

    const nextIndex =
      selectedIndex ===
      filteredImages.length - 1
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

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
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

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

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
      <section
        className="
          bg-white
          px-5 py-16
          text-black
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-32
          lg:px-10
          lg:py-36
        "
      >
        <div className="mx-auto max-w-[1400px]">

          {/* ========================================
              HEADING
          ======================================== */}

          <div
            className="
              grid gap-6
              border-b
              border-black/10
              pb-6
              min-[375px]:gap-7
              min-[375px]:pb-7
              sm:gap-8
              sm:pb-8
              lg:grid-cols-[0.7fr_1.3fr]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  flex items-center
                  gap-2.5
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-green-700
                  min-[375px]:gap-3
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.3em]
                "
              >
                <span className="h-px w-7 shrink-0 bg-green-700 min-[375px]:w-9" />

                Collections
              </p>
            </div>

            <div
              className="
                flex flex-col
                justify-between
                gap-4
                min-[375px]:gap-5
                sm:gap-6
                md:flex-row
                md:items-end
              "
            >
              <h2
                className="
                  max-w-2xl
                  text-[clamp(2.5rem,11vw,3.4rem)]
                  font-medium
                  leading-[0.97]
                  tracking-[-0.045em]
                  sm:text-5xl
                  sm:leading-[0.95]
                "
              >
                Life in the

                <span className="text-green-700">
                  {" "}fellowship.
                </span>
              </h2>

              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-black/35
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.18em]
                "
              >
                {filteredImages.length}{" "}
                {filteredImages.length === 1
                  ? "Photograph"
                  : "Photographs"}
              </p>
            </div>
          </div>

          {/* ========================================
              FILTERS
          ======================================== */}

          <div
            className="
              -mx-5
              flex gap-2
              overflow-x-auto
              px-5 py-5
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
              min-[375px]:-mx-6
              min-[375px]:px-6
              min-[375px]:py-6
              sm:mx-0
              sm:px-0
              sm:py-7
            "
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedImage(null);
                }}
                className={`
                  shrink-0
                  px-3.5 py-2
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  transition
                  min-[375px]:px-4
                  min-[375px]:py-2.5
                  min-[375px]:text-[8px]
                  min-[375px]:tracking-[0.15em]
                  sm:px-5
                  sm:text-[9px]
                  sm:tracking-[0.17em]
                  ${
                    activeCategory === category
                      ? "bg-black text-white"
                      : "border border-black/10 text-black/45 hover:border-green-700 hover:text-green-700"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>

          {/* ========================================
              PHOTOGRAPHS
          ======================================== */}

          <motion.div
            layout
            className="
              grid
              grid-cols-2
              gap-2
              min-[375px]:gap-2.5
              sm:gap-3
              lg:grid-cols-12
            "
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map(
                (image, index) => {
                  /*
                   * Desktop editorial rhythm is
                   * preserved exactly.
                   *
                   * Mobile uses a 2-column mosaic.
                   */

                  const pattern = index % 6;

                  const layoutClass =
                    pattern === 0
                      ? "col-span-2 lg:col-span-7"
                      : pattern === 1
                        ? "col-span-1 lg:col-span-5"
                        : pattern === 2
                          ? "col-span-1 lg:col-span-4"
                          : pattern === 3
                            ? "col-span-2 lg:col-span-8"
                            : pattern === 4
                              ? "col-span-1 lg:col-span-6"
                              : "col-span-1 lg:col-span-6";

                  const aspectClass =
                    pattern === 0
                      ? "aspect-[16/10]"
                      : pattern === 1
                        ? "aspect-[4/5] lg:aspect-auto lg:h-full"
                        : pattern === 2
                          ? "aspect-[4/5]"
                          : pattern === 3
                            ? "aspect-[16/9]"
                            : "aspect-[4/5] lg:aspect-[4/3]";

                  const isSmallMobileCard =
                    pattern === 1 ||
                    pattern === 2 ||
                    pattern === 4 ||
                    pattern === 5;

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
                      aria-label={`View ${
                        image.title ??
                        image.category
                      }`}
                      className={`
                        group
                        relative
                        overflow-hidden
                        bg-black
                        text-left
                        ${layoutClass}
                        ${aspectClass}
                      `}
                    >
                      <img
                        src={image.image_url}
                        alt={
                          image.title ??
                          image.category
                        }
                        className="
                          absolute inset-0
                          h-full w-full
                          object-cover
                          transition-transform
                          duration-[1000ms]
                          ease-out
                          group-hover:scale-[1.035]
                        "
                      />

                      <div
                        className="
                          absolute inset-0
                          bg-gradient-to-t
                          from-black/75
                          via-black/5
                          to-transparent
                          opacity-80
                          transition
                          duration-500
                          group-hover:opacity-100
                          sm:from-black/65
                          sm:opacity-70
                        "
                      />

                      {/* META */}

                      <div
                        className={`
                          absolute bottom-0 left-0
                          flex w-full
                          items-end
                          justify-between
                          gap-3
                          ${
                            isSmallMobileCard
                              ? "p-3 min-[375px]:p-3.5"
                              : "p-4 min-[375px]:p-5"
                          }
                          sm:gap-5
                          sm:p-6
                        `}
                      >
                        <div className="min-w-0">
                          <p
                            className={`
                              font-semibold
                              uppercase
                              text-green-300
                              ${
                                isSmallMobileCard
                                  ? "text-[6px] tracking-[0.12em] min-[375px]:text-[7px]"
                                  : "text-[7px] tracking-[0.16em] min-[375px]:text-[8px]"
                              }
                              sm:text-[8px]
                              sm:tracking-[0.22em]
                            `}
                          >
                            {image.category}
                          </p>

                          {image.title && (
                            <h3
                              className={`
                                max-w-md
                                break-words
                                font-medium
                                leading-tight
                                tracking-[-0.025em]
                                text-white
                                ${
                                  isSmallMobileCard
                                    ? "mt-1.5 line-clamp-2 text-[13px] min-[375px]:text-sm"
                                    : "mt-2 line-clamp-2 text-base min-[375px]:text-lg"
                                }
                                sm:text-xl
                              `}
                            >
                              {image.title}
                            </h3>
                          )}

                          {image.event_date && (
                            <p
                              className={`
                                mt-2
                                uppercase
                                text-white/45
                                ${
                                  isSmallMobileCard
                                    ? "hidden sm:block"
                                    : "text-[6px] tracking-[0.11em] min-[375px]:text-[7px] min-[375px]:tracking-[0.14em]"
                                }
                                sm:text-[8px]
                                sm:tracking-[0.16em]
                              `}
                            >
                              {formatDate(
                                image.event_date
                              )}
                            </p>
                          )}
                        </div>

                        {/* Desktop/tablet expand cue */}

                        <span
                          className="
                            hidden h-10 w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            text-white
                            opacity-0
                            transition-all
                            duration-300
                            group-hover:rotate-6
                            group-hover:border-white/40
                            group-hover:bg-white
                            group-hover:text-black
                            sm:flex
                            sm:group-hover:opacity-100
                          "
                        >
                          <FiMaximize2 />
                        </span>

                        {/* Mobile visual cue */}

                        {!isSmallMobileCard && (
                          <span
                            className="
                              flex h-8 w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/25
                              text-[11px]
                              text-white/80
                              sm:hidden
                            "
                          >
                            <FiMaximize2 />
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                }
              )}
            </AnimatePresence>
          </motion.div>

          {/* ========================================
              EMPTY FILTER
          ======================================== */}

          {filteredImages.length === 0 && (
            <div
              className="
                flex min-h-[220px]
                items-center
                justify-center
                border-t
                border-black/10
                text-center
                min-[375px]:min-h-[250px]
                sm:min-h-[300px]
              "
            >
              <div>
                <p
                  className="
                    text-xl
                    font-medium
                    tracking-[-0.03em]
                    min-[375px]:text-2xl
                  "
                >
                  Nothing here yet.
                </p>

                <p
                  className="
                    mt-2
                    max-w-xs
                    text-[13px]
                    leading-6
                    text-black/40
                    min-[375px]:text-sm
                  "
                >
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
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            className="
              fixed inset-0
              z-[150]
              flex flex-col
              bg-black
            "
          >
            {/* =====================================
                LIGHTBOX HEADER
            ===================================== */}

            <div
              className="
                relative z-20
                flex h-16
                shrink-0
                items-center
                justify-between
                border-b
                border-white/10
                px-4
                min-[375px]:h-[68px]
                min-[375px]:px-5
                sm:h-20
                sm:px-8
              "
            >
              <div className="min-w-0">
                <p
                  className="
                    truncate
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.17em]
                    text-green-400
                    min-[375px]:text-[8px]
                    min-[375px]:tracking-[0.22em]
                  "
                >
                  {selectedImage.category}
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    text-white/40
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.16em]
                  "
                >
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
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  text-white
                  transition
                  hover:border-white
                  hover:bg-white
                  hover:text-black
                  min-[375px]:h-10
                  min-[375px]:w-10
                "
              >
                <FiX />
              </button>
            </div>

            {/* =====================================
                IMAGE
            ===================================== */}

            <div
              className="
                relative
                flex min-h-0
                flex-1
                items-center
                justify-center
                px-3 py-3
                min-[375px]:px-4
                min-[375px]:py-4
                sm:px-20
                sm:py-8
              "
            >
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
                className="
                  max-h-full
                  max-w-full
                  object-contain
                "
              />

              {/* PREVIOUS */}

              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous photograph"
                  className="
                    absolute
                    left-2 top-1/2
                    flex h-9 w-9
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-black/45
                    text-sm
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-white
                    hover:text-black
                    min-[375px]:left-3
                    min-[375px]:h-10
                    min-[375px]:w-10
                    sm:left-7
                    sm:h-11
                    sm:w-11
                  "
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
                  className="
                    absolute
                    right-2 top-1/2
                    flex h-9 w-9
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/15
                    bg-black/45
                    text-sm
                    text-white
                    backdrop-blur-md
                    transition
                    hover:bg-white
                    hover:text-black
                    min-[375px]:right-3
                    min-[375px]:h-10
                    min-[375px]:w-10
                    sm:right-7
                    sm:h-11
                    sm:w-11
                  "
                >
                  <FiArrowRight />
                </button>
              )}
            </div>

            {/* =====================================
                LIGHTBOX FOOTER
            ===================================== */}

            {(selectedImage.title ||
              selectedImage.event_date) && (
              <div
                className="
                  relative z-20
                  shrink-0
                  border-t
                  border-white/10
                  px-4 py-3.5
                  text-white
                  min-[375px]:px-5
                  min-[375px]:py-4
                  sm:px-8
                  sm:py-5
                "
              >
                <div
                  className="
                    mx-auto
                    flex max-w-[1400px]
                    items-end
                    justify-between
                    gap-4
                  "
                >
                  {selectedImage.title && (
                    <p
                      className="
                        min-w-0
                        line-clamp-2
                        text-[12px]
                        font-medium
                        leading-5
                        min-[375px]:text-[13px]
                        sm:text-sm
                      "
                    >
                      {selectedImage.title}
                    </p>
                  )}

                  {selectedImage.event_date && (
                    <p
                      className="
                        shrink-0
                        text-right
                        text-[7px]
                        uppercase
                        tracking-[0.12em]
                        text-white/35
                        min-[375px]:text-[8px]
                        min-[375px]:tracking-[0.17em]
                      "
                    >
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