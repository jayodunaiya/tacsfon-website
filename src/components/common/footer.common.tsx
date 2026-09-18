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
    <footer className="bg-[#0A0A0A] px-6 text-white lg:px-10">
      <div className="mx-auto max-w-[1400px]">

        {/* Top */}
        <div className="grid gap-16 border-b border-white/10 py-20 md:py-24 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] lg:gap-12">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-4"
            >
              <img
                src="/images/church-logo.jpg"
                alt="TACSFON LAUTECH"
                className="h-13 w-auto object-cover"
              />

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em]">
                  TACSFON
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-white/35">
                  LAUTECH Chapter
                </p>
              </div>
            </Link>

            <p className="mt-8 max-w-sm text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-white/90">
              Where love rises
              <span className="block text-green-500">
                and never sets.
              </span>
            </p>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/40">
              A family of believers committed to knowing God, growing
              together and making His love known.
            </p>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-3">

              <a
                href="https://www.youtube.com/@tacsfonlautech3547"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-green-500 hover:bg-green-700 hover:text-white"
              >
                <FiYoutube />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61585499125020"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-green-500 hover:bg-green-700 hover:text-white"
              >
                <FiFacebook />
              </a>

              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-green-500 hover:bg-green-700 hover:text-white"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-green-500">
              Explore
            </p>

            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group inline-flex w-fit items-center gap-2 text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {item.label}

                  <FiArrowUpRight className="text-xs opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>

          {/* Ministries */}
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-green-500">
              Ministries
            </p>

            <div className="flex flex-col gap-4">
              {ministries.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/50 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-green-500">
              Join Us
            </p>

            <div className="space-y-7">

              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                  Sunday Service
                </p>

                <p className="mt-2 text-sm text-white/75">
                  Sundays · 9:00 AM
                </p>
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">
                  Location
                </p>

                <p className="mt-2 max-w-[230px] text-sm leading-6 text-white/75">
                  TACSFON Family House,
                  <br />
                  New Gen. Area,
                  <br />
                  Under G, Ogbomoso.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-b border-white/20 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-green-500 hover:text-green-500"
              >
                Plan Your Visit

                <FiArrowUpRight className="transition-transform duration-300 group-hover:-rotate-45" />
              </Link>
            </div>
          </div>
        </div>

        

        {/* Large Wordmark */}
        <div className="overflow-hidden border-b border-white/10 py-10">
          <p className="whitespace-nowrap text-[clamp(4rem,12vw,12rem)] font-semibold leading-[0.8] tracking-[-0.075em] text-white/[0.035]">
            TACSFON LAUTECH.
          </p>
        </div>

        <div className="border-y border-white/10 py-10 md:py-12">
  <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">

    {/* LEFT */}
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-7 bg-green-500" />

        <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-green-400">
          Stay Updated
        </p>
      </div>

      <h3 className="mt-4 max-w-md text-2xl font-medium leading-[1.05] tracking-[-0.04em] text-white sm:text-3xl">
        Keep up with what&apos;s
        <span className="text-white/40"> happening.</span>
      </h3>

      <p className="mt-3 max-w-md text-xs leading-5 text-white/40">
        Special programmes, conferences and important
        fellowship updates — straight to your inbox.
      </p>
    </div>

    {/* RIGHT */}
    <div>
      <div className="rounded-sm border border-white/10 bg-white/[0.04] px-5 py-5 sm:px-6">
        <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
          Join the mailing list
        </p>

        <NewsletterForm variant="dark" />
      </div>

      <p className="mt-3 text-[9px] leading-4 text-white/25">
        No spam. Unsubscribe whenever you want.
      </p>
    </div>

  </div>
</div>

        {/* Bottom */}
        <div className="flex flex-col justify-between gap-5 py-7 text-[10px] uppercase tracking-[0.18em] text-white/25 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} TACSFON LAUTECH Chapter.
          </p>

          <div className="flex flex-wrap gap-6">
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