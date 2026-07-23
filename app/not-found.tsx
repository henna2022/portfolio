import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center text-ink">
      <p className="font-display text-[6rem] font-semibold leading-none tracking-[-0.015em] sm:text-[8rem]">
        404
      </p>
      <p className="mt-6 text-base text-muted sm:text-lg">Page not found</p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </main>
  );
}
