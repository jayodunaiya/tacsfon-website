import Link from "next/link";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const VisitCtaHome = () => {
  return (
    <section className="overflow-hidden bg-black px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">

        {/* Top Label */}
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-green-500" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-500">
            You&apos;re Welcome Here
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">

          {/* Heading */}
          <div>
            <h2 className="max-w-5xl text-[clamp(4rem,8vw,8rem)] font-medium leading-[0.85] tracking-[-0.065em]">
              Come worship
              <span className="block text-white/35">
                with us.
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-base leading-7 text-white/50">
              Whether it&apos;s your first time or you&apos;ve been part of
              the family for years, there&apos;s always a place for you here.
            </p>
          </div>

          {/* Details */}
          <div className="border-t border-white/15">

            {/* Time */}
            <div className="grid grid-cols-[45px_1fr] gap-5 border-b border-white/15 py-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-green-500">
                <FiClock />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Sunday Service
                </p>

                <p className="mt-2 text-lg font-medium">
                  Sundays · 9:00 AM
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-[45px_1fr] gap-5 py-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-green-500">
                <FiMapPin />
              </div>

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/35">
                  Location
                </p>

                <p className="mt-2 max-w-sm text-lg font-medium leading-7">
                  TACSFON Family House,
                  <br />
                  New Gen. Area, Under G,
                  <br />
                  Ogbomoso.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-20 flex flex-col justify-between gap-8 border-t border-white/15 pt-8 md:flex-row md:items-center">

          <p className="max-w-md text-sm leading-6 text-white/40">
            We&apos;d love to have you worship, grow and experience fellowship
            with us this Sunday.
          </p>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/contact"
              className="group inline-flex items-center gap-5 bg-green-700 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-green-600"
            >
              Plan Your Visit

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 border border-white/20 px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Get Directions

              <FiArrowUpRight className="transition-transform duration-300 group-hover:-rotate-45" />
            </Link>

          </div>
        </div>

        {/* Huge Decorative Text */}
        <div className="pointer-events-none mt-20 overflow-hidden border-t border-white/10 pt-8">
          <p className="whitespace-nowrap text-[clamp(4.5rem,13vw,13rem)] font-semibold leading-[0.8] tracking-[-0.075em] text-white/[0.035]">
            SEE YOU SUNDAY.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisitCtaHome;