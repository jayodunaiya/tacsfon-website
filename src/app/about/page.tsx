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
    <main className="bg-white text-black">

      {/* ==================================================
          HERO
      ================================================== */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-32 md:pt-44 lg:px-10 lg:pb-40">

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

          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

            <FadeUp>
              <div>
                <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                  <span className="h-px w-10 bg-green-700" />
                  {aboutIntro.label}
                </p>
              </div>
            </FadeUp>

            <div>

              <FadeUp>
                <h1 className="max-w-5xl text-6xl font-medium leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-[7rem]">
                  {aboutIntro.heading}

                  <span className="block text-green-700">
                    {aboutIntro.highlightedHeading}
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="mt-8 max-w-2xl text-base leading-8 text-black/55 md:text-lg">
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
      <section className="px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">

          <Reveal>
            <div className="relative h-[500px] overflow-hidden bg-black md:h-[650px] lg:h-[760px]">

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

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 z-10 md:bottom-10 md:left-10">
                <p className="max-w-md text-sm leading-6 text-white/70">
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
      <section className="px-6 py-24 md:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.75fr_1.25fr]">

          <FadeUp>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                {whoWeAre.label}
              </p>
            </div>
          </FadeUp>

          <div>

            <FadeUp>
              <h2 className="max-w-4xl text-4xl font-medium leading-[1] tracking-[-0.045em] md:text-6xl">
                {whoWeAre.heading}

                <span className="block text-black/30">
                  {whoWeAre.mutedHeading}
                </span>
              </h2>
            </FadeUp>

            <Stagger className="mt-10 grid gap-8 text-sm leading-7 text-black/55 md:grid-cols-2">

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
      <section className="bg-[#F7F7F3] px-6 py-24 md:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

            <Reveal>
              <div className="relative h-[480px] overflow-hidden bg-black md:h-[620px]">

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
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                  Our Story
                </p>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
                  Built around

                  <span className="block text-green-700">
                    faith and family.
                  </span>
                </h2>
              </FadeUp>

              <Stagger className="mt-8 space-y-6 text-sm leading-7 text-black/55">

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
      <section className="relative overflow-hidden bg-black px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

        {/* Continuous floating rings */}
        <Float
          distance={20}
          duration={10}
          className="pointer-events-none absolute -right-32 top-10"
        >
          <div className="h-[350px] w-[350px] rounded-full border border-green-500/10 md:h-[500px] md:w-[500px]" />
        </Float>

        <Float
          distance={12}
          duration={14}
          delay={1}
          className="pointer-events-none absolute -right-16 top-24"
        >
          <div className="h-[220px] w-[220px] rounded-full border border-white/[0.05] md:h-[350px] md:w-[350px]" />
        </Float>


        <div className="relative z-10 mx-auto max-w-[1400px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">

            <FadeUp>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-500">
                  What Shapes Us
                </p>
              </div>
            </FadeUp>

            <FadeUp>
              <div>
                <h2 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
                  Faith that becomes

                  <span className="block text-white/30">
                    a way of life.
                  </span>
                </h2>
              </div>
            </FadeUp>

          </div>


          <Stagger className="mt-20 grid border-t border-white/10 md:grid-cols-2 lg:grid-cols-4">

            {aboutValues.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem key={item.title}>
                  <div className="h-full border-b border-white/10 py-10 md:border-r md:px-6 lg:py-14">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-green-500">
                      <Icon />
                    </div>

                    <h3 className="mt-8 text-xl font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/40">
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
      <section className="px-6 py-24 md:py-32 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1400px]">

          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

            <div>

              <FadeUp>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                  {aboutCulture.label}
                </p>
              </FadeUp>

              <FadeUp delay={0.05}>
                <h2 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-6xl">
                  {aboutCulture.heading}

                  <span className="block text-black/30">
                    {aboutCulture.mutedHeading}
                  </span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="mt-8 max-w-xl text-sm leading-7 text-black/55">
                  {aboutCulture.description}
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <Link
                  href="/ministries"
                  className="group mt-10 inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.16em]"
                >
                  Explore Our Ministries

                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 transition-all duration-300 group-hover:bg-green-700 group-hover:text-white">
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </FadeUp>

            </div>


            <Reveal>
              <div className="relative h-[520px] overflow-hidden bg-black md:h-[650px]">

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
      <section className="relative overflow-hidden bg-green-700 px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

        {/* Continuous background typography */}
        <Float
          distance={16}
          duration={9}
          className="pointer-events-none absolute bottom-[-2rem] right-[-1rem]"
        >
          <p className="text-[8rem] font-medium tracking-[-0.08em] text-white/[0.05] md:text-[12rem] lg:text-[16rem]">
            CHRIST
          </p>
        </Float>


        <div className="relative z-10 mx-auto max-w-[1400px]">

          <FadeUp>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
              {aboutMission.label}
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <p className="mt-10 max-w-6xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] md:text-6xl lg:text-7xl">
              {aboutMission.statement}
            </p>
          </FadeUp>

        </div>
      </section>


      {/* ==================================================
          FINAL CTA
      ================================================== */}
      <section className="bg-[#F7F7F3] px-6 py-24 md:py-32 lg:px-10 lg:py-36">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-12 lg:flex-row lg:items-end">

          <div>

            <FadeUp>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                Join The Family
              </p>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h2 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
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
              className="group inline-flex w-fit items-center gap-5 bg-black px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-green-700"
            >
              Plan Your Visit

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>

        </div>
      </section>

    </main>
  );
};

export default AboutPage;