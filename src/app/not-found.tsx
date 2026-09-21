import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-black px-5 py-24 text-white min-[375px]:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-green-500">
          Error · 404
        </p>

        <h1 className="mt-6 max-w-5xl text-[clamp(3.5rem,15vw,7rem)] font-medium leading-[0.88] tracking-[-0.06em] lg:text-[9rem]">
          This page
          <span className="block text-white/30">
            isn&apos;t here.
          </span>
        </h1>

        <p className="mt-7 max-w-md text-sm leading-7 text-white/50 sm:text-base">
          The page you&apos;re looking for may have moved or
          no longer exists.
        </p>

        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-3 bg-green-700 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] transition hover:bg-green-600"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back Home
        </Link>
      </div>
    </main>
  );
}