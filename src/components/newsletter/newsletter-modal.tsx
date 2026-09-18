"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMail, FiX } from "react-icons/fi";

import NewsletterForm from "./newsletter-form";

const STORAGE_KEY = "tacsfon-newsletter-popup";
const SUBSCRIBED_KEY = "tacsfon-newsletter-subscribed";

const NewsletterModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const subscribed =
      localStorage.getItem(SUBSCRIBED_KEY) === "true";

    if (subscribed) return;

    const dismissedAt = localStorage.getItem(STORAGE_KEY);

    if (dismissedAt) {
      const dismissedTime = Number(dismissedAt);

      // Show again after 7 days.
      const sevenDays = 7 * 24 * 60 * 60 * 1000;

      if (
        Number.isFinite(dismissedTime) &&
        Date.now() - dismissedTime < sevenDays
      ) {
        return;
      }
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    localStorage.setItem(
      STORAGE_KEY,
      String(Date.now())
    );

    setIsOpen(false);
  };

  const handleSubscribed = () => {
    localStorage.setItem(SUBSCRIBED_KEY, "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/65 px-4 backdrop-blur-[3px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-title"
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.98,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-[760px] overflow-hidden bg-[#F7F7F3] text-black shadow-2xl"
          >
            {/* Decorative word */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 top-2 select-none text-[7rem] font-semibold leading-none tracking-[-0.08em] text-black/[0.035] sm:text-[10rem]"
            >
              STAY
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close newsletter popup"
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white"
            >
              <FiX />
            </button>

            <div className="relative z-10 grid md:grid-cols-[0.8fr_1.2fr]">
              {/* Green strip */}
              <div className="hidden min-h-[430px] bg-green-700 p-8 text-white md:flex md:flex-col md:justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25">
                  <FiMail />
                </div>

                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/55">
                    TACSFON LAUTECH
                  </p>

                  <p className="mt-4 max-w-[180px] text-xl font-medium leading-tight tracking-[-0.03em]">
                    Stay close to what God is doing in the family.
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-16 sm:px-10 sm:py-16 md:px-12">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-green-700" />

                  <span className="text-[9px] font-semibold uppercase tracking-[0.23em] text-green-700">
                    Stay Connected
                  </span>
                </div>

                <h2
                  id="newsletter-title"
                  className="mt-6 max-w-md text-4xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-5xl"
                >
                  Don&apos;t miss
                  <span className="block text-black/35">
                    what&apos;s happening.
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-black/55">
                  Get special programmes, conferences and
                  important fellowship updates delivered
                  directly to your inbox.
                </p>

                <div className="mt-9">
                  <NewsletterForm
                    variant="light"
                    onSuccess={handleSubscribed}
                  />
                </div>

                <p className="mt-5 text-[10px] leading-5 text-black/35">
                  No spam. Only important fellowship updates.
                  Unsubscribe whenever you want.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterModal;