"use client";

import { FormEvent, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiMail,
  FiMapPin,
  FiSend,
  FiPhone,
} from "react-icons/fi";

import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

import { supabase } from "@/lib/supabase/client";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
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

      <section
        className="
          relative overflow-hidden bg-[#F7F7F3]
          px-5 pb-14 pt-28
          min-[375px]:px-6
          min-[375px]:pb-16
          min-[375px]:pt-32
          sm:pb-20
          sm:pt-36
          md:pb-28
          md:pt-40
          lg:px-10
          lg:pb-32
          lg:pt-48
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            -right-5 top-20
            select-none
            text-[31vw]
            font-semibold
            leading-none
            tracking-[-0.09em]
            text-black/[0.025]
            sm:-right-8
            sm:top-16
            sm:text-[25vw]
            lg:text-[18vw]
          "
        >
          COME
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-8
              min-[375px]:gap-9
              sm:gap-10
              lg:grid-cols-[0.55fr_1.45fr]
              lg:items-end
              lg:gap-12
            "
          >
            <FadeUp>
              <div>
                <p
                  className="
                    flex items-center gap-2.5
                    text-[8px] font-semibold
                    uppercase tracking-[0.22em]
                    text-green-700
                    min-[375px]:gap-3
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.3em]
                  "
                >
                  <span className="h-px w-7 shrink-0 bg-green-700 min-[375px]:w-10" />
                  Plan Your Visit
                </p>

                <p
                  className="
                    mt-4 max-w-xs
                    text-[13px] leading-6
                    text-black/45
                    min-[375px]:mt-5
                    min-[375px]:text-sm
                    min-[375px]:leading-7
                    sm:mt-6
                  "
                >
                  Whether it&apos;s your first Sunday or
                  you&apos;ve been around for a while,
                  there&apos;s a place for you here.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1
                className="
                  max-w-5xl
                  text-[clamp(3.15rem,15vw,4.5rem)]
                  font-medium
                  leading-[0.9]
                  tracking-[-0.06em]
                  sm:text-7xl
                  md:text-8xl
                  lg:text-[8.5rem]
                  lg:leading-[0.88]
                  lg:tracking-[-0.065em]
                "
              >
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

      <section
        className="
          bg-black
          px-5 py-16
          text-white
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-28
          lg:px-10
          lg:py-32
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <FadeUp>
            <p
              className="
                text-[8px] font-semibold
                uppercase tracking-[0.2em]
                text-green-400
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.28em]
              "
            >
              Sunday at TACSFON
            </p>
          </FadeUp>

          <Stagger
            className="
              mt-7 grid gap-px
              bg-white/10
              min-[375px]:mt-8
              sm:mt-10
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {/* SERVICE TIME */}

            <StaggerItem>
              <div
                className="
                  h-full bg-black
                  p-5
                  min-[375px]:p-6
                  sm:p-7
                  lg:p-10
                "
              >
                <FiClock className="text-lg text-green-400 min-[375px]:text-xl" />

                <p
                  className="
                    mt-8
                    text-[8px] font-semibold
                    uppercase tracking-[0.16em]
                    text-white/35
                    min-[375px]:mt-10
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.2em]
                    lg:mt-12
                  "
                >
                  Service Time
                </p>

                <h2
                  className="
                    mt-2.5
                    text-[1.65rem]
                    font-medium
                    tracking-[-0.035em]
                    min-[375px]:mt-3
                    min-[375px]:text-3xl
                  "
                >
                  Sundays
                </h2>

                <p className="mt-1.5 text-base text-white/50 min-[375px]:mt-2 min-[375px]:text-lg">
                  9:00 AM
                </p>
              </div>
            </StaggerItem>

            {/* LOCATION */}

            <StaggerItem>
              <div
                className="
                  h-full bg-black
                  p-5
                  min-[375px]:p-6
                  sm:p-7
                  lg:p-10
                "
              >
                <FiMapPin className="text-lg text-green-400 min-[375px]:text-xl" />

                <p
                  className="
                    mt-8
                    text-[8px] font-semibold
                    uppercase tracking-[0.16em]
                    text-white/35
                    min-[375px]:mt-10
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.2em]
                    lg:mt-12
                  "
                >
                  Location
                </p>

                <h2
                  className="
                    mt-2.5 max-w-xs
                    text-[1.65rem]
                    font-medium
                    leading-tight
                    tracking-[-0.035em]
                    min-[375px]:mt-3
                    min-[375px]:text-3xl
                  "
                >
                  TACSFON Family House
                </h2>

                <p
                  className="
                    mt-2.5 max-w-xs
                    text-[13px] leading-6
                    text-white/50
                    min-[375px]:mt-3
                    min-[375px]:text-sm
                  "
                >
                  New GEN. Area, Under G, Ogbomoso.
                </p>
              </div>
            </StaggerItem>

            {/* FIRST TIME */}

            <StaggerItem>
              <div
                className="
                  flex h-full flex-col
                  bg-green-700
                  p-5
                  min-[375px]:p-6
                  sm:col-span-2
                  sm:p-7
                  lg:col-span-1
                  lg:p-10
                "
              >
                <FiArrowUpRight className="text-lg min-[375px]:text-xl" />

                <p
                  className="
                    mt-8
                    text-[8px] font-semibold
                    uppercase tracking-[0.16em]
                    text-white/60
                    min-[375px]:mt-10
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.2em]
                    lg:mt-12
                  "
                >
                  First time?
                </p>

                <h2
                  className="
                    mt-2.5
                    text-[1.65rem]
                    font-medium
                    leading-tight
                    tracking-[-0.035em]
                    min-[375px]:mt-3
                    min-[375px]:text-3xl
                  "
                >
                  Come as you are.
                </h2>

                <p
                  className="
                    mt-2.5 max-w-md
                    text-[13px] leading-6
                    text-white/70
                    min-[375px]:mt-3
                    min-[375px]:text-sm
                    lg:max-w-xs
                  "
                >
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

      <section
        className="
          bg-white
          px-5 py-16
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-32
          lg:px-10
          lg:py-40
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-10
              min-[375px]:gap-12
              sm:gap-14
              lg:grid-cols-[0.75fr_1.25fr]
            "
          >
            <FadeUp>
              <div className="lg:sticky lg:top-32 lg:self-start">
                <p
                  className="
                    flex items-center gap-2.5
                    text-[8px] font-semibold
                    uppercase tracking-[0.2em]
                    text-green-700
                    min-[375px]:gap-3
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.28em]
                  "
                >
                  <span className="h-px w-7 bg-green-700 min-[375px]:w-9" />
                  What To Expect
                </p>

                <h2
                  className="
                    mt-5 max-w-md
                    text-[clamp(2.7rem,12vw,3.6rem)]
                    font-medium
                    leading-[0.96]
                    tracking-[-0.05em]
                    min-[375px]:mt-6
                    sm:mt-7
                    sm:text-6xl
                    sm:leading-[0.94]
                  "
                >
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
                  <div
                    className="
                      group grid
                      grid-cols-[34px_1fr]
                      gap-x-3 gap-y-3
                      border-b border-black/10
                      py-6
                      transition-colors
                      min-[375px]:grid-cols-[40px_1fr]
                      min-[375px]:gap-x-4
                      min-[375px]:py-7
                      sm:grid-cols-[50px_1fr]
                      sm:py-8
                      md:grid-cols-[100px_0.7fr_1fr]
                      md:items-start
                      md:gap-6
                      md:py-9
                    "
                  >
                    <span
                      className="
                        pt-1
                        text-[8px]
                        font-semibold
                        tracking-[0.16em]
                        text-green-700
                        min-[375px]:text-[9px]
                        min-[375px]:tracking-[0.2em]
                      "
                    >
                      {item.number}
                    </span>

                    <h3
                      className="
                        text-xl
                        font-medium
                        tracking-[-0.03em]
                        min-[375px]:text-2xl
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        col-start-2
                        max-w-lg
                        text-[13px]
                        leading-6
                        text-black/45
                        min-[375px]:text-sm
                        min-[375px]:leading-7
                        md:col-start-auto
                      "
                    >
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

      <section
        className="
          bg-[#F7F7F3]
          px-2 py-2
          min-[375px]:px-3
          min-[375px]:py-3
          sm:px-5
          sm:py-5
        "
      >
        <Reveal>
          <div
            className="
              relative mx-auto
              h-[390px]
              max-w-[1600px]
              overflow-hidden
              bg-black
              min-[375px]:h-[430px]
              sm:h-[500px]
              md:h-[620px]
              lg:h-[720px]
            "
          >
            <img
              src="/images/sunday-service.jpg"
              alt="TACSFON LAUTECH fellowship"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent sm:from-black/65 sm:via-black/15" />

            <div
              className="
                absolute bottom-0 left-0
                max-w-3xl
                p-5
                text-white
                min-[375px]:p-6
                sm:p-10
                lg:p-14
              "
            >
              <p
                className="
                  text-[8px] font-semibold
                  uppercase tracking-[0.2em]
                  text-green-400
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.28em]
                "
              >
                TACSFON LAUTECH
              </p>

              <h2
                className="
                  mt-4
                  text-[clamp(2.7rem,12vw,3.8rem)]
                  font-medium
                  leading-[0.96]
                  tracking-[-0.045em]
                  min-[375px]:mt-5
                  sm:text-6xl
                  sm:leading-[0.94]
                  lg:text-7xl
                "
              >
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

      <section
        className="
          bg-[#F7F7F3]
          px-5 py-16
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-32
          lg:px-10
          lg:py-40
        "
      >
        <div
          className="
            mx-auto grid
            max-w-[1400px]
            gap-10
            min-[375px]:gap-12
            sm:gap-14
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-16
          "
        >
          {/* LEFT */}

          <FadeUp>
            <div>
              <p
                className="
                  flex items-center gap-2.5
                  text-[8px] font-semibold
                  uppercase tracking-[0.2em]
                  text-green-700
                  min-[375px]:gap-3
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.28em]
                "
              >
                <span className="h-px w-7 bg-green-700 min-[375px]:w-9" />
                Get In Touch
              </p>

              <h2
                className="
                  mt-5 max-w-lg
                  text-[clamp(2.8rem,12vw,3.7rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  min-[375px]:mt-6
                  sm:mt-7
                  sm:text-6xl
                  sm:leading-[0.93]
                "
              >
                Have something

                <span className="block text-green-700">
                  to ask?
                </span>
              </h2>

              <p
                className="
                  mt-5 max-w-md
                  text-[13px] leading-6
                  text-black/45
                  min-[375px]:mt-6
                  min-[375px]:text-sm
                  min-[375px]:leading-7
                  sm:mt-7
                "
              >
                Send us a message and someone from the
                fellowship will get back to you.
              </p>

              <div
                className="
                  mt-8
                  border-t border-black/10
                  min-[375px]:mt-10
                  sm:mt-12
                "
              >
                {/* EMAIL */}

                <a
                  href="mailto:tacsfonlautech@gmail.com"
                  className="
                    flex items-center
                    gap-3.5
                    border-b border-black/10
                    py-4
                    min-[375px]:gap-4
                    min-[375px]:py-5
                    sm:gap-5
                    sm:py-6
                  "
                >
                  <span
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-sm
                      min-[375px]:h-10
                      min-[375px]:w-10
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <FiMail />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-black/35 min-[375px]:text-[8px] min-[375px]:tracking-[0.2em]">
                      Email
                    </p>

                    <p className="mt-1 text-[13px] min-[375px]:text-sm">
                      tacsfonlautech@gmail.com
                    </p>
                  </div>
                </a>

                {/* PHONE */}

                <a
                  href="tel:+2348060851562"
                  className="
                    group flex items-center
                    gap-3.5
                    border-b border-black/10
                    py-4
                    transition-colors
                    hover:text-green-700
                    min-[375px]:gap-4
                    min-[375px]:py-5
                    sm:gap-5
                    sm:py-6
                  "
                >
                  <span
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-sm
                      transition-colors
                      group-hover:bg-green-700
                      group-hover:text-white
                      min-[375px]:h-10
                      min-[375px]:w-10
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <FiPhone />
                  </span>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-black/35
                        min-[375px]:text-[8px]
                        min-[375px]:tracking-[0.2em]
                      "
                    >
                      Call
                    </p>

                    <p className="mt-1 text-[13px] min-[375px]:text-sm">
                      +234 806 085 1562
                    </p>
                  </div>
                </a>

                {/* LOCATION */}

                <div
                  className="
                    flex items-center
                    gap-3.5
                    border-b border-black/10
                    py-4
                    min-[375px]:gap-4
                    min-[375px]:py-5
                    sm:gap-5
                    sm:py-6
                  "
                >
                  <span
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-sm
                      min-[375px]:h-10
                      min-[375px]:w-10
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <FiMapPin />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-black/35 min-[375px]:text-[8px] min-[375px]:tracking-[0.2em]">
                      Visit
                    </p>

                    <p className="mt-1 break-words text-[13px] leading-5 min-[375px]:text-sm">
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
            <div
              className="
                bg-white
                p-5
                min-[375px]:p-6
                sm:p-9
                lg:p-12
              "
            >
              {submitted ? (
                /* SUCCESS */

                <div
                  className="
                    flex min-h-[360px]
                    items-center justify-center
                    py-8
                    min-[375px]:min-h-[400px]
                    sm:min-h-[500px]
                    sm:py-0
                  "
                >
                  <div className="max-w-md text-center">
                    <span
                      className="
                        mx-auto flex
                        h-12 w-12
                        items-center justify-center
                        rounded-full
                        bg-green-700
                        text-lg text-white
                        min-[375px]:h-14
                        min-[375px]:w-14
                        min-[375px]:text-xl
                      "
                    >
                      <FiCheck />
                    </span>

                    <h3
                      className="
                        mt-5
                        text-2xl
                        font-medium
                        tracking-[-0.035em]
                        min-[375px]:mt-7
                        min-[375px]:text-3xl
                      "
                    >
                      Message received.
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[13px] leading-6
                        text-black/45
                        min-[375px]:mt-4
                        min-[375px]:text-sm
                        min-[375px]:leading-7
                      "
                    >
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
                      className="
                        mt-6
                        text-[8px] font-semibold
                        uppercase tracking-[0.16em]
                        text-green-700
                        transition hover:text-black
                        min-[375px]:mt-8
                        min-[375px]:text-[9px]
                        min-[375px]:tracking-[0.2em]
                      "
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

                  <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                    {/* NAME */}

                    <label className="block min-w-0">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/40 min-[375px]:text-[9px] min-[375px]:tracking-[0.18em]">
                        Your Name
                      </span>

                      <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Full name"
                        className="
                          mt-2.5 w-full
                          border-b border-black/15
                          bg-transparent
                          py-3
                          text-[16px]
                          outline-none
                          transition
                          placeholder:text-black/25
                          focus:border-green-700
                          sm:mt-3
                          sm:text-sm
                        "
                      />
                    </label>

                    {/* EMAIL */}

                    <label className="block min-w-0">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/40 min-[375px]:text-[9px] min-[375px]:tracking-[0.18em]">
                        Email Address
                      </span>

                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="
                          mt-2.5 w-full
                          border-b border-black/15
                          bg-transparent
                          py-3
                          text-[16px]
                          outline-none
                          transition
                          placeholder:text-black/25
                          focus:border-green-700
                          sm:mt-3
                          sm:text-sm
                        "
                      />
                    </label>
                  </div>

                  {/* SUBJECT */}

                  <label className="mt-7 block min-w-0 sm:mt-9">
                    <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/40 min-[375px]:text-[9px] min-[375px]:tracking-[0.18em]">
                      I&apos;m reaching out about
                    </span>

                    <select
                      name="subject"
                      defaultValue=""
                      required
                      className="
                        mt-2.5 w-full
                        border-b border-black/15
                        bg-transparent
                        py-3
                        text-[16px]
                        outline-none
                        transition
                        focus:border-green-700
                        sm:mt-3
                        sm:text-sm
                      "
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

                  <label className="mt-7 block min-w-0 sm:mt-9">
                    <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/40 min-[375px]:text-[9px] min-[375px]:tracking-[0.18em]">
                      Message
                    </span>

                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="
                        mt-2.5 w-full
                        resize-none
                        border-b border-black/15
                        bg-transparent
                        py-3
                        text-[16px]
                        leading-7
                        outline-none
                        transition
                        placeholder:text-black/25
                        focus:border-green-700
                        sm:mt-3
                        sm:text-sm
                      "
                    />
                  </label>

                  {/* ERROR */}

                  {error && (
                    <div
                      role="alert"
                      className="
                        mt-6
                        border-l-2 border-black
                        bg-[#F7F7F3]
                        px-3.5 py-3
                        min-[375px]:px-4
                        sm:mt-8
                      "
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
                    className="
                      group mt-8
                      flex w-full
                      items-center
                      justify-between
                      bg-black
                      px-5 py-4
                      text-left
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.16em]
                      text-white
                      transition
                      hover:bg-green-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      min-[375px]:px-6
                      min-[375px]:py-5
                      min-[375px]:text-[10px]
                      min-[375px]:tracking-[0.2em]
                      sm:mt-10
                    "
                  >
                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : "Send Message"}
                    </span>

                    <FiSend
                      className={`shrink-0 transition-transform duration-300 ${
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
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-3 right-0
            select-none
            text-[35vw]
            font-semibold
            leading-none
            tracking-[-0.09em]
            text-white/[0.05]
            sm:-bottom-8
            sm:text-[27vw]
            lg:text-[23vw]
          "
        >
          HOME
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <FadeUp>
            <p
              className="
                text-[8px] font-semibold
                uppercase tracking-[0.2em]
                text-white/55
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.28em]
              "
            >
              This Sunday · 9:00 AM
            </p>

            <h2
              className="
                mt-5 max-w-5xl
                text-[clamp(3rem,13vw,4.25rem)]
                font-medium
                leading-[0.94]
                tracking-[-0.055em]
                min-[375px]:mt-6
                sm:mt-7
                sm:text-6xl
                lg:text-8xl
                lg:leading-[0.9]
              "
            >
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