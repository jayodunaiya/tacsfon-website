export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7F3] px-6">
      <div className="flex flex-col items-center">
        <div className="relative h-8 w-8">
          <span className="absolute inset-0 rounded-full border border-black/10" />

          <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-green-700" />
        </div>

        <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/35">
          TACSFON LAUTECH
        </p>
      </div>
    </main>
  );
}