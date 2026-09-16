import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  getEditorialBySlug,
  getEditorials,
} from "@/lib/editorials";

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

      <section className="relative overflow-hidden bg-[#f7f7f3] px-6 pb-20 pt-36 sm:pt-40 md:pb-28 lg:px-10 lg:pb-36 lg:pt-48">

        <span className="pointer-events-none absolute -bottom-10 right-[-3%] hidden select-none text-[15rem] font-medium leading-none tracking-[-0.08em] text-black/[0.025] lg:block">
          READ
        </span>

        <div className="relative z-10 mx-auto max-w-[1400px]">

          <Link
            href="/editorial"
            className="group inline-flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/40 transition hover:text-green-700"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Editorial
          </Link>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

            <div>
              <div className="flex flex-wrap items-center gap-3">

                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
                  {editorial.category}
                </span>

                <span className="h-1 w-1 rounded-full bg-black/20" />

                <span className="text-[9px] uppercase tracking-[0.18em] text-black/35">
                  {formatDate(editorial.published_at)}
                </span>

              </div>

              <h1 className="mt-7 max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                {editorial.title}
              </h1>
            </div>

            {editorial.excerpt && (
              <p className="max-w-md text-base leading-8 text-black/50 lg:ml-auto">
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
        <section className="bg-white px-6 pt-10 lg:px-10 lg:pt-14">
          <div className="mx-auto max-w-[1400px]">

            <div className="relative aspect-[16/8] min-h-[340px] overflow-hidden bg-black sm:min-h-[450px] lg:min-h-[600px]">

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

      <article className="px-6 py-20 md:py-28 lg:px-10 lg:py-36">

        <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.32fr_0.68fr]">

          {/* LEFT META */}

          <aside className="lg:sticky lg:top-32 lg:self-start">

            <div className="border-t border-black/10 pt-5">

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-black/30">
                Publication
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-black/30">
                    Category
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {editorial.category}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-black/30">
                    Published
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {formatDate(editorial.published_at)}
                  </p>
                </div>

              </div>

            </div>

          </aside>

          {/* ARTICLE BODY */}

          <div className="max-w-3xl">

            {paragraphs.map((paragraph, index) => (
              <p
                key={`${editorial.id}-${index}`}
                className={`leading-[1.9] text-black/70 ${
                  index === 0
                    ? "text-xl sm:text-2xl"
                    : "mt-8 text-base sm:text-lg"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-16 border-t border-black/10 pt-8">

              <p className="max-w-xl text-sm italic leading-7 text-black/40">
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

      <section className="border-y border-black/10 bg-[#f7f7f3] px-6 py-10 lg:px-10">

        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-black/35">
            Continue Reading
          </p>

          <Link
            href="/editorial"
            className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:text-green-700"
          >
            View All Publications

            <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

        </div>

      </section>

      {/* ==========================================
          NEXT ARTICLE
      ========================================== */}

      {nextEditorial && (
        <section className="relative overflow-hidden bg-black px-6 py-24 text-white md:py-32 lg:px-10 lg:py-40">

          <span className="pointer-events-none absolute -bottom-10 right-[-2%] hidden select-none text-[14rem] font-medium leading-none tracking-[-0.08em] text-white/[0.04] lg:block">
            NEXT
          </span>

          <div className="relative z-10 mx-auto max-w-[1400px]">

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-green-500">
              Read Next
            </p>

            <Link
              href={`/editorial/${nextEditorial.slug}`}
              className="group mt-8 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
            >

              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                  {nextEditorial.category}
                </p>

                <h2 className="mt-5 max-w-5xl text-5xl font-medium leading-[0.92] tracking-[-0.055em] transition-colors group-hover:text-green-400 sm:text-6xl lg:text-7xl">
                  {nextEditorial.title}
                </h2>
              </div>

              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 text-xl transition-all duration-300 group-hover:-rotate-45 group-hover:border-green-500 group-hover:bg-green-700">
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