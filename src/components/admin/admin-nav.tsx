"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiCalendar,
  FiEdit3,
  FiExternalLink,
  FiGrid,
  FiImage,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { supabase } from "@/lib/supabase/client";

const adminLinks = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: FiGrid,
  },
  {
    name: "Sermons",
    href: "/admin/sermons",
    icon: FiBookOpen,
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: FiCalendar,
  },
  {
    name: "Editorial",
    href: "/admin/editorial",
    icon: FiEdit3,
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: FiImage,
  },
];

const AdminNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* ==============================
          DESKTOP SIDEBAR
      ============================== */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[250px] flex-col border-r border-black/10 bg-[#F7F7F3] lg:flex">
        <div className="border-b border-black/10 px-7 py-7">
          <Link href="/admin">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-green-700">
              TACSFON LAUTECH
            </p>

            <h1 className="mt-2 text-xl font-medium tracking-[-0.04em]">
              Admin
            </h1>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6">
          <p className="mb-4 px-3 text-[8px] font-semibold uppercase tracking-[0.24em] text-black/30">
            Management
          </p>

          <div className="space-y-1">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-3 px-3 py-3.5 text-sm transition-all ${
                    active
                      ? "bg-green-700 text-white"
                      : "text-black/55 hover:bg-black hover:text-white"
                  }`}
                >
                  <Icon
                    className={`text-base ${
                      active
                        ? "text-white"
                        : "text-black/40 group-hover:text-white"
                    }`}
                  />

                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-black/10 p-4">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-3 text-xs text-black/50 transition-colors hover:text-green-700"
          >
            <span>View Website</span>

            <FiExternalLink />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 px-3 py-3 text-xs text-black/50 transition-colors hover:bg-black hover:text-white"
          >
            <FiLogOut />

            Logout
          </button>
        </div>
      </aside>

      {/* ==============================
          MOBILE HEADER
      ============================== */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-[70px] items-center justify-between border-b border-black/10 bg-[#F7F7F3]/95 px-5 backdrop-blur-md lg:hidden">
        <Link href="/admin">
          <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-green-700">
            TACSFON LAUTECH
          </p>

          <p className="mt-0.5 text-sm font-medium tracking-[-0.02em]">
            Admin
          </p>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open admin navigation"
          className="flex h-10 w-10 items-center justify-center border border-black/10"
        >
          <FiMenu />
        </button>
      </header>

      {/* ==============================
          MOBILE MENU
      ============================== */}
      <div
        className={`fixed inset-0 z-[100] transition ${
          isOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        } lg:hidden`}
      >
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute right-0 top-0 flex h-full w-[85%] max-w-[360px] flex-col bg-[#F7F7F3] transition-transform duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-6">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-green-700">
                TACSFON LAUTECH
              </p>

              <p className="mt-1 text-lg font-medium">
                Admin
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center border border-black/10"
            >
              <FiX />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-7">
            <p className="mb-4 text-[8px] font-semibold uppercase tracking-[0.24em] text-black/30">
              Management
            </p>

            <div className="space-y-2">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-4 px-4 py-4 text-sm ${
                      active
                        ? "bg-green-700 text-white"
                        : "border border-black/10 bg-white text-black/60"
                    }`}
                  >
                    <Icon />

                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-black/10 p-5">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-black/10 bg-white px-4 py-4 text-xs"
            >
              View Website

              <FiExternalLink />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-3 bg-black px-4 py-4 text-xs text-white"
            >
              <FiLogOut />

              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;