import Link from "next/link";
import {
  FiArrowRight,
  FiCheck,
  FiMail,
} from "react-icons/fi";

interface NewsletterPageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

const NewsletterPage = async ({
  searchParams,
}: NewsletterPageProps) => {
  const { status } = await searchParams;

  const confirmed = status === "confirmed";
  const alreadyConfirmed =
    status === "already-confirmed";

  const success = confirmed || alreadyConfirmed;
  
  const unsubscribed = status === "unsubscribed";
    const alreadyUnsubscribed =
    status === "already-unsubscribed";

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-[#F7F7F3] px-6 py-32 text-black lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none text-[15rem] font-semibold leading-none tracking-[-0.08em] text-black/[0.025] lg:block"
      >
        {success ? "YES" : "OOPS"}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]">
        <div className="max-w-2xl">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              success
                ? "bg-green-700 text-white"
                : "bg-black text-white"
            }`}
          >
            {success ? <FiCheck /> : <FiMail />}
          </div>

          <p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.25em] text-green-700">
            TACSFON LAUTECH
          </p>

          {confirmed && (
            <>
              <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                You&apos;re
                <span className="block text-black/35">
                  connected.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-black/55 sm:text-base">
                Your email has been confirmed. You&apos;ll now
                receive important fellowship updates, special
                programmes and announcements from TACSFON
                LAUTECH.
              </p>
            </>
          )}

          {alreadyConfirmed && (
            <>
              <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                You&apos;re already
                <span className="block text-black/35">
                  with us.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-black/55 sm:text-base">
                This email address has already been confirmed.
                There&apos;s nothing else you need to do.
              </p>
            </>
          )}

          {unsubscribed && (
  <>
    <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
      You&apos;ve been
      <span className="block text-black/35">
        unsubscribed.
      </span>
    </h1>

    <p className="mt-7 max-w-lg text-sm leading-7 text-black/55 sm:text-base">
      You won&apos;t receive further fellowship email
      announcements. You can subscribe again whenever
      you want.
    </p>
  </>
)}

{alreadyUnsubscribed && (
  <>
    <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
      Already
      <span className="block text-black/35">
        unsubscribed.
      </span>
    </h1>

    <p className="mt-7 max-w-lg text-sm leading-7 text-black/55 sm:text-base">
      This email address is already removed from fellowship
      announcements.
    </p>
  </>
)}

         {!success && !unsubscribed && !alreadyUnsubscribed && (
            <>
              <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                We couldn&apos;t
                <span className="block text-black/35">
                  confirm that.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-sm leading-7 text-black/55 sm:text-base">
                The confirmation link may be invalid or no
                longer available. You can subscribe again from
                the website to receive a new confirmation
                email.
              </p>
            </>
          )}

          <Link
            href="/"
            className="group mt-9 inline-flex items-center gap-3 bg-black px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-green-700"
          >
            Back to Website

            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPage;