import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import { getGalleryImages } from "@/lib/gallery";

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

      <section className="relative overflow-hidden bg-[#F7F7F3] px-6 pb-16 pt-32 md:pb-24 md:pt-40 lg:px-10 lg:pb-28 lg:pt-48">

        {/* DECORATIVE WORD */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 top-16 select-none text-[25vw] font-semibold leading-none tracking-[-0.09em] text-black/[0.025] lg:text-[18vw]"
        >
          MEMORY
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">

            <FadeUp>
              <div>
                <p className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-green-700">
                  <span className="h-px w-10 bg-green-700" />
                  Gallery
                </p>

                <p className="mt-6 max-w-xs text-sm leading-6 text-black/45">
                  A visual record of worship, fellowship,
                  service and the moments we share together.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="max-w-5xl text-6xl font-medium leading-[0.88] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
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
        <section className="bg-black px-3 py-3 sm:px-5 sm:py-5">

          <div className="mx-auto grid max-w-[1600px] gap-3 lg:grid-cols-[1.4fr_0.6fr]">

            {/* MAIN FEATURE */}

            <Reveal>
              <button
                type="button"
                className="group relative block min-h-[460px] w-full overflow-hidden bg-neutral-900 text-left md:min-h-[650px] lg:min-h-[760px]"
              >
                <img
                  src={heroImages[0].image_url}
                  alt={
                    heroImages[0].title ??
                    heroImages[0].category
                  }
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 lg:p-10">

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-400">
                    Featured Moment
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-8">

                    <div>
                      <h2 className="max-w-2xl text-3xl font-medium leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl">
                        {heroImages[0].title ??
                          heroImages[0].category}
                      </h2>

                      <p className="mt-3 text-[9px] uppercase tracking-[0.18em] text-white/45">
                        {heroImages[0].category}
                      </p>
                    </div>

                    <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition group-hover:-rotate-45 group-hover:bg-white group-hover:text-black sm:flex">
                      <FiArrowUpRight />
                    </span>

                  </div>

                </div>
              </button>
            </Reveal>

            {/* SIDE IMAGES */}

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">

              {heroImages.slice(1, 3).map((image) => (
                <Reveal key={image.id}>
                  <div className="group relative min-h-[300px] overflow-hidden bg-neutral-900 lg:min-h-0 lg:h-full">

                    <img
                      src={image.image_url}
                      alt={image.title ?? image.category}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.035]"
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

          </div>

        </section>
      )}

      {/* ==========================================
          GALLERY GRID
      ========================================== */}

      {images.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <section className="bg-white px-6 py-32 lg:px-10">

          <div className="mx-auto max-w-[1400px] border-y border-black/10 py-24 text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
              Gallery
            </p>

            <h2 className="mt-5 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              New memories coming soon.
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-black/45">
              Photographs from our services, programmes and
              fellowship moments will appear here.
            </p>

          </div>

        </section>
      )}

      {/* ==========================================
          FINAL STATEMENT
      ========================================== */}

      <section className="relative overflow-hidden bg-green-700 px-6 py-24 text-white md:py-32 lg:px-10">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-0 select-none text-[22vw] font-semibold leading-none tracking-[-0.08em] text-white/[0.05]"
        >
          FAMILY
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

            <FadeUp>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/60">
                  More than photographs
                </p>

                <h2 className="mt-7 max-w-4xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
                  Come be part
                  <span className="block text-white/50">
                    of the story.
                  </span>
                </h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="lg:pb-2">

                <p className="max-w-sm text-sm leading-7 text-white/65">
                  There is a place for you here. Worship,
                  grow and share life with the TACSFON
                  LAUTECH family.
                </p>

                <Link
                  href="/contact"
                  className="group mt-8 inline-flex items-center gap-5 border-b border-white/30 pb-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:border-white"
                >
                  Plan Your Visit

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-2" />
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