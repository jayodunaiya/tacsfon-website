"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import { GalleryImage } from "@/types/gallery.types";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

interface GalleryHomeProps {
  images: GalleryImage[];
}

const GalleryHome = ({ images }: GalleryHomeProps) => {
  if (images.length === 0) {
    return null;
  }

  /*
   * Featured images take priority.
   * Newest non-featured images fill the remaining slots.
   */
  const featuredImages = images.filter(
    (image) => image.featured
  );

  const nonFeaturedImages = images.filter(
    (image) => !image.featured
  );

  const homepageImages = [
    ...featuredImages,
    ...nonFeaturedImages,
  ].slice(0, 4);

  /*
   * Original layout:
   *
   * 0 = large
   * 1 = small
   * 2 = small
   * 3 = wide
   */
  const largeImage = homepageImages[0];

  const smallImages = homepageImages.slice(1, 3);

  const wideImage = homepageImages[3];

  /*
   * If we only have one image, allow it to use
   * the entire width instead of leaving an empty
   * right column.
   */
  const galleryGridClass =
    smallImages.length === 0
      ? "grid-cols-1"
      : "lg:grid-cols-[1.35fr_0.65fr]";

  return (
    <section
      className="
        overflow-hidden bg-[#F7F7F3]
        px-5 py-16 text-black
        min-[375px]:px-6
        sm:py-20
        md:py-32
        lg:px-10 lg:py-40
      "
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div
          className="
            mb-10 grid gap-7
            sm:mb-12 sm:gap-8
            md:mb-14
            lg:mb-16
            lg:grid-cols-[0.65fr_1.35fr]
            lg:items-end
            lg:gap-10
          "
        >
          <FadeUp>
            <p
              className="
                flex items-center gap-3
                text-[9px] font-semibold uppercase
                tracking-[0.25em] text-green-700
                min-[375px]:text-[10px]
                sm:tracking-[0.3em]
              "
            >
              <span className="h-px w-8 bg-green-700 sm:w-10" />

              Life In The House
            </p>
          </FadeUp>

          <div
            className="
              flex flex-col justify-between gap-6
              sm:gap-8
              md:flex-row md:items-end
            "
          >
            <FadeUp delay={0.1}>
              <h2
                className="
                  max-w-4xl
                  text-[clamp(2.7rem,12vw,4rem)]
                  font-medium leading-[0.92]
                  tracking-[-0.055em]
                  sm:text-6xl
                  lg:text-[5.5rem]
                "
              >
                Moments worth

                <span className="block text-green-700">
                  remembering.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link
                href="/gallery"
                className="
                  group inline-flex w-fit items-center gap-3
                  text-[10px] font-semibold uppercase
                  tracking-[0.14em] text-black
                  sm:text-xs sm:tracking-[0.15em]
                  md:mb-2
                "
              >
                View Gallery

                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-full border border-black/15
                    transition-all duration-300
                    group-hover:-rotate-45
                    group-hover:border-green-700
                    group-hover:bg-green-700
                    group-hover:text-white
                    sm:h-9 sm:w-9
                  "
                >
                  <FiArrowUpRight />
                </span>
              </Link>
            </FadeUp>
          </div>
        </div>

        {/* ==========================================
            LARGE FEATURED IMAGE
        ========================================== */}

        {largeImage && (
          <Stagger>
            <StaggerItem>
              <Link
                href="/gallery"
                className="block h-full"
              >
                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    group relative overflow-hidden bg-black

                    ${
                      smallImages.length === 0
                        ? `
                          h-[430px]
                          min-[375px]:h-[470px]
                          sm:h-[540px]
                          md:h-[650px]
                        `
                        : `
                          h-[430px]
                          min-[375px]:h-[470px]
                          sm:h-[540px]
                          md:h-[650px]
                          lg:h-[760px]
                        `
                    }
                  `}
                >
                  <motion.img
                    src={largeImage.image_url}
                    alt={
                      largeImage.title ??
                      largeImage.category
                    }
                    initial={{
                      scale: 1.05,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="
                      h-full w-full object-cover
                      transition-transform
                      duration-[1200ms] ease-out
                      group-hover:scale-[1.035]
                    "
                  />

                  {/* Mobile-friendly image depth */}
                  <div className="absolute inset-0 bg-black/5" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/5 sm:from-black/45" />

                  {/* CATEGORY */}

                  <div
                    className="
                      absolute left-4 top-4
                      min-[375px]:left-5
                      min-[375px]:top-5
                      sm:left-6 sm:top-6
                      md:left-8 md:top-8
                    "
                  >
                    <span
                      className="
                        bg-black/30 px-2.5 py-1.5
                        text-[7px] font-semibold
                        uppercase tracking-[0.17em]
                        text-white backdrop-blur-md
                        min-[375px]:px-3
                        min-[375px]:py-2
                        min-[375px]:text-[8px]
                        min-[375px]:tracking-[0.2em]
                      "
                    >
                      {largeImage.category}
                    </span>
                  </div>

                  {/* BOTTOM */}

                  <div
                    className="
                      absolute bottom-4 left-4 right-4
                      flex items-end justify-between
                      gap-4
                      min-[375px]:bottom-5
                      min-[375px]:left-5
                      min-[375px]:right-5
                      sm:bottom-6 sm:left-6 sm:right-6
                      sm:gap-6
                      md:bottom-8 md:left-8 md:right-8
                    "
                  >
                    <div className="min-w-0">
                      {largeImage.title ? (
                        <>
                          <h3
                            className="
                              max-w-lg break-words
                              text-[1.75rem] font-medium
                              leading-[0.98]
                              tracking-[-0.035em]
                              text-white
                              min-[375px]:text-3xl
                              sm:text-3xl
                            "
                          >
                            {largeImage.title}
                          </h3>

                          <p
                            className="
                              mt-2 max-w-[240px]
                              text-xs leading-5
                              text-white/65
                              min-[375px]:max-w-none
                              min-[375px]:text-sm
                              min-[375px]:leading-6
                              sm:mt-3
                            "
                          >
                            Worship. Fellowship. Family.
                          </p>
                        </>
                      ) : (
                        <p className="max-w-xs text-xs leading-5 text-white/80 min-[375px]:text-sm min-[375px]:leading-6">
                          Worship. Fellowship. Family.
                        </p>
                      )}
                    </div>

                    <span
                      className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-full
                        border border-white/30
                        text-white
                        transition-all duration-300
                        group-hover:-rotate-45
                        group-hover:bg-white
                        group-hover:text-black
                        min-[375px]:h-10
                        min-[375px]:w-10
                        sm:h-11 sm:w-11
                      "
                    >
                      <FiArrowUpRight />
                    </span>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          </Stagger>
        )}

        {/* ==========================================
            MOBILE SECONDARY IMAGE CAROUSEL
        ========================================== */}

        {smallImages.length > 0 && (
          <div className="mt-5 md:hidden">
            {/* Small mobile gallery indicator */}
            <FadeUp>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                  More Moments
                </p>

                {smallImages.length > 1 && (
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-black/25">
                    Swipe
                  </p>
                )}
              </div>
            </FadeUp>

            <div
              className="
                -mx-5 overflow-hidden
                min-[375px]:-mx-6
              "
            >
              <Stagger
                className="
                  flex snap-x snap-mandatory
                  gap-4 overflow-x-auto
                  px-5 pb-2
                  min-[375px]:px-6
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {smallImages.map((item, index) => (
                  <StaggerItem
                    key={item.id}
                    className={`
                      shrink-0 snap-start

                      ${
                        smallImages.length === 1
                          ? "w-[calc(100vw-40px)] min-[375px]:w-[calc(100vw-48px)]"
                          : "w-[78vw] min-[375px]:w-[75vw] sm:w-[60vw]"
                      }
                    `}
                  >
                    <Link
                      href="/gallery"
                      className="block h-full"
                    >
                      <motion.div
                        whileTap={{
                          scale: 0.985,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className="
                          group relative
                          h-[300px] overflow-hidden
                          bg-black
                          min-[375px]:h-[330px]
                          sm:h-[360px]
                        "
                      >
                        <motion.img
                          src={item.image_url}
                          alt={
                            item.title ??
                            item.category
                          }
                          initial={{
                            scale: 1.05,
                          }}
                          whileInView={{
                            scale: 1,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

                        {/* Number */}
                        <span
                          className="
                            absolute right-4 top-4
                            text-[8px] font-semibold
                            tracking-[0.18em]
                            text-white/45
                          "
                        >
                          {String(index + 2).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        {/* Category */}
                        <span
                          className="
                            absolute left-4 top-4
                            text-[8px] font-semibold
                            uppercase tracking-[0.18em]
                            text-green-300
                          "
                        >
                          {item.category}
                        </span>

                        {/* Bottom */}
                        <div
                          className="
                            absolute bottom-4 left-4 right-4
                            flex items-end justify-between
                            gap-4
                            min-[375px]:bottom-5
                            min-[375px]:left-5
                            min-[375px]:right-5
                          "
                        >
                          <div className="min-w-0">
                            {item.title ? (
                              <p
                                className="
                                  max-w-[220px]
                                  break-words
                                  text-xl font-medium
                                  leading-[1.05]
                                  tracking-[-0.03em]
                                  text-white
                                  min-[375px]:text-2xl
                                "
                              >
                                {item.title}
                              </p>
                            ) : (
                              <p className="text-xs uppercase tracking-[0.15em] text-white/60">
                                Life in the house
                              </p>
                            )}
                          </div>

                          <span
                            className="
                              flex h-9 w-9 shrink-0
                              items-center justify-center
                              rounded-full
                              border border-white/25
                              text-white
                            "
                          >
                            <FiArrowUpRight />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Visual swipe lines */}
            {smallImages.length > 1 && (
              <div className="mt-3 flex items-center gap-2">
                {smallImages.map((item, index) => (
                  <span
                    key={item.id}
                    className={
                      index === 0
                        ? "h-px w-8 bg-green-700"
                        : "h-px w-4 bg-black/15"
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            ORIGINAL DESKTOP/TABLET GALLERY LAYOUT
        ========================================== */}

        {smallImages.length > 0 && (
          <div className="hidden md:block">
            <Stagger
              className={`mt-5 grid gap-5 ${galleryGridClass}`}
            >
              {/* LARGE IMAGE PLACEHOLDER
                  The actual large image is already displayed
                  above. At LG we restore the original complete
                  layout separately below.
              */}

              <div className="hidden lg:block">
                <Link
                  href="/gallery"
                  className="block h-full"
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative h-[760px] overflow-hidden bg-black"
                  >
                    <motion.img
                      src={largeImage.image_url}
                      alt={
                        largeImage.title ??
                        largeImage.category
                      }
                      initial={{
                        scale: 1.05,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    <div className="absolute left-8 top-8">
                      <span className="bg-black/30 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {largeImage.category}
                      </span>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6">
                      <div>
                        {largeImage.title ? (
                          <>
                            <h3 className="max-w-lg text-3xl font-medium leading-[1] tracking-[-0.035em] text-white">
                              {largeImage.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-white/65">
                              Worship. Fellowship. Family.
                            </p>
                          </>
                        ) : (
                          <p className="max-w-xs text-sm leading-6 text-white/80">
                            Worship. Fellowship. Family.
                          </p>
                        )}
                      </div>

                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-black">
                        <FiArrowUpRight />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* RIGHT COLUMN */}

              <div
                className={`
                  grid gap-5
                  md:grid-cols-2
                  lg:grid-cols-1
                  ${
                    smallImages.length === 1
                      ? "lg:grid-rows-1"
                      : "lg:grid-rows-2"
                  }
                `}
              >
                {smallImages.map((item) => (
                  <StaggerItem
                    key={item.id}
                    className="h-full"
                  >
                    <Link
                      href="/gallery"
                      className="block h-full"
                    >
                      <motion.div
                        whileHover={{
                          y: -5,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className={`
                          group relative overflow-hidden bg-black

                          ${
                            smallImages.length === 1
                              ? "h-[420px] md:h-[520px] lg:h-[760px]"
                              : "h-[300px] md:h-[360px] lg:h-full lg:min-h-[370px]"
                          }
                        `}
                      >
                        <motion.img
                          src={item.image_url}
                          alt={
                            item.title ??
                            item.category
                          }
                          initial={{
                            scale: 1.05,
                          }}
                          whileInView={{
                            scale: 1,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                        {/* CATEGORY */}

                        <span className="absolute left-5 top-5 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70">
                          {item.category}
                        </span>

                        {/* BOTTOM */}

                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                          {item.title && (
                            <p className="max-w-[75%] text-lg font-medium leading-tight tracking-[-0.025em] text-white">
                              {item.title}
                            </p>
                          )}

                          <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-black">
                            <FiArrowUpRight />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                ))}
              </div>
            </Stagger>
          </div>
        )}

        {/* ==========================================
            WIDE IMAGE
        ========================================== */}

        {wideImage && (
          <Link
            href="/gallery"
            className="block"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                group relative mt-5
                h-[300px] overflow-hidden bg-black
                min-[375px]:h-[330px]
                sm:h-[380px]
                md:h-[480px]
              "
            >
              <motion.img
                src={wideImage.image_url}
                alt={
                  wideImage.title ??
                  wideImage.category
                }
                initial={{
                  scale: 1.05,
                }}
                whileInView={{
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  h-full w-full object-cover
                  transition-transform
                  duration-[1400ms] ease-out
                  group-hover:scale-[1.03]
                "
              />

              {/* Stronger mobile gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-black/10 md:to-transparent" />

              <div
                className="
                  absolute bottom-5 left-5
                  max-w-[calc(100%-5rem)]
                  min-[375px]:bottom-6
                  min-[375px]:left-6
                  md:bottom-10 md:left-10
                "
              >
                <p
                  className="
                    text-[8px] font-semibold uppercase
                    tracking-[0.22em] text-green-400
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.25em]
                    md:text-[10px]
                    md:tracking-[0.28em]
                  "
                >
                  {wideImage.category}
                </p>

                <h3
                  className="
                    mt-2 max-w-lg
                    break-words
                    text-[1.75rem] font-medium
                    leading-[1]
                    tracking-[-0.04em]
                    text-white
                    min-[375px]:mt-3
                    min-[375px]:text-3xl
                    md:text-5xl
                  "
                >
                  {wideImage.title ?? (
                    <>
                      This is what family

                      <span className="block text-white/60">
                        {" "}
                        looks like.
                      </span>
                    </>
                  )}
                </h3>
              </div>

              <span
                className="
                  absolute bottom-5 right-5
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-white/25
                  text-white
                  transition-all duration-300
                  group-hover:-rotate-45
                  group-hover:bg-white
                  group-hover:text-black
                  min-[375px]:bottom-6
                  min-[375px]:right-6
                  min-[375px]:h-10
                  min-[375px]:w-10
                  md:bottom-10 md:right-10
                  md:h-11 md:w-11
                "
              >
                <FiArrowUpRight />
              </span>
            </motion.div>
          </Link>
        )}

        {/* ==========================================
            BOTTOM CTA
        ========================================== */}

        <FadeUp delay={0.15}>
          <div
            className="
              mt-10 flex flex-col
              justify-between gap-5
              border-t border-black/10
              pt-6
              sm:mt-12 sm:gap-6 sm:pt-8
              md:flex-row md:items-center
            "
          >
            <p
              className="
                max-w-md text-xs
                leading-5 text-black/50
                min-[375px]:text-sm
                min-[375px]:leading-6
              "
            >
              A glimpse into worship, fellowship, service
              and everyday moments shared together as a
              family.
            </p>

            <Link
              href="/gallery"
              className="
                group inline-flex w-fit
                items-center gap-3
                text-[10px] font-semibold
                uppercase tracking-[0.14em]
                text-black
                min-[375px]:gap-4
                min-[375px]:text-xs
                min-[375px]:tracking-[0.17em]
              "
            >
              Explore All Moments

              <span
                className="
                  flex h-9 w-9 shrink-0
                  items-center justify-center
                  rounded-full
                  border border-black/15
                  transition-all duration-300
                  group-hover:bg-green-700
                  group-hover:text-white
                  min-[375px]:h-10
                  min-[375px]:w-10
                  md:h-11 md:w-11
                "
              >
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default GalleryHome;