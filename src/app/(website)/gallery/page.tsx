import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import { getGalleryImages } from "@/lib/gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore moments from worship, fellowship, programmes and life within the TACSFON LAUTECH community.",
};

import GalleryGrid from "@/components/gallery/gallery-grid.gallery";
import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";

const GalleryPage = async () => {
  const images = await getGalleryImages();

  /*
   * Featured images take priority.
   * Fill any remaining spaces with newest images.
   */
  const featuredImages = images.filter(
    (image) => image.featured
  );

  const nonFeaturedImages = images.filter(
    (image) => !image.featured
  );

  const heroImages = [
    ...featuredImages,
    ...nonFeaturedImages,
  ].slice(0, 3);

  return (
    <main className="overflow-hidden bg-white text-black">

      {/* ==========================================
          HERO
      ========================================== */}

      <section
        className="
          relative overflow-hidden
          bg-[#F7F7F3]
          px-5 pb-14 pt-28
          min-[375px]:px-6
          min-[375px]:pb-16
          min-[375px]:pt-32
          sm:pb-20
          sm:pt-36
          md:pb-24
          md:pt-40
          lg:px-10
          lg:pb-28
          lg:pt-48
        "
      >
        {/* DECORATIVE WORD */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-3 top-20
            select-none
            text-[30vw]
            font-semibold
            leading-none
            tracking-[-0.09em]
            text-black/[0.025]
            sm:text-[25vw]
            lg:-right-4
            lg:top-16
            lg:text-[18vw]
          "
        >
          MEMORY
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-8
              min-[375px]:gap-9
              sm:gap-10
              lg:grid-cols-[0.55fr_1.45fr]
              lg:items-end
              lg:gap-12
            "
          >
            <FadeUp>
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
                  <span
                    className="
                      h-px w-7
                      shrink-0
                      bg-green-700
                      min-[375px]:w-8
                      sm:w-10
                    "
                  />

                  Gallery
                </p>

                <p
                  className="
                    mt-4
                    max-w-xs
                    text-[13px]
                    leading-6
                    text-black/45
                    min-[375px]:mt-5
                    min-[375px]:text-sm
                    sm:mt-6
                  "
                >
                  A visual record of worship, fellowship,
                  service and the moments we share together.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1
                className="
                  max-w-5xl
                  text-[clamp(3.1rem,14.5vw,4.5rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                  sm:text-7xl
                  md:text-8xl
                  lg:text-[8.5rem]
                  lg:leading-[0.88]
                  lg:tracking-[-0.065em]
                "
              >
                Moments worth

                <span className="block text-green-700">
                  remembering.
                </span>
              </h1>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURED MOMENTS
      ========================================== */}

      {heroImages.length > 0 && (
        <section
          className="
            bg-black
            px-2 py-2
            min-[375px]:px-3
            min-[375px]:py-3
            sm:px-5
            sm:py-5
          "
        >
          <div
            className="
              mx-auto
              grid max-w-[1600px]
              gap-2
              min-[375px]:gap-3
              lg:grid-cols-[1.4fr_0.6fr]
            "
          >
            {/* =====================================
                MAIN FEATURE
            ===================================== */}

            <Reveal>
              <button
                type="button"
                className="
                  group relative
                  block
                  h-[440px]
                  w-full
                  overflow-hidden
                  bg-neutral-900
                  text-left
                  min-[375px]:h-[480px]
                  sm:h-auto
                  sm:min-h-[540px]
                  md:min-h-[650px]
                  lg:min-h-[760px]
                "
              >
                <img
                  src={heroImages[0].image_url}
                  alt={
                    heroImages[0].title ??
                    heroImages[0].category
                  }
                  className="
                    absolute inset-0
                    h-full w-full
                    object-cover
                    transition-transform
                    duration-[1400ms]
                    ease-out
                    group-hover:scale-[1.025]
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent sm:from-black/65 sm:via-black/5" />

                <div
                  className="
                    absolute
                    bottom-0 left-0
                    w-full
                    p-5
                    min-[375px]:p-6
                    sm:p-8
                    lg:p-10
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-green-400
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.25em]
                    "
                  >
                    Featured Moment
                  </p>

                  <div
                    className="
                      mt-3
                      flex items-end
                      justify-between
                      gap-5
                      min-[375px]:mt-4
                      sm:gap-8
                    "
                  >
                    <div className="min-w-0">
                      <h2
                        className="
                          max-w-2xl
                          break-words
                          text-[2rem]
                          font-medium
                          leading-[0.97]
                          tracking-[-0.04em]
                          text-white
                          min-[375px]:text-4xl
                          sm:text-5xl
                          sm:leading-[0.95]
                        "
                      >
                        {heroImages[0].title ??
                          heroImages[0].category}
                      </h2>

                      <p
                        className="
                          mt-2.5
                          text-[8px]
                          uppercase
                          tracking-[0.14em]
                          text-white/45
                          min-[375px]:mt-3
                          min-[375px]:text-[9px]
                          min-[375px]:tracking-[0.18em]
                        "
                      >
                        {heroImages[0].category}
                      </p>
                    </div>

                    <span
                      className="
                        hidden h-12 w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        text-white
                        transition
                        group-hover:-rotate-45
                        group-hover:bg-white
                        group-hover:text-black
                        sm:flex
                      "
                    >
                      <FiArrowUpRight />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>

            {/* =====================================
                MOBILE SUPPORTING MOMENTS
            ===================================== */}

            {heroImages.length > 1 && (
              <div className="sm:hidden">
                <div className="mb-2 mt-1 flex items-center justify-between px-2 py-2">
                  <p className="text-[7px] font-semibold uppercase tracking-[0.17em] text-white/40">
                    More moments
                  </p>

                  <div className="flex items-center gap-2 text-white/30">
                    <span className="text-[7px] uppercase tracking-[0.14em]">
                      Swipe
                    </span>

                    <FiArrowRight className="text-[10px]" />
                  </div>
                </div>

                <div
                  className="
                    flex
                    snap-x snap-mandatory
                    gap-2.5
                    overflow-x-auto
                    overscroll-x-contain
                    pb-1
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                    min-[375px]:gap-3
                  "
                >
                  {heroImages
                    .slice(1, 3)
                    .map((image) => (
                      <div
                        key={image.id}
                        className="
                          group relative
                          h-[300px]
                          w-[84%]
                          min-w-[84%]
                          snap-start
                          overflow-hidden
                          bg-neutral-900
                          min-[375px]:h-[330px]
                          min-[375px]:w-[86%]
                          min-[375px]:min-w-[86%]
                        "
                      >
                        <img
                          src={image.image_url}
                          alt={
                            image.title ??
                            image.category
                          }
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 min-[375px]:p-6">
                          <p className="text-[7px] font-semibold uppercase tracking-[0.17em] text-green-400 min-[375px]:text-[8px] min-[375px]:tracking-[0.2em]">
                            {image.category}
                          </p>

                          {image.title && (
                            <p
                              className="
                                mt-2
                                max-w-sm
                                break-words
                                text-xl
                                font-medium
                                leading-tight
                                tracking-[-0.025em]
                                text-white
                                min-[375px]:text-2xl
                              "
                            >
                              {image.title}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* =====================================
                TABLET / DESKTOP SIDE IMAGES
            ===================================== */}

            {heroImages.length > 1 && (
              <div
                className="
                  hidden
                  gap-3
                  sm:grid
                  sm:grid-cols-2
                  lg:grid-cols-1
                "
              >
                {heroImages
                  .slice(1, 3)
                  .map((image) => (
                    <Reveal key={image.id}>
                      <div
                        className="
                          group relative
                          min-h-[300px]
                          overflow-hidden
                          bg-neutral-900
                          sm:min-h-[340px]
                          md:min-h-[380px]
                          lg:h-full
                          lg:min-h-0
                        "
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
                            duration-[1200ms]
                            group-hover:scale-[1.035]
                          "
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                          <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-green-400">
                            {image.category}
                          </p>

                          {image.title && (
                            <p className="mt-2 max-w-sm text-xl font-medium tracking-[-0.025em] text-white">
                              {image.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ==========================================
          GALLERY GRID
      ========================================== */}

      {images.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <section
          className="
            bg-white
            px-5 py-16
            min-[375px]:px-6
            min-[375px]:py-20
            sm:py-24
            md:py-32
            lg:px-10
          "
        >
          <div
            className="
              mx-auto
              max-w-[1400px]
              border-y
              border-black/10
              py-14
              text-center
              min-[375px]:py-16
              sm:py-20
              lg:py-24
            "
          >
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-green-700
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.25em]
              "
            >
              Gallery
            </p>

            <h2
              className="
                mx-auto
                mt-4
                max-w-xl
                text-[2rem]
                font-medium
                leading-tight
                tracking-[-0.045em]
                min-[375px]:mt-5
                min-[375px]:text-4xl
                sm:text-5xl
              "
            >
              New memories coming soon.
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-md
                text-[13px]
                leading-6
                text-black/45
                min-[375px]:mt-5
                min-[375px]:text-sm
                min-[375px]:leading-7
              "
            >
              Photographs from our services, programmes and
              fellowship moments will appear here.
            </p>
          </div>
        </section>
      )}

      {/* ==========================================
          FINAL STATEMENT
      ========================================== */}

      <section
        className="
          relative overflow-hidden
          bg-green-700
          px-5 py-16
          text-white
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-32
          lg:px-10
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-4 right-0
            select-none
            text-[32vw]
            font-semibold
            leading-none
            tracking-[-0.08em]
            text-white/[0.05]
            sm:-bottom-8
            sm:text-[26vw]
            lg:-bottom-10
            lg:text-[22vw]
          "
        >
          FAMILY
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-7
              min-[375px]:gap-8
              sm:gap-10
              lg:grid-cols-[1.3fr_0.7fr]
              lg:items-end
              lg:gap-12
            "
          >
            <FadeUp>
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-white/60
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.28em]
                  "
                >
                  More than photographs
                </p>

                <h2
                  className="
                    mt-5
                    max-w-4xl
                    text-[clamp(3rem,14vw,4.25rem)]
                    font-medium
                    leading-[0.94]
                    tracking-[-0.055em]
                    min-[375px]:mt-6
                    sm:mt-7
                    sm:text-6xl
                    lg:text-8xl
                    lg:leading-[0.9]
                  "
                >
                  Come be part

                  <span className="block text-white/50">
                    of the story.
                  </span>
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="lg:pb-2">
                <p
                  className="
                    max-w-sm
                    text-[13px]
                    leading-6
                    text-white/65
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                  "
                >
                  There is a place for you here. Worship,
                  grow and share life with the TACSFON
                  LAUTECH family.
                </p>

                <Link
                  href="/contact"
                  className="
                    group
                    mt-6
                    inline-flex
                    items-center
                    gap-3
                    border-b
                    border-white/30
                    pb-2.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    transition
                    hover:border-white
                    min-[375px]:mt-7
                    min-[375px]:gap-4
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.18em]
                    sm:mt-8
                    sm:gap-5
                    sm:pb-3
                    sm:text-[10px]
                    sm:tracking-[0.2em]
                  "
                >
                  Plan Your Visit

                  <FiArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-2" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;