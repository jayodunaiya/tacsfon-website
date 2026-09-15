"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import { galleryItems } from "@/data/gallery.data";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const GalleryHome = () => {
  const largeImage = galleryItems.find(
    (item) => item.size === "large"
  );

  const smallImages = galleryItems.filter(
    (item) => item.size === "small"
  );

  const wideImage = galleryItems.find(
    (item) => item.size === "wide"
  );

  return (
    <section className="overflow-hidden bg-[#F7F7F3] px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
          <FadeUp>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
              <span className="h-px w-10 bg-green-700" />
              Life In The House
            </p>
          </FadeUp>

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <FadeUp delay={0.1}>
              <h2 className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">
                Moments worth
                <span className="block text-green-700">
                  remembering.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link
                href="/gallery"
                className="group mb-2 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-black"
              >
                View Gallery

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                  <FiArrowUpRight />
                </span>
              </Link>
            </FadeUp>
          </div>
        </div>

        {/* Gallery Layout */}
        <Stagger className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">

          {/* Large Image */}
          {largeImage && (
            <StaggerItem>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative h-[520px] overflow-hidden bg-black md:h-[650px] lg:h-[760px]"
              >
                <motion.img
                  src={largeImage.image}
                  alt={largeImage.alt}
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between md:bottom-8 md:left-8 md:right-8">
                  <p className="max-w-xs text-sm leading-6 text-white/80">
                    Worship. Fellowship. Family.
                  </p>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-black">
                    <FiArrowUpRight />
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          )}

          {/* Right Column */}
          <div className="grid gap-5">

            {smallImages.map((item) => (
              <StaggerItem key={item.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="group relative h-[300px] overflow-hidden bg-black md:h-[360px]"
                >
                  <motion.img
                    src={item.image}
                    alt={item.alt}
                    initial={{ scale: 1.05 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:-rotate-45 group-hover:bg-white group-hover:text-black">
                    <FiArrowUpRight />
                  </span>
                </motion.div>
              </StaggerItem>
            ))}

          </div>
        </Stagger>

        {/* Wide Image */}
        {wideImage && (
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
            className="group relative mt-5 h-[360px] overflow-hidden bg-black md:h-[480px]"
          >
            <motion.img
              src={wideImage.image}
              alt={wideImage.alt}
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
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-green-400">
                Our Community
              </p>

              <h3 className="mt-3 max-w-lg text-3xl font-medium leading-[1] tracking-[-0.04em] text-white md:text-5xl">
                This is what family
                <span className="block text-white/60">
                  looks like.
                </span>
              </h3>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <FadeUp delay={0.15}>
          <div className="mt-12 flex flex-col justify-between gap-6 border-t border-black/10 pt-8 md:flex-row md:items-center">
            <p className="max-w-md text-sm leading-6 text-black/50">
              A glimpse into worship, fellowship, service and everyday moments
              shared together as a family.
            </p>

            <Link
              href="/gallery"
              className="group inline-flex w-fit items-center gap-4 text-xs font-semibold uppercase tracking-[0.17em] text-black"
            >
              Explore All Moments

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
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