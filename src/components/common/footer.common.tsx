import Link from "next/link";

import {
  FiArrowUpRight,
  FiFacebook,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

import NewsletterForm from "@/components/newsletter/newsletter-form";

const FooterCommon = () => {
  const navigation = [
    { label: "About", href: "/about" },
    { label: "Sermons", href: "/sermons" },
    { label: "Events", href: "/events" },
    { label: "Ministries", href: "/ministries" },
    { label: "Editorial", href: "/editorial" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  const ministries = [
    { label: "Brothers' Unit", href: "/ministries/brothers" },
    { label: "Sisters' Unit", href: "/ministries/sisters" },
    { label: "Welfare Unit", href: "/ministries/welfare" },
    { label: "Bible Study", href: "/ministries/bible-study" },
    { label: "Choral", href: "/ministries/choral" },
    { label: "Prayer", href: "/ministries/prayer" },
  ];

  return (
    <footer
      className="
        overflow-hidden bg-[#0A0A0A]
        px-5 text-white
        min-[375px]:px-6
        lg:px-10
      "
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ==========================================
            TOP
        ========================================== */}

        <div
          className="
            border-b border-white/10
            py-12
            min-[375px]:py-14
            sm:py-16
            md:py-20

            lg:grid
            lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]
            lg:gap-12
            lg:py-24
          "
        >
        
          {/* ======================================
                BRAND
              ====================================== */}

              <div className="min-w-0">
                {/* Logo / identity + tagline */}
                
                  <div
                    className="
                      grid
                      grid-cols-[minmax(90px,0.42fr)_minmax(0,0.58fr)]
                      items-start
                      gap-x-4
                      min-[375px]:grid-cols-[minmax(105px,0.4fr)_minmax(0,0.6fr)]
                      min-[375px]:gap-x-5
                      sm:grid-cols-[150px_minmax(0,1fr)]
                      sm:gap-x-8

                      lg:block
                    "
                  >
                    {/* LEFT — Logo + TACSFON */}

                    <Link
                      href="/"
                      className="
                        flex min-w-0
                        flex-col
                        items-start
                      "
                    >
                      <img
                        src="/images/church-logo.jpg"
                        alt="TACSFON LAUTECH"
                        className="
                          h-10 w-auto
                          object-cover
                          min-[375px]:h-11
                          sm:h-13
                          lg:h-12
                        "
                      />

                      {/* Reduced spacing here */}

                      <div className="mt-1.5 sm:mt-2">
                        <p
                          className="
                            text-[10px]
                            font-semibold
                            uppercase
                            leading-none
                            tracking-[0.08em]
                            min-[375px]:text-[11px]
                            sm:text-sm
                          "
                        >
                          TACSFON
                        </p>

                        <p
                          className="
                            mt-1
                            whitespace-nowrap
                            text-[6.5px]
                            uppercase
                            leading-none
                            tracking-[0.12em]
                            text-white/35
                            min-[375px]:text-[7px]
                            min-[375px]:tracking-[0.15em]
                            sm:text-[8px]
                            sm:tracking-[0.18em]
                          "
                        >
                          LAUTECH Chapter
                        </p>
                      </div>
                    </Link>

                    {/* RIGHT — Tagline */}

                    <div
                      className="
                        flex h-full
                        min-w-0
                        items-center
                        border-l border-white/10
                        pl-4
                        min-[375px]:pl-5
                        sm:pl-8

                        lg:mt-7
                        lg:block
                        lg:h-auto
                        lg:border-l-0
                        lg:pl-0
                      "
                    >
                      <p
                        className="
                          min-w-0
                          text-[1.35rem]
                          font-medium
                          leading-[1.02]
                          tracking-[-0.04em]
                          text-white/90
                          min-[375px]:text-[1.55rem]
                          sm:text-3xl
                          lg:max-w-sm
                        "
                      >
                        Where love rises

                        <span className="block text-green-500">
                          and never sets.
                        </span>
                      </p>
                    </div>
                  </div>

                {/* Description */}

                <p
                  className="
                    mt-7 max-w-md
                    text-[11px]
                    leading-5
                    text-white/40
                    min-[375px]:text-xs
                    min-[375px]:leading-6
                    sm:mt-8
                    sm:text-sm
                    sm:leading-7
                    lg:max-w-sm
                  "
                >
                  A family of believers committed to knowing God,
                  growing together and making His love known.
                </p>

                {/* Socials */}

                <div className="mt-6 flex items-center gap-2.5 sm:mt-8 sm:gap-3">
                  <a
                    href="https://www.youtube.com/@tacsfonlautech3547"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      border border-white/15
                      text-sm text-white/70
                      transition-all duration-300
                      hover:border-green-500
                      hover:bg-green-700
                      hover:text-white
                      min-[375px]:h-10
                      min-[375px]:w-10
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <FiYoutube />
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61585499125020"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      border border-white/15
                      text-sm text-white/70
                      transition-all duration-300
                      hover:border-green-500
                      hover:bg-green-700
                      hover:text-white
                      min-[375px]:h-10
                      min-[375px]:w-10
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <FiFacebook />
                  </a>

                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      border border-white/15
                      text-sm text-white/70
                      transition-all duration-300
                      hover:border-green-500
                      hover:bg-green-700
                      hover:text-white
                      min-[375px]:h-10
                      min-[375px]:w-10
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <FiInstagram />
                  </a>
                </div>
              </div>

          {/* ======================================
              MOBILE NAVIGATION + MINISTRIES

              Side-by-side on phones.
              At lg they participate in the original
              four-column footer grid.
          ====================================== */}

          {/* ======================================
              EXPLORE + MINISTRIES
              ====================================== */}

        <div
          className="
            mt-10
            border-t border-white/10
            pt-9
            sm:mt-12
            sm:pt-10

            lg:contents
          "
        >
          {/* ======================================
              EXPLORE
          ====================================== */}

          <div className="min-w-0">
            <p
              className="
                mb-5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.23em]
                text-green-500
                sm:mb-6
                sm:text-[10px]
                sm:tracking-[0.28em]
              "
            >
              Explore
            </p>

            <div
              className="
                grid
                grid-cols-3
                gap-x-3
                gap-y-4
                min-[375px]:gap-x-4
                min-[375px]:gap-y-5
                sm:gap-x-8
                sm:gap-y-5

                lg:flex
                lg:flex-col
                lg:gap-4
              "
            >
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="
                    group
                    min-w-0
                    text-[11px]
                    leading-5
                    text-white/50
                    transition-colors
                    duration-300
                    hover:text-white
                    min-[375px]:text-xs
                    sm:text-sm
                  "
                >
                  <span className="break-words">
                    {item.label}
                  </span>

                  <FiArrowUpRight
                    className="
                      ml-2 hidden
                      shrink-0
                      text-xs
                      opacity-0
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:opacity-100
                      lg:inline-block
                    "
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* ======================================
              MINISTRIES
          ====================================== */}

          <div
            className="
              mt-9
              border-t border-white/[0.07]
              pt-8
              sm:mt-10
              sm:pt-9

              lg:mt-0
              lg:border-0
              lg:pt-0
            "
          >
            <p
              className="
                mb-5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.23em]
                text-green-500
                sm:mb-6
                sm:text-[10px]
                sm:tracking-[0.28em]
              "
            >
              Ministries
            </p>

            <div
              className="
                grid
                grid-cols-3
                gap-x-3
                gap-y-4
                min-[375px]:gap-x-4
                min-[375px]:gap-y-5
                sm:gap-x-8
                sm:gap-y-5

                lg:flex
                lg:flex-col
                lg:gap-4
              "
            >
              {ministries.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="
                    min-w-0
                    break-words
                    text-[11px]
                    leading-5
                    text-white/50
                    transition-colors
                    duration-300
                    hover:text-white
                    min-[375px]:text-xs
                    sm:text-sm
                  "
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

          {/* ======================================
              JOIN US
          ====================================== */}

          <div
            className="
              mt-10
              border-t border-white/10
              pt-10
              sm:mt-12 sm:pt-12
              lg:mt-0
              lg:border-0
              lg:pt-0
            "
          >
            <p
              className="
                mb-5 text-[9px]
                font-semibold uppercase
                tracking-[0.23em]
                text-green-500
                sm:mb-6
                sm:text-[10px]
                sm:tracking-[0.28em]
              "
            >
              Join Us
            </p>

            <div
              className="
                grid grid-cols-2 gap-6
                sm:gap-8
                lg:block lg:space-y-7
              "
            >
              <div>
                <p
                  className="
                    text-[8px] uppercase
                    tracking-[0.18em]
                    text-white/30
                    sm:text-[9px]
                    sm:tracking-[0.22em]
                  "
                >
                  Sunday Service
                </p>

                <p
                  className="
                    mt-2 text-xs leading-5
                    text-white/75
                    sm:text-sm
                  "
                >
                  Sundays
                  <span className="block min-[375px]:inline">
                    {" "}· 9:00 AM
                  </span>
                </p>
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[8px] uppercase
                    tracking-[0.18em]
                    text-white/30
                    sm:text-[9px]
                    sm:tracking-[0.22em]
                  "
                >
                  Location
                </p>

                <p
                  className="
                    mt-2 max-w-[230px]
                    break-words
                    text-xs leading-5
                    text-white/75
                    sm:text-sm sm:leading-6
                  "
                >
                  TACSFON Family House,
                  <br />
                  New Gen. Area,
                  <br />
                  Under G, Ogbomoso.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="
                group mt-7 inline-flex
                items-center gap-3
                border-b border-white/20
                pb-2
                text-[9px] font-semibold
                uppercase tracking-[0.13em]
                text-white
                transition-colors duration-300
                hover:border-green-500
                hover:text-green-500
                sm:text-xs
                sm:tracking-[0.16em]
                lg:mt-7
              "
            >
              Plan Your Visit

              <FiArrowUpRight className="transition-transform duration-300 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>

        {/* ==========================================
            LARGE WORDMARK
        ========================================== */}

        <div
          className="
            overflow-hidden
            border-b border-white/10
            py-7
            min-[375px]:py-8
            sm:py-10
          "
        >
          <p
            className="
              whitespace-nowrap
              text-[clamp(3.1rem,15vw,5rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.075em]
              text-white/[0.035]
              sm:text-[6rem]
              md:text-[8rem]
              lg:text-[clamp(4rem,12vw,12rem)]
            "
          >
            TACSFON LAUTECH.
          </p>
        </div>

        {/* ==========================================
            NEWSLETTER
        ========================================== */}

        <div
          className="
            border-b border-white/10
            py-8
            min-[375px]:py-9
            sm:py-10
            md:py-12
          "
        >
          <div
            className="
              grid gap-7
              sm:gap-8
              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-center
              lg:gap-20
            "
          >
            {/* LEFT */}

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-green-500 sm:w-7" />

                <p
                  className="
                    text-[8px] font-semibold
                    uppercase tracking-[0.2em]
                    text-green-400
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.24em]
                  "
                >
                  Stay Updated
                </p>
              </div>

              <h3
                className="
                  mt-4 max-w-md
                  text-[1.55rem] font-medium
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-white
                  min-[375px]:text-2xl
                  sm:text-3xl
                "
              >
                Keep up with what&apos;s
                <span className="text-white/40">
                  {" "}
                  happening.
                </span>
              </h3>

              <p
                className="
                  mt-3 max-w-md
                  text-[11px] leading-5
                  text-white/40
                  min-[375px]:text-xs
                "
              >
                Special programmes, conferences and important fellowship
                updates — straight to your inbox.
              </p>
            </div>

            {/* RIGHT */}

            <div className="min-w-0">
              <div
                className="
                  border border-white/10
                  bg-white/[0.04]
                  px-4 py-4
                  min-[375px]:px-5
                  min-[375px]:py-5
                  sm:px-6
                "
              >
                <p
                  className="
                    mb-2 text-[8px]
                    font-semibold uppercase
                    tracking-[0.15em]
                    text-white/45
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.18em]
                  "
                >
                  Join the mailing list
                </p>

                <div className="min-w-0">
                  <NewsletterForm variant="dark" />
                </div>
              </div>

              <p className="mt-3 text-[8px] leading-4 text-white/25 min-[375px]:text-[9px]">
                No spam. Unsubscribe whenever you want.
              </p>
            </div>
          </div>
        </div>

        {/* ==========================================
            BOTTOM
        ========================================== */}

        <div
          className="
            flex items-center justify-between
            gap-4 py-6
            text-[8px] uppercase
            tracking-[0.12em]
            text-white/25
            min-[375px]:text-[9px]
            min-[375px]:tracking-[0.15em]
            sm:py-7
            sm:text-[10px]
            sm:tracking-[0.18em]
          "
        >
          <p className="min-w-0 leading-5">
            © {new Date().getFullYear()} TACSFON LAUTECH
            <span className="hidden sm:inline"> Chapter.</span>
          </p>

          <div
            className="
              flex shrink-0 items-center
              gap-4
              min-[375px]:gap-5
              sm:gap-6
            "
          >
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterCommon;