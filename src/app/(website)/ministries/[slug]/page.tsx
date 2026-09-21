import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  ministryUnits,
  ministrySubgroups,
} from "@/data/ministries.data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    from?: string;
  }>;
};

const MinistryPage = async ({
  params,
  searchParams,
}: PageProps) => {
  const { slug } = await params;
  const { from } = await searchParams;

  const unit = ministryUnits.find(
    (item) => item.id === slug
  );

  const subgroup = ministrySubgroups.find(
    (item) => item.id === slug
  );

  const ministry = unit ?? subgroup;

  if (!ministry) {
    notFound();
  }

  const isUnit = Boolean(unit);

  const isFoundationSchool =
    ministry.id === "foundation-school";

  const referringSubgroup =
    isFoundationSchool && from
      ? ministrySubgroups.find(
          (subgroup) =>
            subgroup.id === from &&
            subgroup.id !== "foundation-school"
        )
      : undefined;

  const collection = isUnit
    ? ministryUnits
    : ministrySubgroups;

  const currentIndex = collection.findIndex(
    (item) => item.id === ministry.id
  );

  const previous =
    currentIndex > 0
      ? collection[currentIndex - 1]
      : collection[collection.length - 1];

  const next =
    currentIndex < collection.length - 1
      ? collection[currentIndex + 1]
      : collection[0];

  const position = String(
    currentIndex + 1
  ).padStart(2, "0");

  const total = String(
    collection.length
  ).padStart(2, "0");

  const tagline =
    "tagline" in ministry
      ? ministry.tagline
      : ministry.shortDescription;

  return (
    <main className="overflow-hidden">
      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative min-h-[88svh] overflow-hidden bg-black text-white sm:min-h-[92vh]">
        <img
          src={ministry.image}
          alt={ministry.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        {/* GIANT NUMBER */}
        <span className="pointer-events-none absolute -right-5 bottom-[-4%] hidden select-none text-[16rem] font-medium leading-none tracking-[-0.08em] text-white/[0.08] lg:block xl:text-[21rem]">
          {position}
        </span>

        <div
          className="
            relative z-10 mx-auto
            flex min-h-[88svh]
            max-w-[1400px]
            flex-col justify-end
            px-5 pb-8 pt-28
            min-[375px]:px-6
            min-[375px]:pb-10
            min-[375px]:pt-32
            sm:min-h-[92vh]
            sm:pb-12
            md:pb-16
            lg:px-10
            lg:pb-20
          "
        >
          <Link
            href="/ministries"
            className="
              mb-8
              inline-flex w-fit
              items-center gap-2.5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-white/60
              transition
              hover:text-green-400
              min-[375px]:mb-10
              min-[375px]:gap-3
              min-[375px]:text-[9px]
              sm:mb-12
              sm:text-[10px]
              sm:tracking-[0.2em]
            "
          >
            <FiArrowLeft />

            All Ministries
          </Link>

          <div className="grid gap-7 min-[375px]:gap-8 sm:gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <p
                className="
                  flex items-center
                  gap-2.5
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.19em]
                  text-green-400
                  min-[375px]:gap-3
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.24em]
                  sm:text-[10px]
                  sm:tracking-[0.3em]
                "
              >
                <span className="h-px w-7 shrink-0 bg-green-400 min-[375px]:w-8 sm:w-10" />

                {isUnit
                  ? `Ministry Unit · ${position}/${total}`
                  : `Subgroup · ${position}/${total}`}
              </p>

              <h1
                className="
                  mt-5
                  max-w-5xl
                  break-words
                  text-[clamp(3.15rem,15vw,4.5rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                  min-[375px]:mt-6
                  sm:mt-7
                  sm:text-7xl
                  md:text-8xl
                  lg:text-[7rem]
                  lg:leading-[0.88]
                  lg:tracking-[-0.065em]
                  xl:text-[8rem]
                "
              >
                {ministry.name}
              </h1>
            </div>

            <div className="max-w-md lg:ml-auto">
              <p
                className="
                  text-base
                  font-medium
                  leading-7
                  text-white/85
                  min-[375px]:text-lg
                  min-[375px]:leading-7
                  sm:text-xl
                  sm:leading-8
                "
              >
                {tagline}
              </p>
            </div>
          </div>

          <div
            className="
              mt-9
              flex items-center
              justify-between
              gap-4
              border-t border-white/20
              pt-5
              min-[375px]:mt-10
              min-[375px]:pt-6
              sm:mt-14
            "
          >
            <p
              className="
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.17em]
                text-white/40
                min-[375px]:text-[8px]
                min-[375px]:tracking-[0.21em]
                sm:text-[9px]
                sm:tracking-[0.25em]
              "
            >
              TACSFON LAUTECH
            </p>

            <span
              className="
                shrink-0
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.17em]
                text-white/40
                min-[375px]:text-[8px]
                min-[375px]:tracking-[0.21em]
                sm:text-[9px]
                sm:tracking-[0.25em]
              "
            >
              {position} / {total}
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          ABOUT
      ========================================== */}

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
          lg:py-40
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 min-[375px]:gap-10 sm:gap-12 lg:grid-cols-[0.6fr_1.4fr]">
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
                  min-[375px]:tracking-[0.26em]
                  sm:text-[10px]
                  sm:tracking-[0.3em]
                "
              >
                <span className="h-px w-7 shrink-0 bg-green-700 min-[375px]:w-8 sm:w-10" />

                About
              </p>

              <p
                className="
                  mt-3
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-black/25
                  min-[375px]:mt-4
                  min-[375px]:text-[10px]
                  min-[375px]:tracking-[0.18em]
                  sm:mt-5
                  sm:text-xs
                  sm:tracking-[0.2em]
                "
              >
                {isUnit
                  ? "Our Units"
                  : "Our Subgroups"}
              </p>
            </div>

            <div>
              <h2
                className="
                  max-w-4xl
                  break-words
                  text-[clamp(2.35rem,10.5vw,3.5rem)]
                  font-medium
                  leading-[1.02]
                  tracking-[-0.05em]
                  sm:text-5xl
                  lg:text-7xl
                "
              >
                {tagline}
              </h2>

              <div
                className="
                  mt-8
                  grid gap-5
                  border-t border-black/10
                  pt-6
                  min-[375px]:mt-10
                  min-[375px]:gap-6
                  min-[375px]:pt-7
                  sm:mt-12
                  sm:gap-8
                  sm:pt-8
                  md:grid-cols-[0.7fr_1.3fr]
                "
              >
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.19em]
                    text-black/30
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.22em]
                    sm:text-[10px]
                    sm:tracking-[0.25em]
                  "
                >
                  What we&apos;re about
                </p>

                <p
                  className="
                    max-w-2xl
                    text-[14px]
                    leading-7
                    text-black/55
                    sm:text-base
                    sm:leading-8
                  "
                >
                  {ministry.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          VISUAL BREAK
      ========================================== */}

      <section
        className="
          bg-[#F7F7F3]
          px-5 py-6
          min-[375px]:px-6
          min-[375px]:py-8
          sm:px-8
          sm:py-10
          lg:px-10
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              relative
              h-[420px]
              overflow-hidden
              bg-black
              min-[375px]:h-[460px]
              sm:h-[520px]
              md:min-h-[65vh]
              md:h-auto
            "
          >
            <img
              src={ministry.image}
              alt={`${ministry.name} ministry`}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div
              className="
                absolute
                bottom-0 left-0
                p-5
                min-[375px]:p-6
                sm:p-7
                md:p-10
                lg:p-14
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
                  sm:text-[10px]
                  sm:tracking-[0.3em]
                "
              >
                Grow · Serve · Belong
              </p>

              <h2
                className="
                  mt-4
                  max-w-3xl
                  text-[clamp(2.5rem,11vw,3.5rem)]
                  font-medium
                  leading-[0.96]
                  tracking-[-0.045em]
                  text-white
                  min-[375px]:mt-5
                  sm:text-5xl
                  lg:text-7xl
                  lg:leading-[0.95]
                "
              >
                Serving Christ.

                <span className="block text-white/55">
                  Building His people.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOUNDATION SCHOOL
      ========================================== */}

      {isFoundationSchool ? (
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
          <span className="pointer-events-none absolute -bottom-8 right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.06] lg:block">
            BEGIN
          </span>

          <div className="relative z-10 mx-auto max-w-[1400px]">

            {/* CONTEXT MESSAGE */}
            {referringSubgroup && (
              <div
                className="
                  mb-12
                  border-b border-white/20
                  pb-8
                  min-[375px]:mb-14
                  min-[375px]:pb-10
                  sm:mb-16
                  md:mb-20
                  md:pb-12
                "
              >
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-white/50
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.26em]
                    sm:text-[10px]
                    sm:tracking-[0.3em]
                  "
                >
                  You&apos;re interested in
                </p>

                <div className="mt-4 grid gap-5 min-[375px]:mt-5 min-[375px]:gap-6 sm:gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
                  <h2
                    className="
                      break-words
                      text-[clamp(2.4rem,11vw,3.5rem)]
                      font-medium
                      leading-[0.96]
                      tracking-[-0.045em]
                      sm:text-5xl
                      lg:text-6xl
                      lg:leading-[0.95]
                    "
                  >
                    {referringSubgroup.name}
                  </h2>

                  <p className="max-w-md text-[13px] leading-6 text-white/65 min-[375px]:text-sm min-[375px]:leading-7 lg:ml-auto">
                    Before joining{" "}
                    {referringSubgroup.name}, members are
                    required to go through Foundation School
                    classes. Your journey into the subgroup
                    begins here.
                  </p>
                </div>
              </div>
            )}

            {/* FOUNDATION CTA */}
            <div className="grid gap-9 min-[375px]:gap-10 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14">
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-white/60
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.26em]
                    sm:text-[10px]
                    sm:tracking-[0.3em]
                  "
                >
                  {referringSubgroup
                    ? "Begin Your Journey"
                    : "Your First Step"}
                </p>

                <h2
                  className="
                    mt-5
                    max-w-4xl
                    text-[clamp(2.8rem,13vw,4.25rem)]
                    font-medium
                    leading-[0.94]
                    tracking-[-0.055em]
                    min-[375px]:mt-6
                    sm:mt-7
                    sm:text-6xl
                    lg:text-7xl
                    lg:leading-[0.92]
                  "
                >
                  {referringSubgroup ? (
                    <>
                      Ready to take

                      <span className="block text-white/45">
                        the first step?
                      </span>
                    </>
                  ) : (
                    <>
                      Your journey starts

                      <span className="block text-white/45">
                        with a foundation.
                      </span>
                    </>
                  )}
                </h2>
              </div>

              <div className="max-w-md lg:ml-auto">
                <p className="text-[13px] leading-6 text-white/70 min-[375px]:text-sm min-[375px]:leading-7">
                  Foundation School provides foundational
                  Christian teaching and helps prepare members
                  for active participation and service within
                  the fellowship.
                </p>

                {/* CLASS DETAILS */}
                <div className="mt-6 border-y border-white/20 py-5 min-[375px]:mt-8 min-[375px]:py-6">
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.21em]
                      text-white/40
                      min-[375px]:text-[9px]
                      min-[375px]:tracking-[0.28em]
                    "
                  >
                    Foundation School Classes
                  </p>

                  <div
                    className="
                      mt-5
                      grid gap-5
                      min-[375px]:grid-cols-2
                      min-[375px]:gap-6
                    "
                  >
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.17em] text-white/40 min-[375px]:text-[9px] min-[375px]:tracking-[0.2em]">
                        When
                      </p>

                      <p className="mt-2 text-sm font-medium leading-6 text-white min-[375px]:text-base">
                        Every Friday · 1:00 PM
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] uppercase tracking-[0.17em] text-white/40 min-[375px]:text-[9px] min-[375px]:tracking-[0.2em]">
                        Where
                      </p>

                      <p className="mt-2 break-words text-sm font-medium leading-6 text-white min-[375px]:text-base">
                        TACSFON Family House
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-[11px] leading-5 text-white/45 min-[375px]:text-xs">
                    Unless otherwise stated.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="
                    group
                    mt-6
                    inline-flex
                    max-w-full
                    items-center
                    gap-3
                    bg-white
                    px-5 py-3.5
                    text-[8px]
                    font-semibold
                    uppercase
                    leading-4
                    tracking-[0.12em]
                    text-black
                    transition
                    hover:bg-black
                    hover:text-white
                    min-[375px]:mt-8
                    min-[375px]:gap-4
                    min-[375px]:px-6
                    min-[375px]:py-4
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.15em]
                    sm:text-[10px]
                    sm:tracking-[0.18em]
                  "
                >
                  <span>
                    Enquire About Foundation School
                  </span>

                  <FiArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : !isUnit ? (
        /* ==========================================
            SUBGROUP JOIN CTA
        ========================================== */

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
          <span className="pointer-events-none absolute -bottom-8 right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.06] lg:block">
            JOIN
          </span>

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <div className="grid gap-9 min-[375px]:gap-10 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14">
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-white/60
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.26em]
                    sm:text-[10px]
                    sm:tracking-[0.3em]
                  "
                >
                  Get Involved
                </p>

                <h2
                  className="
                    mt-5
                    max-w-4xl
                    text-[clamp(2.8rem,13vw,4.25rem)]
                    font-medium
                    leading-[0.94]
                    tracking-[-0.055em]
                    min-[375px]:mt-6
                    sm:mt-7
                    sm:text-6xl
                    lg:text-7xl
                    lg:leading-[0.92]
                  "
                >
                  Interested in joining

                  <span className="block break-words text-white/45">
                    {ministry.name}?
                  </span>
                </h2>
              </div>

              <div className="max-w-md lg:ml-auto">
                <p className="text-[13px] leading-6 text-white/70 min-[375px]:text-sm min-[375px]:leading-7">
                  Before joining a subgroup, members are
                  required to go through Foundation School
                  classes. This provides the foundation for
                  active participation and service in the
                  fellowship.
                </p>

                <Link
                  href={`/ministries/foundation-school?from=${ministry.id}`}
                  className="
                    group
                    mt-6
                    inline-flex
                    max-w-full
                    items-center
                    gap-3
                    bg-white
                    px-5 py-3.5
                    text-[8px]
                    font-semibold
                    uppercase
                    leading-4
                    tracking-[0.12em]
                    text-black
                    transition
                    hover:bg-black
                    hover:text-white
                    min-[375px]:mt-8
                    min-[375px]:gap-4
                    min-[375px]:px-6
                    min-[375px]:py-4
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.15em]
                    sm:text-[10px]
                    sm:tracking-[0.18em]
                  "
                >
                  <span>
                    Begin With Foundation School
                  </span>

                  <FiArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ==========================================
          PREVIOUS / NEXT
      ========================================== */}

      <section className="bg-black text-white">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          <Link
            href={`/ministries/${previous.id}`}
            className="
              group
              border-b border-white/10
              p-5
              transition-colors
              duration-500
              hover:bg-white
              hover:text-black
              min-[375px]:p-6
              sm:p-8
              md:border-b-0
              md:border-r
              md:p-12
              lg:p-16
            "
          >
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
              Previous
            </p>

            <div className="mt-4 flex items-end justify-between gap-4 min-[375px]:mt-5 min-[375px]:gap-5 sm:mt-6 sm:gap-6">
              <h3
                className="
                  min-w-0
                  break-words
                  text-2xl
                  font-medium
                  leading-tight
                  tracking-[-0.04em]
                  min-[375px]:text-[1.75rem]
                  sm:text-4xl
                "
              >
                {previous.name}
              </h3>

              <FiArrowLeft className="shrink-0 text-lg transition-transform duration-300 group-hover:-translate-x-2 sm:text-xl" />
            </div>
          </Link>

          <Link
            href={`/ministries/${next.id}`}
            className="
              group
              p-5
              transition-colors
              duration-500
              hover:bg-white
              hover:text-black
              min-[375px]:p-6
              sm:p-8
              md:p-12
              lg:p-16
            "
          >
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
              Next
            </p>

            <div className="mt-4 flex items-end justify-between gap-4 min-[375px]:mt-5 min-[375px]:gap-5 sm:mt-6 sm:gap-6">
              <h3
                className="
                  min-w-0
                  break-words
                  text-2xl
                  font-medium
                  leading-tight
                  tracking-[-0.04em]
                  min-[375px]:text-[1.75rem]
                  sm:text-4xl
                "
              >
                {next.name}
              </h3>

              <FiArrowRight className="shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-2 sm:text-xl" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default MinistryPage;