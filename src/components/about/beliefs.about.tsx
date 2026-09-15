"use client";

import { aboutBeliefs } from "@/data/about.data";

import FadeUp from "@/components/motion/fade-up.motion";
import Stagger from "@/components/motion/stagger.motion";
import StaggerItem from "@/components/motion/stagger-item.motion";

const BeliefsAbout = () => {
  return (
    <section className="px-6 py-24 md:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1400px]">

        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">

          <FadeUp>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-green-700">
                What We Believe & Teach
              </p>
            </div>
          </FadeUp>

          <div>
            <FadeUp>
              <h2 className="max-w-5xl text-5xl font-medium leading-[0.95] tracking-[-0.05em] md:text-7xl">
                Rooted in truth.

                <span className="block text-black/30">
                  Lived out in everyday life.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="mt-8 max-w-2xl text-sm leading-7 text-black/55 md:text-base">
                Our teaching is centred on Scripture and focused on helping
                believers know God, grow in Christ and live faithfully in every
                area of life.
              </p>
            </FadeUp>
          </div>

        </div>


        <Stagger className="mt-20 border-t border-black/10">

          {aboutBeliefs.map((belief, index) => (
            <StaggerItem key={belief.id}>
              <div className="grid gap-5 border-b border-black/10 py-8 md:grid-cols-[90px_0.8fr_1.2fr] md:items-start md:py-10">

                <p className="text-[10px] font-semibold tracking-[0.2em] text-green-700">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-2xl font-medium tracking-[-0.035em] md:text-3xl">
                  {belief.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-black/50">
                  {belief.description}
                </p>

              </div>
            </StaggerItem>
          ))}

        </Stagger>

      </div>
    </section>
  );
};

export default BeliefsAbout;