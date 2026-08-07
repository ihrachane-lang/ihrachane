import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostBySlug, getPublishedBlogPosts } from "@/lib/data/blog-data";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import {
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaUser,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaArrowLeft,
} from "react-icons/fa";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | IHRACHANE",
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | IHRACHANE Blog`;
  const description = post.seo?.metaDescription || post.excerpt;
  const canonical = post.seo?.canonicalUrl || `https://www.ihrachane.com/blog/${post.slug}`;
  const keywords = post.seo?.keywords?.length
    ? post.seo.keywords
    : [post.category, "IHRACHANE", "sourcing", "logistics"];
  const ogImage = post.seo?.ogImage || post.coverImage;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "IHRACHANE",
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      authors: [post.authorName || "IHRACHANE Team"],
      images: [
        {
          url: ogImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical,
    },
  };
}

export default async function SingleBlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p._id !== post._id && p.category === post.category)
    .slice(0, 3);

  const articleUrl = `https://www.ihrachane.com/blog/${post.slug}`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: articleJsonLd({
            url: articleUrl,
            title: post.seo?.metaTitle || post.title,
            description: post.seo?.metaDescription || post.excerpt,
            image: post.seo?.ogImage || post.coverImage,
            publishedAt: post.publishedAt || post.createdAt,
            updatedAt: post.updatedAt,
            authorName: post.authorName,
            category: post.category,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />

      <article className="bg-slate-50 min-h-screen pb-20">
        {/* Article Header Banner */}
        <header className="bg-gradient-to-r from-[#19203c] via-[#2c3355] to-[#1e1e30] text-white py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
            >
              <FaArrowLeft /> Back to Articles
            </Link>

            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-300">
                <FaClock className="text-orange-400" /> {post.readTimeMinutes || 5} min read
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-300">
                <FaCalendarAlt className="text-orange-400" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              {post.title}
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white shadow">
                <FaUser />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {post.authorName || "IHRACHANE Team"}
                </p>
                <p className="text-xs text-gray-400">Global Logistics & Sourcing Specialists</p>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
          <div className="relative w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Main Content & Sidebar Container */}
        <div className="max-w-4xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Main Body (3 cols) */}
          <div className="md:col-span-3 space-y-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
            {/* Formatted HTML Content */}
            <div
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#19203c] [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:text-base [&_p]:leading-7 [&_strong]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                  <FaTag /> Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Social Share Sidebar (1 col) */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4 sticky top-24">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2">
                Share Article
              </h3>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition font-medium text-sm"
                >
                  <FaLinkedin className="text-lg" /> LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-700 hover:text-white transition font-medium text-sm"
                >
                  <FaFacebook className="text-lg" /> Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white transition font-medium text-sm"
                >
                  <FaTwitter className="text-lg" /> Twitter / X
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition font-medium text-sm"
                >
                  <FaWhatsapp className="text-lg" /> WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto px-6 mt-16 space-y-6">
            <h3 className="text-2xl font-extrabold text-gray-900 border-b pb-4">
              Related Articles in {post.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel._id}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative h-36 w-full rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 line-clamp-2 text-base hover:text-orange-600 transition">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="mt-4 inline-block text-xs font-bold text-orange-600 hover:underline"
                  >
                    Read Story →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
