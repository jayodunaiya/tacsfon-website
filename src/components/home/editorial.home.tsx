"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import { editorialPosts } from "@/data/editorial.data";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const EditorialHome = () => {
  const featuredPost = editorialPosts[0];
  const remainingPosts = editorialPosts.slice(1);

  return (
    <section className="overflow-hidden bg-[#F7F7F3] px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">

        {/* Section Heading */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <FadeUp>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
              <span className="h-px w-10 bg-green-700" />
              Editorial
            </p>
          </FadeUp>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <FadeUp delay={0.1}>
              <h2 className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">
                Thoughts for
                <span className="block text-green-700">
                  everyday faith.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link
                href="/editorial"
                className="group mb-2 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em]"
              >
                Read All

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                  <FiArrowUpRight />
                </span>
              </Link>
            </FadeUp>
          </div>
        </div>

        {/* Editorial Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">

          {/* Featured Article */}
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
              href={featuredPost.href}
              className="group relative block min-h-[620px] overflow-hidden bg-black"
            >
              <motion.img
                src={featuredPost.image}
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
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-black/15" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

              {/* Top Meta */}
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
                className="absolute left-6 top-6 z-10 flex items-center gap-3 md:left-8 md:top-8"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-400">
                  {featuredPost.category}
                </span>

                <span className="h-1 w-1 rounded-full bg-white/30" />

                <span className="text-[9px] uppercase tracking-[0.18em] text-white/55">
                  Featured
                </span>
              </motion.div>

              {/* Bottom Content */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.3,
                }}
                className="absolute bottom-0 left-0 z-10 w-full p-6 md:p-8 lg:p-10"
              >
                <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                  {featuredPost.date}
                </p>

                <h3 className="max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                  {featuredPost.title}
                </h3>

                <div className="mt-7 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 md:flex-row md:items-end">
                  <p className="max-w-xl text-sm leading-6 text-white/60 md:text-base">
                    {featuredPost.excerpt}
                  </p>

                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-500 group-hover:bg-green-700">
                    <FiArrowRight />
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Smaller Editorials */}
          <Stagger className="flex flex-col border-t border-black/10">
            {remainingPosts.map((post, index) => (
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
                    href={post.href}
                    className="group grid h-full gap-6 border-b border-black/10 py-8 sm:grid-cols-[150px_1fr] lg:grid-cols-[135px_1fr]"
                  >
                    {/* Thumbnail */}
                    <div className="relative min-h-[150px] overflow-hidden bg-black sm:min-h-full">
                      <motion.img
                        src={post.image}
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

                      <div className="absolute inset-0 bg-black/10" />

                      <span className="absolute left-4 top-4 text-[9px] font-semibold tracking-[0.2em] text-white/60">
                        0{index + 2}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-green-700">
                          {post.category}
                        </p>

                        <h3 className="mt-4 text-2xl font-medium leading-[1] tracking-[-0.035em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-700 lg:text-3xl">
                          {post.title}
                        </h3>

                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-black/50">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                        <span className="text-[9px] uppercase tracking-[0.17em] text-black/35">
                          {post.date}
                        </span>

                        <FiArrowRight className="transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-green-700" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Bottom Statement */}
        <FadeUp delay={0.15}>
          <div className="mt-16 border-t border-black/10 pt-8 md:flex md:items-end md:justify-between">
            <p className="max-w-2xl text-2xl font-medium leading-snug tracking-[-0.03em] md:text-3xl">
              Words that encourage,
              <span className="text-black/35">
                {" "}
                challenge and point us back to Christ.
              </span>
            </p>

            <Link
              href="/editorial"
              className="group mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-green-700 md:mt-0"
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