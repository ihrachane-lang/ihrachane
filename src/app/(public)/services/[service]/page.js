import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/seo/ServiceLandingPage";
import { servicePages } from "@/lib/seo/service-pages";

export function generateStaticParams() { return Object.keys(servicePages).map((service) => ({ service })); }
export async function generateMetadata({ params }) { const { service } = await params; const page = servicePages[service]; if (!page) return {}; const url = `https://www.ihrachane.com/services/${service}`; return { title: page.title, description: page.description, keywords: page.keywords, alternates: { canonical: url, languages: { en: url, tr: `https://www.ihrachane.com/tr/${page.turkishSlug}`, "x-default": url } }, openGraph: { title: page.title, description: page.description, url, type: "website" } }; }
export default async function Page({ params }) { const { service } = await params; const page = servicePages[service]; if (!page) notFound(); return <ServiceLandingPage page={{ ...page, slug: service }} />; }
