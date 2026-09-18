"use client";

import { FormEvent, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiMail,
  FiMapPin,
  FiSend,
} from "react-icons/fi";

import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

import { supabase } from "@/lib/supabase/client";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(
      formData.get("name") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    ).trim();

    const subject = String(
      formData.get("subject") ?? ""
    ).trim();

    const message = String(
      formData.get("message") ?? ""
    ).trim();

    setError("");

    if (!name || !email || !subject || !message) {
      setError("Please complete all the fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: submitError } = await supabase
        .from("contact_messages")
        .insert([
          {
            name,
            email,
            subject,
            message,
          },
        ]);

      if (submitError) {
        console.error(
          "Unable to submit contact message:",
          submitError
        );

        setError(
          "We couldn't send your message right now. Please try again."
        );

        return;
      }

      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      console.error(
        "Unexpected contact form error:",
        submitError
      );

      setError(
        "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden bg-white text-black">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative overflow-hidden bg-[#F7F7F3] px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:px-10 lg:pb-32 lg:pt-48">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-16 select-none text-[25vw] font-semibold leading-none tracking-[-0.09em] text-black/[0.025] lg:text-[18vw]"
        >
          COME
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">

            <FadeUp>
              <div>
                <p className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-green-700">
                  <span className="h-px w-10 bg-green-700" />
                  Plan Your Visit
                </p>

                <p className="mt-6 max-w-xs text-sm leading-7 text-black/45">
                  Whether it&apos;s your first Sunday or
                  you&apos;ve been around for a while,
                  there&apos;s a place for you here.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="max-w-5xl text-6xl font-medium leading-[0.88] tracking-[-0.065em] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
                We&apos;d love to
                <span className="block text-green-700">
                  see you.
                </span>
              </h1>
            </FadeUp>

          </div>

        </div>
      </section>

      {/* ==========================================
          VISIT INFORMATION
      ========================================== */}

      <section className="bg-black px-6 py-20 text-white md:py-28 lg:px-10 lg:py-32">

        <div className="mx-auto max-w-[1400px]">

          <FadeUp>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-green-400">
              Sunday at TACSFON
            </p>
          </FadeUp>

          <Stagger className="mt-10 grid gap-px bg-white/10 lg:grid-cols-3">

            {/* SERVICE TIME */}

            <StaggerItem>
              <div className="h-full bg-black p-7 sm:p-9 lg:p-10">

                <FiClock className="text-xl text-green-400" />

                <p className="mt-12 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Service Time
                </p>

                <h2 className="mt-3 text-3xl font-medium tracking-[-0.035em]">
                  Sundays
                </h2>

                <p className="mt-2 text-lg text-white/50">
                  9:00 AM
                </p>

              </div>
            </StaggerItem>

            {/* LOCATION */}

            <StaggerItem>
              <div className="h-full bg-black p-7 sm:p-9 lg:p-10">

                <FiMapPin className="text-xl text-green-400" />

                <p className="mt-12 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  Location
                </p>

                <h2 className="mt-3 max-w-xs text-3xl font-medium leading-tight tracking-[-0.035em]">
                  TACSFON Family House
                </h2>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/50">
                  New GEN. Area, Under G,
                  Ogbomoso.
                </p>

              </div>
            </StaggerItem>

            {/* FIRST TIME */}

            <StaggerItem>
              <div className="flex h-full flex-col bg-green-700 p-7 sm:p-9 lg:p-10">

                <FiArrowUpRight className="text-xl" />

                <p className="mt-12 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  First time?
                </p>

                <h2 className="mt-3 text-3xl font-medium leading-tight tracking-[-0.035em]">
                  Come as you are.
                </h2>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
                  You don&apos;t need to have everything
                  figured out before walking through the
                  door.
                </p>

              </div>
            </StaggerItem>

          </Stagger>

        </div>
      </section>

      {/* ==========================================
          WHAT TO EXPECT
      ========================================== */}

      <section className="bg-white px-6 py-24 md:py-32 lg:px-10 lg:py-40">

        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">

            <FadeUp>
              <div className="lg:sticky lg:top-32 lg:self-start">

                <p className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-green-700">
                  <span className="h-px w-9 bg-green-700" />
                  What To Expect
                </p>

                <h2 className="mt-7 max-w-md text-5xl font-medium leading-[0.94] tracking-[-0.05em] sm:text-6xl">
                  Your first visit
                  <span className="block text-black/25">
                    shouldn&apos;t feel complicated.
                  </span>
                </h2>

              </div>
            </FadeUp>

            <Stagger className="border-t border-black/10">

              {[
                {
                  number: "01",
                  title: "A warm welcome",
                  description:
                    "You’ll meet a community of students who are glad to have you worship with us.",
                },
                {
                  number: "02",
                  title: "Worship & the Word",
                  description:
                    "Our gatherings centre on worship, prayer, fellowship and the teaching of God's Word.",
                },
                {
                  number: "03",
                  title: "Room to belong",
                  description:
                    "Beyond Sunday services, there are units, subgroups and fellowship opportunities where you can grow and serve.",
                },
              ].map((item) => (
                <StaggerItem key={item.number}>

                  <div className="group grid gap-6 border-b border-black/10 py-9 transition-colors md:grid-cols-[100px_0.7fr_1fr] md:items-start">

                    <span className="text-[9px] font-semibold tracking-[0.2em] text-green-700">
                      {item.number}
                    </span>

                    <h3 className="text-2xl font-medium tracking-[-0.03em]">
                      {item.title}
                    </h3>

                    <p className="max-w-lg text-sm leading-7 text-black/45">
                      {item.description}
                    </p>

                  </div>

                </StaggerItem>
              ))}

            </Stagger>

          </div>

        </div>
      </section>

      {/* ==========================================
          VISUAL BREAK
      ========================================== */}

      <section className="bg-[#F7F7F3] px-3 py-3 sm:px-5 sm:py-5">

        <Reveal>
          <div className="relative mx-auto h-[420px] max-w-[1600px] overflow-hidden bg-black md:h-[620px] lg:h-[720px]">

            <img
              src="/images/sunday-service.jpg"
              alt="TACSFON LAUTECH fellowship"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-3xl p-7 text-white sm:p-10 lg:p-14">

              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-green-400">
                TACSFON LAUTECH
              </p>

              <h2 className="mt-5 text-4xl font-medium leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                There&apos;s room
                <span className="block text-white/55">
                  for you here.
                </span>
              </h2>

            </div>

          </div>
        </Reveal>

      </section>

      {/* ==========================================
          CONTACT
      ========================================== */}

      <section className="bg-[#F7F7F3] px-6 py-24 md:py-32 lg:px-10 lg:py-40">

        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.75fr_1.25fr]">

          {/* LEFT */}

          <FadeUp>
            <div>

              <p className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-green-700">
                <span className="h-px w-9 bg-green-700" />
                Get In Touch
              </p>

              <h2 className="mt-7 max-w-lg text-5xl font-medium leading-[0.93] tracking-[-0.05em] sm:text-6xl">
                Have something
                <span className="block text-green-700">
                  to ask?
                </span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-black/45">
                Send us a message and someone from the
                fellowship will get back to you.
              </p>

              <div className="mt-12 border-t border-black/10">

                {/* EMAIL */}

                <div className="flex items-center gap-5 border-b border-black/10 py-6">

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                    <FiMail />
                  </span>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/35">
                      Email
                    </p>

                    <p className="mt-1 text-sm">
                      Contact the fellowship
                    </p>
                  </div>

                </div>

                {/* LOCATION */}

                <div className="flex items-center gap-5 border-b border-black/10 py-6">

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                    <FiMapPin />
                  </span>

                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/35">
                      Visit
                    </p>

                    <p className="mt-1 text-sm">
                      TACSFON Family House, Ogbomoso
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </FadeUp>

          {/* ======================================
              FORM
          ====================================== */}

          <FadeUp delay={0.1}>
            <div className="bg-white p-6 sm:p-9 lg:p-12">

              {submitted ? (
                /* SUCCESS */

                <div className="flex min-h-[500px] items-center justify-center">

                  <div className="max-w-md text-center">

                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-700 text-xl text-white">
                      <FiCheck />
                    </span>

                    <h3 className="mt-7 text-3xl font-medium tracking-[-0.035em]">
                      Message received.
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-black/45">
                      Thank you for reaching out to TACSFON
                      LAUTECH. Someone from the fellowship
                      will get back to you.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setError("");
                      }}
                      className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-green-700 transition hover:text-black"
                    >
                      Send another message
                    </button>

                  </div>

                </div>
              ) : (
                /* FORM */

                <form
                  onSubmit={handleSubmit}
                  className="w-full"
                >

                  {/* NAME + EMAIL */}

                  <div className="grid gap-8 sm:grid-cols-2">

                    {/* NAME */}

                    <label className="block">

                      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
                        Your Name
                      </span>

                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Full name"
                        className="mt-3 w-full border-b border-black/15 bg-transparent py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-green-700"
                      />

                    </label>

                    {/* EMAIL */}

                    <label className="block">

                      <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
                        Email Address
                      </span>

                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="mt-3 w-full border-b border-black/15 bg-transparent py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-green-700"
                      />

                    </label>

                  </div>

                  {/* SUBJECT */}

                  <label className="mt-9 block">

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
                      I&apos;m reaching out about
                    </span>

                    <select
                      name="subject"
                      defaultValue=""
                      required
                      className="mt-3 w-full border-b border-black/15 bg-transparent py-3 text-sm outline-none transition focus:border-green-700"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>

                      <option value="Planning my first visit">
                        Planning my first visit
                      </option>

                      <option value="Foundation School">
                        Foundation School
                      </option>

                      <option value="Units & Subgroups">
                        Units & Subgroups
                      </option>

                      <option value="Prayer">
                        Prayer
                      </option>

                      <option value="General enquiry">
                        General enquiry
                      </option>
                    </select>

                  </label>

                  {/* MESSAGE */}

                  <label className="mt-9 block">

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/40">
                      Message
                    </span>

                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="mt-3 w-full resize-none border-b border-black/15 bg-transparent py-3 text-sm leading-7 outline-none transition placeholder:text-black/25 focus:border-green-700"
                    />

                  </label>

                  {/* ERROR */}

                  {error && (
                    <div
                      role="alert"
                      className="mt-8 border-l-2 border-black bg-[#F7F7F3] px-4 py-3"
                    >
                      <p className="text-xs leading-5 text-black/60">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group mt-10 flex w-full items-center justify-between bg-black px-6 py-5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : "Send Message"}
                    </span>

                    <FiSend
                      className={`transition-transform duration-300 ${
                        isSubmitting
                          ? ""
                          : "group-hover:translate-x-1 group-hover:-translate-y-1"
                      }`}
                    />

                  </button>

                </form>
              )}

            </div>
          </FadeUp>

        </div>

      </section>

      {/* ==========================================
          FINAL STATEMENT
      ========================================== */}

      <section className="relative overflow-hidden bg-green-700 px-6 py-24 text-white md:py-32 lg:px-10">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-8 right-0 select-none text-[23vw] font-semibold leading-none tracking-[-0.09em] text-white/[0.05]"
        >
          HOME
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <FadeUp>

            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-white/55">
              This Sunday · 9:00 AM
            </p>

            <h2 className="mt-7 max-w-5xl text-5xl font-medium leading-[0.9] tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              Maybe this Sunday
              <span className="block text-white/50">
                feels like home.
              </span>
            </h2>

          </FadeUp>

        </div>

      </section>

    </main>
  );
};

export default ContactPage;