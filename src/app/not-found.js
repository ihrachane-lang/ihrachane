import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | IHRACHANE",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-200/40 to-amber-200/30 blur-3xl"
      />
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-orange-700 backdrop-blur">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
          Page not found
        </div>
        <h1 className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-700 bg-clip-text text-7xl font-black tracking-tight text-transparent sm:text-8xl">
          404
        </h1>
        <h2 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
          This page took a detour.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          The page you are looking for may have been moved, renamed, or never
          existed in the first place. Let&apos;s get you back to our sourcing
          and logistics solutions.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600 hover:shadow-orange-500/50 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Back to home
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="/shipping-partners"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-7 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition hover:bg-white hover:text-orange-600 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Explore shipping partners
          </Link>
        </div>
      </div>
    </div>
  );
}
