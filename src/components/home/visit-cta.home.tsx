import Link from "next/link";

import {
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const VisitCtaHome = () => {
  return (
    <section
      className="
        overflow-hidden bg-black
        px-5 py-16 text-white
        min-[375px]:px-6
        sm:py-20
        md:py-32
        lg:px-10 lg:py-40
      "
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ==========================================
            TOP LABEL
        ========================================== */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-green-500 sm:w-10" />

          <p
            className="
              text-[9px] font-semibold uppercase
              tracking-[0.24em] text-green-500
              min-[375px]:text-[10px]
              min-[375px]:tracking-[0.3em]
            "
          >
            You&apos;re Welcome Here
          </p>
        </div>

        {/* ==========================================
            MAIN CONTENT
        ========================================== */}
        <div
          className="
            mt-8 grid gap-10
            min-[375px]:mt-10
            sm:mt-12 sm:gap-12
            md:gap-14
            lg:grid-cols-[1.25fr_0.75fr]
            lg:items-end
            lg:gap-16
          "
        >
          {/* ======================================
              HEADING
          ====================================== */}
          <div>
            <h2
              className="
                max-w-5xl
                text-[clamp(3rem,14vw,4rem)]
                font-medium
                leading-[0.88]
                tracking-[-0.06em]
                sm:text-[4.75rem]
                md:text-[5.5rem]
                lg:text-[clamp(4rem,8vw,8rem)]
                lg:leading-[0.85]
                lg:tracking-[-0.065em]
              "
            >
              Come worship

              <span className="block text-white/35">
                with us.
              </span>
            </h2>

            <p
              className="
                mt-6 max-w-lg
                text-sm leading-6 text-white/50
                sm:mt-8
                sm:text-base sm:leading-7
              "
            >
              Whether it&apos;s your first time or you&apos;ve been part of
              the family for years, there&apos;s always a place for you here.
            </p>
          </div>

          {/* ======================================
              DETAILS
          ====================================== */}
          <div className="border-t border-white/15">
            {/* Time */}
            <div
              className="
                grid grid-cols-[38px_1fr]
                gap-4 border-b border-white/15
                py-5
                min-[375px]:grid-cols-[42px_1fr]
                min-[375px]:gap-5
                min-[375px]:py-6
                sm:grid-cols-[45px_1fr]
                sm:py-7
              "
            >
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  text-sm text-green-500
                  min-[375px]:h-10
                  min-[375px]:w-10
                  min-[375px]:text-base
                "
              >
                <FiClock />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[8px] font-semibold
                    uppercase tracking-[0.2em]
                    text-white/35
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.25em]
                  "
                >
                  Sunday Service
                </p>

                <p
                  className="
                    mt-1.5 text-base font-medium
                    min-[375px]:mt-2
                    min-[375px]:text-lg
                  "
                >
                  Sundays · 9:00 AM
                </p>
              </div>
            </div>

            {/* Location */}
            <div
              className="
                grid grid-cols-[38px_1fr]
                gap-4 py-5
                min-[375px]:grid-cols-[42px_1fr]
                min-[375px]:gap-5
                min-[375px]:py-6
                sm:grid-cols-[45px_1fr]
                sm:py-7
              "
            >
              <div
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-white/15
                  text-sm text-green-500
                  min-[375px]:h-10
                  min-[375px]:w-10
                  min-[375px]:text-base
                "
              >
                <FiMapPin />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[8px] font-semibold
                    uppercase tracking-[0.2em]
                    text-white/35
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.25em]
                  "
                >
                  Location
                </p>

                <p
                  className="
                    mt-1.5 max-w-sm
                    break-words
                    text-base font-medium
                    leading-6
                    min-[375px]:mt-2
                    min-[375px]:text-lg
                    min-[375px]:leading-7
                  "
                >
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

        {/* ==========================================
            BOTTOM CTA BAR
        ========================================== */}
        <div
          className="
            mt-12 flex flex-col
            justify-between gap-6
            border-t border-white/15
            pt-6
            sm:mt-14 sm:gap-8 sm:pt-8
            md:mt-20 md:flex-row md:items-center
          "
        >
          <p
            className="
              max-w-md
              text-xs leading-5
              text-white/40
              min-[375px]:text-sm
              min-[375px]:leading-6
            "
          >
            We&apos;d love to have you worship, grow and experience fellowship
            with us this Sunday.
          </p>

          {/* Buttons */}
          <div
            className="
              grid w-full grid-cols-2
              gap-2.5
              min-[375px]:gap-3
              sm:flex sm:w-auto sm:flex-wrap
            "
          >
            <Link
              href="/contact"
              className="
                group inline-flex
                min-w-0 items-center
                justify-center gap-2
                bg-green-700
                px-3 py-3.5
                text-center
                text-[8px] font-semibold
                uppercase tracking-[0.1em]
                text-white
                transition-colors duration-300
                hover:bg-green-600
                min-[375px]:gap-2.5
                min-[375px]:px-4
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.12em]
                sm:gap-5
                sm:px-7 sm:py-4
                sm:text-xs
                sm:tracking-[0.16em]
              "
            >
              <span className="whitespace-nowrap">
                Plan Your Visit
              </span>

              <FiArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="
                group inline-flex
                min-w-0 items-center
                justify-center gap-2
                border border-white/20
                px-3 py-3.5
                text-center
                text-[8px] font-semibold
                uppercase tracking-[0.1em]
                text-white
                transition-colors duration-300
                hover:border-white
                hover:bg-white
                hover:text-black
                min-[375px]:gap-2.5
                min-[375px]:px-4
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.12em]
                sm:gap-4
                sm:px-7 sm:py-4
                sm:text-xs
                sm:tracking-[0.16em]
              "
            >
              <span className="whitespace-nowrap">
                Get Directions
              </span>

              <FiArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>

        {/* ==========================================
            HUGE DECORATIVE TEXT
        ========================================== */}
        <div
          className="
            pointer-events-none
            mt-12 overflow-hidden
            border-t border-white/10
            pt-5
            min-[375px]:mt-14
            min-[375px]:pt-6
            sm:mt-16 sm:pt-8
            md:mt-20
          "
        >
          <p
            className="
              whitespace-nowrap
              text-[clamp(3.2rem,16vw,5rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.075em]
              text-white/[0.035]
              sm:text-[6rem]
              md:text-[8rem]
              lg:text-[clamp(4.5rem,13vw,13rem)]
            "
          >
            SEE YOU SUNDAY.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisitCtaHome;