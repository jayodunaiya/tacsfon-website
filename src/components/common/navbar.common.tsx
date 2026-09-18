"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FiChevronDown,
  FiFacebook,
  FiInstagram,
  FiMenu,
  FiX,
  FiYoutube,
} from "react-icons/fi";

import { navLinks } from "@/data/navigation.data";
import { ministryUnits, ministrySubgroups } from "@/data/ministries.data";

interface LiveStream {
  isLive: boolean;
  videoId?: string;
  title?: string;
  thumbnail?: string;
}

const NavbarCommon = () => {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMinistriesOpen, setIsMinistriesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMinistriesOpen, setIsMobileMinistriesOpen] = useState(false);

  const [liveStream, setLiveStream] = useState<LiveStream>({
    isLive: false,
  });

  /*
   * Only pages added here will have the transparent
   * navbar at the top.
   *
   * For now, only the homepage needs it.
   */
  const transparentNavbarRoutes = ["/"];

  const canUseTransparentNavbar = transparentNavbarRoutes.includes(pathname);

  /*
   * Transparent navbar:
   * Homepage + top of page
   *
   * Solid navbar:
   * Homepage after scrolling OR every inner page
   */
  const isTransparent = canUseTransparentNavbar && !isScrolled;

  const isSolid = !isTransparent;

  /*
   * Ministry navigation
   *
   * Units and subgroups now point directly
   * to their dedicated ministry pages.
   */
  const ministryGroups = [
    {
      title: "Units",
      items: ministryUnits.map((unit) => ({
        label: unit.name,
        href: `/ministries/${unit.id}`,
      })),
    },
    {
      title: "Subgroups",
      items: ministrySubgroups.map((subgroup) => ({
        label: subgroup.name,
        href: `/ministries/${subgroup.id}`,
      })),
    },
  ];

  /*
   * Scroll detection
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Automatically check YouTube livestream.
   */
  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await fetch("/api/live");

        if (!response.ok) return;

        const data: LiveStream = await response.json();

        setLiveStream(data);
      } catch (error) {
        console.error("Could not check live status:", error);
      }
    };

    checkLiveStatus();

    const interval = setInterval(checkLiveStatus, 60_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /*
   * Close menus when navigating to another route.
   */
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileMinistriesOpen(false);
    setIsMinistriesOpen(false);
  }, [pathname]);

  /*
   * Prevent body scrolling while mobile menu is open.
   */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /*
   * Desktop link styling
   */
  const desktopLinkStyle = `
    relative text-sm font-medium transition-colors duration-300
    after:absolute after:-bottom-2 after:left-0 after:h-[1px]
    after:w-0 after:transition-all after:duration-300
    hover:after:w-full
    ${
      isSolid
        ? "text-black/70 hover:text-green-700 after:bg-green-700"
        : "text-white/80 hover:text-white after:bg-white"
    }
  `;

  /*
   * Social icon styling
   */
  const socialIconStyle = `
    flex h-9 w-9 items-center justify-center rounded-full border
    transition-all duration-300
    ${
      isSolid
        ? "border-black/10 text-black/60 hover:border-green-700 hover:bg-green-700 hover:text-white"
        : "border-white/20 text-white/80 hover:border-white hover:bg-white hover:text-black"
    }
  `;

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          isSolid
            ? "border-b border-black/[0.06] bg-white/95 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-3 lg:px-10 xl:px-14">
          {/* ==================================================
            LOGO
        ================================================== */}

          <Link href="/" className="shrink-0">
            <img
              src="/images/church-logo.jpg"
              alt="TACSFON LAUTECH"
              className="h-auto w-28 transition-all duration-300 sm:w-32 lg:w-36"
            />
          </Link>

          {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

          <div className="hidden flex-1 justify-center lg:flex">
            <div className="flex items-center gap-6 xl:gap-8">
              <Link href="/about" className={desktopLinkStyle}>
                About
              </Link>

              <Link href="/sermons" className={desktopLinkStyle}>
                Sermons
              </Link>

              <Link href="/events" className={desktopLinkStyle}>
                Events
              </Link>

              {/* ==================================================
                MINISTRIES
            ================================================== */}

              <div
                className="relative"
                onMouseEnter={() => setIsMinistriesOpen(true)}
                onMouseLeave={() => setIsMinistriesOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                    isSolid
                      ? "text-black/70 hover:text-green-700"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  Ministries
                  <FiChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isMinistriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* MEGA MENU */}

                <div
                  className={`absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-7 transition-all duration-300 ${
                    isMinistriesOpen
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="grid grid-cols-[0.7fr_1.3fr] gap-10 rounded-xl border border-white/10 bg-[#0a0a0a] p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                    {ministryGroups.map((group) => (
                      <div key={group.title}>
                        <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-green-500">
                          {group.title}
                        </p>

                        <div
                          className={
                            group.title === "Subgroups"
                              ? "grid grid-cols-2 gap-x-8 gap-y-3"
                              : "grid gap-3"
                          }
                        >
                          {group.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="group flex items-center gap-2 text-sm text-white/65 transition duration-200 hover:text-green-400"
                            >
                              <span className="h-px w-0 bg-green-500 transition-all duration-300 group-hover:w-3" />

                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ==================================================
                REMAINING NAVIGATION
            ================================================== */}

              {navLinks
              .filter(
                (link) =>
                  !["About", "Sermons", "Events", "Ministries"].includes(link.label)
              )
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={desktopLinkStyle}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ==================================================
            DESKTOP ACTIONS
        ================================================== */}

          <div className="hidden items-center justify-end gap-2 lg:flex">
            {/* LIVE */}

            {liveStream.isLive && (
              <Link
                href="/live"
                className={`group flex h-9 items-center gap-2.5 rounded-full border px-3.5 transition-all duration-300 ${
                  isSolid
                    ? "border-green-700/20 bg-green-50 text-green-800 hover:bg-green-700 hover:text-white"
                    : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-green-700"
                }`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">
                  Live
                </span>
              </Link>
            )}

            {/* INSTAGRAM */}

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialIconStyle}
            >
              <FiInstagram />
            </a>

            {/* YOUTUBE */}

            <a
              href="https://www.youtube.com/@tacsfonlautech3547"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TACSFON LAUTECH on YouTube"
              className={socialIconStyle}
            >
              <FiYoutube />
            </a>

            {/* FACEBOOK */}

            <a
              href="https://www.facebook.com/profile.php?id=61585499125020"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TACSFON LAUTECH on Facebook"
              className={socialIconStyle}
            >
              <FiFacebook />
            </a>
          </div>

          {/* ==================================================
            MOBILE MENU BUTTON
        ================================================== */}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
              isSolid
                ? "border-black/10 text-black"
                : "border-white/20 text-white"
            }`}
            aria-label="Open menu"
          >
            <FiMenu className="text-xl" />
          </button>
        </nav>
      </header>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      <div
        style={{ backgroundColor: "#0a0a0a" }}
        className={`fixed inset-0 z-[9999] min-h-[100dvh] overflow-hidden bg-[#0a0a0a]
          transition-transform duration-500 ease-in-out lg:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* MOBILE HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0a] px-6 py-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src="/images/church-logo.jpg"
              alt="TACSFON LAUTECH"
              className="h-auto w-28"
            />
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-green-500 hover:text-green-500"
            aria-label="Close menu"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* ==================================================
            MOBILE NAVIGATION
        ================================================== */}

        <div
          className="
    h-[calc(100dvh-73px)]
    overflow-y-auto
    bg-[#0a0a0a]
    px-6 pb-12 pt-8
  "
        >
          {/* MOBILE LIVE */}

          {liveStream.isLive && (
            <Link
              href="/live"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mb-8 flex items-center justify-between border border-green-500/25 bg-green-500/[0.08] px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />

                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-green-500">
                    Live Now
                  </p>

                  <p className="mt-1 text-base font-medium text-white">
                    {liveStream.title || "Live Worship"}
                  </p>
                </div>
              </div>

              <span className="text-xl text-white">→</span>
            </Link>
          )}

          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-500">
            Navigation
          </p>

          <div className="flex flex-col">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/10 py-5 text-3xl font-medium tracking-[-0.03em] text-white transition hover:text-green-500"
            >
              About
            </Link>

            <Link
              href="/sermons"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/10 py-5 text-3xl font-medium tracking-[-0.03em] text-white transition hover:text-green-500"
            >
              Sermons
            </Link>

            <Link
              href="/events"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b border-white/10 py-5 text-3xl font-medium tracking-[-0.03em] text-white transition hover:text-green-500"
            >
              Events
            </Link>

            {/* ==================================================
                MOBILE MINISTRIES
            ================================================== */}

            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() =>
                  setIsMobileMinistriesOpen((previous) => !previous)
                }
                className="flex w-full items-center justify-between py-5 text-left text-3xl font-medium tracking-[-0.03em] text-white"
              >
                Ministries
                <FiChevronDown
                  className={`text-xl transition-transform duration-300 ${
                    isMobileMinistriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ${
                  isMobileMinistriesOpen ? "max-h-[1300px] pb-8" : "max-h-0"
                }`}
              >
                {ministryGroups.map((group) => (
                  <div key={group.title} className="mb-7 last:mb-0">
                    <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-green-500">
                      {group.title}
                    </p>

                    <div
                      className={
                        group.title === "Subgroups"
                          ? "grid grid-cols-2 gap-x-5 gap-y-4"
                          : "grid grid-cols-1 gap-3"
                      }
                    >
                      {group.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="min-w-0 text-sm leading-5 text-white/55 transition-colors duration-200 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REMAINING MOBILE LINKS */}

            {navLinks
                .filter(
                  (link) =>
                    !["About", "Sermons", "Events", "Ministries"].includes(link.label)
                )
                .map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="border-b border-white/10 py-5 text-3xl font-medium tracking-[-0.03em] text-white transition hover:text-green-500"
                  >
                    {link.label}
                  </Link>
                ))}
          </div>

          {/* ==================================================
              MOBILE SOCIALS
          ================================================== */}

          <div className="mt-10 border-t border-white/10 pt-7">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-green-500">
              Follow Us
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-green-500 hover:bg-green-700 hover:text-white"
              >
                <FiInstagram />
              </a>

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
            </div>
          </div>

          <p className="mt-8 max-w-xs text-sm leading-6 text-white/35">
            A place to know God, grow in faith and find community.
          </p>
        </div>
      </div>
    </>
  );
};

export default NavbarCommon;
