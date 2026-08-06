import Link from "next/link";
import { faqJsonLd, servicesJsonLd } from "@/lib/seo/jsonld";

export default function ServiceLandingPage({ page, locale = "en" }) {
  const tr = locale === "tr";
  const title = tr ? page.turkishTitle : page.title;
  const description = tr ? page.turkishDescription : page.description;
  const path = tr ? `/tr/${page.turkishSlug}` : `/services/${page.slug}`;
  const faq = tr
    ? [["IHRACHANE hangi hizmetleri sunar?", "Tedarikçi araştırması, fabrika denetimi, kalite kontrol, depolama ve uluslararası lojistik koordinasyonu sunuyoruz."], ["Teklif nasıl alınır?", "Ürün, miktar, hedef ülke ve zaman çizelgenizi paylaşın; ekibimiz size özel süreç planı hazırlasın."]]
    : [["What does IHRACHANE manage?", "We coordinate supplier research, factory verification, quality inspection, warehousing and international freight."], ["How do I request a quote?", "Share your product, quantity, destination and timeline so our team can prepare a tailored sourcing plan."]];
  return <article lang={tr ? "tr" : "en"}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: servicesJsonLd({ url: path, name: title, description, serviceType: title, areaServed: "Worldwide" }) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd(faq) }} />
    <section className="site-section-dark pt-32"><div className="site-container max-w-4xl"><p className="site-badge-dark">{tr ? "IHRACHANE hizmeti" : "IHRACHANE service"}</p><h1 className="site-title-dark mt-6">{title}</h1><p className="site-copy-dark mt-6 max-w-3xl">{description}</p><Link href="/#contact" className="site-button-primary mt-8">{tr ? "Teklif Alın" : "Request a quote"}</Link></div></section>
    <section className="site-section-soft"><div className="site-container max-w-4xl"><h2 className="site-title">{tr ? "Tek sorumlu iş ortağı ile daha kontrollü tedarik" : "A controlled sourcing workflow with one accountable partner"}</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{(tr ? ["Doğru tedarikçiyi araştırın ve doğrulayın.", "Üretim ve kalite riskini erken görün.", "Teslimata kadar süreci görünür yönetin."] : ["Research and verify suitable suppliers.", "Identify production and quality risks early.", "Manage the journey through delivery with clear visibility."]).map((item) => <p className="site-panel p-6" key={item}>{item}</p>)}</div></div></section>
    <section className="site-section-muted"><div className="site-container max-w-4xl"><h2 className="site-title">{tr ? "Sık sorulan sorular" : "Frequently asked questions"}</h2>{faq.map(([question, answer]) => <div className="mt-6" key={question}><h3 className="text-xl font-bold text-slate-900">{question}</h3><p className="site-copy mt-2">{answer}</p></div>)}</div></section>
  </article>;
}
