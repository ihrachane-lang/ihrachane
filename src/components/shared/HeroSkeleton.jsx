export default function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.16),transparent_24%),linear-gradient(180deg,#171717_0%,#09090b_100%)] text-white">
      <div className="site-container relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="h-8 w-40 animate-pulse rounded-full bg-white/10" />
            <div className="space-y-3">
              <div className="h-12 w-full max-w-lg animate-pulse rounded-2xl bg-white/10" />
              <div className="h-12 w-3/4 max-w-md animate-pulse rounded-2xl bg-white/10" />
              <div className="h-6 w-full max-w-xl animate-pulse rounded-xl bg-white/5" />
              <div className="h-6 w-2/3 max-w-sm animate-pulse rounded-xl bg-white/5" />
            </div>
            <div className="flex gap-4 pt-2">
              <div className="h-12 w-48 animate-pulse rounded-full bg-orange-500/30" />
              <div className="h-12 w-40 animate-pulse rounded-full bg-white/10" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="site-panel-dark h-72 animate-pulse rounded-[2rem] bg-white/5 sm:h-96" />
          </div>
        </div>
      </div>
    </section>
  );
}
