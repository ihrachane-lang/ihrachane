import Link from "next/link";

export default function BilingualSeoSection({
  category,
  subCategory,
  enTitle,
  trTitle,
  enParagraphs,
  trParagraphs,
  enKeywords,
  trKeywords,
  showTurkish = false,
}) {
  const brand = "IHRACHANE";
  const enKeys = (enKeywords || []).filter(Boolean);
  const trKeys = (trKeywords || []).filter(Boolean);

  return (
    <section className="site-section-soft relative overflow-hidden">
      <div className="site-container relative z-10">
        <div className={`grid gap-10 lg:gap-12 ${showTurkish ? "lg:grid-cols-2" : "max-w-4xl"}`}>
          <div className="site-panel rounded-[2rem] p-7 sm:p-9" lang="en">
            <div className="site-badge mb-5">English Overview</div>
            <h2 className="site-title mb-5 text-2xl sm:text-3xl">
              {enTitle ||
                (category
                  ? `${category} Sourcing, Supplier Audit & Logistics by ${brand}`
                  : `${brand} | End-to-End Global Sourcing, Quality Control & Shipping`)}
            </h2>
            <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
              {(enParagraphs && enParagraphs.length
                ? enParagraphs
                : category && subCategory
                ? [
                    `${brand} manages the complete ${subCategory} procurement lifecycle for global clients — from factory identification across China, Turkey, and Southeast Asia, to on-site ${category} quality inspection, China warehousing, and coordinated FCL / LCL ocean, air, and express freight delivery.`,
                    `Whether you need a verified ${subCategory} manufacturer shortlist, tailored MOQ negotiation, in-line production checks, pre-shipment random inspection, container loading supervision, or door-to-door logistics support, ${brand} delivers a single-point accountable workflow designed to reduce sourcing risk and improve supply-chain predictability.`,
                    `Contact our ${category} specialists today for a tailored ${subCategory} quotation including unit pricing, inspection calendar, warehousing consolidation options, and transit-time planning to your destination market.`,
                  ]
                : category
                ? [
                    `${brand} provides a fully managed ${category} supply chain service — connecting businesses with audited ${category} manufacturers, disciplined quality inspection, and reliable international freight coordination across Greater China, Turkey, and Southeast Asia.`,
                    `Our ${category} teams support factory audits, in-line and final pre-shipment quality checks, China warehousing and consolidation, packaging supervision, export documentation, and FCL/LCL/air freight scheduling to your market.`,
                    `Request a custom ${category} sourcing plan today — from supplier shortlist through delivery coordination, ${brand} helps teams reduce friction and scale with confidence.`,
                  ]
                : [
                    `${brand} is a single center from supply to delivery. We help businesses navigate global product sourcing, factory verification, disciplined quality inspection, China warehousing, and international freight coordination with one accountable partner and transparent workflow.`,
                    `Across textiles and apparel, packaging, home goods, industrial components, FMCG, and custom manufacturing categories, ${brand} delivers end-to-end procurement support: factory audits, in-line production monitoring, pre-shipment and container-loading inspections, warehousing, export documentation, and FCL / LCL ocean, air, or express delivery coordination worldwide.`,
                    `Whether you are launching a new product, qualifying an alternative supplier, or scaling existing volume with more reliability, the ${brand} team combines on-ground sourcing knowledge with international business discipline so you can focus on growth instead of operational friction.`,
                  ]
              ).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {enKeys.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {enKeys.slice(0, 12).map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-7">
              <Link href="/#contact" className="site-button-primary">
                <span>Request Sourcing Quote</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {showTurkish ? <div
            className="site-panel rounded-[2rem] p-7 sm:p-9"
            lang="tr"
            dir="ltr"
            aria-label="Türkçe içerik özeti — IHRACHANE küresel tedarik zinciri hizmetleri"
          >
            <div className="site-badge border-orange-200 bg-orange-500/10 text-orange-700 mb-5">
              Türkçe Özet
            </div>
            <h2 className="site-title mb-5 text-2xl sm:text-3xl">
              {trTitle ||
                (category && subCategory
                  ? `${brand} ile ${subCategory} Tedarik, Fabrika Denetimi ve Lojistik Çözümleri`
                  : category
                  ? `${brand} | ${category} Tedarik, Kalite Kontrolü ve Uluslararası Lojistik`
                  : `${brand} | Küresel Tedarik Zinciri, Ürün Temin ve Lojistik Hizmetleri`)}
            </h2>
            <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
              {(trParagraphs && trParagraphs.length
                ? trParagraphs
                : category && subCategory
                ? [
                    `${brand}, dünya çapındaki müşteriler için ${subCategory} temin sürecinin tamamını yönetir — Çin, Türkiye ve Güneydoğu Asya'da fabrika tespitinden, ${category} kalite denetimine, Çin depolarına ve koordine edilmiş FCL / LCL deniz, hava ve ekspres kargo teslimatına kadar tek sorumlu iş ortağı.`,
                    `Doğrulanmış ${subCategory} üretici kısa listesi, özel MOQ pazarlığı, üretim içi kontroller, sevkiyat öncesi rastgele denetim, konteyner yükleme denetimi veya kapıdan kapıya lojistik desteğine ihtiyacınız olsun, ${brand} tedarik riskini azaltmak ve tedarik zinciri öngörülebilirliğini artırmak için tasarlanmış tek merkezden yönetilen bir iş akışı sunar.`,
                    `Birim fiyatlandırma, denetim takvimi, depolama konsolidasyon seçenekleri ve hedef pazarınıza taşıma süresi planlaması dahil özel ${subCategory} teklifi için ${category} uzmanlarımızla bugün iletişime geçin.`,
                  ]
                : category
                ? [
                    `${brand}, tam yönetilen ${category} tedarik zinciri hizmeti sunar — işletmeleri denetlenmiş ${category} üreticileri, disiplinli kalite denetimi ve Çin, Türkiye ve Güneydoğu Asya genelinde güvenilir uluslararası navlun koordinasyonu ile buluşturur.`,
                    `${category} ekiplerimiz fabrika denetimleri, üretim içi ve nihai sevkiyat öncesi kalite kontrolleri, Çin depolama ve konsolidasyon, ambalaj denetimi, ihracat belgeleri ve pazarınıza FCL/LCL/hava navlun planlaması konularında destek verir.`,
                    `Özel ${category} tedarik planınızı bugün talep edin — tedarikçi shortlistinden teslimat koordinasyonuna kadar ${brand}, ekiplerin daha az operasyonel sürtünme ve daha fazla güvenle ölçeklenmesine yardımcı olur.`,
                  ]
                : [
                    `${brand} tedarikten teslimata tek merkezdir. İşletmelerin küresel ürün tedariki, fabrika doğrulama, disiplinli kalite denetimi, Çin depolama ve uluslararası navlun koordinasyonunu tek sorumlu iş ortağı ve şeffaf iş akışı ile yönetmesine yardımcı oluruz.`,
                    `Tekstil ve hazır giyim, ambalaj, ev tekstili, ev eşyaları, endüstriyel bileşenler, hızlı tüketim malları ve özel üretim kategorileri genelinde ${brand} uçtan uca satın alma desteği sunar: fabrika denetimleri, üretim içi izleme, sevkiyat öncesi ve konteyner yükleme denetimleri, depolama, ihracat belgeleri ve FCL / LCL deniz, hava veya ekspres teslimat koordinasyonu.`,
                    `Yeni bir ürün başlatıyor, alternatif bir tedarikçi doğruluyor veya mevcut hacmi daha fazla güvenilirlikle ölçekliyor olun — ${brand} ekibi, yerel tedarik bilgisi ile uluslararası iş disiplinini birleştirir, böylece büyümeye odaklanabilirsiniz.`,
                  ]
              ).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {trKeys.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {trKeys.slice(0, 12).map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-7">
              <Link
                href="/#contact"
                className="site-button-primary inline-flex"
                aria-label="Tedarik teklifi alın — IHRACHANE ile iletişime geçin"
              >
                <span>Özel Teklif Alın</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div> : null}
        </div>
      </div>
    </section>
  );
}
