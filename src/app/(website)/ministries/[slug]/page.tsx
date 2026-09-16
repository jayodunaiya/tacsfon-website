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

  const position = String(currentIndex + 1).padStart(
    2,
    "0"
  );

  const total = String(collection.length).padStart(
    2,
    "0"
  );

  const tagline =
    "tagline" in ministry
      ? ministry.tagline
      : ministry.shortDescription;

  return (
    <>
      {/* ==========================================
          HERO
      ========================================== */}
      <section className="relative min-h-[92vh] overflow-hidden bg-black text-white">

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

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-12 pt-32 md:pb-16 lg:px-10 lg:pb-20">

          <Link
            href="/ministries"
            className="mb-12 inline-flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:text-green-400"
          >
            <FiArrowLeft />

            All Ministries
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">

            <div>

              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-400">
                <span className="h-px w-10 bg-green-400" />

                {isUnit
                  ? `Ministry Unit · ${position}/${total}`
                  : `Subgroup · ${position}/${total}`}
              </p>

              <h1 className="mt-7 max-w-5xl text-6xl font-medium leading-[0.88] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8rem]">
                {ministry.name}
              </h1>

            </div>

            <div className="max-w-md lg:ml-auto">

              <p className="text-xl font-medium leading-8 text-white/85">
                {tagline}
              </p>

            </div>

          </div>

          <div className="mt-14 flex items-center justify-between border-t border-white/20 pt-6">

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              TACSFON LAUTECH
            </p>

            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              {position} / {total}
            </span>

          </div>

        </div>

      </section>

      {/* ==========================================
          ABOUT
      ========================================== */}
      <section className="bg-white px-6 py-24 text-black md:py-32 lg:px-10 lg:py-40">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">

            <div>

              <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                <span className="h-px w-10 bg-green-700" />

                About
              </p>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-black/25">
                {isUnit ? "Our Units" : "Our Subgroups"}
              </p>

            </div>

            <div>

              <h2 className="max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
                {tagline}
              </h2>

              <div className="mt-12 grid gap-8 border-t border-black/10 pt-8 md:grid-cols-[0.7fr_1.3fr]">

                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/30">
                  What we&apos;re about
                </p>

                <p className="max-w-2xl text-base leading-8 text-black/55">
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
      <section className="bg-[#F7F7F3] px-6 py-10 lg:px-10">

        <div className="mx-auto max-w-[1400px]">

          <div className="relative min-h-[65vh] overflow-hidden bg-black">

            <img
              src={ministry.image}
              alt={`${ministry.name} ministry`}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute bottom-0 left-0 p-7 md:p-10 lg:p-14">

              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-400">
                Grow · Serve · Belong
              </p>

              <h2 className="mt-5 max-w-3xl text-4xl font-medium leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
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
    JOINING / FOUNDATION SCHOOL
========================================== */}

        {isFoundationSchool ? (

  <section className="relative overflow-hidden bg-green-700 px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

    <span className="pointer-events-none absolute -bottom-8 right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.06] lg:block">
      BEGIN
    </span>

    <div className="relative z-10 mx-auto max-w-[1400px]">

      {/* ==========================================
          CONTEXT MESSAGE
      ========================================== */}

      {referringSubgroup && (

        <div className="mb-20 border-b border-white/20 pb-12">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
            You&apos;re interested in
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">

            <h2 className="text-4xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              {referringSubgroup.name}
            </h2>

            <p className="max-w-md text-sm leading-7 text-white/65 lg:ml-auto">
              Before joining {referringSubgroup.name},
              members are required to go through Foundation
              School classes. Your journey into the subgroup
              begins here.
            </p>

          </div>

        </div>

      )}

      {/* ==========================================
          FOUNDATION SCHOOL CTA
      ========================================== */}

      <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

        <div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
            {referringSubgroup
              ? "Begin Your Journey"
              : "Your First Step"}
          </p>

          <h2 className="mt-7 max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-7xl">

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

  <p className="text-sm leading-7 text-white/70">
    Foundation School provides foundational Christian
    teaching and helps prepare members for active
    participation and service within the fellowship.
  </p>

  {/* CLASS DETAILS */}
  <div className="mt-8 border-y border-white/20 py-6">

    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/40">
      Foundation School Classes
    </p>

    <div className="mt-5 grid grid-cols-2 gap-6">

      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
          When
        </p>

        <p className="mt-2 text-base font-medium text-white">
          Every Friday · 1:00 PM
        </p>
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
          Where
        </p>

        <p className="mt-2 text-base font-medium text-white">
          TACSFON Family House
        </p>
      </div>

    </div>

    <p className="mt-5 text-xs leading-5 text-white/45">
      Unless otherwise stated.
    </p>

  </div>

  <Link
    href="/contact"
    className="group mt-8 inline-flex items-center gap-4 bg-white px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white"
  >
    Enquire About Foundation School

    <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
  </Link>

</div>

      </div>

    </div>

  </section>

) : !isUnit ? (

  /* ==========================================
      SUBGROUP JOIN CTA
  ========================================== */
  <section className="relative overflow-hidden bg-green-700 px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

    <span className="pointer-events-none absolute -bottom-8 right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.06] lg:block">
      JOIN
    </span>

    <div className="relative z-10 mx-auto max-w-[1400px]">

      <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

        <div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
            Get Involved
          </p>

          <h2 className="mt-7 max-w-4xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Interested in joining

            <span className="block text-white/45">
              {ministry.name}?
            </span>
          </h2>

        </div>

        <div className="max-w-md lg:ml-auto">

          <p className="text-sm leading-7 text-white/70">
            Before joining a subgroup, members are required
            to go through Foundation School classes. This
            provides the foundation for active participation
            and service in the fellowship.
          </p>

          <Link
            href={`/ministries/foundation-school?from=${ministry.id}`}
            className="group mt-8 inline-flex items-center gap-4 bg-white px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white"
          >
            Begin With Foundation School

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
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
            className="group border-b border-white/10 p-8 transition-colors duration-500 hover:bg-white hover:text-black md:border-b-0 md:border-r md:p-12 lg:p-16"
          >

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-500">
              Previous
            </p>

            <div className="mt-6 flex items-end justify-between gap-6">

              <h3 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                {previous.name}
              </h3>

              <FiArrowLeft className="shrink-0 text-xl transition-transform duration-300 group-hover:-translate-x-2" />

            </div>

          </Link>

          <Link
            href={`/ministries/${next.id}`}
            className="group p-8 transition-colors duration-500 hover:bg-white hover:text-black md:p-12 lg:p-16"
          >

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-500">
              Next
            </p>

            <div className="mt-6 flex items-end justify-between gap-6">

              <h3 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                {next.name}
              </h3>

              <FiArrowRight className="shrink-0 text-xl transition-transform duration-300 group-hover:translate-x-2" />

            </div>

          </Link>

        </div>
      </section>
    </>
  );
};

export default MinistryPage;