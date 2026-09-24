import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";
import type { Metadata } from "next";

import DownloadPublication from "./download-publication";



import {
  getEditorialBySlug,
  getEditorials,
} from "@/lib/editorials";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const article = await getEditorialBySlug(slug);

  if (!article) {
    return {
      title: "Article",
    };
  }

  return {
    title: article.title,
    description:
      article.excerpt ||
      `Read ${article.title} from TACSFON LAUTECH Editorial.`,

    openGraph: {
      title: article.title,
      description:
        article.excerpt ||
        `Read ${article.title} from TACSFON LAUTECH Editorial.`,
      type: "article",

      ...(article.image_url && {
        images: [
          {
            url: article.image_url,
            alt: article.title,
          },
        ],
      }),
    },
  };
}

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));

const EditorialArticlePage = async ({
  params,
}: PageProps) => {
  const { slug } = await params;

  const editorial = await getEditorialBySlug(slug);

  if (!editorial) {
    notFound();
  }

  const editorials = await getEditorials();

  const currentIndex = editorials.findIndex(
    (item) => item.id === editorial.id
  );

  const nextEditorial =
    currentIndex >= 0 &&
    currentIndex < editorials.length - 1
      ? editorials[currentIndex + 1]
      : editorials.find(
          (item) => item.id !== editorial.id
        ) ?? null;

  const paragraphs = editorial.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="overflow-hidden bg-white text-black">

      {/* ==========================================
          HERO
      ========================================== */}

      <section
        className="
          relative overflow-hidden
          bg-[#f7f7f3]
          px-5 pb-14 pt-28
          min-[375px]:px-6
          min-[375px]:pb-16
          min-[375px]:pt-32
          sm:pb-20
          sm:pt-40
          md:pb-28
          lg:px-10
          lg:pb-36
          lg:pt-48
        "
      >
        <span
          className="
            pointer-events-none
            absolute -bottom-10 right-[-3%]
            hidden select-none
            text-[15rem]
            font-medium
            leading-none
            tracking-[-0.08em]
            text-black/[0.025]
            lg:block
          "
        >
          READ
        </span>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <Link
            href="/editorial"
            className="
              group
              inline-flex
              items-center
              gap-2.5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-black/40
              transition
              hover:text-green-700
              min-[375px]:gap-3
              min-[375px]:text-[9px]
              min-[375px]:tracking-[0.2em]
            "
          >
            <FiArrowLeft className="shrink-0 transition-transform group-hover:-translate-x-1" />

            Editorial
          </Link>

          <div
            className="
              mt-9
              grid gap-7
              min-[375px]:mt-10
              min-[375px]:gap-8
              sm:mt-12
              sm:gap-10
              md:mt-14
              lg:grid-cols-[1.2fr_0.8fr]
              lg:items-end
              lg:gap-12
            "
          >
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 min-[375px]:gap-x-3">
                <span
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-green-700
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.25em]
                  "
                >
                  {editorial.category}
                </span>

                <span className="h-1 w-1 shrink-0 rounded-full bg-black/20" />

                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.13em]
                    text-black/35
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.18em]
                  "
                >
                  {formatDate(editorial.published_at)}
                </span>
              </div>

              <h1
                className="
                  mt-5
                  max-w-5xl
                  break-words
                  text-[clamp(2.8rem,13vw,4rem)]
                  font-medium
                  leading-[0.94]
                  tracking-[-0.055em]
                  min-[375px]:mt-6
                  sm:mt-7
                  sm:text-6xl
                  sm:leading-[0.92]
                  md:text-7xl
                  lg:text-[6.5rem]
                  lg:leading-[0.92]
                  lg:tracking-[-0.06em]
                "
              >
                {editorial.title}
              </h1>
            </div>

            {editorial.excerpt && (
              <p
                className="
                  max-w-md
                  text-[14px]
                  leading-7
                  text-black/50
                  sm:text-base
                  sm:leading-8
                  lg:ml-auto
                "
              >
                {editorial.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          COVER IMAGE
      ========================================== */}

      {editorial.image_url && (
        <section
          className="
            bg-white
            px-5 pt-6
            min-[375px]:px-6
            min-[375px]:pt-8
            sm:pt-10
            lg:px-10
            lg:pt-14
          "
        >
          <div className="mx-auto max-w-[1400px]">
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                bg-black
                min-[375px]:aspect-[5/6]
                sm:aspect-[16/10]
                sm:min-h-[450px]
                lg:aspect-[16/8]
                lg:min-h-[600px]
              "
            >
              <img
                src={editorial.image_url}
                alt={editorial.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </div>
        </section>
      )}

      {/* ==========================================
          ARTICLE
      ========================================== */}

      <article
        className="
          px-5 py-16
          min-[375px]:px-6
          min-[375px]:py-20
          sm:py-24
          md:py-28
          lg:px-10
          lg:py-36
        "
      >
        <div
          className="
            mx-auto
            grid max-w-[1400px]
            gap-9
            min-[375px]:gap-10
            sm:gap-12
            lg:grid-cols-[0.32fr_0.68fr]
            lg:gap-14
          "
        >
          {/* ========================================
              PUBLICATION META
          ======================================== */}

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div
              className="
                border-y
                border-black/10
                py-5
                lg:border-b-0
                lg:border-t
                lg:py-0
                lg:pt-5
              "
            >
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-black/30
                  min-[375px]:text-[9px]
                  min-[375px]:tracking-[0.25em]
                "
              >
                Publication
              </p>

              <div
                className="
                  mt-4
                  grid grid-cols-2
                  gap-4
                  min-[375px]:mt-5
                  min-[375px]:gap-6
                  lg:mt-6
                  lg:block
                  lg:space-y-5
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      text-[7px]
                      uppercase
                      tracking-[0.16em]
                      text-black/30
                      min-[375px]:text-[8px]
                      min-[375px]:tracking-[0.2em]
                    "
                  >
                    Category
                  </p>

                  <p className="mt-2 break-words text-[13px] font-medium sm:text-sm">
                    {editorial.category}
                  </p>
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      text-[7px]
                      uppercase
                      tracking-[0.16em]
                      text-black/30
                      min-[375px]:text-[8px]
                      min-[375px]:tracking-[0.2em]
                    "
                  >
                    Published
                  </p>

                  <p className="mt-2 text-[13px] font-medium leading-5 sm:text-sm">
                    {formatDate(editorial.published_at)}
                  </p>
                </div>


              </div>
              <DownloadPublication
                slug={editorial.slug}
                title={editorial.title}
              />
            </div>
          </aside>

          {/* ========================================
              ARTICLE BODY
          ======================================== */}

          <div className="min-w-0 max-w-3xl">
            {paragraphs.map((paragraph, index) => (
              <p
                key={`${editorial.id}-${index}`}
                className={
                  index === 0
                    ? `
                      text-[1.1rem]
                      leading-[1.8]
                      text-black/75
                      min-[375px]:text-[1.15rem]
                      min-[375px]:leading-[1.85]
                      sm:text-2xl
                      sm:leading-[1.9]
                    `
                    : `
                      mt-6
                      text-[15px]
                      leading-[1.85]
                      text-black/70
                      min-[375px]:mt-7
                      min-[375px]:text-base
                      min-[375px]:leading-[1.9]
                      sm:mt-8
                      sm:text-lg
                    `
                }
              >
                {paragraph}
              </p>
            ))}

            <div
              className="
                mt-10
                border-t
                border-black/10
                pt-6
                min-[375px]:mt-12
                min-[375px]:pt-7
                sm:mt-16
                sm:pt-8
              "
            >
              <p
                className="
                  max-w-xl
                  text-[13px]
                  italic
                  leading-6
                  text-black/40
                  min-[375px]:text-sm
                  min-[375px]:leading-7
                "
              >
                May the truth of God&apos;s Word continue to
                shape our lives and draw us closer to Christ.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* ==========================================
          BACK TO ARCHIVE
      ========================================== */}

      <section
        className="
          border-y
          border-black/10
          bg-[#f7f7f3]
          px-5 py-7
          min-[375px]:px-6
          min-[375px]:py-8
          sm:py-10
          lg:px-10
        "
      >
        <div
          className="
            mx-auto
            flex max-w-[1400px]
            items-center
            justify-between
            gap-4
          "
        >
          <p
            className="
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-black/35
              min-[375px]:text-[8px]
              min-[375px]:tracking-[0.18em]
              sm:text-[9px]
              sm:tracking-[0.22em]
            "
          >
            Continue Reading
          </p>

          <Link
            href="/editorial"
            className="
              group
              inline-flex
              shrink-0
              items-center
              gap-2
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.13em]
              transition
              hover:text-green-700
              min-[375px]:gap-2.5
              min-[375px]:text-[8px]
              min-[375px]:tracking-[0.16em]
              sm:gap-3
              sm:text-[10px]
              sm:tracking-[0.2em]
            "
          >
            <span className="hidden min-[360px]:inline">
              View All Publications
            </span>

            <span className="min-[360px]:hidden">
              All Publications
            </span>

            <FiArrowUpRight className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      {/* ==========================================
          NEXT ARTICLE
      ========================================== */}

      {nextEditorial && (
        <section
          className="
            relative overflow-hidden
            bg-black
            px-5 py-16
            text-white
            min-[375px]:px-6
            min-[375px]:py-20
            sm:py-24
            md:py-32
            lg:px-10
            lg:py-40
          "
        >
          <span
            className="
              pointer-events-none
              absolute -bottom-10 right-[-2%]
              hidden select-none
              text-[14rem]
              font-medium
              leading-none
              tracking-[-0.08em]
              text-white/[0.04]
              lg:block
            "
          >
            NEXT
          </span>

          <div className="relative z-10 mx-auto max-w-[1400px]">
            <p
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.22em]
                text-green-500
                min-[375px]:text-[9px]
                min-[375px]:tracking-[0.3em]
              "
            >
              Read Next
            </p>

            <Link
              href={`/editorial/${nextEditorial.slug}`}
              className="
                group
                mt-6
                grid gap-7
                min-[375px]:mt-7
                min-[375px]:gap-8
                sm:mt-8
                sm:gap-10
                lg:grid-cols-[1fr_auto]
                lg:items-end
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.16em]
                    text-white/35
                    min-[375px]:text-[9px]
                    min-[375px]:tracking-[0.2em]
                  "
                >
                  {nextEditorial.category}
                </p>

                <h2
                  className="
                    mt-4
                    max-w-5xl
                    break-words
                    text-[clamp(2.7rem,12vw,4rem)]
                    font-medium
                    leading-[0.94]
                    tracking-[-0.055em]
                    transition-colors
                    group-hover:text-green-400
                    min-[375px]:mt-5
                    sm:text-6xl
                    sm:leading-[0.92]
                    lg:text-7xl
                  "
                >
                  {nextEditorial.title}
                </h2>
              </div>

              <span
                className="
                  flex h-12 w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  text-base
                  transition-all
                  duration-300
                  group-hover:-rotate-45
                  group-hover:border-green-500
                  group-hover:bg-green-700
                  min-[375px]:h-14
                  min-[375px]:w-14
                  min-[375px]:text-lg
                  sm:h-16
                  sm:w-16
                  sm:text-xl
                "
              >
                <FiArrowRight />
              </span>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default EditorialArticlePage;