"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import { Editorial } from "@/types/editorial.types";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

interface EditorialHomeProps {
  editorials: Editorial[];
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const EditorialHome = ({
  editorials,
}: EditorialHomeProps) => {
  if (editorials.length === 0) {
    return null;
  }

  const featuredPost =
    editorials.find((post) => post.featured) ??
    editorials[0];

  const remainingPosts = editorials
    .filter((post) => post.id !== featuredPost.id)
    .slice(0, 3);

  const totalVisiblePosts = 1 + remainingPosts.length;

  /*
   * Desktop adaptive layout remains unchanged.
   *
   * 1 article  → full width
   * 2 articles → balanced 60 / 40
   * 3 articles → featured + two stacked
   * 4 articles → featured + three stacked
   */
  const editorialGrid =
    totalVisiblePosts === 1
      ? "grid-cols-1"
      : totalVisiblePosts === 2
        ? "lg:grid-cols-[1.15fr_0.85fr]"
        : "lg:grid-cols-[1.25fr_0.75fr]";

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
            SECTION HEADING
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
                text-[10px] font-semibold uppercase
                tracking-[0.25em] text-green-700
                sm:tracking-[0.3em]
              "
            >
              <span className="h-px w-8 bg-green-700 sm:w-10" />

              Editorial
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
                  text-[clamp(2.65rem,12vw,4rem)]
                  font-medium leading-[0.92]
                  tracking-[-0.055em]
                  sm:text-6xl
                  lg:text-[5.5rem]
                "
              >
                Thoughts for

                <span className="block text-green-700">
                  everyday faith.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link
                href="/editorial"
                className="
                  group inline-flex w-fit items-center gap-3
                  text-[10px] font-semibold uppercase
                  tracking-[0.15em]
                  sm:text-xs
                  md:mb-2
                "
              >
                Read All

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
            FEATURED + DESKTOP/TABLET EDITORIAL LAYOUT
        ========================================== */}

