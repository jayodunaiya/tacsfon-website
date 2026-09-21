"use client";

import Link from "next/link";

import { FiArrowRight } from "react-icons/fi";

import BeliefsAbout from "@/components/about/beliefs.about";

import FadeUp from "@/components/motion/fade-up.motion";
import Reveal from "@/components/motion/reveal.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";
import Parallax from "@/components/motion/parallax.motion";
import Float from "@/components/motion/float.motion";

import {
  aboutCulture,
  aboutIntro,
  aboutMission,
  aboutValues,
  storyParagraphs,
  whoWeAre,
} from "@/data/about.data";

const AboutPage = () => {
  return (
    <main className="overflow-hidden bg-white text-black">
      {/* ==================================================
          HERO
      ================================================== */}

      <section
        className="
          relative overflow-hidden
          px-5 pb-16 pt-28
          min-[375px]:px-6
          min-[375px]:pb-20
          min-[375px]:pt-32
          sm:pb-24 sm:pt-36
          md:pb-32 md:pt-44
          lg:px-10 lg:pb-40
        "
      >
        {/* Continuous background typography */}

        <Float
          distance={14}
          duration={8}
          className="pointer-events-none absolute right-[-2rem] top-[35%] hidden lg:block"
        >
          <p className="text-[8rem] font-medium tracking-[-0.08em] text-black/[0.025] xl:text-[11rem]">
            FAMILY
          </p>
        </Float>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-7
              min-[375px]:gap-8
              sm:gap-10
              lg:grid-cols-[0.7fr_1.3fr]
              lg:items-end
              lg:gap-14
            "
          >
            <FadeUp>
              <div>
                <p
                  className="
                    flex items-center gap-3
                    text-[9px] font-semibold
                    uppercase tracking-[0.24em]
                    text-green-700
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.3em]
                  "
                >
                  <span className="h-px w-8 bg-green-700 min-[375px]:w-10" />

                  {aboutIntro.label}
                </p>
              </div>
            </FadeUp>

            <div>
              <FadeUp>
                <h1
                  className="
                    max-w-5xl
                    text-[clamp(3.25rem,15vw,4.5rem)]
                    font-medium
                    leading-[0.9]
                    tracking-[-0.06em]
                    sm:text-7xl
                    lg:text-[7rem]
                  "
                >
                  {aboutIntro.heading}

                  <span className="block text-green-700">
                    {aboutIntro.highlightedHeading}
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p
                  className="
                    mt-6 max-w-2xl
                    text-sm leading-7
                    text-black/55
                    min-[375px]:text-base
                    min-[375px]:leading-8
                    sm:mt-8
                    md:text-lg
                  "
                >
                  {aboutIntro.description}
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          HERO IMAGE
      ================================================== */}

      <section className="px-5 min-[375px]:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div
              className="
                relative h-[360px]
                overflow-hidden bg-black
                min-[375px]:h-[400px]
                sm:h-[500px]
                md:h-[650px]
                lg:h-[760px]
              "
            >
              <Parallax
                distance={70}
                className="absolute -inset-y-20 inset-x-0"
              >
                <img
                  src="/images/about/about-hero.jpg"
                  alt="TACSFON community"
                  className="h-[calc(100%+160px)] w-full object-cover"
                />
              </Parallax>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:from-black/50" />

              <div
                className="
                  absolute bottom-5 left-5 right-5 z-10
                  min-[375px]:bottom-6
                  min-[375px]:left-6
                  min-[375px]:right-6
                  md:bottom-10 md:left-10 md:right-auto
                "
              >
                <p
                  className="
                    max-w-md
                    text-xs leading-5
                    text-white/70
                    min-[375px]:text-sm
                    min-[375px]:leading-6
                  "
                >
                  A family where people encounter God, discover purpose and grow
                  together.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================================================
          WHO WE ARE
      ================================================== */}

      <section
        className="
          px-5 py-16
          min-[375px]:px-6
          sm:py-20
          md:py-32
          lg:px-10 lg:py-40
        "
      >
        <div
          className="
            mx-auto grid max-w-[1400px]
            gap-7
            min-[375px]:gap-8
            sm:gap-10
            lg:grid-cols-[0.75fr_1.25fr]
            lg:gap-16
          "
        >
          <FadeUp>
            <div>
              <p
                className="
                  text-[9px] font-semibold
                  uppercase tracking-[0.24em]
                  text-green-700
                  min-[375px]:text-[10px]
                  min-[375px]:tracking-[0.3em]
                "
              >
                {whoWeAre.label}
              </p>
            </div>
          </FadeUp>

          <div>
            <FadeUp>
              <h2
                className="
                  max-w-4xl
                  text-[clamp(2.5rem,11vw,3.5rem)]
                  font-medium
                  leading-[0.98]
                  tracking-[-0.045em]
                  md:text-6xl
                "
              >
                {whoWeAre.heading}

                <span className="block text-black/30">
                  {whoWeAre.mutedHeading}
                </span>
              </h2>
            </FadeUp>

            <Stagger
              className="
                mt-7 grid gap-5
                text-sm leading-7
                text-black/55
                min-[375px]:mt-8
                sm:mt-10 sm:gap-8
                md:grid-cols-2
              "
            >
              {whoWeAre.paragraphs.map((paragraph) => (
                <StaggerItem key={paragraph}>
                  <p>{paragraph}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ==================================================
          OUR STORY
      ================================================== */}

      <section
        className="
          bg-[#F7F7F3]
          px-5 py-16
          min-[375px]:px-6
          sm:py-20
          md:py-32
          lg:px-10 lg:py-40
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-9
              min-[375px]:gap-10
              sm:gap-12
              lg:grid-cols-[1.15fr_0.85fr]
              lg:items-center
              lg:gap-16
            "
          >
            <Reveal>
              <div
                className="
                  relative h-[360px]
                  overflow-hidden bg-black
                  min-[375px]:h-[400px]
                  sm:h-[480px]
                  md:h-[620px]
                "
              >
                <Parallax
                  distance={50}
                  className="absolute -inset-y-16 inset-x-0"
                >
                  <img
                    src="/images/about/about-story.jpg"
                    alt="TACSFON fellowship gathering"
                    className="h-[calc(100%+128px)] w-full object-cover"
                  />
                </Parallax>
              </div>
            </Reveal>

            <div>
              <FadeUp>
                <p
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.24em]
                    text-green-700
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.3em]
                  "
                >
                  Our Story
                </p>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h2
                  className="
                    mt-4
                    text-[clamp(2.6rem,11vw,3.5rem)]
                    font-medium
                    leading-[0.95]
                    tracking-[-0.05em]
                    min-[375px]:mt-5
                    sm:mt-6
                    md:text-6xl
                  "
                >
                  Built around

                  <span className="block text-green-700">
                    faith and family.
                  </span>
                </h2>
              </FadeUp>

              <Stagger
                className="
                  mt-6 space-y-5
                  text-sm leading-7
                  text-black/55
                  min-[375px]:mt-7
                  sm:mt-8 sm:space-y-6
                "
              >
                {storyParagraphs.map((paragraph) => (
                  <StaggerItem key={paragraph.text}>
                    <p>{paragraph.text}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          WHAT WE BELIEVE & TEACH
      ================================================== */}

      <BeliefsAbout />

      {/* ==================================================
          WHAT SHAPES US
      ================================================== */}

      <section
        className="
          relative overflow-hidden bg-black
          px-5 py-16 text-white
          min-[375px]:px-6
          sm:py-20
          md:py-32
          lg:px-10 lg:py-40
        "
      >
        {/* Continuous floating rings */}

        <Float
          distance={20}
          duration={10}
          className="
            pointer-events-none absolute
            -right-44 top-12
            min-[375px]:-right-40
            sm:-right-32 sm:top-10
          "
        >
          <div
            className="
              h-[280px] w-[280px]
              rounded-full
              border border-green-500/10
              min-[375px]:h-[320px]
              min-[375px]:w-[320px]
              sm:h-[350px] sm:w-[350px]
              md:h-[500px] md:w-[500px]
            "
          />
        </Float>

        <Float
          distance={12}
          duration={14}
          delay={1}
          className="
            pointer-events-none absolute
            -right-28 top-28
            min-[375px]:-right-24
            sm:-right-16 sm:top-24
          "
        >
          <div
            className="
              h-[180px] w-[180px]
              rounded-full
              border border-white/[0.05]
              min-[375px]:h-[200px]
              min-[375px]:w-[200px]
              sm:h-[220px] sm:w-[220px]
              md:h-[350px] md:w-[350px]
            "
          />
        </Float>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-7
              min-[375px]:gap-8
              sm:gap-10
              lg:grid-cols-[0.7fr_1.3fr]
              lg:gap-12
            "
          >
            <FadeUp>
              <div>
                <p
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.24em]
                    text-green-500
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.3em]
                  "
                >
                  What Shapes Us
                </p>
              </div>
            </FadeUp>

            <FadeUp>
              <div>
                <h2
                  className="
                    max-w-4xl
                    text-[clamp(2.65rem,11.5vw,4rem)]
                    font-medium
                    leading-[0.95]
                    tracking-[-0.05em]
                    md:text-7xl
                  "
                >
                  Faith that becomes

                  <span className="block text-white/30">
                    a way of life.
                  </span>
                </h2>
              </div>
            </FadeUp>
          </div>

          {/* ======================================
              VALUES

              2 columns on mobile where possible,
              original md/lg structure preserved.
          ====================================== */}

          <Stagger
            className="
              mt-12 grid grid-cols-2
              border-t border-white/10
              sm:mt-14
              md:mt-20 md:grid-cols-2
              lg:grid-cols-4
            "
          >
            {aboutValues.map((item, index) => {
              const Icon = item.icon;

              return (
                <StaggerItem key={item.title}>
                  <div
                    className={`
                      h-full
                      border-b border-white/10
                      py-7
                      min-[375px]:py-8
                      sm:py-10
                      md:px-6
                      lg:py-14

                      ${
                        index % 2 === 0
                          ? "border-r pr-4 min-[375px]:pr-5 md:pr-6"
                          : "pl-4 min-[375px]:pl-5 md:border-r md:pl-6"
                      }
                    `}
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
                        sm:h-11 sm:w-11
                        sm:text-base
                      "
                    >
                      <Icon />
                    </div>

                    <h3
                      className="
                        mt-5 break-words
                        text-base font-medium
                        min-[375px]:text-lg
                        sm:mt-8 sm:text-xl
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-[11px] leading-5
                        text-white/40
                        min-[375px]:text-xs
                        min-[375px]:leading-6
                        sm:mt-4
                        sm:text-sm
                        sm:leading-7
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ==================================================
          OUR CULTURE
      ================================================== */}

      <section
        className="
          px-5 py-16
          min-[375px]:px-6
          sm:py-20
          md:py-32
          lg:px-10 lg:py-40
        "
      >
        <div className="mx-auto max-w-[1400px]">
          <div
            className="
              grid gap-10
              sm:gap-12
              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-center
              lg:gap-16
            "
          >
            <div>
              <FadeUp>
                <p
                  className="
                    text-[9px] font-semibold
                    uppercase tracking-[0.24em]
                    text-green-700
                    min-[375px]:text-[10px]
                    min-[375px]:tracking-[0.3em]
                  "
                >
                  {aboutCulture.label}
                </p>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h2
                  className="
                    mt-4
                    text-[clamp(2.6rem,11vw,3.5rem)]
                    font-medium
                    leading-[0.95]
                    tracking-[-0.05em]
                    min-[375px]:mt-5
                    sm:mt-6
                    md:text-6xl
                  "
                >
                  {aboutCulture.heading}

                  <span className="block text-black/30">
                    {aboutCulture.mutedHeading}
                  </span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p
                  className="
                    mt-6 max-w-xl
                    text-sm leading-7
                    text-black/55
                    sm:mt-8
                  "
                >
                  {aboutCulture.description}
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <Link
                  href="/ministries"
                  className="
                    group mt-7 inline-flex
                    items-center gap-3
                    text-[10px] font-semibold
                    uppercase tracking-[0.14em]
                    min-[375px]:mt-8
                    min-[375px]:text-xs
                    min-[375px]:tracking-[0.16em]
                    sm:mt-10 sm:gap-4
                  "
                >
                  Explore Our Ministries

                  <span
                    className="
                      flex h-9 w-9
                      shrink-0 items-center
                      justify-center rounded-full
                      border border-black/15
                      transition-all duration-300
                      group-hover:bg-green-700
                      group-hover:text-white
                      min-[375px]:h-10
                      min-[375px]:w-10
                    "
                  >
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeUp>
            </div>

            <Reveal>
              <div
                className="
                  relative h-[360px]
                  overflow-hidden bg-black
                  min-[375px]:h-[400px]
                  sm:h-[500px]
                  md:h-[650px]
                "
              >
                <Parallax
                  distance={55}
                  className="absolute -inset-y-16 inset-x-0"
                >
                  <img
                    src="/images/about/about-culture.jpg"
                    alt="TACSFON members together"
                    className="h-[calc(100%+128px)] w-full object-cover"
                  />
                </Parallax>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==================================================
          OUR MISSION
      ================================================== */}

      <section
        className="
          relative overflow-hidden
          bg-green-700
          px-5 py-16 text-white
          min-[375px]:px-6
          sm:py-20
          md:py-32
          lg:px-10 lg:py-40
        "
      >
        {/* Continuous background typography */}

        <Float
          distance={16}
          duration={9}
          className="
            pointer-events-none absolute
            bottom-[-1rem] right-[-1rem]
            sm:bottom-[-2rem]
          "
        >
          <p
            className="
              text-[5rem] font-medium
              tracking-[-0.08em]
              text-white/[0.05]
              min-[375px]:text-[6rem]
              sm:text-[8rem]
              md:text-[12rem]
              lg:text-[16rem]
            "
          >
            CHRIST
          </p>
        </Float>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <FadeUp>
            <p
              className="
                text-[9px] font-semibold
                uppercase tracking-[0.24em]
                text-white/60
                min-[375px]:text-[10px]
                min-[375px]:tracking-[0.3em]
              "
            >
              {aboutMission.label}
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <p
              className="
                mt-7 max-w-6xl
                text-[clamp(2.15rem,9.5vw,3.25rem)]
                font-medium
                leading-[1.05]
                tracking-[-0.045em]
                min-[375px]:mt-8
                sm:mt-10
                md:text-6xl
                lg:text-7xl
              "
            >
              {aboutMission.statement}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}

      <section
        className="
          bg-[#F7F7F3]
          px-5 py-16
          min-[375px]:px-6
          sm:py-20
          md:py-32
          lg:px-10 lg:py-36
        "
      >
        <div
          className="
            mx-auto flex max-w-[1400px]
            flex-col justify-between
            gap-8
            sm:gap-10
            lg:flex-row
            lg:items-end
            lg:gap-12
          "
        >
          <div>
            <FadeUp>
              <p
                className="
                  text-[9px] font-semibold
                  uppercase tracking-[0.24em]
                  text-green-700
                  min-[375px]:text-[10px]
                  min-[375px]:tracking-[0.3em]
                "
              >
                Join The Family
              </p>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h2
                className="
                  mt-4 max-w-4xl
                  text-[clamp(2.75rem,12vw,4rem)]
                  font-medium
                  leading-[0.95]
                  tracking-[-0.05em]
                  min-[375px]:mt-5
                  sm:mt-6
                  md:text-7xl
                "
              >
                There&apos;s a place

                <span className="block text-green-700">
                  for you here.
                </span>
              </h2>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <Link
              href="/contact"
              className="
                group inline-flex w-fit
                items-center gap-3
                bg-black
                px-5 py-3.5
                text-[10px] font-semibold
                uppercase tracking-[0.14em]
                text-white
                transition-colors duration-300
                hover:bg-green-700
                min-[375px]:gap-4
                min-[375px]:px-6
                min-[375px]:py-4
                min-[375px]:text-xs
                min-[375px]:tracking-[0.16em]
                sm:gap-5 sm:px-7
              "
            >
              Plan Your Visit

              <FiArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;