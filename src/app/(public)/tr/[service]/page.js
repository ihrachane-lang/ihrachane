import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/seo/ServiceLandingPage";
import { turkishServiceBySlug } from "@/lib/seo/service-pages";

export function generateStaticParams() { return Object.keys(turkishServiceBySlug).map((service) => ({ service })); }
export async function generateMetadata({ params }) { const { service } = await params; const page = turkishServiceBySlug[service]; if (!page) return {}; const url = `https://www.ihrachane.com/tr/${service}`; const englishUrl = `https://www.ihrachane.com/services/${page.englishSlug}`; return { title: page.turkishTitle, description: page.turkishDescription, keywords: ["Çin tedarik", "Çin'den Türkiye'ye lojistik", "Çin fabrika denetimi", "kalite kontrol"], alternates: { canonical: url, languages: { en: englishUrl, tr: url, "x-default": englishUrl } }, openGraph: { title: page.turkishTitle, description: page.turkishDescription, url, locale: "tr_TR", type: "website" } }; }
export default async function Page({ params }) { const { service } = await params; const page = turkishServiceBySlug[service]; if (!page) notFound(); return <ServiceLandingPage page={page} locale="tr" />; }
