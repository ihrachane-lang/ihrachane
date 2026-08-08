import Link from "next/link";
import Image from "next/image";
import { getPublishedBlogPosts } from "@/lib/data/blog-data";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { FaClock, FaCalendarAlt, FaTag, FaArrowRight } from "react-icons/fa";

export const revalidate = 3600;

export const metadata = {
  title: "Blog & Insights | Factory Sourcing, Quality Inspection & Freight Shipping",
  description:
    "Explore expert guides, sourcing strategies, supplier verification checklists, and international logistics insights from IHRACHANE global procurement team.",
  openGraph: {
    title: "IHRACHANE Blog & Sourcing Insights",
    description:
      "Expert sourcing, supplier auditing, quality control, and freight forwarding insights for global businesses.",
    url: "https://www.ihrachane.com/blog",
    siteName: "IHRACHANE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.ihrachane.com/blog",
  },
};

export default async function BlogListingPage({ searchParams }) {
  const params = await searchParams;
  const selectedCategory = params?.category || "All";
  const posts = await getPublishedBlogPosts(selectedCategory);

  const categories = [
    "All",
    "Sourcing",
    "Logistics",
    "Quality Control",
    "Import Guides",
    "Freight Shipping",
    "China Warehousing",
    "Industry News",
  ];

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog & Insights", url: "/blog" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />

      <main className="bg-slate-50 min-h-screen py-20">
        {/* Hero Banner - Dark blue changed to vibrant Orange Theme */}
        <section className="relative bg-gradient-to-r from-orange-500 via-orange-400 to-amber-500 text-white py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-300/30 via-transparent to-transparent opacity-70" />
          <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              IHRACHANE Sourcing & Logistics Hub
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Insights & Supply Chain Guides
            </h1>
            <p className="max-w-2xl mx-auto text-orange-100 text-base md:text-lg">
              Proven strategies for factory sourcing, China supplier audits, quality inspection standards, and international freight logistics.
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="max-w-6xl mx-auto px-6 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex flex-wrap justify-center gap-2 overflow-x-auto">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "bg-orange-600 text-white shadow-md"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-6xl mx-auto px-6 pt-12">
          {posts.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100 space-y-3">
              <h3 className="text-xl font-bold text-gray-800">
                No articles published in this category yet
              </h3>
              <p className="text-gray-500 text-sm">
                Check back soon or select another category above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col group"
                >
                  {/* Cover Image */}
                  <Link href={`/blog/${post.slug}`} className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-orange-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow">
                      <FaTag className="text-[10px]" /> {post.category}
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      {/* Meta stats */}
                      <div className="flex items-center text-xs text-gray-500 gap-4">
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="text-orange-500" />
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-orange-500" />
                          {post.readTimeMinutes || 5} min read
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-500">
                        By {post.authorName || "IHRACHANE Team"}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-orange-600 hover:text-orange-700 transition"
                      >
                        Read Article <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}