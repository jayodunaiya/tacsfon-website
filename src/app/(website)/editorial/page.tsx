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
        (editorial) =>
          editorial.id !== featuredEditorial.id
      )
    : editorials;

  const categories = Array.from(
    new Set(
      editorials.map(
        (editorial) => editorial.category
      )
    )
  );

  return (
    <main className="overflow-hidden bg-white text-black">

      {/* ==========================================
          HERO
      ========================================== */}

      <section
        className="
          relative overflow-hidden
          bg-[#f7f7f3]
          px-5 pb-14 pt-28
          min-[375px]:px-6
          min-[375px]:pb-16
          min-[375px]:pt-32
          sm:pb-20
          sm:pt-36
          md:pb-28
          md:pt-40
          lg:px-10
          lg:pb-36
          lg:pt-48
        "
      >
        <span
          className="
            pointer-events-none
            absolute -bottom-8 right-[-2%]
            hidden select-none
            text-[14rem]
            font-medium
            leading-none
            tracking-[-0.08em]
            text-black/[0.025]
            lg:block
            xl:text-[18rem]
          "
        >
          READ
        </span>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <FadeUp>
            <div className="flex items-center gap-2.5 min-[375px]:gap-3">
              <span className="h-px w-7 shrink-0 bg-green-700 min-[375px]:w-8 sm:w-10" />

              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-green-700
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.26em]
                  sm:text-[10px]
                  sm:tracking-[0.3em]
                "
              >
                TACSFON Editorial
              </p>
            </div>
          </FadeUp>

          <div
            className="
              mt-7
              grid gap-7
              min-[375px]:mt-8
              min-[375px]:gap-8
              sm:mt-10
              sm:gap-10
              lg:grid-cols-[1.2fr_0.8fr]
              lg:items-end
              lg:gap-12
            "
          >
            <FadeUp>
              <h1
                className="
                  max-w-5xl
                  text-[clamp(3.15rem,15vw,4.5rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                  sm:text-7xl
                  lg:text-[7.5rem]
                  lg:leading-[0.88]
                  lg:tracking-[-0.065em]
                "
              >
                Words that

                <span className="block text-black/25">
                  shape lives.
                </span>
              </h1>
            </FadeUp>

            <FadeUp>
              <div className="max-w-md lg:ml-auto">
                <p
                  className="
                    text-[13px]
                    leading-6
                    text-black/50
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                  "
                >
                  Articles, reflections and biblical insights
                  written to strengthen faith, inspire growth
                  and speak into everyday Christian living.
                </p>

                {categories.length > 0 && (
                  <div
                    className="
                      mt-5
                      flex gap-2
                      overflow-x-auto
                      pb-1
                      [scrollbar-width:none]
                      [&::-webkit-scrollbar]:hidden
                      min-[375px]:mt-6
                      sm:mt-7
                      sm:flex-wrap
                      sm:overflow-visible
                      sm:pb-0
                    "
                  >
                    {categories
                      .slice(0, 5)
                      .map((category) => (
                        <span
                          key={category}
                          className="
                            shrink-0
                            border border-black/10
                            px-2.5 py-2
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-black/45
                            min-[375px]:px-3
                            min-[375px]:text-[8px]
                            min-[375px]:tracking-[0.16em]
                          "
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
        <section
          className="
            px-5 py-16
            min-[375px]:px-6
            min-[375px]:py-20
            sm:py-24
            md:py-28
            lg:px-10
            lg:py-40
          "
        >
          <FadeUp>
            <div
              className="
                mx-auto flex
                max-w-[1400px]
                flex-col
                items-center
                justify-center
                border-y
                border-black/10
                py-14
                text-center
                min-[375px]:py-16
                sm:py-20
                lg:py-24
              "
            >
              <span
                className="
                  flex h-12 w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  text-lg
                  text-green-700
                  min-[375px]:h-14
                  min-[375px]:w-14
                  sm:h-16
                  sm:w-16
                  sm:text-xl
                "
              >
                <FiBookOpen />
              </span>

              <h2
                className="
                  mt-5
                  max-w-lg
                  text-[2rem]
                  font-medium
                  leading-tight
                  tracking-[-0.05em]
                  min-[375px]:text-4xl
                  sm:mt-7
                "
              >
                The pages are being prepared.
              </h2>

              <p
                className="
                  mt-3
                  max-w-md
                  text-[13px]
                  leading-6
                  text-black/45
                  min-[375px]:mt-4
                  min-[375px]:text-sm
                  min-[375px]:leading-7
                "
              >
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
        <section
          className="
            bg-black
            px-5 py-16
            text-white
            min-[375px]:px-6
            min-[375px]:py-20
            sm:py-24
            md:py-32
            lg:px-10
            lg:py-40
          "
        >
          <div className="mx-auto max-w-[1400px]">
            <FadeUp>
              <div
                className="
                  mb-7
                  flex items-center
                  justify-between
                  gap-4
                  border-b
                  border-white/15
                  pb-4
                  min-[375px]:mb-8
                  min-[375px]:pb-5
                  sm:mb-10
                "
              >
                <p
                  className="
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-green-500
                    min-[375px]:text-[8px]
                    min-[375px]:tracking-[0.24em]
                    sm:text-[9px]
                    sm:tracking-[0.3em]
                  "
                >
                  Featured Publication
                </p>

                <p
                  className="
                    shrink-0
                    text-right
                    text-[7px]
                    uppercase
                    tracking-[0.12em]
                    text-white/30
                    min-[375px]:text-[8px]
                    min-[375px]:tracking-[0.16em]
                    sm:text-[9px]
                    sm:tracking-[0.2em]
                  "
                >
                  {formatDate(
                    featuredEditorial.published_at
                  )}
                </p>
              </div>
            </FadeUp>

            <div
              className="
                grid gap-8
                min-[375px]:gap-9
                sm:gap-10
                lg:grid-cols-[1.1fr_0.9fr]
                lg:items-center
                lg:gap-12
              "
            >
              {/* IMAGE */}

              <Reveal>
                <Link
                  href={`/editorial/${featuredEditorial.slug}`}
                  className="
                    group relative
                    block
                    aspect-[4/3]
                    overflow-hidden
                    bg-white/5
                  "
                >
                  {featuredEditorial.image_url && (
                    <img
                      src={featuredEditorial.image_url}
                      alt={featuredEditorial.title}
                      className="
                        h-full w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.03]
                      "
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  <span
                    className="
                      absolute
                      bottom-4 right-4
                      flex h-10 w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-black
                      transition
                      duration-300
                      group-hover:-rotate-45
                      group-hover:bg-green-700
                      group-hover:text-white
                      min-[375px]:h-11
                      min-[375px]:w-11
                      sm:bottom-5
                      sm:right-5
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <FiArrowRight />
                  </span>
                </Link>
              </Reveal>

              {/* CONTENT */}

              <FadeUp>
                <div className="lg:pl-8">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.2em]
                      text-green-500
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.25em]
                    "
                  >
                    {featuredEditorial.category}
                  </p>

                  <h2
                    className="
                      mt-4
                      max-w-3xl
                      break-words
                      text-[clamp(2.5rem,11.5vw,3.75rem)]
                      font-medium
                      leading-[0.96]
                      tracking-[-0.055em]
                      min-[375px]:mt-5
                      sm:mt-6
                      sm:text-6xl
                      sm:leading-[0.95]
                    "
                  >
                    {featuredEditorial.title}
                  </h2>

                  {featuredEditorial.excerpt && (
                    <p
                      className="
                        mt-5
                        max-w-xl
                        text-[13px]
                        leading-6
                        text-white/55
                        min-[375px]:mt-6
                        min-[375px]:text-sm
                        min-[375px]:leading-7
                        sm:mt-7
                      "
                    >
                      {featuredEditorial.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/editorial/${featuredEditorial.slug}`}
                    className="
                      group
                      mt-6
                      inline-flex
                      items-center
                      gap-3
                      border-b
                      border-white/30
                      pb-2
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      transition
                      hover:border-green-500
                      hover:text-green-500
                      min-[375px]:mt-7
                      min-[375px]:gap-4
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.2em]
                      sm:mt-9
                    "
                  >
                    Read Publication

                    <FiArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
        <section
          className="
            bg-white
            px-5 py-16
            min-[375px]:px-6
            min-[375px]:py-20
            sm:py-24
            md:py-32
            lg:px-10
            lg:py-40
          "
        >
          <div className="mx-auto max-w-[1400px]">
            <FadeUp>
              <div
                className="
                  grid gap-5
                  border-b
                  border-black/10
                  pb-6
                  min-[375px]:gap-6
                  min-[375px]:pb-7
                  sm:gap-8
                  sm:pb-8
                  lg:grid-cols-2
                  lg:items-end
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.22em]
                      text-green-700
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.3em]
                    "
                  >
                    The Archive
                  </p>

                  <h2
                    className="
                      mt-4
                      text-[clamp(2.7rem,12vw,3.75rem)]
                      font-medium
                      leading-[0.96]
                      tracking-[-0.055em]
                      min-[375px]:mt-5
                      sm:text-6xl
                      sm:leading-[0.95]
                    "
                  >
                    More to

                    <span className="block text-black/25">
                      sit with.
                    </span>
                  </h2>
                </div>

                <p className="max-w-sm text-[13px] leading-6 text-black/45 min-[375px]:text-sm min-[375px]:leading-7 lg:ml-auto">
                  Explore thoughts, teachings and reflections
                  from across the fellowship.
                </p>
              </div>
            </FadeUp>

            <Stagger className="mt-3 min-[375px]:mt-4">
              {remainingEditorials.map(
                (editorial, index) => (
                  <StaggerItem key={editorial.id}>
                    <Link
                      href={`/editorial/${editorial.slug}`}
                      className="
                        group
                        grid
                        grid-cols-[100px_minmax(0,1fr)]
                        gap-x-4 gap-y-4
                        border-b
                        border-black/10
                        py-5
                        transition-colors
                        duration-300
                        hover:bg-[#f7f7f3]
                        min-[375px]:grid-cols-[112px_minmax(0,1fr)]
                        min-[375px]:gap-x-5
                        min-[375px]:py-6
                        sm:grid-cols-[150px_minmax(0,1fr)]
                        sm:px-4
                        md:grid-cols-[80px_180px_1fr_auto]
                        md:items-center
                        md:gap-6
                        md:py-8
                        lg:grid-cols-[100px_220px_1fr_auto]
                      "
                    >
                      {/* NUMBER — DESKTOP */}

                      <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-black/25 md:block">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          aspect-[4/5]
                          overflow-hidden
                          bg-black/5
                          md:aspect-[16/10]
                        "
                      >
                        {editorial.image_url && (
                          <img
                            src={editorial.image_url}
                            alt={editorial.title}
                            className="
                              h-full w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                          />
                        )}

                        {/* MOBILE ARTICLE NUMBER */}
                        <span
                          className="
                            absolute left-2 top-2
                            flex h-6 min-w-6
                            items-center justify-center
                            bg-black/70
                            px-1.5
                            text-[7px]
                            font-semibold
                            tracking-[0.12em]
                            text-white
                            backdrop-blur-sm
                            md:hidden
                          "
                        >
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>

                      {/* TEXT */}

                      <div className="min-w-0 self-center">
                        <div
                          className="
                            flex flex-wrap
                            items-center
                            gap-x-2
                            gap-y-1.5
                            min-[375px]:gap-x-3
                          "
                        >
                          <span
                            className="
                              text-[7px]
                              font-semibold
                              uppercase
                              tracking-[0.14em]
                              text-green-700
                              min-[375px]:text-[8px]
                              min-[375px]:tracking-[0.2em]
                            "
                          >
                            {editorial.category}
                          </span>

                          <span className="h-1 w-1 shrink-0 rounded-full bg-black/20" />

                          <span
                            className="
                              text-[7px]
                              uppercase
                              tracking-[0.1em]
                              text-black/35
                              min-[375px]:text-[8px]
                              min-[375px]:tracking-[0.16em]
                            "
                          >
                            {formatDate(
                              editorial.published_at
                            )}
                          </span>
                        </div>

                        <h3
                          className="
                            mt-2
                            line-clamp-3
                            break-words
                            text-[1.15rem]
                            font-medium
                            leading-[1.12]
                            tracking-[-0.035em]
                            transition-colors
                            group-hover:text-green-700
                            min-[375px]:mt-3
                            min-[375px]:text-xl
                            sm:text-2xl
                            md:max-w-2xl
                            md:text-3xl
                            md:leading-tight
                            md:tracking-[-0.04em]
                          "
                        >
                          {editorial.title}
                        </h3>

                        {editorial.excerpt && (
                          <p
                            className="
                              mt-2
                              hidden
                              max-w-2xl
                              text-xs
                              leading-6
                              text-black/45
                              sm:line-clamp-2
                              sm:block
                              md:mt-3
                            "
                          >
                            {editorial.excerpt}
                          </p>
                        )}

                        {/* MOBILE READ CUE */}
                        <span
                          className="
                            mt-3
                            inline-flex
                            items-center
                            gap-2
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.14em]
                            text-black/45
                            md:hidden
                          "
                        >
                          Read

                          <FiArrowRight />
                        </span>
                      </div>

                      {/* DESKTOP ARROW */}

                      <span
                        className="
                          hidden h-11 w-11
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-black/10
                          transition-all
                          duration-300
                          group-hover:-rotate-45
                          group-hover:border-green-700
                          group-hover:bg-green-700
                          group-hover:text-white
                          md:flex
                        "
                      >
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
            lg:py-40
          "
        >
          <span
            className="
              pointer-events-none
              absolute -bottom-12 right-[-2%]
              hidden select-none
              text-[14rem]
              font-medium
              leading-none
              tracking-[-0.08em]
              text-white/[0.06]
              lg:block
            "
          >
            WORD
          </span>

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <FadeUp>
              <div
                className="
                  grid gap-7
                  min-[375px]:gap-8
                  sm:gap-10
                  lg:grid-cols-[1.2fr_0.8fr]
                  lg:items-end
                "
              >
                <h2
                  className="
                    max-w-4xl
                    text-[clamp(3rem,14vw,4.25rem)]
                    font-medium
                    leading-[0.94]
                    tracking-[-0.055em]
                    sm:text-6xl
                    lg:text-7xl
                    lg:leading-[0.92]
                  "
                >
                  Read.

                  <span className="block text-white/45">
                    Reflect. Grow.
                  </span>
                </h2>

                <div className="max-w-md lg:ml-auto">
                  <p
                    className="
                      text-[13px]
                      leading-6
                      text-white/65
                      min-[375px]:text-sm
                      min-[375px]:leading-7
                    "
                  >
                    May every word point us back to Christ and
                    help us live out what we believe.
                  </p>

                  <Link
                    href="/sermons"
                    className="
                      group
                      mt-6
                      inline-flex
                      items-center
                      gap-3
                      bg-white
                      px-5 py-3.5
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      text-black
                      transition
                      hover:bg-black
                      hover:text-white
                      min-[375px]:mt-7
                      min-[375px]:gap-4
                      min-[375px]:px-6
                      min-[375px]:py-4
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.18em]
                      sm:mt-8
                    "
                  >
                    Explore Sermons

                    <FiArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" />
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