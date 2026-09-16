import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiBookOpen,
} from "react-icons/fi";

import { getEditorials } from "@/lib/editorials";
import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const EditorialPage = async () => {
  const editorials = await getEditorials();

  const featuredEditorial =
    editorials.find((editorial) => editorial.featured) ??
    editorials[0] ??
    null;

  const remainingEditorials = featuredEditorial
    ? editorials.filter(
        (editorial) => editorial.id !== featuredEditorial.id
      )
    : editorials;

  const categories = Array.from(
    new Set(editorials.map((editorial) => editorial.category))
  );

  return (
    <main className="overflow-hidden bg-white text-black">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-[#f7f7f3] px-6 pb-20 pt-36 sm:pt-40 md:pb-28 lg:px-10 lg:pb-36 lg:pt-48">

        <span className="pointer-events-none absolute -bottom-8 right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-black/[0.025] lg:block xl:text-[18rem]">
          READ
        </span>

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <FadeUp>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-green-700" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                TACSFON Editorial
              </p>
            </div>
          </FadeUp>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

            <FadeUp>
              <h1 className="max-w-5xl text-6xl font-medium leading-[0.88] tracking-[-0.065em] sm:text-7xl lg:text-[7.5rem]">
                Words that
                <span className="block text-black/25">
                  shape lives.
                </span>
              </h1>
            </FadeUp>

            <FadeUp>
              <div className="max-w-md lg:ml-auto">
                <p className="text-sm leading-7 text-black/50">
                  Articles, reflections and biblical insights
                  written to strengthen faith, inspire growth
                  and speak into everyday Christian living.
                </p>

                {categories.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {categories.slice(0, 5).map((category) => (
                      <span
                        key={category}
                        className="border border-black/10 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.16em] text-black/45"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {editorials.length === 0 && (
        <section className="px-6 py-28 lg:px-10 lg:py-40">
          <FadeUp>
            <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center border-y border-black/10 py-24 text-center">

              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-xl text-green-700">
                <FiBookOpen />
              </span>

              <h2 className="mt-7 text-4xl font-medium tracking-[-0.05em]">
                The pages are being prepared.
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-black/45">
                Editorial publications will appear here as
                they are released.
              </p>

            </div>
          </FadeUp>
        </section>
      )}

      {/* ==========================================
          FEATURED EDITORIAL
      ========================================== */}

      {featuredEditorial && (
        <section className="bg-black px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

          <div className="mx-auto max-w-[1400px]">

            <FadeUp>
              <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-5">

                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-green-500">
                  Featured Publication
                </p>

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                  {formatDate(featuredEditorial.published_at)}
                </p>

              </div>
            </FadeUp>

            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

              {/* IMAGE */}

              <Reveal>
                <Link
                  href={`/editorial/${featuredEditorial.slug}`}
                  className="group relative block aspect-[4/3] overflow-hidden bg-white/5"
                >
                  {featuredEditorial.image_url && (
                    <img
                      src={featuredEditorial.image_url}
                      alt={featuredEditorial.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition duration-300 group-hover:-rotate-45 group-hover:bg-green-700 group-hover:text-white">
                    <FiArrowRight />
                  </span>
                </Link>
              </Reveal>

              {/* CONTENT */}

              <FadeUp>
                <div className="lg:pl-8">

                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-500">
                    {featuredEditorial.category}
                  </p>

                  <h2 className="mt-6 max-w-3xl text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                    {featuredEditorial.title}
                  </h2>

                  {featuredEditorial.excerpt && (
                    <p className="mt-7 max-w-xl text-sm leading-7 text-white/55">
                      {featuredEditorial.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/editorial/${featuredEditorial.slug}`}
                    className="group mt-9 inline-flex items-center gap-4 border-b border-white/30 pb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white transition hover:border-green-500 hover:text-green-500"
                  >
                    Read Publication

                    <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>

                </div>
              </FadeUp>

            </div>
          </div>
        </section>
      )}

      {/* ==========================================
          PUBLICATIONS
      ========================================== */}

      {remainingEditorials.length > 0 && (
        <section className="bg-white px-6 py-24 md:py-32 lg:px-10 lg:py-40">

          <div className="mx-auto max-w-[1400px]">

            <FadeUp>
              <div className="grid gap-8 border-b border-black/10 pb-8 lg:grid-cols-2 lg:items-end">

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-green-700">
                    The Archive
                  </p>

                  <h2 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                    More to
                    <span className="block text-black/25">
                      sit with.
                    </span>
                  </h2>
                </div>

                <p className="max-w-sm text-sm leading-7 text-black/45 lg:ml-auto">
                  Explore thoughts, teachings and reflections
                  from across the fellowship.
                </p>

              </div>
            </FadeUp>

            <Stagger className="mt-4">

              {remainingEditorials.map(
                (editorial, index) => (
                  <StaggerItem key={editorial.id}>

                    <Link
                      href={`/editorial/${editorial.slug}`}
                      className="group grid gap-6 border-b border-black/10 py-8 transition-colors duration-300 hover:bg-[#f7f7f3] sm:px-4 md:grid-cols-[80px_180px_1fr_auto] md:items-center lg:grid-cols-[100px_220px_1fr_auto]"
                    >

                      {/* NUMBER */}

                      <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-black/25 md:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* IMAGE */}

                      <div className="aspect-[16/10] overflow-hidden bg-black/5">
                        {editorial.image_url && (
                          <img
                            src={editorial.image_url}
                            alt={editorial.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                      </div>

                      {/* TEXT */}

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-green-700">
                            {editorial.category}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-black/20" />

                          <span className="text-[8px] uppercase tracking-[0.16em] text-black/35">
                            {formatDate(editorial.published_at)}
                          </span>
                        </div>

                        <h3 className="mt-3 max-w-2xl text-2xl font-medium leading-tight tracking-[-0.04em] transition-colors group-hover:text-green-700 sm:text-3xl">
                          {editorial.title}
                        </h3>

                        {editorial.excerpt && (
                          <p className="mt-3 line-clamp-2 max-w-2xl text-xs leading-6 text-black/45">
                            {editorial.excerpt}
                          </p>
                        )}
                      </div>

                      {/* ARROW */}

                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                        <FiArrowRight />
                      </span>

                    </Link>

                  </StaggerItem>
                )
              )}

            </Stagger>

          </div>
        </section>
      )}

      {/* ==========================================
          FINAL CTA
      ========================================== */}

      {editorials.length > 0 && (
        <section className="relative overflow-hidden bg-green-700 px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

          <span className="pointer-events-none absolute -bottom-12 right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.06] lg:block">
            WORD
          </span>

          <div className="relative z-10 mx-auto max-w-[1400px]">

            <FadeUp>
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

                <h2 className="max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                  Read.
                  <span className="block text-white/45">
                    Reflect. Grow.
                  </span>
                </h2>

                <div className="max-w-md lg:ml-auto">
                  <p className="text-sm leading-7 text-white/65">
                    May every word point us back to Christ and
                    help us live out what we believe.
                  </p>

                  <Link
                    href="/sermons"
                    className="group mt-8 inline-flex items-center gap-4 bg-white px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-black hover:text-white"
                  >
                    Explore Sermons

                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            </FadeUp>

          </div>
        </section>
      )}

    </main>
  );
};

export default EditorialPage;