        <div className={`grid gap-8 ${editorialGrid}`}>
          {/* ======================================
              FEATURED ARTICLE
          ====================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.98,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/editorial/${featuredPost.slug}`}
              className={`group relative block overflow-hidden bg-black ${
                totalVisiblePosts === 1
                  ? `
                    min-h-[440px]
                    min-[375px]:min-h-[470px]
                    sm:min-h-[520px]
                    md:min-h-[650px]
                  `
                  : `
                    min-h-[440px]
                    min-[375px]:min-h-[480px]
                    sm:min-h-[560px]
                    lg:min-h-[620px]
                  `
              }`}
            >
              {featuredPost.image_url && (
                <motion.img
                  src={featuredPost.image_url}
                  alt={featuredPost.title}
                  initial={{
                    scale: 1.07,
                  }}
                  whileInView={{
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute inset-0
                    h-full w-full object-cover
                    transition-transform duration-[1200ms]
                    ease-out
                    group-hover:scale-[1.04]
                  "
                />
              )}

              <div className="absolute inset-0 bg-black/15" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              {/* TOP META */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                }}
                className="
                  absolute left-5 top-5 z-10
                  flex max-w-[calc(100%-2.5rem)]
                  flex-wrap items-center gap-2
                  min-[375px]:left-6
                  min-[375px]:top-6
                  min-[375px]:gap-3
                  md:left-8 md:top-8
                "
              >
                <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-green-400 sm:text-[9px] sm:tracking-[0.22em]">
                  {featuredPost.category}
                </span>

                <span className="h-1 w-1 shrink-0 rounded-full bg-white/30" />

                <span className="text-[8px] uppercase tracking-[0.15em] text-white/55 sm:text-[9px] sm:tracking-[0.18em]">
                  Featured
                </span>
              </motion.div>

              {/* BOTTOM CONTENT */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: 0.3,
                }}
                className="
                  absolute bottom-0 left-0 z-10
                  w-full p-5
                  min-[375px]:p-6
                  md:p-8
                  lg:p-10
                "
              >
                <p
                  className="
                    mb-3 text-[8px] font-medium
                    uppercase tracking-[0.16em]
                    text-white/50
                    min-[375px]:text-[9px]
                    sm:mb-4 sm:text-[10px]
                    sm:tracking-[0.2em]
                  "
                >
                  {formatDate(featuredPost.published_at)}
                </p>

                <h3
                  className={`break-words font-medium leading-[0.95] tracking-[-0.045em] text-white ${
                    totalVisiblePosts === 1
                      ? `
                        max-w-4xl
                        text-[2rem]
                        min-[375px]:text-[2.25rem]
                        sm:text-5xl
                        lg:text-7xl
                      `
                      : `
                        max-w-3xl
                        text-[2rem]
                        min-[375px]:text-[2.25rem]
                        sm:text-5xl
                        lg:text-6xl
                      `
                  }`}
                >
                  {featuredPost.title}
                </h3>

                <div
                  className="
                    mt-5 flex items-end justify-between
                    gap-4 border-t border-white/15
                    pt-4
                    sm:mt-7 sm:gap-6 sm:pt-6
                    md:flex-row md:items-end
                  "
                >
                  {featuredPost.excerpt && (
                    <p
                      className="
                        line-clamp-3 min-w-0 max-w-xl
                        text-xs leading-5 text-white/60
                        sm:text-sm sm:leading-6
                        md:text-base
                      "
                    >
                      {featuredPost.excerpt}
                    </p>
                  )}

                  <span
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-full
                      border border-white/20
                      text-white
                      transition-all duration-300
                      group-hover:-rotate-45
                      group-hover:border-green-500
                      group-hover:bg-green-700
                      min-[375px]:h-10
                      min-[375px]:w-10
                      md:h-12 md:w-12
                    "
                  >
                    <FiArrowRight />
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* ======================================
              TABLET / DESKTOP SECONDARY ARTICLES
              Hidden on mobile
          ====================================== */}

          {remainingPosts.length > 0 && (
            <Stagger
              className={`hidden flex-col sm:flex ${
                totalVisiblePosts > 2
                  ? "border-t border-black/10"
                  : ""
              }`}
            >
              {remainingPosts.map((post, index) => {
                const isTwoArticleLayout =
                  totalVisiblePosts === 2;

                if (isTwoArticleLayout) {
                  return (
                    <StaggerItem
                      key={post.id}
                      className="h-full flex-1"
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 30,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.15,
                        }}
                        transition={{
                          duration: 0.75,
                        }}
                        className="h-full"
                      >
                        <Link
                          href={`/editorial/${post.slug}`}
                          className="group flex min-h-[480px] h-full flex-col bg-white lg:min-h-[620px]"
                        >
                          {/* LARGE SECONDARY IMAGE */}

                          <div className="relative min-h-[280px] flex-1 overflow-hidden bg-black">
                            {post.image_url && (
                              <motion.img
                                src={post.image_url}
                                alt={post.title}
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
                                  duration: 1,
                                }}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            )}

                            <div className="absolute inset-0 bg-black/10" />

                            <span className="absolute left-5 top-5 text-[9px] font-semibold tracking-[0.2em] text-white/70">
                              02
                            </span>
                          </div>

                          {/* SECONDARY CONTENT */}

                          <div className="p-6 md:p-7">
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-700">
                                {post.category}
                              </p>

                              <span className="text-[9px] uppercase tracking-[0.17em] text-black/35">
                                {formatDate(
                                  post.published_at
                                )}
                              </span>
                            </div>

                            <h3 className="mt-5 text-3xl font-medium leading-[0.98] tracking-[-0.04em] transition-colors duration-300 group-hover:text-green-700 lg:text-4xl">
                              {post.title}
                            </h3>

                            <div className="mt-6 flex items-end justify-between gap-6 border-t border-black/10 pt-5">
                              {post.excerpt && (
                                <p className="line-clamp-2 max-w-sm text-sm leading-6 text-black/50">
                                  {post.excerpt}
                                </p>
                              )}

                              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                                <FiArrowRight />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                  );
                }

                return (
                  <StaggerItem
                    key={post.id}
                    className="flex-1"
                  >
                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="h-full"
                    >
                      <Link
                        href={`/editorial/${post.slug}`}
                        className="group grid h-full gap-6 border-b border-black/10 py-8 sm:grid-cols-[150px_1fr] lg:grid-cols-[135px_1fr]"
                      >
                        {/* THUMBNAIL */}

                        <div className="relative min-h-[150px] overflow-hidden bg-black sm:min-h-full">
                          {post.image_url && (
                            <motion.img
                              src={post.image_url}
                              alt={post.title}
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
                                duration: 0.8,
                              }}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}

                          <div className="absolute inset-0 bg-black/10" />

                          <span className="absolute left-4 top-4 text-[9px] font-semibold tracking-[0.2em] text-white/60">
                            {String(index + 2).padStart(
                              2,
                              "0"
                            )}
                          </span>
                        </div>

                        {/* CONTENT */}

                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-700">
                              {post.category}
                            </p>

                            <h3 className="mt-4 text-2xl font-medium leading-[1] tracking-[-0.035em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-700 lg:text-3xl">
                              {post.title}
                            </h3>

                            {post.excerpt && (
                              <p className="mt-4 line-clamp-3 text-sm leading-6 text-black/50">
                                {post.excerpt}
                              </p>
                            )}
                          </div>

                          <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                            <span className="text-[9px] uppercase tracking-[0.17em] text-black/35">
                              {formatDate(
                                post.published_at
                              )}
                            </span>

                            <FiArrowRight className="transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-green-700" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          )}
        </div>

        {/* ==========================================
            MOBILE ARTICLES CAROUSEL
        ========================================== */}

        {remainingPosts.length > 0 && (
          <div className="mt-8 sm:hidden">
            {/* Carousel heading */}
            <FadeUp>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/40">
                  More Articles
                </p>

                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-black/25">
                  Swipe
                </p>
              </div>
            </FadeUp>

            {/* Full-bleed carousel */}
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
                  px-5 pb-3
                  min-[375px]:px-6
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >
                {remainingPosts.map((post, index) => (
                  <StaggerItem
                    key={post.id}
                    className="
                      w-[82vw] shrink-0 snap-start
                      min-[375px]:w-[78vw]
                    "
                  >
                    <motion.div
                      whileTap={{
                        scale: 0.985,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="h-full"
                    >
                      <Link
                        href={`/editorial/${post.slug}`}
                        className="
                          group flex h-full
                          min-h-[390px] flex-col
                          overflow-hidden bg-white
                          min-[375px]:min-h-[410px]
                        "
                      >
                        {/* IMAGE */}

                        <div
                          className="
                            relative h-[190px]
                            shrink-0 overflow-hidden bg-black
                            min-[375px]:h-[210px]
                          "
                        >
                          {post.image_url && (
                            <motion.img
                              src={post.image_url}
                              alt={post.title}
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
                                duration: 0.9,
                              }}
                              className="
                                absolute inset-0
                                h-full w-full object-cover
                              "
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

                          <span
                            className="
                              absolute left-4 top-4
                              text-[9px] font-semibold
                              tracking-[0.2em]
                              text-white/70
                            "
                          >
                            {String(index + 2).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <span
                            className="
                              absolute right-4 top-4
                              text-[8px] font-semibold
                              uppercase tracking-[0.18em]
                              text-green-300
                            "
                          >
                            {post.category}
                          </span>
                        </div>

                        {/* CONTENT */}

                        <div
                          className="
                            flex flex-1 flex-col
                            justify-between p-5
                            min-[375px]:p-6
                          "
                        >
                          <div>
                            <p
                              className="
                                text-[8px] font-medium
                                uppercase tracking-[0.15em]
                                text-black/35
                              "
                            >
                              {formatDate(
                                post.published_at
                              )}
                            </p>

                            <h3
                              className="
                                mt-3 break-words
                                text-[1.6rem] font-medium
                                leading-[1]
                                tracking-[-0.04em]
                                text-black
                                min-[375px]:text-[1.75rem]
                              "
                            >
                              {post.title}
                            </h3>

                            {post.excerpt && (
                              <p
                                className="
                                  mt-3 line-clamp-2
                                  text-xs leading-5
                                  text-black/50
                                  min-[375px]:text-sm
                                  min-[375px]:leading-6
                                "
                              >
                                {post.excerpt}
                              </p>
                            )}
                          </div>

                          <div
                            className="
                              mt-5 flex items-center
                              justify-between
                              border-t border-black/10
                              pt-4
                            "
                          >
                            <span
                              className="
                                text-[9px] font-semibold
                                uppercase tracking-[0.16em]
                                text-green-700
                              "
                            >
                              Read Article
                            </span>

                            <span
                              className="
                                flex h-9 w-9
                                shrink-0 items-center
                                justify-center rounded-full
                                border border-black/10
                              "
                            >
                              <FiArrowRight />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Swipe indicator */}
            <div className="mt-3 flex items-center gap-2">
              {remainingPosts.map((post, index) => (
                <span
                  key={post.id}
                  className={
                    index === 0
                      ? "h-px w-8 bg-green-700"
                      : "h-px w-4 bg-black/15"
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            BOTTOM STATEMENT
        ========================================== */}

        <FadeUp delay={0.15}>
          <div
            className="
              mt-12 border-t border-black/10
              pt-6
              sm:mt-16 sm:pt-8
              md:flex md:items-end
              md:justify-between
            "
          >
            <p
              className="
                max-w-2xl
                text-xl font-medium
                leading-snug
                tracking-[-0.03em]
                min-[375px]:text-2xl
                md:text-3xl
              "
            >
              Words that encourage,

              <span className="text-black/35">
                {" "}
                challenge and point us back to Christ.
              </span>
            </p>

            <Link
              href="/editorial"
              className="
                group mt-6 inline-flex
                items-center gap-3
                text-[10px] font-semibold
                uppercase tracking-[0.14em]
                text-green-700
                sm:mt-8 sm:text-xs
                sm:tracking-[0.16em]
                md:mt-0
              "
            >
              Explore Editorial

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default EditorialHome;